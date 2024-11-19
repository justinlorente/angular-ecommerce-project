import { computed, Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = signal<Product[]>([]);
  total = computed(() => {
    const cart = this.cart();
    return cart.reduce((total, product) => total + product.price * (product.quantity || 1), 0);
  });
  
  constructor() {}

  addToCart(product: Product) {
    this.cart.update(state => {
      const existingProduct = state.find(item => item.id === product.id);

      if (!existingProduct) {
        return [...state, { ...product, quantity: 1 }];
      }

      return state.map(item =>
        item.id === product.id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );
    });
  }

  increaseQuantity(productId: number) {
    this.cart.update(state => 
      state.map(item =>
        item.id === productId
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      )
    );
  }

  decreaseQuantity(productId: number) {
    this.cart.update(state => 
      state.map(item => 
        item.id === productId && item.quantity && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  }

  removeFromCart(productId: number) {
    this.cart.update(state => state.filter(item => item.id !== productId));
  }
}
