const router = require('express').Router()
const mongoose = require('mongoose')
const Calificacion = require('../schemas/calificaciones').Calificacion
const Restaurante = require('../schemas/restaurantes').Restaurante
mongoose.connect('mongodb://localhost/tumer')

router.get("/calificacion-usuario/:id", (req,res,next) =>{
    Calificacion.findOne({usuario_id: req.params.id}, (err, calificacion)=>{
        if (err) return next(err);
        res.json(calificacion);
    })
});

router.get("/calificacion-restaurante/:id", (req,res,next)=>{
    Calificacion.findOne({restaurante_id: req.params.id}, (err, calificacion)=>{
        if (err) return next(err);
        res.json(calificacion);
    })
});

router.post("/calificacion", (req,res,next)=>{
    const calificacion = new Calificacion(req.body)
    
    calificacion.save((err,calificacion)=>{
        if (err) return next(err)
        res.json(calificacion)
    })
})

router.put("calification/:id",(req,res,next)=>{
    const updateCalificacion = req.body

    if (!updateCalificacion.restaurante_id &&
        !updateCalificacion.usuario_id &&
        !updateCalificacion.cal_experiencia &&
        !updateCalificacion.cal_limpieza &&
        !updateCalificacion.cal_servicio &&
        !updateCalificacion.cal_comida) {
        
        return res.status(400).json({
            error: "Faltan datos requeridos"
        })
    }

    Calificacion.findByIdAndUpdate(req.params.id, updateCalificacion, (err, result)=>{
        if (err) return next(err);
        res.json(result);
    })
})

module.exports = router