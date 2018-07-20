const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/tumer')
const restaurante_schema = new Schema({
    name: {type: String, required: true},
    direccion: {type: String, required: true},
    telefono: {type: String, required: true},
    eslogan: {type: String, required: true},
    informacion: {type: String, required: true},
    tipo: Array,
    calExp: {type: Number, min: 0, max: 5},
    numCalExp: Number,
    sumCalExp: Number,
    calLimp: {type: Number, min: 0, max: 5},
    numCalLimp: Number,
    sumCalLimp: Number,
    calServ: {type: Number, min: 0, max: 5},
    numCalServ: Number,
    sumCalServ: Number,
    calComi: {type: Number, min: 0, max: 5},
    numCalComi: Number,
    sumCalComi: Number,
    imagenes: Array
})

const Restaurante = mongoose.model('Restaurante', restaurante_schema)

module.exports.Restaurante = Restaurante