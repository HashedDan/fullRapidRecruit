const express = require('express');
const router = express.Router();
const authFuncs = require('../auth/auth-functions.js');
const passport = require('../auth/local.js');
const pg = require('pg');
const connection = 'postgres://g4:guqdTp5A2VSUjedF@localhost:5432/g4';

var client = new pg.Client(connection);
client.connect();


/*
  LOGIN/REGISTER ROUTES
*/
exports.register = (req, res, next) => {
  return authFuncs.createMember(req, res).then((response) => {
    passport.authenticate('local', (err, user, info) => {
      if (user) { handleResponse(res, 200, 'success'); }
    })(req, res, next);
  })
  .catch((err) => {
   console.log(err);
   handleResponse(res, 500, 'error'); });
}

/*
  ORGANIZATION ROUTES
*/
exports.getOrganizations = (req, res) => {
  if (req.query.id != null) {
    const query = client.query('SELECT * FROM organizations WHERE org_id =' + req.query.id, (err, results) => {
      return res.json(results.rows[0]);
    })
  }
  else {
    const query = client.query('SELECT * FROM organizations', (err, results) => {
      return res.json(results.rows);
    })
  }
};

/*
  MEMBERS ROUTES
*/
exports.getMembers = (req, res) => {
  const query = client.query('SELECT * FROM members', (err, results) => {
    return res.json(results.rows);
  })
};

/*
  LISTS ROUTES
*/
exports.getLists = (req, res) => {
  const query = client.query('SELECT * FROM lists', (err, results) => {
    return res.json(results.rows);
  })
};

/*
  EVENTS ROUTES
*/
exports.getEvents = (req, res) => {
  const query = client.query('SELECT * FROM events', (err, results) => {
    return res.json(results.rows);
  })
};

/*
  RECRUIT ROUTES
*/
exports.getRecruits = (req, res) => {
  const query = client.query('SELECT * FROM recruits', (err, results) => {
    return res.json(results.rows);
  })
};

/*
  INTERACTIONS ROUTES
*/
exports.getInteractions = (req, res) => {
  const query = client.query('SELECT * FROM interactions', (err, results) => {
    return res.json(results.rows);
  })
};

/*
  INTERACTIONS_RECORDS ROUTES
*/
exports.getInteractionsRecords = (req, res) => {
  const query = client.query('SELECT * FROM interactions_records', (err, results) => {
    return res.json(results.rows);
  })
};

/*
  SIGN_IN ROUTES
*/
exports.getSignIn = (req, res) => {
  const query = client.query('SELECT * FROM sign_in', (err, results) => {
    return res.json(results.rows);
  })
};

/*
  VOTES ROUTES
*/
exports.getVotes = (req, res) => {
  const query = client.query('SELECT * FROM votes', (err, results) => {
    return res.json(results.rows);
  })
};

/*
  VOTES_RECORDS ROUTES
*/
exports.getVoteRecords = (req, res) => {
  const query = client.query('SELECT * FROM votes_records', (err, results) => {
    return res.json(results.rows);
  })
};

/*
  SHARE ROUTES
*/
exports.getShare = (req, res) => {
  const query = client.query('SELECT * FROM share', (err, results) => {
    return res.json(results.rows);
  })
};


// HELPERS

function handleResponse(res, code, statusMsg) {
  getOrganizations();
  // res.status(code).json({status: statusMsg});
}