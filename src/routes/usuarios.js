const router = require('express').Router()
const mongoose = require('mongoose')
const User = require('../schemas/usuarios').User
const jwt = require('jsonwebtoken')


router.post('/login', (req,res,next)=>{
    User.findOne({username: req.body.username}, (err,user)=>{
        if (err) return next(err)
        
        if (!user) {
            return res.json({
                status: false,
                message: "User not found"
            })
        }else{
            if (user.validatePassword(req.body.password)) {
                const token = jwt.sign({user}, req.app.get('tokenSecret'))
                return res.json({
                    status: true,
                    message: "User validated",
                    user,                  
                    token
                })
            }else{
                
                return res.json({
                    status: "wrong password"
                })
            }
        }
    })
})

router.post('/signUp', (req,res,next) =>{
    const usuario = new User(req.body)
    usuario.password = usuario.generateHash(usuario.password)
    if (!usuario.name &&
        !usuario.username &&
        !usuario.email &&
        !usuario.password) {
        return res.status(400).json({
            error: "Faltan datos requeridos"
        })
    }
     
    usuario.save((err,usuario)=>{
        if (err) return res.json({
            status: false,
            message: "Error al guardar usuario"
        });
        return res.json({
            status: true,
            usuario
        })
    })
})

router.use((req,res,next)=>{
    const token = req.headers['authorization']
    if (token) {
        jwt.verify(token, req.app.get('tokenSecret'), (err,decoded)=>{
            if (err) {
                return res.json({
                    status: false,
                    message: "Authentication failed"
                })
            }else{
                req.decoded = decoded
                next()
            }
        })
    }else{
        return res.status(403).json({
            status: false,
            message: "not token"
        })
    }
})

router.get('/usuario/:id', (req,res,next) =>{
    User.findById(req.params.id,(err,usuario) =>{
        if (err) return next(err);
        usuario.password = undefined
        res.json(usuario);
    });
});

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