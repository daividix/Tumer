const router = require('express').Router()
const Calificacion = require('../schemas/calificaciones').Calificacion
const Restaurante = require('../schemas/restaurantes').Restaurante


router.get("/calificacion-usuario/:id", (req, res) => {
    if (req.isAuthenticated()) {
        Calificacion.find({
            $and: [{usuario_id: req.user._id}, {restaurante_id: req.params.id}]
        }, (err, calificaciones) => {
            if (err) {
                return res.json({
                    status: false,
                    message: "Hubo un error al encotrar las calificaciones del usuario",
                    error: err
                })
            }
            return res.json({
                status: true,
                message: "Calificaciones encontradas",
                calificaciones
            })
        })
    }

})
router.get('/prueba/:id', (req, res) => {
    Calificacion.aggregate([{
        $group: {
            _id: req.params.id,
            cal_comida: {
                $avg: "$cal_comida"
            },
            cal_experiencia: {
                $avg: "$cal_experiencia"
            },
            cal_servicio: {
                $avg: "$cal_servicio"
            },
            cal_limpieza: {
                $avg: "$cal_limpieza"
            },
            cal_ubic: {
                $avg: "$cal_ubic"
            }
        }
    }], (err, result) => {
        if (err) {
            return console.log(err)
        }
        console.log(result)
        return res.json(result)
    })
})
router.post("/calificacion", async (req, res, next) => {
    if (req.isAuthenticated()) {
        if (!req.body.cal_experiencia ||
            !req.body.cal_limpieza ||
            !req.body.cal_servicio ||
            !req.body.cal_comida ||
            !req.body.cal_ubic) {

            return res.json({
                status: false,
                message: "Faltan datos requeridos"
            })
        }
        if (!req.body.restaurante_id) {
            return res.json({
                status: false,
                message: "No se ha seleccionado un restaurante"
            })
        }
        Calificacion.findOne({
            $and: [{
                restaurante_id: req.body.restaurante_id
            }, {
                usuario_id: req.user._id
            }]
        }, (err, calificacion) => {
            if (err) {
                return res.json({
                    status: false,
                    message: "Error al comprobar si el usuario ya habia calificado el restaurante",
                    error: err
                })
            }
            if (calificacion) {
                return res.json({
                    status: false,
                    message: "El usuario ya ha calificado el sitio"
                })
            } else {
                const calificacion = new Calificacion(req.body)
                calificacion.usuario_id = req.user._id
                calificacion.save((err, calificacion) => {
                    if (err) {
                        return res.json({
                            status: false,
                            message: "Hubo un error al guardar la calificacion",
                            error: err
                        })
                    }
                    //buscando el promedio de calificaciones
                    Calificacion.aggregate([{
                        $group: {
                            _id: req.params.id,
                            cal_comida: {
                                $avg: "$cal_comida"
                            },
                            cal_experiencia: {
                                $avg: "$cal_experiencia"
                            },
                            cal_servicio: {
                                $avg: "$cal_servicio"
                            },
                            cal_limpieza: {
                                $avg: "$cal_limpieza"
                            },
                            cal_ubic: {
                                $avg: "$cal_ubic"
                            }
                        }
                    }], (err, result) => {
                        if (err) {
                            return res.json({
                                status: false,
                                message: "Hubo error al buscar el promedio de calificaciones",
                                error: err
                            })
                        }
                        //actualizando las calificaciones promedio del restaurante
                        let newCalification = {
                            calExp: result[0].cal_experiencia,
                            calLimp: result[0].cal_limpieza,
                            calServ: result[0].cal_servicio,
                            calComi: result[0].cal_comida,
                            calUbic: result[0].cal_ubic
                        }
                        Restaurante.findByIdAndUpdate(req.body.restaurante_id, {
                            $set: newCalification
                        }, (err) => {
                            if (err) {
                                console.log(err)
                                return res.json({
                                    status: false,
                                    message: "Ocurrio un error al actualizar la calificacion del restaurante",
                                    error: err
                                })
                            }
                            return res.json({
                                status: true,
                                message: "La calificacion fue guardada con exito",
                                calificacion
                            })
                        })
                    })
                })
            }
        })
    } else {
        return res.json({
            status: false,
            message: "No autenticado"
        })
    }
})

router.put("calification", (req, res, next) => {
    if (req.isAuthenticated()) {
        const updateCalificacion = req.body

        if (!updateCalificacion.restaurante_id &&
            !updateCalificacion.usuario_id &&
            !updateCalificacion.cal_experiencia &&
            !updateCalificacion.cal_limpieza &&
            !updateCalificacion.cal_servicio &&
            !updateCalificacion.cal_comida) {

            return res.status(400).json({
                status: false,
                message: "Faltan datos requeridos"
            })
        }

        Calificacion.findOneAndUpdate({
            $and: [{
                restaurante_id: req.body.restaurante_id
            }, {
                usuario_id: req.user.user_id
            }]
        }, updateCalificacion, (err, result) => {
            if (err) {
                return res.json({
                    status: false,
                    message: "Hubo un error al actualizar la calificacion",
                    error: err
                })
            }
            return res.json({
                status: true,
                message: "La calificacion se ha actualizado",
                calificacion: result
            })
        })
    }

})

module.exports = router