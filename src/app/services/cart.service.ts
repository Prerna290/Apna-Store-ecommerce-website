import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  totalCartItem = new BehaviorSubject<number>(0);
  cartListItem: any[] = [];
  productList = new BehaviorSubject<any>([]);
  searchedTerm = new BehaviorSubject<string>('');

  constructor() {}

  getProducts() {
    // this.productList.next(this.cartListItem);
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
    this.totalCartItem.next(this.cartListItem.length);
    // this.totalItems.next(this.productList.value.length);
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
