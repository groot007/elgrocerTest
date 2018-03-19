import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {StoresService} from '../../shared/services/stores.service';
import {NgxCarousel, NgxCarouselStore} from 'ngx-carousel';
import {StoreModel} from '../../shared/models/store.model';
import {Subscription} from 'rxjs/Subscription';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit, OnDestroy {

  public stores: Array<StoreModel>;
  public carouselBanner: NgxCarousel;
  public currentStore = 0;
  private subscription: Subscription;

  constructor(private storesService: StoresService) {
  }


  ngOnInit() {
    this.storesService.stores$.subscribe( stores => {
      if (stores !== null) {
        this.stores = stores.filter( el => el.is_opened);
        this.storesService.currentStore$.subscribe((currentStore: StoreModel) => {
          if (currentStore !== null) {
            this.currentStore = stores.findIndex(el => el.id === currentStore.id);
          }
        });
      }
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

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
