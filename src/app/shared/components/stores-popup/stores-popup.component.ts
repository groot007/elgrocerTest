import {Component, OnInit} from '@angular/core';
import {StoresService} from '../../services/stores.service';
import {AddressesService} from '../../services/addresses.service';
import {StoreModel} from '../../models/store.model';
import {AddressModel} from '../../models/address.model';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-stores-popup',
  templateUrl: './stores-popup.component.html',
  styleUrls: ['./stores-popup.component.css']
})
export class StoresPopupComponent implements OnInit {

  stores: Array<StoreModel>;
  isOpened = false;
  address: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private storesService: StoresService,
              private addressesService: AddressesService) {
  }

  ngOnInit() {
    this.addressesService.getDefaultAddress().then(
      (res: AddressModel) => {
        const conf = {
          latitude: res.latitude,
          longitude: res.longitude,
        };
        this.address = res.location_address;

        this.storesService.getRetailers(conf).then((stores: Array<StoreModel>) => {
            this.stores = stores;
          }
        );
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

}
