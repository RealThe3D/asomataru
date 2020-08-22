module.exports = {
    name: 'serverinfo',
    aliases: [],
    permissions: [],
    ownerOnly: false,
    enabled: true,
    cooldown: 0,
    exec: async (client, message, args) => {
        const Discord = require("discord.js");
        const veriLevel = {
            NONE: "None",
            LOW: "Low",
            MEDIUM: "Medium",
            HIGH: "(╯°□°）╯︵ ┻━┻",
            VERY_HIGH: "(ノಠ益ಠ)ノ彡┻━┻"
        }

        let inline = true
        let servericon = message.guild.iconURL;
        let serverembed = new Discord.MessageEmbed()
            .setColor("#00ff00")
            .setThumbnail(servericon)
            .setAuthor(message.guild.name)
            .addField("Name", message.guild.name, inline)
            .addField("ID", message.guild.id, inline)
            .addField("Owner", message.guild.owner, inline)
            .addField("Region", message.guild.region, inline)
            .addField("Verification Level", veriLevel[message.guild.verificationLevel], inline)
            .addField("Members", `${message.guild.memberCount}`, inline)
            .addField("Roles", message.guild.roles.size, inline)
            .addField("Channels", message.guild.channels.size, inline)
            .addField("You Joined", message.member.joinedAt)
            .setFooter(`Created ${message.guild.createdAt}`);

        message.channel.send(serverembed);
    },
}