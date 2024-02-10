// Base files were coded by MusicMaker

// setting up all handlers and Discord client
require('./utils/ProcessHandlers.js')();
const { Client, PermissionFlagsBits, ActivityType } = require('discord.js');

const client = new Client({
    intents: [
        'Guilds',
        'GuildMembers',
        'GuildMessages'
    ],
    presence: {
        activities: [{
            name: 'the Login Channel',
            type: ActivityType.Watching
        }],
    }
});

client.config = require('./config.json');
client.logs = require('./utils/Logs.js');

require('./utils/Loader.js')(client);
require('./utils/Register.js')(client);

client.logs.info(`Logging in...`);
client.login(client.config.TOKEN);
client.on('ready', function () {
    client.logs.success(`Logged in as ${client.user.tag}!`);
});

// handle slash commands
async function InteractionHandler(interaction, type) {

    const args = interaction.customId?.split("_") ?? [];
    const name = args.shift();

    const command = client[type].get( name ?? interaction.commandName );
    if (!command) {
        await interaction.reply({
            content: `There was an error while executing this command!\n\`\`\`Command not found\`\`\``,
            ephemeral: true
        }).catch( () => {} );
        client.logs.error(`${type} not found: ${interaction.customId}`);
        return;
    }

    try {
        if (interaction.isAutocomplete()) {
            await command.autocomplete(interaction, client, args);
        } else {
            await command.execute(interaction, client, args);
        }
    } catch (error) {
        client.logs.error(error.stack);
        await interaction.deferReply({ ephemeral: true }).catch( () => {} );
        await interaction.editReply({
            content: `There was an error while executing this command!\n\`\`\`${error}\`\`\``,
            ephemeral: true
        }).catch( () => {} );
    }
}

// handle slash commands pt2
client.on('interactionCreate', async function(interaction) {
    if (!interaction.isCommand() && !interaction.isAutocomplete()) return;
    
    const subcommand = interaction.options._subcommand ?? "";
    const subcommandGroup = interaction.options._subcommandGroup ?? "";
    const commandArgs = interaction.options._hoistedOptions ?? [];
    const args = `${subcommandGroup} ${subcommand} ${commandArgs.map(arg => arg.value).join(" ")}`.trim();
    client.logs.info(`${interaction.user.tag} (${interaction.user.id}) > /${interaction.commandName} ${args}`);

    await InteractionHandler(interaction, 'commands');
});

// auto delete messages after 30 seconds
const { autoDeleteChannel } = require('./config.json');
client.on("messageCreate", async function(message) {
    if (message.author.bot) return;
    if (message.channel.type === 'DM') return;
    if (message.channelId !== autoDeleteChannel) return;

    setTimeout(() => {
        message.delete().catch(console.error);
    }, 30000);
});