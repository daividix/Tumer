import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Restaurante } from '../models/restaurante';

@Injectable({
  providedIn: 'root'
})
export class RestauranteService {

  constructor(private http: HttpClient) { }

  verRestaurantes(page: number) {
    return this.http.get<any>(`api/restaurantes/${page}`);
  }

  agregarRestaurante(restaurante: FormData) {
    return this.http.post<any>(`api/restaurante`, restaurante);
  }
}
