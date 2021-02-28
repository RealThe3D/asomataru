module.exports = {
  name: "userinfo",
  aliases: ["user"],
  permissions: [],
  ownerOnly: false,
  enabled: true,
  cooldown: 0,
  exec: async (client, message, args) => {
    const Discord = require("discord.js");

    let inline = true;
    let resence = true;
    const status = {
      online: "Online",
      idle: "Idle",
      dnd: "Do Not Disturb",
      offline: "Offline/Invisible",
    };

    const member =
      message.mentions.members.first() ||
      message.guild.members.get(args[0]) ||
      message.member;
    let target = message.mentions.users.first() || message.author;

    if (member.user.bot === true) {
      var bot = "Yes";
    } else {
      var bot = "No";
    }
    var embed = new Discord.MessageEmbed()
      .setThumbnail(target.displayAvatarURL)
      .setColor("#00ff00")
      .addField("Full Username", `${member.user.tag}`, inline)
      .addField("ID", member.user.id, inline)
      .addField(
        "Nickname",
        `${member.nickname !== null ? `${member.nickname}` : "None"}`,
        true
      )
      .addField("Bot", `${bot}`, inline, true)
      .addField(
        "Status",
        `${status[member.user.presence.status]}`,
        inline,
        true
      )
      .addField("Joined Discord At", member.user.createdAt)
      .setFooter(`Information about ${member.user.username}`)
      .setTimestamp();
    message.channel.send(embed);
  },
};
