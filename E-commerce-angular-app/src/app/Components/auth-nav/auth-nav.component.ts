import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-auth-nav',
  standalone: true,
  imports: [MenubarModule, RouterLink],
  templateUrl: './auth-nav.component.html',
  styleUrl: './auth-nav.component.scss'
})
export class AuthNavComponent {
  items: MenuItem[] | undefined;

  ngOnInit() {
      this.items = [
          {
              label: 'login',
              icon: 'pi pi-sign-in',
              path: 'login'
          },
          {
              label: 'register',
              icon: 'pi pi-user-plus',
              path: 'register'
          },
      ];
  }
}
