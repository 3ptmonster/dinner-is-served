import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';

@Component({
  selector: 'login-page',
  templateUrl: 'login-page.html'
})
export class LoginPage {

    email: string;
    password: string;
    loading: any;

    constructor(public navCtrl: NavController, public authService: Auth, public loadingCtrl: LoadingController) {

    }

    ionViewDidLoad() {

        this.showLoader();

        //Check if already authenticated
        this.authService.checkAuthentication().then((res) => {
            console.log("Already authorized");
            this.loading.dismiss();
            this.navCtrl.setRoot(HomePage);
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
            console.log(result);
            this.navCtrl.setRoot(HomePage);
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