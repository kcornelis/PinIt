var express = require('express'),
	app = express()
	path = require('path'),
	bodyParser = require('body-parser'),
	request = require('request'),
	jwt = require('jwt-simple'),
	config = require('./serverConfig.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/auth/google', function(req, res) {
	var accessTokenUrl = 'https://accounts.google.com/o/oauth2/token';
	var peopleApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
	var params = {
		code: req.body.code,
		client_id: req.body.clientId,
		client_secret: config.auth.google.clientSecret,
		redirect_uri: req.body.redirectUri,
		grant_type: 'authorization_code'
	};

	request.post(accessTokenUrl, { json: true, form: params }, function(err, response, token) {
		var accessToken = token.access_token;
		var headers = { Authorization: 'Bearer ' + accessToken };
		request.get({ url: peopleApiUrl, headers: headers, json: true }, function(err, response, profile) {
			var payload = {
				sub: 1
			};
			token = jwt.encode(payload, config.auth.jwt.secret);
			res.send({ token: token });
		});
	});
});

app.use(express.static(path.resolve('./')));

app.listen(3020)

console.log('Application started on http://localhost:3020');
