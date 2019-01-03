import {Component} from '@angular/core';
import {Events, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {DataGetterServiceProvider} from "../../providers/data-getter-service/data-getter-service";
import {AppGlobalProvider} from "../../providers/app-global/app-global";
import {GuestRoomRequestFormPage} from "../guest-room-request-form/guest-room-request-form";
import {GuestRoomRequestShowPage} from "../guest-room-request-show/guest-room-request-show";

/**
 * Generated class for the GuestRoomRequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-guest-room-request',
  templateUrl: 'guest-room-request.html',
})
export class GuestRoomRequestPage {
  guestRoomRequests: any = [];
  queryText: any = '';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dataGetterService: DataGetterServiceProvider,
              public loadingCtrl: LoadingController,
              public events: Events,
              public toastCtrl: ToastController,
              public appGlobal: AppGlobalProvider) {
    this.events.subscribe('reload:guest-room-request', () => {
      this.refreshGuestRoomRequestList(null);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GuestRoomRequestPage');
    this.loadGuestRoomRequests(null);
  }

  ionViewDidEnter() {}

  refreshGuestRoomRequestList(reference) {
    this.loadGuestRoomRequests(reference);
  }

  loadGuestRoomRequests(reference) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    if (reference === null) {
      loading.present();
    }

    this.dataGetterService.getAllGuestRoomRequests().subscribe((data: any) => {
      console.log("Guest Room Requests Loaded", data);

      if (data.success) {
        this.guestRoomRequests = data.room_requests;
      } else {
        this.guestRoomRequests = [];
      }

      loading.dismiss();
      if (reference != null) {
        reference.complete();
      }
    }, error => {
      console.log(error);
      this.guestRoomRequests = [];
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

  goToGuestRoomRequest(uid) {
    this.navCtrl.push(GuestRoomRequestShowPage, {
      id: uid,
    });
  }

  goToGuestRoomRequestForm() {
    this.navCtrl.push(GuestRoomRequestFormPage);
  }
}
