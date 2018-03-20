import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../auth/auth.service';
import { environment } from '../../../environments/environment';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {AddressModel} from '../models/address.model';


@Injectable()
export class AddressesService {

  private addresses = null;
  public address$: BehaviorSubject<AddressModel> = new BehaviorSubject<AddressModel>(null);

  constructor(private http: HttpClient,
              private auth: AuthService) {
    this.getAddresses().then(address => {
      const defaultAddress = address.filter(data => data['default_address'] === true)[0];
      this.address$.next(defaultAddress);
    });
  }

  getAddresses() {
    if (!this.auth.isAuthenticated()) {
      console.log('Not authenticated');
    }

    if (this.addresses) {
      return this.addresses;
    }

    this.addresses = new Promise((resolve, reject) => {
      this.http.get(environment['addressesLink']).subscribe(
        (result: any) => {
          resolve(result.data.addresses);
        },
        error => {
          console.log(error.message);
          resolve([]);
        }
      );
    });

    return this.addresses;
  }

  changeAddress(address) {
    this.getAddresses().then((rez: Array<AddressModel>) => {
      const newAddress = rez.filter((el: AddressModel) => el.id === address);
      this.address$.next(newAddress[0]);
    });

  }

}
