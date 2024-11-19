import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { SideMenuService } from '../../services/side-menu.service';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})

export class ShoppingCartComponent {
  private cartService = inject(CartService);
  private sideMenuService = inject(SideMenuService);

  cart = this.cartService.cart;
  total = this.cartService.total;

  toggleSideMenu() {
    this.sideMenuService.toggleSideMenu();
  }
  removeProduct(productId: number) {
    this.cartService.removeFromCart(productId);
  }
  get hideSideMenu() {
    return this.sideMenuService.hideSideMenu;
  }
}
