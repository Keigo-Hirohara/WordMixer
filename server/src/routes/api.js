const express = require('express');

const wordsRouter = require('./words/words.router');
const ideasRouter = require('./ideas/ideas.router');

const api = express.Router();

api.use('/word', wordsRouter);
api.use('/idea', ideasRouter);

module.exports = api;