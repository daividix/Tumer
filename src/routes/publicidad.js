const router = require('express').Router()
const Publicidad = require('../schemas/publicidad').Publicidad

router.get('/verPublicidad/:id', (req,res)=>{
    if (req.isAuthenticated() && req.user.type == 1) {
        if (!req.params.id) {
            return res.jso({
                status: false,
                message: 'El id es null'
            })
        }
        Publicidad.findById(req.params.id, (err,publicdad)=>{
            if (err) {
                return res.json({
                    status: false,
                    message: 'Ocurrio un error en la base de datos',
                    error: err
                })
            }
            return res.json({
                status: true,
                publicdad
            })
        })
    }else{
        return res.json({
            status: false,
            message: 'No autenticado o sin permisos de administrador'
        })
    }
})

router.post('/agregarPublicidad', (req,res)=>{
    if (req.isAuthenticated() && req.user.type == 1) {
        if (!req.body.restaurante_id) {
            return res.json({
                status: false,
                message: 'Falta el id del restaurante'
            })
        }
        if (!req.body.tipo) {
            return res.json({
                status: false,
                message: 'Debe indicar el tipo de publicidad'
            })
        }
        const newPublicidad = new Publicidad()
        newPublicidad.restaurante_id = req.body.restaurante_id
        newPublicidad.tipo = req.body.tipo

        newPublicidad.save((err,publicdad)=>{
            if (err) {
                return res.json({
                    status: false,
                    message: 'Ocurrio un error en la base de datos',
                    error: err
                })
            }
            return res.json({
                status: true,
                publicdad
            })
        })
    }else{
        return res.json({
            status: false,
            message: 'No autenticado o sin permisos de administrador'
        })
    }
})
