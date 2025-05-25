import { Pipe, PipeTransform } from '@angular/core';
import { IProducts } from '../interfaces/http';

@Pipe({
  name: 'searchProduct',
  standalone: true
})
export class SearchProductPipe implements PipeTransform {

  transform(products: IProducts[], searchKey: string): IProducts[] {
    return products.filter( (products) =>
      products.title.toLowerCase().includes(searchKey.toLowerCase()));
  }

}
