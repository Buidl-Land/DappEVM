import { createBuidlLandAgent, logger } from "./agent";
import { processedTweetIds } from "./agent";
import cron from "node-cron";

/**
 * BuidlLand Project Discovery and Launch Agent
 *
 * This agent periodically checks Twitter for mentions of the bot,
 * evaluates project ideas, and automatically publishes quality projects
 * to the BuidlLand platform.
 */

// Main function
async function main() {
  logger("BuidlLandAgent", "Starting BuidlLand Agent...");

  try {
    // Create and initialize agent
    const agent = createBuidlLandAgent();
    await agent.init();
    logger("BuidlLandAgent", "Agent initialized successfully.");

    // Set up scheduled task - check Twitter every 5 minutes
    // Using cron expression: minute hour day month weekday
    cron.schedule("*/5 * * * *", async () => {
      logger("BuidlLandAgent", "Running scheduled Twitter check...");
      logger("BuidlLandAgent", `Currently processed ${processedTweetIds.size} tweets.`);

      try {
        // Execute agent step
        await agent.step({ verbose: true });
        logger("BuidlLandAgent", "Scheduled check completed.");
      } catch (error: any) {
        logger("BuidlLandAgent", `Error during scheduled check: ${error.message}`);
        console.error(error);
      }
    });

    // Perform initial check immediately
    logger("BuidlLandAgent", "Performing initial Twitter check...");
    await agent.step({ verbose: true });
    logger("BuidlLandAgent", "Initial check completed.");

    logger("BuidlLandAgent", "Agent is now running in scheduled mode. Press Ctrl+C to exit.");
  } catch (error: any) {
    logger("BuidlLandAgent", `FATAL: Error initializing agent: ${error.message}`);
    console.error(error);
    process.exit(1);
  }
}

// Handle process termination signals
process.on("SIGINT", () => {
  logger("BuidlLandAgent", "Received SIGINT. Shutting down gracefully...");
  process.exit(0);
});

process.on("SIGTERM", () => {
  logger("BuidlLandAgent", "Received SIGTERM. Shutting down gracefully...");
  process.exit(0);
});

// Start application
main();