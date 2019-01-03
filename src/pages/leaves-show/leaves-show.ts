import { LeaveNewPage } from './../leave-new/leave-new';
import { LeaveDetailPage } from './../leave-detail/leave-detail';
import { Component, ViewChild} from '@angular/core';
import { Events, AlertController, App, ItemSliding, List, ModalController, NavController, ToastController, LoadingController, Refresher, IonicPage } from 'ionic-angular';

import { UserData } from '../../providers/user-data-ts';
import { LeaveDataProvider } from '../../providers/leave-data/leave-data';
import { LeaveFilterPage } from '../leave-filter/leave-filter';

@IonicPage()
@Component({
  selector: 'page-leaves-show',
  templateUrl: 'leaves-show.html',
})
export class LeavesShowPage {

  @ViewChild('LeavesList', { read: List }) LeavesList: List;

  queryText = '';
  segment = 'all';
  excludeLeaves: any = [];
  excludeStatues: any = [];
  shownLeaves: any = [];
  leaves: any = [];
  confDate: string;

  constructor(public alertCtrl: AlertController,
    public app: App,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public leaveData: LeaveDataProvider,
    public user: UserData,
    public events:Events,
  ) { 
    this.events.subscribe('reload:leaves', () => {
      this.updateLeaves(true,false);
    });
    this.events.subscribe('leaves:exit', () => {
      this.events.publish('app:setRootAsHome');
    });
  }

  ionViewDidLoad() {
    this.app.setTitle('Leaves');
    this.updateLeaves(false,false);
    console.log('ionViewDidLoad LeavesShowPage');
  }

  updateLeaves(update:boolean,segmentChanged:boolean) {
    console.log(update);
    if (segmentChanged){
      this.shownLeaves = 0;
      this.leaves = [];
    }

    // Close any open sliding items when the schedule updates
    this.LeavesList && this.LeavesList.closeSlidingItems();
    
    this.leaveData.getLeaves(update,this.queryText, this.excludeLeaves,this.excludeStatues, this.segment).subscribe((data: any) => {
      this.shownLeaves = data.shownLeaves;
      this.leaves = data.data;
    });
  }

  presentFilter() {
    let modal = this.modalCtrl.create(LeaveFilterPage, {excludeLeaves: this.excludeLeaves, excludeStatues:this.excludeStatues});
    modal.present();

    modal.onWillDismiss((leaveTypes: any[], leaveStatues: any[]) => {
      if (leaveTypes || leaveStatues) {
        this.excludeLeaves = leaveTypes;
        this.excludeStatues = leaveStatues;
        this.updateLeaves(false, false);
      }
    });

  }

  goToLeaveDetail(LeaveData: any) {
    this.navCtrl.push(LeaveDetailPage, {LeaveData:LeaveData, segment:this.segment});
  }

  goToNewLeave(){
    this.navCtrl.push(LeaveNewPage);
  }

  doRefresh(refresher: Refresher) {
    this.leaveData.getLeaves(true,this.queryText, this.excludeLeaves,this.excludeStatues, this.segment).subscribe((data: any) => {
      this.shownLeaves = data.shownLeaves;
      this.leaves = data.data;

      // simulate a network request that would take longer
      // than just pulling from out local json file
      setTimeout(() => {
        refresher.complete();
        if (data.message === 'Leave Application Records'){
          const toast = this.toastCtrl.create({
            message: 'Leaves have been updated.',
            duration: 3000
          });
          toast.present();
        }
      }, 1000);
    });
  }

  cancelLeave(slidingItem: ItemSliding, leaveData: any, title: string) {
    slidingItem.close();
    const toast = this.toastCtrl.create({
      message: "Feature is Currently Unavailable",
      duration: 3000
    });
    toast.present();
  }

  leaveApproval(slidingItem: ItemSliding, leaveData: any, title: string,btntext:string,application_status:string) {
    title = btntext+" Leave";
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: 'Are You Sure?',
      inputs: [
        {
          name: 'application_comment',
          placeholder: 'Comment',
          type: 'text'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            slidingItem.close();
          }
        },
        {
          text: btntext,
          handler: data => {
            console.log(leaveData, application_status, data.application_comment);
            if (data.application_comment !== ''){
              slidingItem.close();

              this.leaveData.doLeaveApproval(leaveData, application_status, data.application_comment)
                .then(data => {
                  console.log(data);
                  if (!!(data as any).success) {
                    this.updateLeaves(true, false);
                    const toast = this.toastCtrl.create({
                      message: (data as any).message,
                      duration: 3000
                    });
                    toast.present();
                  } else {
                    const toast = this.toastCtrl.create({
                      message: (data as any).message,
                      duration: 3000
                    });
                    toast.present();
                  }
                });
            } else {
              const toast = this.toastCtrl.create({
                message: "Comment is required",
                duration: 5000
              });
              toast.present();
            }
          }
        }
      ]
    });
    // now present the alert on top of all other content
    alert.present();
  }

}
