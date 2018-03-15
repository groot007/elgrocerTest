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

  searchQuery: string;
  searchItems;
  categories;
  storeName: string;
  storeId: number;
  address: string;

  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private addressesService: AddressesService,
              private storesService: StoresService) { }

  ngOnInit() {

    this.route.queryParams
      .subscribe(params => {
        this.searchQuery = params.searchQuery;
        this.storeId = +params.retailerId;
        this.http
          .post('http://el-grocer-staging-dev.herokuapp.com/api/v1/products/shopper/elastic_search.json'
            , {
              search_input: this.searchQuery,
              page: 1,
              retailer_id: this.storeId
            })
          .subscribe(res => {
            this.searchItems = res['data'];
          });
      });

    this.addressesService.getDefaultAddress().then(
      (res: AddressModel) => {
        const conf = {
          latitude: res.latitude,
          longitude: res.longitude,
        };
        this.address = res.location_address;
        this.storesService.getRetailers(conf).then((stores: Array<StoreModel>) => {
            this.storesService.currentStore$.subscribe((data: StoreModel) => {
              this.storesService.currentStore$.subscribe(rez => {
                this.categories = rez.categories;
                this.storeName = rez.company_name;
              });
            });
          }
        );
      });


  }

}
