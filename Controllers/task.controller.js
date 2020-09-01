'use strict'

const Task = require('../models/task.model');

function saveTask(req, res) {
    
    const body = req.body;
    const task = new Task();


    //Poner que sea obligatorio poner una tabla a la que pertenece

    //if(body){

        task.state = body.state;
        task.comment = body.comment;
        task.persons = body.persons;
        task.numbers = body.numbers;
        task.date = body.date;
        task.laber = body.laber;
        task.subElements = body.subElements;

        console.log(task.comment)

        task.save((err, taskSave)=>{
            if(err){    
                res.status(500).send({message:"Error general del servidor: " + err});
            }else if(taskSave){
                res.status(200).send({Tarea: taskSave});
            }else{
                res.status(400).send({message:"No se logro crear una tarea"});
            }
        });
    //}
    
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

    Task.findByIdAndRemove(idTask,(err,deleted)=>{
        if(err){
            res.status(500).send({message:"Error general del servidor ", err});
        }else if(deleted){
            res.send({message: "Tarea Eliminada"});
        }else{
            res.status(404).send({message: "No se encontro tarea ha eliminar"});
        }
    });
}

function viewTask(req, res) {
    const idt = req.params.id;
    
    Task.findById(idt, (err, task)=>{
        if(err){
            res.status(500).send({message:"Error general del servidor ", err});
        }else if(task){
            res.send({message:task});
        }else{
            res.status(400).send({message:"Error inesperado al buscar la tarea"});
        }
    });
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