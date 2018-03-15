import {Injectable} from '@angular/core';

@Injectable()
export class BasketService {

  basketItems = {
    items: [

    ],
    totalPrice: 0,
    totalQuantity: 0,
  };

  constructor() { }

  getItems() {
   return this.basketItems.items;
  }

  isInBasket(item) {
    return this.basketItems.items.findIndex( el => el.id === item.id);
  }

  increaseQuantity(item) {
    const index = this.isInBasket(item);
    this.basketItems.items[index].quantity = item['quantity'] + 1;
  }

  decreaseQuantity(item) {
    const index = this.isInBasket(item);
    if (item['quantity'] <= 1) {
      return;
    }
    this.basketItems.items[index].quantity = item['quantity'] - 1;
  }

  addItem(item) {
    const index = this.isInBasket(item);
    if (index !== -1) {
      item['quantity'] = item['quantity'] + 1;
      this.basketItems.items[index].quantity = item['quantity'];
    } else {
      item['quantity'] = 1;
      this.basketItems.items.push(item);
    }
  }
}
