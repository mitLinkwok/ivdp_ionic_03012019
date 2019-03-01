import { DatabaseProvider } from './../../providers/database/database';
import { SurveyListPage } from './../survey-list/survey-list';
import { SuervyPage } from './../suervy/suervy';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppGlobalProvider } from "../../providers/app-global/app-global";
import { ToastController } from "ionic-angular/components/toast/toast-controller";
import { elementAt } from 'rxjs/operator/elementAt';




/**
 * Generated class for the QuestionDropdownPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-question-dropdown',
  templateUrl: 'question-dropdown.html',
})
export class QuestionDropdownPage {
  qindex: number;
  queryText: any = '';
  is_last: number = 0;
  answer: any;
  project_id: string
  survey_id: string
  survey_type: string
  beneficiary_id: string
  auto_increment_id: string;
  selectedCheckbox: any;
  group: any = [];
  qId: any;
  numberOfChecks: number = 1;
  checkBoxLimit: any = 1;
constructor(public navCtrl: NavController, public navParams: NavParams, public appGlobal: AppGlobalProvider, public toastCtrl: ToastController, public sqldatabasegetter: DatabaseProvider) {
    this.sqldatabasegetter.getdataforgroupsurvey(this.ccallBack, this)
    this.project_id = navParams.get("project_id");
    this.survey_id = navParams.get("survey_id");
    this.qId = navParams.get("qId");
    this.survey_type = navParams.get("type");
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionDropdownPage');
    console.log("@@@    " + this.appGlobal.groupsurveybeneficiaries)
  }

  getSelectedBen(e, i, a) {
    if (e.isChecked)
      return e.server_id;
  }
  getSelectid(e, i, a) {
    if (e.isChecked)
      return e.id;
  }
  removeNull(e, i, a) {
    return e != null
  }
  ccallBack(t) {
    t.group = t.appGlobal.groupsurveybeneficiaries;
    t.group[0].isChecked = true;
  }



  getChanged(e) {
    if (this.survey_type === "Single") {
      if (e.isChecked === true) {
        this.numberOfChecks++;
        this.Selection()
      } else {
        this.numberOfChecks--;
      }
    }
    else {
      this.checkBoxLimit = 2;
      this.Selection();
    }
  }
  startsurvey() {
    this.sqldatabasegetter.getQuestionsfroloddata(this.survey_id, this.callsurveypage(this.project_id, this.survey_id, this.qId), this);
  }
  callsurveypage(ProjectId, suervtId, qId) {
    if (this.appGlobal.questionsList != null && this.appGlobal.questionsList != undefined) {
      this.navCtrl.push(SuervyPage, {
        project_id: ProjectId,
        survey_id: suervtId,
        question_id: qId,
        beneficiary_id: this.beneficiary_id,
        auto_increment_id: this.auto_increment_id,
        qindex: 0
      });
    }
  }
  Selection() {
    // console.log("Selected Checkbox:" + JSON.stringify(this.appGlobal.selectedCheckbox));
    // console.log("Selected Checkbox:" + JSON.stringify(this.group));
    this.appGlobal.selectedCheckbox = this.group.map(this.getSelectedBen).filter(this.removeNull);
    this.appGlobal.selectedCheckId = this.group.map(this.getSelectid).filter(this.removeNull);
    console.log("Final String :" + JSON.stringify(this.appGlobal.selectedCheckId).replace(/\[|\]|"|"/g, ""))
    this.answer.option_text = JSON.stringify(this.appGlobal.selectedCheckbox).replace(/\[|\]|"|"/g, "");
  }
}

