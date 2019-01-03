import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, IonicPage} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-idea-filter',
  templateUrl: 'idea-filter.html',
})
export class IdeaFilterPage {
  ideaWhose: Array<{ name: string, isChecked: boolean }> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
    public alertCtrl:AlertController) {
    console.log(this.navParams.data);
    
    let excludedWhoseIdeas = this.navParams.data.excludeWhoseIdeas;
    let ideaWhoseList = this.navParams.data.ideaWhoseList;

    ideaWhoseList.forEach(whoseIdea => {
      this.ideaWhose.push({
        name: whoseIdea,
        isChecked: (excludedWhoseIdeas.indexOf(whoseIdea) !== -1)
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IdeaFilterPage');
  }

  resetFilters() {
    // reset all of the toggles to be checked
    this.ideaWhose.forEach(type => {
      type.isChecked = true;
    });
  }

  applyFilters() {
    // Pass back a new array of track names to exclude
    let excludeIdeas = this.ideaWhose.filter(c => c.isChecked).map(c => c.name);
    console.log(excludeIdeas);
    this.dismiss(excludeIdeas);
  }

  dismiss(ideaWhose?: any) {
    // using the injected ViewController this page
    // can "dismiss" itself and pass back data
    this.viewCtrl.dismiss(ideaWhose);
  }

}
