const mongoose = require('mongoose')
const Schema = mongoose.Schema

const comentario_schema = new Schema({
    restaurante_id: {type: Schema.Types.ObjectId, ref:'Restaurante', required: true},
    usuario_id: {type: Schema.Types.ObjectId, ref:'User', required: true},
    contenido: {type: String, maxlength: 1000},
    likes: {type: Number, default: 0},
    dislikes: {type: Number, default: 0},
    reports: {type: Number, default: 0}
})

const Comentario = mongoose.model('Comentario', comentario_schema)

module.exports.Comentario = Comentario