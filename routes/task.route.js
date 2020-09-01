'user strict'

const express = require('express');
const api = express.Router();

const taskController = require('../Controllers/task.controller');

api.post('/', taskController.saveTask);
api.put('/:id', taskController.updateTask);
api.delete('/:id', taskController.deleteTask);
api.get('/:id', taskController.viewTask);

api.get('/', taskController.viewTasks);

module.exports = api;