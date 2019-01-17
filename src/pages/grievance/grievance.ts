import { DatabaseProvider } from './../../providers/database/database';
import { AppGlobalProvider } from './../../providers/app-global/app-global';
import { GrievanceFilterPage } from './../grievance-filter/grievance-filter';
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

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public dataGetterService: DataGetterServiceProvider,
    public loadingCtrl: LoadingController,
    public events: Events,
    public user: UserData,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public appGlobal: AppGlobalProvider,
    public sqldatabasegetter: DatabaseProvider) {

    this.events.subscribe('reload:grievance', () => {
      this.refreshSRList(null);
    });
    this.sqldatabasegetter.getKycsdata();
  }

  sort() {
    this.descending = !this.descending;
    this.order = this.descending ? 1 : -1;
  }

  loadGrievances(ref) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    if (ref === null) {
      loading.present();
    }
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
      loading.dismiss();
      if (ref != null) {
        ref.complete();
      }


    } else {
      this.grievance_m = [];
      alert("No data i array")
      loading.dismiss();
      if (ref != null) {
        ref.complete();
      }
    }
  }

  ionViewDidEnter() {
    this.loadGrievances(null);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GrievancePage');
  }

  refreshSRList(ev) {
    this.loadGrievances(ev);
  }

  goToSRForm() {
    this.UserId = this.user.userData.id;
    this.navCtrl.push(GrievanceFormPage, {
      Surveyor: this.UserId
    });
  }

  goToGrievance(id) {
    console.log("@@click" + id)

    // this.navCtrl.push(GrievanceShowPage,{
    //   id:id,
    // });

  }

  presentFilter() {
    let modal = this.modalCtrl.create(GrievanceFilterPage, { excludeWhoseGrievances: this.excludeWhoseGrievances, grievanceWhoseList: this.grievanceWhoseList });
    modal.present();

    modal.onWillDismiss((grievanceWhose: any[]) => {
      if (grievanceWhose) {
        this.excludeWhoseGrievances = grievanceWhose;
      }
      this.updateGrievances();
    });
  }

  updateGrievances() {
    this.grievance_m.shownGrievances = 0;
    this.grievance_m.forEach((grievance: any) => {
      this.filterGrievances(grievance, this.excludeWhoseGrievances);
      if (!grievance.hide) {
        this.grievance_m.shownGrievances++;
      }
    });
    console.log("Final Showing", this.grievance_m);

  }

  filterGrievances(grievance: any, excludeWhoseGrievances: any[]) {

    let excludeWhoseGrievance = false;
    if (excludeWhoseGrievances.indexOf(grievance.whose) !== -1) {
      excludeWhoseGrievance = true;
    }

    grievance.hide = !(excludeWhoseGrievance);
  }

  getLastActivity(updated_at) {
    return moment(updated_at).format("MMMM DD,YYYY hh:mm A");
  }
}
