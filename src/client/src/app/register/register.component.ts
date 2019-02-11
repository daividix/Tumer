import { Component, OnInit } from '@angular/core';

import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  modelUsuario: any = {};
  registerForm: FormGroup;
  constructor(private usuarioServices: UsuarioService,
    private router: Router,
    private _formBuilder: FormBuilder,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit() {
    this.registerForm = this._formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      last_name: ['', [Validators.minLength(2), Validators.maxLength(30)]],
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]]
    });
  }

  registrarUsuario(event) {
    event.preventDefault();
    const usuario: Usuario = {
      name: this.registerForm.getRawValue().name,
      last_name: this.registerForm.getRawValue().last_name,
      username: this.registerForm.getRawValue().username,
      email: this.registerForm.getRawValue().email,
      password: this.registerForm.getRawValue().password
    };
    this.usuarioServices.agregarUsuario(usuario)
    .subscribe( result => {
      console.log(result);
      if (result.status) {
        this.router.navigate(['/home']);
      }
    });
  }

  getErrorMessageName() {
    if (this.registerForm.controls['name'].errors == null) {
      return;
    }
    return this.registerForm.controls['name'].errors.required ? 'Nombre requerido' :
    this.registerForm.controls['name'].errors.minlength ? 'Minimo 2 caracteres' :
    this.registerForm.controls['name'].errors.maxlength ? 'Maximo 20 caracteres' :
    '';
  }

  getErrorMessageLastName() {
    if (this.registerForm.controls['last_name'].errors == null) {
      return;
    }
    return this.registerForm.controls['last_name'].errors.minlength ? 'Minimo 2 caracteres' :
    this.registerForm.controls['last_name'].errors.maxlength ? 'Maximo 30 caracteres' :
    '';
  }

  getErrorMessageUsername() {
    if (this.registerForm.controls['username'].errors == null) {
      return;
    }
    return this.registerForm.controls['username'].errors.required ? 'Username requerido' :
          this.registerForm.controls['username'].errors.minlength ? 'Minimo 4 caracteres' :
          this.registerForm.controls['username'].errors.maxlength ? 'Maximo 30 caracteres' :
          '';
  }

  getErrorMessageEmail() {
    if (this.registerForm.controls['email'].errors == null) {
      return;
    }
    return this.registerForm.controls['email'].errors.required ? 'Email requerido' :
    this.registerForm.controls['email'].errors.email ? 'Email invalido' :
    '';
  }
  getErrorMessagePassword() {
    if (this.registerForm.controls['password'].errors == null) {
      return;
    }
    return this.registerForm.controls['password'].errors.required ? 'Password requerido' :
    this.registerForm.controls['password'].errors.minlength ? 'Minimo 8 caracteres' :
    this.registerForm.controls['password'].errors.maxlength ? 'Maximo 100 caracteres' :
    '';
  }
}
