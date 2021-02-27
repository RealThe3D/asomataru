const express = require("express");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.static(__dirname));
app.listen(PORT);