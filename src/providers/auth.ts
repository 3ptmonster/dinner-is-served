import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';

@Injectable()
export class Auth {
  public token: any;

  constructor(public http: Http, public storage: Storage) {}

  checkAuthentication(){

    return new Promise((resolve, reject) => {

        //Load token if exists
        this.storage.get('token').then((value) => {

            this.token = value;

            let headers = new Headers();
            headers.append('Authorization', this.token);

            this.http.get('http://50.30.233.55:8080/api/auth/protected', {headers: headers})
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });

        });

    });

  } //end checkAuthentication

  createAccount(details){

    return new Promise((resolve, reject) => {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.post('http://50.30.233.55:8080/api/auth/register', JSON.stringify(details), {headers: headers})
          .subscribe(res => {

            let data = res.json();
            this.token = data.token;
            this.storage.set('token', data.token);
            resolve(data);

          }, (err) => {
            reject(err);
          });

    });

  } //end create

  login(credentials){

    return new Promise((resolve, reject) => {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.post('http://50.30.233.55:8080/api/auth/login', JSON.stringify(credentials), {headers: headers})
          .subscribe(res => {

            let data = res.json();
            this.token = data.token;
            this.storage.set('token', data.token);
            resolve(data);

            resolve(res.json());
          }, (err) => {
            reject(err);
          });

    });

  } //end login

  logout(){
    this.storage.set('token', '');
  } //end logout
}
