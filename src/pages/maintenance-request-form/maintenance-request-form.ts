import { DatabaseProvider } from './../../providers/database/database';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Events, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { DataSetterProvider } from "../../providers/data-setter/data-setter";
import { DataGetterServiceProvider } from "../../providers/data-getter-service/data-getter-service";
import { Vibration } from "@ionic-native/vibration";
import { AppGlobalProvider } from "../../providers/app-global/app-global";
import { ToastController } from "ionic-angular/components/toast/toast-controller";
import { NgForm } from "@angular/forms";


/**
 * Generated class for the MaintenanceRequestFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-maintenance-request-form',
  templateUrl: 'maintenance-request-form.html',
})
export class MaintenanceRequestFormPage {




  maintenanceRequest: any = {};
  Addbeneficialy: any = {};
  assets: any = [];
  locations: any = [];
  SurveyorID: string;
  responsData: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public dataGetterService: DataGetterServiceProvider,
    public dataSetterService: DataSetterProvider,
    public toastCtrl: ToastController,
    public events: Events,
    public loadingCtrl: LoadingController,
    public appGlobal: AppGlobalProvider,
    public sqldatabasegetter: DatabaseProvider,
    public vibration: Vibration) {
    this.SurveyorID = navParams.get('Surveyor');

    this.initMaintenanceRequest();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MaintenanceRequestFormPage');
  }

  ionViewDidEnter() {
    // this.loadAssetsList();
  }

  initMaintenanceRequest() {
    this.Addbeneficialy = {
      code: '',
      firstname: '',
      lastname: '',
      middlename: '',
      age: '',
      gender: '',
      date_of_birth: '',
      household_id: '',
      village_id: '',
      family_head_id: '',
      contact_number: '',
      whatsapp_number: '',
      user_id: this.SurveyorID,
      family_head_relation: ''

    }


    this.maintenanceRequest = {
      maintenanceasset_id: 0,
      detail: '',
      location: ''
    };
    this.assets = [];



  }


  submitMaintenanceRequest(data) {
    this.sqldatabasegetter.insertnewbeneficiary(data);
    if (this.sqldatabasegetter.isinsertstatus) {
      if (this.navCtrl.canGoBack) {
        this.navCtrl.pop();
      } else {
        const toast = this.toastCtrl.create({
          message: this.appGlobal.ServerError,
          duration: 3000
        });
        toast.present();
        // loading.dismiss();
      }
    }
  }





  // this.dataSetterService.createMaintenanceRequest(data).subscribe((data: any) => {
  //   console.log("Create Maintenance Response", data);
  //   loading.dismiss();


  //   if (data) {
  //     this.responsData=data.data;
  //     console.log("@@@@@$5555"+this.responsData);
  //     const toast = this.toastCtrl.create({
  //       message: data.message,
  //       duration: 3000
  //     });
  //     toast.present();
  //     if (this.navCtrl.canGoBack) {
  //       this.navCtrl.pop();
  //     }
  //     this.vibration.vibrate(this.appGlobal.vibrationTimings);
  //   } else {

  //     alert( data.errors);

  //   }
  // }, error => {
  //   loading.dismiss();
  //   console.log(error);
  //   const toast = this.toastCtrl.create({
  //     message: this.appGlobal.ServerError,
  //     duration: 3000
  //   });
  //   toast.present();
  // });


  logForm(form: NgForm) {
    this.submitMaintenanceRequest(form.value);
  }
  isReadonly() { return true; }

}