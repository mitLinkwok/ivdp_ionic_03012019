import {Component} from '@angular/core';
import {Events, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {DataGetterServiceProvider} from "../../providers/data-getter-service/data-getter-service";
import {AppGlobalProvider} from "../../providers/app-global/app-global";
import {GuestLunchFormPage} from "../guest-lunch-form/guest-lunch-form";

/**
 * Generated class for the GuestLunchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-guest-lunch',
  templateUrl: 'guest-lunch.html',
})
export class GuestLunchPage {
  guestLunches: any = [];
  queryText: any = '';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dataGetterService: DataGetterServiceProvider,
              public loadingCtrl: LoadingController,
              public events: Events,
              public toastCtrl: ToastController,
              public appGlobal: AppGlobalProvider) {

    this.events.subscribe('reload:guest-lunch', (isNotification, id) => {
      this.refreshGuestLunchList(null);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GuestLunchPage');
  }

  ionViewDidEnter() {
    this.loadGuestLunches(null);
  }

  refreshGuestLunchList(reference) {
    this.loadGuestLunches(reference);
  }

  loadGuestLunches(reference) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    if (reference === null) {
      loading.present();
    }

    this.dataGetterService.getAllGuestLunches().subscribe((data: any) => {
      console.log("Guest Lunch Loaded", data);

      if (data.success) {
        this.guestLunches = data.guest_lunch_requests;
      } else {
        this.guestLunches = [];
      }

      loading.dismiss();
      if (reference != null) {
        reference.complete();
      }
    }, error => {
      console.log(error);
      this.guestLunches = [];
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

  goToGuestLunchForm() {
    this.navCtrl.push(GuestLunchFormPage);
  }
}
