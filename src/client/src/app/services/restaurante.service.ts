import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Restaurante } from '../models/restaurante';

@Injectable({
  providedIn: 'root'
})
export class RestauranteService {

  constructor(private http: HttpClient) { }

  verRestaurantes(page: Number) {
    return this.http.get<any>(`api/restaurantes/${page}`);
  }

  agregarRestaurante(restaurante: FormData) {
    return this.http.post<any>(`api/restaurante`, restaurante);
  }

  verRestaurantePorId(id: String) {
    return this.http.get<any>(`api/restaurante-id/${id}`);
  }

  searchRestaurante(page, value) {
    return this.http.post<any>(`api/search-restaurante/${page}`, {value});
  }

  verBestRank(page) {
    return this.http.get<any>(`/api/restaurantes-bestRank/${page}`);
  }
}
