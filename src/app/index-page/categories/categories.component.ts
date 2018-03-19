import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {StoresService} from '../../shared/services/stores.service';
import { DomSanitizer } from '@angular/platform-browser';
import {AddressesService} from '../../shared/services/addresses.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {CategoryModel} from '../../shared/models/category.model';
import {StoreModel} from '../../shared/models/store.model';
import {AddressModel} from '../../shared/models/address.model';
import {Subject} from 'rxjs/Subject';
import {Subscribable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, OnDestroy {

  private currentStore: StoreModel;
  private subsciption: Subscription;
  public categories: Array<CategoryModel>;

  constructor(private storesService: StoresService,
              private _sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.subsciption = this.storesService.currentStore$.subscribe((data2: StoreModel) => {
      if (data2 !== null) {
        this.currentStore = data2;
        this.categories = this.currentStore.categories;
      }
    });
  }

  getBackground(image) {
    return this._sanitizer.bypassSecurityTrustStyle(`url(${image})`);
  }

  ngOnDestroy() {
    if (this.subsciption) {
      this.subsciption.unsubscribe();
    }
  }
}
