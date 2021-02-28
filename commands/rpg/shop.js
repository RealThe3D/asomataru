module.exports = {
  name: "shop",
  aliases: ["items"],
  permissions: [],
  ownerOnly: false,
  enabled: true,
  cooldown: 0,
  exec: async (client, message, args) => {
    const Discord = require("discord.js");
    const ItemsList = [
      `Beginner Blast [Lvl. 1]`,
      `Charged-Up Volley [Lvl. 3]`,
      `Rejuvenation [Lvl. 5]`,
      `Beginner Blast II [Lvl. 7]`,
      `Steal [Lvl. 10]`,
      `Luck's Eye [Lvl. 12]`,
    ];
    const embed = new Discord.MessageEmbed()
      .setTitle("All Items")
      .setDescription(ItemsList)
      .setFooter(`Asomataru RPG System v0.2 Beta!`);
    message.channel.send(embed);
  },
};
