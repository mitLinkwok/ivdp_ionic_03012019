import { AppGlobalProvider } from './../../providers/app-global/app-global';
import { IdeaFilterPage } from './../idea-filter/idea-filter';
import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, Events, ModalController, ToastController } from 'ionic-angular';
import { DataGetterServiceProvider } from '../../providers/data-getter-service/data-getter-service';
import {IdeaShowPage} from "../idea-show/idea-show";
import {IdeaFormPage} from "../idea-form/idea-form";
import * as _ from "lodash";
import * as moment from 'moment';



/**
 * Generated class for the IdeaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-idea',
  templateUrl: 'idea.html',
})
export class IdeaPage {
  ideas_m : any = [];
  ideaWhoseList: any = [];
  public ideas: any;
  excludeWhoseIdeas: any = ["mine"];
  queryText:any = '';

  descending: boolean = false;
  order: number = -1;
  field: string = 'updated_at';

  constructor(public navCtrl: NavController, public navParams: NavParams,public dataGetterService: DataGetterServiceProvider,public loadingCtrl: LoadingController,
    public events:Events, public modalCtrl:ModalController,
    public toastCtrl: ToastController,
    public appGlobal: AppGlobalProvider) {
    
    console.log(this.ideas);
    this.events.subscribe('reload:idea', () => {
      this.refreshSRList(null);
    });
  }

  sort(){
    this.descending = !this.descending;
    this.order = this.descending ? 1 : -1;
  }

  loadIdeas(ref) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    if (ref === null) {
      loading.present();
    }

    this.dataGetterService.getIdeas()
      .subscribe((data: any) => {
        console.log("Ideas Loaded", data);

        if (data.success) {
          this.ideas_m = data.ideas;
          this.ideas = data.ideas;
          this.ideaWhoseList = _.uniq(this.ideas.map(idea => idea.whose)).sort();
          this.updateIdeas();
        } else {
          this.ideas_m = [];
          this.ideas = [];
          this.ideaWhoseList = [];
          this.updateIdeas();
        }

        loading.dismiss();
        if (ref != null) {
          ref.complete();
        }
      }, err => {
        console.log(err);
        this.ideas_m = [];
        this.ideas = [];
        this.ideaWhoseList = [];
        this.updateIdeas();
        const toast = this.toastCtrl.create({
          message: this.appGlobal.ServerError,
          duration: 3000
        });
        toast.present();
        loading.dismiss();
        if (ref != null) {
          ref.complete();
        }
      });
  }

  ionViewDidEnter(){
    this.loadIdeas(null);
  }

  refreshSRList(ev){
    this.loadIdeas(ev);
  }

  goToSRForm() {
    this.navCtrl.push(IdeaFormPage);
  }

  goToIdea(id){
    this.navCtrl.push(IdeaShowPage,{
      id:id,
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IdeaPage');
  }

  presentFilter() {
    let modal = this.modalCtrl.create(IdeaFilterPage, { excludeWhoseIdeas: this.excludeWhoseIdeas, ideaWhoseList:this.ideaWhoseList });
    modal.present();

    modal.onWillDismiss((ideaWhose: any[]) => {
      if (ideaWhose) {
        this.excludeWhoseIdeas = ideaWhose;
      }
      this.updateIdeas();
    });
  }

  updateIdeas(){
    this.ideas_m.shownIdeas = 0;
    this.ideas_m.forEach((idea: any) => {
      this.filterIdeas(idea, this.excludeWhoseIdeas);
      if (!idea.hide) {
        this.ideas_m.shownIdeas++;
      }
    });
    console.log("Final Showing", this.ideas_m.shownIdeas);
  }

  filterIdeas(idea: any, excludeWhoseIdeas: any[]) {

    let matchesWhoseIdea = false;
    if (excludeWhoseIdeas.indexOf(idea.whose) !== -1) {
      matchesWhoseIdea = true;
    }

    idea.hide = !(matchesWhoseIdea);
  }

  getLastActivity(updated_at) {
    return moment(updated_at).format("MMMM DD,YYYY hh:mm A");
  }
}
