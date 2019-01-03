import { Vibration } from '@ionic-native/vibration';
import { NgForm } from '@angular/forms';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { AppGlobalProvider } from './../../providers/app-global/app-global';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController } from 'ionic-angular';
import {DataSetterProvider} from "../../providers/data-setter/data-setter";
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
// import { LoadingController, ToastController } from 'ionic-angular';
import { File } from '@ionic-native/file';


/**
 * Generated class for the ServiceRequestFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-service-request-form',
  templateUrl: 'service-request-form.html',
})
export class ServiceRequestFormPage {

  service_request = {
    detail: '',
    category: '',
    service_type:'Service Request'
  };
  imageURI:any;
  imageFileName:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public dataSetterService: DataSetterProvider,private transfer: FileTransfer,
    private camera: Camera, public toastCtrl:ToastController,
    public events:Events,public appGlobal:AppGlobalProvider,public file :File,
    public loadingCtrl: LoadingController,
    public vibration: Vibration) {
  }


  getImageFromCamera() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      cameraDirection: 0,
      correctOrientation: true,
      saveToPhotoAlbum:true,
      
    };
    this.camera.getPicture(options).then((imageData) => {
      this.imageURI = 'data:image/jpeg;base64,'+imageData;
    }, (err) => {
      console.log(err);
      // this.presentToast(err);
    });
  }


  getImageFromFS() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation:true,
    };

    this.camera.getPicture(options).then((imageData) => {
      console.log(imageData)
      this.imageURI = 'data:image/jpeg;base64,'+imageData;
      // if (this.platform.is('android')) {
      //   this.filePath.resolveNativePath(imagePath)
      //     .then(filePath => {
      //       let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
      //       let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1);
      //       // this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      //   console.log(correctPath)
      //   console.log(currentName)
      //       this.imageURI=this.file.readAsDataURL(correctPath,currentName).then((imageData)=>{
      //         console.log(imageData)
      //       },(err)=>{
      //         console.log(err)
      //       })


      //       console.log(this.imageURI)
      //     });
      // } else {
      //   var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      //   var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      //   // this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      // }
    }, (err) => {
      console.log(err);
      // this.presentToast(err);
    });
  }

  uploadFile(){
    // let loader = this.loadingCtrl.create({
    //   content: "Uploading..."
    // });
    // loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();

    let options: FileUploadOptions = {
      fileKey: 'ionicfile',
      fileName: 'ionicfile',
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {

      }
    }

    fileTransfer.upload(this.imageURI, this.appGlobal.uploadImageURL, options)
      .then((data) => {
        console.log(data+" Uploaded Successfully");
        // this.imageFileName = "http://127.0.0.1:3000/static/images/ionicfile.jpg"
        // loader.dismiss();
        // this.presentToast("Image uploaded successfully");
      }, (err) => {
        console.log(err);
        // loader.dismiss();
        // this.presentToast(err);
      });

  }



  submitSR(d){
    d["file"]=this.imageURI
    console.log("Create Service Request",d);
    
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    this.dataSetterService.createServiceRequests(d)
      .subscribe((data: any) => {
        console.log("Create Service Response", data);
        
        loading.dismiss();

        if (data.success) {
          this.events.publish('reload:serviceRequest');
          const toast = this.toastCtrl.create({
            message: data.message,
            duration: 3000
          });
          toast.present();
          if(this.navCtrl.canGoBack){
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

  logForm(form:NgForm){
    this.submitSR(form.value);
    console.log(form.value);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiceRequestFormPage');
  }

}
