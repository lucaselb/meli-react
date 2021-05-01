var express = require("express");
var app = express();
const path = require("path");
const axios = require("axios");
const cors = require("cors");

// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 5000;

const buildPath = path.join(__dirname, "..", "/dist/");
app.use(express.static(buildPath));
app.use(cors());

app.get("/api/items/:id", function (req, res) {
	axios
		.get(`https://api.mercadolibre.com/items/${req.params.id}`)
		.then((response) => {
			res.status(200).send(response.data);
		})
		.catch((err) => {
			res.status(err.status).send(err.message);
		});
});
app.get("/api/search/:q", function (req, res) {
	axios
		.get(`https://api.mercadolibre.com/sites/MLA/search?q=${req.params.q}`)
		.then((response) => {
			res.status(200).send(response.data);
		})
		.catch((err) => {
			res.status(err.status).send(err.message);
		});
});

// app.get("*", function (req, res) {
// 	res.sendFile("index.html", {
// 		root: path.join(buildPath),
// 	});
// });

app.listen(port, function () {
	console.log("App listening on port " + port);
});
