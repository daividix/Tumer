import { Component, OnInit } from '@angular/core';
import { RestauranteService } from '../services/restaurante.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurante } from '../models/restaurante';
import { ImagenService } from '../services/imagen.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchContent;
  restaurantes: Restaurante[];
  constructor(private restauranteService: RestauranteService,
    private route: ActivatedRoute,
    private imageService: ImagenService,
    private router: Router) {

    }

  updateRestauante(page) {
    this.restauranteService.searchRestaurante(page, this.searchContent)
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
    this.route.params.subscribe(params => {
      this.searchContent = params['content'];
      this.updateRestauante('1');
    });
  }

  search(event) {
    this.searchContent = event;
    this.updateRestauante('1');
  }

}
