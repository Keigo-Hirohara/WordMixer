const express = require('express');

const {httpRegisterUser, httpLoginUser, httpValidateUser, verifyJWT} = require('./users.controller');

const usersRouter = express.Router();

usersRouter.post('/register', httpRegisterUser);
usersRouter.post('/login', httpLoginUser);
usersRouter.get('/isUserAuth', verifyJWT, httpValidateUser);

module.exports = usersRouter;