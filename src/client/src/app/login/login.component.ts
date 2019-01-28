import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuarioLogin: any = {};
  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.usuarioService.loginUsuaio(this.usuarioLogin)
    .subscribe(res => {
      if (res.status === true) {
        console.log(res);
        window.location.assign('/home');
      } else {
        console.log(res);
      }
    });
  }
}
