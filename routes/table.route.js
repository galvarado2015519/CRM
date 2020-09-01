'user strict'

const express = require('express');
const api = express.Router();

const tableController = require('../Controllers/table.controller');

api.post('/', tableController.saveTable);
api.put('/:id', tableController.updateTable);
api.delete('/:id', tableController.deleteTable);
api.get('/:id', tableController.viewTable);

api.get('/', tableController.viewTables);

module.exports = api;