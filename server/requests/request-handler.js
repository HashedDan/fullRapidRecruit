const express = require('express');
const router = express.Router();
const authFuncs = require('../auth/auth-functions.js');
const passport = require('../auth/local.js');
const pg = require('pg');
const connection = 'postgres://g4:guqdTp5A2VSUjedF@localhost:5432/g4';
const bcrypt = require('bcryptjs');

var client = new pg.Client(connection);
client.connect();


/*
  LOGIN/REGISTER ROUTES
*/
exports.register = (req, res, next) => {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);
  const query = client.query('INSERT INTO members (member_first, member_last, member_org, member_email, member_pass) VALUES ($1, $2, $3, $4, $5)', [req.body.first, req.body.last, req.body.org, req.body.email, hash], (err, results) => {
      if (err) {
        res.status(400).json({status: err.message});
      }
      else {
        // passport.authenticate('local', (err, user, info) => {
        // if (user) { handleResponse(res, 200, 'success'); }
        //   })(req, res, next);
        passport.authenticate('local', (err, user, info) => {
          if (err) { handleResponse(res, 500, 'error'); }
          if (!user) { handleResponse(res, 404, 'User not found'); }
          if (user) {
            req.logIn(user, function (err) {
              if (err) { handleResponse(res, 500, 'error'); }
              handleResponse(res, 200, 'success');
            });
          }
        })(req, res, next);
      }
    })
  // return authFuncs.createMember(req, res).then((response) => {
  //   passport.authenticate('local', (err, user, info) => {
  //     if (user) { handleResponse(res, 200, 'success'); }
  //   })(req, res, next);
  // })
  // .catch((err) => {
  //  handleResponse(res, 500, 'error'); });
}

exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { handleResponse(res, 500, 'error'); }
    if (!user) { handleResponse(res, 404, 'User not found'); }
    if (user) {
      req.logIn(user, function (err) {
        if (err) { handleResponse(res, 500, 'error'); }
        handleResponse(res, 200, 'success');
      });
    }
  })(req, res, next);
}

exports.logout = (req, res, next) => {
  req.logout();
  handleResponse(res, 200, 'success');
}

/*
  ORGANIZATION ROUTES
*/
exports.getOrganizations = (req, res) => {
  // TODO: query by provided params
  if (req.query == "fkbdgdfjhk") {
    console.log(req.query.id);
    const query = client.query('SELECT * FROM organizations WHERE org_id =' + req.query.id, (err, results) => {
      return res.json(results.rows);
    })
  }
  else {
    const query = client.query('SELECT * FROM organizations WHERE org_id =' +req.user.member_org, (err, results) => {
      return res.json(results.rows);
    })
  }
};

/*
  MEMBERS ROUTES
*/
exports.getMembers = (req, res) => {
  const query = client.query('SELECT * FROM members WHERE member_org =' +req.user.member_org, (err, results) => {
    return res.json(results.rows);
  })
};

/*
  LISTS ROUTES
*/
exports.getLists = (req, res) => {
  const query = client.query('SELECT * FROM lists WHERE list_org =' + req.user.member_org, (err, results) => {
    return res.json(results.rows);
  })
};

/*
  EVENTS ROUTES
*/
exports.getEvents = (req, res) => {
  const query = client.query('SELECT * FROM events WHERE event_org =' +req.user.member_org', (err, results) => {
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
  res.status(code).json({status: statusMsg});
}