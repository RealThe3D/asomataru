module.exports = {
    name: "dog",
    aliases: ['doggo'],
    permissions: [],
    ownerOnly: false,
    enabled: true,
    cooldown: 0,
    exec: async (client, message, args) => {
        const Discord = require('discord.js');
        const superagent = require('superagent');

        let {body} = await superagent
        .get("https://random.dog/woof.json");
    
        const embed = new Discord.MessageEmbed()
        .setTitle (`**__Who is a good doggo!__**`)
        .setImage(body.url)
        .setFooter (`Powered by random.dog API`)
    
        message.channel.send(embed);
    },
};