module.exports = {
    name: 'craft',
    aliases: [],
    permissions: [],
    ownerOnly: false,
    enabled: false,
    cooldown: 300,
    exec: async (client, message, args) => {
        const User = require('../../models/userModel.js');
                // Check for data
                let data = await User.findOne({userID: message.author.id })
        
                if(!data) {
                    message.channel.send("You've have not registered yet, please use a!profile")
            } else { 
        if(args[0] === '1') {
            if(data.resources.oakwood > 3) {
                data.weapons.WeaponID1 = 1
                data.resources.oakwood = data.resources.oakwood - 3
                message.channel.send("Crafted!");
                data.save();
            } else {
                message.channel.send('Not enough resources!');
                }
            }
        }
    },
}