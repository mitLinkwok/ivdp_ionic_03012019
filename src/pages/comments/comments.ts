import { DataSetterProvider } from './../../providers/data-setter/data-setter';
import { UserData } from './../../providers/user-data-ts';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Content, Events } from 'ionic-angular';
import * as moment from 'moment';

/**
 * Generated class for the CommentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comments',
  templateUrl: 'comments.html',
})
export class CommentsPage {

  @ViewChild(Content) content: Content;
  @ViewChild('comment_input') messageInput: ElementRef;
  rootItem:any = {};
  user:any;
  editorComment = '';

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController,
    public userData: UserData,
    private events: Events,
    private dataSetter:DataSetterProvider) {

    this.rootItem = this.navParams.data.rootItem;
    this.user = userData.userData;
    if(this.rootItem.comments){
      this.scrollToBottom();
    }
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentsPage');
  }
  ionViewWillLeave() {
    // unsubscribe
    this.events.unsubscribe('comment:received');
  }

  ionViewDidEnter() {
    // Subscribe to received  new message events
    this.events.subscribe('comment:received', comment => {
      this.pushNewComment(comment);
    })
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  onFocus() {
    // this.showEmojiPicker = false;
    this.content.resize();
    this.scrollToBottom();
  }

  switchEmojiPicker() {
    // this.showEmojiPicker = !this.showEmojiPicker;
    // if (!this.showEmojiPicker) {
    //   this.focus();
    // } else {
    //   this.setTextareaScroll();
    // }
    // this.content.resize();
    // this.scrollToBottom();
  }

  sendComment() {
    if (!this.editorComment.trim()) 
      return;

    // Mock message
    const id = Date.now().toString();
    let time = moment().format("DD/MM/YY HH:mm");
    let comment = {
      messageId:id,
      comment_time:time,
      comment_by:this.user.id,
      content:this.editorComment,
      created_at: Date.now().toString(),
      item_id: this.rootItem.id,
      item_type: this.rootItem.item_type,
      user_ids:'',
      user: this.user.name,
      id: '',
      profile_pic: this.user.profile,
      status: 'pending'
    };

    this.pushNewComment(comment);
    this.editorComment = '';

    
    this.focus();    

    console.log("Comments Request", comment);

    this.dataSetter.sendComment(comment)
      .subscribe((data: any) => {
        console.log("Comments Response", data);

        let index = this.getMsgIndexById(id);
        if (index !== -1) {
          if (data.success) {
            this.rootItem.comments[index].status = 'success';
          } else {
            this.rootItem.comments[index].status = 'failed';
          }
        }
      }, err => {
        console.log(err);
        let index = this.getMsgIndexById(id);
        if (index !== -1) {
          this.rootItem.comments[index].status = 'failed';
        }
      });
  }

  pushNewComment(comment) {
    this.rootItem.comments.push(comment);
    this.scrollToBottom();
  }

  getMsgIndexById(id: string) {
    return this.rootItem.comments.findIndex(e => e.messageId === id);
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom();
      }
    }, 400)
  }

  private focus() {
    if (this.messageInput && this.messageInput.nativeElement) {
      this.messageInput.nativeElement.focus();
    }
  }

  // private setTextareaScroll() {
  //   const textarea = this.messageInput.nativeElement;
  //   textarea.scrollTop = textarea.scrollHeight;
  // }

}
