import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username = '';

  constructor(private router: Router) {}

  onSubmit(): void {
    const user = { username: this.username, balance: 0 };
    localStorage.setItem('user', JSON.stringify(user));
    this.router.navigateByUrl('/dashboard');
  }
}
