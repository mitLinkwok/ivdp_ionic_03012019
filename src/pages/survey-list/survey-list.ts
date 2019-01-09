import { UserData } from './../../providers/user-data-ts';
import { DataGetterServiceProvider } from './../../providers/data-getter-service/data-getter-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController, ToastController } from 'ionic-angular';
import { AppGlobalProvider } from '../../providers/app-global/app-global';
import { SuervyPage } from '../suervy/suervy';

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
    public toastCtrl:ToastController) {
    this.user = userData.userData;
    this.events.subscribe('reload:surveys', () => {
      this.refreshSurveysList(null);
      // this.loadSurveys(null);
    });
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

    this.dataGetterService.getSurveys().subscribe((data: any) => {
        console.log("Survey Loaded",data.data);
        let a=true
        if(data.success || a){
          this.surveys = data.data;
        } else {
          this.surveys = [];
        }
        
        loading.dismiss();
        if (ref != null) {
          ref.complete();
        }
      }, err => {
        console.log(err);
        this.surveys = [];
        const toast = this.toastCtrl.create({
          message: this.appGlobal.ServerError,
          duration: 3000
        });
        toast.present();
        loading.dismiss();
        if (ref != null) {
          ref.complete();
        }
      });
  }


  StartSurvey(ProjectId,suervtId,qId){
// this.navCtrl.push(SuervyPage,{qindex: 0});

this.navCtrl.push(SuervyPage,{
  project_id:ProjectId,
  survey_id:suervtId,
  question_id:qId});
}


  

}
