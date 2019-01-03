import { Vibration } from '@ionic-native/vibration';
import { AppGlobalProvider } from './../../providers/app-global/app-global';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events, LoadingController } from 'ionic-angular';
import { DataGetterServiceProvider } from '../../providers/data-getter-service/data-getter-service';
import {DataSetterProvider} from "../../providers/data-setter/data-setter";

/**
 * Generated class for the ServiceRequestShowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-service-request-show',
  templateUrl: 'service-request-show.html',
})
export class ServiceRequestShowPage {
  public initalServiceRequest: any = {
    uid: '',
    state: '',
    category: '',
    detail: '',
    attachment: [],
  };
  // public serviceRequest: any = this.initalServiceRequest;
  public serviceRequest: any;
  public items: any;
  public srid: any;
  public show_buttons:boolean = false;
  public rate:number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataGetterService: DataGetterServiceProvider, public dataSetterService: DataSetterProvider,
    public alertCtrl: AlertController, public toastCtrl:ToastController,
    public events:Events,
    public loadingCtrl: LoadingController,
    public appGlobal: AppGlobalProvider,
    public vibration: Vibration) {
    this.srid = this.navParams.get("id");
    this.loadSRDetails(null, this.srid);
    this.events.subscribe('reload:serviceRequestShow', (isNotification, id) => {
      this.srid = id;
      this.refreshPage(null);
    });
  }

  ionViewDidLoad(){
    console.log('ionViewDidLoad ServiceRequestShowPage');
    this.show_buttons = false;
    if(this.serviceRequest){
      if (this.serviceRequest.state === "Completed") {
        this.show_buttons = true
      }
      else {
        this.show_buttons = false
      }
      console.log(this.serviceRequest.state);
      console.log(this.serviceRequest["state"]);
    }
  }

  loadSRDetails(ref,id) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    if (ref === null) {
      loading.present();
    }

    this.dataGetterService.loadSRDetail(id)
      .subscribe((data: any) => {
        console.log("Service Request Details Loaded", data);

        if (data.success) {
          this.serviceRequest = data.service_request;
          this.items = data.timeline;
          if(this.serviceRequest){
            if (this.serviceRequest.state === "Completed") {
              this.show_buttons = true
            }
            else {
              this.show_buttons = false
            }
          }
        } else {
          // this.serviceRequest = this.initalServiceRequest;
          if (this.navCtrl.canGoBack()) {
            this.navCtrl.pop();
          }
          const toast = this.toastCtrl.create({
            message: data.message,
            duration: 3000
          });
          toast.present();
        }

        loading.dismiss();
        if (ref != null) {
          ref.complete();
        }
      }, err => {
        console.log(err);
        // this.serviceRequest = this.initalServiceRequest;
        const toast = this.toastCtrl.create({
          message: this.appGlobal.ServerError,
          duration: 3000
        });
        toast.present();
        loading.dismiss();
        if (ref != null) {
          ref.complete();
        }
        if (this.navCtrl.canGoBack()) {
          this.navCtrl.pop();
        }
      });
  }


  refreshPage(ev){
    this.loadSRDetails(ev, this.srid);
  }

  change_state(state){
    console.log(state)
    var title,comment;

    switch (state) {
      case 'closed':
        title = 'Close';
        comment = 'Closed';
        break;

      case 'reopen':
        title = 'Reopen'
        break;
      
      default:
        break;
    }

    if(state === 'reopen'){
      let alert = this.alertCtrl.create({
        // title: title,
        subTitle: 'Are You Sure?',
        inputs: [
          {
            name: 'comment',
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
            text: title,
            handler: data => {
              console.log(data.comment);
              if (data.comment !== '') {
                var request = { 
                  state: state, 
                  id: this.srid,
                  comment:data.comment
                };
                this.processRequest(request);
              } else {
                const toast = this.toastCtrl.create({
                  message: "Comment is mandatory",
                  duration: 5000
                });
                toast.present();
                // this.change_state(state);
              }
            }
          }
        ]
      });
      // now present the alert on top of all other content
      alert.present();
    } else {
      let alert = this.alertCtrl.create({
        title: 'Close Request ?',
        subTitle: 'Please rate the resolution',
        cssClass: 'alertstar',
        enableBackdropDismiss: true,
        buttons: [
          {
            text: 'Cancel',
            cssClass: 'alert-button-no-rating',
            handler: data => {
            }
          },
          {
            text: title,
            cssClass: 'alert-button-no-rating',
            handler: () => {
              var request = {
                state: state,
                id: this.srid,
                comment: comment,
                rating: 0,
              };
              this.processRequest(request);
            }
          },
          { text: '1', cssClass: 'stars', handler: data => { 
            var request = {
              state: state,
              id: this.srid,
              comment: comment,
              rating: 1,
            };
            this.processRequest(request);
            }
          },
          { text: '2', cssClass: 'stars', handler: data => { 
            var request = {
              state: state,
              id: this.srid,
              comment: comment,
              rating: 2,
            };
            this.processRequest(request);
           } 
          },
          { text: '3', cssClass: 'stars', handler: data => { 
            var request = {
              state: state,
              id: this.srid,
              comment: comment,
              rating: 3,
            };
            this.processRequest(request);
           } 
          },
          {
            text: '4', cssClass: 'stars', handler: data => {
              var request = {
                state: state,
                id: this.srid,
                comment: comment,
                rating: 4,
              };
              this.processRequest(request); 
            }   
          },
          { text: '5', cssClass: 'stars', handler: data => { 
            var request = {
              state: state,
              id: this.srid,
              comment: comment,
              rating: 5,
            };
            this.processRequest(request);
           } 
          },
        ]
      });
      alert.present();
    }
  }

  processRequest(request){
    console.log("Update SR State Request", request);

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    this.dataSetterService.updateServiceRequestState(request)
      .subscribe((data: any) => {
        console.log("Update SR State Response", data);

        loading.dismiss();

        if (data.success) {
          this.loadSRDetails(null, this.srid);
          const toast = this.toastCtrl.create({
            message: data.message,
            duration: 3000
          });
          toast.present();
          this.vibration.vibrate(this.appGlobal.vibrationTimings);
        } else {
          const toast = this.toastCtrl.create({
            message: data.message,
            duration: 3000
          });
          toast.present();
        }

      }, err => {
        loading.dismiss();
        console.log(err);
        const toast = this.toastCtrl.create({
          message: this.appGlobal.ServerError,
          duration: 3000
        });
        toast.present();
      });
  }

}
