const router = require('express').Router()
const Calificacion = require('../schemas/calificaciones').Calificacion
const Restaurante = require('../schemas/restaurantes').Restaurante


router.get("/calificacion-usuario/:id", (req, res, next) => {
    if (req.isAuthenticated()) {
        Calificacion.find({
            usuario_id: req.params.id
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

        function exist() {
            return new Promise((resolve, reject) => {
                Calificacion.findOne({
                    $and: [{
                        restaurante_id: req.body.restaurante_id
                    }, {
                        usuario_id: req.user.user_id
                    }]
                }, (err, calificacion) => {
                    if (err) {
                        reject("Hubo un error al comprobar si el usuario ya ha calificado el restaurante")
                    }
                    if (calificacion) {
                        resolve(true)
                    } else {
                        resolve(false)
                    }
                })
            })
        }
        const existCalification = await exist()
        if (existCalification) {
            return res.json({
                status: false,
                message: "El usuario ya ha calificado el sitio"
            })
        }
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
            return res.json({
                status: true,
                message: "La calificacion fue guardada con exito",
                calificacion
            })
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

        Calificacion.findOneAndUpdate({$and: [{restaurante_id: req.body.restaurante_id},{usuario_id: req.user.user_id}]}, updateCalificacion, (err, result) => {
            if (err){
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