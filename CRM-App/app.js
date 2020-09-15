'use strict'

const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const userRoute = require('./routes/user.route');
const tableRoute = require('./routes/table.route');
const taskRoute = require('./routes/task.route');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//COR'S
app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use('/user', userRoute);
app.use('/table', tableRoute);
app.use('/task', taskRoute);

module.exports = app;