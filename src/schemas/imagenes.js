const mongoose = require('mongoose')
const Schema = mongoose.Schema

const imagen_schema = new Schema({
    name: {type: String, required: true},
    owner: {type: mongoose.Schema.ObjectId, ref:["Restaurante","User"], required: true},
    url: {type: String, required: true}
})

const Imagen = mongoose.model("Imagen", imagen_schema)

module.exports.Imagen = Imagen