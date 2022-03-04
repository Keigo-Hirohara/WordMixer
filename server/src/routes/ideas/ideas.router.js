const express = require('express');

const {httpGetAllIdeas, httpAddNewIdea, httpUpdateIdea, httpDeleteIdea} = require('./ideas.controller');

const ideasRouter = express.Router();

ideasRouter.get('/', httpGetAllIdeas);
ideasRouter.post('/', httpAddNewIdea);
ideasRouter.put('/:id', httpUpdateIdea);
ideasRouter.delete('/:id', httpDeleteIdea);

module.exports = ideasRouter;