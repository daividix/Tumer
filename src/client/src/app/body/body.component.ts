import { Component, OnInit } from '@angular/core';
import { Restaurante } from '../models/restaurante';
import { RestauranteService } from '../services/restaurante.service';
import { ImagenService } from '../services/imagen.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  restaurantes: Restaurante[];
  constructor(private restauranteServices: RestauranteService, private imagenServices: ImagenService) {
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

}
