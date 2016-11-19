var express = require('express');
var superagent = require('superagent');
var app = express();

// ## CORS middleware
// see: http://stackoverflow.com/questions/7067966/how-to-allow-cors-in-express-nodejs
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

	// intercept OPTIONS method
	if ('OPTIONS' == req.method) {
		res.send(200);
	} else {
		next();
	}
});

app.get('/', function (req, res) {
	superagent.get("https://api.darksky.net/forecast/" + process.env.REACT_APP_DARKSKY_SECRET + "/37.8267,-122.4233").end(function(err, response) {
		res.setHeader('Content-Type', 'application/json');
		res.send(response.text);
	});
});

app.listen(3001, function () {
	console.log('Dark Sky proxy server listening on port 3001');
})
