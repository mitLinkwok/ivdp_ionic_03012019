import { DatabaseProvider } from './../../providers/database/database';
//import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Events, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { DataSetterProvider } from "../../providers/data-setter/data-setter";
import { DataGetterServiceProvider } from "../../providers/data-getter-service/data-getter-service";
import { Vibration } from "@ionic-native/vibration";
import { AppGlobalProvider } from "../../providers/app-global/app-global";
import { ToastController } from "ionic-angular/components/toast/toast-controller";
import { NgForm } from "@angular/forms";


/**
 * Generated class for the MaintenanceRequestFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-maintenance-request-form',
  templateUrl: 'maintenance-request-form.html',
})
export class MaintenanceRequestFormPage {
  maintenanceRequest: any = {};
  Addbeneficiary: any = {};
  selectedvillage: any[];
  assets: any = [];
  locations: any = [];
  SurveyorID: string;
  responsData: string;
  villages: any = [];
  marital_status: any = []
  education_status: any = []
  primary_occupation: any = []
  ownership_of_land: any = []
  type_of_rationa_card: any = []
  religions: any = []
  castes: any = []
  timestamp: string
  household_id: any = []

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public dataGetterService: DataGetterServiceProvider,
    public dataSetterService: DataSetterProvider,
    public toastCtrl: ToastController,
    public events: Events,
    public loadingCtrl: LoadingController,
    public appGlobal: AppGlobalProvider,
    public sqldatabasegetter: DatabaseProvider,
    public vibration: Vibration) {
    let time = new Date();
    this.timestamp = time.toISOString();
    this.SurveyorID = navParams.get('Surveyor');
    this.initMaintenanceRequest();
    this.getAllDroupdown();

  }
  ionViewDidLoad() {
    // alert('ionViewDidLoad MaintenanceRequestFormPage');
  }
  getAllDroupdown() {
    this.villages = [{ 'id': 1, 'name': 'Dhamani' }, { 'id': 2, 'name': 'Brahmagaon' }, { 'id': 3, 'name': 'Kalamgaon' }, { 'id': 4, 'name': 'Beriste' }, { 'id': 5, 'name': 'Ase' }, { 'id': 6, 'name': 'Karoli' }, { 'id': 7, 'name': 'Bavalpada' }];
    this.marital_status = [{ 'id': 1, 'name': 'Currently Married' }, { 'id': 2, 'name': 'Never Married' }, { 'id': 3, 'name': 'Divorced' }, { 'id': 4, 'name': 'Widow/Widower' }, { 'id': 5, 'name': 'Separated' }];
    this.education_status = [{ 'id': 1, 'name': 'Primary School' }, { 'id': 2, 'name': 'Higher Secondary/ intermediate' }, { 'id': 3, 'name': 'High School/ Matriculate' }, { 'id': 4, 'name': 'Graduate & Above' }, { 'id': 5, 'name': 'Literate but No Formal Schooling' }];
    this.primary_occupation = [{ 'id': 1, 'name': 'Student' }, { 'id': 2, 'name': 'Agriculture' }, { 'id': 3, 'name': 'Housewife' }, { 'id': 4, 'name': 'Wage/ casual Labour' }, { 'id': 5, 'name': 'Unemployed' }];
    this.ownership_of_land = [{ 'id': 1, 'name': 'Rented' }, { 'id': 2, 'name': 'Own' }];
    this.type_of_rationa_card = [{ 'id': 1, 'name': 'BPL' }, { 'id': 2, 'name': 'APL' }, { 'id': 3, 'name': "Don't Know" }];
    this.religions = [{ 'id': 1, 'name': 'Hindu' }, { 'id': 2, 'name': 'Buddhist' }, { 'id': 3, 'name': 'Sikh' }, { 'id': 4, 'name': 'Muslim' }, { 'id': 5, 'name': 'Other' }];
    this.castes = [{ 'id': 1, 'name': 'Scheduled Tribes' }, { 'id': 2, 'name': 'Schediled Cast' }, { 'id': 3, 'name': 'Other Backward Cast' }];

    this.makeid()
  }
  ionViewDidEnter() {
    // this.loadAssetsList();
  }

  initMaintenanceRequest() {
    //alert("in mantens request from " + this.timestamp)
    this.Addbeneficiary = {
      server_id: '',
      code: '',
      beneficiary_name: '',
      gender: '',
      age: '',
      date_of_birth: '',
      marital_status: '',
      caste: '',
      religion: '',
      primary_occupation: '',
      ownership_of_land: '',
      total_land_holding: '',
      total_family_income_average_monthly: '',
      education_status: '',
      height_in_cms: '',
      Weight_in_kgs: '',
      type_of_rationa_card: '',
      village_id: '',
      household_id: '',
      family_head_id: '',
      contact_number: '',
      whatsapp_number: '',
      user_id: this.SurveyorID,
      family_head_relation: '',
      created_at: this.timestamp,
      updated_at: ''
    }

    this.maintenanceRequest = {
      maintenanceasset_id: 0,
      detail: '',
      location: ''
    };
    this.assets = [];
  }
  submitMaintenanceRequest(data) {
    this.sqldatabasegetter.insertnewbeneficiary(data, this.timestamp);

    if (this.sqldatabasegetter.insertMainbeneficiary) {
      if (this.navCtrl.canGoBack) {
        this.navCtrl.pop();
      } else {
        const toast = this.toastCtrl.create({
          message: this.appGlobal.ServerError,
          duration: 3000
        });
        toast.present();

      }
    }
   
  }
  logForm(form: NgForm) {
    this.submitMaintenanceRequest(form.value);
  }
  isReadonly() { return true; }


  select_village(ev) {
    this.household_id = []
    this.sqldatabasegetter.gethouseholdid(ev, this);
  }

  makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~!@#$%&*)(+";

    for (var i = 0; i < 8; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    console.log(text);
  }



}