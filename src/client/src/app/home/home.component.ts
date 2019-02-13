import { Component, OnInit} from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';
import { Restaurante } from '../models/restaurante';
import { Calificacion } from '../models/calificacion';
import { Usuario } from '../models/usuario';
import { RestauranteService } from '../services/restaurante.service';
import { ImagenService } from '../services/imagen.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  restaurantes: Restaurante[];
  user: Usuario;
  constructor(private restauranteServices: RestauranteService,
    private imagenServices: ImagenService,
    private usuarioServices: UsuarioService,
    private router: Router) {

      this.usuarioServices.checkUsuario()
    .subscribe(res => {
      if (res.status) {
        this.user = res.user;
      }
    });
    this.restauranteServices.verRestaurantes(1)
      .subscribe(res => {
        if (res.status === false) {
          console.log(res.message);
        } else {
          for (let i = 0; i < res.restaurantes.length; i++) {
            this.imagenRestaurante(res.restaurantes[i]._id).then(result => {
              res.restaurantes[i].imagen = result;
            });
          }
          this.restaurantes = res.restaurantes;
        }
      });
  }

  imagenRestaurante(id) {
    return new Promise((resolve, reject) => {
      this.imagenServices.verImagen(id)
        .subscribe(res => {
          if (res.status === false) {
            reject(console.log(res.message));
          } else {
            if (res.imagenes.length >= 1) {
              resolve(res.imagenes[0].url);
            } else {
              resolve('https://material.angular.io/assets/img/examples/shiba2.jpg');
            }
          }
        });
    });
  }

  ngOnInit() {

  }

  search (event) {
    this.router.navigate(['/search', event]);
  }
}
