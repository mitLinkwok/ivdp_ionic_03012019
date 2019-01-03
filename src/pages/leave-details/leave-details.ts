import { AppGlobalProvider } from './../../providers/app-global/app-global';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { DataGetterServiceProvider } from '../../providers/data-getter-service/data-getter-service';

/**
 * Generated class for the LeaveDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-leave-details',
  templateUrl: 'leave-details.html',
})
export class LeaveDetailsPage {
  public holidays = [];
  public leaves = [];
  public lts = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,public dataGetterService: DataGetterServiceProvider,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public appGlobal: AppGlobalProvider) {
    this.lts = "lt";
  }

  ionViewDidEnter(){
    this.getHolidays();
    this.getLeaves();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeaveDetailsPage');

  }

  getHolidays(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    this.dataGetterService.loadHolidays()
      .subscribe((data: any) => {
        console.log("Show Holidays Loaded", data);

        if (data.success) {
          let holidays = data.holidays;
          if (Object.keys(holidays).length == 0) {
            this.holidays = [];
          } else {
            this.holidays = holidays;
          }
        } else {
          this.holidays = [];
        }

        loading.dismiss();
      }, err => {
        console.log(err);
        this.holidays = [];
        const toast = this.toastCtrl.create({
          message: this.appGlobal.ServerError,
          duration: 3000
        });
        toast.present();
        loading.dismiss();
      });
  }

  getLeaves(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    this.dataGetterService.loadLeaves()
      .subscribe((data: any) => {
        console.log("Show Leaves Loaded", data);

        if (data.success) {
          let leaves = data.data;
          if (Object.keys(leaves).length == 0) {
            this.leaves = [];
          } else {
            this.leaves = leaves;
          }
        } else {
          this.leaves = [];
        }

        loading.dismiss();
      }, err => {
        console.log(err.error);
        this.leaves = [];
        if(err.error.message){
          if (err.error.message === 'No User Available'){
            const toast = this.toastCtrl.create({
              message: "You are not registered with Orange HRMS, Please contact HR.",
              duration: 3000
            });
            toast.present();
          } else {
            const toast = this.toastCtrl.create({
              message: err.error.message,
              duration: 3000
            });
            toast.present();
          }
        } else {
          const toast = this.toastCtrl.create({
            message: this.appGlobal.ServerError,
            duration: 3000
          });
          toast.present();
        }
        loading.dismiss();
      });
  }



}
