import { EventModule } from "../handler";
import { Events, Message, ChannelType } from "discord.js";
import config from "../config.json";

export = {
    name: Events.MessageCreate,
    async execute(message: Message): Promise<void> {
        if (message.channelId !== config.autoDeleteChannel) return; // if message's channel ID =/= auto deletion channel
        if (message.id === config.loginMessageID) return; // if message ID = login message (Atlas Utils)
        if (message.channel.type === ChannelType.DM) return; // if channel = DM

        setTimeout(() => {
            message.delete();
        }, 30000);
    }

} as EventModule;
