const { Events } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

        // Permissions Config
        const requiredRoleId = '1307783744454918154'; 
        const commandsThatRequireAuth = ["clear"];

        // Log command name
        console.log(interaction.commandName);

        // Removed instead use the default discord version
        // Permission check
        //if (commandsThatRequireAuth.includes(interaction.commandName)) {
        //    // Check if member and roles are valid
        //    if (!interaction.member || !interaction.member.roles || !interaction.member.roles.cache || !interaction.member.roles.cache.has(requiredRoleId)) {
        //        await interaction.reply({ content: 'Permission denied!', ephemeral: true });
        //        return;
        //    }
        //}

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
