import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-recipe-detail',
  templateUrl: 'recipe-detail.html',
})
export class RecipeDetailPage {
  recipe: any;
  saveIcon: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.recipe = navParams.data;
  }

  saveThis(_recipe) {
      console.log(this.saveIcon);
  }
}
