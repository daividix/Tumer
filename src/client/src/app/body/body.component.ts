import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DialogCalificarComponent } from '../dialog-calificar/dialog-calificar.component';

// models
import { Restaurante } from '../models/restaurante';
import { Calificacion } from '../models/calificacion';

// services
import { RestauranteService } from '../services/restaurante.service';
import { ImagenService } from '../services/imagen.service';
import { CalificacionService } from '../services/calificacion.service';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';


@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  @Input() restaurantes: Restaurante[];
  calificacion = new Calificacion();
  nextPage = 2;
  activedButton = true;
  user: Usuario;
  constructor(
    private restauranteServices: RestauranteService,
    private imagenServices: ImagenService,
    private usuarioServices: UsuarioService
    ) {

  }

  ngOnInit() {
  }

  getMoreRestaurant() {
    this.restauranteServices.verRestaurantes(this.nextPage)
    .subscribe(res => {
      console.log(res);
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
