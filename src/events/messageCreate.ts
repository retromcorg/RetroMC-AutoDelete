import { setTimeout } from "node:timers";
import type { Message } from "discord.js";
import { ChannelType, Events } from "discord.js";
import { config } from "../config.js";
import type { Event } from "../types/index.js";

const THIRTY_SECONDS = 30 * 1_000;

export default {
  name: Events.MessageCreate,
  execute: async (message: Message) => {
    try {
      if (message.channelId !== config.AUTODELETE_CHANNEL) return;
      if (message.id === config.LOGIN_MSG_ID) return;
      if (message.channel.type !== ChannelType.GuildText) return;

      setTimeout(async () => {
        try {
          const cachedMessage = await message.channel.messages.fetch(message.id);
          await cachedMessage.delete();
        } catch {}
      }, THIRTY_SECONDS);
    } catch (error) {
      console.error("⚠️ Failed to schedule message deletion:", error);
    }
  },
} as const satisfies Event<Events.MessageCreate>;
