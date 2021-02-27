const guildModel = require("../models/guildModel");
module.exports = async client => {
    client.user.setPresence({ activity: { name: 'Asomataru | v2.3.0.2', type: 'PLAYING' }, status: 'online' })
    for (let guild of client.guilds.cache.array()) {
        let language = "en";
        let guildDocument = await guildModel.findOne({ guildID: guild.id });
        if (guildDocument && guildDocument.language) language = guildDocument.language;
        guild.language = language;
    }
    process.stdout.write("\n");
    console.log("   Asomataru Bot!    ");
    console.log("-------------------------------");
    console.log(`[      BOT]: ${client.user.username} is ready!`);
    console.log(`[ PREFIXES]: ${client.config.prefixes.join(" ")}`);
    console.log(`[   GUILDS]: ${client.guilds.cache.size}`);
    console.log(`[ CHANNELS]: ${client.channels.cache.size}`);
    console.log(`[    USERS]: ${client.users.cache.size}`);
    console.log(`[BOOT TIME]: ${process.uptime() * 1000}ms`);
}