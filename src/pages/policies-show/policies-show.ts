import { AppGlobalProvider } from './../../providers/app-global/app-global';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import {DataGetterServiceProvider} from "../../providers/data-getter-service/data-getter-service";

/**
 * Generated class for the PoliciesShowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-policies-show',
  templateUrl: 'policies-show.html',
})
export class PoliciesShowPage {
  public initalPage :any = {
    page_name:'',
    html_content:''
  };
  // public page: any = this.initalPage;
  public page:any = this.page;
  static_page :any;
  id :string

  constructor(public navCtrl: NavController, public navParams: NavParams,public dataGetterService: DataGetterServiceProvider,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public appGlobal: AppGlobalProvider) {
    this.id=this.navParams.get('id')
    this.loadStaticPage(null,this.id)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PoliciesShowPage');
  }

  loadStaticPage(ref, id) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    if (ref === null) {
      loading.present();
    }

    this.dataGetterService.getStaticPage(id)
      .subscribe((data: any) => {
        console.log("Static Page Details Loaded", data);

        if (data.success) {
          this.page = data.static_page;
        } else {
          // this.page = this.initalPage;
          if (this.navCtrl.canGoBack()) {
            this.navCtrl.pop();
          }
          const toast = this.toastCtrl.create({
            message: data.message,
            duration: 3000
          });
          toast.present();
        }

        loading.dismiss();
        if (ref != null) {
          ref.complete();
        }
      }, err => {
        console.log(err);
        // this.page = this.initalPage;
        const toast = this.toastCtrl.create({
          message: this.appGlobal.ServerError,
          duration: 3000
        });
        toast.present();
        loading.dismiss();
        if (ref != null) {
          ref.complete();
        }
        if (this.navCtrl.canGoBack()) {
          this.navCtrl.pop();
        }
      });
  }

}
