import { Component } from '@angular/core';
import {DataGetterServiceProvider} from "../../providers/data-getter-service/data-getter-service";
import {DataSetterProvider} from "../../providers/data-setter/data-setter";
import {Events, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {AppGlobalProvider} from "../../providers/app-global/app-global";


/**
 * Generated class for the CanteenFacilityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-canteen-facility',
  templateUrl: 'canteen-facility.html',
})
export class CanteenFacilityPage {
	ctrl :any;
	dates: any=[];
	categories: any =[];
	locked_data: any =[]
	disabled_data: any =[]

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public dataGetterService: DataGetterServiceProvider,public loadingCtrl: LoadingController,public toastCtrl: ToastController,public appGlobal: AppGlobalProvider,public dataSetterService: DataSetterProvider
            ) {

    let d = new Date();
    d.setDate(d.getDate() + 1);
    this.dates = [new Date(),d];

    this.loadLunchCategories();
    this.events.subscribe('reload:canteen-facility', (isNotification, id) => {
      this.loadLunchCategories();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CanteenFacilityPage');
    this.loadLunchCategories();
  }


  formatDate(date) {
  let monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  let day = date.getDate();
  let monthIndex = date.getMonth();
  let year = date.getFullYear();


  return day + ' ' + monthNames[monthIndex] + ' ' + year;
}


 customFormatDate(date) {

  let day = date.getDate();
  let monthIndex = date.getMonth();
  let year = date.getFullYear();


  return day + '-' + (monthIndex+1) + '-' + year;
}





loadLunchCategories(){
	let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
	loading.present();
	   this.dataGetterService.getLunchCategories().subscribe((data: any) => {

      if (data.success) {

        this.categories = data.categories;
        this.locked_data = data.locked_data;
        this.disabled_data = data.disabled_data;
        loading.dismiss();

      }



    }, error => {
      console.log(error);

      const toast = this.toastCtrl.create({
        message: this.appGlobal.ServerError,
        duration: 3000
      });
      toast.present();


    });
}


registerCanteenFacility(e,v){

	console.log(v);
	    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    let data= {};
    data['c'] = v.split("_")[0];
	data['d'] = v.split("_")[1];
	data['checked'] = e.checked
    this.dataSetterService.recordCanteenFacilityUsage(data).subscribe((data: any) => {

      loading.dismiss();

      if (data.success) {
        const toast = this.toastCtrl.create({
          message: data.message,
          duration: 3000
        });
        toast.present();


      } else {
        const toast = this.toastCtrl.create({
          message: data.errors,
          duration: 3000
        });
        toast.present();
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

getLockedDataBoolean(c,d){

	if (this.locked_data.indexOf(c+"_"+d) >= 0)
		return true;
	return false;


}

getDisabledDataBoolean(c,d){

	if (this.disabled_data.indexOf(c+"_"+d) >= 0)
		return true;
	return false;


}


}
