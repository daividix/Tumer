import { Component, OnInit, Input } from '@angular/core';
import { Comentario } from '../models/comentario';
import { ReaccionService } from '../services/reaccion.service';
import { AuthenticationService } from '../services/auth/authentication.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { ComentariosService } from '../services/comentarios.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() comentario: Comentario;
  miReaccion: any;
  reacciones: any;
  reaccionData: any;
  constructor(private reaccionService: ReaccionService,
    private comentarioService: ComentariosService,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar,
    private router: Router) {
     }

  ngOnInit() {
    this.miReaccion = {
      like: false,
      dislike: false
    };
    this.reacciones = {
      likes: this.comentario.likes,
      dislikes: this.comentario.dislikes
    };
    this.reaccionService.buscarReaccion(this.comentario._id)
      .subscribe(res => {
        if (res.status) {
          if (res.reaccion) {
            this.reaccionData = res.reaccion;
            if (res.reaccion.reaccion === 1) {
              this.miReaccion.like = true;
            }
            if (res.reaccion.reaccion === 2) {
              this.miReaccion.dislike = true;
            }
          }
        }
      });
  }

  reaccionar(value) {
    if (this.authService.isAuthenticated()) {
      if ((this.miReaccion.like && value === 1) || (this.miReaccion.dislike && value === 2)) {
        return this.eliminarReaccion();
      }
      const reaccion = {
        comentario_id: this.comentario._id,
        reaccion: value
      };
      this.reaccionService.reaccionar(reaccion)
      .subscribe(res => {
        if (res.status) {
          this.comentarioService.obtenerComentario(this.comentario._id)
          .subscribe(resComentario => {
            if (resComentario.status) {
              const newComentario = resComentario.comentario;
              newComentario.user = this.comentario.user;
              this.comentario = newComentario;
              this.ngOnInit();
              this.snackBar.open('Se ha guardado', 'Ok', {
                duration: 2000
              });
            }
          });
        }
      });
    } else {
      this.snackBar.open('Debe estar registrado', 'Login', {
        duration: 4000
      }).onAction().subscribe(result => {
        this.router.navigate(['/login']);
      });
    }
  }

  eliminarReaccion() {
    this.reaccionService.eliminarReaccion(this.reaccionData._id, this.comentario._id)
    .subscribe(res => {
      if (res.status) {
        this.comentarioService.obtenerComentario(this.comentario._id)
          .subscribe(resComentario => {
            if (resComentario.status) {
              const newComentario = resComentario.comentario;
              newComentario.user = this.comentario.user;
              this.comentario = newComentario;
              this.ngOnInit();
              this.snackBar.open('Se ha eliminado', 'Ok', {
                duration: 2000
              });
            }
          });
      }
    });
  }
}
