const router = require('express').Router()
const mongoose = require('mongoose')
const User = require('../schemas/usuarios').User
mongoose.connect('mongodb://localhost/tumer')

router.get('/usuarios', (req,res,next) =>{
    User.find({},(err,usuarios) =>{
        if (err) return next(err);
        res.json(usuarios);
    });
});

router.get('/usuarios/:id', (req,res,next) =>{
    User.findById(req.params.id,(err,usuario) =>{
        if (err) return next(err);
        res.json(usuario);
    });
});

router.post('/usuarios',(req,res,next) =>{
    const usuario = new User(req.body)
    usuario.save((err,usuario)=>{
        if (err) return next(err);
        res.json(usuario)
    })
})
router.delete('/usuarios/:id', (req,res,next) =>{
    User.remove({_id: req.params.id}, (err,result)=>{
        if (err) return next(err);
        res.json(result)
    });
});

router.put('/usuarios/:id', (req,res,next) =>{
    const usuario = req.body
    const updateUsuario = {}

    if (usuario.name) {
        updateUsuario.name = usuario.name;
    }
    if (usuario.username) {
        updateUsuario.username = usuario.username;
    }
    if (usuario.email) {
        updateUsuario.email = usuario.email;
    }
    if (usuario.password) {
        updateUsuario.password = usuario.password
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