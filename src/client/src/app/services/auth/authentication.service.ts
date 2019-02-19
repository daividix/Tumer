import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';

const session = window.sessionStorage;
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  public login(user: Usuario) {
    session.removeItem('usuario');
    session.setItem('usuario', JSON.stringify(user));
  }

  public isAuthenticated(): Boolean {
    if (session.getItem('usuario')) {
      return true;
    } else {
      return false;
    }
  }

  public getuser() {
    if (session.getItem('usuario')) {
      return JSON.parse(session.getItem('usuario'));
    } else {
      return 'Usuario no legueado';
    }
  }

  public saveUser(user) {
    session.removeItem('usuario');
    session.setItem('usuario', JSON.stringify(user));
  }

  public logOut() {
    session.clear();
  }
}
