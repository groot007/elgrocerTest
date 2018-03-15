import { Component, OnInit } from '@angular/core';
import {StoresService} from '../../shared/services/stores.service';
import {AddressModel} from '../../shared/models/address.model';
import {StoreModel} from '../../shared/models/store.model';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {AddressesService} from '../../shared/services/addresses.service';
import {BasketService} from '../../shared/services/basket.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  searchQuery: string;
  searchItems = [];
  categories;
  storeName: string;
  storeId: number;
  address: string;

  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private basketService: BasketService,
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
            if (params.categoryFilter) {
              this.searchItems = res['data'].filter( el => el._source.category_name[0] === params.categoryFilter);
            } else {
              this.searchItems = res['data'];
            }
          });
      });
  }

  addToCart($event, item) {
    $event.preventDefault();
    const newItem = new Object(item);
    this.basketService.addItem(newItem);
  }
}
