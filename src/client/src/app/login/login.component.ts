import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AuthenticationService } from '../services/auth/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuarioLogin: any = {};
  loginForm: FormGroup;
  constructor(private usuarioService: UsuarioService,
    private router: Router,
    private snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    private authService: AuthenticationService) { }

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]]
    });
  }

  login() {
    this.usuarioLogin.username = this.loginForm.getRawValue().username;
    this.usuarioLogin.password = this.loginForm.getRawValue().password;
    this.usuarioService.loginUsuaio(this.usuarioLogin)
    .subscribe(res => {
      if (res.status === true) {
        console.log(res);
        this.authService.login(res.user);
        this.router.navigateByUrl('/login', {skipLocationChange: true})
        .then(() => {
          this.router.navigate(['/home']);
        });
      } else {
        this.snackBar.open(res.message, 'Ok', {
          duration: 3000
        });
      }
    });
  }

  getErrorMessageUsername() {
    if (this.loginForm.controls['password'].errors == null) {
      return;
    }
    return this.loginForm.controls['username'].errors.required ? 'Username requerido' :
          this.loginForm.controls['username'].errors.minlength ? 'Minimo 4 caracteres' :
          this.loginForm.controls['username'].errors.maxlength ? 'Maximo 30 caracteres' :
          '';
  }
  getErrorMessagePassword() {
    if (this.loginForm.controls['password'].errors == null) {
      return;
    }
    return this.loginForm.controls['password'].errors.required ? 'Password requerido' :
    this.loginForm.controls['password'].errors.minlength ? 'Minimo 8 caracteres' :
    this.loginForm.controls['password'].errors.maxlength ? 'Maximo 100 caracteres' :
    '';
  }
}
