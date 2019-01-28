import { Component, OnInit, Input } from '@angular/core';
import { Comentario } from '../models/comentario';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input('comentario') comentario: Comentario;
  constructor() { }

  ngOnInit() {
  }

}
