import { Component } from '@angular/core';
import {
  faCartShopping,
  faMagnifyingGlass,
  faTruckFast,
} from '@fortawesome/free-solid-svg-icons';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  faTruckFast = faTruckFast;
  faMagnifyingGlass = faMagnifyingGlass;
  faCartShopping = faCartShopping;
  totalCartItem = 0;
  searchedTerm = '';

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.getTotalCartItem().subscribe((length) => {
      this.totalCartItem = length;
    });
  }

  search(event: any) {
    this.cartService.searchedTerm.next(this.searchedTerm);
  }
}