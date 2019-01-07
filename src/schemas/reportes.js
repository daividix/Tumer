const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reporte_schema = new Schema({
    comentario_id: {type: Schema.Types.ObjectId, ref:'Comentario', required: true},
    usuario_id: {type: Schema.Types.ObjectId, ref:'User', required: true},
    tipo: {type: Number, min: 1, max: 4, required: true},
    comentario: {type: String, maxlength: 400}
})

const Reporte = mongoose.model('Reporte', reporte_schema)

module.exports.Reporte = Reporte