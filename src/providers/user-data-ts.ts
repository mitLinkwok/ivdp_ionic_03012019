import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { LoginServiceProvider } from './login-service/login-service';
import { Injectable } from '@angular/core';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/*
  Generated class for the UserDataTsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserData {
  HAS_LOGGED_IN = 'hasLoggedIn';
  userData:any;
  fcmToken:string;
  UserId:String;
  fcmTokenStatus: boolean = false;
  previousToken:string;
  hasLoggedIn:boolean;

  constructor(public events: Events, public storage: Storage, public loginserviceprovider: LoginServiceProvider, public alertCtrl:AlertController ) {

    this.getUserData().then((value)=>{
      this.userData = value;
    });

    this.getHasLoggedIn().then((value)=>{
      this.hasLoggedIn = value;
    });

    this.getUserToken().then((value)=>{
      this.fcmToken = value;
    });
    
    this.getUserTokenStatus().then((value)=>{
      this.fcmTokenStatus = value;
    });

  }

  login(username: string,password:string): void {
   
    this.loginserviceprovider.doLogin(username,password)
      .then((data:any) => {
        if (!!data.success){
          this.storage.set(this.HAS_LOGGED_IN, true);
          this.hasLoggedIn = true;
          this.setUserData(data);
          this.events.publish('user:login');
         
        } else {
          this.events.publish('user:error');
          let alert = this.alertCtrl.create({
            title: 'Login Failed',
            subTitle: data.message,
            buttons: ['Dismiss']
          });
          alert.present();
        }

      });
  };
  
  logout(): void {
    
    this.storage.clear();
    this.hasLoggedIn = false;
    this.previousToken = '';
    this.fcmToken = '';
    this.userData = '';
    this.fcmTokenStatus = false;
    alert("user data logout");
    // this.storage.remove(this.HAS_LOGGED_IN);
    // this.storage.remove('username');
    this.events.publish('user:logout');
  };






  setUsername(username: string): void {
    this.storage.set('username', username);
  };
  setUserID(userId:string):void{
    this.storage.set('userId',userId);
  }

  setUserFCMToken(token:string):void {
    if (this.fcmToken !== token){
      this.previousToken = this.fcmToken;
      this.fcmToken = token;
      this.storage.set('fcmToken', token);
      this.events.publish('fcmToken:changed');
    }
  };
  setUserFCMTokenStatus(status:boolean):void {
    this.fcmTokenStatus = status;
    this.storage.set('fcmTokenStatus', status);
  };

  setUserData(userData: JSON): void {
    this.userData = userData;
    //alert (JSON.stringify(userData));
    // this.userData.userprofile = "assets/img/user_image_sample.png"
    this.storage.set('userdata', userData);
    this.events.publish('userdata:changed');
  };













  getUserToken(){
    return this.storage.get('fcmToken').then((value)=>{
      return value;
    });
  };

  getUserTokenStatus(){
    return this.storage.get('fcmTokenStatus').then((value)=>{
      return value;
    });
  };

  getUserData(): Promise<string> {
    return this.storage.get('userdata').then((value) => {
      return value;
    });
  };

  getAuthToken(): Promise<string> {
    return this.storage.get('userdata').then((value) => {
      return value.auth_token;
    });
  };
  getUserId():Promise<string>{
    return this.storage.get('userdata').then((value)=>{
      return value.User_id;
    });

  };

  getName(): Promise<string> {
    return this.storage.get('userdata').then((value) => {
      return value.first_name;
    });
  };

  getEmployeeId(): Promise<string> {
    return this.storage.get('userdata').then((value) => {
      console.log("--------------------------------------",value.employee_id);
      return value.employee_id;
    });
  };

  getRole(): Promise<string> {
    return this.storage.get('userdata').then((value) => {
      return value.role;
    });
  };

  getEmail(): Promise<string> {
    return this.storage.get('userdata').then((value) => {
      return value.email;
    });
  };

  getUsername(): Promise<string> {
    return this.storage.get('username').then((value) => {
      return value;
    });
  };
  getHasLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  };














  isValid(username?:string,password?:string,email?:string){
    console.log("username",username);
    console.log("password",password);
    console.log("Email",email);
    let emailRegex = /[^@\s]+@[^@\s]+\.[^@\s]+/;
    if(!!email || email === ''){
      console.log("EMail Valid:",emailRegex.test(email));
      if (!emailRegex.test(email)){
        let alert = this.alertCtrl.create({
          title: 'Invalid Email Address',
          subTitle: "Please enter a valid email address",
          buttons: ['Dismiss']
        });
        alert.present();
        return false;
      }
    // } else if(!!username && !!password){
    //   let alert = this.alertCtrl.create({
    //     title: 'Invalid Username Or Password',
    //     subTitle: "Username or Password can't be blank",
    //     buttons: ['Dismiss']
    //   });
    //   alert.present();
    //   return false;
    }
    return true;
  }

  forgotPassword(email:string){
    console.log("Email:",email);
    this.loginserviceprovider.doForgotPassword(email)
      .then((data:any) => {
        console.log(data);
        let alert = this.alertCtrl.create({
          title: 'Forgot Password',
          subTitle: data.message,
          buttons: ['Dismiss']
        });
        alert.present();
      });
  }

}
