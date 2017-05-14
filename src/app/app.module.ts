import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { TabsPage } from '../pages/tabs/tabs';
import { FavoritesPage } from '../pages/favorites/favorites';
import { AccountPage } from '../pages/account/account';
import { RecipeDetailPage } from '../pages/recipe-detail/recipe-detail';

import { Auth } from './../providers/auth';
import { Recipes } from './../providers/recipes';
import { UserInfo } from './../providers/user-info';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { SuperTabsModule } from 'ionic2-super-tabs';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    TabsPage,
    FavoritesPage,
    AccountPage,
    RecipeDetailPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    BrowserModule,
    HttpModule,
    SuperTabsModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    TabsPage,
    FavoritesPage,
    AccountPage,
    RecipeDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Recipes,
    Auth,
    UserInfo,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
