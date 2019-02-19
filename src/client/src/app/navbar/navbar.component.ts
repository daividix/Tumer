import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/auth/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  noSearch: Boolean = true;
  logued: Boolean = false;
  usuario: any;
  @Input() showFilter: Boolean;
  @Input() activedSearch: Boolean;
  @Output() onsearch = new EventEmitter();
  searchContent: String;

  constructor(private usuarioServices: UsuarioService, private router: Router,
    private authService: AuthenticationService) {
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.usuario = this.authService.getuser();
      this.logued = true;
    }
  }

  logout() {
    this.usuarioServices.logoutUsuario()
      .subscribe(res => {
        if (res.status === true) {
          this.authService.logOut();
          this.usuario = {};
          this.router.navigateByUrl('/login', { skipLocationChange: true }).then(() =>
            this.router.navigate(['/home']));
          console.log(res.message);
          return;
        } else {
          return console.log(res.message);
        }
      });
  }

  search(event) {
    event.preventDefault();
    console.log(this.searchContent);
    if (this.searchContent) {
      this.onsearch.emit(this.searchContent);
      this.searchContent = '';
      this.noSearch = false;
      return;
    } else {
      return;
    }
  }

  goProfile() {
    this.router.navigate(['/profile']);
  }

  mostrarInput() {
    if (this.searchContent) {
      return;
    }
    this.noSearch = !this.noSearch;
  }

}
