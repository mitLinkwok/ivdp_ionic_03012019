import {Component} from '@angular/core';
import {Events, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {DataGetterServiceProvider} from "../../providers/data-getter-service/data-getter-service";
import {AppGlobalProvider} from "../../providers/app-global/app-global";
import {VisitingCardFormPage} from "../visiting-card-form/visiting-card-form";

/**
 * Generated class for the VisitingCardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-visiting-card',
  templateUrl: 'visiting-card.html',
})
export class VisitingCardPage {
  visitingCards: any = [];
  queryText: any = '';
  canCreate: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dataGetterService: DataGetterServiceProvider,
              public loadingCtrl: LoadingController,
              public events: Events,
              public toastCtrl: ToastController,
              public appGlobal: AppGlobalProvider) {

    this.events.subscribe('reload:visiting-card', (isNotification, id) => {
      this.refreshVisitingCardList(null);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VisitingCardPage');
  }

  ionViewDidEnter() {
    this.loadVisitingCards(null);
  }

  refreshVisitingCardList(reference) {
    this.loadVisitingCards(reference);
  }

  loadVisitingCards(reference) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    if (reference === null) {
      loading.present();
    }

    this.dataGetterService.getAllVisitingCards().subscribe((data: any) => {
      console.log("Visiting Card Loaded", data);

      if (data.success) {
        this.visitingCards = data.visting_card_requests;
        this.canCreate = data.can_create;
      } else {
        this.visitingCards = [];
        this.canCreate = false;
      }

      loading.dismiss();
      if (reference != null) {
        reference.complete();
      }
    }, error => {
      console.log(error);
      this.visitingCards = [];
      this.canCreate = false;
      const toast = this.toastCtrl.create({
        message: this.appGlobal.ServerError,

        duration: 3000
      });
      toast.present();
      loading.dismiss();
      if (reference != null) {
        reference.complete();
      }
    });
  }

  goToVisitingCardForm() {
    if (this.canCreate)
      this.navCtrl.push(VisitingCardFormPage);
    else {
      this.toastCtrl.create({
        message: "Can't have more than 5 open requests",
        duration: 3000
      }).present();
    }
  }
}
