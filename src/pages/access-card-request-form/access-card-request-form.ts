import {Component} from '@angular/core';
import {Events, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {DataSetterProvider} from "../../providers/data-setter/data-setter";
import {Vibration} from "@ionic-native/vibration";
import {AppGlobalProvider} from "../../providers/app-global/app-global";
import {ToastController} from "ionic-angular/components/toast/toast-controller";
import {NgForm} from "@angular/forms";

/**
 * Generated class for the AccessCardRequestFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-access-card-request-form',
  templateUrl: 'access-card-request-form.html',
})
export class AccessCardRequestFormPage {
  accessCardRequest = {
    justification: ''
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dataSetterService: DataSetterProvider,
              public toastCtrl: ToastController,
              public events: Events,
              public loadingCtrl: LoadingController,
              public appGlobal: AppGlobalProvider,
              public vibration: Vibration) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccessCardRequestFormPage');
  }

  submitAccessCardRequest(data) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.dataSetterService.createAccessCardRequest(data).subscribe((data: any) => {
      console.log("Create Access Card Response", data);
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
    
    if(form.value.justification.trim().length > 0)
      this.submitAccessCardRequest(form.value);
    else
      alert("Justification cannot be blank!");
    
  }
}
