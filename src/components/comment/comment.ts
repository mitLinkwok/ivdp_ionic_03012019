import { DataSetterProvider } from './../../providers/data-setter/data-setter';
import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import { Content, Events } from 'ionic-angular';
import * as moment from 'moment';

/**
 * Generated class for the CommentComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'comment',
  templateUrl: 'comment.html'
})

export class CommentComponent {

  @ViewChild(Content) content: Content;
  @ViewChild('comment_input') messageInput: ElementRef;
  @Input() rootItem: any = {};
  @Input() user: any;  
  editorComment = '';

  constructor(
    private events: Events,
    private dataSetter: DataSetterProvider) {
    console.log('CommentComponent Component');
    // this.rootItem = this.navParams.data.rootItem;
    // this.user = userData.userData;
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
    if (this.rootItem.comments) {
      this.scrollToBottom();
    }
    this.events.subscribe('comment:received', comment => {
      this.pushNewComment(comment);
    })
  }

  // dismiss() {
  //   this.viewCtrl.dismiss();
  // }

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
      messageId: id,
      comment_time: time,
      comment_by: this.user.id,
      content: this.editorComment,
      created_at: Date.now().toString(),
      item_id: this.rootItem.id,
      item_type: this.rootItem.item_type,
      user_ids: '',
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
