import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Events, LoadingController, ToastController} from 'ionic-angular';
import {DataGetterServiceProvider} from "../../providers/data-getter-service/data-getter-service";
import {AppGlobalProvider} from "../../providers/app-global/app-global";


/**
 * Generated class for the ParakhDashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-parakh-dashboard',
  templateUrl: 'parakh-dashboard.html',
})
export class ParakhDashboardPage {
  
    maintenanceRequests: any = [];
  queryText: any = '';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dataGetterService: DataGetterServiceProvider,
              public loadingCtrl: LoadingController,
              public events: Events,
              public toastCtrl: ToastController,
              public appGlobal: AppGlobalProvider) {
                
                 this.events.subscribe('reload:maintenance-request', (isNotification, id) => {
      this.refreshMaintenanceRequestList(null);
    });
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParakhDashboardPage');
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

    this.dataGetterService.getMyAwards().subscribe((data: any) => {
      console.log("Stationery Requests Loaded", data);

      if (data.success) {
        console.log(data.awards);
        this.maintenanceRequests = data.awards;
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
    console.log("OK");
    // this.navCtrl.push(MaintenanceRequestFormPage);
  }

}
