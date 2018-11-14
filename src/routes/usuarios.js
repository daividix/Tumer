const router = require('express').Router()
const mongoose = require('mongoose')
const User = require('../schemas/usuarios').User
const jwt = require('jsonwebtoken')
const passport = require('passport')

router.post('/login', (req, res, next) => {
    passport.authenticate('local-login', (err, user, info) => {
        if (err) {
            return res.json({
                status: false,
                message: "hubo un error en la busqueda"
            })
        }
        if (!user) {
            return res.json({
                status: false,
                message: info.message
            })
        } else {
            req.login(user, (err) => {
                if (err) {
                    return res.json({
                        status: false,
                        message: "Hubo un error al loguearse"
                    })

                }
                return res.json({
                    status: true,
                    message: info.message,
                    user
                })
            })

        }
    })(req, res, next)
})

router.post('/signUp', (req, res, next) => {
    passport.authenticate('local-signup', (err, user, info) => {
        if (err) {
            return res.json({
                status: false,
                message: "Hubo un error al agregar el dato",
                error: err
            })
        }
        if (!user) {
            return res.json({
                status: false,
                message: info.message
            })
        } else {
            return res.json({
                status: true,
                message: info.message,
                user
            })
        }
    })(req, res, next)
})

router.get('/usuario/:id', (req, res, next) => {
    if (req.isAuthenticated()) {
        User.findById(req.params.id, (err, user) => {
            if (err) return next(err);
            user.password = undefined
            res.json({
                status: true,
                user
            });
        });
    } else {
        return res.json({
            status: false,
            message: "Not permition"
        })
    }

});

router.delete('/usuario/:id', (req, res, next) => {
    if (req.isAuthenticated() && req.user.type == 1) {
        User.remove({
            _id: req.params.id
        }, (err, result) => {
            if (err) return next(err);
            return res.json({
                status: true,
                message: "Se ha eliminado el usuario"
            })
        })
    } else {
        return res.json({
            status: false,
            message: "No autenticado o no es administrador"
        })
    }
})

router.put('/usuario/:id', (req, res, next) => {
    if (req.isAuthenticated() && (req.user._id == req.params.id)) {
        if (!req.body) {
            return res.status(400).json({
                status: false,
                message: "Peticion mal hecha"
            })
        }
        const updateUsuario = req.body
        if (!updateUsuario.name) {
            return res.status(400).json({
                status: false,
                message: "Faltan datos requeridos"
            })
        }
        if (!updateUsuario.username) {
            return res.status(400).json({
                status: false,
                message: "Faltan datos requeridos"
            })
        }
        if (!updateUsuario.email) {
            return res.status(400).json({
                status: false,
                message: "Faltan datos requeridos"
            })
        }
        if (!updateUsuario.password) {
            return res.status(400).json({
                status: false,
                message: "Faltan datos requeridos"
            })
        }
        
        User.findByIdAndUpdate(req.params.id, updateUsuario, (err, result) => {
            if (err){
                return res.json({
                    status: false,
                    message: "Hubo un error al actualizar los datos del usuario",
                    error: err
                })
            }
            return res.json({
                status: true,
                message: "Se han actualizado los datos"
            })
        })
    }

})

router.get('/logout', (req,res,next)=>{
    if (req.isAuthenticated()) {
        req.logout()
        return res.json({
            status: true,
            message: "Logout"
        })
    }else{
        return res.json({
            status: false,
            message: "No auntenticado"
        })
    }
})
module.exports = router;