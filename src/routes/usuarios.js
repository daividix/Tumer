const router = require('express').Router()
const mongoose = require('mongoose')
const User = require('../schemas/usuarios').User
mongoose.connect('mongodb://localhost/tumer')


router.get('/usuario/:id', (req,res,next) =>{
    User.findById(req.params.id,(err,usuario) =>{
        if (err) return next(err);
        usuario.password = undefined
        res.json(usuario);
    });
});

router.post('/usuario',(req,res,next) =>{
    const usuario = new User(req.body)
    if (!usuario.name &&
        !usuario.username &&
        !usuario.email &&
        !usuario.password) {
        return res.status(400).json({
            error: "Faltan datos requeridos"
        })
    }
    usuario.save((err,usuario)=>{
        if (err) return next(err);
        res.json(usuario)
    })
})
router.delete('/usuario/:id', (req,res,next) =>{
    User.remove({_id: req.params.id}, (err,result)=>{
        if (err) return next(err);
        res.json(result)
    });
});

router.put('/usuario/:id', (req,res,next) =>{
    const updateUsuario = req.body

    if (!updateUsuario.name) {
        res.status(400).json({
            error: "Faltan datos requeridos"
        })
    }
    if (!updateUsuario.username) {
        res.status(400).json({
            error: "Faltan datos requeridos"
        })
    }
    if (!updateUsuario.email) {
        res.status(400).json({
            error: "Faltan datos requeridos"
        })
    }
    if (!updateUsuario.password) {
        res.status(400).json({
            error: "Faltan datos requeridos"
        })
    }
    if (!updateUsuario) {
        res.status(400).json({
            error: 'Bad request'
        })
    }else{
        User.findByIdAndUpdate(req.params.id, updateUsuario, (err,result) =>{
            if (err) return next(err);
            res.json(result);
        });
    }
});
module.exports = router;