import { CommandTypes, RegisterTypes, SlashCommandModule } from "../../handler";
import { PermissionFlagsBits, SlashCommandBuilder, CommandInteraction, EmbedBuilder, TextBasedChannel } from "discord.js";
import config from "../../config.json";

export = {
    type: CommandTypes.SlashCommand, // type of command
    register: RegisterTypes.Guild, // where to register commands
    userWhitelist: [config.botOwner, config.serverOwner], // users that can execute the command
    guildWhitelist: [config.serverID, config.devServerID], // guilds that this command is deployed to
    data: new SlashCommandBuilder()
        .setName("deploy-embeds")
        .setDescription("Deploys all embeds to the corresponding channels.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction: CommandInteraction): Promise<void> {

        interaction.deferReply({ ephemeral: true }); // deferring reply so reply doesn't time out

        try {

            // Discord Server Rules
            const embed = new EmbedBuilder()
                .setTitle("**Discord Server Rules**")
                .setImage("https://wiki.retromc.org/images/e/e4/Button-Server-Rules.png")
                .setDescription("Do note that the [global rules](https://wiki.retromc.org/Server_rules#Global_rules) apply to all platforms and services provided by RetroMC.")
                .addFields({ name: "**1. Advertising**", value: "Advertising or self-promotion of any kind is **not** allowed, including but not limited to the server and Direct Messages." })
                .addFields({ name: "**2. Chat Behavior**", value: "Be respectful to all players and staff members. NSFW and any form of bigotry are **not** allowed." })
                .addFields({ name: "**3. Disrespect**", value: "Disrespect, harassment, or any form of toxicity is **not** allowed. If you have an issue, please open a ticket." })
                .addFields({ name: "**4. Discord Etiquette**", value: "Use channels for their intended purpose. Do **not** spam, or use excessive caps." })
                .addFields({ name: "**5. Language**", value: "English is the **only** language allowed in public chats. Use other languages in DMs." })
                .addFields({ name: "**6. Controversial Topics**", value: "Avoid discussing controversial topics, including politics and religion." })
                .addFields({ name: "**7. Discord TOS**", value: "Adhere by [Discord's TOS and Guidelines](https://discord.com/terms). You **must** be 13+ to join this server." })
                .setFooter({
                    text: "View our full rules list on our wiki [here](https://wiki.retromc.org/Server_rules)."
                })
                .setColor("Green");

            const discord_rules_channel = interaction.guild?.channels.cache.find(channel => channel.name === "discord-rules") as TextBasedChannel; // finding channel to send embeds to, based on name

            if (!discord_rules_channel) {
                await interaction.editReply({ content: "The channel `discord-rules` was not found in this server." });
                return;
            } else {
                await discord_rules_channel.send({ embeds: [embed] });
            }

            // MC Server Rules
            const embed2 = new EmbedBuilder()
                .setTitle("MC Server Rules")
                .setImage("https://wiki.retromc.org/images/e/e4/Button-Server-Rules.png")
                .setDescription("Do note that the [global rules](https://wiki.retromc.org/Server_rules#Global_rules) apply to all platforms and services provided by RetroMC.")
                .addFields({ name: "**1. Griefing**", value: "Breaking or modifying **any** blocks that are part of a build without permission is **considered griefing**. Claiming bases or using farms that are not yours is also considered griefing. This includes abandoned or unclaimed bases." })
                .addFields({ name: "**2. Exploitation**", value: "Do **not** engage in hacking, cheating, duping, glitching, or exploiting bugs. This includes transmutation, crash slabs, X-ray, and various piston bugs that could potentially give you an advantage. If you find a bug, please report it via ticket at <#641688541444964362>." })
                .addFields({ name: "**3. AFK Farming**", value: "Macros, autoclickers, non approved bot accounts, or any other means of external automation are **not** allowed. You must be present at your computer and able to respond to chat to be able to collect items. Do **not** consecutively AFK at mob farms for a long time." })
                .addFields({ name: "**4. Claiming**", value: "Do **not** claim a town or area that is not yours. Additionally, keep your town far enough away from other towns to prevent conflict." })
                .addFields({ name: "**5. Mods**", value: "Cosmetic, quality-of-life, Optifine, mini-maps, and any other non-cheating mods are permitted." })
                .addFields({ name: "**6. Impersonation/Namesquatting**", value: "You **must** own your account to be able to play. Staff reserve the right to reset the password of suspicious accounts." })
                .addFields({ name: "**7. Chat**", value: "Advertising is **not** allowed in any capacity. Do **not** discuss controversial topics, this includes politics or religious discussion. NSFW is **not** allowed. You **must** speak English so that Staff can understand you. Do **not** try to evade a mute, you will double your initial punishment. This includes using <#554175928121425940> while muted." })
                .setFooter({
                    text: "View our full rules list on our wiki [here](https://wiki.retromc.org/Server_rules)."
                })
                .setColor("Red");

            const mc_server_rules_channel = interaction.guild?.channels.cache.find(channel => channel.name === "mcserver-rules") as TextBasedChannel;

            if (!mc_server_rules_channel) {
                await interaction.editReply({ content: "The channel `mcserver-rules` was not found in this server." });
                return;
            } else {
                await mc_server_rules_channel.send({ embeds: [embed2] });
            }

            // Server Info
            const embed3 = new EmbedBuilder()
                .setTitle("**Server Info**")
                .setImage("https://wiki.retromc.org/images/9/92/Button-RetroMC.png")
                .addFields({ name: "Server Essentials", value: "[Beta Evolutions](https://evolutions.johnymuffin.com/) \n[Password Reset](https://forgot.retromc.org/) \n[Statistics](https://j-stats.xyz/) \n[World Map](http://world.retromc.org/) \n[Wiki](https://wiki.retromc.org/index.php?title=Main_Page)" })
                .addFields({ name: "Community", value: "[Discord Invite](https://discord.retromc.org/) \n[Website](http://retromc.org/) \n[Steam Group](https://steamcommunity.com/groups/retrolands) \n" })
                .addFields({ name: "Donation Links", value: "[Capes](https://capes.johnymuffin.com/) \n[Webstore](https://store.retromc.org/)" })
                .addFields({ name: "Miscellaneous", value: "[Ban Appeal](https://forms.gle/SYwKDGK2FHEsHBV1A) \n[Staff Application](https://forms.gle/SYwKDGK2FHEsHBV1A) \n[Server Status](https://status.johnymuffin.com/)" })
                .addFields({ name: "Server IP", value: "**mc.retromc.org** \n**Beta 1.7.3**" })
                .setFooter({
                    text: `Last updated on ${new Date().toLocaleDateString()}`,
                })
                .setColor("Red");

            const server_info_channel = interaction.guild?.channels.cache.find(channel => channel.name === "server-info") as TextBasedChannel;

            if (!server_info_channel) {
                await interaction.editReply({ content: "The channel `server-info` was not found in this server." });
                return;
            } else {
                await server_info_channel.send({ embeds: [embed3] });
            }

        // replying to user once embeds are deployed
        await interaction.editReply({ content: "All embeds successfully deployed!" })

        } catch (error) {
            await interaction.editReply({ content: "There was an error. Please contact blckhrt with the appropriate logs." })
        }
    }
} as SlashCommandModule;