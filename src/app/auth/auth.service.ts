
import { Injectable } from '@angular/core';
// import decode from 'jwt-decode';
import {tokenNotExpired} from 'angular2-jwt';


@Injectable()
export class AuthService {

  constructor() {
    localStorage.setItem('token', 'jzq52EtB5twkabRqsCgp');
  }

  public getToken(): string {
    if (localStorage.getItem('token')){
      return localStorage.getItem('token');
    }
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    return true;
  }

}
