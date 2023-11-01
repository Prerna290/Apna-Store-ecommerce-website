import { Component } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  products: any = [];
  grandTotal = 0;
  faTrash = faTrash;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.getProducts().subscribe((data) => {
      this.products = data;
      this.grandTotal = this.cartService.getTotalPrice();
    });
  }

  removeProduct(product: any) {
    this.cartService.removeCartItem(product);
  }

  emptyCart() {
    this.cartService.removeAllItems();
  }
}
