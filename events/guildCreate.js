const guildModel = require("../models/guildModel");
module.exports = async guild => {
    await guildModel.create({
        guildID: guild.id
    });
    guild.language = "en";
    console.log(`[JOINED GUILD]: ${guild.name} | ${guild.id}`);
}