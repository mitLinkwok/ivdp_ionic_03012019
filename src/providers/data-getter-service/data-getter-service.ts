import { Observable } from 'rxjs/Observable';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { UserData } from './../user-data-ts';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { AppGlobalProvider } from '../app-global/app-global';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the DataGetterServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataGetterServiceProvider {

  constructor(public http: HttpClient, public appGlobal: AppGlobalProvider,
    public user: UserData,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) {
    console.log('Hello DataGetterServiceProvider Provider');
  }

  getHTTPOptions() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.user.userData.auth_token
      })
    };
    return httpOptions;
  }

  getSurveys() {
    // console.log(this.user.userData.auth_token)
    // console.log("%%%%%%%%%%%%% surveyUrl "+ this.appGlobal.allSurveysURL);
    return this.http.get(this.appGlobal.allSurveysURL, this.getHTTPOptions());
  }

  getServiceRequests() {
    console.log(this.user.userData.auth_token)
    return this.http.get(this.appGlobal.allServiceRequestsURL, this.getHTTPOptions());
  }

  getIdeas() {
    return this.http.get(this.appGlobal.allIdeaURL, this.getHTTPOptions());
  }

  getGrievances() {
    return this.http.get(this.appGlobal.allGrievancesURL, this.getHTTPOptions());
  }

  getGrievanceCategories() {
    return this.http.get(this.appGlobal.allGrievancesCategoriesURL, this.getHTTPOptions());
  }

  loadSRDetail(id) {
    return this.http.get(this.appGlobal.getServiceRequestURL + "/" + id, this.getHTTPOptions());
  }

  loadIdeaDetail(id) {
    return this.http.get(this.appGlobal.getIdeaURL + "/" + id, this.getHTTPOptions());
  }

  loadAttendance(attendance) {
    return this.http.get(this.appGlobal.attendanceURL + "?date=" + attendance, this.getHTTPOptions());
  }

  loadHolidays() {
    return this.http.get(this.appGlobal.getHolidayListURL, this.getHTTPOptions());
  }

  getArticles() {
    return this.http.get(this.appGlobal.getArticlesURL, this.getHTTPOptions());
  }

  getArticle(id) {
    return this.http.get(this.appGlobal.getArticleURL + "/" + id, this.getHTTPOptions());
  }

  getStaticPages() {
    return this.http.get(this.appGlobal.getStaticPagesURL, this.getHTTPOptions());
  }

  getStaticPage(id) {
    return this.http.get(this.appGlobal.getStaticPageURL + '/' + id, this.getHTTPOptions());
  }

  getAllNotifications() {
    return this.http.get(this.appGlobal.allNotificationsURL, this.getHTTPOptions());
  }

  loadLeaves() {
    const body = {
      Emp_Code: this.user.userData.employee_id,
      FromDate: "01/01/1800",
      ToDate: "01/01/2099"
    };

    return this.http.post(this.appGlobal.getLeaveApplicationsURL, body, this.getHTTPOptions());
  }

  getLunchStatus() {
    return this.http.get(this.appGlobal.getLunchStatus, this.getHTTPOptions());
  }

  public getSuggestions(body): Observable<any> {
    return this.http.post(this.appGlobal.getSuggestion, body, this.getHTTPOptions())
      .map((data: any) => data);
    // data.subscribe(res => console.log("RESPONSE",res));

  }

  public updateUserProfile(body) {
    return this.http.post(this.appGlobal.updateUserProfile, body, this.getHTTPOptions())
      .map((data: any) => data);
  }

  public updateMenuCounts() {
    return this.http.get(this.appGlobal.updateMenuCounts, this.getHTTPOptions())
      .map((data: any) => data);
  }

  public loadMonthAttendance(body) {
    return this.http.post(this.appGlobal.loadMonthAttendance, body, this.getHTTPOptions())
      .map((data: any) => data);
  }

  public getUserProfile(uid) {
    return this.http.get(this.appGlobal.getUserProfile + "/" + uid, this.getHTTPOptions());
  }

  // Guest Lunch Request
  public getAllGuestLunches() {
    return this.http.get(this.appGlobal.getAllGuestLunches, this.getHTTPOptions());
  }

  // Visiting Card Request
  public getAllVisitingCards() {
    return this.http.get(this.appGlobal.getAllVisitingCards, this.getHTTPOptions());
  }

  public getCompanyDetails() {
    return this.http.get(this.appGlobal.getCompanyDetails, this.getHTTPOptions());
  }

  // Stationery Request
  public getStationeries(l) {
    return this.http.get(this.appGlobal.getStationeries + "/" + l, this.getHTTPOptions());
  }

  public getAllStationeryRequests() {
    return this.http.get(this.appGlobal.getAllStationeryRequests, this.getHTTPOptions());
  }

  // Maintenance Request
  public getMaintenanceAssets() {
    return this.http.get(this.appGlobal.getMaintenanceAssets, this.getHTTPOptions());
  }

  public getAllMaintenanceRequests(data) {

    return this.http.get(this.appGlobal.getAllMaintenanceRequests +'?user_id='+data, this.getHTTPOptions());



  }

  public paggination(page: any) {
    var url = "http://165.227.139.76:8080/api/v1/beneficiaries?page=" + page;
    //alert(url)
   

    return   this.http.get(url,this.getHTTPOptions())
  }

  public paggination_hh(page:any){
    var url =" http://165.227.139.76:8080/api/v1/household?page="+page;
    return   this.http.get(url,this.getHTTPOptions())
  }

  // Access Card Request
  public getAllAccessCardRequests() {
    return this.http.get(this.appGlobal.getAllAccessCardRequests, this.getHTTPOptions());
  }

  // Guest Room Request
  public getRoomAddresses() {
    return this.http.get(this.appGlobal.getRoomAddresses, this.getHTTPOptions());
  }

  public getAllGuestRoomRequests() {
    return this.http.get(this.appGlobal.getAllGuestRoomRequests, this.getHTTPOptions());
  }

  public getGuestRoomRequest(uid) {
    return this.http.get(this.appGlobal.getGuestRoomRequest + "/" + uid, this.getHTTPOptions());
  }

  public getGuestLunchLocations() {
    return this.http.get(this.appGlobal.getGuestLunchLocations, this.getHTTPOptions());
  }
  public getGuestLunchTypes() {
    return this.http.get(this.appGlobal.getGuestLunchTypes, this.getHTTPOptions());
  }
  public getMRLocations() {
    return this.http.get(this.appGlobal.getMRLocations, this.getHTTPOptions());
  }
  public getLunchCategories() {
    return this.http.get(this.appGlobal.getLunchCategories, this.getHTTPOptions());
  }

  //rewards and redemption 
  public getMyAwards() {
    return this.http.get(this.appGlobal.getMyAwards, this.getHTTPOptions());
  }
 public gathouseholsrequest() {
  
    let data = {}
    return this.http.get(this.appGlobal.gethouseholdrequest, this.getHTTPOptions());
  }




}
