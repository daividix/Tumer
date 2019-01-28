import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Calificacion } from '../models/calificacion';
import { AuthenticationService } from '../services/auth/authentication.service';
import { Router } from '@angular/router';
import { Restaurante } from '../models/restaurante';

export interface DialogData {
  restaurante: Restaurante;
}
@Component({
  selector: 'app-dialog-calificar',
  templateUrl: './dialog-calificar.component.html',
  styleUrls: ['./dialog-calificar.component.css']
})
export class DialogCalificarComponent implements OnInit {
  isloggued: Boolean = false;
  calificacion: Calificacion = new Calificacion();
  constructor(
    private dialogRef: MatDialogRef<DialogCalificarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private authService: AuthenticationService,
    private router: Router
    ) {
      if (this.authService.isAuthenticated()) {
        this.isloggued = true;
      }
     }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  calificar(cal, value, stepper): void {
    if (cal === 1) {
      this.calificacion.cal_comida = value;
      stepper.next();
      return;
    }
    if (cal === 2) {
      this.calificacion.cal_servicio = value;
      stepper.next();
      return;
    }
    if (cal === 3) {
      this.calificacion.cal_experiencia = value;
      stepper.next();
      return;
    }
    if (cal === 4) {
      this.calificacion.cal_limpieza = value;
      stepper.next();
      return;
    }
    if (cal === 5) {
      this.calificacion.cal_ubic = value;
      this.dialogRef.close(this.calificacion);
      return;
    }
  }

  link(opcion) {
    if (opcion === 1) {
      this.router.navigate(['/login']);
      this.dialogRef.close();
    } else {
      this.router.navigate(['/register']);
      this.dialogRef.close();
    }
  }
}
