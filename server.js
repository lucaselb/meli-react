var express = require("express");
var app = express();
const path = require("path");
const cors = require("cors");
const fetch = require("node-fetch");

// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 5000;

var whitelist = ["http://localhost:3000"];
var corsOptionsDelegate = function (req, callback) {
	var corsOptions;
	if (whitelist.indexOf(req.header("Origin")) !== -1) {
		corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
	} else {
		corsOptions = { origin: false }; // disable CORS for this request
	}
	callback(null, corsOptions); // callback expects two parameters: error and options
};

const buildPath = path.join(__dirname, "/client/dist/");
console.log(buildPath);
app.use(express.static(buildPath));
app.use(cors());

app.get("/api/items/:id", cors(corsOptionsDelegate), function (req, res) {
	fetch(`https://api.mercadolibre.com/items/${req.params.id}`)
		.then((res) => res.json())
		.then((body) => res.status(200).send(body))
		.catch((err) => {
			res.status(err.status).send(err.message);
		});
});
app.get("/api/search/:q", cors(corsOptionsDelegate), function (req, res) {
	fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${req.params.q}`)
		.then((res) => res.json())
		.then((body) => res.status(200).send(body))
		.catch((err) => {
			res.status(err.status).send(err.message);
		});
});

app.get("*", function (req, res) {
	res.sendFile("index.html", {
		root: path.join(buildPath),
	});
});

app.listen(port, function () {
	console.log("App listening on port " + port);
});
