'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const key = 'pk2MeS8X';

exports.ensureAuth = (req, res, next) =>{

    if(req.headers.authorization){
        const token = req.headers.authorization.replace(/['"]+/g,'');
        const payload = jwt.decode(token,key);
    
        if(!req.headers.authorization){
            return res.status(403).send({message: "Peticion sin autentificacion"});
        }else{
            try{
                if(payload.exp <= moment().unix()){
                    return res.status(401).send({message:"Token expirado"});
                }
            }catch(Exception){
                return  res.status(404).send({message:"token no valido"});
            }
        
            req.user = payload;
            next(); 
        }
    }else{
        return res.status(404).send({message: "No se mando la autorización con el token"});
    }
}