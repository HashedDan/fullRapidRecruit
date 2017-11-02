const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const init = require('./passport');
const authFuncs = require('./auth-functions');

const pg = require('pg');
const connection = 'postgres://g4:guqdTp5A2VSUjedF@localhost:5432/g4';

var client = new pg.Client(connection);
client.connect();


const options = {};

passport.use(new LocalStrategy(options, (email, password, done) => {
	const query = client.query('SELECT * FROM members WHERE  members_email = ' + email, (err, results) => {
		if (results.rows.length != 0) {
			return done(null, false);
		}
		user = results.rows[0];
		if (!authFuncs.comparePass(password, user.members_password)) {
			return done(null, false);
		}
		else {
			return done(null, user);
		}
    })
}));


module.exports = passport;