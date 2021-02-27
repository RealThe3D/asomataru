module.exports = {
    name: 'kiss',
    aliases: [],
    permissions: [],
    ownerOnly: false,
    enabled: true,
    cooldown: 5,
    exec: async (client, message, args) => {
        const Discord = require("discord.js");
        const superagent = require("superagent");
        let member = message.mentions.members.first() || message.author;

        let {body} = await superagent
        .get('https://nekos.life/api/v2/img/kiss')

        

        const kiss = new Discord.MessageEmbed()
            .setDescription(`${member} you got a kiss!`)
            .setColor(0x00AE86)
            .setImage(body.url)
        message.channel.send(kiss);


    },
}