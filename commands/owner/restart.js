module.exports = {
	name: 'restart',
	aliases: [],
	permissions: [],
	ownerOnly: true,
	enabled: true,
	cooldown: 10,
	exec: async (client, message, args) => {
		message.channel.send(`Ok, ${message.author}, I'll restart....`);
		message.channel.send(`Shutting down!`);
		setTimeout(() => {
			process.exit(0);
		}, 5000);
	},
};
