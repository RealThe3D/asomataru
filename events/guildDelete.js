const guildModel = require("../models/guildModel");
module.exports = async guild => {
    await guildModel.deleteMany({
        guildID: guild.id
    });
    console.log(`[LEFT GUILD]: ${guild.name} | ${guild.id}`);
}
