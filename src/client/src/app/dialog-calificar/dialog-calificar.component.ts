import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Calificacion } from '../models/calificacion';

export interface DialogData {
  name: String;
  pregunta: String;
  calificacion: Calificacion;
}
@Component({
  selector: 'app-dialog-calificar',
  templateUrl: './dialog-calificar.component.html',
  styleUrls: ['./dialog-calificar.component.css']
})
export class DialogCalificarComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<DialogCalificarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) { }

  ngOnInit() {
  }

  onNoClick(cal): void {
    this.dialogRef.close(cal);
  }

  calificar(calificacion): void {
    this.dialogRef.close(calificacion);
  }
}
