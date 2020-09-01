'use strict'

const Table = require('../models/table.model');

function saveTable(req, res) {
    
    const body = req.body;
    const table = new Table();


    // Cambiar para que busque en un usuario en particular, no en cualquiera que cumpla con la espesificacion
    Table.findOne({name: body.name},(err, findtableRepeat)=>{
        if(err){
            res.status(500).send({message:"Error general del servidor, err: " + err});
        }else if(findtableRepeat){
            res.status(403).send({message:"Este nombre de tabla ya esta registrada"});
        }else{
            table.name = body.name;

            table.save((err, tableSave)=>{
                if(err){    
                    res.status(500).send({message:"Error general del servidor: " + err});
                }else if(tableSave){
                    res.status(200).send({UsuarioCreado: tableSave});
                }else{
                    res.status(400).send({message:"No se logro crear una tabla"});
                }
            });
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