import { GameWorker } from "@virtuals-protocol/game";
import TwitterPlugin, { GameTwitterClient } from "@virtuals-protocol/game-twitter-plugin";
import BuidlLandPlugin from "@buidlland/game-buidlland-plugin";
import { createTwitterFunctions, createBuidlLandFunctions } from "./functions";
import { baseSepolia } from 'viem/chains';
import { Hex } from 'viem';

// Define basic logger type
type BasicLogger = (source: string | { name: string }, message: string, ...optionalParams: any[]) => void;

// Create Twitter plugin and worker
export const createTwitterWorker = (logger: BasicLogger) => {
  if (!process.env.TWITTER_APP_KEY || !process.env.TWITTER_APP_SECRET ||
      !process.env.TWITTER_ACCESS_TOKEN || !process.env.TWITTER_ACCESS_SECRET) {
    throw new Error("Missing Twitter credentials in environment variables");
  }

  // Create Twitter client
  const twitterClient = new GameTwitterClient({
    apiKey: process.env.TWITTER_APP_KEY,
    apiSecret: process.env.TWITTER_APP_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_SECRET,
  });

  // Create Twitter plugin
  const twitterPlugin = new TwitterPlugin({
    twitterClient,
  });

  // Create Twitter functions using the plugin
  const twitterFunctions = createTwitterFunctions(twitterPlugin);

  // Return Twitter worker
  return twitterPlugin.getWorker({
    id: "twitter_worker",
    name: "Twitter Worker",
    description: "Worker that handles Twitter interactions, including searching, posting, and replying to tweets",
    logger: (msg: string) => logger(twitterPlugin.name, msg),
    functions: twitterFunctions
  });
};

// Create BuidlLand plugin and worker
export const createBuidlLandWorker = (logger: BasicLogger) => {
  if (!process.env.WALLET_PRIVATE_KEY || !process.env.DIAMOND_CONTRACT_ADDRESS ||
      !process.env.RPC_URL || !process.env.PAYMENT_TOKEN_ADDRESS) {
    throw new Error("Missing BuidlLand credentials in environment variables");
  }

  // Create BuidlLand plugin
  const buidlLandPlugin = new BuidlLandPlugin({
    walletPrivateKey: process.env.WALLET_PRIVATE_KEY as Hex,
    diamondContractAddress: process.env.DIAMOND_CONTRACT_ADDRESS as Hex,
    rpcUrl: process.env.RPC_URL,
    chain: baseSepolia,
    paymentTokenAddress: process.env.PAYMENT_TOKEN_ADDRESS as Hex,
  });

  // Create BuidlLand functions using the plugin
  const buidlLandFunctions = createBuidlLandFunctions(buidlLandPlugin);

  // Return BuidlLand worker
  return new GameWorker({
    id: "buidlland_worker",
    name: "BuidlLand Worker",
    description: "Worker that handles BuidlLand platform interactions, including project creation, funding, and task management",
    functions: buidlLandFunctions,
  });
};