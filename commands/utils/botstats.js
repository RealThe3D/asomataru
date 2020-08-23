module.exports = {
    name: 'botstats',
    aliases: ['bs'],
    permissions: [],
    ownerOnly: false,
    enabled: true,
    cooldown: 10,
    exec: async (client, message, args) => {
        const Discord = require('discord.js');
        const botstats = new Discord.MessageEmbed()
        .setTitle(`Asomataru's Bot Stats`)
        .addField(`Guilds, ${client.guilds.cache.size} Guilds` [inline=true])
        .addField(`Members, ${client.users.cache.size} users`)   

        message.channel.send(botstats);
    },
};