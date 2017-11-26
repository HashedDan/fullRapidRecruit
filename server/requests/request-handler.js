const express = require('express');
const router = express.Router();
const authFuncs = require('../auth/auth-functions.js');
const passport = require('../auth/local.js');
const pg = require('pg');
const connection = 'postgres://g4:guqdTp5A2VSUjedF@localhost:5432/g4';
const bcrypt = require('bcryptjs');
//const logout = require('express-passport-logout');

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
              // handleResponse(res, 200, 'success');
              res.status(200).json({user: req.user});
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
        console.log(req.session);
      });
    }
  })(req, res, next);
}

exports.logout = (req, res, next) => {
  // req.logout();
  // delete req.session;
  // delete req.user;
  req.session.destroy();
  //console.log("Logout successful.");
  //console.log(req.session);
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

exports.memberFromId = (req, res) => {
  const query = client.query('SELECT * FROM members WHERE member_org =' +req.user.member_org+' AND member_id='+req.user.member_id, (err, results) => {
    return res.json(results.rows);
  })
};

exports.memberWithAdmin = (req, res) => {
  const query = client.query('SELECT * FROM members WHERE member_org =' +req.user.member_org+' AND member_level=1', (err, results) => {
    return res.json(results.rows);
  })
};

exports.removeAdmin = (req, res) => {
  const query = client.query('UPDATE members SET member_level=0 WHERE member_id='+req.body.member_id, (err, results) => {
      if (err) {
        res.status(400).json({status: err.message});
      }
      else {
        handleResponse(res, 200, 'success');
      }
  })
};

exports.newAdmin = (req, res) => {
  const query = client.query('UPDATE members SET member_level=1 WHERE member_id='+req.body.member_id, (err, results) => {
      if (err) {
        res.status(400).json({status: err.message});
      }
      else {
        handleResponse(res, 200, 'success');
      }
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

exports.postLists = (req, res) => {
  const query = client.query('INSERT INTO lists (list_name, list_org, list_owner) VALUES ($1, $2, $3)', [req.body.list_name, req.user.member_org, req.user.member_id], (err, results) => {
      if (err) {
        res.status(400).json({status: err.message});
      }
      else {
        handleResponse(res, 200, 'success');
      }
  })
};

/*
  EVENTS ROUTES
*/
exports.getEvents = (req, res) => {
  const query = client.query('SELECT * FROM events WHERE event_org =' +req.user.member_org, (err, results) => {
    return res.json(results.rows);
  })
};

exports.postEvents = (req, res) => {
  const query = client.query('INSERT INTO events (event_name, event_org, event_owner, event_list, event_location, event_interaction_req_fields) VALUES ($1, $2, $3, $4, $5, $6)', [req.body.event_name, req.user.member_org, req.user.member_id, req.body.list_id, req.body.event_location, req.body.int_req_fields], (err, results) => {
      if (err) {
        res.status(400).json({status: err.message});
      }
      else {
        handleResponse(res, 200, 'success');
      }
  })
};

exports.eventsFromList = (req, res) => {
  const query = client.query('SELECT * FROM events WHERE event_org =' +req.user.member_org+' AND event_list='+req.body.list_id, (err, results) => {
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

exports.postRecruitsFromList = (req, res) => {
  const query = client.query('SELECT * FROM recruits where recruit_list ='+req.body.list_id, (err, results) => {
    return res.json(results.rows);
  })
};

exports.postRecruits = (req, res) => {
  const query = client.query('INSERT INTO recruits (recruit_first, recruit_last, recruit_email, recruit_pic_url, recruit_res_url, recruit_org, recruit_list) VALUES ($1, $2, $3, $4, $5, $6, $7)', [req.body.first, req.body.last, req.body.email, req.body.picUrl, req.body.resUrl, req.user.member_org, req.body.recList], (err, results) => {
      if (err) {
        res.status(400).json({status: err.message});
      }
      else {
        handleResponse(res, 200, 'success');
      }
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






exports.postInteractionRecords = (req, res) => {
  const query = client.query('INSERT INTO interactions_records (int_records_event, interaction_member, interaction_recruit, interaction_score1) VALUES ($1, $2, $3, $4)', [req.body.interactionOnEventID,req.user.member_id, req.body.interaction_recruit,req.body.interaction_score1], (err, results) => {
      if (err) {
        res.status(400).json({status: err.message});
      }
      else {
        handleResponse(res, 200, 'success');
      }
  })
};

/*
  SIGN_IN ROUTES
*/
exports.getSignIn = (req, res) => {
  const query = client.query('SELECT * FROM sign_in_records', (err, results) => {
    return res.json(results.rows);
  })
};

exports.postSignIn = (req, res) => {
  const query = client.query('INSERT INTO sign_in_records (sign_in_records_first, sign_in_records_last, sign_in_records_email, sign_in_records_event_id) VALUES ($1, $2, $3, $4)', [req.body.first, req.body.last, req.body.email, req.body.signinid], (err, results) => {
      if (err) {
        res.status(400).json({status: err.message});
      }
      else {
        handleResponse(res, 200, 'success');
      }
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

exports.postDraftedVotesFromList = (req, res) => {
  const query = client.query('SELECT vote_id, vote_status, vote_abstain, vote_threshold, vote_list_id, recruit_first, recruit_last, lists.list_name FROM votes JOIN recruits on(votes.vote_on=recruits.recruit_id) JOIN lists on (votes.vote_list_id=lists.list_id) where vote_status = 0 AND vote_list_id='+req.body.list_id, (err, results) => {
    return res.json(results.rows);
  })
};

exports.postActiveVotesFromList = (req, res) => {
  const query = client.query('SELECT vote_id, vote_status, vote_abstain, vote_threshold, vote_list_id, recruit_first, recruit_last, lists.list_name FROM votes JOIN recruits on(votes.vote_on=recruits.recruit_id) JOIN lists on (votes.vote_list_id=lists.list_id) where vote_status = 1 AND vote_list_id='+req.body.list_id, (err, results) => {
    return res.json(results.rows);
  })
};

exports.changeVoteStatus = (req, res) => {
  const query = client.query('UPDATE votes set vote_status = '+req.body.new_status+' where vote_id='+req.body.vote_id, (err, results) => {
      if (err) {
        res.status(400).json({status: err.message});
      }
      else {
        handleResponse(res, 200, 'success');
      }
  })
};

exports.postVotes = (req, res) => {
  const query = client.query('INSERT INTO votes (vote_on, vote_status, vote_abstain, vote_threshold, vote_owner, vote_list_id) VALUES ($1, $2, $3, $4, $5, $6)', [req.body.on, req.body.status, req.body.abstain, req.body.threshold, req.user.member_id, req.body.listId], (err, results) => {
      if (err) {
        res.status(400).json({status: err.message});
      }
      else {
        handleResponse(res, 200, 'success');
      }
  })
};

exports.postActiveVotesExcludeSubmitted = (req, res) => {
  const query = client.query('SELECT vote_id, vote_status, vote_abstain, vote_threshold, vote_list_id, recruit_first, recruit_last, lists.list_name FROM votes JOIN recruits on(votes.vote_on=recruits.recruit_id) JOIN lists on (votes.vote_list_id=lists.list_id) where vote_status = 1 AND vote_list_id='+req.body.list_id+' AND vote_id not in (SELECT votes_records_vote_id from votes_records where votes_records_member_id ='+req.user.member_id+')', (err, results) => {
    return res.json(results.rows);
  })
};

exports.voteHistoryFromList = (req, res) => {
  const query = client.query('SELECT vote_id, vote_list_id, vote_abstain, vote_threshold, recruit_first, recruit_last, vote_result, lists.list_name FROM votes JOIN recruits on(votes.vote_on=recruits.recruit_id) JOIN lists on (votes.vote_list_id=lists.list_id) where vote_status = 2 AND vote_list_id='+req.body.list_id, (err, results) => {
    return res.json(results.rows);
  })
};

exports.postVoteResults = (req, res) => {
  const query = client.query('UPDATE votes set vote_result = '+req.body.vote_result+' where vote_id='+req.body.vote_id, (err, results) => {
      if (err) {
        res.status(400).json({status: err.message});
      }
      else {
        handleResponse(res, 200, 'success');
      }
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

exports.postVoteRecord = (req, res) => {
  const query = client.query('INSERT into votes_records (votes_records_vote_id, votes_records_value, votes_records_member_id) VALUES ($1, $2, $3)', [req.body.vote_id, req.body.vote_value, req.user.member_id], (err, results) => {
      if (err) {
        res.status(400).json({status: err.message});
      }
      else {
        handleResponse(res, 200, 'success');
      }
  })
};

exports.tallyVoteResults = (req, res) => {
  const query = client.query('select (select count(*) from votes_records where votes_records_vote_id='+req.body.vote_id+' and votes_records_value=1) as a, (select count(*) from votes_records where votes_records_vote_id='+req.body.vote_id+' and votes_records_value != 2) as b', (err, results) => {
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
  res.status(code).json({status: statusMsg, code: code});
}
