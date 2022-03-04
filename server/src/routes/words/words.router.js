const express = require('express');

const {
    httpAddNewWord,
    httpReadWords,
    httpDeleteWord
} = require('./words.controller');

const wordsRouter = express.Router();

wordsRouter.get('/', httpReadWords);

wordsRouter.post('/', httpAddNewWord);

wordsRouter.delete('/:id', httpDeleteWord);

module.exports = wordsRouter;