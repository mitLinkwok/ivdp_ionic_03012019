import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, IonicPage} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-grievance-filter',
  templateUrl: 'grievance-filter.html',
})
export class GrievanceFilterPage {
  grievanceWhose: Array<{ name: string, isChecked: boolean }> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
    public alertCtrl:AlertController) {
    console.log(this.navParams.data);
    
    let excludeWhoseGrievances = this.navParams.data.excludeWhoseGrievances;
    let grievanceWhoseList = this.navParams.data.grievanceWhoseList;

    grievanceWhoseList.forEach(whoseGrievance => {
      this.grievanceWhose.push({
        name: whoseGrievance,
        isChecked: (excludeWhoseGrievances.indexOf(whoseGrievance) !== -1)
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GrievanceFilterPage');
  }

  resetFilters() {
    // reset all of the toggles to be checked
    this.grievanceWhose.forEach(type => {
      type.isChecked = true;
    });
  }

  applyFilters() {
    // Pass back a new array of track names to exclude
    let excludeGrievance = this.grievanceWhose.filter(c => c.isChecked).map(c => c.name);
    console.log(excludeGrievance);
    this.dismiss(excludeGrievance);
  }

  dismiss(grievanceWhose?: any) {
    // using the injected ViewController this page
    // can "dismiss" itself and pass back data
    this.viewCtrl.dismiss(grievanceWhose);
  }

}
