import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Calificacion } from '../models/calificacion';

@Injectable({
  providedIn: 'root'
})
export class CalificacionService {

  constructor(private http: HttpClient) { }

  calificarRestaurante (calificacion: Calificacion) {
    return this.http.post<any>(`/api/calificacion`, calificacion);
  }

  verCalificacionUsuarioRestaurante(restaurante_id: String) {
    return this.http.get<any>(`/api/calificacion-usuario/${restaurante_id}`);
  }
}
