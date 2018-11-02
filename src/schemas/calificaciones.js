const mongoose = require('mongoose')
const Schema = mongoose.Schema

const calificacion_schema = new Schema({
    usuario_id: {type: Schema.Types.ObjectId, ref:"User", required: true},
    restaurante_id: {type: Schema.Types.ObjectId, ref:"Restaurante", required: true},
    cal_experiencia: {type: Number, min: 0, max: 5, required: true},
    cal_limpieza: {type: Number, min: 0, max: 5, required: true},
    cal_servicio: {type: Number, min: 0, max: 5, required: true},
    cal_comida: {type: Number, min: 0, max: 5, required: true},
})

const Calificacion = mongoose.model("Calificacion", calificacion_schema)

module.exports.Calificacion = Calificacion