const localStrategy = require('passport-local').Strategy

const User = require('../schemas/usuarios').User

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
        User.findOne({'username': username}, (err, user)=>{
            if (err){
                return done(err)
            }
            if (user) {
                return done(null, false )
            }
        })
    }
    ))
}