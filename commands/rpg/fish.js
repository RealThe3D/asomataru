module.exports = {
    name: 'fish',
    aliases: [],
    permissions: [],
    ownerOnly: false,
    enabled: true,
    cooldown: 300,
    exec: async (client, message, args) => {
        // Fish script because I suck. U_U
        const fishNames = [
            'bass',
            'salmon',
            'eel',
            'pufferfish'
        ]
        var fishRNG = fishNames[Math.floor(Math.random() * fishNames.length)];

        // MongoDB Scripts
        const User = require('../../models/userModel.js');
        // Check for data
        let data = await User.findOne({userID: message.author.id })

        if(!data) {message.channel.send("You've have not registered yet, please use a!profile")
    } else { // TEXT WALL INCOMING!!!
        if(fishRNG === "salmon") {
            message.channel.send(`${message.author.username} has caught a salmon!`)
            data.fish.salmon + 1;
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
        data.save()
        }
    },
};
