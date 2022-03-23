const express = require('express');

const wordsRouter = require('./words/words.router');
const ideasRouter = require('./ideas/ideas.router');
const usersRouter = require('./users/users.router');

const api = express.Router();


api.use('/word', wordsRouter);
api.use('/idea', ideasRouter);
api.use('/', usersRouter);

module.exports = api;