import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class NavbarComponent implements OnInit {

  logued: Boolean = false;
  user: any;
  constructor(private usuarioServices: UsuarioService, private router: Router) {
    if (localStorage.getItem('usuario')) {
      this.logued = true;
      this.user = JSON.parse(localStorage.getItem('usuario'));
    }
  }

  ngOnInit() {
  }

  logout() {
    if (localStorage.getItem('usuario')) {
      this.usuarioServices.logoutUsuario()
      .subscribe(res => {
        if (res.status === true) {
          localStorage.removeItem('usuario');
          this.router.navigateByUrl('/navbar', {skipLocationChange: true}).then(() =>
          this.router.navigate(['/home']));
          console.log(res.message);
          return;
        } else {
          return console.log(res.message);
        }
      });
    } else {
      console.log('No logueado');
    }
  }

}
