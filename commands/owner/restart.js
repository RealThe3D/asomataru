module.exports = {
    name: 'restart',
    aliases: [],
    permissions: [],
    ownerOnly: true,
    enabled: true,
    cooldown: 10,
    exec: async (client, message, args) => {
        const owner = "327594208758202379";
    if (message.author.id === owner) {
        message.channel.send(`Ok, ${message.author}, I'll restart....`);
        message.channel.send(`Shutting down!`)
        setTimeout(() => {
            process.exit(0);
        }, 5000);
    } else {
        return message.channel.send("You are not able to force the bot to restart.");
        }
    },
}
