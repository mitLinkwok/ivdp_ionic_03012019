import { QuestionDropdownPage } from './../question-dropdown/question-dropdown';
import { QuestionTextboxPage } from './../question-textbox/question-textbox';
import { SurveyListPage } from './../survey-list/survey-list';
import { SuervyPage } from './../suervy/suervy';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppGlobalProvider } from "../../providers/app-global/app-global";
import { ToastController } from "ionic-angular/components/toast/toast-controller";
import { DatabaseProvider } from './../../providers/database/database';
import { JsonPipe } from '@angular/common';



/**
 * Generated class for the QuestionCheckboxPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-question-checkbox',
  templateUrl: 'question-checkbox.html',
})
export class QuestionCheckboxPage {
  qindex: number;
  question: string
  options: any = [];
  is_last: number = 0;
  key: string;
  answer: any;
  question_id: string
  project_id: string
  survey_id: string
  beneficiary_id: any = []
  auto_increment_id: any = []
  cbChecked: string[];
  selectedCheckbox: any;
  Quesion_number:number;


  constructor(public navCtrl: NavController, public navParams: NavParams, public appGlobal: AppGlobalProvider, public toastCtrl: ToastController, public sqldatabasegetter: DatabaseProvider) {

    this.qindex = navParams.get("qindex");
    this.question_id = navParams.get("question_id");
    this.project_id = navParams.get("project_id");
    this.survey_id = navParams.get("survey_id");
    this.beneficiary_id = navParams.get('beneficiary_id');
    this.auto_increment_id = navParams.get('auto_increment_id');
    this.options = this.appGlobal.options;
    this.cbChecked = [];
    this.selectedCheckbox = {};
    this.Quesion_number=this.appGlobal.Quesion_number;
    this.loadQuestions()
   
  
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad QuestionCheckboxPage');
  }
  loadQuestions() {
    this.question = this.appGlobal.questionsList[this.qindex].text;
    this.key = this.appGlobal.questionsList[this.qindex].server_id;
    if (this.appGlobal.answers[this.key] != undefined) {
      this.answer = this.appGlobal.answers[this.key];
    }
    else {
      this.answer = {
        beneficiarie_id: this.auto_increment_id, server_id: this.beneficiary_id, survey_id: this.survey_id, question_id: this.key,
        language_id: 2, option_id: 2, option_text: "", image: "N/A", other_text: "no"
      };
    }

  }
  goToNext(e: any) {
    this.appGlobal.answers[this.key] = (this.answer);
    if (this.qindex == this.appGlobal.questionsList.length - 1) {
      this.is_last = 1;
      alert("Last Question");
      return
    }
    let nq = this.qindex + 1;
    this.appGlobal.Quesion_number++;
    this.navCtrl.push(SuervyPage, {
      project_id: this.project_id,
      survey_id: this.survey_id,
      question_id: this.question_id,
      beneficiary_id: this.beneficiary_id,
      auto_increment_id: this.auto_increment_id,
      qindex: (nq)
    });
  }

  goToPrev(e: any) {
    if (this.qindex == 0) {
      alert("First Question");
      return;
    }
    let nq = this.qindex - 1;
    this.appGlobal.Quesion_number--;
    this.navCtrl.push(SuervyPage, {
      project_id: this.project_id,
      survey_id: this.survey_id,
      question_id: this.question_id,
      beneficiary_id: this.beneficiary_id,
      auto_increment_id: this.auto_increment_id,
      qindex: (nq)

    });

  }

  submit() {
    const data = this.appGlobal.answers;
    let key = Object.keys(data);
    for (let i = 0; i <= key.length; i++) {
      if (this.appGlobal.answers[key[i]] != undefined) {
        this.sqldatabasegetter.insertAnswer(this.appGlobal.answers[key[i]])
      }
      if (i == key.length) {
        alert("submit scussfully")
        if (this.navCtrl.canGoBack) {
          this.navCtrl.pop();
          this.appGlobal.answers = []
          this.appGlobal.questionsList = []
          this.beneficiary_id = []
          this.auto_increment_id = []
          this.appGlobal.Quesion_number = 1;
          this.navCtrl.setRoot(SurveyListPage)

          // this.navCtrl.setRoot(QuestionDropdownPage)
        } else {
          const toast = this.toastCtrl.create({
            message: this.appGlobal.ServerError,
            duration: 3000
          });
          toast.present();

        }
      }
    }

  }

  updateOptions() {
    console.log(this.cbChecked);
  }

  getSelectedBen(e, i, a) {
    if (e.isChecked)
      return e.text;
  }
  removeNull(e, i, a) {
    return e != null
  }



  getChanged(e) {
    console.log("Selected Checkbox:" + JSON.stringify(this.selectedCheckbox));
    console.log("Selected Checkbox:" + JSON.stringify(this.options));
    this.selectedCheckbox = this.options.map(this.getSelectedBen).filter(this.removeNull);
    console.log("Selected Checkbox:" + JSON.stringify(this.selectedCheckbox));

    console.log("Final String :" + JSON.stringify(this.selectedCheckbox).replace(/\[|\]|"|"/g, ""))
    this.answer.option_text = JSON.stringify(this.selectedCheckbox).replace(/\[|\]|"|"/g, "");
  }

  goTosurveylist() {
    this.appGlobal.answers = []
    this.beneficiary_id = []
    this.auto_increment_id = []
    this.appGlobal.options = []
    this.options = []
    this.navCtrl.setRoot(SurveyListPage, {
      beneficiary_id: this.beneficiary_id,
      auto_increment_id: this.auto_increment_id,
    })

  }

}
