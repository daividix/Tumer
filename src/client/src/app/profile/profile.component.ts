import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario';
import { AuthenticationService } from '../services/auth/authentication.service';
import { UsuarioService } from '../services/usuario.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: Usuario;
  isLogin: Boolean;
  editUser: Usuario;
  constructor(private authService: AuthenticationService, private userService: UsuarioService,
    private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.isLogin = true;
      this.user = this.authService.getuser();
      this.editUser = new Usuario(this.user.name, this.user.last_name, this.user.email);
    } else {
      this.isLogin = false;
    }
  }

  updateUser() {
    this.userService.editarUsuario(this.user._id, this.editUser)
    .subscribe(res => {
      if (res.status) {
        this.userService.checkUsuario()
        .subscribe(res2 => {
          if (res2.status) {
            this.authService.saveUser(res2.user);
            this.ngOnInit();
          }
          this.snackBar.open('Se han guardado los cambios', 'Ok', {
            duration: 2000
          });
        });
      } else {
        this.snackBar.open(res.message, 'Ok', {
          duration: 2000
        });
      }
    });
  }
}
