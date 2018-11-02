import { Component, OnInit } from '@angular/core';

import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  modelUsuario: any = {};

  constructor(private usuarioServices: UsuarioService, private router: Router) { }

  ngOnInit() {
  }

  registrarUsuario(event) {
    event.preventDefault();
    const usuario: Usuario = {
      name: this.modelUsuario.name,
      last_name: this.modelUsuario.last_name,
      username: this.modelUsuario.username,
      email: this.modelUsuario.email,
      password: this.modelUsuario.password
    };
    this.usuarioServices.agregarUsuario(usuario)
    .subscribe( result => {
      console.log(result);
      if (result.status) {
        this.router.navigate(['/home']);
      }
    });
  }

  mostrarUsuario() {
    console.log(this.modelUsuario);
  }
}
