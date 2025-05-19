import { Component } from '@angular/core';
import { UserNavComponent } from '../../Components/user-nav/user-nav.component';
import { UserFooterComponent } from '../../Components/user-footer/user-footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [UserNavComponent, UserFooterComponent, RouterOutlet],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.scss'
})
export class UserLayoutComponent {

}
