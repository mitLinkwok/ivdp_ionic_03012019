import { DatabaseProvider } from './../../providers/database/database';
import { Vibration } from '@ionic-native/vibration';
import { AppGlobalProvider } from './../../providers/app-global/app-global';
import { NgForm } from '@angular/forms';
import { Platform } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ToastController, LoadingController } from 'ionic-angular';
import { DataSetterProvider } from "../../providers/data-setter/data-setter";
import { DataGetterServiceProvider } from '../../providers/data-getter-service/data-getter-service';


/**
 * Generated class for the GrievanceFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-grievance-form',
  templateUrl: 'grievance-form.html',
})
export class GrievanceFormPage {
  grievance = {
    title: "",
    content: "",
    idea_type: "idea",
    grievance_type: "",
    category: ''
  }
  imageURI: any;
  imageuri:any
  imageFileName: any;
  grievance_categories: any;
  public grievanceTypes: any;
  AddKyc: any = [];
  SurveyorID: string;
  beneficiary_id: string;
  autoincrement_id: string;
  kyc_name:any=[]

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public dataSetterService: DataSetterProvider,
    public dataGetterService: DataGetterServiceProvider,
    public events: Events,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public appGlobal: AppGlobalProvider,
    private camera: Camera,
    public platform: Platform,
    public sqldatabasegetter: DatabaseProvider,
    public vibration: Vibration) {
    this.SurveyorID = navParams.get('Surveyor');
    this.beneficiary_id = navParams.get('beneficiary_id');
    this.autoincrement_id = navParams.get('auto_increment_id');
    this.kyc_name=[{ 'id': 1, 'name': 'Aadhar Card front' },{ 'id': 2, 'name': 'Aadhar Card back' },{ 'id': 3, 'name': 'PAN Card' },{ 'id': 4, 'name': 'BPL Card' },{ 'id': 5, 'name': 'Ration Card' },{ 'id': 6, 'name': 'Soil Health Card' },{ 'id': 7, 'name': 'Bank Account' }]
    //alert("@@@@@@@@@@@@    "  + this.beneficiary_id +"                " + this.autoincrement_id+"                      "+ this.SurveyorID)
    this.initMaintenanceRequest();
    // alert("kycs form " +this.beneficiary_id  + "   AND    "  +"AUTO INCRMENT  " +this.autoincrement_id   )

  }

  initMaintenanceRequest() {
    this.AddKyc = {
      kyc_person_id: this.beneficiary_id,
      kyc_person_type: '',
      kyc_name: '',
      kyc_detail: '',
      kyc_number: '',
      kyc_file: '',
      user_id: this.SurveyorID,
      server_id: this.autoincrement_id
    };

  }

  loadGrievanceCategories(ref) {
  }

  ionViewDidEnter() {
    this.loadGrievanceCategories(null);
  }

  submitSR(d) {
    d["kyc_image"] = this.imageuri
    // d["kyc_file"] =this.imageURI
    this.sqldatabasegetter.insertkycsdata(d, this.beneficiary_id, this.autoincrement_id);
  
    if (this.sqldatabasegetter.insertkycsdata) {
      if (this.navCtrl.canGoBack) {
        this.navCtrl.pop();
      } else {
        const toast = this.toastCtrl.create({
          message: this.appGlobal.ServerError,
          duration: 3000
        });
        toast.present();

      }
    }
  }

  getImageFromCamera() {
    const options: CameraOptions = {
      quality: 50,
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
          this.imageuri = imageData;

          //alert(this.imageURI);
        }, (err) => {
          console.log(err);
          // this.presentToast(err);
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
      this.imageuri = imageData;
    }, (err) => {
      console.log(err);
      // this.presentToast(err);
    });
  }

  logForm(form: NgForm) {
    this.submitSR(form.value);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GrievanceFormPage');
  }



  isReadonly() { return true; }









}
