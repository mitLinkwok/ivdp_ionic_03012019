import { LeaveDataProvider } from './../../providers/leave-data/leave-data';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

/**
 * Generated class for the LeaveDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-leave-detail',
  templateUrl: 'leave-detail.html',
})
export class LeaveDetailPage {

  leave:any;
  segment:any;
  leaveDetails:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public leaveData: LeaveDataProvider,
    public toastCtrl: ToastController,
    public alertCtrl:AlertController,
    public events:Events) {
      console.log(this.navParams.data);
    this.leave = this.navParams.get("LeaveData");
    this.segment = this.navParams.get("segment");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeaveDetailPage');
  }

  ionViewWillEnter(){
    console.log('ionViewWillEnter LeaveDetailPage');
    this.leaveData.loadLeaveDetails(this.leave.Leave_Application_ID)
    .then((data:any) => {
      console.log(data);
      if (!!data.success) {
        this.leaveDetails = data.data[0];
      } else {
        const toast = this.toastCtrl.create({
          message: (data as any).message,
          duration: 3000
        });
        toast.present();
        this.navCtrl.pop();
      }
    });
  }

  ionViewDidEnter(){
    console.log(this.leaveDetails);
  }

  cancelLeave(){
    
  }

  leaveApproval(title: string, btntext: string, application_status: string) {
    title = btntext + " Leave";
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
          }
        },
        {
          text: btntext,
          handler: data => {
            console.log(this.leave, application_status, data.application_comment);
            if (data.application_comment !== '') {

              this.leaveData.doLeaveApproval(this.leave, application_status, data.application_comment)
                .then(data => {
                  console.log(data);
                  if (!!(data as any).success) {
                    const toast = this.toastCtrl.create({
                      message: (data as any).message,
                      duration: 3000
                    });
                    toast.present();
                    this.events.publish('reload:leaves');
                    this.navCtrl.pop();
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
    alert.present();
  }

}
