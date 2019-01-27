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
import { LoginComponent } from './login/login.component';
import { AddRestauranteComponent } from './add-restaurante/add-restaurante.component';
import { CommentsComponent } from './comments/comments.component';

import { UsuarioService } from './services/usuario.service';
import { ImagenService } from './services/imagen.service';
import { RestauranteService } from './services/restaurante.service';
import { ComentariosService } from './services/comentarios.service';
import { DialogCalificarComponent } from './dialog-calificar/dialog-calificar.component';
import { SnackBarComponent } from './snack-bar/snack-bar.component';

const appRoutes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'navbar', component: NavbarComponent},
  {path: 'addRestaurante', component: AddRestauranteComponent}
  ];
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BodyComponent,
    RegisterComponent,
    HomeComponent,
    LoginComponent,
    AddRestauranteComponent,
    CommentsComponent,
    DialogCalificarComponent,
    SnackBarComponent
  ],
  entryComponents: [
    DialogCalificarComponent
  ],
  imports: [
    BrowserModule,
    MaterialModules,
    FormsModule,
    RouterModule.forRoot(appRoutes, {onSameUrlNavigation: 'reload'}),
    CommonModule,
    HttpClientModule
  ],
  providers: [
    UsuarioService,
    RestauranteService,
    ImagenService,
    ComentariosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
