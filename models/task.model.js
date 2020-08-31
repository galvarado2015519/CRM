'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = {
    state: String,
    comment: String,
    persons: {type: Schema.Types.ObjectId, ref: 'user'},
    numbers: Number,
    date: Date,
    laber: String,
    subElements: [
        String
    ]
}

module.exports = mongoose.model('task', taskSchema);