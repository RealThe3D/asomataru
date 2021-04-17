module.exports = (client) => {
	client.once('ready', () => {
		console.log(`${client.user.tag} is ready!`);
		client.user.setPresence({
			activity: { name: 'Asomataru! | release v2.4.1', type: 'PLAYING' },
			status: 'online',
		});
	});
};
