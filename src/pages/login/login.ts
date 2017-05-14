import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { Auth } from '../../providers/auth';
import { UserInfo } from '../../providers/user-info';

import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class LoginPage {

    email: string;
    password: string;
    loading: any;

    constructor(public navCtrl: NavController, public authService: Auth, public loadingCtrl: LoadingController, public userInfo: UserInfo) {}

    ionViewDidLoad() {

        this.showLoader();

        //Check if already authenticated
        this.authService.checkAuthentication().then((res) => {
            console.log("Already authorized");
            this.loading.dismiss();
            this.navCtrl.setRoot(TabsPage);
        }, (err) => {
            console.log("Not already authorized");
            this.loading.dismiss();
        });

    } //end ionViewDidLoad

    login(){

        this.showLoader();

        let credentials = {
            email: this.email,
            password: this.password
        };

        this.authService.login(credentials).then((result) => {
            this.loading.dismiss();
            this.userInfo.storeEmail(this.email);
            this.navCtrl.setRoot(TabsPage);
        }, (err) => {
            this.loading.dismiss();
            console.log(err);
        });

    } //end login

    launchSignup(){
        this.navCtrl.push(RegisterPage);
    } //end launchSignup

    showLoader(){

        this.loading = this.loadingCtrl.create({
            content: 'Authenticating...'
        });

        this.loading.present();

    } //end showLoader

}