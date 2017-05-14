import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserInfo } from '../../providers/user-info';

@Component({
  selector: 'account',
  templateUrl: 'account.html'
})
export class AccountPage {
  email: any;
  constructor(public navCtrl: NavController, public userInfo: UserInfo) {}

  ionViewDidLoad() {
    this.email = this.userInfo.getEmail();
    console.log(this.email);
  }

}
