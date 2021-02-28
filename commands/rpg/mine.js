// NEED TO FIX!

module.exports = {
  name: "mine",
  aliases: [],
  permissions: [],
  ownerOnly: false,
  enabled: true,
  cooldown: 300,
  exec: async (client, message, args) => {
    // Mining script because I suck. U_U
    const oreNames = [
      "copper ore",
      "iron ore",
      "mythril ore",
      "platinum ore",
      "cobblestone",
    ];
    var oreRNG = oreNames[Math.floor(Math.random() * oreNames.length)];

    // MongoDB Scripts
    const User = require("../../models/userModel.js");
    // Check for data
    let data = await User.findOne({ userID: message.author.id });

    if (!data) {
      message.channel.send(
        "You've have not registered yet, please use a!profile"
      );
    } else {
      if (oreRNG === "copper ore") {
        message.channel.send(
          `${message.author.username} has mined 1 copper ore!`
        );
        data.resources.copperore + 1;
      }
      if (fishRNG === "iron ore") {
        message.channel.send(
          `${message.author.username} has mined 1 iron ore!`
        );
        data.resources.ironore + 1;
      }
      data.save();
    }
  },
};
