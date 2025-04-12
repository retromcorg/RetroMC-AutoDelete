import { Events } from "discord.js";
import { config } from "../config.js";
import type { Event } from "../types/index.js";

const TWO_WEEKS = 14 * 24 * 60 * 60 * 1_000;

export default {
  name: Events.ClientReady,
  execute: async client => {
    console.info(`✅ Successfully logged in as ${client.user.tag}.`);

    console.debug(`🔍 Fetching channel with ID: ${config.AUTODELETE_CHANNEL}`);
    const channel = await client.channels.fetch(config.AUTODELETE_CHANNEL);
    if (!channel?.isTextBased()) {
      console.warn("⚠️ The autodelete channel in the config is not a text channel or doesn't exist.");
      throw new Error("Invalid channel type or channel not found.");
    }

    console.debug("📥 Fetching last 50 messages from the channel...");
    const messages = await channel.messages.fetch({ limit: 50 });

    console.debug(`🧾 Fetched ${messages.size} messages. Checking for deletion candidates...`);
    let deleted = 0;

    for (const message of messages.values()) {
      try {
        const age = Date.now() - message.createdTimestamp;
        const isNew = age < TWO_WEEKS;
        const isLoginMsg = message.id === config.LOGIN_MSG_ID;

        if (isNew && !isLoginMsg) {
          await message.delete();
          deleted++;
        }
      } catch (error) {
        console.error(`❌ Failed to delete message ${message.id}:`, error);
        continue;
      }
    }

    console.info(`✅ Done. Deleted ${deleted} message(s).`);
  },
} as const satisfies Event<Events.ClientReady>;
