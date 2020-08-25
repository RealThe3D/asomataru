module.exports = {
    name: 'work',
    aliases: [],
    permissions: [],
    ownerOnly: false,
    enabled: true,
    cooldown: 60,
    exec: async (client, message, args) => {
        const Discord = require("discord.js");

        let randomAmount = Math.floor(Math.random()* Math.floor(100)) // 1-100

        const userData = await client.models.user.findById(message.author.id)
        if(!userData) await client.models.user.create({ _id: message.author.id })

        const embed = new Discord.MessageEmbed()
        .addTitle(`${message.author.username} traveled and did some bounties`)
        .addDescription(`${message.author.username} has earned ${randomAmount} credits.`)
        .addFooter('CURRENTLY IN BETA!')

        message.channel.send(embed);
        
        userData.money = userData.money + randomAmount 
        userData.save()
    }
}