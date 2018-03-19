import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {AddressesService} from '../shared/services/addresses.service';
import {StoresService} from '../shared/services/stores.service';
import {StoreModel} from '../shared/models/store.model';
import {AddressModel} from '../shared/models/address.model';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.css']
})
export class IndexPageComponent implements OnInit {

  constructor(private addressesService: AddressesService, private eRef: ElementRef) {
  }

  ngOnInit() {

  }

}
