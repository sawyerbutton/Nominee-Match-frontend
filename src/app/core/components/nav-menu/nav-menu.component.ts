import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  menuItems = [
    {
      label: '开发者设置',
      route: '/developer/settings',
      icon: 'fas fa-cog'
    }
  ];
}
