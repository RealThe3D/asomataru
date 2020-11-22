module.exports = {
    name: 'kiss',
    aliases: [],
    permissions: [],
    ownerOnly: false,
    enabled: true,
    cooldown: 5,
    exec: async (client, message, args) => {
        let mentioned = message.mentions.members.first() || message.author
        var options = [
            "https://media.giphy.com/media/12VXIxKaIEarL2/giphy.gif",
            "https://media.giphy.com/media/zkppEMFvRX5FC/giphy.gif",
            "https://media.giphy.com/media/hnNyVPIXgLdle/giphy.gif",
            "https://media.giphy.com/media/pcui5ohH3X96M/giphy.gif",
            "https://media.giphy.com/media/lBGj9wHG59Xr2/giphy.gif", //5
            "https://media.giphy.com/media/G3va31oEEnIkM/giphy.gif",
            "https://media.giphy.com/media/zkppEMFvRX5FC/giphy.gif",
            "https://media.giphy.com/media/flmwfIpFVrSKI/giphy.gif",
            "https://media.giphy.com/media/l4FsKa1n9fyStiwZW/giphy.gif", //10
            "https://media.giphy.com/media/1OrOsLiYJcMdG/giphy.gif",
            "https://media.giphy.com/media/l4FsxDD7LwInTgy5O/giphy.gif",
            "https://media.giphy.com/media/EVODaJHSXZGta/giphy.gif",
            "https://media.giphy.com/media/7z1xs4Fl9Kb8A/giphy.gif",
            "https://media.giphy.com/media/5tmRHwTlHAA9WkVxTU/giphy.gif", //15
        ];
        var response = options[Math.floor(Math.random() * options.length)];
        const Discord = require("discord.js");

        const kiss = new Discord.MessageEmbed()
            .setDescription(`${mentioned} you got a kiss!`)
            .setColor(0x00AE86)
            .setImage(`${response}`)
        message.channel.send(kiss);


    },
}