const { Events } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

        // Permissons Config
        const requiredRoleId = '1307783744454918154'; 
        const commandsthatrequiresauth = ["clear"];

        // Do some logging
        console.log(interaction.commandName);


        // Permisson check
        if (commandsthatrequiresauth.includes(interaction.commandName)) {
            if (!interaction.member.roles.cache.has(requiredRoleId)) {
                await interaction.reply({ content: 'permission denied!.', ephemeral: true });
                return;
            }
        }

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
            } else {
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    },
};