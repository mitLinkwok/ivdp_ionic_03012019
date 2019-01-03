import {Component} from '@angular/core';
import {Events, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {DataGetterServiceProvider} from "../../providers/data-getter-service/data-getter-service";
import {AppGlobalProvider} from "../../providers/app-global/app-global";
import {StationeryRequestFormPage} from "../stationery-request-form/stationery-request-form";

/**
 * Generated class for the StationeryRequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stationery-request',
  templateUrl: 'stationery-request.html',
})

export class StationeryRequestPage {
  stationeryRequests: any = [];
  queryText: any = '';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dataGetterService: DataGetterServiceProvider,
              public loadingCtrl: LoadingController,
              public events: Events,
              public toastCtrl: ToastController,
              public appGlobal: AppGlobalProvider) {
    this.events.subscribe('reload:stationery-request', (isNotification, id) => {
      this.refreshStationeryRequestList(null);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StationeryRequestPage');
  }

  ionViewDidEnter() {
    this.loadStationeryRequests(null);
  }

  refreshStationeryRequestList(reference) {
    this.loadStationeryRequests(reference);
  }

  loadStationeryRequests(reference) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    if (reference === null) {
      loading.present();
    }

    this.dataGetterService.getAllStationeryRequests().subscribe((data: any) => {
      console.log("Stationery Requests Loaded", data);

      if (data.success) {
        this.stationeryRequests = data.stationery_requests;
      } else {
        this.stationeryRequests = [];
      }

      loading.dismiss();
      if (reference != null) {
        reference.complete();
      }
    }, error => {
      console.log(error);
      this.stationeryRequests = [];
      const toast = this.toastCtrl.create({
        message: this.appGlobal.ServerError,
        duration: 3000
      });
      toast.present();
      loading.dismiss();
      if (reference != null) {
        reference.complete();
      }
    });
  }

  goToStationeryRequestForm() {
    this.navCtrl.push(StationeryRequestFormPage);
  }
}
