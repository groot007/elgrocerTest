import {Component, OnInit} from '@angular/core';
import {AddressModel} from '../../shared/models/address.model';
import {StoreModel} from '../../shared/models/store.model';
import {StoresService} from '../../shared/services/stores.service';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {AddressesService} from '../../shared/services/addresses.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {

  searchQuery: string;
  searchItems;
  categories;
  storeName: string;
  storeId: number;
  address: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private http: HttpClient,
              private addressesService: AddressesService,
              private storesService: StoresService) {
  }

  ngOnInit() {
    this.storesService.currentStore$.subscribe((currentStore: StoreModel) => {
      if (currentStore !== null) {
        this.storeName = currentStore.company_name;
        this.categories = currentStore.categories;
        console.log(this.categories);
      }
    });
  }

  filterProducts($event, categoryName: string) {
    $event.preventDefault();

    this.route.queryParams
      .subscribe(params => {
        this.searchQuery = params.searchQuery;
        this.storeId = +params.retailerId;
        const query = {
          searchQuery: this.searchQuery,
          retailerId: this.storeId
        };

        if (categoryName) {
          query['categoryFilter'] = categoryName;
        }

        this.router.navigate(['/search'], {
          queryParams: query
        });
      });

  }

}
