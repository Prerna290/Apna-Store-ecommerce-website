import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
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
    return results;
  }
}
