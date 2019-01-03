import {Component} from '@angular/core';
import {Events, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {DataSetterProvider} from "../../providers/data-setter/data-setter";
import {DataGetterServiceProvider} from "../../providers/data-getter-service/data-getter-service";
import {Vibration} from "@ionic-native/vibration";
import {AppGlobalProvider} from "../../providers/app-global/app-global";
import {ToastController} from "ionic-angular/components/toast/toast-controller";
import {NgForm} from "@angular/forms";
import * as moment from "moment";

/**
 * Generated class for the GuestRoomRequestFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-guest-room-request-form',
  templateUrl: 'guest-room-request-form.html',
})
export class GuestRoomRequestFormPage {
  guestRoomRequest: any = {};
  rooms: any = [];
  minDate: string = "";

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dataGetterService: DataGetterServiceProvider,
              public dataSetterService: DataSetterProvider,
              public toastCtrl: ToastController,
              public events: Events,
              public loadingCtrl: LoadingController,
              public appGlobal: AppGlobalProvider,
              public vibration: Vibration) {
    this.initGuestRoomRequest();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GuestRoomRequestFormPage');
  }

  ionViewDidEnter() {
    this.loadRoomList();
    this.minDate = moment().format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z';
  }

  initGuestRoomRequest() {
    this.guestRoomRequest = {
      address: '',
      check_in: '',
      check_out: '',
      number_of_guest: 1,
      single_lady: false,
      single_bed: false,
      food: false,
      detail: ''
    };
    this.rooms = [];
    this.minDate = "";
  }

  loadRoomList() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.dataGetterService.getRoomAddresses().subscribe((data: any) => {
      console.log("Guest Room Loaded", data);

      if (data.success) {
        this.events.publish('reload:guest-room-request');
        this.rooms = data.room_addresses;
      } else {
        this.initGuestRoomRequest();
        const toast = this.toastCtrl.create({
          message: this.appGlobal.ServerError,
          duration: 3000
        });
        toast.present();
        loading.dismiss();
        this.navCtrl.pop();
      }

      loading.dismiss();
    }, error => {
      console.log(error);
      this.initGuestRoomRequest();
      const toast = this.toastCtrl.create({
        message: this.appGlobal.ServerError,
        duration: 3000
      });
      toast.present();
      loading.dismiss();
    });
  }

  submitGuestRoomRequest(data) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.dataSetterService.createGuestRoomRequest(data).subscribe((data: any) => {
      console.log("Create Guest Room Response", data);
      loading.dismiss();

      if (data.success) {
        const toast = this.toastCtrl.create({
          message: data.message,
          duration: 3000
        });
        toast.present();
        if (this.navCtrl.canGoBack) {
          this.navCtrl.pop();
        }
        this.vibration.vibrate(this.appGlobal.vibrationTimings);
      } else {
        const toast = this.toastCtrl.create({
          message: data.errors,
          duration: 3000
        });
        toast.present();
      }
    }, error => {
      loading.dismiss();
      console.log(error);
      const toast = this.toastCtrl.create({
        message: this.appGlobal.ServerError,
        duration: 3000
      });
      toast.present();
    });
  }

  logForm(form: NgForm) {
    if(form.value.detail.trim().length > 0)
      this.submitGuestRoomRequest(form.value);
    else
      alert("Details can't be blank");
  }
}
