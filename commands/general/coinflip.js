module.exports = {
  name: "coinflip",
  aliases: ["coin"],
  permissions: [],
  ownerOnly: false,
  enabled: true,
  cooldown: 0,
  exec: async (client, message, args) => {
    var choices = [`had landed on heads!`, `had landed on tails!`];
    var coinResult = choices[Math.floor(Math.random() * choices.length)];
    var memName = `${message.author.username}`;
    message.channel
      .send(memName + " " + coinResult)
      .then()
      .catch(console.error);
  },
};
