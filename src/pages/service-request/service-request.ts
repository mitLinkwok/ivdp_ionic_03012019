import { AppGlobalProvider } from './../../providers/app-global/app-global';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController, ToastController } from 'ionic-angular';

import { DataGetterServiceProvider } from '../../providers/data-getter-service/data-getter-service';
import {ServiceRequestFormPage} from "../service-request-form/service-request-form";
import {ServiceRequestShowPage} from "../service-request-show/service-request-show";
import * as moment from 'moment';


/**
 * Generated class for the ServiceRequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-service-request',
  templateUrl: 'service-request.html',

})
export class ServiceRequestPage {
  public servicerequests: any = [];
  // servicerequests: Array<{uuid: string,content:string,resolver:string,state:string}>;
  public service_requests: any;
  public search:any;
  queryText: any = '';
  temp ="pending";

  descending: boolean = false;
  order: number = -1;
  field: string = 'updated_at';

  loadSR(ref){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    if (ref === null) {
      loading.present();
    }

    this.dataGetterService.getServiceRequests()
      .subscribe((data: any) => {
        console.log("Service Requests Loaded", data);

        if (data.success) {
          this.servicerequests = data.service_requests;
        } else {
          this.servicerequests = [];
        }

        loading.dismiss();
        if (ref != null) {
          ref.complete();
        }
      }, err => {
        console.log(err);
        this.servicerequests = [];
        const toast = this.toastCtrl.create({
          message: this.appGlobal.ServerError,
          duration: 3000
        });
        toast.present();
        loading.dismiss();
        if (ref != null) {
          ref.complete();
        }
      });
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,public dataGetterService: DataGetterServiceProvider,
    public events:Events,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public appGlobal: AppGlobalProvider) {
    this.events.subscribe('reload:serviceRequest', () => {
      this.refreshSRList(null);
    });
  }

  sort(){
    this.descending = !this.descending;
    this.order = this.descending ? 1 : -1;
  }

  ionViewDidEnter(){
    this.loadSR(null);
  }
  goToSRForm() {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    this.navCtrl.push(ServiceRequestFormPage);
  }

  goToSR(id){
     console.log(id)
     this.navCtrl.push(ServiceRequestShowPage,{
       id:id,
    });
  }

  refreshSRList(ev){
     this.loadSR(ev);

  }


  // onInput(event){
  //
  //
  // }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiceRequestPage');
  }

  getLastActivity(updated_at) {
    return moment(updated_at).format("MMMM DD,YYYY hh:mm A");
  }
}
