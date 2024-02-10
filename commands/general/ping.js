const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Pong!')
        .setDMPermission(false),
    execute: async function(interaction, client) {
        await interaction.reply('Pong!');
    }
}
