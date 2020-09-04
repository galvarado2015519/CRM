'user strict'

const express = require('express');
const api = express.Router();
const authenticated = require('../middleware/authenticated');

const tableController = require('../Controllers/table.controller');

api.post('/', authenticated.ensureAuth ,tableController.saveTable);
api.put('/:id', authenticated.ensureAuth ,tableController.updateTable);
api.delete('/:id', authenticated.ensureAuth, tableController.deleteTable);
api.get('/:id', authenticated.ensureAuth, tableController.viewTable);

api.get('/', tableController.viewTables);

module.exports = api;