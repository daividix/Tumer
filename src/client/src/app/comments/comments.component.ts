import { Component, OnInit, Input } from '@angular/core';
import { Comentario } from '../models/comentario';
import { ComentariosService } from '../services/comentarios.service';
import { Usuario } from '../models/usuario';
import { AuthenticationService } from '../services/auth/authentication.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  comentario: String;
  comentarios: Comentario[];
  @Input() restauranteId: String;
  user: Usuario;
  constructor(private comentariosService: ComentariosService,
    private authService: AuthenticationService) {
    this.user = this.authService.getuser();
   }

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
        const newComentario = res.comentario;
        newComentario.user = this.user;
        this.comentarios.unshift(newComentario);
        this.comentario = '';
      }
    });
  }

}
