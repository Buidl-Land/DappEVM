import {
  GameWorker,
  GameFunction,
  ExecutableGameFunctionResponse,
  ExecutableGameFunctionStatus,
  GamePlugin,
  Logger,
} from "@virtuals-protocol/game";
import { createWalletClient, http, publicActions, Abi, Hex, PublicClient, createPublicClient, WalletClient, Account, Chain, TransactionReceipt, Log, decodeEventLog, parseAbiItem, AbiItem } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { baseSepolia } from 'viem/chains'; // Use Base Sepolia

// --- ABI Loading ---
// IMPORTANT: Verify these paths or implement robust ABI loading.
import ProjectFacetAbiJson from './ProjectFacet.json';
import CrowdfundingFacetAbiJson from './CrowdfundingFacet.json';
import TaskMarketFacetAbiJson from './TaskmarketFacet.json';

const ProjectFacetAbi = ProjectFacetAbiJson as Abi;
const CrowdfundingFacetAbi = CrowdfundingFacetAbiJson as Abi;
const TaskMarketFacetAbi = TaskMarketFacetAbiJson as Abi;

// Define the specific event ABI item for easier decoding
const projectCreatedEventAbi = parseAbiItem('event ProjectCreated(uint256 indexed projectId, address indexed creator, string title, uint256 timestamp)');

// --- Interfaces ---
// Interface for the plugin options
interface IBuidlLandPluginOptions {
  id?: string;
  name?: string;
  description?: string;
  walletPrivateKey: Hex; // Required
  diamondContractAddress: Hex; // Required
  rpcUrl?: string; // Optional: Defaults to Base Sepolia public RPC
  chain?: Chain; // Optional: Defaults to Base Sepolia
  paymentTokenAddress: Hex; // Required for crowdfunding/tasks
}

// Interface for Project Metadata (matching Solidity struct)
interface ProjectMetadata {
    aiEvaluation: string;
    marketScore: bigint;
    techFeasibility: string;
    minValuation: bigint;
    maxValuation: bigint;
}

// Interface for Task Details (matching Solidity struct partially)
interface TaskDetails {
    title: string;
    description: string;
    reward: bigint;
    deadline: bigint; // Timestamp
    requiredSkills: string[];
    estimatedHours: bigint;
}


// --- Plugin Class ---
// Renamed class to BuidlLandPlugin
class BuidlLandPlugin implements GamePlugin {
  public id: string;
  public name: string;
  public description: string;
  private walletClient: WalletClient;
  private publicClient: PublicClient;
  private account: Account;
  private options: IBuidlLandPluginOptions;
  private logger: Logger = console.log; // Default logger
  private chain: Chain;

  constructor(options: IBuidlLandPluginOptions) {
    // Updated IDs and names
    this.id = options.id || "buidlland_onchain_plugin";
    this.name = options.name || "BuidlLand On-Chain Actions";
    this.description = options.description || "Handles BuidlLand project creation, funding, and task management on Base Sepolia.";
    this.options = options;
    this.chain = options.chain || baseSepolia; // Default to Base Sepolia

    this.validateOptions();
    this.initializeViemClients();
  }

  private validateOptions(): void {
    const requiredOptions: (keyof IBuidlLandPluginOptions)[] = [
        'walletPrivateKey', 'diamondContractAddress', 'paymentTokenAddress'
    ];
    for (const key of requiredOptions) {
        if (!this.options[key]) {
            throw new Error(`Missing required option for BuidlLandPlugin: ${key}`);
        }
    }
    // Use default RPC if not provided
    if (!this.options.rpcUrl) {
        this.options.rpcUrl = this.chain.rpcUrls.default.http[0];
        this.logger(`Using default RPC URL for ${this.chain.name}: ${this.options.rpcUrl}`);
    }
  }

  private initializeViemClients(): void {
     try {
        this.account = privateKeyToAccount(this.options.walletPrivateKey);
        this.publicClient = createPublicClient({
            chain: this.chain,
            transport: http(this.options.rpcUrl)
        });
        // Extend WalletClient with publicActions for convenience
        this.walletClient = createWalletClient({
            account: this.account,
            chain: this.chain,
            transport: http(this.options.rpcUrl)
        }).extend(publicActions);

        this.logger(`Viem clients initialized for chain ${this.chain.name} with address ${this.account.address}.`);
    } catch (error: any) {
        this.logger(`FATAL: Error initializing Viem clients: ${error.message}`);
        throw error;
    }
  }

  // Provides the GameWorker with executable functions for the agent
  public getWorker(data?: {
    functions?: GameFunction<any>[];
    getEnvironment?: () => Promise<Record<string, any>>;
    logger?: Logger;
  }): GameWorker {
     if (data?.logger) {
        this.logger = data.logger;
     }
     this.logger(`Initializing ${this.name} worker.`);
    return new GameWorker({
      id: this.id + "_worker", // Make worker ID unique
      name: this.name,
      description: this.description,
      functions: data?.functions || [ // Expose on-chain actions as functions
        this.createProjectFunction,
        this.initializeFundingFunction,
        this.createTaskFunction,
      ],
      getEnvironment: data?.getEnvironment || (async () => ({ // Provide relevant env info
          diamondAddress: this.options.diamondContractAddress,
          chain: this.chain.name,
          paymentToken: this.options.paymentTokenAddress,
          signerAddress: this.account.address,
      })),
      logger: this.logger,
    });
  }

  // --- Game Functions for On-Chain Actions ---

  get createProjectFunction() {
    return new GameFunction({
      name: "create_buidlland_project",
      description: "Creates a new project entry on the BuidlLand Diamond contract (Base Sepolia). Requires project details and metadata.",
      args: [
        { name: "title", type: "string", description: "The title of the project." },
        { name: "description", type: "string", description: "A detailed description of the project idea." },
        { name: "tags", type: "string[]", description: "Relevant tags for the project (e.g., ['defi', 'gamefi'])." },
        { name: "aiEvaluation", type: "string", description: "Summary of the AI's evaluation." },
        { name: "marketScore", type: "number", description: "Score (0-100) indicating market potential." },
        { name: "techFeasibility", type: "string", description: "Assessment of technical feasibility." },
        { name: "minValuation", type: "number", description: "Minimum estimated valuation in payment token units." },
        { name: "maxValuation", type: "number", description: "Maximum estimated valuation in payment token units." },
      ] as const,
      executable: async (args, logger) => {
        this.logger = logger || this.logger;
        this.logger(`Executing create_buidlland_project for title: ${args.title}`);
        try {
            // Input validation (basic)
            if (!args.title || !args.description) {
                throw new Error("Project title and description are required.");
            }
            if (args.marketScore < 0 || args.marketScore > 100) {
                 throw new Error("Market score must be between 0 and 100.");
            }

            const metadata: ProjectMetadata = {
                aiEvaluation: args.aiEvaluation || "N/A",
                marketScore: BigInt(args.marketScore),
                techFeasibility: args.techFeasibility || "N/A",
                minValuation: BigInt(args.minValuation),
                maxValuation: BigInt(args.maxValuation),
            };

            const hash = await this.sendTransaction('createProject', ProjectFacetAbi, [
                args.title,
                args.description,
                args.tags || [], // Ensure tags is an array
                metadata
            ]);
            const receipt = await this.waitForTransaction(hash, 'createProject');
            const projectId = this.extractProjectId(receipt);

            const successMsg = `Project "${args.title}" created successfully on Base Sepolia with ID: ${projectId}. Transaction: ${receipt.transactionHash}`;
            this.logger(successMsg);
            // Return the projectId in the result data for the agent
            return new ExecutableGameFunctionResponse(ExecutableGameFunctionStatus.Done, successMsg, { projectId: projectId.toString() });

        } catch (error: any) {
            const errorMsg = `Error creating project "${args.title}": ${error.message}`;
            this.logger(errorMsg);
            return new ExecutableGameFunctionResponse(ExecutableGameFunctionStatus.Failed, errorMsg);
        }
      },
    });
  }

  get initializeFundingFunction() {
    return new GameFunction({
      name: "initialize_project_funding",
      description: "Initializes the crowdfunding parameters for a specific project on Base Sepolia.",
      args: [
        { name: "projectId", type: "number", description: "The ID of the project to initialize funding for." },
        { name: "fundingGoal", type: "number", description: "The target funding amount in the smallest unit of the payment token." },
        { name: "durationSeconds", type: "number", description: "The duration of the crowdfunding campaign in seconds." },
      ] as const,
       executable: async (args, logger) => {
        this.logger = logger || this.logger;
        this.logger(`Executing initialize_project_funding for project ID: ${args.projectId}`);
        try {
            // Input validation
            if (args.projectId <= 0 || args.fundingGoal <= 0 || args.durationSeconds <= 0) {
                throw new Error("Invalid input: projectId, fundingGoal, and durationSeconds must be positive numbers.");
            }

            const projectIdBigInt = BigInt(args.projectId);
            const fundingGoalBigInt = BigInt(args.fundingGoal);
            const durationBigInt = BigInt(args.durationSeconds);

            const hash = await this.sendTransaction('initializeFunding', CrowdfundingFacetAbi, [
                projectIdBigInt,
                fundingGoalBigInt,
                durationBigInt,
                this.options.paymentTokenAddress // Use configured payment token
            ]);
            const receipt = await this.waitForTransaction(hash, 'initializeFunding');

            const successMsg = `Crowdfunding initialized for project ID: ${args.projectId}. Goal: ${args.fundingGoal}, Duration: ${args.durationSeconds}s. Tx: ${receipt.transactionHash}`;
            this.logger(successMsg);
            return new ExecutableGameFunctionResponse(ExecutableGameFunctionStatus.Done, successMsg);

        } catch (error: any) {
            const errorMsg = `Error initializing funding for project ID ${args.projectId}: ${error.message}`;
            this.logger(errorMsg);
            return new ExecutableGameFunctionResponse(ExecutableGameFunctionStatus.Failed, errorMsg);
        }
      },
    });
  }

   get createTaskFunction() {
    return new GameFunction({
      name: "create_project_task",
      description: "Creates a new task associated with a specific project on Base Sepolia. Note: The contract requires the project to be funded first.",
      args: [
        { name: "projectId", type: "number", description: "The ID of the project to add the task to." },
        { name: "title", type: "string", description: "The title of the task." },
        { name: "description", type: "string", description: "A detailed description of the task." },
        { name: "reward", type: "number", description: "The reward amount in the smallest unit of the payment token." },
        { name: "deadlineTimestamp", type: "number", description: "The task deadline as a Unix timestamp (seconds)." },
        { name: "requiredSkills", type: "string[]", description: "List of skills required for the task." },
        { name: "estimatedHours", type: "number", description: "Estimated hours to complete the task." },
      ] as const,
       executable: async (args, logger) => {
        this.logger = logger || this.logger;
        this.logger(`Executing create_project_task for project ID: ${args.projectId}, title: ${args.title}`);
        try {
            // Input validation
             if (args.projectId <= 0 || !args.title || args.reward < 0 || args.deadlineTimestamp <= Math.floor(Date.now()/1000) || args.estimatedHours < 0) {
                throw new Error("Invalid input for creating task.");
            }

            // Optional: Add a check here if needed, though contract enforces it
            // const isFunded = await this.publicClient.readContract({ address: this.options.diamondContractAddress, abi: TaskMarketFacetAbi, functionName: 'isFunded', args: [BigInt(args.projectId)] });
            // if (!isFunded) { throw new Error(`Project ${args.projectId} is not funded yet. Cannot create task.`); }

            const hash = await this.sendTransaction('createTask', TaskMarketFacetAbi, [
                BigInt(args.projectId),
                args.title,
                args.description || "", // Ensure description is string
                BigInt(args.reward),
                BigInt(args.deadlineTimestamp),
                args.requiredSkills || [], // Ensure skills is array,
                BigInt(args.estimatedHours),
            ]);
            const receipt = await this.waitForTransaction(hash, 'createTask');

            // TODO: Extract task ID from logs if needed (requires TaskCreated event in ABI)
            const successMsg = `Task "${args.title}" created for project ID ${args.projectId}. Tx: ${receipt.transactionHash}`;
            this.logger(successMsg);
            // Optionally return task ID if extracted from logs
            return new ExecutableGameFunctionResponse(ExecutableGameFunctionStatus.Done, successMsg);

        } catch (error: any) {
            const errorMsg = `Error creating task "${args.title}" for project ID ${args.projectId}: ${error.message}`;
            this.logger(errorMsg);
            return new ExecutableGameFunctionResponse(ExecutableGameFunctionStatus.Failed, errorMsg);
        }
      },
    });
  }


  // --- Helper Methods ---

  private async sendTransaction(functionName: string, abi: Abi, args: any[]): Promise<Hex> {
      if (!this.walletClient || !this.account) throw new Error("Wallet client or account not initialized.");
      this.logger(`Sending transaction: ${functionName} with args: ${JSON.stringify(args)}`);
      try {
          // Consider adding gas estimation or manual limits for robustness
          // const gas = await this.publicClient.estimateContractGas({...});
          const hash = await this.walletClient.writeContract({
              address: this.options.diamondContractAddress,
              abi: abi,
              functionName: functionName,
              args: args,
              account: this.account,
              chain: this.chain,
          });
          this.logger(`Transaction sent: ${hash}`);
          return hash;
      } catch (error: any) {
           this.logger(`Error sending ${functionName} transaction: ${error.message}`);
           // Consider parsing Viem errors for more specific feedback
           throw error;
      }
  }

  private async waitForTransaction(hash: Hex, functionName: string): Promise<TransactionReceipt> {
       if (!this.publicClient) throw new Error("Public client not initialized.");
       this.logger(`Waiting for transaction confirmation for ${functionName} (${hash})...`);
       const receipt = await this.publicClient.waitForTransactionReceipt({
           hash: hash,
           confirmations: 1, // Wait for 1 confirmation
           timeout: 120_000 // Example: 2 minute timeout
        });
       if (receipt.status !== 'success') {
           this.logger(`Transaction ${functionName} (${hash}) failed. Status: ${receipt.status}`);
           throw new Error(`Transaction ${functionName} failed. Status: ${receipt.status}. Tx Hash: ${hash}`);
       }
       this.logger(`Transaction ${functionName} (${hash}) confirmed successfully in block ${receipt.blockNumber}.`);
       return receipt;
  }

   private extractProjectId(receipt: TransactionReceipt): bigint {
        this.logger(`Attempting to extract projectId from logs in tx: ${receipt.transactionHash}`);
        for (const log of receipt.logs) {
            try {
                const decodedEvent = decodeEventLog({
                    abi: [projectCreatedEventAbi] as const,
                    data: log.data,
                    topics: log.topics
                });
                if (decodedEvent.eventName === 'ProjectCreated') {
                    const projectId = (decodedEvent.args as any)?.projectId;
                    if (typeof projectId === 'bigint') {
                         this.logger(`Successfully extracted projectId: ${projectId}`);
                        return projectId;
                    } else {
                         this.logger(`Decoded ProjectCreated event but projectId is missing or not a bigint: ${JSON.stringify(decodedEvent.args)}`);
                    }
                }
            } catch (e) {
                // Ignore logs that don't match the event
            }
        }
        this.logger(`ERROR: Could not find or decode ProjectCreated event in transaction logs for tx: ${receipt.transactionHash}`);
        throw new Error("Could not find or decode ProjectCreated event in transaction logs.");
    }

}

// Export the renamed class
export default BuidlLandPlugin;