import { GrievancePage } from './../grievance/grievance';
import { DBmaneger } from './../../providers/database/Dbmaneger';
import { DatabaseProvider } from './../../providers/database/database';
import { DataSetterProvider } from './../../providers/data-setter/data-setter';
import { UserData } from './../../providers/user-data-ts';
import { Component } from '@angular/core';
import { Events, IonicPage, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
import { DataGetterServiceProvider } from "../../providers/data-getter-service/data-getter-service";
import { AppGlobalProvider } from "../../providers/app-global/app-global";
import { MaintenanceRequestFormPage } from "../maintenance-request-form/maintenance-request-form";




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
    public appGlobal: AppGlobalProvider,
    public sqldatabasegetter: DatabaseProvider,
    public db: DBmaneger,
    public dataSetter: DataSetterProvider) {
     
    this.events.subscribe('reload:maintenance-request', (isNotification, id) => {
      this.refreshMaintenanceRequestList(null);
      
    });
    this.sqldatabasegetter.getbeneficiarydata();
   
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

    if (this.sqldatabasegetter.offlineCase.length > 0) {
      this.maintenanceRequests = [];

      for (let i = 0; i <= this.sqldatabasegetter.offlineCase.length; i++) {
        if (this.sqldatabasegetter.offlineCase[i] != undefined) {
          console.log(this.sqldatabasegetter.offlineCase[i]);
        
          this.maintenanceRequests.push(
         
            this.sqldatabasegetter.offlineCase[i]
          );
        }
      }
      loading.dismiss();
      if (reference != null) {
        reference.complete();
      }
     

    } else {
      this.maintenanceRequests = [];
      alert("No data i array")
      loading.dismiss();
      if (reference != null) {
        reference.complete();
      }
    }
}

  goToMaintenanceRequestForm() {
    this.UserId = this.user.userData.id;
    this.navCtrl.push(MaintenanceRequestFormPage, {
      Surveyor: this.UserId
    });

  }

  EditUserProfile(id) {
    console.log("UserID :- " + this.UserId + "  ID ::-" + id);
    this.navCtrl.push(GrievancePage,{
      beneficiary_id:id
    })

  }
}
