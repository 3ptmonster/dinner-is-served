import { Component } from '@angular/core';

import { FavoritesPage } from '../favorites/favorites';
import { AccountPage } from '../account/account';
import { HomePage } from '../home/home';

import { SuperTabsController } from 'ionic2-super-tabs';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root: any = HomePage;
  tab2Root: any = FavoritesPage;
  tab3Root: any = AccountPage;

  constructor(private superTabsCtrl: SuperTabsController) {

  }
}
