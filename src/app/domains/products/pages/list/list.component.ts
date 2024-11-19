import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  Input,
  signal,
  SimpleChanges,
} from '@angular/core';
import { Router, RouterLinkWithHref } from '@angular/router';
import { ProductComponent } from '@products/components/product/product.component';
import { HeaderComponent } from '@shared/components/header/header.component';
import { Category } from '@shared/models/category.models';
import { Product } from '@shared/models/product.model';
import { CartService } from '@shared/services/cart.service';
import { CategoryService } from '@shared/services/category.service';
import { ProductService } from '@shared/services/product.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    ProductComponent,
    HeaderComponent,
    RouterLinkWithHref,
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export default class ListComponent {
  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  private cartService = inject(CartService);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private router = inject(Router);
  @Input() category_id?: string;

  ngOnInit() {
    this.getCategories();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getProducts();
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  private getProducts() {
    this.productService.getProducts(this.category_id).subscribe({
      next: (products) => {
        this.products.set(products);
      },
      error: () => {},
    });
  }



  private getCategories() {
    this.categoryService.getAll().subscribe({
      next: (data) => {
        this.categories.set(data);
      },
      error: () => {},
    });
  }

  onCategoryChange(categoryId: string) {
    this.category_id = categoryId;
    
    this.router.navigate([], {
      queryParams: { category_id: categoryId },
      queryParamsHandling: 'merge',
    });

    this.getProducts();
  }
}
