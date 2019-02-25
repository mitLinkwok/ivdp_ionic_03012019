
import { DBmaneger } from './../../providers/database/Dbmaneger';
import { DatabaseProvider } from './../../providers/database/database';
import { DataSetterProvider } from './../../providers/data-setter/data-setter';
import { UserData } from './../../providers/user-data-ts';
import { Component } from '@angular/core';
import { Events, IonicPage, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
import { DataGetterServiceProvider } from "../../providers/data-getter-service/data-getter-service";
import { AppGlobalProvider } from "../../providers/app-global/app-global";
import { MaintenanceRequestFormPage } from "../maintenance-request-form/maintenance-request-form";
import { CallNumber } from '@ionic-native/call-number';
import { BeneficiaryProfilePage } from '../beneficiary-profile/beneficiary-profile';


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
  characterforSearch: any
  counter = 0
  total_data: any

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
    public dataSetter: DataSetterProvider,
    private callNumber: CallNumber) {

    this.characterforSearch = navParams.get('characterforSearch');
    if (this.characterforSearch == null && this.characterforSearch == undefined) {
      this.sqldatabasegetter.getbeneficiarydata(null, this.ccallBack, this);
    } else {
      this.sqldatabasegetter.showbeneficirybysearch(this.characterforSearch, this.ccallBack, this);
    }

    this.events.subscribe('reload:page-maintenance-request', () => {
      this.maintenanceRequests = []
      this.loadMaintenanceRequests(null);
      alert("constructor  page ref")
    });

  }
  refreshMaintenanceRequestList(reference) {
    if (this.characterforSearch == null && this.characterforSearch == undefined) {
      this.sqldatabasegetter.getbeneficiarydata(null, this.ccallBack, this);
    } else {
      this.maintenanceRequests = [];
      this.sqldatabasegetter.showbeneficirybysearch(this.characterforSearch, this.ccallBack, this);
    }
    setTimeout(() => {
      console.log('Async operation has ended');
      this.loadMaintenanceRequests(null);
      reference.complete();
    }, 2000);
  }
  datareload(rf) {
    this.loadMaintenanceRequests(rf);
  }
  ionViewDidLoad() {
    this.maintenanceRequests = []
    this.loadMaintenanceRequests(null);
    console.log('ionViewDidLoad MaintenanceRequestPage');
  }
  ionViewDidEnter() {
    this.refreshMaintenanceRequestList(null)
  }
  ccallBack(t) {
    t.loadMaintenanceRequests(null)
  }

  loadMaintenanceRequests(reference) {
    // let loading = this.loadingCtrl.create({
    //   content: 'Please wait...'
    // });
    // if (reference === null) {
    //   loading.present();
    // }
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
      //loading.dismiss();
      this.total_data = this.maintenanceRequests.length
      if (reference != null) {
        reference.complete();
      }
    } else {
      this.maintenanceRequests = [];
      console.log("No data i array")
      //loading.dismiss();
      if (reference != null) {
        reference.complete();
      }
    }

  }
  EditUserProfile(server_id, id, code) {
    this.navCtrl.push(BeneficiaryProfilePage, {
      beneficiary_id: server_id,
      user_id: this.UserId,
      auto_increment_id: id
    });
  }
  call(num) {
    this.callNumber.callNumber(num, true)
  }
  doInfinite(e): Promise<any> {
    this.datareloadforcounter(this.ccallBack, this);
    console.log("Begin async operation");
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
  }
  datareloadforcounter(ca, t) {
    if (this.characterforSearch == null && this.characterforSearch == undefined) {
      this.sqldatabasegetter.beneficiarypaggination(this.counter++, this.ccallBack, this);
    }
    else {
      this.sqldatabasegetter.showbeneficirybysearch(this.characterforSearch, this.ccallBack, this);
    }
    ca(t)
  }

}
