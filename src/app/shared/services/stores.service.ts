import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {StoreModel} from '../models/store.model';
import {AddressesService} from './addresses.service';
import {links} from '../../../environments/environment';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable()
export class StoresService {

  private promise: Promise<Array<StoreModel>> = null;
  public currentStore$: BehaviorSubject<StoreModel> = new BehaviorSubject<StoreModel>(null);
  public stores$: BehaviorSubject<Array<StoreModel>> = new BehaviorSubject<Array<StoreModel>>(null);
  ret;

  constructor(private http: HttpClient,
              private router: Router,
              private route: ActivatedRoute,
              private addresses: AddressesService) {
    this.addresses.address$.subscribe(rez => {
      if (rez === null) {
        return;
      }
      const conf = {
        limit: 10,
        offset: 1,
        shopper_id: rez.id,
        latitude: rez.latitude,
        longitude: rez.longitude,
      };
      this.getRetailers(conf).then((retailers: Array<StoreModel>) => {

        this.stores$.next(retailers);

        const routeLink = /\/search?/.test(this.router.url);
        if (routeLink) {
          this.route.queryParams
            .subscribe(params => {
              if (params.retailerId) {
                const currentStore = retailers.filter(el => el.id === +params.retailerId)[0];
                this.setCurrentStore(currentStore);
              } else {
                this.setCurrentStore(retailers[0]);
              }
            });
          return;
        }
      });
    });
  }


  getRetailers(conf) {
    // this.http
    //   .get(links.main + '/api/v2/categories/shopper/tree.json?limit=10&offset=0&retailer_id=16&parent_id=213').subscribe(
    //   function (result: any) {
    //     console.log(result);
    //   });
    //
    // this.http
    //   .get(links.main + '/api/v3/categories/shopper/brands.json?category_id=214&retailer_id=29&products_limit=15&products_offset=0').subscribe(
    //   function (result: any) {
    //     console.log(result);
    //   });

    return new Promise((resolve, reject) => {
      this.http
        .get(links.main + '/api/v3/retailers/all.json', {
          params: conf,
        }).subscribe(
        function (result: any) {
          resolve(result.data.retailers);
        },
        function (error) {
          console.log(error.message);
          resolve([]);
        }
      );
    });


  }


  setCurrentStore(currentStore: StoreModel) {
    this.currentStore$.next(currentStore);
    // localStorage.setItem('currentStore', JSON.stringify(currentStore));
  }
}
