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

  constructor(
    private apiService: ApiService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.apiService.getProduct().subscribe((data) => {
      this.productList = data;
      this.productList.forEach((item: any) => {
        item.total = item.price;
        item.quantity = 1;
        //   Object.assign(a, { quantity: 1, total: a.price });
      });

      // this.productList = data.map((item: any) => {

      // });
    });
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }
}
