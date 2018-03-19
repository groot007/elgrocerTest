import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'productsFilter'
})
export class ProductsFilterPipe implements PipeTransform {
  transform(products, value) {
    if (!value) {
      return products;
    }
    return products.filter(product => {
      return product._source.categories.filter( el => {
        return el.name === value;
      }).length;
    });
  }
}
