'use strict'

const Task = require('../models/task.model');
const Table = require('../models/table.model');
const User = require('../models/user.model');

function saveTask(req, res) {
    
    const body = req.body;
    const task = new Task();
    const idTable = req.params.id;

    //Poner que sea obligatorio poner una tabla a la que pertenece
    if(req.user.sub){
        Table.find((err, tablefind)=>{
            if(err){
                res.status(500).send({message:"1.1 Error general del servidor ", err});
            }else if(tablefind){
                if(tablefind.length == 0){
                    res.status(404).send({message:"No hay una tabla para asingar esta tarea"});
                }else{
                    task.state = body.state;
                    task.comment = body.comment;
                    task.persons = body.persons;
                    task.numbers = body.numbers;
                    task.date = body.date;
                    task.laber = body.laber;
                    task.subElements = body.subElements;

                    task.save((err, taskSave)=>{
                        if(err){    
                            res.status(500).send({message:"1. Error general del servidor: " + err});
                        }else if(taskSave){
                            Table.findByIdAndUpdate(idTable, {$push:{task:taskSave._id}},{new:true},(err, tableUpdated)=>{
                                if(err){
                                    res.status(500).send({message:"2. Error general del servidor: " + err});
                                }else if(tableUpdated){
                                    res.status(200).send({Tarea: taskSave});
                                }else{
                                    res.status(404).send({message:"No se encontro la tabla a la que pertenece esta tarea"});
                                }
                            });
                        }else{
                            res.status(400).send({message:"No se logro crear una tarea"});
                        }
                    });
                }
            }else{
                res.status(404).send({message:"No hay tablas existentes para asignar esta tarea"})
            }
        });
    }else{
        res.send({message:"No tienes permisos para esta ruta"});
    } 
}

function updateTask(req, res) {
    const idTask = req.params.id;
    const body = req.body;

    
        Task.findByIdAndUpdate(idTask, body, {new:true},(err,tareaUpdate)=>{
            if(err){
                res.status(500).send({message:"Error general del servidor ", err});
            }else if(tareaUpdate){
                res.send({Tarea_Actualizada: tareaUpdate});
            }else{
                res.status(404).send({message: "No se encontro tarea ha actualizar"});
            }
        });  
}

function deleteTask(req, res) {
    var idTask = req.params.id;

    if(req.user.sub){
        Table.findOneAndUpdate({task: idTask},{$pull:{task:idTask}},{new:true},(err,taskTableUpdated)=>{
            if(err){
                res.status(500).send({message:"1. Error general del servidor ", err});
            }else if(taskTableUpdated){
                Task.findByIdAndRemove(idTask,(err,deleted)=>{
                    if(err){
                        res.status(500).send({message:"Error general del servidor ", err});
                    }else if(deleted){
                        res.send({message: "Tarea Eliminada"});
                    }else{
                        res.status(404).send({message: "No se encontro tarea ha eliminar"});
                    }
                });
            }else{
                res.status(404).send({message: "No se encontro a que tabla pertenece la tarea ha eliminar"});
            }
        });
    }else{
        res.send({message:"No tienes permisos para esta ruta"});
    }    
}

function viewTask(req, res) {
    const idt = req.params.id;
    
    if(req.user.sub){
        Table.findOne({task: idt},(err,taskTableUpdated)=>{
            if(err){
                res.status(500).send({message:"1. Error general del servidor ", err});
            }else if(taskTableUpdated){
                User.findOne({ _id:req.user.sub, table: taskTableUpdated._id},( err, userOk)=>{
                    if(err){
                        res.status(500).send({message:"2. Error general del servidor ", err});
                    }else if(userOk){
                        Task.findById(idt, (err, task)=>{
                            if(err){
                                res.status(500).send({message:"2. Error general del servidor ", err});
                            }else if(task){
                                res.send({message:task});
                            }else{
                                res.status(400).send({message:"Error inesperado al buscar la tarea"});
                            }
                        });
                    }else{
                        res.status(404).send({message:"Esta tarea no se encuentra en este usuario"});
                    }
                });
            }else{
                res.status(404).send({message: "No se encontro a que tabla de la tarea que quiere visualizar en este usuario"});
            }
        });
    }else{
        res.send({message:"No tienes permisos para esta ruta"});
    }    
}

function viewTasks(req, res) {
    Task.find({}, (err, tasks)=>{
        if(err){
            res.status(500).send({message:"Error general del servidor ", err});
        }else if(tasks){
            res.send({message:tasks});
        }else{
            res.status(400).send({message:"Error inesperado al listar las trabla"});
        }
    });
}

module.exports = {
    saveTask,
    updateTask,
    deleteTask,
    viewTask,
    viewTasks
}