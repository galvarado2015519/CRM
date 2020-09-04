'use strict'

const User = require('../models/user.model');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');

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
                    user.password = passwordEncrypt;

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

    if(idUser == req.user.sub){
        User.findOne({$or:[{email: body.name}, {username: body.username}]}, (err, userRepeat)=>{
            if(err){
                res.status(500).send({message:"Error general del servidor ", err});
            }else if(userRepeat){
                console.log(userRepeat)
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
                });
            }
        });
    }else{
        res.send({message:"No tienes permisos para esta ruta"});
    }
}

function deleteUser(req, res) {
    const idUser = req.params.id;

    if(idUser == req.user.sub){
        User.findByIdAndRemove(idUser,(err,deleted)=>{
            if(err){
                res.status(500).send({message:"Error general del servidor ", err});
            }else if(deleted){
                res.send({message: "Usuario Eliminado"});
            }else{
                res.status(404).send({message: "Su sesión no se encuentra activa, vuelva a iniciar sesión"});
            }
        });
    }else{
        res.send({message:"No tienes permisos para esta ruta"});
    }    
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

function login(req, res) {
    
    const body = req.body;

    if( body.email && body.password || body.username){
        User.findOne({$or:[{email: body.email},{username: body.username}]}, (err, userFind)=>{
            if(err){
                res.status(500).send({message:"1. Error general del servidor: " + err});
            }else if(userFind){
                bcrypt.compare(body.password, userFind.password, (err, passwordCheck)=>{
                    if(err){
                        res.status(500).send({message:"2. Error general del servidor: " + err});
                    }else if(passwordCheck){
                        res.send({Bienvenido: userFind.name, token: jwt.createToken(userFind)});
                    }else{
                        res.status(404).send({message:"La contraseña es inconrrecta"});
                    }
                })
            }else{
                res.send({mesagge: "Este usuario no existente"});
            }
        });
    }else{
        res.status(404).send({message:"Ingrese todos los parametros"});
    }
}

module.exports = {
    saveUser,
    updateUser,
    deleteUser,
    viewUser,
    viewUsers,
    login
}