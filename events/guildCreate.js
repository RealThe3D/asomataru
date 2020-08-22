const guildModel = require("../models/guildModel");
module.exports = async guild => {
    await guildModel.create({
        guildID: guild.id
    });
    guild.language = require("../locales/en.json");
    console.log(`[JOINED GUILD]: ${guild.name} | ${guild.id}`);
}
