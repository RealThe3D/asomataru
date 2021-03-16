const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.all('/', (req, res) => {
	res.send("Asomataru's server is up!");
});
app.use(express.static(__dirname));
app.listen(PORT);
