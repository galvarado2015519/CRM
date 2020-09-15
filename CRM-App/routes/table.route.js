'user strict'

const express = require('express');
const api = express.Router();
const authenticated = require('../middleware/authenticated');

const tableController = require('../Controllers/table.controller');

api.get('/viewTables', authenticated.ensureAuth, tableController.viewTables);

api.post('/', authenticated.ensureAuth ,tableController.saveTable);
api.put('/:id', authenticated.ensureAuth ,tableController.updateTable);
api.delete('/:id', authenticated.ensureAuth, tableController.deleteTable);
api.get('/:id', authenticated.ensureAuth, tableController.viewTable);


module.exports = api;