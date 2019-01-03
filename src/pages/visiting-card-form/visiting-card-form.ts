import {Component} from '@angular/core';
import {Events, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {UserData} from "../../providers/user-data-ts";
import {Vibration} from "@ionic-native/vibration";
import {DataSetterProvider} from "../../providers/data-setter/data-setter";
import {ToastController} from "ionic-angular/components/toast/toast-controller";
import {AppGlobalProvider} from "../../providers/app-global/app-global";
import {DataGetterServiceProvider} from "../../providers/data-getter-service/data-getter-service";
import {NgForm} from "@angular/forms";

/**
 * Generated class for the VisitingCardFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-visiting-card-form',
  templateUrl: 'visiting-card-form.html',
})
export class VisitingCardFormPage {
  visitingCard: any = {};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public user: UserData,
              public dataGetterService: DataGetterServiceProvider,
              public dataSetterService: DataSetterProvider,
              public toastCtrl: ToastController,
              public events: Events,
              public loadingCtrl: LoadingController,
              public appGlobal: AppGlobalProvider,
              public vibration: Vibration) {
    this.initVisitingCard()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VisitingCardFormPage');
  }

  ionViewDidEnter() {
    this.loadCompanyDetails();
  }

  initVisitingCard() {
    this.visitingCard = {
      company_name: "",
      company_address: "",
      name: "",
      designation: "",
      email: "",
      mobile_no: "",
      landline: ""
    };
  }

  loadCompanyDetails() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.dataGetterService.getCompanyDetails().subscribe((data: any) => {
      console.log("Guest Lunch Loaded", data);

      if (data.success) {
        this.visitingCard.company_name = data.data.company_name;
        this.visitingCard.company_address = data.data.company_address;
        this.visitingCard.name = this.user.userData.name;
        this.visitingCard.designation = this.user.userData.designation;
        this.visitingCard.email = this.user.userData.email;
        this.visitingCard.mobile_no = this.user.userData.mobile;
        this.visitingCard.landline = this.user.userData.extension;
      } else {
        this.initVisitingCard();
        const toast = this.toastCtrl.create({
          message: this.appGlobal.ServerError,
          duration: 3000
        });
        toast.present();
        loading.dismiss();
        this.navCtrl.pop();
      }

      loading.dismiss();
    }, error => {
      console.log(error);
      this.initVisitingCard();
      const toast = this.toastCtrl.create({
        message: this.appGlobal.ServerError,
        duration: 3000
      });
      toast.present();
      loading.dismiss();
    });
  }

  submitVisitingCardRequest(data) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.dataSetterService.createVisitingCard(data).subscribe((data: any) => {
      console.log("Create Visiting Card Response", data);
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

  logForm(form: NgForm) {
    if(form.value.name.trim().length > 0 )
      this.submitVisitingCardRequest(form.value);
    else
      alert("Name cannot be blank!");
  }
}
