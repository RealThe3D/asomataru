module.exports = {
  name: "kick",
  aliases: [],
  permissions: [],
  ownerOnly: false,
  enabled: true,
  cooldown: 0,
  exec: async (client, message, args) => {
    const Discord = require("discord.js");

    if (!message.member.hasPermission("KICK_MEMBERS"))
      return message.channel.send(
        "Sorry, you don't have permissions to use this!"
      );

    let xdemb = new Discord.MessageEmbed()
      .setColor("#000000")
      .setTitle("Kick Command")
      .addField("Description:", `Kick a member`, true)
      .addField("Usage:", "!kick [user] [reason]", true)
      .addField("Example:", "!kick @user spam");

    let member = message.mentions.members.first();
    if (!member) return message.channel.send(xdemb);

    if (!member.kickable)
      return message.channel.send("I cannot kick this user!");

    let reason = args.slice(1).join(" ");
    if (!reason) {
      res = "No reason given";
    } else {
      res = `${reason}`;
    }

    await member
      .kick(reason)
      .catch((error) =>
        message.reply(`Sorry, I couldn't kick because of : ${error}`)
      );

    let kick = new Discord.MessageEmbed()
      .setColor("#000000")
      .setTitle(`Kick | ${member.user.tag}`)
      .addField("User", member, true)
      .addField("Moderator", message.author, true)
      .addField("Reason", res)
      .setTimestamp()
      .setFooter(member.id);

    message.channel.send(kick);
  },
};
