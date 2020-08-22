module.exports = {
    name: "ping",
    aliases: [],
    permissions: [],
    enabled: true,
    cooldown: 3,
    exec: async (client, message) => {
        const Discord = require("discord.js");
        const version = `v2.0!`;
        const ping = new Discord.MessageEmbed()
            .setTitle("Ping")
            .setDescription(`Ping?`)
            .setColor(0xDFF8EB)
            .setFooter(`Version ${version}`)
        const m = await message.channel.send(ping);
        const pong = new Discord.MessageEmbed()
            .setTitle("Ping")
            .setDescription(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. 🏓`)
            .setColor(0xDFF8EB)
            .setFooter(`Version ${version}`)
        m.edit(pong);
    },
};