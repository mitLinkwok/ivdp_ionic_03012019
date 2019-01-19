import { DatabaseProvider } from './../../providers/database/database';
import { DBmaneger } from './../../providers/database/Dbmaneger';
import { DataSetterProvider } from "../../providers/data-setter/data-setter";
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppGlobalProvider } from "../../providers/app-global/app-global";
import { ToastController } from "ionic-angular/components/toast/toast-controller";




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


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public appGlobal: AppGlobalProvider,
    public dataSetterService: DataSetterProvider,
    public toastCtrl: ToastController,
    public db: DBmaneger,
    public sqldatabasegetter: DatabaseProvider
  ) {
    this.appGlobal.questionsList=[]
    this.sqldatabasegetter.getQuestionsfroloddata();
    this.qindex = navParams.get("qindex");
    this.question_id = navParams.get("question_id");
    this.project_id = navParams.get("project_id");
    this.survey_id = navParams.get("survey_id");
    console.log(" index  :- " + this.qindex + " pid  :  " + this.project_id + " qid  " + this.question_id + "this.survey_id :   " + this.survey_id);



    alert("questions array size :=" + this.appGlobal.questionsList.length )

    this.loadQuestion();



  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad SuervyPage');
    // this.loadQuestion();
  }
  ionViewDidEnter() {
    // this.loadQuestion();
  }



  getSuervy() {
    // const body = { question_id: this.question_id, project_id: this.project_id, survey_id: this.survey_id };
    // this.dataSetterService.gatsuervysrequest(body).subscribe((data: any) => {
    //   this.appGlobal.questionsList = data.questions;

    // }, error => {
    //   console.log(error);

    // });

  }
  loadQuestion() {

    console.log("arrey" + this.appGlobal.questionsList);
    this.question = this.appGlobal.questionsList[this.qindex].text;
    this.key = this.appGlobal.questionsList[this.qindex].id;

    if (this.appGlobal.answers[this.key] != undefined) {
      this.answer = this.appGlobal.answers[this.key];
    }
    else {
      console.log("in else @@");
      this.answer = {
        question_id: this.key, option_text: "", survey_id: this.survey_id, language_id: 2, option_id: 2
        , other_text: "no", beneficiarie_id: 1
      };
    }
  }


  goToNext(e: any) {
    this.appGlobal.answers[this.key] = (this.answer);
    if (this.qindex == this.appGlobal.questionsList.length - 1) {
      this.is_last = 1;
      alert("Last Question");
      console.log(this.appGlobal.answers)
      return
    }
    console.log(this.answer);

    let nq = this.qindex + 1;
    this.navCtrl.push(SuervyPage, {
      project_id: this.project_id,
      survey_id: this.survey_id,
      question_id: this.question_id,
      qindex: (nq)
    });

  }

  goToPrev(e: any) {
    if (this.qindex == 0) {
      alert("First Question");
      return;
    }
    console.log(this.answer);
    let nq = this.qindex - 1;
    this.navCtrl.push(SuervyPage, {
      project_id: this.project_id,
      survey_id: this.survey_id,
      question_id: this.question_id, qindex: (nq)
    });

  }

  submit() {
    const data = this.appGlobal.answers;
    let key = Object.keys(data);
    for (let i = 0; i <= key.length; i++) {
      this.dataobject.push(this.appGlobal.answers[key[i]]);
    }
    console.log(this.dataobject);

    for (let j = 0; j <= this.dataobject.length; j++) {
      if (this.dataobject[j] != undefined) {
        console.log("inofrdd" + this.dataobject[j])
        this.dataSetterService.submitanswerrequest(this.dataobject[j]).subscribe((data: any) => {
          console.log("responsdara" + JSON.stringify(data));

          if (data) {
            this.responsData = data.data;
            console.log("@@@@@$5555" + this.responsData);
            const toast = this.toastCtrl.create({
              message: data.message,
              duration: 3000
            });
            toast.present();
            if (this.navCtrl.canGoBack) {
              this.navCtrl.pop();
              alert("suery is submit successfully")
            }

          } else {

            alert(data.errors);

          }

        }, error => {
          console.log(error);
        });
      }
    }

  }
}







