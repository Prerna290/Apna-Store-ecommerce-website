import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  totalCartItem = new BehaviorSubject<number>(0);
  cartListItem: any[] = [];
  productList = new BehaviorSubject<any>([]);

  constructor() {}

  getProducts() {
    // this.productList.next(this.cartListItem);
    // console.log(this.productList.value.length, 'products list');
    return this.productList.asObservable();
  }

  getTotalCartItem() {
    return this.totalCartItem.asObservable();
  }

  setProducts(product: any) {
    this.cartListItem.push(...product);
    this.productList.next(product);
    this.totalCartItem.next(this.cartListItem.length);
  }

  addToCart(product: any) {
    this.cartListItem.push(product);
    this.productList.next([...this.cartListItem]);
    console.log(this.getTotalCartItem(), '11');
    this.totalCartItem.next(this.cartListItem.length);
    console.log(this.getTotalCartItem(), '22');
    // console.log(this.totalItems, 'length 1');
    // this.totalItems.next(this.productList.value.length);
    // console.log(this.totalItems, 'length 2');
    // this.getProducts();
    // this.productList.next(this.cartListItem);;
    this.getTotalPrice();
  }

  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartListItem.map((a: any) => {
      grandTotal += a.total;
    });
    return grandTotal;
  }

  removeCartItem(product: any) {
    this.cartListItem.map((a, index) => {
      if (product.id === a.id) {
        this.cartListItem.splice(index, 1);
      }
    });
    this.productList.next([...this.cartListItem]);
    this.totalCartItem.next(this.cartListItem.length);
  }

  removeAllItems() {
    this.cartListItem = [];
    this.productList.next(this.cartListItem);
    this.totalCartItem.next(this.cartListItem.length);
  }
}
