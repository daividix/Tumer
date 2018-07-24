const router = require('express').Router()
const mongoose = require('mongoose')
const Comentario = require('../schemas/comentarios').Comentario
mongoose.connect('mongodb://localhost/tumer')

router.get('/comentarios', (req,res,next) =>{
    Comentario.find({},(err,comentarios) =>{
        if (err) return next(err);
        res.json(comentarios);
    });
});

router.get('/comentarios/:id', (req,res,next) =>{
    Comentario.findById(req.params.id,(err,comentario) =>{
        if (err) return next(err);
        res.json(comentario);
    });
});

router.post('/comentarios',(req,res,next) =>{
    const comentario = new Comentario(req.body)
    comentario.save((err,comentario)=>{
        if (err) return next(err);
        res.json(comentario)
    })
})
router.delete('/comentarios/:id', (req,res,next) =>{
    Comentario.remove({_id: req.params.id}, (err,result)=>{
        if (err) return next(err);
        res.json(result)
    });
});

router.put('/comentarios/:id', (req,res,next) =>{
    const comentario = req.body
    const updateComentario = {}

    if (comentario.restaurante_id) {
        updateComentario.restaurante_id = comentario.restaurante_id;
    }
    if (comentario.usuario_id) {
        updateComentario.usuario_id = comentario.usuario_id;
    }
    if (comentario.contenido) {
        updateComentario.contenido = comentario.contenido;
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