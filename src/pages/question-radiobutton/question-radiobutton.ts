import { QuestionCheckboxPage } from './../question-checkbox/question-checkbox';
import { QuestionDropdownPage } from './../question-dropdown/question-dropdown';
import { SurveyListPage } from './../survey-list/survey-list';
import { SuervyPage } from './../suervy/suervy';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppGlobalProvider } from "../../providers/app-global/app-global";
import { ToastController } from "ionic-angular/components/toast/toast-controller";
import { DatabaseProvider } from './../../providers/database/database';

/**
 * Generated class for the QuestionRadiobuttonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-question-radiobutton',
  templateUrl: 'question-radiobutton.html',
})
export class QuestionRadiobuttonPage {

  qindex: number;
  question: string
  opctions: any = [];
  is_last: number = 0;
  filled: number = 0;
  key: string;
  answer: any;
  question_id: string
  project_id: string
  survey_id: string
  beneficiary_id: any = []
  auto_increment_id: any = []
  select_radio: string
  Quesion_number: number;
  rule_json: string;
  jump: any = []

  constructor(public navCtrl: NavController, public navParams: NavParams, public appGlobal: AppGlobalProvider, public toastCtrl: ToastController, public sqldatabasegetter: DatabaseProvider) {
    this.qindex = navParams.get("qindex");
    this.question_id = navParams.get("question_id");
    this.project_id = navParams.get("project_id");
    this.survey_id = navParams.get("survey_id");
    this.beneficiary_id = navParams.get('beneficiary_id');
    this.auto_increment_id = navParams.get('auto_increment_id');
    this.opctions = this.appGlobal.options;
    this.Quesion_number = this.appGlobal.Quesion_number;
    this.loadQuestions()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionRadiobuttonPage');
  }
  loadQuestions() {

    this.question = this.appGlobal.questionsList[this.qindex].text;
    this.key = this.appGlobal.questionsList[this.qindex].server_id;
    this.rule_json = this.appGlobal.questionsList[this.qindex].rule_json;
    //if (this.rule_json &&  this.rule_json.length >0  && (JSON.parse(this.rule_json)).jump)
    //{
    //  this.jump =  (JSON.parse(this.rule_json));
    //}

    if (this.appGlobal.answers[this.key] != undefined) {
      this.answer = this.appGlobal.answers[this.key];
    }
    else {
      this.answer = {
        beneficiarie_id: this.auto_increment_id, server_id: this.beneficiary_id, survey_id: this.survey_id, question_id: this.key,
        language_id:3, option_id:"", option_text: "", image: "N/A", other_text: "no"
      };
    }

  }

  goToNext(e: any) {
    {
      if(this.filled == 0)
      {
        alert("Please select the answer");
        return false;
      }
      this.appGlobal.answers[this.key] = (this.answer);
      if(this.qindex == this.appGlobal.questionsList.length - 1) {
        this.is_last = 1;
        alert("Last Question");
        return
      }
      //alert(JSON.stringify(this.appGlobal.questionsList));
      //alert(this.jump);
      let nq = this.qindex + 1;
      this.appGlobal.Quesion_number++
      //alert(JSON.parse(this.appGlobal.questionsList[nq].server_id));
      //alert(this.rule_json);
      if (this.rule_json != 'null' && this.rule_json != null)
      {
        //alert(this.rule_json.length);
        this.jump = JSON.parse(this.rule_json);
        if((this.jump['jump']) && Number(this.answer.option_id) == Number(this.jump['jump']['option_id'])){
          //alert("is jump" + this.jump['jump']['option_id']);
          while( 1==1 )
          {
            if (this.appGlobal.questionsList[nq].server_id == Number(this.jump['jump']['question_id']))
            {
              break;
            }
            else
            {
              nq = nq + 1;
              this.appGlobal.Quesion_number++;
            }
          } 
        }
        //alert("In if of jump");
      }
      this.navCtrl.push(SuervyPage, {
        project_id: this.project_id,
        survey_id: this.survey_id,
        question_id: this.question_id,
        beneficiary_id: this.beneficiary_id,
        auto_increment_id: this.auto_increment_id,
        qindex: (nq)
      });

    }

  }
  select(item) {
  
    this.answer.option_text = item.text;
    this.answer.option_id = item.server_id;
    this.filled = 1;
    // this.select_radio=item
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
          // this.navCtrl.pop();
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

  goTosurveylist() {
    this.appGlobal.answers = []
    this.beneficiary_id = []
    this.auto_increment_id = []
    this.appGlobal.options = []

    this.navCtrl.setRoot(SurveyListPage, {
      beneficiary_id: this.beneficiary_id,
      auto_increment_id: this.auto_increment_id,
    })

  }
}
