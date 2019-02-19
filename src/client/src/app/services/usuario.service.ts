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
    return this.http.post<any>(`/api/signUp`, nuevoUsuario);
  }

  loginUsuaio(data) {
    return this.http.post<any>(`/api/login`, data);
  }

  logoutUsuario() {
    return this.http.get<any>(`/api/logout`);
  }
  checkUsuario() {
    return this.http.get<any>('/api/checkUser');
  }

  editarUsuario(user_id, newUser) {
    return this.http.put<any>(`/api/usuario/${user_id}`, newUser);
  }
}
