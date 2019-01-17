import { HttpClient } from '@angular/common/http';
import {Component} from '@angular/core';
import {Events, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {DataSetterProvider} from "../../providers/data-setter/data-setter";
import {DataGetterServiceProvider} from "../../providers/data-getter-service/data-getter-service";
import {Vibration} from "@ionic-native/vibration";
import {AppGlobalProvider} from "../../providers/app-global/app-global";
import {ToastController} from "ionic-angular/components/toast/toast-controller";
import {NgForm} from "@angular/forms";


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
  beneficiary : any = {};
  assets: any = [];
  locations: any = [];
  SurveyorID : string;
  responsData: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dataGetterService: DataGetterServiceProvider,
              public dataSetterService: DataSetterProvider,
              public toastCtrl: ToastController,
              public events: Events,
              public loadingCtrl: LoadingController,
              public appGlobal: AppGlobalProvider,
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
    this.beneficiary = {
      code :'',
      firstname:'',
      lastname :'',
      middlename:'',
      age:'',
      gender:'',
      date_of_birth:'',
      household_id:'',
      village_id:'',
      family_head_id:'',
      contact_number:'',
      whatsapp_number:'',
      user_id:this.SurveyorID,
      family_head_relation:''

  }
 

    this.maintenanceRequest = {
      maintenanceasset_id: 0,
      detail: '',
      location:''
    };
    this.assets = [];



  }
  // loadAssetsList() {
  //   let loading = this.loadingCtrl.create({
  //     content: 'Please wait...'
  //   });
  //   loading.present();

  //   this.dataGetterService.getMaintenanceAssets().subscribe((data: any) => {
  //     console.log("Assets Loaded", data);

  //     if (data.success) {
  //       this.assets = data.maintenance_assets;
  //     } else {
  //       this.initMaintenanceRequest();
  //       const toast = this.toastCtrl.create({
  //         message: this.appGlobal.ServerError,
  //         duration: 3000
  //       });
  //       toast.present();
  //       loading.dismiss();
  //       this.navCtrl.pop();
  //     }

  //     loading.dismiss();
  //   }, error => {
  //     console.log(error);
  //     this.initMaintenanceRequest();
  //     const toast = this.toastCtrl.create({
  //       message: this.appGlobal.ServerError,
  //       duration: 3000
  //     });
  //     toast.present();
  //     loading.dismiss();
  //   });
  //   this.dataGetterService.getMRLocations().subscribe((data: any) => {
  //     console.log("Assets Loaded", data);

  //     if (data.success) {
  //       this.locations = data.locations;
  //     } else {

  //       const toast = this.toastCtrl.create({
  //         message: this.appGlobal.ServerError,
  //         duration: 3000
  //       });
  //       toast.present();
  //       loading.dismiss();
  //       this.navCtrl.pop();
  //     }


  //   }, error => {
  //     console.log(error);
  //     this.initMaintenanceRequest();
  //     const toast = this.toastCtrl.create({
  //       message: this.appGlobal.ServerError,
  //       duration: 3000
  //     });
  //     toast.present();
  //     loading.dismiss();
  //   });


  // }


  submitMaintenanceRequest(data) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.dataSetterService.createMaintenanceRequest(data).subscribe((data: any) => {
      console.log("Create Maintenance Response", data);
      loading.dismiss();
     

      if (data) {
        this.responsData=data.data;
        console.log("@@@@@$5555"+this.responsData);
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

        alert( data.errors);
        
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
    this.submitMaintenanceRequest(form.value);
  }
  isReadonly() {return true;}
}
