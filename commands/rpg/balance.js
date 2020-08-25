module.exports = {
    name: 'balance',
    aliases: ['bal'],
    permissions: [],
    ownerOnly: false,
    enabled: true,
    cooldown: 5,
    exec: async (client, message, args) => {
        const Discord = require("discord.js");

        const userData = await client.models.user.findById(message.author.id)
        if(!userData) await client.models.user.create({ _id: message.author.id })

        let money = userData.money

        const embed = new Discord.MessageEmbed()
        .addTitle(`${message.author.username}'s Balance`)
        .addFields(
            {name: 'Balance', value: `${money}`, inline: true}
)
        .addFooter("CURRENTLY IN BETA")
        message.chanel.send(embed);
    }
}