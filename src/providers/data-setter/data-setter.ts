import {LoadingController} from 'ionic-angular/components/loading/loading-controller';
import {UserData} from './../user-data-ts';
import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {AppGlobalProvider} from '../app-global/app-global';
import {Events, ToastController} from 'ionic-angular';
import {FileTransfer, FileUploadOptions, FileTransferObject} from '@ionic-native/file-transfer';

/*
  Generated class for the DataSetterProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataSetterProvider {

  constructor(public http: HttpClient,
              public events: Events,
              public appGlobal: AppGlobalProvider, public user: UserData,
              public loadingCtrl: LoadingController, public toastCtrl: ToastController,
              public transfer: FileTransfer) {
    console.log('Hello DataSetterProvider Provider');
  }
  Authorization
  getHTTPOptions() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      
        'Authorization': 'Bearer '+ this.user.userData.auth_token
        // 'Version': this.appGlobal.applicationVersion
      })
    };
    return httpOptions;
  }
sendNotificationToken() {
    // console.log("sendNotificationToken Called",this.appGlobal.fcmToken,this.user.hasLoggedIn,this.appGlobal.fcmTokenStatus);
    if (this.user.fcmToken !== '' && this.user.hasLoggedIn && !this.user.fcmTokenStatus) {
      const body = {
        previous_token: this.user.previousToken,
        token: this.user.fcmToken
      };
      this.http.post(this.appGlobal.sendNotificationURL, body, this.getHTTPOptions()).subscribe((data: any) => {
        console.log("Send Notification", data);
        if (!!data.success) {
          this.events.publish("fcm_token:sent");
        }
      }, err => {
        console.log("Send Notification", err);
      });
    } else {
      console.log("FCM TOKEN ERROR");
    }
  }
  sendNotificationClear() {
    console.log("Clear Notification Token Called");
    if (this.user.fcmToken !== '') {
      const body = {
        token: this.user.fcmToken
      };
      this.http.post(this.appGlobal.clearNotificationURL, body, this.getHTTPOptions()).subscribe((data: any) => {
        console.log("Clear Notification", data);
      }, err => {
        console.log("Clear Notification", err);
      });
    }
  }

  createServiceRequests(data) {
    return this.http.post(this.appGlobal.createServiceRequestsURL, data, this.getHTTPOptions());
  }

  createIdea(data) {
    return this.http.post(this.appGlobal.createIdeaURL, data, this.getHTTPOptions());
  }

  createGrievance(data) {
    return this.http.post(this.appGlobal.createGrievancesURL, data, this.getHTTPOptions());
  }

  updateServiceRequestState(data) {
    return this.http.post(this.appGlobal.changeServiceRequestStateURL, data, this.getHTTPOptions());
  }

  snoozeNotification(body) {
    console.log("Snooze Notification Called");
    return this.http.post(this.appGlobal.snoozeNotificationURL, body, this.getHTTPOptions());
  }

  markReadNotification(body) {
    console.log("Mark Read Notification Called");
    return this.http.post(this.appGlobal.markNotificationReadURL, body, this.getHTTPOptions());
  }

  sendLunchResponse(data: string) {
    const body = {
      decision: data
    };

    this.http.post(this.appGlobal.setLunchStatus, body, this.getHTTPOptions()).subscribe((data: any) => {
      console.log("Lunch Status Response", data);
    }, err => {
      console.log("Lunch Status Response", err);
    });
  }

  likeArticle(body: any) {
    console.log("Likes Body", body);
    return this.http.post(this.appGlobal.setLikes, body, this.getHTTPOptions());
  }

  sendComment(body: any) {
    console.log("Comment Body", body);
    return this.http.post(this.appGlobal.setComment, body, this.getHTTPOptions());
  }

  setTags(body: any) {
    console.log("Set Tags Body", body);
    return this.http.post(this.appGlobal.setTags, body, this.getHTTPOptions());
  }

  allocateUser(body: any) {
    console.log("Allocate User Body", body);
    return this.http.post(this.appGlobal.allocateUser, body, this.getHTTPOptions());
  }

  setUpdatedUserProfile(body: any) {
    console.log("Update User Profile Body", body);
    return this.http.post(this.appGlobal.setUpdatedUserProfile, body, this.getHTTPOptions());
  }

  fileTransfer(filePath: string) {
    const fileTransfer: FileTransferObject = this.transfer.create();

    let options: FileUploadOptions = {
      chunkedMode: false,
      headers: {
        'Authorization': 'Token token=' + this.user.userData.auth_token,
        'Version': this.appGlobal.applicationVersion,
      }
    };

    console.log("File Upload Options",options);
    return fileTransfer.upload(filePath, this.appGlobal.profilePictureImageURL, options, true);
  }

  // Guest Lunch Request
  createGuestLunch(data) {
    return this.http.post(this.appGlobal.createGuestLunch, data, this.getHTTPOptions());
  }

  // Visiting Card Request
  createVisitingCard(data) {
    return this.http.post(this.appGlobal.createVisitingCard, data, this.getHTTPOptions());
  }

  // Stationery Request
  createStationeryRequest(data) {
    return this.http.post(this.appGlobal.createStationeryRequest, data, this.getHTTPOptions());
  }

  // Maintenance Request
  createMaintenanceRequest(data) {
    try{
    return this.http.post(this.appGlobal.createMaintenanceRequest, data, this.getHTTPOptions());
  }catch (ErrorHandler ){
    console.log("#####################",ErrorHandler)
    
  }
  }

  // Access Card Request
  createAccessCardRequest(data) {
    return this.http.post(this.appGlobal.createAccessCardRequest, data, this.getHTTPOptions());
  }

  // Guest Room Request
  createGuestRoomRequest(data) {
    return this.http.post(this.appGlobal.createGuestRoomRequest, data, this.getHTTPOptions());
  }
  recordCanteenFacilityUsage(data) {
    return this.http.post(this.appGlobal.canteenFacilityUsage, data, this.getHTTPOptions());
  }




  gatsuervysrequest(data){
    return this.http.post(this.appGlobal.gesuervyrequest,data,this.getHTTPOptions());
  }
  submitanswerrequest(data){
    return this.http.post(this.appGlobal.answersrequest,data,this.getHTTPOptions());
  }




  

}
 