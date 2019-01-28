const router = require('express').Router()
const mongoose = require('mongoose')
const Reaccion = require('../schemas/reacciones').Reaccion

router.get('/verReaccionPorIdUsuario/:id', (req,res)=>{
    if (req.isAuthenticated()) {
        Reaccion.find({usuario_id: req.params.id}, (err,reacciones)=>{
            if (err) {
                return res.json({
                    status: false,
                    message: "Hubo un error en la base de datos",
                    error: err
                })
            }
            return res.json({
                status: true,
                reacciones
            })
        })
    }else{
        return res.json({
            status: false,
            message: 'No autenticado'
        })
    }
})

router.post('/agregarReaccion', (req,res)=>{
    if (req.isAuthenticated) {
        if (!req.body.usuario_id || !req.body.comentario_id || !req.body.like) {
            return res.json({
                status: false,
                message: "Faltan datos requeridos"
            })
        }
        const newReaccion = new Reaccion(req.body);
        newReaccion.save((err,reaccion)=>{
            if (err) {
                return res.json({
                    status: false,
                    message: "Hubo un error en la base de datos",
                    error: err
                })
            }
            return res.json({
                status: true,
                reaccion
            })
        })
    }else{
        return res.json({
            status: false,
            message: "No autenticado"
        })
    }
})

router.delete('/eliminarReaccion/:id', (req,res)=>{
    if (req.isAuthenticated()) {
        if (!req.params.id) {
            return res.json({
                status: false,
                message: "No hay id"
            })
        }
        Reaccion.findOneAndDelete({_id: req.params.id}, (err,result)=>{
            if (err) {
                return res.json({
                    status: false,
                    message: "Hubo un error en la base de datos",
                    error: err
                })
            }
            return res.json({
                status: true,
                result
            })
        })
    }else{
        return res.json({
            status: false,
            message: "No autenticado"
        })
    }
})