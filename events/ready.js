module.exports = (client) => {
	client.once('ready', () => {
		console.log(`${client.user.tag} is ready!`);
		client.user.setPresence({
			activity: { name: 'Asomataru! | Beta v2.5.0', type: 'PLAYING' },
			status: 'online',
		});
	});
};
