const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();

app.use('/', express.static(__dirname + '/public'));
app.use('/', express.static(__dirname + '/views'));

app.get('*', (req, res) => {
	res.sendStatus(404);
});

app.listen(PORT, () => {
	console.log('Server is up!');
});
