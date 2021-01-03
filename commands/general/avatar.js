module.exports = {
    name: "avatar",
    aliases: [],
    permissions: [],
    ownerOnly: false,
    enabled: true,
    cooldown: 2, 
    exec: async (client, message, args) => {
        const Discord = require("discord.js");
        const user = message.mentions.users.first() || message.author;
        const avatarEmbed = new Discord.MessageEmbed()
            .setColor(0x333333)
            .setAuthor(`${user.username}'s Profile Picture`)
            .setImage(user.avatarURL({size: 512, dynamic: true})) 
        message.channel.send(avatarEmbed);
    }
}