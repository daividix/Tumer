import { Component, OnInit, Input } from '@angular/core';
import { Comentario } from '../models/comentario';
import { ComentariosService } from '../services/comentarios.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  comentario: String;
  comentarios: Comentario[];
  @Input() restauranteId: String;
  constructor(private comentariosService: ComentariosService) {  }

  ngOnInit() {
    this.comentariosService.obtenerComentarios(this.restauranteId, 1)
    .subscribe(res => {
      if (res.status) {
        this.comentarios = res.comentarios;
      }
    });
  }

  agregarComentario() {
    const comentario = new Comentario();
    comentario.contenido = this.comentario;
    comentario.restaurante_id = this.restauranteId;
    this.comentariosService.agregarComentario(comentario)
    .subscribe(res => {
      if (res.status) {
        this.comentarios.push(res.comentario);
        this.comentario = '';
      }
    });
  }

}
