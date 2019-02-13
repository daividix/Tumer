import { Component, OnInit, Input } from '@angular/core';
import { Restaurante } from '../models/restaurante';
import { Calificacion } from '../models/calificacion';
import { Usuario } from '../models/usuario';
import { RestauranteService } from '../services/restaurante.service';
import { ImagenService } from '../services/imagen.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-body-search',
  templateUrl: './body-search.component.html',
  styleUrls: ['./body-search.component.css']
})
export class BodySearchComponent implements OnInit {
  @Input() restaurantes: Restaurante[];
  @Input() searchContent: String;
  calificacion = new Calificacion();
  nextPage = 2;
  activedButton = false;
  user: Usuario;
  constructor(private restauranteServices: RestauranteService,
    private imagenServices: ImagenService,
    private usuarioServices: UsuarioService) { }

  ngOnInit() {
  }

  getMoreRestaurant() {
    this.restauranteServices.searchRestaurante(this.searchContent, this.nextPage)
    .subscribe(res => {
      if (res.status) {
        const newRestaurantes: Array<Restaurante> = res.restaurantes;
        newRestaurantes.forEach(restaurante => {
          this.imagenServices.verImagen(restaurante._id)
          .subscribe(resImage => {
            if (resImage.status) {
              restaurante.imagen = resImage.imagenes[0].url;
              this.restaurantes.push(restaurante);
            }
            if (res.nextPage === null) {
              this.activedButton = false;
            } else {
              this.nextPage = res.nextPage;
            }
          });
        });
      }
    });
  }
}
