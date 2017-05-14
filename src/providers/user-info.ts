import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserInfo {
  email: any;
  constructor(public http: Http) {
    console.log('Hello UserInfo Provider');
  }

  storeEmail(_email) {
    this.email = _email;
    console.log(this.email);
  }

  getEmail() {
    return this.email;
  }

}
