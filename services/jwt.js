'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const key = 'pk2MeS8X';

exports.createToken = (client) =>{
    const payload ={
        sub: client._id,
        name: client.name,
        username: client.username,
        email: client.email,
        password: client.password,
        table: client.table,
        iat: moment().unix(),
        exp: moment().add(15, 'days').unix
    }

    return jwt.encode(payload, key);
}
