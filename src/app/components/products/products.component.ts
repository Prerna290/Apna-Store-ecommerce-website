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
  selectedItem = '';
  jewellery_products = '/assets/images/jewellery.jpg';

  constructor(
    private apiService: ApiService,
    public cartService: CartService
  ) {}

  ngOnInit() {
    this.apiService.getProduct().subscribe((data) => {
      this.productList = data;
      this.filteredList = data;
      this.cartService.totalProductAfterFilter.next(Object.keys(data).length);
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
    this.selectedItem = category;
    this.filteredList = this.productList.filter((item: any) => {
      if (item.category === category || category === '') {
        return item;
      }
    });
    this.cartService.totalProductAfterFilter.next(this.filteredList.length);
  }
}
