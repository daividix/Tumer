import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  animal: String;
  name: String;
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

  onNoClick(): void {
    this.dialogRef.close();
  }

}
