import { QuestionDropdownPage } from './../question-dropdown/question-dropdown';
import { UserData } from './../../providers/user-data-ts';
import { DataGetterServiceProvider } from './../../providers/data-getter-service/data-getter-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController, ToastController } from 'ionic-angular';
import { AppGlobalProvider } from '../../providers/app-global/app-global';
import { SuervyPage } from '../suervy/suervy';
import { DatabaseProvider } from './../../providers/database/database';

/**
 * Generated class for the SurveyListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-survey-list',
  templateUrl: 'survey-list.html',
})
export class SurveyListPage {

  surveys: any = [];
  user: any;
  loading: any;
  beneficiary_id: string
  auto_increment_id: string

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public dataGetterService: DataGetterServiceProvider,
    public events: Events,
    public userData: UserData,
    public loadingCtrl: LoadingController,
    public appGlobal: AppGlobalProvider,
    public sqldatabasegetter: DatabaseProvider,
    public toastCtrl: ToastController) {

    this.beneficiary_id = navParams.get('beneficiary_id');
    this.auto_increment_id = navParams.get('auto_increment_id');
    this.user = userData.userData;
    this.sqldatabasegetter.getsureydatalode(this.ccallBack, this);
    this.appGlobal.questionsList = []
    this.events.subscribe('reload:surveys', () => {
      this.loadSurveys(null);
    });
    this.appGlobal.answers = []
    this.appGlobal.options = []
    this.appGlobal.selectedCheckId = [];
    this.appGlobal.selectedCheckbox = [];

  }



  ionViewDidLoad() {
    this.loadSurveys(null);

  }
  ccallBack(t) {
    t.loadSurveys(null)
  }

  ionViewDidEnter() {
    this.appGlobal.answers = []
    this.appGlobal.options = []
    console.log('ionViewDidEnter SurveyListPage');
  }



  refreshSurveys(reference) {
    setTimeout(() => {
      console.log('Async operation has ended');
      this.loadSurveys(null);
      reference.complete();
    }, 1000);
  }
  loadSurveys(ref) {
    if (this.sqldatabasegetter.offlineCase.length > 0) {
      this.surveys = [];
      for (let i = 0; i <= this.sqldatabasegetter.offlineCase.length; i++) {
        if (this.sqldatabasegetter.offlineCase[i] != undefined) {
          console.log(this.sqldatabasegetter.offlineCase[i]);
          this.surveys.push(
            this.sqldatabasegetter.offlineCase[i]
          );
        }
      }
      if (ref != null) {
        ref.complete();
      }
    } else {
      this.surveys = [];
      console.log("No data i array")
      if (ref != null) {
        ref.complete();
      }
    }

  }


  StartSurvey(ProjectId, suervtId, type, qId) {

    if (type == "Group") {
      alert("This is Group survey,so you should select more then one beneficiary.")
      this.appGlobal.selectedCheckId = [];
      this.appGlobal.selectedCheckbox = [];
      this.navCtrl.push(QuestionDropdownPage, {
        project_id: ProjectId,
        survey_id: suervtId,
        gId: qId,
        type: "Group"
      });

    } else if (type == "Single") {
      this.appGlobal.selectedCheckId = [];
      this.appGlobal.selectedCheckbox = [];

      this.navCtrl.push(QuestionDropdownPage, {
        project_id: ProjectId,
        survey_id: suervtId,
        gId: qId,
        type: "Single"
      });
      //this.sqldatabasegetter.getQuestionsfroloddata(suervtId, this.callsurveypage(ProjectId, suervtId, qId), this);
    } else {
      this.appGlobal.selectedCheckId = [];
      this.appGlobal.selectedCheckbox = [];
      alert("can not read survey type!!!  " + type);
    }


  }
}

