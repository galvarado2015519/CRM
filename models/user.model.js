'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    name: String,
    username: String,
    email: String,
    telephone: Number,
    task:[{type: Schema.Types.ObjectId, ref: 'task'}]
})

module.exports = mongoose.model('user', userSchema);