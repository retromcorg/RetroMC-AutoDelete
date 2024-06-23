import "dotenv/config";
import { AutomaticIntents } from "./handler";
import { DiscordClient } from "./handler/util/DiscordClient";

export const client: DiscordClient = new DiscordClient({
    // "AutomaticIntents" will provide your client with all necessary Intents.
    // By default, two specific Intents are enabled (Guilds, & MessageContent).
    // For details or modifications, see the config.ts file.
    // Manually adding Intents also works.
    intents: AutomaticIntents
});

(async (): Promise<void> => {
    // You can modify the "events", "components" and "commands" folder name in the config.ts file.
    // All directories can have subfolders, subfolders in subfolders and even no subfolders.
    await client.registerEvents();
    await client.registerComponents();
    await client.registerCommands({
        // Whether to deploy your Slash Commands to the Discord API (refreshes command.data)
        // Not needed when just updating the execute function.
        // Keep in mind that guild commands (deploy: false) will be deployed instantly
        // and global commands (deploy: true) can take up to one hour.
        deploy: true
    });
    // Existing commands can be deleted with their id and RegisterType like this:
    // await client.deleteCommand("1239882465229668414", RegisterTypes.Guild)
    // await client.deleteCommands(["1239882465229668414", "1239882465229668414"], RegisterTypes.Guild)
    // await client.deleteAllCommands(RegisterTypes.Guild)
    await client.connect(process.env.CLIENT_TOKEN);
})();

process.on("unhandledRejection", (reason, promise) => {
    console.error("[antiCrash] :: [unhandledRejection]");
    console.log(promise, reason);
});

process.on("uncaughtException", (err, origin) => {
    console.error("[antiCrash] :: [uncaughtException]");
    console.log(err, origin);
});

process.on("uncaughtExceptionMonitor", (err, origin) => {
    console.error("[antiCrash] :: [uncaughtExceptionMonitor]");
    console.log(err, origin);
});

process.on("uncaughtMultipleResolves", (type, promise, reason) => {
    console.error(`[antiCrash] :: [uncaughtMultipleResolves]`);
    console.log(type, promise, reason);
});