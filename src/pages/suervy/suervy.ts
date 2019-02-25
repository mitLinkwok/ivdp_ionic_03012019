import { QuestionTextboxPage } from './../question-textbox/question-textbox';
import { QuestionRadiobuttonPage } from './../question-radiobutton/question-radiobutton';
import { QuestionDropdownPage } from './../question-dropdown/question-dropdown';
import { QuestionCheckboxPage } from './../question-checkbox/question-checkbox';
// import { Validator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BeneficiaryProfilePage } from './../beneficiary-profile/beneficiary-profile';
import { SurveyListPage } from './../survey-list/survey-list';
import { DatabaseProvider } from './../../providers/database/database';

import { DataSetterProvider } from "../../providers/data-setter/data-setter";
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppGlobalProvider } from "../../providers/app-global/app-global";
import { ToastController } from "ionic-angular/components/toast/toast-controller";

import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { QuestionImagePage } from '../question-image/question-image';





/**
 * Generated class for the SuervyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-suervy',
  templateUrl: 'suervy.html',
})
export class SuervyPage {
  question: string;
  key: string;
  answer: any;
  qindex: number;
  project_id: string;
  question_id: string;
  survey_id: string;
  is_last: number = 0;
  dataobject = [];
  responsData: string;
  beneficiary_id:any =[]
  auto_increment_id:any=[]
  questionType: string

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public appGlobal: AppGlobalProvider,
    public dataSetterService: DataSetterProvider,
    public toastCtrl: ToastController,
    public sqldatabasegetter: DatabaseProvider,

  ) {
    this.appGlobal.options = []
    this.qindex = navParams.get("qindex");
    this.question_id = navParams.get("question_id");
    this.project_id = navParams.get("project_id");
    this.survey_id = navParams.get("survey_id");
    if (navParams.get('beneficiary_id') != null && navParams.get('auto_increment_id') != null) {
      this.beneficiary_id = navParams.get('beneficiary_id');
      this.auto_increment_id = navParams.get('auto_increment_id');
    } else {
      this.beneficiary_id = JSON.stringify(this.appGlobal.selectedCheckbox);
      this.auto_increment_id = JSON.stringify(this.appGlobal.selectedCheckId)
    }
    this.questionType = this.appGlobal.questionsList[this.qindex].type;
    if (this.appGlobal.questionsList[this.qindex].type == "CheckBox") {
      this.sqldatabasegetter.getpoction(this.appGlobal.questionsList[this.qindex].server_id);
      this.navCtrl.push(QuestionCheckboxPage, {
        qindex: this.qindex,
        question_id: this.question_id,
        project_id: this.project_id,
        survey_id: this.survey_id,
        beneficiary_id: this.beneficiary_id,
        auto_increment_id: this.auto_increment_id
      });
    }
    if (this.appGlobal.questionsList[this.qindex].type == "TextBox") {
      this.navCtrl.push(QuestionTextboxPage, {
        qindex: this.qindex,
        question_id: this.question_id,
        project_id: this.project_id,
        survey_id: this.survey_id,
        beneficiary_id: this.beneficiary_id,
        auto_increment_id: this.auto_increment_id
      });
    }
    if (this.appGlobal.questionsList[this.qindex].type == "Radio" || this.appGlobal.questionsList[this.qindex].type == "radio") {
      this.sqldatabasegetter.getpoction(this.appGlobal.questionsList[this.qindex].server_id);
      this.navCtrl.push(QuestionRadiobuttonPage, {
        qindex: this.qindex,
        question_id: this.question_id,
        project_id: this.project_id,
        survey_id: this.survey_id,
        beneficiary_id: this.beneficiary_id,
        auto_increment_id: this.auto_increment_id
      })
    }
    if (this.appGlobal.questionsList[this.qindex].type == "Image" || this.appGlobal.questionsList[this.qindex].type == "image") {
      this.navCtrl.push(QuestionImagePage, {
        qindex: this.qindex,
        question_id: this.question_id,
        project_id: this.project_id,
        survey_id: this.survey_id,
        beneficiary_id: this.beneficiary_id,
        auto_increment_id: this.auto_increment_id
      });
    }
    this.loadQuestion();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SuervyPage');
  }
  ionViewDidEnter() { }
  loadQuestion() { }
  goToNext(e: any) { }
  goToPrev(e: any) { }
  submit() { }
}







