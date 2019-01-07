import { Component, OnInit, Inject } from '@angular/core';
import { Restaurante } from '../models/restaurante';
import { RestauranteService } from '../services/restaurante.service';
import { ImagenService } from '../services/imagen.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogCalificarComponent } from '../dialog-calificar/dialog-calificar.component';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  restaurantes: Restaurante[];
  animal: String;
  name: String;
  constructor(
    private restauranteServices: RestauranteService,
    private imagenServices: ImagenService,
    private dialog: MatDialog
    ) {
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

  dialogCalificar(restaurante) {
    const dialogRef = this.dialog.open(DialogCalificarComponent, {
      width: '250px',
      data: {name: `Calificar ${restaurante.name}`}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('closed dialog');
    });
  }

  ngOnInit() {
  }

}
