import {Component, ElementRef, HostListener, OnDestroy, OnInit} from '@angular/core';
import {StoresService} from '../../services/stores.service';
import {AddressesService} from '../../services/addresses.service';
import {StoreModel} from '../../models/store.model';
import {AddressModel} from '../../models/address.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';


@Component({
  selector: 'app-stores-popup',
  templateUrl: './stores-popup.component.html',
  styleUrls: ['./stores-popup.component.css']
})
export class StoresPopupComponent implements OnInit, OnDestroy {

  stores: Array<StoreModel>;
  isOpened = false;
  address: string;
  private subscription: Subscription;

  constructor(private eRef: ElementRef,
              private router: Router,
              private route: ActivatedRoute,
              private storesService: StoresService) {
  }

  // @HostListener('document:click', ['$event'])
  // clickout(event) {
  //   if (!this.eRef.nativeElement.contains(event.target)) {
  //     this.isOpened = false;
  //   }
  // }

  ngOnInit() {
    this.subscription = this.storesService.stores$.subscribe( stores => {
      if (stores !== null) {
        this.stores = stores;
      }
    });
  }

  getPaymentMethod(arr: Array<any>) {
    return arr.map(el => el.name.replace(/_+|on_delivery/g, '')).join(',');
  }

  setCurrentStore(store: StoreModel, isOpened: boolean) {
    if (isOpened) {
      this.storesService.setCurrentStore(store);
      const routeLink = /\/search?/.test(this.router.url);
      if (routeLink) {
        this.route.queryParams
          .subscribe( params => {
            const query = Object.assign({}, params );
            query['retailerId'] = store.id;

            this.router.navigate(['/search'], {
              queryParams: query
            });
          });
      }
    }
  }

  showStores() {
    this.isOpened = !this.isOpened;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
