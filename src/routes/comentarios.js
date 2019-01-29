const router = require('express').Router()
const mongoose = require('mongoose')
const Comentario = require('../schemas/comentarios').Comentario

router.get('/comentarios-restaurante/:id/:page', (req, res) => {
    const perpage = 12
    const page = req.params.page
    Comentario.aggregate([
        {
            $match: {restaurante_id: mongoose.Types.ObjectId(req.params.id)}
        },
        {
            $lookup: {
                from: 'users',
                localField: 'usuario_id',
                foreignField: '_id',
                as: 'user'
            }
        },
        {
            $unwind: '$user'
        },
        {
            $project: {
                "user.password": 0,
                "user.email": 0,
                "user.type": 0,
                "user.username": 0
            }
        }
    ])
    .sort({likes: -1,fecha: -1})
    .skip((perpage * page) - perpage)
    .limit(perpage)
    .exec((err, comentarios) => {
        Comentario.count((err, count) => {
            if (err) {
                return res.json({
                    status: false,
                    message: "Hubo un error al hacer el conteo"
                })
            }
            return res.json({
                status: true,
                message: "Se cargaron los comentarios correctamente",
                comentarios,
                current: page,
                pages: Math.ceil(count / perpage)
            })
        })
    })
});

router.get('/comentarios-usuario/:id', (req, res, next) => {
    if (req.isAuthenticated()) {
        Comentario.find({
            usuario_id: req.params.id
        }, (err, comentarios) => {
            if (err) {
                return res.json({
                    status: false,
                    message: "Hubo un error al buscar los comentarios",
                    error: err
                })
            }
            return res.json({
                status: true,
                message: "Comentarios encontrados",
                comentarios
            })
        })
    } else {
        return res.json({
            status: false,
            message: "No autenticado"
        })
    }

})

router.post('/comentario', (req, res, next) => {
    if (req.isAuthenticated()) {
        const comentario = new Comentario(req.body)
        comentario.usuario_id = req.user._id
        comentario.likes = 0
        comentario.dislikes = 0
        comentario.reports = 0
        comentario.fecha = new Date()
        if (!comentario.restaurante_id &&
            !comentario.usuario_id) {
            return res.json({
                status: false,
                message: "faltan datos"
            })
        }
        comentario.save((err, comentario) => {
            if (err) return next(err);
            comentario.user = req.user
            return res.json({
                status: true,
                message: 'success',
                comentario
            })
        })
    } else {
        return res.json({
            status: false,
            message: "Not authenticated"
        })
    }

})
router.delete('/comentario/:id', (req, res, next) => {
    Comentario.remove({
        _id: req.params.id
    }, (err, result) => {
        if (err) return next(err);
        res.json(result)
    });
});

router.put('/comentario/:id', (req, res, next) => {
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
    } else {
        Comentario.findByIdAndUpdate(req.params.id, updateComentario, (err, result) => {
            if (err) return next(err);
            res.json(result);
        });
    }
});

router.get('/obtenerComentario/:id', (req,res)=>{
    if (req.isAuthenticated()) {
        Comentario.findById(req.params.id, (err,comentario)=>{
            if (err) {
                return res.json({
                    status: false,
                    message: 'Hubo un error al buscar en la base de datos',
                    error: err
                })
            }
            return res.json({
                status: true,
                comentario
            })
        })
    }else{
        return res.json({
            status: false,
            message: 'No autenticado'
        })
    }
})
module.exports = router;