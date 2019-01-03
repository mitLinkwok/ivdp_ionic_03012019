import {Component} from '@angular/core';
import {
  AlertController,
  Events,
  IonicPage, LoadingController,
  ModalController,
  NavController,
  NavParams,
  ToastController
} from 'ionic-angular';
import {DataSetterProvider} from "../../providers/data-setter/data-setter";
import {DataGetterServiceProvider} from "../../providers/data-getter-service/data-getter-service";
import {Vibration} from "@ionic-native/vibration";
import {AppGlobalProvider} from "../../providers/app-global/app-global";

/**
 * Generated class for the GuestRoomRequestShowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-guest-room-request-show',
  templateUrl: 'guest-room-request-show.html',
})
export class GuestRoomRequestShowPage {
  guestRoomRequest: any = {};
  id: any = '';
  room_flags: any = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dataGetterService: DataGetterServiceProvider,
              public loadingCtrl: LoadingController,
              public events: Events,
              public dataSetter: DataSetterProvider,
              public appGlobal: AppGlobalProvider,
              public alertCtrl: AlertController,
              public toastCtrl: ToastController,
              public modalCtrl: ModalController,
              public vibration: Vibration) {
    this.id = navParams.get('id');
    this.events.subscribe('reload:guest-room-request', (isNotification, id) => {
      this.id = id;
      this.refreshPage(null);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GuestRoomRequestShowPage');
  }

  ionViewDidEnter() {
    this.loadGuestRoomRequestDetails(null, this.id);
  }

  initGuestRoomRequest() {
    this.guestRoomRequest = {};
    this.id = '';
    this.room_flags = [];
  }

  refreshPage(event) {
    this.loadGuestRoomRequestDetails(event, this.id);
  }

  loadGuestRoomRequestDetails(reference, id) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    if (reference === null) {
      loading.present();
    }

    this.dataGetterService.getGuestRoomRequest(id)
      .subscribe((data: any) => {
        console.log("Guest Room Request Loaded", data);

        if (data.success) {
          this.guestRoomRequest = data.room_request;
          this.room_flags = [];
          this.getRequestTags();
        } else {
          this.initGuestRoomRequest();
          if (this.navCtrl.canGoBack()) {
            this.navCtrl.pop();
          }
          const toast = this.toastCtrl.create({
            message: data.message,
            duration: 3000
          });
          toast.present();
        }
        loading.dismiss();
        if (reference != null) {
          reference.complete();
        }
      }, err => {
        console.log(err);
        this.initGuestRoomRequest();
        const toast = this.toastCtrl.create({
          message: this.appGlobal.ServerError,
          duration: 3000
        });
        toast.present();
        loading.dismiss();
        if (reference != null) {
          reference.complete();
        }
        if (this.navCtrl.canGoBack()) {
          this.navCtrl.pop();
        }
      });
  }

  getRequestTags() {
    if (this.guestRoomRequest.single_lady)
      this.room_flags.push('Single Lady');

    if (this.guestRoomRequest.single_bed)
      this.room_flags.push('Single Bed');

    if (this.guestRoomRequest.food)
      this.room_flags.push('Food');
  }
}
