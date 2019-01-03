import {Component} from '@angular/core';
import {Events, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {DataGetterServiceProvider} from "../../providers/data-getter-service/data-getter-service";
import {AppGlobalProvider} from "../../providers/app-global/app-global";
import {AccessCardRequestFormPage} from "../access-card-request-form/access-card-request-form";

/**
 * Generated class for the AccessCardRequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-access-card-request',
  templateUrl: 'access-card-request.html',
})
export class AccessCardRequestPage {
  accessCardRequests: any = []
  queryText: any = '';
  canCreate: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dataGetterService: DataGetterServiceProvider,
              public loadingCtrl: LoadingController,
              public events: Events,
              public toastCtrl: ToastController,
              public appGlobal: AppGlobalProvider) {
    this.events.subscribe('reload:access-card', () => {
      this.refreshAccessCardRequestList(null);
    });

    this.initAccessCardRequest();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccessCardRequestPage');
  }

  ionViewDidEnter() {
    this.loadAccessCardRequests(null);
  }

  initAccessCardRequest() {
    this.accessCardRequests = [];
    this.canCreate = false;
  }

  refreshAccessCardRequestList(reference) {
    this.loadAccessCardRequests(reference);
  }

  loadAccessCardRequests(reference) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    if (reference === null) {
      loading.present();
    }

    this.dataGetterService.getAllAccessCardRequests().subscribe((data: any) => {
      console.log("Access Card Requests Loaded", data);

      if (data.success) {
        this.accessCardRequests = data.access_card_requests;
        this.canCreate = data.can_create;
      } else {
        this.initAccessCardRequest();
      }

      loading.dismiss();
      if (reference != null) {
        reference.complete();
      }
    }, error => {
      console.log(error);
      this.initAccessCardRequest();
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

  goToAccessCardRequestForm() {
    if (this.canCreate)
      this.navCtrl.push(AccessCardRequestFormPage);
    else {
      this.toastCtrl.create({
        message: "Can't have more than 1 open requests",
        duration: 3000
      }).present();
    }
  }
}
