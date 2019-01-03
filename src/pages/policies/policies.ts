import { AppGlobalProvider } from './../../providers/app-global/app-global';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import {DataGetterServiceProvider} from "../../providers/data-getter-service/data-getter-service";
import {PoliciesShowPage} from "../policies-show/policies-show";


/**
 * Generated class for the PoliciesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-policies',
  templateUrl: 'policies.html',
})
export class PoliciesPage {
  public pages :any = [];
   StaticPage :any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public dataGetterService: DataGetterServiceProvider,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public appGlobal: AppGlobalProvider) {

  }

  loadPolicies(ref) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    if (ref === null) {
      loading.present();
    }

    this.dataGetterService.getStaticPages()
      .subscribe((data: any) => {
        console.log("Static Pages Loaded", data);

        if (data.success) {
          this.pages = data.StaticPage;
        } else {
          this.pages = [];
        }

        loading.dismiss();
        if (ref != null) {
          ref.complete();
        }
      }, err => {
        console.log(err);
        this.pages = [];
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

  ionViewDidEnter(){
    console.log('ionViewDidEnter PoliciesPage');
    this.loadPolicies(null);
  }

  itemTapped(id){
   console.log(id)
    this.navCtrl.push(PoliciesShowPage,{
      id:id,
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PoliciesPage');
  }

}
