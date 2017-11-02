const passport = require('passport');
const pg = require('pg');
const connection = 'postgres://g4:guqdTp5A2VSUjedF@localhost:5432/g4';

var client = new pg.Client(connection);
client.connect();

module.exports = () => {

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    const query = client.query('SELECT * FROM members WHERE  members_id = ' + id, (err, results) => {
		user = results.rows[0];
		return done(null, user);
    })
  });

};