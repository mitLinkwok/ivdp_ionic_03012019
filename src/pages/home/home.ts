import { Observable } from 'rxjs/Observable';
import { DatabaseProvider } from './../../providers/database/database';


import { AppGlobalProvider } from './../../providers/app-global/app-global';
import * as _ from 'lodash';
import { DataSetterProvider } from './../../providers/data-setter/data-setter';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { Network } from '@ionic-native/network';
import { Component } from '@angular/core';
import { IonicPage, NavController, Events, LoadingController } from 'ionic-angular';
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
  totalbeneficiary: any
  totalcount_benificiary: string
  totalsurvey: string
  total_count: string
  sync_status: string
  live_dataLoade: any
  sub: any
  actual: any
  total: any
  aactual_hhc: any


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
    public sqldatabasegetter: DatabaseProvider,

  ) {

    this.totalbeneficiary = this.sqldatabasegetter.total_beneficialy;
    this.totalsurvey = this.sqldatabasegetter.total_surveys;
    this.totalcount_benificiary = this.appGlobal.totalcount_bene;
    this.sync_status = this.appGlobal.sync_status
    this.actual = this.appGlobal.actual;
    this.total = this.appGlobal.total;
    this.aactual_hhc = this.appGlobal.actual_hh;

    storage.get('total_count_beneficiary').then((val) => {
      this.totalcount_benificiary = val;

    });
    if (this.totalbeneficiary == this.totalcount_benificiary) {
      this.sync_status = "Sync Done"

    } else {
      this.sync_status = "Sync is going ... "
    }
    this.events.subscribe('reload:page-home', () => {
      this.loadtotalbeneficialy();
      this.reloadfunction();

    });

  }
  reloadfunction() {
    this.sqldatabasegetter.getTotalcount(this.ccallBack, this);
    this.sqldatabasegetter.getTotalsurvey(this.ccallBack, this);
  }

  ccallBack(t) {
    t.loadtotalbeneficialy();
    t.loading_livedata();
  }




  ionViewDidLoad() {
    this.loadtotalbeneficialy()
    this.loading_livedata()

    this.storage.get('intro-done').then(done => {
      if (!done) {
        this.storage.set('intro-done', true);
        this.navCtrl.setRoot(IntroPage);
      }
    });

  }

  ionViewDidEnter() {
    this.loadtotalbeneficialy()
    this.loading_livedata()
  }

  refreshHomepage(ev) {

    this.dataget();
    setTimeout(() => {
      console.log('Async operation has ended');
      this.loadtotalbeneficialy()
      this.loading_livedata()
      ev.complete();
    }, 2000);
  }
  dataget() {
    this.sqldatabasegetter.getTotalcount(this.ccallBack, this);
    this.sqldatabasegetter.getTotalsurvey(this.ccallBack, this);
  }

  loadtotalbeneficialy() {

    this.totalbeneficiary = this.sqldatabasegetter.total_beneficialy;
    this.totalsurvey = this.sqldatabasegetter.total_surveys;
    this.storage.get('total_count_beneficiary').then((val) => {
      this.totalcount_benificiary = val;
    });

    if (this.totalbeneficiary == this.totalcount_benificiary) {
      this.sync_status = "Sync Done"
      // this.sub.unsubscribe();
    } else {
      this.sync_status = "Sync is going ... "
    }

  }

  loading_livedata() {


    this.live_dataLoade = Math.round(this.appGlobal.actual * (100) / this.appGlobal.total);

    // this.storage.get('total_count_beneficiary').then((val) => {
    //   this.totalcount_benificiary = val;


    // });



  }




}
