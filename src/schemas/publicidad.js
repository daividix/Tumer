const mongoose = require('mongoose')
const Schema = mongoose.Schema

const publicidad_schema = new Schema({
    restaurante_id: {type: mongoose.Types.ObjectId, ref:'Restaurante', required: true},
    tipo: {type: Number, min: 1, max: 5, required: true}
})

const Publicidad = mongoose.model('Publicidad', publicidad_schema)

module.exports.Publicidad = Publicidad