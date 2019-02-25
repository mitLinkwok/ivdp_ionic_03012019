import { MaintenanceRequestPage } from './../maintenance-request/maintenance-request';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MaintenanceRequestFormPage } from "../maintenance-request-form/maintenance-request-form";

import { UserData } from './../../providers/user-data-ts';


/**
 * Generated class for the SearchbeneficiryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-searchbeneficiry',
  templateUrl: 'searchbeneficiry.html',
})
export class SearchbeneficiryPage {
  characterList: any;
  UserId;
  constructor(public navCtrl: NavController, public navParams: NavParams, public user: UserData) {
    this.characterList = [
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ];


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchbeneficiryPage');
  }


  getcharacterforsearch(ev: any) {
    this.navCtrl.push(MaintenanceRequestPage, {
      characterforSearch: ev
    })
  }

  goToMaintenanceRequestForm() {
    this.UserId = this.user.userData.id;
    this.navCtrl.push(MaintenanceRequestFormPage, {
      Surveyor: this.UserId
    });
  }
}
