'user strict'

const express = require('express');
const api = express.Router();

const userController = require('../Controllers/User.controller');

api.post('/', userController.saveUser);
api.put('/:id', userController.updateUser);
api.delete('/:id', userController.deleteUser);
api.get('/:id', userController.viewUser);

api.get('/', userController.viewUsers);

module.exports = api;