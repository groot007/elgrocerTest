import {Component, Input, OnInit} from '@angular/core';
import {StoresService} from '../../shared/services/stores.service';
import {NgxCarousel, NgxCarouselStore} from 'ngx-carousel';
import {AddressesService} from '../../shared/services/addresses.service';
import {StoreModel} from '../../shared/models/store.model';
import {current} from 'codelyzer/util/syntaxKind';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  public stores: Array<StoreModel>;
  public carouselBanner: NgxCarousel;
  public currentStore = 0;

  constructor(private storesService: StoresService, private addressesService: AddressesService) {
  }


  ngOnInit() {
    this.addressesService.getDefaultAddress().then(
      res => {
        const conf = {
          latitude: res.latitude,
          longitude: res.longitude,
        };
        this.storesService.getRetailers(conf).then(
          data => {
            this.stores = data.filter(el => el.is_opened);
            this.storesService.currentStore$.subscribe(rez => {
              this.currentStore = this.stores.findIndex(el => el.id === rez.id);
            });
          }
        );
      });


    this.carouselBanner = {
      grid: {xs: 1, sm: 1, md: 1, lg: 1, all: 0},
      slide: 1,
      speed: 600,
      // interval: 4000,
      point: {
        visible: true,
        pointStyles: `
          .ngxcarouselPoint {
            position: absolute;
            bottom: 20%;
            left: 50%;
            z-index: 15;
            width: 60%;
            margin-left: -30%;
            padding-left: 0;
            list-style: none;
            text-align: center;
          }
          .ngxcarouselPoint li {
                display: inline-block;
                width: 10px;
                height: 10px;
                margin: 1px;
                text-indent: -999px;
                border: 1px solid #ffffff;
                border-radius: 10px;
                cursor: pointer;
                background-color: #000;
                background-color: rgba(0, 0, 0, 0);
                width: 13px;
                height: 5px;
                border: 0px;
                background: rgba(255,255,255, 0.8);
                margin: 1px;
          }
          .ngxcarouselPoint li.active {
              background-color: #ffffff;
          }
        `
      },
      load: 2,
      loop: true,
      touch: true
    };
  }

  /* This will be triggered after carousel viewed */
  afterCarouselViewedFn(data: NgxCarouselStore) {

  }

  /* It will be triggered on every slide*/
  onmoveFn(data: NgxCarouselStore) {
    this.storesService.setCurrentStore(this.stores[data.currentSlide]);
  }


}
