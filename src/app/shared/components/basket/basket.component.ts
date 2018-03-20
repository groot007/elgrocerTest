import {Component, ElementRef, HostListener, OnDestroy, OnInit} from '@angular/core';
import {BasketService} from '../../services/basket.service';
import {StoresService} from '../../services/stores.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css'],
})
export class BasketComponent implements OnInit, OnDestroy {

  isOpened = false;
  storeName: string;
  basket;
  basketItems;
  private subscription: Subscription;

  @HostListener('document:mouseup', ['$event'])
  click(event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isOpened = false;
    }
  }

  constructor(private eRef: ElementRef,
              private basketService: BasketService,
              private storeService: StoresService) {
  }

  ngOnInit() {
    this.subscription = this.storeService.currentStore$.subscribe(data => {
      if (data) {
        this.storeName = data.company_name;
      }
    });
    this.basket = this.basketService.getBasket();
    this.basketItems = this.basket.items;
  }

  addItem(item) {
    this.basketService.addItem(item);
  }

  removeItem($event, item) {
    this.basketService.removeItem(item);
  }

  showBasket() {
    this.isOpened = !this.isOpened;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
