import { QuestionDropdownPage } from './../question-dropdown/question-dropdown';
import { SurveyListPage } from './../survey-list/survey-list';
import { SuervyPage } from './../suervy/suervy';
import { AppGlobalProvider } from './../../providers/app-global/app-global';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ToastController } from "ionic-angular/components/toast/toast-controller";
import { DatabaseProvider } from './../../providers/database/database';

/**
 * Generated class for the QuestionImagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-question-image',
  templateUrl: 'question-image.html',
})
export class QuestionImagePage {
  qindex: number;
  question: string
  opctions: any = [];
  is_last: number = 0;
  key: string;
  imageURI: any;
  answer: any;
  question_id: string
  project_id: string
  survey_id: string
  // beneficiary_id: string
  // auto_increment_id: string
  beneficiary_id: any = []
  auto_increment_id: any = []
  Quesion_number:number;


  constructor(public navCtrl: NavController, public navParams: NavParams, public appGlobal: AppGlobalProvider, private camera: Camera,
    public platform: Platform, public toastCtrl: ToastController, public sqldatabasegetter: DatabaseProvider) {
    this.qindex = navParams.get("qindex");
    this.question_id = navParams.get("question_id");
    this.project_id = navParams.get("project_id");
    this.survey_id = navParams.get("survey_id");
    this.beneficiary_id = navParams.get('beneficiary_id');
    this.auto_increment_id = navParams.get('auto_increment_id');
    this.Quesion_number=this.appGlobal.Quesion_number;
    this.loadQuestions();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionImagePage');
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
        language_id: 2, option_id: 2, option_text: "N/A", image: "", other_text: "no"
      };
    }
  }

  getImageFromCamera() {
    const options: CameraOptions = {
      quality: 20,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      saveToPhotoAlbum: true,
      cameraDirection: 0
    };
    this.platform.ready().then(() => {
      if (this.platform.is('cordova')) {
        this.camera.getPicture(options).then((imageData) => {
          this.imageURI = 'data:image/jpeg;base64,' + imageData;
         
        }, (err) => {
          console.log(err);
        });
      }
    });

  }
  getImageFromFS() {

    const options: CameraOptions = {
      quality: 20,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true
    };

    this.camera.getPicture(options).then((imageData) => {
      this.imageURI = 'data:image/jpeg;base64,' + imageData;
     
    }, (err) => {
      console.log(err);
    });

  }

  goToNext(e: any) {

    this.answer["image"] = this.imageURI
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
          this.beneficiary_id=[]
          this.auto_increment_id=[]
          this.appGlobal.Quesion_number = 1;
          this.navCtrl.setRoot(SurveyListPage)
         
          //this.navCtrl.setRoot(QuestionDropdownPage)
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
