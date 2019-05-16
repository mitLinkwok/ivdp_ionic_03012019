import { DataSetterProvider } from './../../providers/data-setter/data-setter';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';

/**
 * Generated class for the LogoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: DataSetterProvider, public sqldatabasegetter: DatabaseProvider) {
    alert("Logout page constructor call");
    this.sqldatabasegetter.deleteDb();


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogoutPage');
  }

}
