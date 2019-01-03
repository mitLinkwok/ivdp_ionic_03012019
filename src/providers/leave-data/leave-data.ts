import { AppGlobalProvider } from './../app-global/app-global';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {UserData} from '../user-data-ts';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import {LoadingController} from 'ionic-angular/components/loading/loading-controller';
import * as _ from "lodash";
import {ToastController} from 'ionic-angular/components/toast/toast-controller';
import { Events } from 'ionic-angular';


/*
  Generated class for the LeaveDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LeaveDataProvider {

  data: any;
  allLeavesData: any;
  pendingLeavesData: any;
  userData: any;
  loading: any;
  segment: string;
  isUserAvailable:boolean = true;


  constructor(public http: HttpClient, public user: UserData, public loadingCtrl: LoadingController, 
    public toastCtrl: ToastController,
    public appGlobal:AppGlobalProvider,
    public events:Events) {
    console.log('Hello LeaveDataProvider Provider');
  }

  // load():any {
  //   this.user.getUserData().then((value) => {
  //     this.userData = value;
  //     return this.loadLeaves().then(() => {

  //     });
  //   });
  // }

  load(update: boolean, segment: string) {
    if(!this.isUserAvailable){
      update = true;
    }
    this.userData = this.user.userData;
    this.segment = segment;
    console.log("Update & Segment", update, segment);
    if (segment === 'all') {
      if (this.allLeavesData && !update
        && (this.userData.employee_id === this.allLeavesData.employee_id)) {
        this.data = this.allLeavesData;
        return Observable.of(this.data);
      } else {
        this.loading = this.loadingCtrl.create({
          content: 'Please wait...'
        });
        this.loading.present();
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          })
        };
        const body = {
          Emp_Code: this.userData.employee_id,
          FromDate: "01/01/1800",
          ToDate: "01/01/2099"
        };
        return this.http.post(this.appGlobal.getLeaveApplicationsURL, body, httpOptions)
          .map(this.processData, this)
          .catch((err:any) => {
            console.log("Error",err);
            return Observable.of(this.processData(err.error));
          });
      }
    } else if (segment === 'pending') {
      console.log("update & segment", update, segment);
      if (this.pendingLeavesData && !update
        && (this.userData.employee_id === this.pendingLeavesData.employee_id)) {
        this.data = this.pendingLeavesData;
        return Observable.of(this.data);
      } else {
        this.loading = this.loadingCtrl.create({
          content: 'Please wait...'
        });
        this.loading.present();
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          })
        };
        const body = {
          Emp_Code: this.userData.employee_id
        };
        return this.http.post(this.appGlobal.pendingLeaveApplicationsURL, body, httpOptions)
          .map(this.processData, this)
          .catch((err: any) => {
            console.log("Error", err);
            return Observable.of(this.processData(err.error));
          });
      }
    }
  }

  processData(data: any) {
    this.loading.dismiss();
    console.log("========================", data);
    console.log("++++++++++++++++++++++++++", this.segment);
    data.segment = this.segment;
    data.employee_id = this.userData.employee_id;
    if (!_.isArray(data.data)) {
      data.data = [];
      if(data.message){
        if(data.message == this.appGlobal.OrangeNoUserAvailable){
          this.isUserAvailable = false;
          this.events.publish('leaves:exit');
        }
        const toast = this.toastCtrl.create({
          message: data.message,
          duration: 3000
        });
        toast.present();
      }
    }
    if (this.segment === 'all') {
      this.allLeavesData = data;
    } else if (this.segment === 'pending') {
      this.pendingLeavesData = data;
    }
    this.data = data;
    return this.data;
  }

  getLeaves(update: boolean, queryText = '', excludeLeaveType: any[] = [], excludeLeaveStatues: any[] = [], segment = 'all') {
    console.log("segment", segment);

    return this.load(update, segment).map((data: any) => {
      if (!_.isArray(data.data)) {
        data.data = [];
      }
      data.shownLeaves = 0;

      queryText = queryText.toLowerCase().replace(/,|\.|-/g, ' ');
      let queryWords = queryText.split(' ').filter(w => !!w.trim().length);

      data.data.forEach((leave: any) => {
        this.filterLeaves(leave, queryWords, excludeLeaveType, excludeLeaveStatues, segment);

        if (!leave.hide) {
          data.shownLeaves++;
        }
      });

      return data;
    });
  }

  filterLeaves(leave: any, queryWords: string[], excludeLeaveType: any[], excludeLeaveStatues: any[], segment: string) {
    let matchesQueryText = false;
    if (queryWords.length) {
      queryWords.forEach((queryWord: string) => {
        if (leave.Leave_Reason.toLowerCase().indexOf(queryWord) > -1) {
          matchesQueryText = true;
        }
      });
    } else {
      matchesQueryText = true;
    }

    let matchesLeaveType = false;
    if (excludeLeaveType.indexOf(leave.Leave_Name) === -1) {
      matchesLeaveType = true;
    }

    let matchesLeaveStatus = false;
    if (excludeLeaveStatues.indexOf(leave.AppStatus) === -1) {
      matchesLeaveStatus = true;
    }

    leave.hide = !(matchesQueryText && matchesLeaveType && matchesLeaveStatus);
  }

  loadCurrent() {
    return Observable.of(this.data.data);
  }

  getLeaveTypes() {
    return this.loadCurrent().map((data: any) => {
      // console.log(data);
      let leaveTypes = _.uniq(data.map(leave => leave.Leave_Name)).sort();
      console.log(leaveTypes);

      return leaveTypes;
    });
  }

  getLeaveStatus() {
    return this.loadCurrent().map((data: any) => {
      // console.log(data);
      let leaveStatues = _.uniq(data.map(leave => leave.AppStatus)).sort();
      console.log(leaveStatues);

      return leaveStatues;
    });
  }

  doLeaveApproval(leaveData, application_status, application_comment) {
    return new Promise(resolve => {
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present();
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      };
      const body = {
        UserEmpID: leaveData.Emp_ID.toString(),
        Cmp_ID: leaveData.Cmp_ID.toString(),
        Leave_ID: leaveData.Leave_ID.toString(),
        Leave_Application_ID: leaveData.Leave_Application_ID.toString(),
        From_Date: leaveData.From_Date.toString(),
        Leave_Period: leaveData.Leave_Period.toString(),
        To_Date: leaveData.To_Date.toString(),
        Comment: leaveData.Leave_Reason.toString(),
        AppStatus: application_status.toString(),
        AppComment: application_comment.toString(),
        Final_Approver: leaveData.Final_Approver.toString(),
        Is_Fwd_Leave_Rej: leaveData.Is_Fwd_Leave_Rej.toString(),
        Rpt_Level: leaveData.Rpt_Level.toString(),
        Emp_Code: this.userData.employee_id.toString(),
      };
      this.http.post(this.appGlobal.leaveApprovalURL, body, httpOptions).subscribe(data => {
        loading.dismiss();
        console.log("Leave Approval Resolved");
        resolve(data);
      }, err => {
        console.log("Leave Approval", err);
        loading.dismiss();
        const toast = this.toastCtrl.create({
          message: "Sorry someting went wrong, Please try later",
          duration: 3000
        });
        toast.present();
      });
    });
  }

  loadLeaveDetails(Leave_Application_ID) {
    console.log("Leave_Application_ID", Leave_Application_ID);
    return new Promise(resolve => {
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present();
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      };
      const body = {
        LeaveAppId: Leave_Application_ID.toString()
      };
      this.http.post(this.appGlobal.leaveDetailsURL, body, httpOptions).subscribe(data => {
        loading.dismiss();
        console.log("Leave Application Details Resolved");
        resolve(data);
      }, err => {
        console.log("Leave Application Details", err);
        loading.dismiss();
        const toast = this.toastCtrl.create({
          message: "Sorry someting went wrong, Please try later",
          duration: 3000
        });
        toast.present();
      });
    });
  }

  loadLeaveRecords(){
    return new Promise(resolve => {
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present();
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      };
      const body = {
        Emp_Code: this.userData.employee_id.toString()
      };
      this.http.post(this.appGlobal.leaveRecordsURL, body, httpOptions).subscribe(data => {
        loading.dismiss();
        console.log("Leave Records Resolved");
        resolve(data);
      }, err => {
        console.log("Leave Records", err);
        loading.dismiss();
        const toast = this.toastCtrl.create({
          message: "Sorry someting went wrong, Please try later",
          duration: 3000
        });
        toast.present();
      });
    });
  }

  checkScheme(leaveType:string){
    return new Promise(resolve => {
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present();
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      };
      const body = {
        Emp_Code: this.userData.employee_id.toString(),
        LeaveID: leaveType.toString()
      };
      this.http.post(this.appGlobal.checkSchemeURL, body, httpOptions).subscribe(data => {
        loading.dismiss();
        console.log("Check Scheme Resolved");
        resolve(data);
      }, err => {
        console.log("Check Scheme Records", err);
        loading.dismiss();
        const toast = this.toastCtrl.create({
          message: "Sorry someting went wrong, Please try later",
          duration: 3000
        });
        toast.present();
      });
    });
  }

  getHalfLeaveRecords(leaveApplication:any){
    return new Promise(resolve => {
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present();
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      };
      const body = {
        Emp_Code: this.userData.employee_id.toString(),
        FromDate: leaveApplication.fromDate.toString(),
        Period: leaveApplication.period.toString()
      };
      this.http.post(this.appGlobal.getHalfLeaveRecordsURL, body, httpOptions).subscribe(data => {
        loading.dismiss();
        console.log("Get Half Leave Records Resolved");
        resolve(data);
      }, err => {
        console.log("Get Half Leave Records", err);
        loading.dismiss();
        const toast = this.toastCtrl.create({
          message: "Sorry someting went wrong, Please try later",
          duration: 3000
        });
        toast.present();
      });
    });
  }

  leaveApplication(leaveApplication:any,strType:string){
    return new Promise(resolve => {
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present();
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      };
      let body:any = {};
      if(strType === 'I'){
        body = {
          Emp_Code: this.userData.employee_id.toString(),
          LeaveID: leaveApplication.leaveType.toString(),
          FromDate: leaveApplication.fromDate.toString(),
          Period: leaveApplication.period.toString(),
          Todate: leaveApplication.toDate.toString(),
          AssignAs: leaveApplication.assignAs.toString(),
          Comment: leaveApplication.comment.toString(),
          HLeaveDate: leaveApplication.halfLeaveDate.toString(),
          strType: strType.toString(),
        };
      } else if(strType === 'V'){
        body = {
          Emp_Code: this.userData.employee_id.toString(),
          LeaveID: leaveApplication.leaveType.toString(),
          FromDate: leaveApplication.fromDate.toString(),
          Period: leaveApplication.period.toString(),
          strType: strType.toString(),
        };
      }
      this.http.post(this.appGlobal.leaveApplicationURL, body, httpOptions).subscribe(data => {
        loading.dismiss();
        console.log("Leave Application "+strType+" Resolved");
        resolve(data);
      }, err => {
        console.log("Leave Application " + strType, err);
        loading.dismiss();
        const toast = this.toastCtrl.create({
          message: "Sorry someting went wrong, Please try later",
          duration: 3000
        });
        toast.present();
      });
    });
  }

}
