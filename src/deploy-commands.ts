import { env } from "node:process";
import { fileURLToPath, URL } from "node:url";
import { API } from "@discordjs/core";
import { REST } from "discord.js";
import { isCommand } from "./types/index.js";
import { loadStructures } from "./util/helpers.js";

const rest = new REST().setToken(env.TOKEN);

const api = new API(rest);

const commands = await loadStructures(fileURLToPath(new URL("commands", import.meta.url)), isCommand);
const commandData = commands.map(command => command.data);

const result = await api.applicationCommands.bulkOverwriteGlobalCommands(env.APP_ID, commandData);

console.info(`Successfully registered ${result.length} commands!`);
