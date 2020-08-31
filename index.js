'use strict'

const mongoose = require('mongoose');
const port = 3800;
const app = require('./app');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/dbCRM',{useNewUrlParser:true, useUnifiedTopology:true})
    .then(()=>{
        console.log('Conexión a la base de datos correcta')
        app.listen(port, ()=>{
            console.log("El servidor esta corriendo en el puerto: " + port)
        })
    }).catch(err =>{
        console.log('Error al conectarse a la base de datos, err: ' + err)
    })

module.exports = app;