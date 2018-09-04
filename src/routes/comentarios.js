const router = require('express').Router()
const mongoose = require('mongoose')
const Comentario = require('../schemas/comentarios').Comentario
mongoose.connect('mongodb://localhost/tumer')


router.get('/comentarios-restaurante/:id/:page', (req,res,next) =>{
    const perpage = 12
    const page = req.params.page
    Comentario.find({restaurante_id: req.params.id},(err,comentarios) =>{
        if (err) return next(err);
    })
    .skip((perpage*page)- perpage)
    .limit(perpage)
    .exec((err, comentarios) =>{
        Comentario.count((err, count) =>{
            if (err) return next(err);
            res.json({
                comentarios,
                current: page,
                pages: Math.ceil(count / perpage)
            })
        })
    })
});

router.get('/comentarios-usuario/:id', (req,res,next) =>{

    Comentario.find({restaurante_id: req.params.id},(err,comentarios) =>{
        if (err) return next(err);
        res.json(comentarios);
    })
});

router.post('/comentario',(req,res,next) =>{
    const comentario = new Comentario(req.body)
    if (!comentario.restaurante_id &&
        !comentario.usuario_id) {
        return res.status(400).json({
            error: "Faltan datos requeridos"
        })
    }
    comentario.save((err,comentario)=>{
        if (err) return next(err);
        res.json(comentario)
    })
})
router.delete('/comentario/:id', (req,res,next) =>{
    Comentario.remove({_id: req.params.id}, (err,result)=>{
        if (err) return next(err);
        res.json(result)
    });
});

router.put('/comentario/:id', (req,res,next) =>{
    const updateComentario = req.body

    if (!updateComentario.restaurante_id) {
        return res.status(400).json({
            error: "Faltan datos requeridos"
        })
    }
    if (!updateComentario.usuario_id) {
        return res.status(400).json({
            error: "Faltan datos requeridos"
        })
    }
    if (!updateComentario.contenido) {
        return res.status(400).json({
            error: "Faltan datos requeridos"
        })
    }
    if (!updateComentario) {
        res.status(400).json({
            error: 'Bad request'
        })
    }else{
        Comentario.findByIdAndUpdate(req.params.id, updateComentario, (err,result) =>{
            if (err) return next(err);
            res.json(result);
        });
    }
});
module.exports = router;