import { Component, OnInit } from '@angular/core';
import { RestauranteService } from '../services/restaurante.service';
import { ActivatedRoute } from '@angular/router';
import { ImagenService } from '../services/imagen.service';
import { Restaurante } from '../models/restaurante';

@Component({
  selector: 'app-best-rank',
  templateUrl: './best-rank.component.html',
  styleUrls: ['./best-rank.component.css']
})
export class BestRankComponent implements OnInit {
  restaurantes: Restaurante[];
  constructor(private restauranteService: RestauranteService,
    private route: ActivatedRoute,
    private imageService: ImagenService) {
      this.restauranteService.verBestRank(1)
      .subscribe(res => {
        if (res.status) {
          const restaurantes: Array<Restaurante> = res.restaurantes;
          restaurantes.forEach(restaurante => {
            this.imageService.verImagen(restaurante._id)
            .subscribe(resImage => {
              if (resImage.status) {
                restaurante.imagen = resImage.imagenes[0].url;
              }
            });
          });
          this.restaurantes = restaurantes;
        }
      });
    }

  ngOnInit() {
  }

}
