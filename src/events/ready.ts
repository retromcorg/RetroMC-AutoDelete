import Logger from "../handler/util/Logger";
import { Events, ActivityType, TextBasedChannel } from "discord.js";
import { EventModule, UserStatus } from "../handler";
import { DiscordClient } from "../handler/util/DiscordClient";
import config from "../config.json";

export = {
    name: Events.ClientReady,
    once: true,
    async execute(client: DiscordClient): Promise<void> {
        if (!client.user) return;

        client.user.setStatus(UserStatus.Online);
        Logger.log(`Ready! Logged in as ${client.user.tag}`);

        async function deleteMessages() {
            const channel = await client.channels.fetch(config.autoDeleteChannel) as TextBasedChannel;
            if (!channel) return console.error("Auto deletion channel not found.");

            await channel.messages.fetch()
                .then((messages) => {
                    const messagesToDelete = messages.filter((msg) => msg.id !== config.loginMessageID);

                    if (messagesToDelete.size > 0) {
                        messagesToDelete.forEach(async (msg) => {
                            try {
                                msg.delete();
                            } catch (error) {
                                console.error(error);
                            }
                        });
                    }
                }
                );
        }

        setInterval(deleteMessages, 3600000);
    }
} as EventModule;