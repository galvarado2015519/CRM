'use strict'

const Table = require('../models/table.model');
const User = require('../models/user.model');

function saveTable(req, res) {
    
    const body = req.body;
    const table = new Table();


    // Cambiar para que busque en un usuario en particular, no en cualquiera que cumpla con la espesificacion
    User.findById(req.user.sub,(err, userFind)=>{
        if(err){
            res.status(500).send({message:"1. Error general del servidor, err: " + err});
        }else if(userFind){
            Table.find( {_id: userFind.table}, (err, findtableRepeat)=>{  
                if(err){
                    res.status(500).send({message:"2. Error general del servidor, err: " + err});
                }else if(findtableRepeat){
                    
                    let nombre;
                    const filter = findtableRepeat.filter(({name}) => name == body.name);
                    const bodyname = filter.find(({name}) => nombre = name);

                    if(nombre == body.name){
                        res.status(403).send({message:"Este nombre de tabla ya esta registrada"});
                    }else{

                        table.name = body.name;
        
                        table.save((err, tableSave)=>{
                            if(err){    
                                res.status(500).send({message:"3. Error general del servidor: " + err});
                            }else if(tableSave){
                                User.findByIdAndUpdate(req.user.sub,{ $push:{table: tableSave._id } }, { new:true }, (err, tableUserSaved)=>{
                                    if(err){
                                        res.status(500).send({message:"4. Error general del servidor: " + err});
                                    }else if(tableUserSaved){
                                        res.status(200).send({Tabla_Creada: tableSave});
                                    }else{
                                        res.status(404).send({message:"No se encontro a que usuario asignarle esta tabla"});
                                    }
                                });
                            }else{
                                res.status(400).send({message:"No se logro crear una tabla"});
                            }
                        });
                    }
                }else{
                    res.status(404).send({message:"No se encontro nada en la base de datos"});
                }
            });        
        }else{
            res.status(403).send({message:"No se encuentra logeado, por favor inicié sesión"});
        }
    });
}

function updateTable(req, res) {
    const idTable = req.params.id;
    const body = req.body;

    Table.findOne({name: body.name}, (err, tableRepeat)=>{
        if(err){
            res.status(500).send({message:"Error general del servidor ", err});
        }else if(tableRepeat){
            res.status(418).send({message:"El nombre de esta tabla ya esta en uso"});
        }else{
            Table.findByIdAndUpdate(idTable, body, {new:true},(err,tableUpdate)=>{
                if(err){
                    res.status(500).send({message:"Error general del servidor ", err});
                }else if(tableUpdate){
                    res.send({Tabla_Actualizada: tableUpdate});
                }else{
                    res.status(404).send({message: "No se encontro tabla ha actualizar"});
                }
            });
        }
    });
}

function deleteTable(req, res) {
    var idTable = req.params.id;

    Table.findByIdAndRemove(idTable,(err,deleted)=>{
        if(err){
            res.status(500).send({message:"Error general del servidor ", err});
        }else if(deleted){
            res.send({message: "Tabla Eliminada"});
        }else{
            res.status(404).send({message: "No se encontro tabla a eliminar"});
        }
    });
}

function viewTable(req, res) {
    const idt = req.params.id;
    
    Table.findById(idt, (err, tables)=>{
        if(err){
            res.status(500).send({message:"Error general del servidor ", err});
        }else if(tables){
            res.send({message:tables});
        }else{
            res.status(400).send({message:"Error inesperado al buscar la tabla"});
        }
    });
}

function viewTables(req, res) {
    Table.find({}, (err, tables)=>{
        if(err){
            res.status(500).send({message:"Error general del servidor ", err});
        }else if(tables){
            res.send({message:tables});
        }else{
            res.status(400).send({message:"Error inesperado al listar las trablas"});
        }
    });
}

module.exports = {
    saveTable,
    updateTable,
    deleteTable,
    viewTable,
    viewTables
}