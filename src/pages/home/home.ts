import { Component } from "@angular/core";
import { NavController, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { Recipes } from '../../providers/recipes';
import { Auth } from '../../providers/auth';
import { LoginPage } from '../login/login';
import { RecipeDetailPage } from '../recipe-detail/recipe-detail';

@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {
  recipes: any;
  loading: any;

  constructor(public navCtrl: NavController, public recipeService: Recipes, public modalCtrl: ModalController,
    public alertCtrl: AlertController, public authService: Auth, public loadingCtrl: LoadingController) {}

  doThis(_recipe) {
    this.navCtrl.push(RecipeDetailPage, _recipe);
  }

  ionViewDidLoad(){

    this.showLoader();

    //Check if already authenticated
    this.authService.checkAuthentication().then((res) => {
        console.log("Already authorized");
        this.loading.dismiss();
        this.recipeService.loadRecipes().then((response) => {
          let trimmedRes = "";
          for (let key in response) {
              if (key === "recipes") {
                trimmedRes = response[key].slice(0,10);
              }
          }
          this.recipes = trimmedRes;
        });
    }, (err) => {
        console.log("Not already authorized");
        this.loading.dismiss();
        this.navCtrl.setRoot(LoginPage);
    });

  }

  findRecipes(){

    let prompt = this.alertCtrl.create({
      title: 'Recipe Search',
      message: 'Search by ingredient or recipe name:',
      inputs: [
        {
          name: 'title'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Search',
          handler: recipe => {

                if(recipe){

                    this.showLoader();

                    this.recipeService.searchRecipes(recipe.title).then((result) => {
                        this.loading.dismiss();
                        let trimmedRes = "";
                        for (let key in result) {
                            if (key === "recipes") {
                              trimmedRes = result[key].slice(0,10);
                            }
                        }
                        this.recipes = trimmedRes;
                    }, (err) => {
                        this.loading.dismiss();
                        console.log("not allowed");
                    });

                }


          }
        }
      ]
    });

    prompt.present();

  }

  deleteRecipe(recipe){
    this.showLoader();
    this.loading.dismiss();

    //Remove locally
    let index = this.recipes.indexOf(recipe);
    if(index > -1){
        this.recipes.splice(index, 1);
    }
    console.log("recipe deleted");
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });
    this.loading.present();
  }

  logout(){
    this.authService.logout();
    this.navCtrl.setRoot(LoginPage);
  }

}