import {Component, OnInit} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {BasketService} from '../../shared/services/basket.service';
import {StoresService} from '../../shared/services/stores.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  searchQuery: string;
  searchItems = [];
  categories;
  storeId: number;
  address: string;
  categoryFilter: string;
  pageCounter = 1;
  storeName: string;
  isEmptyResponse = false;

  constructor(private route: ActivatedRoute,
              private storeService: StoresService,
              private http: HttpClient,
              private basketService: BasketService) {
  }

  ngOnInit() {

    this.route.queryParams
      .subscribe(params => {
        this.pageCounter = 1;
        this.searchQuery = params.searchQuery;
        this.storeId = +params.retailerId;
        if (params.categoryFilter) {
          this.categoryFilter = params.categoryFilter;
        } else {
          this.categoryFilter = '';
        }
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
  }


  onScrollDown() {
    this.pageCounter++;
    this.http
      .post('http://el-grocer-staging-dev.herokuapp.com/api/v1/products/shopper/elastic_search.json'
        , {
          search_input: this.searchQuery,
          page: this.pageCounter,
          retailer_id: this.storeId
        })
      .subscribe((res: Array<any>) => {
        this.searchItems = this.searchItems.concat(res['data']);
        if (!res['data'].length) {
          this.isEmptyResponse = true;
        }
      });

  }
}
