const express = require('express');
const path = require('path');
const routes = require('./routes.js');
const app = express();
const port = process.env.PORT || 8084;
const router = express.Router();
const bodyParser = require('body-parser');
const passport = require('./auth/local.js');
var session = require('express-session');

app.set('view engine', 'html');

app.use([bodyParser.json(), bodyParser.urlencoded({
	extended: true
})]);
app.use(express.static(path.join(__dirname, '../client')));

app.use((err, req, res, next) => {
	console.log(err);
	res.status(500).send('Server Error');
});

app.use(session({
	secret: "this-is-a-secret-key",
	cookie: {
		maxAge: null
	},
	resave: false,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', routes);

app.get('/signin/:uniqueorg/:uniquelist/:uniqueevent', (req, res, next) => {
		res.sendFile(path.join(__dirname, '..', 'client', 'signin.html'));
});

router.get('/', (req, res, next) => {
		res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

app.listen(port, (err) => {
	err ? console.log('Cannot connect...', err) : console.log(`Connected! Server is listening on port ${port}`);
});