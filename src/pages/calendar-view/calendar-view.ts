import { AppGlobalProvider } from './../../providers/app-global/app-global';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import {Component} from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { DataGetterServiceProvider } from '../../providers/data-getter-service/data-getter-service';

import {LeaveDetailsPage} from "../leave-details/leave-details";

// import {Calendar} from "@ionic-native/calendar";

// import { ItemSliding } from 'ionic-angular';

/**
 * Generated class for the CalendarViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calendar-view',
  templateUrl: 'calendar-view.html',
})



export class CalendarViewPage {

  public event :any;
  public holidaysList:any = [];
  public attendanceList:any = [];
  public isSelectedDayHoliday:boolean = false;
  public attendance:any;
  public initalAttendance:any = undefined;
  // public initalAttendance:any = {
  //     'for_date':"NA",
  //     'present':"NA",
  //     'in_time':"NA",
  //     'out_time':"NA",
  //     'working_hours':"NA"
  // };

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: HttpClient,public dataGetterService: DataGetterServiceProvider,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public appGlobal: AppGlobalProvider) {
    
    // this.attendance={
    //   'for_date':"NA",
    //   'present':"NA",
    //   'in_time':"NA",
    //   'out_time':"NA",
    //   'working_hours':"NA"
    // };

    // this.attendanceList = [
    //   {
    //     year: 2018,
    //     month: 2,
    //     date: 2,
    //     background: '#fff',
    //     color: 'red',
    //     data: {
    //       test12:'test12',
    //       test22:'test22'
    //     }
    //   },
    //   {
    //     year: 2018,
    //     month: 2,
    //     date: 9,
    //     background: '#CBF1D9',
    //     color: '#006029',
    //     data: {
    //       test19: 'test19',
    //       test29: 'test29'
    //     }
    //   },
    //   {
    //     year: 2018,
    //     month: 2,
    //     date: 10,
    //     background: '#FFD3D7',
    //     color: '#7C0820',
    //     data: {
    //       test110: 'test110',
    //       test210: 'test210'
    //     }
    //   },{
    //     year: 2018,
    //     month: 2,
    //     date: 8,
    //     background: "#BDBDBD",
    //     color: "#FFFFFF",
    //     data: {
    //       test18: 'test18',
    //       test28: 'test28'
    //     }
    //   },{
    //     year: 2018,
    //     month: 2,
    //     date: 11,
    //     background: "#FEF8C9",
    //     color: "#876A00",
    //     data: {
    //       test111: 'test111',
    //       test211: 'test211'
    //     }
    //   }
    // ];
  }

  getAttendance(attendance,event) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    this.dataGetterService.loadAttendance(attendance)
      .subscribe((data: any) => {
        console.log("Calendar Attendance Loaded", data);

        if (data.success) {
          let att = data.attendance;
          if (Object.keys(att).length == 0){
            this.attendance = this.initalAttendance;
          } else {
            this.attendance = att;
            this.setIsSelectedDayHoliday(event);
          }
        } else {
          this.attendance = this.initalAttendance;
          this.setIsSelectedDayHoliday(event);       
        }

        loading.dismiss();
      }, err => {
        console.log(err);
        this.attendance = this.initalAttendance;
        this.setIsSelectedDayHoliday(event);
        const toast = this.toastCtrl.create({
          message: this.appGlobal.ServerError,
          duration: 3000
        });
        toast.present();
        loading.dismiss();
      });
  }

  getHolidays() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    this.dataGetterService.loadHolidays()
      .subscribe((data: any) => {
        console.log("Calendar Holidays Loaded", data);

        if (data.success) {
          let holidays = data.holidays;
          if (Object.keys(holidays).length == 0) {
            this.holidaysList = [];
          } else {
            holidays.forEach(holiday => {
              this.holidaysList.push({
                year: holiday.year,
                month: holiday.month_numerical,
                date: holiday.day,
                reason: holiday.holiday_reason,
              });
            });
          }
        } else {
          this.holidaysList = [];
        }

        loading.dismiss();
        this.isTodayHoliday();
      }, err => {
        console.log(err);
        this.holidaysList = [];
        const toast = this.toastCtrl.create({
          message: this.appGlobal.ServerError,
          duration: 3000
        });
        toast.present();
        loading.dismiss();
      });
  }

  isTodayHoliday(){
    var date = new Date();
    var dateObj = {
      year: date.getFullYear(),
      month: date.getMonth(),
      date: date.getDate()
    };
    var i = 0, len = this.holidaysList.length;
    for (; i < len; i++) {
      if (this.holidaysList[i].year == dateObj.year && this.holidaysList[i].month == dateObj.month && this.holidaysList[i].date == dateObj.date) {
        this.isSelectedDayHoliday = true;
        return
      }
    }
    this.isSelectedDayHoliday = false;
  }

  onDaySelect(event){
    var attendanceDate;
    console.log("onDaySelect: ", event);
    
    attendanceDate = event.date+"/"+(event.month+1)+"/"+event.year;
    console.log("attendanceDate",attendanceDate);
    if (event.attendanceData === ""){
      this.getAttendance(attendanceDate,event);
    } else {
      this.attendance = event.attendanceData;
      this.setIsSelectedDayHoliday(event);
    }
  }

  onMonthSelect(event){
    console.log("onMonthSelect Event: ",event);

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    this.dataGetterService.loadMonthAttendance(event).subscribe((data: any) => {
      console.log("Calendar Month Attendance Loaded", data);

      if (data.success) {
        this.attendanceList = data.attendance;
      } else {
        this.attendanceList = [];
      }

      loading.dismiss();
    }, err => {
      console.log(err);
      this.attendanceList = [];
      const toast = this.toastCtrl.create({
        message: this.appGlobal.ServerError,
        duration: 3000
      });
      toast.present();
      loading.dismiss();
    });
  }

  swipeEvent(event, calendar){
    if (event.direction === 2) {
      calendar.toNextDay();
    }
    if (event.direction === 4) {
      calendar.toPreviousDay();
    }
  }
  
  ionViewDidLoad(){
    console.log('ionViewDidLoad CalendarViewPage');
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter CalendarViewPage');
    this.getHolidays();
  }

  setIsSelectedDayHoliday(event){
    console.log("setIsSelectedDayHoliday",this.attendance);
    if (this.attendance) {
      switch (this.attendance.present) {
        case "HO":
          this.isSelectedDayHoliday = true;
          console.log("setIsSelectedDayHoliday", "HO");
          break;

        default:
          this.isSelectedDayHoliday = false;
          console.log("setIsSelectedDayHoliday","DEFAULT");
          break;
      }
    } else {
      this.isSelectedDayHoliday = event.isHoliday;
    }
    console.log("setIsSelectedDayHoliday", this.isSelectedDayHoliday);
  }

  goToLeaveDetailsPage(){
    this.navCtrl.push(LeaveDetailsPage);
  }

}