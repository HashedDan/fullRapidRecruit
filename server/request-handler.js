const express = require('express');
const router = express.Router();
const pg = require('pg');
const path = require('path');
const connection = 'postgres://g4:guqdTp5A2VSUjedF@localhost:5432/g4';

var client = new pg.Client(connection);
client.connect();

/*
	GET FUNCTIONS
*/
exports.getOrganizations = (req, res) => {
  const query = client.query('SELECT * FROM organizations', (err, results) => {
    return res.json(results.rows);
  })
};

exports.getMembers = (req, res) => {
  const query = client.query('SELECT * FROM members', (err, results) => {
    return res.json(results.rows);
  })
};

exports.getLists = (req, res) => {
  const query = client.query('SELECT * FROM lists', (err, results) => {
    return res.json(results.rows);
  })
};

exports.getEvents = (req, res) => {
  const query = client.query('SELECT * FROM events', (err, results) => {
    return res.json(results.rows);
  })
};