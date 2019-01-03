import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the LeaveConfirmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-leave-confirm',
  templateUrl: 'leave-confirm.html',
})
export class LeaveConfirmPage {

  allHalfLeaveRecords:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl:ViewController ) {
    console.log("LeaveConfirmPage", this.navParams.get('allHalfLeaveRecords'));
    
    this.allHalfLeaveRecords = this.navParams.get('allHalfLeaveRecords');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeaveConfirmPage');
  }

  cancel(){
    this.viewCtrl.dismiss();
  }
}
