import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario';
import { AuthenticationService } from '../services/auth/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: Usuario;
  isLogin: Boolean;
  constructor(private authService: AuthenticationService) {
    if (this.authService.isAuthenticated()) {
      this.isLogin = true;
      this.user = this.authService.getuser();
    }
  }

  ngOnInit() {
  }

}
