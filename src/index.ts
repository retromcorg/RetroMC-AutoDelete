import { fileURLToPath, URL } from "node:url";
import { Client, Collection, GatewayIntentBits } from "discord.js";
import { isCommand, isEvent } from "./types/index.js";
import { loadStructures } from "./util/helpers.js";

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages],
});

client.commands = new Collection();

const commands = await loadStructures(fileURLToPath(new URL("commands", import.meta.url)), isCommand);

for (const command of commands) {
  client.commands.set(command.data.name, command);
}

const events = await loadStructures(fileURLToPath(new URL("events", import.meta.url)), isEvent);

for (const event of events) {
  client[event.once ? "once" : "on"](event.name, async (...args) => event.execute(...args));
}

await client.login();
