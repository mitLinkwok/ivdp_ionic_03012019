import { DataSetterProvider } from "../../providers/data-setter/data-setter";
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {AppGlobalProvider} from "../../providers/app-global/app-global";


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
  question:string;
  key:string;
  answer:any;
  qindex:number;
  project_id:string;
  question_id:string;
  survey_id:string;
  is_last:number = 0;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: Storage,
    public appGlobal: AppGlobalProvider,
    public dataSetterService: DataSetterProvider
    ) {
      // this.qindex = navParams.get("qindex");


      this.question_id=navParams.get("question_id");
      this.project_id=navParams.get("project_id");
      this.survey_id=navParams.get("survey_id");


      console.log("@@@@@@@@"+ this.survey_id +""+ this.project_id+" "+this.question_id);
      
      // this.loadQuestion();
      this. getSuervy()
  }

  // loadQuestion(){
  //   console.log(this.qindex);
  //   this.question = this.appGlobal.questionsList[this.qindex].question;
  //   this.key = this.appGlobal.questionsList[this.qindex].key;
  //   // this.answer.question_key = this.key;
  //   if(this.appGlobal.answers[this.key]!=undefined)
  //   this.answer = this.appGlobal.answers[this.key];
  //   else
  //   this.answer ={question_key:this.key,value:""};


  // }


  // goToNext(e: any){
  //   this.appGlobal.answers[this.key] = (this.answer);
  
  //   if(this.qindex == this.appGlobal.questionsList.length - 1)
  //   {
  //     this.is_last =1;
  //     // alert("Last Question");
  //     console.log(this.appGlobal.answers)
  //     return
  //   }
  //   console.log(this.answer);
  //   let nq = this.qindex + 1;
  //   this.navCtrl.push(SuervyPage,{qindex: (nq)});
  // }

  // goToPrev(e: any){
  //   if(this.qindex == 0)
  //   {
  //     alert("First Question");
  //     return ;
  //   }
  //   console.log(this.answer);
  //   let nq = this.qindex - 1;
  //   this.navCtrl.push(SuervyPage,{qindex: (nq)});
  // }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SuervyPage');
    // this.navCtrl.push(SuervyPage,{qindex: 0});

  }

 getSuervy(){
  const body = {question_id: this.question_id, project_id: this.project_id,survey_id:this.survey_id};
  console.log("@@@@@@@@"+body);


  this.dataSetterService.gatsuervysrequest(body);
  
  
  

 }





  

}