import {AppGlobalProvider} from './../../providers/app-global/app-global';
import {LoadingController} from 'ionic-angular/components/loading/loading-controller';
import {DataSetterProvider} from './../../providers/data-setter/data-setter';
import {DataGetterServiceProvider} from './../../providers/data-getter-service/data-getter-service';
import {UserData} from './../../providers/user-data-ts';
import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, ActionSheetController} from 'ionic-angular';
import {FileTransfer} from '@ionic-native/file-transfer';
import {ImagePicker} from '@ionic-native/image-picker';
import {Crop} from '@ionic-native/crop';
import {Camera} from '@ionic-native/camera';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public edit: boolean = false;
  public profile: any;
  public edit_profile: any;
  public user_id: number;
  public showEditBtn: boolean = true;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userdata: UserData,
              public dataSetter: DataSetterProvider,
              public dataGetter: DataGetterServiceProvider,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              public appGlobal: AppGlobalProvider,
              public imagePicker: ImagePicker,
              public cropService: Crop,
              public camera: Camera,
              public transfer: FileTransfer,
              public actionSheetCtrl: ActionSheetController) {

    this.edit = false;
  }

  onSubmit(toggle) {
    if (this.edit) {
      delete this.edit_profile.auth_token;
      delete this.edit_profile.created_at;
      delete this.edit_profile.updated_at;
      delete this.edit_profile.success;
      delete this.edit_profile.new_user;
      delete this.edit_profile.id;

      console.log("User Profile Update", this.edit_profile);

      if (this.edit_profile.mobile.trim().length != 10  )
      {
        alert("Please fill a valid Mobile number");
        return false;
      }

      if (this.edit_profile.name.trim().length == 0  )
      {
        alert("Please fill Name");
        return false;
      }
      if (this.edit_profile.designation.trim().length == 0  )
      {
        alert("Please fill Designation");
        return false;
      }
      if (this.edit_profile.department.trim().length == 0  )
      {
        alert("Please fill Department");
        return false;
      }
      if (this.edit_profile.about_me.trim().length == 0  )
      {
        alert("Please fill About me");
        return false;
      }








      if (this.profile.profile !== this.edit_profile.profile) {

        let loading = this.loadingCtrl.create({
          content: 'Please while we update your profile picture..!!'
        });

        loading.present();

        this.dataSetter.fileTransfer(this.edit_profile.profile).then((data: any) => {
          data = JSON.parse(data.response);
          console.log(data);
          loading.dismiss();
          if (data.success) {
            this.edit_profile.profile = data.url;
            const toast = this.toastCtrl.create({
              message: data.message,
              duration: 5000
            });
            toast.present();
            this.updateProfile(toggle);
          } else {
            const toast = this.toastCtrl.create({
              message: data.message,
              duration: 5000
            });
            toast.present();
          }
        }).catch((error) => {
          console.log("File Transfer Error", error);
          loading.dismiss();
          const toast = this.toastCtrl.create({
            message: this.appGlobal.ServerError,
            duration: 5000
          });
          toast.present();
        });
      } else {
        this.updateProfile(toggle);
      }
    } else {
      this.edit = toggle;
    }
  }

  updateProfile(toggle) {
    let loading = this.loadingCtrl.create({
      content: 'Please while we update your profile..!!'
    });

    loading.present();

    this.dataSetter.setUpdatedUserProfile(this.edit_profile)
      .subscribe((data: any) => {
        console.log("User Profile Update Response", data);
        loading.dismiss();
        if (data.success) {
          const toast = this.toastCtrl.create({
            message: data.message,
            duration: 5000
          });
          toast.present();
          this.profile = Object.assign({}, this.edit_profile);
          this.edit = toggle;
        } else {
          const toast = this.toastCtrl.create({
            message: data.message,
            duration: 5000
          });
          toast.present();
        }
      }, err => {
        loading.dismiss();
        console.log(err);
        const toast = this.toastCtrl.create({
          message: this.appGlobal.ServerError,
          duration: 5000
        });
        toast.present();
      });
  }

  editImage() {
    // const toast = this.toastCtrl.create({
    //   message: "Feature Coming Soon",
    //   duration: 5000
    // });
    // toast.present();
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose or take a picture',
      buttons: [
        {
          text: 'Take a picture',
          handler: () => {
            this.takePicture();
          }
        },
        {
          text: 'Choose pictures',
          handler: () => {
            this.openImagePicker();
          }
        }
      ]
    });
    actionSheet.present();
  }

  takePicture() {
    let options =
      {
        quality: 100,
        correctOrientation: true
      };
    this.camera.getPicture(options)
      .then((data) => {
        this.cropService
          .crop(data, {quality: 75})
          .then((newImage) => {
            this.edit_profile.profile = newImage;
          }, error => console.error("Error cropping image", error));
      }, function (error) {
        console.log(error);
      });
  }

  openImagePicker() {
    let options = {
      maximumImagesCount: 1,
    }
    this.imagePicker.getPictures(options)
      .then((results) => {
        this.reduceImages(results).then(() => {
          console.log('all images cropped!!');
        });
      }, (err) => {
        console.log(err)
      });
  }

  reduceImages(selected_pictures: any): any {
    return selected_pictures.reduce((promise: any, item: any) => {
      return promise.then((result) => {
        return this.cropService.crop(item, {quality: 75})
          .then(cropped_image => {
            this.edit_profile.profile = cropped_image;
          });
      });
    }, Promise.resolve());
  }

  resetProfile() {
    this.profile = {};
    this.showEditBtn = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    if (this.navParams.get('user_id') != undefined)
      this.getUserProfile(this.navParams.get('user_id'));
    else {
      this.profile = Object.assign({}, this.userdata.userData);
      if (!this.profile.skill_set) {
        this.profile.skill_set = [];
      }
      this.showEditBtn = true;
    }

    this.edit_profile = Object.assign({}, this.profile);
  }

  ionViewDidLeave() {
    this.resetProfile();
  }

  getUserProfile(uid) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.dataGetter.getUserProfile(uid).subscribe((data: any) => {
      if (data.success) {
        this.profile = data;
        this.showEditBtn = false;
      }
      loading.dismiss();
    }, (error: any) => {
      console.log(error);
      this.resetProfile();
      const toast = this.toastCtrl.create({
        message: this.appGlobal.ServerError,
        duration: 3000
      });
      toast.present();
      loading.dismiss();
      this.navCtrl.pop();
    });
  }

}
