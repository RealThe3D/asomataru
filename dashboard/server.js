const express = require('express');
const app = express();

app.all('/', (req, res) => {
	res.send('Asomataru is ready!');
});

app.use(express.static(__dirname));

function keepAlive() {
	app.listen(8080, () => {
		console.log("Asomataru's app is ready!");
	});
}

module.exports = keepAlive;
