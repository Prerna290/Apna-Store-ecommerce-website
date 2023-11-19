import { Pipe, PipeTransform } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  constructor(private cartService: CartService) {}
  transform(value: any[], filterString: string, propertyName: string) {
    const results: any = [];
    if (!value || filterString === '' || propertyName === '') {
      return value;
    }
    value.forEach((result) => {
      if (
        result[propertyName].toLowerCase().includes(filterString.toLowerCase())
      ) {
        results.push(result);
      }
    });
    this.cartService.totalProductAfterFilter.next(results.length);
    return results;
  }
}
