const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reaccion_schema = new Schema({
    comentario_id: {type: Schema.Types.ObjectId, ref:'Comentario', required: true},
    usuario_id: {type: Schema.Types.ObjectId, ref:'User', required: true},
    reaccion: {type: Number, min: 1, max: 2, required: true}
})

const Reaccion = mongoose.model('Reaccion', reaccion_schema)

module.exports.Reaccion = Reaccion