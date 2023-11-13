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

  constructor() {
    this.retrieveData();
  }

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
    this.saveData();
  }

  addToCart(product: any) {
    this.cartListItem.forEach((element) => {
      if (element.id === product.id) {
        console.log('entered if');
        // element.quantity++;
      } else {
        console.log('entered else');
        // this.cartListItem.push(product);
      }
    });
    this.cartListItem.push(product);
    this.productList.next([...this.cartListItem]);
    this.totalCartItem.next(this.cartListItem.length);
    this.getTotalPrice();
    this.saveData();
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
    this.saveData();
  }

  removeAllItems() {
    this.cartListItem = [];
    this.productList.next(this.cartListItem);
    this.totalCartItem.next(this.cartListItem.length);
    this.saveData();
  }

  saveData() {
    localStorage.setItem('cartData', JSON.stringify(this.cartListItem));
  }

  retrieveData() {
    const storedData = localStorage.getItem('cartData');
    if (storedData) {
      this.cartListItem = JSON.parse(storedData);
      this.productList.next([...this.cartListItem]);
      this.totalCartItem.next(this.cartListItem.length);
    }
  }
}
