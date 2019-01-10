import { UserData } from './../../providers/user-data-ts';
import {Component} from '@angular/core';
import {Events, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {DataGetterServiceProvider} from "../../providers/data-getter-service/data-getter-service";
import {AppGlobalProvider} from "../../providers/app-global/app-global";
import {MaintenanceRequestFormPage} from "../maintenance-request-form/maintenance-request-form";


/**
 * Generated class for the MaintenanceRequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-maintenance-request',
  templateUrl: 'maintenance-request.html',
})
export class MaintenanceRequestPage {
  maintenanceRequests: any = [];
  queryText: any = '';
  UserId;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dataGetterService: DataGetterServiceProvider,
              public loadingCtrl: LoadingController,
              public events: Events,
              public user: UserData,
              public toastCtrl: ToastController,
              public appGlobal: AppGlobalProvider) {
    this.events.subscribe('reload:maintenance-request', (isNotification, id) => {
      this.refreshMaintenanceRequestList(null);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MaintenanceRequestPage');
  }

  ionViewDidEnter() {
    this.loadMaintenanceRequests(null);
  }

  refreshMaintenanceRequestList(reference) {
    this.loadMaintenanceRequests(reference);
  }

  loadMaintenanceRequests(reference) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    if (reference === null) {
      loading.present();
    }

    this.dataGetterService.getAllMaintenanceRequests().subscribe((data: any) => {
      // console.log("Stationery Requests Loaded", data);
     

      let a=true
      if (data.success || a ) {
        this.maintenanceRequests = data.data;
      } else {
        this.maintenanceRequests = [];
      }

      loading.dismiss();
      if (reference != null) {
        reference.complete();
      }
    }, error => {
      console.log(error);
      this.maintenanceRequests = [];
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

  goToMaintenanceRequestForm() {
    this.UserId= this.user.userData.id;
    this.navCtrl.push(MaintenanceRequestFormPage,{
      Surveyor:this.UserId 
    });
   
  }

  EditUserProfile(id){
   console.log("UserID :- "+ this.UserId + "  ID ::-" + id );
    
  }
}
