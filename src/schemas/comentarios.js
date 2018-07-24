const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/tumer')

const comentarios_schema = new Schema({
    restaurante_id: {type: Schema.Types.ObjectId, ref:'Restaurante'},
    usuario_id: {type: Schema.Types.ObjectId, ref:'User'},
    contenido: String,
    like: Number,
    dislike: Number
})

const Comentario = mongoose.model('Comentario', comentarios_schema)

module.exports.Comentario = Comentario