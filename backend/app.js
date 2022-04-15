const express = require('express');
const app = express();

const users = require('./routes/users');

app.use('/users', users);

module.exports = app;