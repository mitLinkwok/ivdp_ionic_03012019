import {Component} from '@angular/core';
import {Events, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Vibration} from "@ionic-native/vibration";
import {DataSetterProvider} from "../../providers/data-setter/data-setter";
import {ToastController} from "ionic-angular/components/toast/toast-controller";
import {DataGetterServiceProvider} from "../../providers/data-getter-service/data-getter-service";
import {AppGlobalProvider} from "../../providers/app-global/app-global";
import {NgForm} from "@angular/forms";

/**
 * Generated class for the StationeryRequestFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stationery-request-form',
  templateUrl: 'stationery-request-form.html',
})
export class StationeryRequestFormPage {
  stationeryRequest: any = {};
  stationeries: any = [];
  locations:any = [];
  loading :any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dataGetterService: DataGetterServiceProvider,
              public dataSetterService: DataSetterProvider,
              public toastCtrl: ToastController,
              public events: Events,
              public loadingCtrl: LoadingController,
              public appGlobal: AppGlobalProvider,
              public vibration: Vibration) {
    this.initStationeryRequest()
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StationeryRequestFormPage');
  }

  ionViewDidEnter() {

    this.loading.present();


    this.loadStationeryList("Corporate");
  }

  initStationeryRequest() {
    this.stationeryRequest = {
      stationery_id: 0,
      requested_quantity: 0,
      location:"",
      details:""

    };
    this.stationeries = [];
  }


  getStationeryList(l){
    this.loadStationeryList(l)
  }

  loadLocations(){
    this.dataGetterService.getMRLocations().subscribe((data: any) => {
      console.log("Assets Loaded", data);

      if (data.success) {
        this.locations = data.locations;
        this.loading.dismiss();
      } else {

        const toast = this.toastCtrl.create({
          message: this.appGlobal.ServerError,
          duration: 3000
        });
        toast.present();

        this.navCtrl.pop();
      }


    }, error => {
      console.log(error);

      const toast = this.toastCtrl.create({
        message: this.appGlobal.ServerError,
        duration: 3000
      });
      toast.present();

    });
  }

  loadStationeryList(l) {



    this.dataGetterService.getStationeries(l).subscribe((data: any) => {
      console.log("Stationeries Loaded", data);

      if (data.success) {
        this.stationeries = data.stationeries;
        this.loadLocations();
      } else {
        this.initStationeryRequest();
        const toast = this.toastCtrl.create({
          message: this.appGlobal.ServerError,
          duration: 3000
        });
        toast.present();


        this.navCtrl.pop();
      }


    }, error => {
      console.log(error);
      this.initStationeryRequest();
      const toast = this.toastCtrl.create({
        message: this.appGlobal.ServerError,
        duration: 3000
      });
      toast.present();
      this.loading.dismiss();
    });
  }

  submitStationeryRequest(data) {
    if(data.location.length == 0  ){

      const toast = this.toastCtrl.create({
        message: "Select a location",
        duration: 3000
      });
      toast.present();
      return false
    }
    if(data.stationery_id ==0 || data.requested_quantity ==0 ){

      const toast = this.toastCtrl.create({
        message: "Select a category and ensure required quantity is more than 0",
        duration: 3000
      });
      toast.present();
      return false
    }

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.dataSetterService.createStationeryRequest(data).subscribe((data: any) => {
      console.log("Create Stationery Response", data);
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
    console.log(form.value);
    this.submitStationeryRequest(form.value);
  }
}
