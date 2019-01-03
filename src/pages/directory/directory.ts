import { DataGetterServiceProvider } from './../../providers/data-getter-service/data-getter-service';
import {Component, ViewChild} from '@angular/core';
import {IonicPage, Nav, NavController, NavParams} from 'ionic-angular';
import {ProfilePage} from "../profile/profile";

/**
 * Generated class for the DirectoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-directory',
  templateUrl: 'directory.html',
})
export class DirectoryPage {

  public searchQuery:string = '';
  public searchedUsers:any = [];
  public isSearching:boolean = false;
  @ViewChild(Nav) nav: Nav;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public dataGetter:DataGetterServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DirectoryPage');
  }

  onInput(event){
    console.log("onInput event",event);
    console.log("onInput searchQuery", this.searchQuery);
    if(this.searchQuery !== ""){
      this.isSearching = true;
      this.dataGetter.getSuggestions({
        item_id:'',
        item_type:'',
        search_term: this.searchQuery
      }).subscribe((data:any)=>{
        console.log("User Searched Data",data);
        if (data.has_users){
          this.searchedUsers = data.users;
        } else {
          this.searchedUsers = [];
        }
        this.isSearching = false;
      });
    } else {
      this.searchedUsers = [];
      this.isSearching = false;
    }
  }

  onClear(event){
    console.log("onClear event", event);
    this.isSearching = false;
  }


  openUserProfile(uid){
    let params= {};
    params['user_id'] = uid;
    this.navCtrl.push(ProfilePage, params).catch((err: any) => {
      console.log(`Didn't set nav root: ${err}`);
    });
  }
}
