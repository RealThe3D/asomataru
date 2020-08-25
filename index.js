const { Client } = require("discord.js");
const Mongoose = require("mongoose");
const TOKEN = process.env.BOT_TOKEN;
const client = new Client();
client.config = require("./config.json");
Mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
client.database = Mongoose.connection;
client.database.on("error", (err) => {
    throw err;
});
client.database.once("open", async () => {
    require("./models");
    require("./models/userModel")
    require("./handlers/eventHandler")(client);
    require("./handlers/moduleHandler")(client);
    client.login(TOKEN);
});