import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { SideMenuService } from '../../services/side-menu.service';
import { RouterLinkWithHref, RouterLinkActive } from '@angular/router';
import { ShoppingCartComponent } from "../shopping-cart/shopping-cart.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref, RouterLinkActive, ShoppingCartComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private cartService = inject(CartService);
  private sideMenuService = inject(SideMenuService);
  
  cart = this.cartService.cart;
  total = this.cartService.total;
  isMobileMenuVisible = false;

  toggleSideMenu() {
    this.sideMenuService.toggleSideMenu();
  }
  toggleMobileMenu() {
    this.isMobileMenuVisible = !this.isMobileMenuVisible;
  }
}
