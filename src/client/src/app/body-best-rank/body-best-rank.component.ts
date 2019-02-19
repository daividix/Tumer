import { Component, OnInit, Input } from '@angular/core';
import { Restaurante } from '../models/restaurante';
import { RestauranteService } from '../services/restaurante.service';
import { ImagenService } from '../services/imagen.service';

@Component({
  selector: 'app-body-best-rank',
  templateUrl: './body-best-rank.component.html',
  styleUrls: ['./body-best-rank.component.css']
})
export class BodyBestRankComponent implements OnInit {

  @Input() restaurantes: Restaurante[];
  activedButton = true;
  nextPage = 2;
  constructor(private restauranteServices: RestauranteService,
    private imagenServices: ImagenService) { }

  ngOnInit() {
  }

  getMoreRestaurant() {
    this.restauranteServices.verBestRank(this.nextPage)
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
              this.activedButton = true;
            }
          });
        });
      }
    });
  }

}
