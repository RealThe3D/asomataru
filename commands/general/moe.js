module.exports = {
    name: 'moemorphism',
    aliases: ['moe'],
    permissions: [],
    ownerOnly: false,
    enabled: true,
    cooldown: 0,
    exec: async (client, message, args) => {
        const Discord = require('discord.js');
        const superagent = require('superagent');

        let {body} = await superagent
        .get("https://meme-api.herokuapp.com/gimme/moemorphism");
    
    
        const embed = new Discord.MessageEmbed()
        .setImage (body.url)
        .setTitle (`**__Moemorphism__**`)
        .setURL (`https://reddit.com/r/${body.subreddit}`)
        .setFooter (`From r/${random}`)
    
        message.channel.send(embed);
        },
    };