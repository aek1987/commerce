import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = {
    username: '',
    email: '',
    password: ''
  };
  message: string = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    const success = this.authService.register(this.user);
    if (success) {
      this.message = 'Inscription réussie !';
    } else {
      this.message = 'Cet utilisateur existe déjà.';
    }
  }
}
