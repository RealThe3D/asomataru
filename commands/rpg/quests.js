module.exports = {
    name: 'quests',
    aliases: [''],
    permissions: [],
    ownerOnly: false,
    enabled: true,
    cooldown: 0,
    exec: async (client, message, args) => {
        const Discord = require("discord.js");

        const embed = new Discord.MessageEmbed()
        .setTitle("Coming soon!")
        .setDescription("Update will come soon.")
        message.channel.send("Coming soon...")
    },
}