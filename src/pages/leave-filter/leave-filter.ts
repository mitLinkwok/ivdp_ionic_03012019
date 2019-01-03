import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { LeaveDataProvider } from './../../providers/leave-data/leave-data';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, IonicPage} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-leave-filter',
  templateUrl: 'leave-filter.html',
})
export class LeaveFilterPage {
  leaveTypes: Array<{ name: string, isChecked: boolean }> = [];
  leaveStatues: Array<{ name: string, isChecked: boolean }> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,public leaveData:LeaveDataProvider,
    public alertCtrl:AlertController) {
    console.log(this.navParams.data);
    
    let excludedLeaveTypes = this.navParams.data.excludeLeaves;
    let excludedLeaveStatus = this.navParams.data.excludeStatues;

    this.leaveData.getLeaveTypes().subscribe((leaveTypes: string[]) => {

      leaveTypes.forEach(leavetype => {
        this.leaveTypes.push({
          name: leavetype,
          isChecked: (excludedLeaveTypes.indexOf(leavetype) === -1)
        });
      });

    });

    this.leaveData.getLeaveStatus().subscribe((leaveStatues: string[]) => {

      leaveStatues.forEach(leaveStatus => {
        this.leaveStatues.push({
          name: leaveStatus,
          isChecked: (excludedLeaveStatus.indexOf(leaveStatus) === -1)
        });
      });

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeaveFilterPage');
  }

  resetFilters() {
    // reset all of the toggles to be checked
    this.leaveTypes.forEach(type => {
      type.isChecked = true;
    });
    this.leaveStatues.forEach(status => {
      status.isChecked = true;
    });
  }

  applyFilters() {
    // Pass back a new array of track names to exclude
    let excludeLeaveType = this.leaveTypes.filter(c => !c.isChecked).map(c => c.name);
    let excludeLeaveStatus = this.leaveStatues.filter(c => !c.isChecked).map(c => c.name);
    this.dismiss(excludeLeaveType,excludeLeaveStatus);
  }

  dismiss(leaveTypes?: any,leaveStatus?:any) {
    // using the injected ViewController this page
    // can "dismiss" itself and pass back data
    this.viewCtrl.dismiss(leaveTypes,leaveStatus);
  }

  help(){
    let alert = this.alertCtrl.create({
      title: 'How it works?',
      message: 'Filter type of leaves along with status, aleast one type & one status should be selected for results',
      buttons: ['OK']
    });
    alert.present();
  }
}
