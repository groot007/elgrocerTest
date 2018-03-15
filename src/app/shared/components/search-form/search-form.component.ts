import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CategoryModel} from '../../models/category.model';
import {NgForm} from '@angular/forms';
import {StoreModel} from '../../models/store.model';
import {StoresService} from '../../services/stores.service';
import {AddressesService} from '../../services/addresses.service';
import {AddressModel} from '../../models/address.model';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

  topSearch: Array<string>;
  retailerId: number;

  constructor(private router: Router,
              private addressesService: AddressesService,
              private storesService: StoresService) {
  }

  ngOnInit() {
    this.addressesService.getDefaultAddress().then(
      (res: AddressModel) => {
        const conf = {
          latitude: res.latitude,
          longitude: res.longitude,
        };
        this.storesService.getRetailers(conf).then((stores: Array<StoreModel>) => {
            this.storesService.currentStore$.subscribe((data: StoreModel) => {
              this.topSearch = data.top_searches;
              this.retailerId = data.id;
            });
          }
        );
      });
  }

  onSubmit($event, searchQuery) {
    $event.preventDefault();

    this.router.navigate(['/search'], {
      queryParams: {searchQuery: searchQuery, retailerId: this.retailerId}
    });
  }


}
