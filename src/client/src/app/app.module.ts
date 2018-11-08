import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModules } from './material.module';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BodyComponent } from './body/body.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';

import { UsuarioService } from './services/usuario.service';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent}
  ];
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BodyComponent,
    RegisterComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    MaterialModules,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    CommonModule,
    HttpClientModule
  ],
  providers: [UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
