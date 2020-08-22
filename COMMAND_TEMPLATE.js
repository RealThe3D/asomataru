module.exports = {
    name: "ping", // set command name
    aliases: [ "p" ], // set command aliases
    permissions: [], // set command permissions
    ownerOnly: true, // set true if command is owner only
    enabled: true, // set true if command enabled
    cooldown: 5, // in seconds
    exec: async (client, message, args) => {
        // the rest of the code
    }
}
