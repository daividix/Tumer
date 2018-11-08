const localStrategy = require('passport-local').Strategy

const User = require('../schemas/usuarios').User

function secret(body) {
    if (body.secret) {
        if (body.secret == 's3c8et') {
            return 1
        }else{
            return false
        }
    }else{
        return 2
    }
}

module.exports = function (passport) {
    
    passport.serializeUser(function (user, done) {
        done(null, user.id)
    })

    passport.deserializeUser(function (id, done) {
        User.findById(id, (err, user)=>{
            done(err, user)
        })
    })

    passport.use('local-signup', new localStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    function (req, username, password, done) {
        if (!req.body.name || !req.body.username || !req.body.email || !req.body.password) {
            return done(null, false, {message: "Faltan datos"})
        }
        User.findOne({$or: [{username: username}, {email: req.body.email}]}, (err, user)=>{
            if (err){
                return done(err)
            }
            if (user) {
                return done(null, false, {message: "El usuario o el email ya existe"})
            }else{
                var user = new User(req.body)
                if (secret(req.body) == false) {
                    return done(null, false, {message: "Secreto invalido"})
                }
                user.type = secret(req.body)
                user.password = user.generateHash(user.password)
                user.save((err,user)=>{
                    if (err) {
                        return done(err)
                    }else{
                        user.password = undefined
                        return done(null, user, {message: "success"})
                    }
                })
                
            }
        })
    }
    ))


    passport.use('local-login', new localStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    function (req, username, password, done) {
        if (!req.body.username || !req.body.password) {
            return done(null, false, {message: "Faltan datos"})
        }
        User.findOne({'username': username}, (err, user)=>{
            if (err){
                return done(err)
            }
            if (user) {
                if (user.validatePassword(req.body.password)) {
                    user.password = undefined
                    return done(null, user, {message: "Success"})
                }else{
                    return done(null, false, {message: "Nombre de Usuario o Contraseña incorrecta"})
                }
                
            }else{
                return done(null, false, {message: "Nombre de Usuario o Contraseña incorrecta"})
            }
        })
    }
    ))
    
}