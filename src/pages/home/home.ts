import { SearchBeneficiryPage } from './../search-beneficiry/search-beneficiry';
import { Observable } from 'rxjs/Observable';
import { DatabaseProvider } from './../../providers/database/database';


import { AppGlobalProvider } from './../../providers/app-global/app-global';
import * as _ from 'lodash';
import { DataSetterProvider } from './../../providers/data-setter/data-setter';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { Network } from '@ionic-native/network';
import { Component } from '@angular/core';
import { IonicPage, NavController, Events, LoadingController, ViewController } from 'ionic-angular';
import { DataGetterServiceProvider } from "../../providers/data-getter-service/data-getter-service";

import { Storage } from '@ionic/storage';
import { IntroPage } from "../intro/intro";

import 'rxjs/add/observable/interval';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public notification;
  databaseobj: any;
  public notifications: any = [];
  totalbeneficiary: any;
  totalcount_benificiary: number = 0;
  totalsurvey: any = "0";
  totalhousehold: number = 0;
  total_count: string;
  sync_status: string = "Sync is going on ...";
  live_dataLoade: number = 0;
  loading: any;
  descending: boolean = false;
  order: number = -1;
  field: string = 'updated_at';
  syncount: number = 0;
  synkmsg: any;
  constructor(public navCtrl: NavController, public network: Network,
    public dataGetterService: DataGetterServiceProvider,
    public toastCtrl: ToastController, public dataSetterService: DataSetterProvider,
    public loadingCtrl: LoadingController,
    public appGlobal: AppGlobalProvider,
    public storage: Storage,
    public events: Events,
    public sqldatabasegetter: DatabaseProvider
  ) {

    this.storage.set('kycCansync', true);
    this.totalbeneficiary = this.sqldatabasegetter.total_beneficialy;
    this.totalsurvey = this.sqldatabasegetter.total_surveys;
    this.totalcount_benificiary = this.appGlobal.total;
    this.events.subscribe('reload:page-home', () => {
      this.reloadfunction();
    });

    this.loading = this.loadingCtrl.create({
      content: 'Sync is going on ... ',
    });

  }
  reloadfunction() {
    // console.log("Home   reloadfunction");
    // this.dataget();
  }

 
  ionViewWillLeave() {
    this.stopSyncLoop();
  }

  
  stopSyncLoop() {
    clearInterval(this.synkmsg);
    this.synkmsg = null;
  }
  ionViewDidLoad() {
 

    this.storage.get('intro-done').then(done => {
      if (!done) {
        this.storage.set('intro-done', true);
        this.navCtrl.setRoot(IntroPage);
        this.loadincontrol();

      }
    });
    console.log("Home   ionViewDidLoad")
  }

  refreshHomepage(ev) {
    this.totalbeneficiary = this.getTotalcount();

    this.totalsurvey = this.getTotalsurvey();
    this.getTotalhh();
    //this.totalhousehold = this.sqldatabasegetter.total_Hh;
    this.live_dataLoade = Math.round(this.appGlobal.actual * (100) / this.appGlobal.total);
    //console.log("Home  refreshHomepage")
    setTimeout(() => {
      console.log('Async operation has ended');
      ev.complete();
    }, 2000);
  }


  // ccallBack(t) {
  //   t.loadincontrol();
  // }

  loadincontrol() {
    
    this.synkmsg = setInterval(() => {

    this.totalbeneficiary = this.getTotalcount();
    this.totalsurvey = this.getTotalsurvey();
    this.totalhousehold = this.sqldatabasegetter.total_Hh;
    this.live_dataLoade = Math.round(this.appGlobal.actual * (100) / this.appGlobal.total);
    // if (this.totalbeneficiary == this.appGlobal.total && this.appGlobal.actual == this.appGlobal.total && this.appGlobal.total_househ == this.totalhousehold) {
      // console.log("total Beneficiary " + this.totalbeneficiary);
      // console.log("appglobal Beneficiary " + this.appGlobal.total);
      this.syncount  =  this.syncount + 1;
      //console.log("syncount:- "+ this.syncount);
      if(this.syncount >= 300){
        this.loading.dismiss();
        this.stopSyncLoop();
      }
      else {
           this.loading.present();
      }
    // if (this.totalbeneficiary == this.appGlobal.total) {
      
    //   this.sync_status = "Sync Done"
    //   this.loading.dismiss();
    //   this.stopSyncLoop();
    // } else {
    //   this.loading.present();
    // }
    this.live_dataLoade = Math.round(this.appGlobal.insertcountbene * (100) / this.appGlobal.total);
    // console.log(this.appGlobal.insertcountbene + this.appGlobal.total)
    // if (this.appGlobal.insertcountbene == this.appGlobal.total) {
    //   this.sync_status = "Sync Done"
    //   this.loading.dismiss();
    // } else {
    //  this.loading.present();
    // }

  }, 1000);

  }

  getTotalcount() {

    if (this.appGlobal.insertcountbene >0 ){
      this.appGlobal.actual  = this.appGlobal.insertcountbene;
    }else {

    this.sqldatabasegetter.dbobject.executeSql("select * from beneficiaries", {})
      .then((data) => {
        console.log('bene length ' + data.rows.length)
       this.appGlobal.actual  = data.rows.length;
       this.appGlobal.total  = data.rows.length;
        return data.rows.length;
      }, (error) => {
        console.log(JSON.stringify(error))
      })
    } 
  }
  getTotalsurvey() {

    this.sqldatabasegetter.dbobject.executeSql("select * from  survey", {})
      .then((data) => {
        this.totalsurvey= data.rows.length;
      }, (error) => {

        console.log(JSON.stringify(error))
      })
  }
  getTotalhh() {

    
    this.sqldatabasegetter.dbobject.executeSql("select * from households", {})
      .then((data) => {
      //alert(data.rows.length);
        this.appGlobal.total_househ = data.rows.length;
       
      }, (error) => {
        console.log(JSON.stringify(error))
      })
  }
}
