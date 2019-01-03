import {Vibration} from '@ionic-native/vibration';
import {AppGlobalProvider} from './../../providers/app-global/app-global';
import {CommentsPage} from './../comments/comments';
import {DataSetterProvider} from './../../providers/data-setter/data-setter';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import {Component} from '@angular/core';
import {
  IonicPage,
  LoadingController,
  NavController,
  NavParams,
  Events,
  AlertController,
  ToastController,
  ModalController
} from 'ionic-angular';
import {DataGetterServiceProvider} from '../../providers/data-getter-service/data-getter-service';
import * as _ from "lodash";

/**
 * Generated class for the IdeaShowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-idea-show',
  templateUrl: 'idea-show.html',
})
export class IdeaShowPage {
  public initalIdea: any = {
    uuid: '',
    state: '',
    title: '',
    content: '',
    attachment: [],
    tagged_users: [],
    allocated_users: [],
    comments: [],
  };
  id: any;
  // public Idea: any = this.initalIdea;
  public Idea: any;
  public isTagging: boolean = false;
  public isAllocating: boolean = false;
  public viewTags = [];
  public viewAllocated = [];
  public userTagged = [];
  public areTagsChanged = false;
  public areAllocationChanged = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataGetterService: DataGetterServiceProvider, public loadingCtrl: LoadingController,
              public events: Events, public dataSetter: DataSetterProvider, public appGlobal: AppGlobalProvider,
              public alertCtrl: AlertController, public toastCtrl: ToastController, public modalCtrl: ModalController,
              public vibration: Vibration) {
    this.id = navParams.get('id');
    this.loadIdeaDetails(null, this.id);
    this.events.subscribe('reload:ideaShow', (isNotification, id) => {
      this.id = id;
      this.refreshPage(null);
    });
  }

  loadIdeaDetails(ref, id) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    if (ref === null) {
      loading.present();
    }

    this.dataGetterService.loadIdeaDetail(id)
      .subscribe((data: any) => {
        console.log("Idea Details Loaded", data);

        if (data.success) {
          this.Idea = data.idea;
          this.userTagged = this.Idea.tagged_users;
          this.updateSelectedTags();
          this.updateAllocatedTags();
        } else {
          // this.Idea = this.initalIdea;
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
        // this.Idea = this.initalIdea;
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad IdeaShowPage');
  }

  refreshPage(ev) {
    this.loadIdeaDetails(ev, this.id);
  }

  comment() {
    let modal = this.modalCtrl.create(CommentsPage, {rootItem: this.Idea});
    modal.present();

    modal.onWillDismiss(() => {
      console.log("Comment Modal Closed");
    });
  }

  public getTags = (text: string): Observable<any> => {
    console.log("Text", text);

    return this.dataGetterService.getSuggestions({
      item_id: this.Idea.id,
      item_type: this.Idea.item_type,
      search_term: text
    }).map((data: any) => {
      if (data.has_users) {
        return data.users
      } else {
        console.log("Idea getTags", data.message);
        this.showToast(data.message);
        return [];
      }
    });
  }

  public showToast(message) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 5000
    });
    toast.present();
  }

  tagUsers() {
    this.isTagging = !this.isTagging;
  }

  submitTags() {
    console.log("Submit Tags", this.Idea.tagged_users);
    // let tagged_ids = _.map(this.userTagged, 'id');
    // let pre_tagged_ids = _.map(this.Idea.tagged_users, 'id');
    // let diff = _.differenceWith(tagged_ids, pre_tagged_ids, _.isEqual);

    // let areTagsChanged = _(this.userTagged).differenceWith(this.Idea.tagged_users, _.isEqual).isEmpty();
    // console.log("Are Tags Changed", !areTagsChanged);

    if (this.areTagsChanged) {
      const request = {
        item_id: this.Idea.id,
        item_type: this.Idea.item_type,
        tags: this.Idea.tagged_users
      };

      this.processTagsRequest(request);
    } else {
      this.tagUsers();
    }
  }

  processTagsRequest(request) {
    console.log("Tags Request", request);

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    this.dataSetter.setTags(request)
      .subscribe((data: any) => {
        console.log("Tags Response", data);

        loading.dismiss();

        if (data.success) {
          this.areTagsChanged = false;
          this.userTagged = this.Idea.tagged_users;
          this.updateSelectedTags();
          this.tagUsers();
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

  public onAdd(item) {
    console.log('tag added: value is ', item);
    // this.updateSelectedTags();
    this.areTagsChanged = true;
  }

  public onRemove(item) {
    console.log('tag removed: value is ', item);
    // this.updateSelectedTags();
    this.areTagsChanged = true;
  }

  public updateSelectedTags() {
    this.viewTags = _.map(this.Idea.tagged_users, 'name');
  }

  public allocateUsers() {
    this.isAllocating = !this.isAllocating;
  }

  public updateAllocatedTags() {
    this.viewAllocated = _.map(this.Idea.allocated_users, 'name');
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
    const confirm = window.confirm('Do you really want to remove?');

    return Observable
      .of(tag)
      .filter(() => confirm);
  }

  public submitAllocation() {
    console.log("submitAllocation", this.Idea.allocated_users);
    if (this.Idea.allocated_users.length > 0 && this.areAllocationChanged) {
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
                  item_id: this.Idea.id,
                  item_type: this.Idea.item_type,
                  user_id: this.Idea.allocated_users,
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
