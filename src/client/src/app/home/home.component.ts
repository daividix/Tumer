import { Component, OnInit} from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  usuario: any;
  constructor(private usuarioServices: UsuarioService) {
  }

  ngOnInit() {
  }

}
