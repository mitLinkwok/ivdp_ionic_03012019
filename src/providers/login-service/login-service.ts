


import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { Vibration } from '@ionic-native/vibration';
import { AppGlobalProvider } from './../app-global/app-global';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

import { LoadingController } from 'ionic-angular/components/loading/loading-controller';


/*
  Generated class for the LoginServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginServiceProvider {

  constructor(public http: HttpClient,
    public loadingCtrl: LoadingController,
    public appGlobal: AppGlobalProvider,
    public vibrationCtrl: Vibration,
    public toastCtrl: ToastController) {
    console.log('Hello LoginServiceProvider Provider');
  }

  doLogin(username: string, password: string) {
    
    return new Promise(resolve => {
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present();
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
          // 'Version': this.appGlobal.applicationVersion
        })
      };
      const body = {
        email: username.trim(),
        password: password,
      };
      // alert(this.appGlobal.loginURL);
      // alert('data  ' + JSON.stringify(body));

      this.http.post(this.appGlobal.loginURL, body, httpOptions).subscribe(data => {
        loading.dismiss();
        // alert("Login Resolved");
        this.vibrationCtrl.vibrate(1000);
        resolve(data);
      }, (err:any) => {
        alert( JSON.stringify(err))
        console.log("error  ########       !   ", JSON.stringify(err)  )
        // alert(Object.keys(err));
         console.log("Login" + JSON.stringify(err));
        loading.dismiss();
        const toast = this.toastCtrl.create({
          message: this.appGlobal.ServerError,
          duration: 3000
        });
        toast.present();
      });
    });
  }


  doForgotPassword(email: string) {
    return new Promise(resolve => {
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present();
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Version': this.appGlobal.applicationVersion
        })
      };
      const body = {
        email: email
      };
      this.http.post(this.appGlobal.forgotPasswordURL, body, httpOptions).subscribe(data => {
        loading.dismiss();
        console.log("ForgotPassword Resolved");
        this.vibrationCtrl.vibrate(1000);
        resolve(data);
      }, err => {
        console.log("ForgotPassword", err);
        const toast = this.toastCtrl.create({
          message: this.appGlobal.ServerError,
          duration: 3000
        });
        toast.present();
        loading.dismiss();
      });
    });
  }
}