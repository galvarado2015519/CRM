'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tableSchema = {
    name: String,
    task: [{type: Schema.Types.ObjectId, ref: 'task'}],
}

module.exports = mongoose.model('table', tableSchema);