import { Network } from '@ionic-native/network';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, MenuController } from 'ionic-angular';
import { AppGlobalProvider } from '../../providers/app-global/app-global';

/**
 * Generated class for the OfflinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-offline',
  templateUrl: 'offline.html',
})
export class OfflinePage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public network: Network,
    public appGlobal: AppGlobalProvider,
    public events: Events,
    public menuCtrl: MenuController) {

    console.log("TYPE: ", this.network.type);
  }

  ionViewDidEnter() {
    //this.appGlobal.isOnline = false;
    this.appGlobal.isOnline = true;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad OfflinePage');
    // if(this.menuCtrl.isOpen()){
    //   this.menuCtrl.close();
    // }
  }

  ionViewCanLeave(): boolean {
    return this.appGlobal.isOnline;
    // here we can either return true or false
    // depending on if we want to leave this view
  }

  // refresh(refresher) {
  //   setTimeout(() => {
  //     //   let network_type = this.network.type;
  //     //   if (network_type != "none"){
  //     //     this.appGlobal.isOnline = false;
  //     //     if (this.navCtrl.canGoBack){
  //     //       this.navCtrl.pop();
  //     //     } else {
  //     //       this.events.publish('app:setRootAsHome');
  //     //     }
  //     //   }
  //     //   refresher.complete();
  //     // }, 2000);
  //   }
  // }

}
