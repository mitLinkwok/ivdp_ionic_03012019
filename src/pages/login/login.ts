import { Network } from '@ionic-native/network';
import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import { NavController, IonicPage, Events } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {UserData} from './../../providers/user-data-ts';
import {UserOptions} from '../../interfaces/user-options';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {


  
  login: UserOptions = {username: '', password: ''};
  submitted = false;


  constructor(public navCtrl: NavController, 
    public userData: UserData, 
    private alertCtrl: AlertController,
    public network:Network,
    public events:Events) {
    this.events.subscribe('user:error', () => {      
      this.login.password = '';
    });
  }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid && this.userData.isValid(this.login.username, this.login.password)) {
      this.userData.login(this.login.username, this.login.password);
    }
  }

  forgotPassword() {
    console.log("Forgot Password");
    let alert = this.alertCtrl.create({
      title: 'Forgot Password',
      subTitle: 'Enter your registered email',
      inputs: [
        {
          name: 'username',
          placeholder: 'Your Registered Email Address',
          type: 'email'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Submit',
          handler: data => {
            if (this.userData.isValid(null, null, data.username)) {
              console.log(data);
              this.userData.forgotPassword(data.username);
            } else {
              return false;
            }
          }
        }
      ]
    });
    alert.present();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    // if (this.network.type === 'none') {
    //   this.navCtrl.push(OfflinePage);
    // }
  }

}
