import { Usuario } from './usuario';

export class Comentario {
    _id: String;
    restaurante_id: String;
    usuario_id: String;
    contenido: String;
    fecha: Date;
    likes: Number;
    dislikes: Number;
    reports: Number;
    user: Usuario;

    /* constructor (
        id: String,
        restaurante_id: String,
        usuario_id: String,
        contenido: String,
        fecha: Date,
        likes: Number,
        dislikes: Number,
        reports: Number,
        user: Usuario
        ) {
            this._id = id;
            this.restaurante_id = restaurante_id;
            this.usuario_id = usuario_id;
            this.contenido = contenido;
            this.fecha = fecha;
            this.likes = likes;
            this.dislikes = dislikes;
            this.reports = reports;
            this.user = user;
    } */
}
