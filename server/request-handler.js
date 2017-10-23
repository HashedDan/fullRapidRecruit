const express = require('express');
const router = express.Router();
const pg = require('pg');
const path = require('path');
const connection = 'postgres://localhost:5432/g4';

var client = new pg.Client(connection);
client.connect();

exports.getOrganizations = (req, res) => {
  const results = [];
  const ticket = req.body;
  // const query = client.query('INSERT INTO tickets(author, subject, issue, chatUrl, archive, status) values ($1, $2, $3, $4, $5, $6)', [ticket.author, ticket.subject, ticket.issue, ticket.chatUrl, ticket.archive, ticket.status]);
  query.on('row', (row) => {
    results.push(row);
  })
  query.on('end', () => {
    return res.json(results);
  });
};