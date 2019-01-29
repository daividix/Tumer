const router = require('express').Router()
const mongoose = require('mongoose')
const Reaccion = require('../schemas/reacciones').Reaccion
const Comentario = require('../schemas/comentarios').Comentario

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

router.get('/buscarReaccion/:comentario_id', (req,res)=>{
    if (req.isAuthenticated()) {
        if (!req.params.comentario_id) {
            return res.json({
                status: false,
                message: 'Falta el id del comentario en el body'
            })
        }
        Reaccion.findOne({
            $and: [{comentario_id: req.params.comentario_id},{usuario_id: req.user._id}]
        }, (err,reaccion)=>{
            if (err) {
                return res.json({
                    status: false,
                    message: 'Hubo un error en la base de datos',
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
            message: 'No autenticado'
        })
    }
})

router.post('/agregarReaccion', (req,res)=>{
    if (req.isAuthenticated()) {
        if (!req.body.comentario_id || !req.body.reaccion) {
            return res.json({
                status: false,
                message: "Faltan datos requeridos"
            })
        }
        if (req.body.reaccion>2 || req.body.reaccion<0) {
            return res.json({
                status: false,
                message: 'Digite valores validos para reaccion 1.Like 2.Dislike'
            })
        }
        Reaccion.findOne({
            $and: [{comentario_id: req.body.comentario_id},{usuario_id: req.user._id}]
        }, (err, reaccion)=>{
            if (err) {
                return res.json({
                    status: false,
                    message: 'Ocurrio un error al comprobar si el usuario ya habia reaccionado',
                    error: err
                })
            }
            if (reaccion) {
                Reaccion.findByIdAndUpdate(reaccion._id, {$set: {reaccion: req.body.reaccion}},(err)=>{
                    if (err) {
                        return res.json({
                            status: false,
                            message: 'Ocurrio un error al acualizar reaccion',
                            error: err
                        })
                    }
                    actualizarReacciones(req.body, (err)=>{
                        if (err) {
                            return res.json({
                                status: false,
                                message: 'Ocurrio un error al actualizar las reacciones del comentario',
                                error: err
                            })
                        }
                        return res.json({
                            status: true,
                            message: 'Se ha actualizado correctamente'
                        })
                    })
                })
            }else{
                const newReaccion = new Reaccion(req.body);
                newReaccion.usuario_id = req.user._id;
                newReaccion.save((err,reaccion)=>{
                    if (err) {
                        return res.json({
                            status: false,
                            message: "Hubo un error en la base de datos",
                            error: err
                        })
                    }
                    actualizarReacciones(req.body, (err)=>{
                        if (err) {
                            return res.json({
                                status: false,
                                message: 'Ocurrio un error al actualizar las reacciones del comentario',
                                error: err
                            })
                        }
                        return res.json({
                            status: true,
                            reaccion
                        })
                    })
                })
            }  
        })
    }else{
        return res.json({
            status: false,
            message: "No autenticado"
        })
    }
})

router.delete('/eliminarReaccion/:id/:comentario_id', (req,res)=>{
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
            actualizarReacciones(req.params, (err)=>{
                if (err) {
                    return res.json({
                        status: false,
                        message: 'Hubo un error al actualizar las reacciones',
                        error: err
                    })
                }
                return res.json({
                    status: true,
                    result
                })
            })
        })
    }else{
        return res.json({
            status: false,
            message: "No autenticado"
        })
    }
})

function actualizarReacciones(body, cb) {
    Reaccion.count({$and:[{comentario_id: body.comentario_id},{reaccion: 1}]}, (err,countLike)=>{
        if (err) {
            console.log(err)
            return cb(err)
        }
        Reaccion.count({$and:[{comentario_id: body.comentario_id},{reaccion: 2}]}, (err,countDislike)=>{
            if (err) {
                console.log(err)
                return cb(err)
            }
            Comentario.findByIdAndUpdate(body.comentario_id, {$set: {likes: countLike, dislikes: countDislike}}, (err)=> {
                if (err) {
                    console.log(err)
                    return cb(err)
                }
                cb(false)
                return
            })
        })
        
    })
}

module.exports = router