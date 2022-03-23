const express = require('express');
const { verifyJWT } = require('../users/users.controller');

const {
    httpAddNewWord,
    httpReadWords,
    httpDeleteWord
} = require('./words.controller');

const wordsRouter = express.Router();

wordsRouter.get('/', verifyJWT, httpReadWords);

wordsRouter.post('/', verifyJWT, httpAddNewWord);

wordsRouter.delete('/:id', httpDeleteWord);

module.exports = wordsRouter;