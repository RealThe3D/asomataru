const { Collection } = require("discord.js");
const fs = require("fs");
const path = require("path");
const Commands = new Collection();
const Aliases = new Collection();
const modules = fs.readdirSync("./commands").filter(file => fs.statSync(path.join("./commands", file)).isDirectory());
for (let module of modules) {
    console.info(`Loading module: ${module}`);
    let commandFiles = fs.readdirSync(path.resolve(`./commands/${module}`)).filter(file => !fs.statSync(path.resolve("./commands/", module, file)).isDirectory()).filter(file => file.endsWith(".js"));
    for (let file of commandFiles) {
        console.info(`Loading command: ${file}`);
        file = require(`../commands/${module}/${file}`);
        file.module = module;
        Commands.set(file.name, file);
        for (let alias of file.aliases) Aliases.set(alias, file);
    }
}
module.exports = client => {
    client.commands = Commands;
    client.aliases = Aliases;
}