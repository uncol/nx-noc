import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'assets-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class NavigationComponent {
  usersLink = ['', { outlets: { assets: ['users'] } }];
  homeLink = ['', { outlets: { assets: ['home'] } }];
}
