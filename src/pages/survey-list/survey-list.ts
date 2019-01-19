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

  surveys:any = [];
  user:any;
  loading:any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams, 
    public dataGetterService:DataGetterServiceProvider,
    public events: Events,
    public userData:UserData,
    public loadingCtrl:LoadingController,
    public appGlobal:AppGlobalProvider,
    public sqldatabasegetter: DatabaseProvider,
    public toastCtrl:ToastController) {
    this.user = userData.userData;
    this.events.subscribe('reload:surveys', () => {
      this.refreshSurveysList(null);
       this.loadSurveys(null);
    });
    this.sqldatabasegetter.getsureydatalode();
  }


  refreshSurveysList(refrence){
    this.loadSurveys(refrence);
  }
  ionViewDidLoad() {
   
    // this.presentLoading();
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter SurveyListPage');
      this.loadSurveys(null);
  }

  presentLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    this.loading.present();
  }

  dismissLoading() {
    this.loading.dismiss();
  }

  refreshSurveys(ev){
    this.loadSurveys(ev);
  }
 
  loadSurveys(ref) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    if (ref === null) {
      loading.present();
    }

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
      loading.dismiss();
      if (ref != null) {
        ref.complete();
      }


    } else {
      this.surveys = [];
      console.log("No data i array")
      loading.dismiss();
      if (ref != null) {
        ref.complete();
      }
    }
 
  }


  StartSurvey(ProjectId,suervtId,qId){
// this.navCtrl.push(SuervyPage,{qindex: 0});
alert("project_id : " +ProjectId +" survey_id: " + suervtId +" question_id:  " + qId)
this.sqldatabasegetter.getQuestionsfroloddata();
// this.navCtrl.push(SuervyPage,{
//   project_id:ProjectId,
//   survey_id:suervtId,
//   question_id:qId,
//   qindex: 0});
// }


  

  }
}
