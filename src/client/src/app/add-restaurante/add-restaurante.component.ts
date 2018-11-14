import { Component, OnInit } from '@angular/core';
import { Restaurante } from '../models/restaurante';
import { RestauranteService } from '../services/restaurante.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-restaurante',
  templateUrl: './add-restaurante.component.html',
  styleUrls: ['./add-restaurante.component.css']
})
export class AddRestauranteComponent implements OnInit {
  modelRestaurante: any = {};
  selectedFile: File = null;
  constructor(private restauranteService: RestauranteService, private router: Router) { }

  ngOnInit() {
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }
  registrarRestaurante(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', this.modelRestaurante.name);
    formData.append('direccion', this.modelRestaurante.direccion);
    formData.append('telefono', this.modelRestaurante.telefono);
    formData.append('eslogan', this.modelRestaurante.eslogan);
    formData.append('informacion', this.modelRestaurante.informacion);
    formData.append('tipo', this.modelRestaurante.tipo);
    formData.append('image', this.selectedFile, this.selectedFile.name);
    this.restauranteService.agregarRestaurante(formData)
    .subscribe(res => {
      if (res.status === true) {
        this.router.navigate(['/home']);
      }
      console.log(res);
    });
  }

}
