import { Component, OnInit, Inject } from '@angular/core';
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
  restaurantes: Restaurante[];
  calificacion = new Calificacion();
  user: Usuario;
  constructor(
    private restauranteServices: RestauranteService,
    private imagenServices: ImagenService,
    private dialog: MatDialog,
    private calificacionServices: CalificacionService,
    private snackBar: MatSnackBar,
    private usuarioServices: UsuarioService
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
    this.dialog.open(DialogCalificarComponent, {
      width: '400px',
      data: {
        name: restaurante.name,
        pregunta: 'Que tal la experiencia?'
      }
    }).afterClosed().subscribe(calExperiencia => {
      console.log(calExperiencia);
      this.calificacion.cal_experiencia = calExperiencia;
      this.dialog.open(DialogCalificarComponent, {
        width: '400px',
        data: {
          name: restaurante.name,
          pregunta: 'Que tal la limpieza?'
        }
      }).afterClosed().subscribe(calLimpieza => {
        console.log(calLimpieza);
        this.calificacion.cal_limpieza = calLimpieza;
        this.dialog.open(DialogCalificarComponent, {
          width: '400px',
          data: {
            name: restaurante.name,
            pregunta: 'Que tal el servicio?'
          }
        }).afterClosed().subscribe(calServicio => {
          console.log(calServicio);
          this.calificacion.cal_servicio = calServicio;
          this.dialog.open(DialogCalificarComponent, {
            width: '400px',
            data: {
              name: restaurante.name,
              pregunta: 'Que tal la comida?'
            }
          }).afterClosed().subscribe(calComida => {
            console.log(calComida);
            this.calificacion.cal_comida = calComida;
            this.dialog.open(DialogCalificarComponent, {
              width: '400px',
              data: {
                name: restaurante.name,
                pregunta: 'Que tal la ubicacion?'
              }
            }).afterClosed().subscribe(calUbicacion => {
              console.log(calUbicacion);
              this.calificacion.cal_ubic = calUbicacion;
              this.calificacion.restaurante_id = restaurante._id;
              console.log(this.calificacion);
              this.calificacionServices.calificarRestaurante(this.calificacion)
              .subscribe(res => {
                console.log(res);
                if (res.status === false) {
                  return this.snackBar.open('Ups hubo un problema al calificar', 'ok', {
                    duration: 3000
                  });
                }
                return this.snackBar.open('Se ha agregado la calificacion satisfactoriamente', 'ok', {
                  duration: 3000
                });
              });
            });
          });
        });
      });
    });
  }

  redondeo(numero, decimales) {
      const flotante = parseFloat(numero);
      const resultado = Math.round(flotante * Math.pow(10, decimales)) / Math.pow(10, decimales);
      return resultado;
  }

  ngOnInit() {
    this.usuarioServices.checkUsuario()
    .subscribe(res => {
      if (res.status) {
        this.user = res.user;
      }
    });
  }

}
