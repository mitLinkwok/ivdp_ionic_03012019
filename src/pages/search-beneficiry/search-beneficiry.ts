import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MaintenanceRequestPage } from './../maintenance-request/maintenance-request';
import { NgForm } from "@angular/forms"

import { BarcodeScanner } from '@ionic-native/barcode-scanner';

/**
 * Generated class for the SearchBeneficiryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-beneficiry',
  templateUrl: 'search-beneficiry.html',
})
export class SearchBeneficiryPage {
  search = {
    search_name: ''
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public barcodeScanner: BarcodeScanner) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchBeneficiryPage');
  }

  searchdata(form: NgForm) {

    this.navCtrl.push(MaintenanceRequestPage, {
      characterforSearch: form.value.search_name
    })
  }

  scanQR() {
    this.barcodeScanner.scan().then((barcodeData) => {
    this.search.search_name=barcodeData.text
    }, (err) => {
      alert(err);
    });
  }

}
