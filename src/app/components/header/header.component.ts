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

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.getTotalCartItem().subscribe((length) => {
      console.log(length);
      this.totalCartItem = length;
    });
  }
}
