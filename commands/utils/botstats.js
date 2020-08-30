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
        .addFields(
            {name: 'Guilds', value: `${client.guilds.cache.size} Guilds`},
            {name: 'Members', value: `${client.users.cache.size} users`}
)
        .addFooter('Warning! This is cached data meaning that this maybe outdated until Asomataru is restarted!')
        message.channel.send(botstats);
    },
};