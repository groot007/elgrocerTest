import {Injectable} from '@angular/core';

@Injectable()
export class BasketService {

  basket = {
    items: [],
    totalPrice: 0,
    totalQuantity: 0,
  };

  constructor() {
    const LS = localStorage.getItem('basket');
    if (LS) {
      this.basket = JSON.parse(LS);
    }
  }

  getBasket() {
    return this.basket;
  }

  toLocalStorage(basket): void {
    localStorage.setItem('basket', JSON.stringify(basket));
  }

  indexInBasket(item) {
    return this.basket.items.findIndex(el => el.id === item.id);
  }

  roundPrice(a, b, action) {
    if (action === '-') {
      return Math.round((a - b) * 100) / 100;
    } else {
      return Math.round((a + b) * 100) / 100;
    }
  }

  removeItem(item) {
    const index = this.indexInBasket(item),
      currentItem = this.basket.items[index];

    currentItem.quantity--;
    currentItem.total_price = this.roundPrice(currentItem.total_price, currentItem.price.price_full, '-');
    this.basket.totalPrice = this.roundPrice(this.basket.totalPrice, currentItem.price.price_full, '-');
    this.basket.totalQuantity--;

    if (item['quantity'] < 1) {
      this.basket.items.splice(index, 1);
    }
    this.toLocalStorage(this.basket);
  }

  addItem(item) {
    const index = this.indexInBasket(item);
    let currentItem = null;

    if (index !== -1) {
      currentItem = this.basket.items[index];
      currentItem.quantity++;
      currentItem.total_price = this.roundPrice(currentItem.total_price, currentItem.price.price_full, '+');
      this.basket.totalPrice = this.roundPrice(this.basket.totalPrice, currentItem.price.price_full, '+');
    } else {
      item['quantity'] = 1;
      item['total_price'] = item.price.price_full;
      this.basket.totalPrice += item['total_price'];
      this.basket.items.push(item);
    }
    this.basket.totalQuantity++;
    this.toLocalStorage(this.basket);
  }
}
