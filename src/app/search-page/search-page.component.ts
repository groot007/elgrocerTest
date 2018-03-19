import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AddressesService} from '../shared/services/addresses.service';
import {StoresService} from '../shared/services/stores.service';
import {AddressModel} from '../shared/models/address.model';
import {StoreModel} from '../shared/models/store.model';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  categories;
  storeName: string;
  address: string;

  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private addressesService: AddressesService,
              private storesService: StoresService) { }

  ngOnInit() {
      this.storesService.currentStore$.subscribe(rez => {
        if (rez !== null) {
          this.storeName = rez.company_name;
        }
      });

      this.addressesService.address$.subscribe( rez => {
        if (rez !== null) {
          this.address = rez.location_address;
        }
      });
  }

}
