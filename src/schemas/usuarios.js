const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/tumer')
const user_schema = new Schema({
    name: {type: String, required: true},
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    calificaciones: Array,
    imagen: String
})

const User = mongoose.model('User', user_schema)

module.exports.User = User