const express = require('express');
const server = express();

server.all('/', (req, res) => {
	res.send('Asomataru is ready!');
});
server.use(__dirname);
function keepAlive() {
	server.listen(3000, () => {
		console.log("Asomataru's server is ready!");
	});
}

module.exports = keepAlive;
