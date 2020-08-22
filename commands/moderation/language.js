const fs = require("fs");
const guildModel = require("../../models/guildModel");

module.exports = {
    name: "language",
    usage: "language <code>",
    description: "language_command",
    aliases: [ "lang" ],
    cooldown: 2,
    enabled: true,
    permissions: [ "BAN_MEMBERS" ],
    exec: async (client, message, args) => {
        let lang = args[0];
        if (!lang) return await message.channel.send(message.guild.language.specify_language);
        let languages = fs.readdirSync("./locales/").filter(file => file.endsWith(".json")).map(file => file.replace(".json", ""));
        if (!languages.includes(lang)) return await message.channel.send(message.guild.language.specify_valid_language.replace(/{languages}/g, languages.join(", ")));
        let guildDocument = await guildModel.findOne({
            guildID: message.guild.id
        });
        if (!guildDocument) guildDocument = new guildModel({
            guildID: message.guild.id
        });
        guildDocument.language = lang;
        await guildDocument.save();
        message.guild.language = require(`../../locales/${lang}.json`);
        await message.channel.send(message.guild.language.language_updated);
    }
}
