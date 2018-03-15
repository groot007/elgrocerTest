import {Component, Input, OnInit} from '@angular/core';
import {StoresService} from '../../shared/services/stores.service';
import { DomSanitizer } from '@angular/platform-browser';
import {AddressesService} from '../../shared/services/addresses.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {CategoryModel} from '../../shared/models/category.model';
import {StoreModel} from '../../shared/models/store.model';
import {AddressModel} from '../../shared/models/address.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  private currentStore: StoreModel;
  public categories: Array<CategoryModel>;

  constructor(private addressesService: AddressesService,
              private storesService: StoresService,
              private _sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.addressesService.getDefaultAddress().then(
      (res: AddressModel) => {
        const conf = {
          latitude: res.latitude,
          longitude: res.longitude,
        };
        this.storesService.getRetailers(conf).then( (stores: Array<StoreModel>) => {
            this.storesService.currentStore$.subscribe((data: StoreModel) => {
              this.currentStore = data;
              this.categories = this.currentStore.categories;
            });
          }
        );
      });
  }

  getBackground(image) {
    return this._sanitizer.bypassSecurityTrustStyle(`url(${image})`);
  }
}
