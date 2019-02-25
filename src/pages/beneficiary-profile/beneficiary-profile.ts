import { SurveyListPage } from './../survey-list/survey-list';
import { GrievancePage } from './../grievance/grievance';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';
import { NgForm } from "@angular/forms";
import { FormControl } from '@angular/forms';
import { AppGlobalProvider } from "../../providers/app-global/app-global";


/**
 * Generated class for the BeneficiaryProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-beneficiary-profile',
  templateUrl: 'beneficiary-profile.html',
})
export class BeneficiaryProfilePage {
  data: any = {};
  name: FormControl = new FormControl();
  beneficiary_id: string;
  beneficiary_code: string
  surveyorID: String;
  autoincrement_id: string;

  constructor(public navCtrl: NavController, public appGlobal: AppGlobalProvider, public sqldatabasegetter: DatabaseProvider, public navParams: NavParams) {
    this.beneficiary_id = navParams.get('beneficiary_id');
    // this.beneficiary_code = navParams.get('beneficiary_code');
    this.surveyorID = navParams.get('user_id');
    this.autoincrement_id = navParams.get('auto_increment_id');
   // alert(  this.beneficiary_id+"          "+ this.surveyorID + "      " + this.autoincrement_id )
    this.sqldatabasegetter.getbeneficiaryforprofile(this.beneficiary_id, this.autoincrement_id);
    this.loadMaintenanceRequests();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BeneficiaryProfilePage');
  }
  ionViewDidEnter() {
    this.loadMaintenanceRequests();
  }
  loadMaintenanceRequests() {

    //alert("array size " + this.sqldatabasegetter.offlineCase.length)
    if (this.sqldatabasegetter.offlineCase.length > 0) {
      for (let i = 0; i <= this.sqldatabasegetter.offlineCase.length; i++) {
        if (this.sqldatabasegetter.offlineCase[i] != undefined) {
          this.data = {
            server_id: this.beneficiary_id,
            code: this.sqldatabasegetter.offlineCase[i].code,
            beneficiary_name: this.sqldatabasegetter.offlineCase[i].beneficiary_name,
            age: this.sqldatabasegetter.offlineCase[i].age,
            gender: this.sqldatabasegetter.offlineCase[i].gender,
            date_of_birth: this.sqldatabasegetter.offlineCase[i].date_of_birth,
            marital_status: this.sqldatabasegetter.offlineCase[i].marital_status,
            caste: this.sqldatabasegetter.offlineCase[i].caste,
            religion: this.sqldatabasegetter.offlineCase[i].religion,
            primary_occupation: this.sqldatabasegetter.offlineCase[i].primary_occupation,
            ownership_of_land: this.sqldatabasegetter.offlineCase[i].ownership_of_land,
            total_land_holding: this.sqldatabasegetter.offlineCase[i].total_land_holding,
            total_family_income_average_monthly: this.sqldatabasegetter.offlineCase[i].total_family_income_average_monthly,
            education_status: this.sqldatabasegetter.offlineCase[i].education_status,
            height_in_cms: this.sqldatabasegetter.offlineCase[i].height_in_cms,
            Weight_in_kgs: this.sqldatabasegetter.offlineCase[i].Weight_in_kgs,
            type_of_rationa_card: this.sqldatabasegetter.offlineCase[i].type_of_rationa_card,
            village_id: this.sqldatabasegetter.offlineCase[i].village_id,
            household_id: this.sqldatabasegetter.offlineCase[i].household_id,
            family_head_id: this.sqldatabasegetter.offlineCase[i].family_head_id,
            contact_number: this.sqldatabasegetter.offlineCase[i].contact_number,
            whatsapp_number: this.sqldatabasegetter.offlineCase[i].whatsapp_number,
            user_id: this.sqldatabasegetter.offlineCase[i].user_id,
            family_head_relation: this.sqldatabasegetter.offlineCase[i].family_head_relation
          }
        }
      }
    } else {
      console.log("No data i array ")
    }
  }
 
  updata(form: NgForm) {
    this.sqldatabasegetter.updatabeneficiaryProfile(form.value, this.beneficiary_id, this.autoincrement_id);
  }
  Beneficiary_kycs() {
    this.navCtrl.push(GrievancePage, {
      beneficiary_id: this.beneficiary_id,
      auto_increment_id: this.autoincrement_id
    })
  }

  // start_survey() {
  //   this.navCtrl.push(SurveyListPage, {
  //     beneficiary_id: this.beneficiary_id,
  //     auto_increment_id: this.autoincrement_id
  //   })
  // }
  isReadonly() { return true; }
}


