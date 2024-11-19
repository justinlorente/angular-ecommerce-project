import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SideMenuService {
  hideSideMenu = signal(true);

  toggleSideMenu() {
    this.hideSideMenu.update(prevState => !prevState);
  }
}
