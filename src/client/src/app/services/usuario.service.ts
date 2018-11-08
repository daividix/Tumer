import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  domain: String = 'http://localhost:3000';

  constructor(private http: HttpClient) {

  }

  agregarUsuario(nuevoUsuario: Usuario) {
    return this.http.post<any>(`${this.domain}/api/signUp`, nuevoUsuario);
  }

  loginUsuaio(data) {
    return this.http.post<any>(`${this.domain}/api/login`, data);
  }
}
