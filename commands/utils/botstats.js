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
        .addField(`${client.guilds.cache.size} Members`)
        .addField(`${client.users.cache.size} Guilds`)   

        message.channel.send(botstats);
    },
};