'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    telephone: Number,
    table:[{type: Schema.Types.ObjectId, ref: 'table'}]
})

module.exports = mongoose.model('user', userSchema);