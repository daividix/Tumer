import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comentario } from '../models/comentario';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  constructor(private http: HttpClient) { }

  obtenerComentarios(restauranteId: String, page: Number) {
    return this.http.get<any>(`api/comentarios-restaurante/${restauranteId}/${page}`);
  }
  agregarComentario(comentario: Comentario) {
    return this.http.post<any>(`api/comentario`, comentario);
  }

  obtenerComentario(comentario_id: String) {
    return this.http.get<any>(`api/obtenerComentario/${comentario_id}`);
  }
}
