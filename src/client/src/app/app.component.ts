import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/auth/authentication.service';
import { UsuarioService } from './services/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private authenticationService: AuthenticationService, private userService: UsuarioService) {
  }

  ngOnInit() {
    this.userService.checkUsuario()
    .subscribe(res => {
      if (res.status) {
        this.authenticationService.login(res.user);
      }
    });
  }
}
