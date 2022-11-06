import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  // TODO: agregar que los iconos cambien dependiendo de la pestaña
  icon = 'outline';
  current = 'sharp';
  home = 'home';
  headers = 'albums';
  favourites = 'star';
  constructor() {}
  onClick(tab: string) {
    switch (true) {
      case tab === 'tab1':
        this.home = this.home + this.current;
        break;
      case tab === 'tab1':
        break;
      case tab === 'tab1':
        break;
    }
  }
}
