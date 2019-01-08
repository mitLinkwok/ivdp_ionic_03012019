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
  imageFileName: any;
  grievance_categories: any
  public grievanceTypes: any
  AddKyc: any = []


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public dataSetterService: DataSetterProvider,
    public dataGetterService: DataGetterServiceProvider,
    public events: Events,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public appGlobal: AppGlobalProvider,
    private camera: Camera,
    public platform: Platform,
    public vibration: Vibration) {
    this.initMaintenanceRequest();

  }

  initMaintenanceRequest() {
    this.AddKyc = {
      kyc_person_id: '',
      kyc_person_type: '',
      kyc_name: '',
      kyc_detail: '',
      kyc_number: '',
      kyc_file: '',
      user_id: ''
    };

  }

  loadGrievanceCategories(ref) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    if (ref === null) {
      loading.present();
    }

    this.dataGetterService.getGrievanceCategories()
      .subscribe((data: any) => {
        console.log("Grievance Categories Loaded", data);

        if (data.success) {
          this.grievance_categories = data.grievanceTypes;
        } else {
          this.grievance_categories = [];
        }

        loading.dismiss();
        if (ref != null) {
          ref.complete();
        }
      }, err => {
        console.log(err);
        this.grievance_categories = [];
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

  ionViewDidEnter() {
    this.loadGrievanceCategories(null);
  }

  submitSR(d) {
    d["kyc_file"] = this.imageURI

    console.log("Create Grievance Request", d);

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    this.dataSetterService.createGrievance(d)
      .subscribe((data: any) => {
        console.log("Create Grievance Response", data);

        loading.dismiss();

        if (data.success) {
          this.events.publish('reload:grievance');
          const toast = this.toastCtrl.create({
            message: data.message,
            duration: 3000
          });
          toast.present();
          if (this.navCtrl.canGoBack) {
            this.navCtrl.pop();
          }
          this.vibration.vibrate(this.appGlobal.vibrationTimings);
        } else {
          const toast = this.toastCtrl.create({
            message: data.errors,
            duration: 3000
          });
          toast.present();
        }

      }, err => {
        loading.dismiss();
        console.log(err);
        const toast = this.toastCtrl.create({
          message: this.appGlobal.ServerError,
          duration: 3000
        });
        toast.present();
      });
  }

  getImageFromCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      cameraDirection: 0,
      correctOrientation: true,
      saveToPhotoAlbum: true

    };
    this.platform.ready().then(() => {
      if (this.platform.is('cordova')) {
        this.camera.getPicture(options).then((imageData) => {
          console.log("@@@@@@@@" + imageData);
          this.imageURI = 'data:image/jpeg;base64,' + imageData;

          alert(this.imageURI);
        }, (err) => {
          console.log(err);
          // this.presentToast(err);
        });
      }
    });
  }

  getImageFromFS() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true
    };

    this.camera.getPicture(options).then((imageData) => {
      this.imageURI = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err);
      // this.presentToast(err);
    });
  }

  logForm(form: NgForm) {
    this.submitSR(form.value);
    // this.navCtrl.push(GrievancePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GrievanceFormPage');
  }













}
