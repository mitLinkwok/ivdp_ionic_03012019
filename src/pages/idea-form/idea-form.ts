import { Vibration } from '@ionic-native/vibration';
import { AppGlobalProvider } from './../../providers/app-global/app-global';
import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController } from 'ionic-angular';
import {DataSetterProvider} from "../../providers/data-setter/data-setter";
import {Camera, CameraOptions} from "@ionic-native/camera";
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

/**
 * Generated class for the IdeaFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-idea-form',
  templateUrl: 'idea-form.html',
})
export class IdeaFormPage {
idea={
   title:"",
   content:"",
   idea_type:"idea"
}
// public errors:any;
  imageURI:any;
  imageFileName:any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dataSetterService: DataSetterProvider,
              private camera: Camera,
              public toastCtrl:ToastController,
              public events:Events,
              public loadingCtrl: LoadingController,
              public appGlobal: AppGlobalProvider,
              public vibration: Vibration) {
  }

  submitSR(d){
    d["file"]=this.imageURI

    console.log("Create Idea Request", d);

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    this.dataSetterService.createIdea(d)
      .subscribe((data: any) => {
        console.log("Create Idea Response", data);

        loading.dismiss();

        if (data.success) {
          this.events.publish('reload:idea');
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

  logForm(form: NgForm){
    console.log(form.value);

    this.submitSR(form.value);
    // this.navCtrl.push(IdeaPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IdeaFormPage');
  }

  getImageFromCamera() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      cameraDirection: 0,
      correctOrientation: true,
      saveToPhotoAlbum: true,

    };
    this.camera.getPicture(options).then((imageData) => {
      this.imageURI = 'data:image/jpeg;base64,'+imageData;
    }, (err) => {
      console.log(err);

    });
  }


  getImageFromFS() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true,
    };

    this.camera.getPicture(options).then((imageData) => {
      this.imageURI = 'data:image/jpeg;base64,'+imageData;
    }, (err) => {
      console.log(err);
      // this.presentToast(err);
    });
  }

}
