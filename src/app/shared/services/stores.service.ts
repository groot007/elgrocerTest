import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {StoreModel} from '../models/store.model';
import {AddressesService} from './addresses.service';
import { environment } from '../../../environments/environment';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable()
export class StoresService {

  private promise: Promise<Array<StoreModel>> = null;
  public currentStore$: BehaviorSubject<StoreModel> = new BehaviorSubject<StoreModel>(null);
  public stores$: BehaviorSubject<Array<StoreModel>> = new BehaviorSubject<Array<StoreModel>>(null);

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
        console.log('ret', retailers);
        this.setCurrentStore(retailers[0]);
        this.stores$.next(retailers);
      });
    });
  }


  getRetailers(conf) {
    this.promise = new Promise((resolve, reject) => {
      this.http
        .get(environment['mainLink'] + '/api/v3/retailers/all.json', {
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
    return this.promise;
  }


  setCurrentStore(currentStore: StoreModel) {
    this.currentStore$.next(currentStore);
    // localStorage.setItem('currentStore', JSON.stringify(currentStore));
  }
}
