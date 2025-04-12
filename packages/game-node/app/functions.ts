import {
  GameFunction,
  ExecutableGameFunctionResponse,
  ExecutableGameFunctionStatus
} from "@virtuals-protocol/game";

// Twitter-related functions
export const createTwitterFunctions = (twitterPlugin: any) => [
  // Search tweets function - Used to find tweets mentioning the bot
  new GameFunction({
    name: "search_tweets",
    description: "Search for tweets mentioning the bot to find potential project ideas",
    args: [{ name: "query", description: "Search query, typically including the bot's Twitter handle" }] as const,
    executable: async (args, logger) => {
      try {
        if (!args.query) {
          return new ExecutableGameFunctionResponse(
            ExecutableGameFunctionStatus.Failed,
            "Query is required"
          );
        }

        logger(`Searching for: ${args.query}`);

        // Use the plugin's searchTweetsFunction
        return await twitterPlugin.searchTweetsFunction.executable(args, logger);
      } catch (e) {
        return new ExecutableGameFunctionResponse(
          ExecutableGameFunctionStatus.Failed,
          `Failed to search tweets: ${e.message}`
        );
      }
    },
  }),

  // Reply to tweet function - Used to respond to project ideas that don't meet requirements
  new GameFunction({
    name: "reply_to_tweet",
    description: "Reply to a tweet, typically used to respond to project ideas that don't meet requirements",
    args: [
      { name: "tweet_id", description: "ID of the tweet to reply to" },
      { name: "reply", description: "Reply content" },
    ] as const,
    executable: async (args, logger) => {
      try {
        if (!args.tweet_id || !args.reply) {
          return new ExecutableGameFunctionResponse(
            ExecutableGameFunctionStatus.Failed,
            "Tweet ID and reply content are required"
          );
        }

        logger(`Replying to tweet ${args.tweet_id}: ${args.reply}`);

        // Use the plugin's replyTweetFunction
        return await twitterPlugin.replyTweetFunction.executable(args, logger);
      } catch (e) {
        return new ExecutableGameFunctionResponse(
          ExecutableGameFunctionStatus.Failed,
          `Failed to reply to tweet: ${e.message}`
        );
      }
    },
  }),

  // Post tweet function - Used to announce successful project creation
  new GameFunction({
    name: "post_tweet",
    description: "Post a new tweet, typically used to announce successful project creation",
    args: [
      { name: "tweet", description: "Tweet content" },
      { name: "tweet_reasoning", description: "The reasoning behind the tweet" },
    ] as const,
    executable: async (args, logger) => {
      try {
        if (!args.tweet) {
          return new ExecutableGameFunctionResponse(
            ExecutableGameFunctionStatus.Failed,
            "Tweet content is required"
          );
        }

        logger(`Posting tweet: ${args.tweet}`);

        // Use the plugin's postTweetFunction
        return await twitterPlugin.postTweetFunction.executable(args, logger);
      } catch (e) {
        return new ExecutableGameFunctionResponse(
          ExecutableGameFunctionStatus.Failed,
          `Failed to post tweet: ${e.message}`
        );
      }
    },
  }),
];

// BuidlLand-related functions
export const createBuidlLandFunctions = (buidlLandPlugin: any) => [
  // Create project function
  new GameFunction({
    name: "create_buidlland_project",
    description: "Create a new project on the BuidlLand platform",
    args: [
      { name: "title", description: "Project title" },
      { name: "description", description: "Project description" },
      { name: "tags", description: "Array of project tags" },
      { name: "aiEvaluation", description: "AI evaluation of the project" },
      { name: "marketScore", description: "Market potential score (0-100)" },
      { name: "techFeasibility", description: "Technical feasibility assessment" },
      { name: "minValuation", description: "Minimum valuation estimate" },
      { name: "maxValuation", description: "Maximum valuation estimate" },
    ] as const,
    executable: async (args, logger) => {
      try {
        logger(`Creating BuidlLand project: ${args.title}`);

        // Use the plugin's createProjectFunction
        return await buidlLandPlugin.createProjectFunction.executable(args, logger);
      } catch (e) {
        return new ExecutableGameFunctionResponse(
          ExecutableGameFunctionStatus.Failed,
          `Failed to create project: ${e.message}`
        );
      }
    },
  }),

  // Initialize project funding function
  new GameFunction({
    name: "initialize_project_funding",
    description: "Initialize crowdfunding for a project",
    args: [
      { name: "projectId", description: "ID of the project" },
      { name: "fundingGoal", description: "Funding goal amount" },
      { name: "durationSeconds", description: "Duration of the funding period in seconds" },
    ] as const,
    executable: async (args, logger) => {
      try {
        logger(`Initializing funding for project ${args.projectId}`);

        // Use the plugin's initializeFundingFunction
        return await buidlLandPlugin.initializeFundingFunction.executable(args, logger);
      } catch (e) {
        return new ExecutableGameFunctionResponse(
          ExecutableGameFunctionStatus.Failed,
          `Failed to initialize funding: ${e.message}`
        );
      }
    },
  }),

  // Create project task function
  new GameFunction({
    name: "create_project_task",
    description: "Create a new task for a project",
    args: [
      { name: "projectId", description: "ID of the project" },
      { name: "title", description: "Task title" },
      { name: "description", description: "Task description" },
      { name: "reward", description: "Task reward amount" },
      { name: "deadlineTimestamp", description: "Task deadline as Unix timestamp" },
      { name: "requiredSkills", description: "Array of required skills" },
      { name: "estimatedHours", description: "Estimated hours to complete the task" },
    ] as const,
    executable: async (args, logger) => {
      try {
        logger(`Creating task for project ${args.projectId}: ${args.title}`);

        // Use the plugin's createTaskFunction
        return await buidlLandPlugin.createTaskFunction.executable(args, logger);
      } catch (e) {
        return new ExecutableGameFunctionResponse(
          ExecutableGameFunctionStatus.Failed,
          `Failed to create task: ${e.message}`
        );
      }
    },
  }),
];