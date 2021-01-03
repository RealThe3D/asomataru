module.exports = {
    name: "eval",
    aliases: [],
    permissions: [],
    ownerOnly: true,
    enabled: true,
    cooldown: 0,
    exec: async (client, message, args) => {
        const code = args.join(" ");
        return evalCmd(message, code);
    }
}