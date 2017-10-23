const express = require('express');
const router = express.Router();
const pg = require('pg');
const path = require('path');
const connection = 'postgres://localhost:5432/g4';

var client = new pg.Client(connection);
client.connect();

/*
	GET FUNCTIONS
*/
exports.getOrganizations = (req, res) => {
  const results = [];
  const ticket = req.body;
  const query = client.query('SELECT * FROM organizations');
  query.on('row', (row) => {
    results.push(row);
  })
  query.on('end', () => {
    return res.json(results);
  });
};

exports.getMembers = (req, res) => {
  const results = [];
  const ticket = req.body;
  const query = client.query('SELECT * FROM members');
  query.on('row', (row) => {
    results.push(row);
  })
  query.on('end', () => {
    return res.json(results);
  });
};

exports.getLists = (req, res) => {
  const results = [];
  const ticket = req.body;
  const query = client.query('SELECT * FROM lists');
  query.on('row', (row) => {
    results.push(row);
  })
  query.on('end', () => {
    return res.json(results);
  });
};

exports.getEvents = (req, res) => {
  const results = [];
  const ticket = req.body;
  const query = client.query('SELECT * FROM events');
  query.on('row', (row) => {
    results.push(row);
  })
  query.on('end', () => {
    return res.json(results);
  });
};