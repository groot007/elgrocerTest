import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryModel} from '../../models/category.model';
import {NgForm} from '@angular/forms';
import {StoreModel} from '../../models/store.model';
import {StoresService} from '../../services/stores.service';
import {AddressesService} from '../../services/addresses.service';
import {AddressModel} from '../../models/address.model';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit, OnDestroy {

  topSearch: Array<string>;
  retailerId: number;
  subscription: Subscription;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private addressesService: AddressesService,
              private storesService: StoresService) {
  }

  ngOnInit() {
    this.subscription = this.storesService.currentStore$.subscribe((currentStore: StoreModel) => {
      if (currentStore) {
        this.topSearch = currentStore.top_searches;
        this.retailerId = currentStore.id;
      }
    });
  }

  onSubmit($event, searchQuery) {
    $event.preventDefault();

    const routeLink = /\/search?/.test(this.router.url);
    if (routeLink) {
      this.route.queryParams
        .subscribe(params => {
          const query = Object.assign({}, params);
          query['searchQuery'] = searchQuery;

          this.router.navigate(['/search'], {
            queryParams: query
          });
        });
      return;
    }

    this.router.navigate(['/search'], {
      queryParams: {searchQuery: searchQuery, retailerId: this.retailerId}
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


}
