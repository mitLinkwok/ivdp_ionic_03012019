import { UserData } from './../../providers/user-data-ts';
import { Vibration } from '@ionic-native/vibration';
import { AppGlobalProvider } from './../../providers/app-global/app-global';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { CommentsPage } from './../comments/comments';
import { DataSetterProvider } from './../../providers/data-setter/data-setter';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ModalController, LoadingController } from 'ionic-angular';
import { DataGetterServiceProvider } from '../../providers/data-getter-service/data-getter-service';

/**
 * Generated class for the ArticleShowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-article-show',
  templateUrl: 'article-show.html',
})
export class ArticleShowPage {
  article_id: String;
  public intialArticle: any = {
    title: "",
    content:"",
    created_at:"",
    user_id:"",
    creator:"",
    comments:[],
    courasel_attachments: [],
  };
  // public article: any = this.intialArticle;
  public article: any;
  public user:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public dataGetterService: DataGetterServiceProvider,
    public dataSetterService:DataSetterProvider,public events:Events,
    public modalCtrl:ModalController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public appGlobal: AppGlobalProvider,
    public vibration: Vibration,
    public userData:UserData) {
    this.article_id = this.navParams.get('id');
    this.user = userData.userData;
    this.events.subscribe('reload:articleShow', (isNotification, id) => {
      this.article_id = id;
      this.refreshPage(null);
    });
  }

  ionViewDidEnter() {
    this.loadArticle(null,this.article_id);
  }


  loadArticle(ref,id){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    if (ref === null) {
      loading.present();
    }

    this.dataGetterService.getArticle(id)
      .subscribe((data: any) => {
        console.log("Article Details Loaded", data);

        if (data.success) {
          this.article = data.article;
        } else {
          // this.article = this.intialArticle;
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
        // this.article = this.intialArticle;
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

  refreshPage(event){
    this.loadArticle(event, this.article_id);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ArticleShowPage');
  }

  like(){
    const request = {
      item_type: "Cm",
      item_id: this.article.id,
    };

    console.log("Like Article Request", request);

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    this.dataSetterService.likeArticle(request)
      .subscribe((data: any) => {
        console.log("Like Article Response", data);

        loading.dismiss();

        if (data.success) {
          this.article.likes = data.likes_count;
          this.article.liked_by_me = data.liked_by_me;
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

  comment() {
    let modal = this.modalCtrl.create(CommentsPage, { rootItem: this.article });
    modal.present();

    modal.onWillDismiss(() => {
      console.log("Comment Modal Closed");
    });
  }

}
