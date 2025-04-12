import { GameAgent, LLMModel } from "@virtuals-protocol/game";
import { createTwitterWorker, createBuidlLandWorker } from "./worker";
import dotenv from "dotenv";
import path from "path";

// Initialize environment variables
dotenv.config({ path: path.join(__dirname, "../.env") });

// Define basic logger type
type BasicLogger = (source: string | { name: string }, message: string, ...optionalParams: any[]) => void;

// Create logger
export const logger: BasicLogger = (source, message, ...optionalParams) => {
  const prefix = typeof source === "string" ? source : source.name;
  console.log(`[${prefix}] ${message}`, ...optionalParams);
};

// Validate required environment variables
const requiredEnvVars = [
  "API_KEY",
  "TWITTER_APP_KEY",
  "TWITTER_APP_SECRET",
  "TWITTER_ACCESS_TOKEN",
  "TWITTER_ACCESS_SECRET",
  "BOT_TWITTER_HANDLE",
  "WALLET_PRIVATE_KEY",
  "DIAMOND_CONTRACT_ADDRESS",
  "RPC_URL",
  "PAYMENT_TOKEN_ADDRESS",
];

requiredEnvVars.forEach((key) => {
  if (!process.env[key]) {
    logger("BuidlLandAgent", `FATAL: Missing required environment variable: ${key}`);
    process.exit(1);
  }
});

// Set Twitter bot handle
const botTwitterHandle = process.env.BOT_TWITTER_HANDLE!.startsWith("@")
  ? process.env.BOT_TWITTER_HANDLE!
  : `@${process.env.BOT_TWITTER_HANDLE!}`;

// Create memory storage for processed tweet IDs
export const processedTweetIds = new Set<string>();

// Define agent goal
const agentGoal = `As the BuidlLand bot, responsible for discovering Web3 project ideas from Twitter and publishing them to the BuidlLand platform on Base Sepolia.

**Core Workflow:**

1.  **Search for Ideas:** Regularly use the 'search_tweets' function to find recent tweets mentioning ${botTwitterHandle}. Look for tweets containing keywords like 'idea', 'project', 'build', 'launch', 'develop', 'feature request', etc. Prioritize tweets that present specific ideas.
2.  **Check Processed Tweets:** Before evaluating a tweet, check if its ID is in the list of processed tweet IDs ('processedTweetIds') provided in the environment/state. If it is, ignore it and move to the next one.
3.  **Evaluate Ideas:** For each *new* potential idea tweet:
    *   Assess its potential: Is it clear? Novel? Feasible within Web3? Relevant to BuidlLand?
    *   Determine whether it should be approved for launch.
4.  **Process Approved Ideas:** If approved:
    *   **Generate Details:** Create the necessary details required for on-chain functions:
        *   'title': A concise project title based on the idea.
        *   'description': A detailed description based on the idea tweet.
        *   'tags': An array of relevant string tags (e.g., ['defi', 'nft', 'buidlland']).
        *   'aiEvaluation': Your brief assessment summary (string).
        *   'marketScore': Your estimated market potential score (number 0-100).
        *   'techFeasibility': Your assessment of technical feasibility (string).
        *   'minValuation': Estimated minimum valuation (number).
        *   'maxValuation': Estimated maximum valuation (number).
        *   'fundingGoal': Crowdfunding target amount (number, in minimum token units).
        *   'durationSeconds': Crowdfunding duration (number, in seconds, e.g., 7 days = 604800).
        *   'initialTasks': Array of 1-2 initial task objects, each with: 'title' (string), 'description' (string), 'reward' (number), 'deadlineTimestamp' (number, Unix timestamp), 'requiredSkills' (string[]), 'estimatedHours' (number).
    *   **Execute On-Chain Actions:**
        *   Call 'create_buidlland_project' with the generated details. **Crucial to extract the 'projectId' (number) from the successful result data.**
        *   If project creation is successful, call 'initialize_project_funding' with the extracted 'projectId' and generated funding details.
        *   If funding initialization is successful, call 'create_project_task' for *each* task defined in 'initialTasks', using the extracted 'projectId'.
    *   **Announce:** Generate an enthusiastic announcement tweet mentioning the original user (@username), the project title, and confirming its launch and funding initialization. Include relevant hashtags (#BuidlLand, #Web3, etc.). Use the 'post_tweet' function.
5.  **Process Rejected Ideas:** If not approved:
    *   Generate a polite reply tweet briefly explaining why (e.g., "needs more detail", "out of scope", "already exists") and encouraging improvement. Use the 'reply_to_tweet' function, providing the original 'tweet_id' and the generated reply text.
6.  **Update Processed Tweets:** After processing a tweet (approved or rejected), mark its ID as processed to avoid future duplication (the agent should manage this internally based on the provided state).

**Important Considerations:**
*   Be methodical. Complete one step before moving to the next.
*   Correctly extract and reuse the 'projectId'.
*   Format all parameters for functions precisely according to their descriptions.
*   Handle errors gracefully that may occur during function calls. If a critical step fails, report the error and stop the workflow for that specific idea.
`;

// Create agent
export const createBuidlLandAgent = () => {
  logger("BuidlLandAgent", "Creating GameAgent...");

  // Create Twitter and BuidlLand workers
  const twitterWorker = createTwitterWorker(logger);
  const buidlLandWorker = createBuidlLandWorker(logger);

  const agent = new GameAgent(process.env.API_KEY!, {
    name: "BuidlLandAgent",
    goal: agentGoal,
    description: "Monitors Twitter for Web3 project ideas, evaluates them using LLM, and launches approved projects on the BuidlLand platform (Base Sepolia).",
    workers: [twitterWorker, buidlLandWorker],
    llmModel: LLMModel.Llama_3_1_405B_Instruct, // Use large Llama model

    // Provide agent state including processed tweet IDs
    getAgentState: async () => {
      return {
        processedTweetIds: Array.from(processedTweetIds),
        botTwitterHandle,
      };
    },
  });

  // Set custom logger
  agent.setLogger((agent, msg) => {
    logger(agent, msg);
  });

  return agent;
};