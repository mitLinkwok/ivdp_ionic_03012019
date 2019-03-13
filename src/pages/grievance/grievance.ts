import { DatabaseProvider } from './../../providers/database/database';
import { AppGlobalProvider } from './../../providers/app-global/app-global';

import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, Events, ModalController, ToastController } from 'ionic-angular';
import { DataGetterServiceProvider } from '../../providers/data-getter-service/data-getter-service';
import { GrievanceFormPage } from "../grievance-form/grievance-form";
import { UserData } from './../../providers/user-data-ts';
import * as _ from "lodash";
import * as moment from 'moment';


/**
 * Generated class for the GrievancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-grievance',
  templateUrl: 'grievance.html',
})
export class GrievancePage {
  grievance_m: any = [];
  public grievances: any;
  queryText: any = '';
  grievanceWhoseList: any = [];
  excludeWhoseGrievances: any = ["mine"];
  descending: boolean = false;
  order: number = -1;
  field: string = 'updated_at';
  UserId;
  beneficiary_id: string;
  autoincrement_id: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public dataGetterService: DataGetterServiceProvider,
    public loadingCtrl: LoadingController,
    public events: Events,
    public user: UserData,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public appGlobal: AppGlobalProvider,
    public sqldatabasegetter: DatabaseProvider) {

    this.beneficiary_id = navParams.get('beneficiary_id');
    this.autoincrement_id = navParams.get('auto_increment_id');
    this.sqldatabasegetter.getKycsdata(this.beneficiary_id, this.autoincrement_id, this.ccallBack, this);
    this.events.subscribe('reload:page-grievance', () => {
      this.loadGrievances(null)
    });
  }
  dorefresher(ev) {
    setTimeout(() => {
      this.loadGrievances(ev);
      ev.complete();
    }, 1000);
  }

  ionViewDidEnter() {
    this.loadGrievances(null);
    this.sqldatabasegetter.getKycsdata(this.beneficiary_id, this.autoincrement_id, this.ccallBack, this);
  }

  ionViewDidLoad() {
    this.loadGrievances(null);
    console.log('ionViewDidLoad GrievancePage');
  }
  ccallBack(t) {
    t.loadGrievances(null)
  }


  loadGrievances(ref) {

    if (this.sqldatabasegetter.offlineCasekycs.length > 0) {
      this.grievance_m = [];
      for (let i = 0; i <= this.sqldatabasegetter.offlineCasekycs.length; i++) {
        if (this.sqldatabasegetter.offlineCasekycs[i] != undefined) {
          console.log(this.sqldatabasegetter.offlineCasekycs[i]);
          this.grievance_m.push(
            this.sqldatabasegetter.offlineCasekycs[i]
          );
        }
      }

      if (ref != null) {
        ref.complete();
      }


    } else {
      this.grievance_m = [];
      console.log("No data i array")

      if (ref != null) {
        ref.complete();
      }
    }
  }




  goToSRForm() {
    this.UserId = this.user.userData.id;
    this.navCtrl.push(GrievanceFormPage, {
      Surveyor: this.UserId,
      beneficiary_id: this.beneficiary_id,
      auto_increment_id: this.autoincrement_id
    });
  }


  getLastActivity(updated_at) {
    return moment(updated_at).format("MMMM DD,YYYY hh:mm A");
  }
}
