import { AppGlobalProvider } from './../../providers/app-global/app-global';
import * as _ from 'lodash';
import { DataSetterProvider } from './../../providers/data-setter/data-setter';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { Network } from '@ionic-native/network';
import { Component } from '@angular/core';
import { IonicPage, NavController, ItemSliding, LoadingController } from 'ionic-angular';
import {DataGetterServiceProvider} from "../../providers/data-getter-service/data-getter-service";
import {IdeaShowPage} from "../idea-show/idea-show";
import { ServiceRequestShowPage } from './../service-request-show/service-request-show';
import {GrievanceShowPage} from "../grievance-show/grievance-show";
import {ArticleShowPage} from "../article-show/article-show";
import { Storage } from '@ionic/storage';
import {IntroPage} from "../intro/intro";
import {GuestLunchPage} from "../guest-lunch/guest-lunch";
import {VisitingCardPage} from "../visiting-card/visiting-card";
import {MaintenanceRequestPage} from "../maintenance-request/maintenance-request";
import {GuestRoomRequestShowPage} from "../guest-room-request-show/guest-room-request-show";
import {StationeryRequestPage} from "../stationery-request/stationery-request";
import {AccessCardRequestPage} from "../access-card-request/access-card-request";


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public notification;
  public notifications:any = [];

  descending: boolean = false;
  order: number = -1;
  field: string = 'updated_at';

  constructor(public navCtrl: NavController, public network:Network,public dataGetterService: DataGetterServiceProvider,
    public toastCtrl: ToastController, public dataSetterService:DataSetterProvider,
    public loadingCtrl: LoadingController,
    public appGlobal: AppGlobalProvider,public storage: Storage ) {

  }

  sort(){
    this.descending = !this.descending;
    this.order = this.descending ? 1 : -1;
  }

  loadNotifications(ref) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    if (ref === null) {
      loading.present();
    }

    this.dataGetterService.getAllNotifications()
      .subscribe((data: any) => {
        console.log("Notifications Loaded", data);

        if (data.success) {
          this.notifications = data.notification;
        } else {
          this.notifications = [];
        }

        loading.dismiss();
        if (ref != null) {
          ref.complete();
        }
      }, err => {
        console.log(err);
        this.notifications = [];
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

  goToPage(id,association){
    console.log(this.notification)
    switch(association){
      case "idea":{
        this.navCtrl.push(IdeaShowPage,{id:id})
        break;
      }
      case "Service Request":{
        this.navCtrl.push(ServiceRequestShowPage,{id:id})
        break;
      }
      case "grievance":{
        this.navCtrl.push(GrievanceShowPage,{id:id})
        break;
      }
      case "cms":{
        this.navCtrl.push(ArticleShowPage,{id: id})
        break;
      }
      case "guest_lunch_requests":{
        this.navCtrl.push(GuestLunchPage,{id: id});
        break;
      }
      case "visiting_card_requests":{
        this.navCtrl.push(VisitingCardPage,{id: id});
        break;
      }
      case "maintenance_requests":{
        this.navCtrl.push(MaintenanceRequestPage,{id: id});
        break;
      }
      case "room_requests":{
        this.navCtrl.push(GuestRoomRequestShowPage,{id: id});
        break;
      }

      case "stationery_requests":{
        this.navCtrl.push(StationeryRequestPage,{id: id});
        break;
      }


      case "access_card_requests":{
        this.navCtrl.push(AccessCardRequestPage,{id: id});
        break;
      }





      default :{
        console.log("default")
      }
    }
  }
  ionViewDidLoad() {


    this.storage.get('intro-done').then(done => {
      if (!done) {
        this.storage.set('intro-done', true);
        this.navCtrl.setRoot(IntroPage);
      }
    });
  }

  ionViewDidEnter(){
    this.loadNotifications(null)
  }

  refreshPage(ev) {
    this.loadNotifications(ev);
  }

  onSnooze(slidingItem: ItemSliding, notification:any){
    slidingItem.close();

    const request = {
      id: notification.id
    };

    console.log("Snooze Notification Request", request);

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    this.dataSetterService.snoozeNotification(request)
      .subscribe((data: any) => {
        console.log("Snooze Notification Response", data);

        loading.dismiss();

        if (data.success) {
          _.pull(this.notifications, notification);
          const toast = this.toastCtrl.create({
            message: data.message,
            duration: 3000
          });
          toast.present();
          // this.vibration.vibrate(this.appGlobal.vibrationTimings);
        } else {
          const toast = this.toastCtrl.create({
            message: data.message,
            duration: 3000
          });
          toast.present();
        }

      }, err => {
        loading.dismiss();
        console.log(err);
        const toast = this.toastCtrl.create({
          message: this.appGlobal.ServerError,
          duration: 3000
        });
        toast.present();
      });
  }

  onDismiss(slidingItem: ItemSliding, notification: any){
    slidingItem.close();

    const request = {
      id: notification.id
    };

    console.log("Mark as Read Notification Request", request);

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    this.dataSetterService.markReadNotification(request)
      .subscribe((data: any) => {
        console.log("Mark as Read Notification Response", data);

        loading.dismiss();

        if (data.success) {
          _.pull(this.notifications, notification);
          // this.vibration.vibrate(this.appGlobal.vibrationTimings);
        } else {
          const toast = this.toastCtrl.create({
            message: data.message,
            duration: 3000
          });
          toast.present();
        }

      }, err => {
        loading.dismiss();
        console.log(err);
        const toast = this.toastCtrl.create({
          message: this.appGlobal.ServerError,
          duration: 3000
        });
        toast.present();
      });
  }
}
