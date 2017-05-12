import { Component } from "@angular/core";
import { NavController, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { Recipes } from '../../providers/recipes';
import { Auth } from '../../providers/auth';
import { LoginPage } from '../login/login';

@Component({
  selector: 'home',
  templateUrl: 'home.html'
})
export class HomePage {

  recipes: any;
  loading: any;

  constructor(public navCtrl: NavController, public recipeService: Recipes, public modalCtrl: ModalController,
    public alertCtrl: AlertController, public authService: Auth, public loadingCtrl: LoadingController) {

  }

  ionViewDidLoad(){

    this.recipeService.getRecipes().then((data) => {
          this.recipes = data;
    }, (err) => {
        console.log("not allowed");
    });

  }

  addRecipe(){

    let prompt = this.alertCtrl.create({
      title: 'Add recipe',
      message: 'Describe your recipe below:',
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
          text: 'Save',
          handler: recipe => {

                if(recipe){

                    this.showLoader();

                    this.recipeService.createRecipe(recipe).then((result) => {
                        this.loading.dismiss();
                        this.recipes = result;
                        console.log("recipe created");
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

    //Remove from database
    this.recipeService.deleteRecipe(recipe._id).then((result) => {

      this.loading.dismiss();

      //Remove locally
        let index = this.recipes.indexOf(recipe);

        if(index > -1){
            this.recipes.splice(index, 1);
        }
        console.log("recipe deleted");
    }, (err) => {
      this.loading.dismiss();
        console.log("not allowed");
    });
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