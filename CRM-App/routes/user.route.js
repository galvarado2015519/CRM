'user strict'

const express = require('express');
const api = express.Router();

const authentication = require('../middleware/authenticated');
const userController = require('../Controllers/User.controller');

api.post('/login', userController.login);

api.post('/', userController.saveUser);
api.put('/:id', authentication.ensureAuth, userController.updateUser);
api.delete('/:id',  userController.deleteUser);
api.get('/:id', authentication.ensureAuth ,userController.viewUser);

api.get('/', userController.viewUsers);


module.exports = api;