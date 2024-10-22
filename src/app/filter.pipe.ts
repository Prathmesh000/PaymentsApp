import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchTerm: string): any[] {
    if (!items || !searchTerm) {
      return items; // Return all items if there's no search term
    }
    searchTerm = searchTerm.toLowerCase(); // Make search term case insensitive
    return items.filter((item) => {
      return item.bankName.toLowerCase().includes(searchTerm); // Filter based on bank name
    });
  }
}
