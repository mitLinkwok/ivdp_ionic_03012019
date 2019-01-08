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


  constructor(public navCtrl: NavController, public navParams: NavParams,public storage: Storage,public appGlobal: AppGlobalProvider) {
      this.qindex = navParams.get("qindex");
      
      this.loadQuestion();
  }

  loadQuestion(){
    console.log(this.qindex);
    this.question = this.appGlobal.questionsList[this.qindex].question;
    this.key = this.appGlobal.questionsList[this.qindex].key;
    // this.answer.question_key = this.key;
    if(this.appGlobal.answers[this.key]!=undefined)
    this.answer = this.appGlobal.answers[this.key];
    else
    this.answer ={question_key:this.key,value:""};


  }


  goToNext(e: any){
    this.appGlobal.answers[this.key] = (this.answer);
  
    if(this.qindex == this.appGlobal.questionsList.length - 1)
    {
      alert("Last Question");
      console.log(this.appGlobal.answers)
      return
    }
    console.log(this.answer);
    let nq = this.qindex + 1;
    this.navCtrl.push(SuervyPage,{qindex: (nq)});
  }

  goToPrev(e: any){
    if(this.qindex == 0)
    {
      alert("First Question");
      return ;
    }
    console.log(this.answer);
    let nq = this.qindex - 1;
    this.navCtrl.push(SuervyPage,{qindex: (nq)});
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SuervyPage');
    // this.navCtrl.push(SuervyPage,{qindex: 0});

  }
  

}