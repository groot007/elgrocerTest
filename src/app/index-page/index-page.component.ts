import {Component, OnInit} from '@angular/core';
import {AddressesService} from '../shared/services/addresses.service';
import {StoresService} from '../shared/services/stores.service';
import {StoreModel} from '../shared/models/store.model';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.css']
})
export class IndexPageComponent implements OnInit {
  private stores: Array<StoreModel>;
  public address: string;

  constructor(private addressesService: AddressesService, private storesService: StoresService) {
  }

  ngOnInit() {
    this.addressesService.getDefaultAddress().then(
      res => {
        const conf = {
            latitude: res.latitude,
            longitude: res.longitude,
          };
        this.address = res.location_address;
        this.storesService.getRetailers(conf).then(
          data => { this.stores = data; }
        );
      });
  }
}
