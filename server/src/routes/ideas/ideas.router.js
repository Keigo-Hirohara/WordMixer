const express = require('express');

const {httpGetAllIdeas, httpAddNewIdea, httpUpdateIdea, httpDeleteIdea} = require('./ideas.controller');

const {verifyJWT} = require('../users/users.controller');

const ideasRouter = express.Router();

ideasRouter.get('/', verifyJWT, httpGetAllIdeas);
ideasRouter.post('/', verifyJWT, httpAddNewIdea);
ideasRouter.put('/:id', httpUpdateIdea);
ideasRouter.delete('/:id', httpDeleteIdea);

module.exports = ideasRouter;