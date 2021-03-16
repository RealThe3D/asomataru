const express = require('express');
const app = express();

app.all('/', (req, res) => {
	res.send('Asomataru is ready!');
});

app.use(express.static(__dirname));

app.listen(3000);
