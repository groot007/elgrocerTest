import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AuthService} from '../../auth/auth.service';
import {links} from '../../../environments/environment';

@Injectable()
export class AddressesService {

  private addresses = null;
  private defaultAddress = null;

  constructor(private http: HttpClient, private auth: AuthService) {
  }

  getAddresses() {
    if (!this.auth.isAuthenticated()) {
      console.log('Not authenticated');
    }

    if (this.addresses) {
      return this.addresses;
    }

    this.addresses = new Promise((resolve, reject) => {
      this.http.get(links.addresses).subscribe(
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

  getDefaultAddress() {
    if (this.defaultAddress) {
      return this.defaultAddress;
    }

    this.defaultAddress = new Promise((resolve, reject) => {
        this.getAddresses().then(
          (result: any) => {
            resolve(result.filter(data => data['default_address'] === true)[0]);
          },
          error => {
            console.log(error.message);
            resolve({});
          }
        );
    });

    return this.defaultAddress;
  }
}
