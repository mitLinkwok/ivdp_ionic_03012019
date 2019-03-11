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
  totalsurvey: string = "0";
  totalhousehold: number = 0;
  total_count: string;
  sync_status: string = "Sync is going on ...";
  live_dataLoade: number = 0;
  loading: any;
  descending: boolean = false;
  order: number = -1;
  field: string = 'updated_at';

  constructor(public navCtrl: NavController, public network: Network,
    public dataGetterService: DataGetterServiceProvider,
    public toastCtrl: ToastController, public dataSetterService: DataSetterProvider,
    public loadingCtrl: LoadingController,
    public appGlobal: AppGlobalProvider,
    public storage: Storage,
    public events: Events,
    public sqldatabasegetter: DatabaseProvider
  ) {
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
  ionVieionViewDidEnterwDidEnter() {

    console.log("Home  ionViewDidEnter")
    console.log("Home  ionViewDidEnter : " + this.totalcount_benificiary);
  }

  refreshHomepage(ev) {
    console.log("Home  refreshHomepage")
    setTimeout(() => {
      console.log('Async operation has ended');
      ev.complete();
    }, 2000);
  }

  dataget() {
    this.sqldatabasegetter.getTotalcount(this.ccallBack, this);
    this.sqldatabasegetter.getTotalsurvey(this.ccallBack, this);
    this.sqldatabasegetter.getTotalhh(this.ccallBack, this);
    console.log("Home dataget");
  }

  ccallBack(t) {
    t.loadincontrol();
  }

  loadincontrol() {
    this.totalbeneficiary = this.getTotalcount(this.ccallBack, this);
    this.totalsurvey = this.sqldatabasegetter.total_surveys;
    this.totalhousehold = this.sqldatabasegetter.total_Hh;
    this.live_dataLoade = Math.round(this.appGlobal.actual * (100) / this.appGlobal.total);
    if (this.totalbeneficiary == this.appGlobal.total && this.appGlobal.actual == this.appGlobal.total && this.appGlobal.total_househ == this.totalhousehold) {
      this.sync_status = "Sync Done"
      this.loading.dismiss();
    } else {
      this.loading.present();
    }
    this.live_dataLoade = Math.round(this.appGlobal.insertcountbene * (100) / this.appGlobal.total);
    // console.log(this.appGlobal.insertcountbene + this.appGlobal.total)
    // if (this.appGlobal.insertcountbene == this.appGlobal.total) {
    //   this.sync_status = "Sync Done"
    //   this.loading.dismiss();
    // } else {
    //  this.loading.present();
    // }
  }

  getTotalcount(cb, t) {
    this.sqldatabasegetter.dbobject.executeSql("select * from beneficiaries", {})
      .then((data) => {
        console.log('bene length ' + data.rows.length)
        cb(t)
        return data.rows.length;
      }, (error) => {
        console.log(JSON.stringify(error))
      })
  }
}
