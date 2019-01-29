import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReaccionService {

  constructor(private http: HttpClient) { }

  public buscarReaccion (cometario_id: String) {
    return this.http.get<any>(`/api/buscarReaccion/${cometario_id}`);
  }

  public reaccionar(reaccion) {
    return this.http.post<any>('/api/agregarReaccion', reaccion);
  }

  public eliminarReaccion(reaccion_id: String, comentario_id: String) {
    return this.http.delete<any>(`/api/eliminarReaccion/${reaccion_id}/${comentario_id}`);
  }
}
