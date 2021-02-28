module.exports = {
  name: "ban",
  aliases: [],
  permissions: [],
  ownerOnly: false,
  enabled: true,
  cooldown: 0,
  exec: async (client, message, args) => {
    const Discord = require("discord.js");
    let xdemb = new Discord.MessageEmbed()
      .setColor("#000000")
      .setTitle("Ban Command")
      .addField("Description:", `Ban a member`, true)
      .addField("Usage:", `!ban [user] [reason]`, true)
      .addField("Example:", `!ban @user spam`);

    if (!message.member.hasPermission("BAN_MEMBERS"))
      return message.channel.send(
        "Sorry you don't have permission to use this!"
      );

    let member = message.mentions.members.first();
    if (!member) return message.channel.send(xdemb);
    if (!member.bannable) return message.channel.send("I can't ban this user!");

    if (member.id === message.author.id)
      return message.channel.send("You can't ban your self");

    let reason = args.slice(1).join(" ");

    if (!reason) {
      res = "No reason given";
    } else {
      res = reason;
    }

    await member
      .ban(reason)
      .catch((error) =>
        message.channel.send(`Sorry, I couldn't ban because of: ${error}`)
      );

    let bean = new Discord.MessageEmbed()
      .setColor("#000000")
      .setTitle(`Ban | ${member.user.tag}`)
      .addField("User", member, true)
      .addField("Moderator", message.author, true)
      .addField("Reason", res)
      .setTimestamp();

    message.channel.send(bean);
  },
};
