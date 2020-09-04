'user strict'

const express = require('express');
const api = express.Router();
const authentication = require('../middleware/authenticated');

const taskController = require('../Controllers/task.controller');

api.post('/:id', authentication.ensureAuth, taskController.saveTask);
api.put('/:id', authentication.ensureAuth, taskController.updateTask);
api.delete('/:id', authentication.ensureAuth, taskController.deleteTask);
api.get('/:id', authentication.ensureAuth, taskController.viewTask);

api.get('/', taskController.viewTasks);

module.exports = api;