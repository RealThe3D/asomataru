module.exports = {
    name: 'chop',
    aliases: [],
    permissions: [],
    ownerOnly: false,
    enabled: true,
    cooldown: 300,
    exec: async (client, message, args) => {
        // Wood script because I suck. U_U
        const woodNames = [
            "oak wood"
        ]
        var woodRNG = woodNames[Math.floor(Math.random() * woodNames.length)];

        // MongoDB Scripts
        const User = require('../../models/userModel.js');
        // Check for data
        let data = await User.findOne({userID: message.author.id })

        if(!data) {message.channel.send("You've have not registered yet, please use a!profile")
    } else { // TEXT WALL INCOMING!!!
        if(fishRNG === "oak wood") {
            message.channel.send(`${message.author.username} has chopped down a tree and got 1 oak wood!`)
            "data.resources.oak wood" + 1;
        }
        if(fishRNG === "bass") {
            message.channel.send(`${message.author.username} has caught a bass!`)
            data.fish.salmon + 1;
        }
        if(fishRNG === "eel") {
            message.channel.send(`${message.author.username} has caught an eel!`)
            data.fish.eel + 1;
        }
        if(fishRNG === "pufferfish") {
            message.channel.send(`${message.author.username} has caught a pufferfish!`)
            data.fish.pufferish + 1;
        }
        data.save();
        }
    },
};