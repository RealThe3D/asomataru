const guildModel = require("../models/guildModel");
const activeUsers = {};
module.exports = async message => {
    if (message.author.bot || !message.guild) return;
    let prefix = message.client.config.prefixes[0], cmdFile;
    for (let i = 0; i < message.client.config.prefixes.length; i++) {
        if (message.content.startsWith(message.client.config.prefixes[i])) prefix = message.client.config.prefixes[i];
    }
    if (!message.content.startsWith(prefix)) return;
    if (!message.guild.language) {
        let language = "en";
        let guildDocument = await guildModel.findOne({
            guildID: message.guild.id
        });
        if (guildDocument && guildDocument.language) language = guildDocument.language;
        message.guild.language = require(`../locales/${language}.json`);
    }
    let args = message.content.slice(prefix.length).split(" ");
    command = args.shift();
    if (message.client.commands.has(command)) cmdFile = message.client.commands.get(command);
    else if (message.client.aliases.has(command)) cmdFile = message.client.aliases.get(command);
    else return;
    if (!cmdFile.enabled) return await message.channel.send(message.guild.language.command_disabled);
    if (cmdFile.ownerOnly && !message.client.config.owners.includes(message.author.id)) return await message.channel.send(message.guild.language.command_owner_only);
    if (cmdFile.permissions && !(message.client.config.owners.includes(message.author.id) || message.member.permissions.has(cmdFile.permissions))) return await message.channel.send(message.guild.language.not_enough_permission.replace(/{permissions}/g, cmdFile.permissions.join(", ")));
    if (cmdFile.cooldown && typeof cmdFile.cooldown === "number" && cmdFile.cooldown >= 1 && cmdFile.cooldown <= 1440) {
        if (!activeUsers.hasOwnProperty(cmdFile.name)) activeUsers[cmdFile.name] = [];
        if (activeUsers[cmdFile.name].includes(message.author.id)) return await message.channel.send(message.guild.language.wait_cooldown.replace(/{cooldown}/g, cmdFile.cooldown));;
    } 
    cmdFile.exec(message.client, message, args);
    if (activeUsers.hasOwnProperty(cmdFile.name)) {
        activeUsers[cmdFile.name].push(message.author.id);
        message.client.setTimeout(() => {
            activeUsers[cmdFile.name].splice(activeUsers[cmdFile.name].indexOf(message.author.id), 1);
        }, cmdFile.cooldown * 1000);
    }
}