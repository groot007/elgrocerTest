import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {StoreModel} from '../models/store.model';

@Injectable()
export class StoresService {

  private promise: Promise<Array<StoreModel>> = null;
  public currentStore$: BehaviorSubject<StoreModel> = new BehaviorSubject<StoreModel>(null);

  constructor(private http: HttpClient) {
  }


  getRetailers(conf) {
   if (!this.promise) {
      const that = this;
      this.promise = new Promise((resolve, reject) => {
        this.http
          .get('http://el-grocer-staging-dev.herokuapp.com/api/v3/'
            + 'retailers/all.json?limit=10&offset=1&latitude='
            + conf.latitude + '&longitude=' + conf.longitude + '&shopper_id=1006').subscribe(
          function (result: any) {
            resolve(result.data.retailers);
            that.setCurrentStore(result.data.retailers[0]);
            console.log(result);
          },
          function (error) {
            console.log(error.message);
            resolve([]);
          }
        );
      });
    }
    return this.promise;
  }


  setCurrentStore(currentStore: StoreModel) {
    this.currentStore$.next(currentStore); // тут мы поставим
    localStorage.setItem('currentStore', JSON.stringify(currentStore));
  }

  getCurrentStore() {
    return this.currentStore$.getValue();
  }


}
