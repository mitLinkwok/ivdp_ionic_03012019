import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

import {HomePage} from '../home/home';
import { DBmaneger } from './../../providers/database/Dbmaneger';


/**
 * Generated class for the IntroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html'
})
export class IntroPage {
  public introContent: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: DBmaneger) {
    this.setIntroContent();
    this.db.getbenificialydata()
    this.db.getkycsdata();
    this.db.getsurvey();
    this.db.gethousehold()
    this.db.getQuestion();
   this.db.getOpections();
  

  }

  navHome() {
    this.navCtrl.setRoot(HomePage);
  }

  ionViewDidLoad() {
    // this.setIntroContent();
    console.log('ionViewDidLoad IntroPage');
  }

  setIntroContent() {
    let titles = ['Corporate Timings', "Plant Timings", "Leave Policy", "", "Health and wellness", '', 'Dress Code', '', '', 'Employee Engagement', 'Sharing Ideas', 'Travel Management']
    let images = ['corp_timings.png', ' factory_timings.png', 'leave_policy_holidays.png ', 'maternity_leave.png', 'death_coverage.png', 'yearly_checkup.png', 'dress_code.png', 'plant_dress_code.png', 'outside_building.png', 'birthdays.png', 'sharing_ideas.png', 'travel_bookings.png'];
    let contents = ["9.30 – 17.30  Mon-Sat  (2 flexi Saturday’s weekly off per  month)",
      "9.00 – 17.30  (General  shift)<br> 7.00 - 15.00 (1st Shift)<br> 15.00  –  23.00  (2nd  shift)<br>  23.00  –  7.00  (3rd   shift) <br> Std. Working days: Mon-Sat ",
      "Employee can avail 10  days  of  casual  leave  & 10  days  of  sick  leave. Permanent  employees  get  24  days  of  privilege  leave ",
      "Expectant  mothers  get  26  weeks  of  maternity  leave.  Expectant  fathers  get  3  days  of  paternity  leave.  Adopting  families  get  5  days  of  leave.  ",
      "If  you’re  40  years  or  older,  you  get  free  health  checkup  yearly.  Your  spouse  gets  a  free  health  checkup  once  every  two  years.  ",
      "For  full-time  employees,spouse, two  children  (under  21) and dependent parents  will  be  covered  under  the  mediclaim  policy  up  to  Rs.  5  lac. ",
      "Corporate office: Men  –  Shirts  and  Trousers. <br> Women  –  Sari/Salwar/Office  formal  ",
      "Uniforms for all at Plant",
      "When  outside  the  office,  formal  ware  (suit  and  tie)  is  expected. ",
      "Get notificaiton about Birthdays,  Marriage Anniversary  and  Work  Anniversary  announcements in  Empower.  ",
      "Deepak  Group  encourages  sharing  Ideas, share your Ideas through Empower",
      "Travel  planning  and  booking  (local/domestic/international)  can be done from Empower. Approved  travel  will  automatically  be  converted  into  On  Duty  Leaves. ",
    ];

    for (let i = 0; i < images.length; i++) {
      this.introContent.push({image: "assets/img/" + images[i].trim(), content: contents[i], title: titles[i]})
    }
  }

}
