module.exports = {
	name: 'eval',
	aliases: [],
	permissions: [],
	ownerOnly: true,
	enabled: true,
	cooldown: 0,
	usage: 'eval <code>',
	exec: async (client, message, args) => {
		try {
			const code = args.join(' ');
			let evaled = eval(code);

			if (typeof evaled !== 'string')
				evaled = require('util').inspect(evaled);

			message.channel.send(clean(evaled), { code: 'xl' });
		} catch (err) {
			message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
		}
		function clean(text) {
			if (typeof text === 'string')
				return text
					.replace(/`/g, '`' + String.fromCharCode(8203))
					.replace(/@/g, '@' + String.fromCharCode(8203));
			else return text;
		}
	},
};
