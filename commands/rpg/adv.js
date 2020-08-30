module.exports = {
    name: 'adventure',
    aliases: ['adv'],
    permissions: [],
    ownerOnly: false,
    enabled: true,
    cooldown: 60,
    exec: async (client, message, args) => {
        const User = require('../../models/userModel.js');
        const Discord = require("discord.js");

        let randomAmount = Math.floor(Math.random()* Math.floor(100)) // 1-100

        let data = await User.findOne({userID: message.author.id })
  
        if(!data) await User.create({ userID: message.author.id })

        const embed = new Discord.MessageEmbed()
        .setTitle(`${message.author.username} traveled and did some bounties!`)
        .setDescription(`${message.author.username} has earned ${randomAmount} credits.`)
        .setFooter('Asomataru RPG System v0.1 Beta!')

        message.channel.send(embed);
        
        data.coins = data.coins + randomAmount 
        data.save()
    }
}