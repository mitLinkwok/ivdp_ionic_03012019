import {Component} from '@angular/core';
import {Events, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Vibration} from "@ionic-native/vibration";
import {DataSetterProvider} from "../../providers/data-setter/data-setter";

import {ToastController} from "ionic-angular/components/toast/toast-controller";
import {AppGlobalProvider} from "../../providers/app-global/app-global";
import {NgForm} from "@angular/forms";
import * as moment from "moment";
import {DataGetterServiceProvider} from "../../providers/data-getter-service/data-getter-service";

/**
 * Generated class for the GuestLunchFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-guest-lunch-form',
  templateUrl: 'guest-lunch-form.html',
})
export class GuestLunchFormPage {
  guestLunch = {
    no_of_people: 1,
    date_of_lunch: "",
    lunch_type:"",
    lunch_location:"",
    lunch_category:"",
    remarks:"",
    food_item_masters:[]

  };
  public lunchTypes: any;
  public lunchLocations: any;
  minDate: string = "";
  categories:any =[];
  displayCategories:any =false;
  listedCategories:any =[];
  todayDate:any = true;
  lunchToBeShown:any = true;
  dinnerToBeShown:any = true;
  breakfastToBeShown:any = true;
  toBeShown:any = {};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dataSetterService: DataSetterProvider,
              public toastCtrl: ToastController,
              public events: Events,
              public loadingCtrl: LoadingController,
              public appGlobal: AppGlobalProvider,
              public vibration: Vibration,
              public dataGetterService: DataGetterServiceProvider
              ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GuestLunchFormPage');
  }

  ionViewDidEnter() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.minDate = moment().format('YYYY-MM-DD');

    this.dataGetterService.getGuestLunchLocations().subscribe((data: any) => {
      console.log("Assets Loaded", data);

      if (data.success) {
        this.lunchLocations = data.locations;
        loading.dismiss();
      }


    }, error => {
      console.log(error);

      const toast = this.toastCtrl.create({
        message: this.appGlobal.ServerError,
        duration: 3000
      });
      toast.present();
      loading.dismiss();
    });

    this.dataGetterService.getGuestLunchTypes().subscribe((data: any) => {
      console.log("Assets Loaded", data);

      if (data.success) {
        this.lunchTypes = data.lunch_type;
        for(let i=0;i<this.lunchTypes.length;i++){
          this.guestLunch[this.lunchTypes[i][1]]=0;

        }

        // loading.dismiss();
      }


    }, error => {
      console.log(error);

      const toast = this.toastCtrl.create({
        message: this.appGlobal.ServerError,
        duration: 3000
      });
      toast.present();
      // loading.dismiss();
    });
    this.loadLunchCategories();



  }

  submitGuestLunchRequest(data) {
    let date = moment(this.guestLunch.date_of_lunch);
    let now = moment();
    if (date.isBefore(now,'day')){
      const toast = this.toastCtrl.create({
        message: "Select appropriate date",
        duration: 3000
      });
      toast.present();
      return false;

    }

    if(this.displayCategories && data.lunch_category > 0){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.dataSetterService.createGuestLunch(data).subscribe((data: any) => {
      console.log("Create Guest Lunch Response", data);
      loading.dismiss();

      if (data.success) {
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
        const toast = this.toastCtrl.create({
          message: data.message,
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
  else{
      const toast = this.toastCtrl.create({
        message: "Select atleast one category",
        duration: 3000
      });
      toast.present();
    }
  }

  logForm(form: NgForm) {
    console.log(form.value);
    this.submitGuestLunchRequest(form.value);
  }



  loadLunchCategories(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.dataGetterService.getLunchCategories().subscribe((data: any) => {

      if (data.success) {

        this.categories = data.categories;
        this.displayCategories = false;


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
  resetCategories(e){

    this.displayCategories =true;

    this.listedCategories = [];
    if (e=="Corporate")
      for (let i =0;i<this.categories.length;i++)
      {
        if (this.categories[i][0]=="Lunch" && this.lunchToBeShown)
        this.listedCategories.push(this.categories[i]);
      }
    else
      this.listedCategories = JSON.parse(JSON.stringify(this.categories));
  }
  resetAllCategories(){
    this.listedCategories = JSON.parse(JSON.stringify(this.categories));
  }
  resetCategoriesFromArg(e){

    this.displayCategories =true;

    // this.listedCategories = [];

      for (let i =0;i<this.categories.length;i++)
      {
        if (this.categories[i][0]==e)
          this.listedCategories.splice(i,1);
      }

  }


  performValidation(v){

    let time_for_dinner =  moment().set({hour:17,minute:30,second:0,millisecond:0});
    let time_for_lunch =  moment().set({hour:12,minute:30,second:0,millisecond:0});
    let time_for_breakfast =  moment().set({hour:21,minute:0,second:0,millisecond:0});
    this.displayCategories = false;
    if (v =="date"){
      this.guestLunch.lunch_location = "";
      this.guestLunch.lunch_category = "0";

    }
    if (v =="loc"){

      this.guestLunch.lunch_category = "0";

    }



    if (this.guestLunch.date_of_lunch.length > 0 && this.guestLunch.lunch_location.length > 0)
    {
      let date = moment(this.guestLunch.date_of_lunch);
      let now = moment();
      this.listedCategories = [];
      this.displayCategories = true;


      if (this.guestLunch.lunch_location=="Dahej")
      {
        //Breakfast
        if (!date.isSame(now, 'day')  && (moment() < time_for_breakfast)) {
          for (let i =0;i<this.categories.length;i++)
          {
            if (this.categories[i][0]=="Breakfast")
              this.listedCategories.push(this.categories[i]);
          }
        }
        if (!date.isSame(now, 'day')) {
          for (let i =0;i<this.categories.length;i++)
          {
            if (this.categories[i][0]=="Lunch")
              this.listedCategories.push(this.categories[i]);
          }
        }
        if (date.isSame(now, 'day') && (moment() < time_for_lunch )) {
          for (let i =0;i<this.categories.length;i++)
          {
            if (this.categories[i][0]=="Lunch")
              this.listedCategories.push(this.categories[i]);
          }
        }

        //Dinner
        if (!date.isSame(now, 'day')) {
          for (let i =0;i<this.categories.length;i++)
          {
            if (this.categories[i][0]=="Dinner")
              this.listedCategories.push(this.categories[i]);
          }
        }
        if (date.isSame(now, 'day') && (moment() < time_for_dinner )) {
          for (let i =0;i<this.categories.length;i++)
          {
            if (this.categories[i][0]=="Dinner")
              this.listedCategories.push(this.categories[i]);
          }
        }

      }
      else
      {
        if (this.guestLunch.lunch_location=="Corporate"){
          if (!date.isSame(now, 'day')) {
            for (let i =0;i<this.categories.length;i++)
            {
              if (this.categories[i][0]=="Lunch")
                this.listedCategories.push(this.categories[i]);
            }
          }
          if (date.isSame(now, 'day') && (moment() < time_for_lunch )) {
            for (let i =0;i<this.categories.length;i++)
            {
              if (this.categories[i][0]=="Lunch")
                this.listedCategories.push(this.categories[i]);
            }
          }
        }
        else {
          this.displayCategories = false
        }
      }
      }









  }


}
