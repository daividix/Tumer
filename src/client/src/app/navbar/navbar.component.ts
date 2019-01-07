import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  logued: Boolean = false;
  usuario: any;
  constructor(private usuarioServices: UsuarioService, private router: Router) {
    this.usuarioServices.checkUsuario()
      .subscribe(res => {
        if (res.status) {
          this.usuario = res.user;
          this.logued = true;
        }
      });
  }

  ngOnInit() {
  }

  logout() {
    this.usuarioServices.logoutUsuario()
      .subscribe(res => {
        if (res.status === true) {
          this.usuario = {};
          this.router.navigateByUrl('/navbar', { skipLocationChange: true }).then(() =>
            this.router.navigate(['/home']));
          console.log(res.message);
          return;
        } else {
          return console.log(res.message);
        }
      });
  }

}
