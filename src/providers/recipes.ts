import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Auth } from './auth';
import 'rxjs/add/operator/map';

@Injectable()
export class Recipes {
  key = 'd3a6083e2d9b5bda21c675545f08db0d';
  loading: any;
  constructor(public http: Http, public authService: Auth) {}

  loadRecipes() {
    return new Promise((resolve, reject) => {
      this.http.get(`http://food2fork.com/api/search?key=${this.key}`)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });

  }

  searchRecipes(searchTerm) {
    return new Promise((resolve, reject) => {
      this.http.get(`http://food2fork.com/api/search?key=${this.key}&q=${searchTerm}`)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}