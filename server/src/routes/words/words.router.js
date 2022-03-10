const express = require('express');

const {
    httpAddNewWord,
    httpRandomizeWord,
    httpReadWords,
    httpDeleteWord
} = require('./words.controller');

const wordsRouter = express.Router();

wordsRouter.get('/', httpReadWords);

wordsRouter.get('/random', httpRandomizeWord);

wordsRouter.post('/', httpAddNewWord);

wordsRouter.delete('/:id', httpDeleteWord);

module.exports = wordsRouter;