import { LeaveConfirmPage } from './../leave-confirm/leave-confirm';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import {UserData} from "../../providers/user-data-ts";
import {LeaveDataProvider} from "../../providers/leave-data/leave-data";

/**
 * Generated class for the LeaveNewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-leave-new',
  templateUrl: 'leave-new.html',
})
export class LeaveNewPage {
  today = new Date(); 
  date = this.today.toISOString();
  dateString = this.zerofill(this.today.getDate())+'/'+(this.zerofill(this.today.getMonth() + 1))+'/'+this.today.getFullYear();
  leaveApplication:any = {
    leaveType: '',
    formDate: '',
    fromDate: '',
    period:'',
    toDate: '',
    assignAs:'Full Day',
    halfLeaveDate:'',
    comment:''
  };
  previousFormDate:any = '';
  checkSchemeStatus:boolean;
  validateLeaveStatus:boolean;
  enableHalfLeave:boolean = false;
  leave_types:any = [];
  halfLeaveRecords:any = [];
  allHalfLeaveRecords:any = [];

  constructor(public navCtrl: NavController, 
    public userData: UserData,
    public leaveData:LeaveDataProvider, 
    public navParams: NavParams,
    public toastCtrl:ToastController,
    public alertCtrl:AlertController,
    public modalCtrl:ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeaveNewPage');
    this.leaveData.loadLeaveRecords().then((data:any)=>{
      console.log(data);
      this.leave_types = data.data;
    });
  }

  zerofill(i){
    return (i < 10 ? '0' : '') + i;
  }

  clearFields(){
    if (this.previousFormDate !== ''){
      if(this.previousFormDate !== this.leaveApplication.formDate){
        this.leaveApplication.period = '';
        this.leaveApplication.toDate = '';
        this.leaveApplication.assignAs = 'Full Day';
        this.leaveApplication.comment = '';
        this.enableHalfLeave = false;
      }
    }
  }

  checkScheme(){
    console.log(this.leaveApplication.leaveType);
    
    this.leaveData.checkScheme(this.leaveApplication.leaveType).then((data: any) => {
      console.log(data);
      this.checkSchemeStatus = data.success;
      this.leaveApplication.formDate = this.date;
      if(!data.success){
        const toast = this.toastCtrl.create({
          message: data.message,
          duration: 3000
        });
        toast.present();
      }
    });
  }

  processPeriod(){
    // let leavePeriodRegex = /^\d{1,2}(\.5|\d{1,2})?$/g;
    let leavePeriodRegex = /^\d{1,2}(\.5)$/g;
    console.log(this.leaveApplication);
    this.previousFormDate = this.leaveApplication.formDate;
    let formDate = new Date(this.leaveApplication.formDate);
    let fromDate = formDate.getDate()+'/'+(formDate.getMonth()+1)+'/'+formDate.getFullYear();
    console.log(fromDate);
    this.leaveApplication.fromDate = fromDate;
    if(this.leaveApplication.period !== ''){
      this.leaveApplication.assignAs = 'Full Day';
      this.leaveApplication.toDate = '';
      this.leaveApplication.comment = '';
      if (this.leaveApplication.period.indexOf('.') !== -1) {
        if (!leavePeriodRegex.test(this.leaveApplication.period)) {
          const toast = this.toastCtrl.create({
            message: "No. of Days can have decimal value as .5 only",
            duration: 5000
          });
          toast.present();
        } else {
          this.leaveValidation();
          this.enableHalfLeave = true;
          this.leaveData.getHalfLeaveRecords(this.leaveApplication).then((data: any) => {
            console.log(data);
            if (data.success) {
              this.allHalfLeaveRecords = data.data; 
              this.halfLeaveRecords = [];
              data.data.forEach(record => {
                if (record.leavedetails === 'Working Day') {
                  this.halfLeaveRecords.push(record.Applieddates);
                  this.leaveApplication.halfLeaveDate = record.Applieddates;
                }
              });
              this.leaveApplication.assignAs = "Second Half";
              this.showLeaveDetail();
            } else {
              const toast = this.toastCtrl.create({
                message: data.message,
                duration: 3000
              });
              toast.present();
            }
          });
        }
      } else {
        this.enableHalfLeave = false;
        this.leaveValidation();
        this.leaveData.getHalfLeaveRecords(this.leaveApplication).then((data: any) => {
          console.log(data);
          if (data.success) {
            this.allHalfLeaveRecords = data.data;
            this.showLeaveDetail();
          } else {
            const toast = this.toastCtrl.create({
              message: data.message,
              duration: 3000
            });
            toast.present();
          }
        });
      }
    } else {
      const toast = this.toastCtrl.create({
        message: "No. of Days is required",
        duration: 3000
      });
      toast.present();
    }    
  }

  showLeaveDetail(){
    if (this.allHalfLeaveRecords) {
      let leaveDaysModal = this.modalCtrl.create(LeaveConfirmPage, {allHalfLeaveRecords:this.allHalfLeaveRecords});
      leaveDaysModal.present();
    }
  }

  leaveValidation(){
    this.leaveData.leaveApplication(this.leaveApplication, 'V').then((data: any) => {
      console.log(data);
      this.validateLeaveStatus = data.success;
      if (data.success) {
        this.leaveApplication.toDate = data.Todate;
      } else {
        const toast = this.toastCtrl.create({
          message: data.message,
          // duration: 3000,
          showCloseButton:true,
          closeButtonText:'OK'
        });
        toast.present();
        this.enableHalfLeave = false;
        // this.leaveApplication.formDate = '';
        this.leaveApplication.period = '';
      }
    });
  }

  onLeaveApplication(leaveApplicationForm: NgForm){
    console.log(leaveApplicationForm.value);
    this.leaveData.leaveApplication(this.leaveApplication, 'I').then((data: any) => {
      console.log(data);
      if (data.success) {
        let alert = this.alertCtrl.create({
          title: data.message,
          buttons: [
            {
              text: 'OK',
              handler: data => {
                this.navCtrl.pop();
              }
            },
          ]
        });
        // now present the alert on top of all other content
        alert.present();
      } else {
        const toast = this.toastCtrl.create({
          message: data.message,
          duration: 3000
        });
        toast.present();
      }
    });
  }

}
