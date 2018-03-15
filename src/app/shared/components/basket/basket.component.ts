import { Component, OnInit } from '@angular/core';
import {BasketService} from '../../services/basket.service';
import {StoresService} from '../../services/stores.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  isOpened = false;
  storeName: string;
  basketItems;

  constructor(private basketService: BasketService, private storeService: StoresService) { }

  ngOnInit() {
    this.storeService.currentStore$.subscribe(data => {
      if ( !data ) {
        this.storeName = JSON.parse(localStorage.getItem('currentStore')).company_name;
      } else {
        this.storeName = data.company_name;
      }
    });
    this.basketItems = this.basketService.getItems();
  }

  getTotalPrice(item) {
    const multiply = Math.round(item.price.price_full * item.quantity * 100) / 100;
    return  multiply + ' ' + item.price.price_currency;
  }

  increaseQuantity(item) {
    this.basketService.increaseQuantity(item);
  }

  decreaseQuantity(item) {
    this.basketService.decreaseQuantity(item);
  }

  showBasket() {
    this.isOpened = !this.isOpened;
  }

}
