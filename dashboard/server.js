const express = require('express');
const server = express();

server.all('/', (req, res) => {
	res.send('NameB - Server is ready!');
});

function keepAlive() {
	server.listen(3000, () => {
		console.log('NameB Server is Ready!');
	});
}

module.exports = keepAlive;
