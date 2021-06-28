const package = require('../package.json');
const { client } = require('../index.js');

client.once('ready', () => {
	console.log(`${client.user.tag} is ready!`);
	client.user.setPresence({
		activity: { name: `Asomataru! | v${package.version}`, type: 'PLAYING' },
		status: 'online',
	});
});
