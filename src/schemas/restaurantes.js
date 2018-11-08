const mongoose = require('mongoose')
const Schema = mongoose.Schema

const restaurante_schema = new Schema({
    name: {type: String, required: true, maxlength: 60, minlength: 4},
    direccion: {type: String, required: true, maxlength: 70, minlength: 10},
    telefono: {type: String, required: true, maxlength: 20, minlength: 8},
    eslogan: {type: String, required: true, maxlength: 100},
    informacion: {type: String, required: true, maxlength: 1000},
    tipo: String,
    calExp: {type: Number, min: 0, max: 5},
    calLimp: {type: Number, min: 0, max: 5},
    calServ: {type: Number, min: 0, max: 5},
    calComi: {type: Number, min: 0, max: 5},
    calUbic: {type: Number, min: 0, max: 5}
})

const Restaurante = mongoose.model('Restaurante', restaurante_schema)

module.exports.Restaurante = Restaurante