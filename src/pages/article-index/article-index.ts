import { AppGlobalProvider } from './../../providers/app-global/app-global';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { DataGetterServiceProvider } from '../../providers/data-getter-service/data-getter-service';
import {ArticleShowPage} from "../article-show/article-show";

/**
 * Generated class for the ArticleIndexPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  templateUrl: 'article-index.html',
})
export class ArticleIndexPage {
  queryText:any = '';

  descending: boolean = false;
  order: number = -1;
  field: string = 'updated_at';

  constructor(public navCtrl: NavController, public navParams: NavParams,public dataGetterService: DataGetterServiceProvider,
    public loadingCtrl:LoadingController,
    public toastCtrl:ToastController,
    public appGlobal:AppGlobalProvider) {
    
  }

  ionViewDidEnter(){
    this.loadArticles(null);
  }

  sort(){
    this.descending = !this.descending;
    this.order = this.descending ? 1 : -1;
  }

  public articles: any = [];

  loadArticles(ref){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    if(ref === null){
      loading.present();
    }

    this.dataGetterService.getArticles()
      .subscribe((data:any) => {
        console.log("Articles Loaded",data);
        
        if (data.success) {
          this.articles = data.articles;
        } else {
          this.articles = [];
        }
        
        loading.dismiss();
        if (ref != null) {
          ref.complete();
        }
      }, err => {
        console.log(err);
        this.articles = [];
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

  refreshPage(event) {
    this.loadArticles(event);
  }


  goToArticle(id){
    this.navCtrl.push(ArticleShowPage,{id: id})
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ArticleIndexPage');
  }

}
