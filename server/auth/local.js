const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const init = require('./passport');
const authFuncs = require('./auth-functions');

const pg = require('pg');
const connection = 'postgres://g4:guqdTp5A2VSUjedF@localhost:5432/g4';

var client = new pg.Client(connection);
client.connect();

init();

const options = {
	usernameField: 'email',
	passwordField: 'password'
};

passport.use(new LocalStrategy(options, (email, password, done) => {
	const query = client.query('SELECT * FROM members WHERE member_email = $1', [email], (err, results) => {
		if (results.rows.length < 1) {
			return done(null, false);
		}
		user = results.rows[0];
		if (!authFuncs.comparePasswords(password, user.member_pass)) {
			return done(null, false);
		}
		else {
			console.log("successful authentification");
			console.log(user);
			return done(null, user);
		}
    })
}));


module.exports = passport;