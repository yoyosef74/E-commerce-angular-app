import { Component } from '@angular/core';
import { AuthNavComponent } from '../../Components/auth-nav/auth-nav.component';
import { AuthFooterComponent } from '../../Components/auth-footer/auth-footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [AuthNavComponent , AuthFooterComponent, RouterOutlet],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss'
})
export class AuthLayoutComponent {

}
