import { DataGetterServiceProvider } from './../../providers/data-getter-service/data-getter-service';
import { UserData } from './../../providers/user-data-ts';
import { AppGlobalProvider } from './../../providers/app-global/app-global';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

/**
 * Generated class for the UserblockPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-userblock',
  templateUrl: 'userblock.html',
})
export class UserblockPage {
  public canLeave = false;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,    
    public appGlobal: AppGlobalProvider,
    public userData: UserData,
    public events: Events,
    public dataGetter:DataGetterServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserblockPage');
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter UserblockPage');
    this.canLeave = false;

    if (!this.userData.userData.new_user){
      this.canLeave = true;
      this.events.publish('app:setRootAsHome');
    }
  }

  ionViewCanLeave(): boolean {
    // return this.canLeave;
    if(!this.appGlobal.isOnline){
      return true;
    } else {
      return this.canLeave;
    }
    // here we can either return true or false
    // depending on if we want to leave this view
  }

  refresh(refresher) {
    if(this.userData.userData.new_user){
      this.dataGetter.updateUserProfile({
        updated_at: this.userData.userData.updated_at
      }).subscribe((data: any) => {
        console.log('Get User Status', data);
        if (data.success) {
          this.userData.setUserData(data);
          if (!data.new_user) {
            this.canLeave = true;
            this.events.publish('app:setRootAsHome');
          }
        }
        refresher.complete();
      }, (error: any) => {
        console.log("updateUserProfile", error);
        refresher.complete();
      });
    } else {
      this.canLeave = true;
      this.events.publish('app:setRootAsHome');
    }
  }
}
