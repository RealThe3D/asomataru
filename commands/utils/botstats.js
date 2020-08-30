module.exports = {
    name: 'botstats',
    aliases: ['bs'],
    permissions: [],
    ownerOnly: false,
    enabled: true,
    cooldown: 10,
    exec: async (client, message, args) => {
        const Discord = require('discord.js');
        const stats = [
        `**Guilds: ${client.guilds.cache.size} Guilds**`
        `**Users: ${client.users.cache.size} Users**`
        ]
        const botstats = new Discord.MessageEmbed()
        .setTitle(`Asomataru's Bot Stats`)
        .setDescription(`${stats}`)
        message.channel.send(botstats);
    },
};
