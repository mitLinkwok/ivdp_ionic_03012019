import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import {AppGlobalProvider} from "../../providers/app-global/app-global";
import {ToastController} from "ionic-angular/components/toast/toast-controller";
import {DataSetterProvider} from "../../providers/data-setter/data-setter";
import {DataGetterServiceProvider} from "../../providers/data-getter-service/data-getter-service";
import {Vibration} from "@ionic-native/vibration";

/**
 * Generated class for the SyncPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sync',
  templateUrl: 'sync.html',
})
export class SyncPage {

  pending_beneficiaries: any;	
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController,
              public appGlobal: AppGlobalProvider,public dataGetterService: DataGetterServiceProvider,
              public dataSetterService: DataSetterProvider,
              public toastCtrl: ToastController) {
  	this.pending_beneficiaries = this.appGlobal.benefeciaries.length;


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SyncPage');
  }
  syncBeneficiaries(){
  	
    let b_success = []
    let m = this;
    this.appGlobal.benefeciaries.forEach(function(b,index){
    	let loading = m.loadingCtrl.create({
		      content: 'Syncing Beneficiaries ' + index.toString() + " of " + m.appGlobal.benefeciaries.length
			    });
		    loading.present();
    	m.dataSetterService.createMaintenanceRequest(b).subscribe((data: any) => {
    		
    		if(data){
    			b_success.push(data)
    			loading.dismiss();
    		}
    		else{
    			alert(data.errors);
    			loading.dismiss();
    		}
    	})
    })
  }

}
