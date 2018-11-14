import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  constructor(private http: HttpClient) { }

  verImagen(restauranteId) {
    return this.http.get<any>(`/api/imagenes-restaurante/${restauranteId}`);
  }
}
