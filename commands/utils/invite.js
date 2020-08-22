module.exports = {
    name: 'invite',
    aliases: [],
    permissions: [],
    ownerOnly: false,
    enabled: true,
    cooldown: 10,
    exec: async (client, message, args) => {
        message.channel.send("Join the support server! https://discord.gg/vRPgqtb")
    },
};
