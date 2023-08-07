import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  public username: string | null = null;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        this.username = user.username;
      });
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('transactions');
    this.router.navigateByUrl('/login');
    this.username = null;
  }
}
