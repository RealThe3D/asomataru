module.exports = {
	name: 'coinflip',
	aliases: ['coin'],
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 0,
	usage: 'coinflip',
	exec: async (client, message, args) => {
		const choices = [`had landed on heads!`, `had landed on tails!`];
		const coinResult = choices[Math.floor(Math.random() * choices.length)];
		const memName = `${message.author.username}`;
		message.channel.send(`${memName} ${coinResult}`);
	},
};
