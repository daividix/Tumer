import { Component, OnInit, Input } from '@angular/core';
import { Restaurante } from '../models/restaurante';
import { AuthenticationService } from '../services/auth/authentication.service';
import { CalificacionService } from '../services/calificacion.service';
import { Calificacion } from '../models/calificacion';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DialogCalificarComponent } from '../dialog-calificar/dialog-calificar.component';

@Component({
  selector: 'app-restaurante',
  templateUrl: './restaurante.component.html',
  styleUrls: ['./restaurante.component.css']
})
export class RestauranteComponent implements OnInit {

  @Input() restaurante: Restaurante;
  isCalificado: Boolean = false;
  calificacion: Calificacion;
  miCalificacion = {};
  isAuth: Boolean = false;
  constructor(private authService: AuthenticationService,
    private calificacionService: CalificacionService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private calificacionServices: CalificacionService) {
      if (authService.isAuthenticated()) {
        this.isAuth = true;
      }
    }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.calificacionService.verCalificacionUsuarioRestaurante(this.restaurante._id)
      .subscribe(res => {
        if (res.calificaciones.length > 0) {
          this.miCalificacion = res.calificaciones[0];
          this.isCalificado = true;
        }
      });
    }
  }

  dialogCalificar(restaurante) {
    this.dialog.open(DialogCalificarComponent, {
      width: '400px',
      data: {
        restaurante
      }
    }).afterClosed().subscribe(result => {
      if (result === false) {
        return;
      }
      this.calificacion = new Calificacion();
      this.calificacion.cal_comida = result.cal_comida;
      this.calificacion.cal_servicio = result.cal_servicio;
      this.calificacion.cal_experiencia = result.cal_experiencia;
      this.calificacion.cal_limpieza = result.cal_limpieza;
      this.calificacion.cal_ubic = result.cal_ubic;
      this.calificacion.restaurante_id = this.restaurante._id;

      this.calificacionService.calificarRestaurante(this.calificacion)
      .subscribe(res => {
        if (res.status) {
          this.snackBar.open('Tu calificacion se agrego correctamente!!', 'Ok', {
            duration: 4000
          });
          this.ngOnInit();
        } else {
          this.snackBar.open('Ups, hubo un problema', 'Ok', {
            duration: 4000
          });
        }
      });
    });
  }

  redondeo(numero, decimales) {
    const flotante = parseFloat(numero);
    const resultado = Math.round(flotante * Math.pow(10, decimales)) / Math.pow(10, decimales);
    return resultado;
}

  tooltipCal(cal) {
    const isAuthenticated = this.authService.isAuthenticated();
    if (isAuthenticated) {
      if (this.isCalificado) {
        return `Tu calificacion: ${cal}`;
      }
      return '';
    }
      return '';

  }
}
