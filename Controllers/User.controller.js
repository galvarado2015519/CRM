'use strict'

const User = require('../models/user.model');
const bcrypt = require('bcrypt-nodejs');

function saveUser(req, res) {
    
    const body = req.body;
    const user = new User();

    User.findOne({$or:[{email: body.email},{username: body.username}]},(err, findUserRepeat)=>{
        if(err){
            res.status(500).send({message:"Error general del servidor, err: " + err});
        }else if(findUserRepeat){
            res.status(403).send({message:"Este correo o nombre de usuario ya estan registrados, prueba con otro"});
        }else{
            user.name = body.name;
            user.username = body.username;
            user.email = body.email;
            user.telephone = body.telephone;

            bcrypt.hash(body.password, null, null, (err, passwordEncrypt)=>{
                if(err){
                    res.status(500).send({message:"Error general del servidor, err: " + err});
                }else if(passwordEncrypt){
                    user.password = body.password;

                    user.save((err, userSave)=>{
                        if(err){    
                            res.status(500).send({message:"Error general del servidor: " + err});
                        }else if(userSave){
                            res.status(200).send({UsuarioCreado: userSave});
                        }else{
                            res.status(400).send({message:"No se logro crear un usuario"});
                        }
                    });
                }else{
                    res.status(404).send({message:"No se encontro contraseña a encriptar"});
                }
            });
        }
    });
}

function updateUser(req, res) {
    const idUser = req.params.id;
    const body = req.body;

    User.findOne({$or:[{email: body.name}, {username: body.username}]}, (err, hotelRepeat)=>{
        if(err){
            res.status(500).send({message:"Error general del servidor ", err});
        }else if(hotelRepeat){
            res.status(418).send({message:"El nombre de usuario ya esta registrado"});
        }else{
            User.findByIdAndUpdate(idUser, body, {new:true},(err,userUpdate)=>{
                if(err){
                    res.status(500).send({message:"Error general del servidor ", err});
                }else if(userUpdate){
                    res.send({UserUpdate: userUpdate});
                }else{
                    res.status(404).send({message: "Su sesión no esta activa"});
                }
            })
        }
    });
}

function deleteUser(req, res) {
    var idUser = req.params.id;

    User.findByIdAndRemove(idUser,(err,deleted)=>{
        if(err){
            res.status(500).send({message:"Error general del servidor ", err});
        }else if(deleted){
            res.send({message: "Usuario Eliminado"});
        }else{
            res.status(404).send({message: "Su sesión no se encuentra activa, vuelva a iniciar sesión"});
        }
    });
}

function viewUser(req, res) {
    const idu = req.params.id;
    
    User.findById(idu, (err, users)=>{
        if(err){
            res.status(500).send({message:"Error general del servidor ", err});
        }else if(users){
            res.send({message:users});
        }else{
            res.status(400).send({message:"Error inesperado al listar los usuarios"});
        }
    });
}

function viewUsers(req, res) {
    User.find({}, (err, users)=>{
        if(err){
            res.status(500).send({message:"Error general del servidor ", err});
        }else if(users){
            res.send({message:users});
        }else{
            res.status(400).send({message:"Error inesperado al listar los usuarios"});
        }
    });
}

module.exports = {
    saveUser,
    updateUser,
    deleteUser,
    viewUser,
    viewUsers
}