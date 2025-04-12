import type { CommandInteraction } from "discord.js";
import { Events } from "discord.js";
import type { Event } from "../types/event.js";

export async function handleCommandInteraction(interaction: CommandInteraction): Promise<void> {
  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.warn(`The command ${interaction.commandName} is not loaded but was used.`);

    await interaction.reply({
      content: "Invalid command, this wasn't supposed to happen.",
      ephemeral: true,
    });

    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);

    await interaction.reply({
      content: "An unknown error occurred, please try again later.",
      ephemeral: true,
    });
  }
}

export default {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (interaction.isCommand()) {
      await handleCommandInteraction(interaction);
    }
  },
} as const satisfies Event<Events.InteractionCreate>;
