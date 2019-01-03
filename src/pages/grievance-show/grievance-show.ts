import { Vibration } from '@ionic-native/vibration';
import { AppGlobalProvider } from './../../providers/app-global/app-global';
import { CommentsPage } from './../comments/comments';
import { Observable } from 'rxjs/Observable';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { DataSetterProvider } from './../../providers/data-setter/data-setter';
import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, Events, AlertController, ModalController } from 'ionic-angular';
import {DataGetterServiceProvider} from "../../providers/data-getter-service/data-getter-service";
import * as _ from "lodash";

/**
 * Generated class for the GrievanceShowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-grievance-show',
  templateUrl: 'grievance-show.html',
})
export class GrievanceShowPage {
  public initalGrievance :any = {
    uuid:'',
    state:'',
    title:'',
    grievance_category:'',
    grievance_type:'',
    content:'',
    attachment:[],
    allocated_users: [],
    comments: [],
  };
  // public Grievance: any = this.initalGrievance;
  public Grievance :any;
  public items :any;
  public id:any;

  public isAllocating: boolean = false;
  public viewAllocated = [];
  public areAllocationChanged = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,public dataGetterService: DataGetterServiceProvider,public loadingCtrl: LoadingController,
    public events: Events, public dataSetter: DataSetterProvider,
    public alertCtrl: AlertController, public toastCtrl: ToastController,
    public modalCtrl:ModalController,
    public appGlobal: AppGlobalProvider,
    public vibration: Vibration) {
    this.id=navParams.get('id');
    this.loadGrievanceDetails(null, this.id);
    this.events.subscribe('reload:grievanceShow', (isNotification, id) => {
      this.id = id;
      this.refreshPage(null);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GrievanceShowPage');
  }

  loadGrievanceDetails(ref, id) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    if (ref === null) {
      loading.present();
    }

    this.dataGetterService.loadIdeaDetail(id)
      .subscribe((data: any) => {
        console.log("Grievance Details Loaded", data);

        if (data.success) {
          this.Grievance = data.idea;
          this.items = data.timeline;
          this.updateAllocatedTags();
        } else {
          // this.Grievance = this.initalGrievance;
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
        // this.Grievance = this.initalGrievance;
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

  refreshPage(ev) {
    this.loadGrievanceDetails(ev, this.id);
  }

  comment() {
    let modal = this.modalCtrl.create(CommentsPage, { rootItem: this.Grievance });
    modal.present();

    modal.onWillDismiss(() => {
      console.log("Comment Modal Closed");
    });
  }

  public getAllocationUsers = (text: string): Observable<any> => {
    console.log("Text", text);

    return this.dataGetterService.getSuggestions({
      item_id: this.Grievance.id,
      item_type: this.Grievance.item_type,
      search_term: text
    }).map((data: any) => {
      if (data.has_users){
        return data.users
      } else {
        console.log("Grievance getSuggestions", data.message);
        this.showToast(data.message);        
        return [];
      }
    });
  }
  
  public showToast(message){
    const toast = this.toastCtrl.create({
      message: message,
      duration: 5000
    });
    toast.present();
  }

  public allocateUsers() {
    this.isAllocating = !this.isAllocating;
  }

  public updateAllocatedTags() {
    this.viewAllocated = _.map(this.Grievance.allocated_users, 'name');
  }

  public onAddAllocation(item) {
    console.log("onAddAllocation", item);
    this.areAllocationChanged = true;
  }

  public onRemoveAllocation(item) {
    console.log("onRemoveAllocation", item);
    this.areAllocationChanged = true;
  }

  public onRemovingAllocation(tag): Observable<any> {
    const confirm = window.confirm('Do you really want to remove this tag?');
    return Observable
      .of(tag)
      .filter(() => confirm);
  }

  public submitAllocation() {
    console.log("submitAllocation", this.Grievance.allocated_users);
    if (this.Grievance.allocated_users.length > 0 && this.areAllocationChanged) {
      let alert = this.alertCtrl.create({
        title: "Allocate Users",
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
            text: "Allocate",
            handler: data => {
              console.log("allocateComment", data.comment);
              if (data.comment !== '') {
                this.allocateRequest({
                  item_id: this.Grievance.id,
                  item_type: this.Grievance.item_type,
                  user_id: this.Grievance.allocated_users,
                  comment: data.comment
                });
              } else {
                const toast = this.toastCtrl.create({
                  message: "Comment is mandatory",
                  duration: 5000
                });
                toast.present();
              }
            }
          }
        ]
      });
      alert.present();
    } else if (!this.areAllocationChanged) {
      this.allocateUsers();
    } else {
      const toast = this.toastCtrl.create({
        message: "You can allocate user or re-allocate user",
        duration: 5000
      });
      toast.present();
    }
  }

  allocateRequest(request) {
    console.log("Allocate Request", request);

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    this.dataSetter.allocateUser(request)
      .subscribe((data: any) => {
        console.log("Allocate Response", data);

        loading.dismiss();

        if (data.success) {
          this.areAllocationChanged = false;
          this.updateAllocatedTags();
          this.allocateUsers();
          this.vibration.vibrate(this.appGlobal.vibrationTimings);
        }
        // else {
        //   const toast = this.toastCtrl.create({
        //     message: data.message,
        //     duration: 3000
        //   });
        //   toast.present();
        // }

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
