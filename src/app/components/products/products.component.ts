import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';
import { assets } from 'src/assets/assets';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  assets = assets;
  productList: any;
  filteredList: any;
  searchedTerm = '';

  constructor(
    private apiService: ApiService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.apiService.getProduct().subscribe((data) => {
      this.productList = data;
      this.filteredList = data;
      this.productList.forEach((item: any) => {
        if (
          item.category === "men's clothing" ||
          item.category === "women's clothing"
        ) {
          item.category = 'fashion';
        }
        item.total = item.price;
        item.quantity = 1;
      });
    });
    this.cartService.searchedTerm.subscribe((value) => {
      this.searchedTerm = value;
    });
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }

  filter(category: string) {
    this.filteredList = this.productList.filter((item: any) => {
      if (item.category === category || category === '') {
        return item;
      }
    });
  }
}
