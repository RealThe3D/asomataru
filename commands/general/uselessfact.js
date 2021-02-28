module.exports = {
  name: "uselessfact",
  aliases: ["uf"],
  permissions: [],
  ownerOnly: false,
  enabled: true,
  cooldown: 0,
  exec: async (client, message, args) => {
    const Discord = require("discord.js");
    const superagent = require("superagent");

    let { body } = await superagent.get(
      "https://uselessfacts.jsph.pl/random.json?language=en"
    );

    const embed = new Discord.MessageEmbed()
      .setTitle(`**__Useless Fact!__**`)
      .setDescription(body.text)
      .setFooter(`Powered by uselessfacts.jsph.pl`);

    message.channel.send(embed);
  },
};
