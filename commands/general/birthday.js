module.exports = {
    name: "birthday",
    aliases: ['bday'],
    permissions: [],
    ownerOnly: false,
    enabled: true,
    cooldown: 0,
    exec: async (client, message, args) => {
        message.channel.send("3D's Birthday is on September 17!")
    },
};