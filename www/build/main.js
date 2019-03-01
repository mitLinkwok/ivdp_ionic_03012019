webpackJsonp([0],{

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArticleShowPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_user_data_ts__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_vibration__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_app_global_app_global__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular_components_toast_toast_controller__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__comments_comments__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_data_setter_data_setter__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_data_getter_service_data_getter_service__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









/**
 * Generated class for the ArticleShowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ArticleShowPage = /** @class */ (function () {
    function ArticleShowPage(navCtrl, navParams, dataGetterService, dataSetterService, events, modalCtrl, loadingCtrl, toastCtrl, appGlobal, vibration, userData) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataGetterService = dataGetterService;
        this.dataSetterService = dataSetterService;
        this.events = events;
        this.modalCtrl = modalCtrl;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.appGlobal = appGlobal;
        this.vibration = vibration;
        this.userData = userData;
        this.intialArticle = {
            title: "",
            content: "",
            created_at: "",
            user_id: "",
            creator: "",
            comments: [],
            courasel_attachments: [],
        };
        this.article_id = this.navParams.get('id');
        this.user = userData.userData;
        this.events.subscribe('reload:articleShow', function (isNotification, id) {
            _this.article_id = id;
            _this.refreshPage(null);
        });
    }
    ArticleShowPage.prototype.ionViewDidEnter = function () {
        this.loadArticle(null, this.article_id);
    };
    ArticleShowPage.prototype.loadArticle = function (ref, id) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        if (ref === null) {
            loading.present();
        }
        this.dataGetterService.getArticle(id)
            .subscribe(function (data) {
            console.log("Article Details Loaded", data);
            if (data.success) {
                _this.article = data.article;
            }
            else {
                // this.article = this.intialArticle;
                if (_this.navCtrl.canGoBack()) {
                    _this.navCtrl.pop();
                }
                var toast = _this.toastCtrl.create({
                    message: data.message,
                    duration: 3000
                });
                toast.present();
            }
            loading.dismiss();
            if (ref != null) {
                ref.complete();
            }
        }, function (err) {
            console.log(err);
            // this.article = this.intialArticle;
            var toast = _this.toastCtrl.create({
                message: _this.appGlobal.ServerError,
                duration: 3000
            });
            toast.present();
            loading.dismiss();
            if (ref != null) {
                ref.complete();
            }
            if (_this.navCtrl.canGoBack()) {
                _this.navCtrl.pop();
            }
        });
    };
    ArticleShowPage.prototype.refreshPage = function (event) {
        this.loadArticle(event, this.article_id);
    };
    ArticleShowPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ArticleShowPage');
    };
    ArticleShowPage.prototype.like = function () {
        var _this = this;
        var request = {
            item_type: "Cm",
            item_id: this.article.id,
        };
        console.log("Like Article Request", request);
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.dataSetterService.likeArticle(request)
            .subscribe(function (data) {
            console.log("Like Article Response", data);
            loading.dismiss();
            if (data.success) {
                _this.article.likes = data.likes_count;
                _this.article.liked_by_me = data.liked_by_me;
                _this.vibration.vibrate(_this.appGlobal.vibrationTimings);
            }
            // else {
            //   const toast = this.toastCtrl.create({
            //     message: data.message,
            //     duration: 3000
            //   });
            //   toast.present();
            // }
        }, function (err) {
            loading.dismiss();
            console.log(err);
            var toast = _this.toastCtrl.create({
                message: _this.appGlobal.ServerError,
                duration: 3000
            });
            toast.present();
        });
    };
    ArticleShowPage.prototype.comment = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__comments_comments__["a" /* CommentsPage */], { rootItem: this.article });
        modal.present();
        modal.onWillDismiss(function () {
            console.log("Comment Modal Closed");
        });
    };
    ArticleShowPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_6__angular_core__["m" /* Component */])({
            selector: 'page-article-show',template:/*ion-inline-start:"/home/linkwok/Documents/ivdp/src/pages/article-show/article-show.html"*/'<!--\n  Generated template for the ArticleShowPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Article</ion-title>\n    <ion-buttons end *ngIf="article" >\n      <button ion-button icon-only clear (click)="like()">\n        <ion-icon [name]="article.liked_by_me ? \'heart\' : \'heart-outline\'" isActive="true" [class.liked]="article.liked_by_me"></ion-icon>\n        {{article.likes}}\n      </button>\n      <button ion-button icon-only clear (click)="comment()" *ngIf="article.can_comment">\n        <ion-icon name=\'chatbubbles\' isActive="true"></ion-icon>\n        {{article.comments.length}}\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-refresher (ionRefresh)="refreshPage($event)">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n  <div *ngIf="article">\n    <div *ngIf="article.showHeader">\n      <h1>{{article.title}}</h1>\n      <hr>\n    </div>\n    <ion-slides *ngIf="article.courasel_attachments.length > 0" [autoplay]="5000" [pager]="true" [loop]="true" style="height: auto;">\n      <ion-slide *ngFor="let slide of article.courasel_attachments">\n        <img [src]="slide.url">\n      </ion-slide>\n    </ion-slides>\n    <hr *ngIf="article.courasel_attachments.length > 0" >\n    <div [innerHtml]="article.content | safeHtml">\n      <!--{{idea.content}}-->\n    </div>\n    <div *ngIf="article.showFooter">\n      <hr>\n      <h5 *ngIf="article.date">Created on: {{article.date}}</h5>\n      <h5 *ngIf="article.creator">Created by: {{article.creator}}</h5>\n    </div>\n  </div>\n  <hr>\n  <!-- <comment [rootItem]="article" [user]="user"></comment> -->\n</ion-content>\n'/*ion-inline-end:"/home/linkwok/Documents/ivdp/src/pages/article-show/article-show.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7_ionic_angular__["o" /* NavController */], __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["p" /* NavParams */], __WEBPACK_IMPORTED_MODULE_8__providers_data_getter_service_data_getter_service__["a" /* DataGetterServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_data_setter_data_setter__["a" /* DataSetterProvider */], __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["f" /* Events */],
            __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["m" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["k" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular_components_toast_toast_controller__["a" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_app_global_app_global__["a" /* AppGlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_1__ionic_native_vibration__["a" /* Vibration */],
            __WEBPACK_IMPORTED_MODULE_0__providers_user_data_ts__["a" /* UserData */]])
    ], ArticleShowPage);
    return ArticleShowPage;
}());

//# sourceMappingURL=article-show.js.map

/***/ }),

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommentsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_data_setter_data_setter__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_user_data_ts__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the CommentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CommentsPage = /** @class */ (function () {
    function CommentsPage(navCtrl, navParams, viewCtrl, userData, events, dataSetter) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.userData = userData;
        this.events = events;
        this.dataSetter = dataSetter;
        this.rootItem = {};
        this.editorComment = '';
        this.rootItem = this.navParams.data.rootItem;
        this.user = userData.userData;
        if (this.rootItem.comments) {
            this.scrollToBottom();
        }
    }
    CommentsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CommentsPage');
    };
    CommentsPage.prototype.ionViewWillLeave = function () {
        // unsubscribe
        this.events.unsubscribe('comment:received');
    };
    CommentsPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        // Subscribe to received  new message events
        this.events.subscribe('comment:received', function (comment) {
            _this.pushNewComment(comment);
        });
    };
    CommentsPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    CommentsPage.prototype.onFocus = function () {
        // this.showEmojiPicker = false;
        this.content.resize();
        this.scrollToBottom();
    };
    CommentsPage.prototype.switchEmojiPicker = function () {
        // this.showEmojiPicker = !this.showEmojiPicker;
        // if (!this.showEmojiPicker) {
        //   this.focus();
        // } else {
        //   this.setTextareaScroll();
        // }
        // this.content.resize();
        // this.scrollToBottom();
    };
    CommentsPage.prototype.sendComment = function () {
        var _this = this;
        if (!this.editorComment.trim())
            return;
        // Mock message
        var id = Date.now().toString();
        var time = __WEBPACK_IMPORTED_MODULE_4_moment__().format("DD/MM/YY HH:mm");
        var comment = {
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
            .subscribe(function (data) {
            console.log("Comments Response", data);
            var index = _this.getMsgIndexById(id);
            if (index !== -1) {
                if (data.success) {
                    _this.rootItem.comments[index].status = 'success';
                }
                else {
                    _this.rootItem.comments[index].status = 'failed';
                }
            }
        }, function (err) {
            console.log(err);
            var index = _this.getMsgIndexById(id);
            if (index !== -1) {
                _this.rootItem.comments[index].status = 'failed';
            }
        });
    };
    CommentsPage.prototype.pushNewComment = function (comment) {
        this.rootItem.comments.push(comment);
        this.scrollToBottom();
    };
    CommentsPage.prototype.getMsgIndexById = function (id) {
        return this.rootItem.comments.findIndex(function (e) { return e.messageId === id; });
    };
    CommentsPage.prototype.scrollToBottom = function () {
        var _this = this;
        setTimeout(function () {
            if (_this.content.scrollToBottom) {
                _this.content.scrollToBottom();
            }
        }, 400);
    };
    CommentsPage.prototype.focus = function () {
        if (this.messageInput && this.messageInput.nativeElement) {
            this.messageInput.nativeElement.focus();
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["e" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["e" /* Content */])
    ], CommentsPage.prototype, "content", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["_8" /* ViewChild */])('comment_input'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__angular_core__["t" /* ElementRef */])
    ], CommentsPage.prototype, "messageInput", void 0);
    CommentsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'page-comments',template:/*ion-inline-start:"/home/linkwok/Documents/ivdp/src/pages/comments/comments.html"*/'<!--\n  Generated template for the CommentsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-buttons start>\n      <button ion-button icon-only (click)="dismiss()">\n        <ion-icon name="close-circle"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>Comments ({{rootItem.comments.length}})</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n  <div class="message-wrap">\n\n    <div *ngFor="let comment of rootItem.comments" class="message" [class.left]="comment.comment_by !== user.id" [class.right]="comment.comment_by === user.id">\n      <img class="user-img" [src]="comment.profile_pic ? comment.profile_pic : \'https://intranetstaging.herokuapp.com/assets/user_pic_missing.png\'" alt="" src="">\n      <ion-spinner name="dots" *ngIf="comment.status === \'pending\'"></ion-spinner>\n      <label *ngIf="comment.status === \'failed\'" class=\'status liked\'>Failed</label>\n      <div class="msg-detail">\n        <!-- <div class="msg-info">\n          <p>{{comment.user}}</p>\n        </div> -->\n        <div class="msg-content">\n          <span class="triangle"></span>\n          <div [class]="comment.comment_by === user.id ? \'msg-info-right\':\'msg-info-left\'">\n            <p>{{comment.user}}</p>\n          </div>\n          <p class="line-breaker " [innerHTML]=\'comment.content\'></p>\n          <div [class]="comment.comment_by === user.id ? \'msg-info-right-time\':\'msg-info-left-time\'">\n            <p>{{comment.comment_time}}</p>\n          </div>\n        </div>\n        \n      </div>\n    </div>\n\n  </div>\n\n</ion-content>\n\n<ion-footer no-border [style.height]="\'55px\'">\n  <div class="input-wrap">\n    <!-- <button ion-button clear icon-only item-right (click)="switchEmojiPicker()">\n      <ion-icon name="md-happy"></ion-icon>\n    </button> -->\n    <ion-textarea name="comment_input" #comment_input placeholder="Type your comment" [(ngModel)]="editorComment" (focusin)="onFocus()"></ion-textarea>\n    <button ion-button clear icon-only item-right (click)="sendComment()">\n      <ion-icon name="ios-send" ios="ios-send" md="md-send"></ion-icon>\n    </button>\n  </div>\n  <!-- <emoji-picker [(ngModel)]="editorMsg"></emoji-picker> -->\n</ion-footer>\n\n'/*ion-inline-end:"/home/linkwok/Documents/ivdp/src/pages/comments/comments.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["p" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["s" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1__providers_user_data_ts__["a" /* UserData */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* Events */],
            __WEBPACK_IMPORTED_MODULE_0__providers_data_setter_data_setter__["a" /* DataSetterProvider */]])
    ], CommentsPage);
    return CommentsPage;
}());

//# sourceMappingURL=comments.js.map

/***/ }),

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_app_global_app_global__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular_components_loading_loading_controller__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_data_setter_data_setter__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_data_getter_service_data_getter_service__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_user_data_ts__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_file_transfer__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_image_picker__ = __webpack_require__(489);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_crop__ = __webpack_require__(490);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_camera__ = __webpack_require__(79);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ProfilePage = /** @class */ (function () {
    function ProfilePage(navCtrl, navParams, userdata, dataSetter, dataGetter, loadingCtrl, toastCtrl, appGlobal, imagePicker, cropService, camera, transfer, actionSheetCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userdata = userdata;
        this.dataSetter = dataSetter;
        this.dataGetter = dataGetter;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.appGlobal = appGlobal;
        this.imagePicker = imagePicker;
        this.cropService = cropService;
        this.camera = camera;
        this.transfer = transfer;
        this.actionSheetCtrl = actionSheetCtrl;
        this.edit = false;
        this.showEditBtn = true;
        this.edit = false;
    }
    ProfilePage.prototype.onSubmit = function (toggle) {
        var _this = this;
        if (this.edit) {
            delete this.edit_profile.auth_token;
            delete this.edit_profile.created_at;
            delete this.edit_profile.updated_at;
            delete this.edit_profile.success;
            delete this.edit_profile.new_user;
            delete this.edit_profile.id;
            console.log("User Profile Update", this.edit_profile);
            if (this.edit_profile.mobile.trim().length != 10) {
                alert("Please fill a valid Mobile number");
                return false;
            }
            if (this.edit_profile.name.trim().length == 0) {
                alert("Please fill Name");
                return false;
            }
            if (this.edit_profile.designation.trim().length == 0) {
                alert("Please fill Designation");
                return false;
            }
            if (this.edit_profile.department.trim().length == 0) {
                alert("Please fill Department");
                return false;
            }
            if (this.edit_profile.about_me.trim().length == 0) {
                alert("Please fill About me");
                return false;
            }
            if (this.profile.profile !== this.edit_profile.profile) {
                var loading_1 = this.loadingCtrl.create({
                    content: 'Please while we update your profile picture..!!'
                });
                loading_1.present();
                this.dataSetter.fileTransfer(this.edit_profile.profile).then(function (data) {
                    data = JSON.parse(data.response);
                    console.log(data);
                    loading_1.dismiss();
                    if (data.success) {
                        _this.edit_profile.profile = data.url;
                        var toast = _this.toastCtrl.create({
                            message: data.message,
                            duration: 5000
                        });
                        toast.present();
                        _this.updateProfile(toggle);
                    }
                    else {
                        var toast = _this.toastCtrl.create({
                            message: data.message,
                            duration: 5000
                        });
                        toast.present();
                    }
                }).catch(function (error) {
                    console.log("File Transfer Error", error);
                    loading_1.dismiss();
                    var toast = _this.toastCtrl.create({
                        message: _this.appGlobal.ServerError,
                        duration: 5000
                    });
                    toast.present();
                });
            }
            else {
                this.updateProfile(toggle);
            }
        }
        else {
            this.edit = toggle;
        }
    };
    ProfilePage.prototype.updateProfile = function (toggle) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please while we update your profile..!!'
        });
        loading.present();
        this.dataSetter.setUpdatedUserProfile(this.edit_profile)
            .subscribe(function (data) {
            console.log("User Profile Update Response", data);
            loading.dismiss();
            if (data.success) {
                var toast = _this.toastCtrl.create({
                    message: data.message,
                    duration: 5000
                });
                toast.present();
                _this.profile = Object.assign({}, _this.edit_profile);
                _this.edit = toggle;
            }
            else {
                var toast = _this.toastCtrl.create({
                    message: data.message,
                    duration: 5000
                });
                toast.present();
            }
        }, function (err) {
            loading.dismiss();
            console.log(err);
            var toast = _this.toastCtrl.create({
                message: _this.appGlobal.ServerError,
                duration: 5000
            });
            toast.present();
        });
    };
    ProfilePage.prototype.editImage = function () {
        var _this = this;
        // const toast = this.toastCtrl.create({
        //   message: "Feature Coming Soon",
        //   duration: 5000
        // });
        // toast.present();
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Choose or take a picture',
            buttons: [
                {
                    text: 'Take a picture',
                    handler: function () {
                        _this.takePicture();
                    }
                },
                {
                    text: 'Choose pictures',
                    handler: function () {
                        _this.openImagePicker();
                    }
                }
            ]
        });
        actionSheet.present();
    };
    ProfilePage.prototype.takePicture = function () {
        var _this = this;
        var options = {
            quality: 100,
            correctOrientation: true
        };
        this.camera.getPicture(options)
            .then(function (data) {
            _this.cropService
                .crop(data, { quality: 75 })
                .then(function (newImage) {
                _this.edit_profile.profile = newImage;
            }, function (error) { return console.error("Error cropping image", error); });
        }, function (error) {
            console.log(error);
        });
    };
    ProfilePage.prototype.openImagePicker = function () {
        var _this = this;
        var options = {
            maximumImagesCount: 1,
        };
        this.imagePicker.getPictures(options)
            .then(function (results) {
            _this.reduceImages(results).then(function () {
                console.log('all images cropped!!');
            });
        }, function (err) {
            console.log(err);
        });
    };
    ProfilePage.prototype.reduceImages = function (selected_pictures) {
        var _this = this;
        return selected_pictures.reduce(function (promise, item) {
            return promise.then(function (result) {
                return _this.cropService.crop(item, { quality: 75 })
                    .then(function (cropped_image) {
                    _this.edit_profile.profile = cropped_image;
                });
            });
        }, Promise.resolve());
    };
    ProfilePage.prototype.resetProfile = function () {
        this.profile = {};
        this.showEditBtn = false;
    };
    ProfilePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ProfilePage');
        if (this.navParams.get('user_id') != undefined)
            this.getUserProfile(this.navParams.get('user_id'));
        else {
            this.profile = Object.assign({}, this.userdata.userData);
            if (!this.profile.skill_set) {
                this.profile.skill_set = [];
            }
            this.showEditBtn = true;
        }
        this.edit_profile = Object.assign({}, this.profile);
    };
    ProfilePage.prototype.ionViewDidLeave = function () {
        this.resetProfile();
    };
    ProfilePage.prototype.getUserProfile = function (uid) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.dataGetter.getUserProfile(uid).subscribe(function (data) {
            if (data.success) {
                _this.profile = data;
                _this.showEditBtn = false;
            }
            loading.dismiss();
        }, function (error) {
            console.log(error);
            _this.resetProfile();
            var toast = _this.toastCtrl.create({
                message: _this.appGlobal.ServerError,
                duration: 3000
            });
            toast.present();
            loading.dismiss();
            _this.navCtrl.pop();
        });
    };
    ProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_5__angular_core__["m" /* Component */])({
            selector: 'page-profile',template:/*ion-inline-start:"/home/linkwok/Documents/ivdp/src/pages/profile/profile.html"*/'<!--\n  Generated template for the ProfilePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>PROFILE</ion-title>\n\n    <ion-buttons end *ngIf="showEditBtn">\n      <button ion-button icon-only clear (click)="onSubmit(!edit)">\n        <ion-icon [name]="edit ? \'checkmark\' : \'create\'"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content>\n  <div *ngIf="profile && !edit">\n    <ion-card class="blurred-title-card">\n      <!-- <div class="card-image" [style.background-image]="\'url(\' + profile.profile + \')\'"></div> -->\n\n      <div class="card-title-background">\n        <span [style.background-image]="\'url(\' + profile.profile + \')\'"></span>\n      </div>\n      <div class="item-md" style="justify-content: center; display: flex; background: transparent;">\n        <ion-avatar>\n          <img [src]="profile.profile" style="width:8em;height:8em;">\n        </ion-avatar>\n      </div>\n    </ion-card>\n    <ion-card text-center>\n      <ion-card-content>\n        <p *ngIf="profile.name" style="font-size: 2rem;">\n          <b>{{profile.name ? profile.name : \'\'}}</b>\n        </p>\n        <p *ngIf="profile.designation">\n          <b>{{profile.designation ? profile.designation : \'\'}}</b>\n        </p>\n        <p *ngIf="profile.department">\n          <b>{{profile.department ? profile.department : \'\'}}</b>\n        </p>\n        <hr style="width: 50%"/>\n        <p *ngIf="profile.location">\n          <ion-icon name="pin"></ion-icon>\n          {{profile.location ? profile.location : \'\'}}\n        </p>\n        <p *ngIf="profile.mobile">\n          <ion-icon name="phone-portrait"></ion-icon>\n          {{profile.mobile ? profile.mobile:\'\'}}\n        </p>\n        <p *ngIf="profile.extension">\n          <ion-icon name="call"></ion-icon>\n          {{profile.extension ? profile.extension : \'\'}}\n        </p>\n      </ion-card-content>\n    </ion-card>\n    <ion-card>\n      <ion-card-header>\n        <ion-card-title>\n           About Me\n        </ion-card-title>\n      </ion-card-header>\n      <ion-card-content *ngIf="profile.about_me" >\n        {{profile.about_me}}\n      </ion-card-content>\n      <ion-card-content *ngIf="!profile.about_me">\n        Details Not Updated\n      </ion-card-content>\n    </ion-card>\n\n    <ion-card>\n      <ion-card-header>\n        <ion-card-title>\n          Experience\n        </ion-card-title>\n      </ion-card-header>\n      <ion-card-content *ngIf="profile.experience" >\n        {{profile.experience}}\n      </ion-card-content>\n      <ion-card-content *ngIf="!profile.experience">\n        Details Not Updated\n      </ion-card-content>\n    </ion-card>\n\n    <ion-card>\n      <ion-card-header>\n        <ion-card-title>\n          Skill Set\n        </ion-card-title>\n      </ion-card-header>\n      <ion-card-content *ngIf="profile.skill_set.length > 0" >\n        <ion-tags-input\n          [(ngModel)]="profile.skill_set"\n          [mode]="\'ios\'"\n          [readonly]="true">\n        </ion-tags-input>\n      </ion-card-content>\n      <ion-card-content *ngIf="profile.skill_set.length === 0">\n        Details Not Updated\n      </ion-card-content>\n    </ion-card>\n\n    <ion-card>\n      <ion-card-header>\n        <ion-card-title>\n          Learning and Development\n        </ion-card-title>\n      </ion-card-header>\n      <ion-card-content *ngIf="profile.learning_and_development" >\n        {{profile.learning_and_development}}\n      </ion-card-content>\n      <ion-card-content *ngIf="!profile.learning_and_development" >\n        Details Not Updated\n      </ion-card-content>\n    </ion-card>\n  </div>\n\n  <div *ngIf="edit_profile && edit">\n      <!-- <div class="item item-block item-md" style="justify-content: center;">\n        <ion-avatar item-start>\n          <img [src]="edit_profile.profile" style="width:120px;height:120px;">\n        </ion-avatar>\n      </div> -->\n      <ion-card class="blurred-title-card" (click)="editImage()">\n        <div class="card-title-background">\n          <span [style.background-image]="\'url(\' + edit_profile.profile + \')\'"></span>\n        </div>\n        <div class="item-md" style="justify-content: center; display: flex; background: transparent;">\n          <ion-avatar>\n            <img [src]="edit_profile.profile" style="width:8em;height:8em;">\n          </ion-avatar>\n          <ion-icon name="create"></ion-icon>\n        </div>\n      </ion-card>\n      <ion-list padding>\n        <ion-item>\n          <ion-label for="name" stacked>Name</ion-label>\n          <ion-input type="text" name="name" [(ngModel)]="edit_profile.name" autocomplete="on" autocorrect="on" required></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label for="department" stacked>Department</ion-label>\n          <ion-input type="text" name="department" [(ngModel)]="edit_profile.department"  autocomplete="on" autocorrect="on" required></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label for="designation" stacked>Designation</ion-label>\n          <ion-input type="text" name="designation" [(ngModel)]="edit_profile.designation"  autocomplete="on" autocorrect="on" required></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label for="mobile" stacked>Mobile</ion-label>\n          <ion-input type="tel" name="mobile" [(ngModel)]="edit_profile.mobile"  autocomplete="on" autocorrect="on" required></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label for="extension" stacked>Extension Number</ion-label>\n          <ion-input type="tel" name="extension" [(ngModel)]="edit_profile.extension"  autocomplete="on" autocorrect="on" required></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label for="location" stacked>Location</ion-label>\n          <ion-input type="text" name="location" [(ngModel)]="edit_profile.location"  autocomplete="on" autocorrect="on" required></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label for="about_me" stacked>About Me</ion-label>\n          <ion-textarea autoresize name="about_me" [(ngModel)]="edit_profile.about_me"  autocomplete="on" autocorrect="on" required></ion-textarea>\n        </ion-item>\n        <ion-item>\n          <ion-label for="experience" stacked>Experience</ion-label>\n          <ion-textarea autoresize name="experience" [(ngModel)]="edit_profile.experience"  autocomplete="on" autocorrect="on" required></ion-textarea>\n        </ion-item>\n        <ion-label class="item-md" style="color: #999;" stacked>Skill Set</ion-label>\n\n        <ion-tags-input style="margin-left: 16px;"\n            [(ngModel)]="edit_profile.skill_set"\n            [once]="\'true\'"\n            [mode]="\'ios\'"\n            [placeholder]="\'Add Skills\'"\n            [canBackspaceRemove]="true"\n            [canEnterAdd]="true"\n            [readonly]="false">\n          </ion-tags-input>\n        <ion-item>\n          <ion-label for="learning_and_development" stacked>Learning and Development</ion-label>\n          <ion-textarea autoresize name="learning_and_development" [(ngModel)]="edit_profile.learning_and_development"  autocomplete="on" autocorrect="on" required></ion-textarea>\n        </ion-item>\n        <ion-item>\n          <ion-buttons text-center>\n            <button ion-button block round color="primary" (click)="onSubmit(!edit)">{{edit? "Update" : "Edit"}}</button>\n          </ion-buttons>\n        </ion-item>\n      </ion-list>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/home/linkwok/Documents/ivdp/src/pages/profile/profile.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["p" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__providers_user_data_ts__["a" /* UserData */],
            __WEBPACK_IMPORTED_MODULE_2__providers_data_setter_data_setter__["a" /* DataSetterProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_data_getter_service_data_getter_service__["a" /* DataGetterServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular_components_loading_loading_controller__["a" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["r" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_0__providers_app_global_app_global__["a" /* AppGlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_image_picker__["a" /* ImagePicker */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_crop__["a" /* Crop */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_file_transfer__["a" /* FileTransfer */],
            __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["a" /* ActionSheetController */]])
    ], ProfilePage);
    return ProfilePage;
}());

//# sourceMappingURL=profile.js.map

/***/ }),

/***/ 11:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppGlobalProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_device__ = __webpack_require__(481);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppGlobalProvider = /** @class */ (function () {
    function AppGlobalProvider(device) {
        this.device = device;
        this.isOnline = false;
        // DEVELOPMENT PROXY URLS
        // private intranetBaseURL = '';
        // private systemXBaseURL = '';
        // LOCAL URLS165.227.139.76:8080
        this.server = 'Local';
        this.intranetBaseURL = 'http://165.227.139.76:8080/api/v1';
        this.surveyBaseURL = 'https://deepaksurveystaging.herokuapp.com/rapidfire/surveys';
        this.systemXBaseURL = 'https://system-x.herokuapp.com/api';
        // STAGING URLS
        // public server = 'Staging';
        // private intranetBaseURL = 'https://intranetstaging.herokuapp.com/api/v1';
        // private surveyBaseURL = 'https://deepaksurveystaging.herokuapp.com/rapidfire/surveys';
        // private systemXBaseURL = 'https://system-x.herokuapp.com/api';
        // LIVE URLS
        // public server = 'Live';
        // private intranetBaseURL = 'https://www.deepak.group/api/v1';
        // private surveyBaseURL = 'https://deepaksurveys.herokuapp.com/rapidfire/surveys';
        // private systemXBaseURL = 'https://system-x.herokuapp.com/api';
        this.getLeaveApplicationsURL = this.systemXBaseURL + '/leave_application_records';
        this.pendingLeaveApplicationsURL = this.systemXBaseURL + '/pending_leave_application';
        this.leaveApprovalURL = this.systemXBaseURL + '/leave_approval';
        this.leaveDetailsURL = this.systemXBaseURL + '/leave_application_details';
        this.leaveRecordsURL = this.systemXBaseURL + '/leave_records_type';
        this.checkSchemeURL = this.systemXBaseURL + '/check_scheme';
        this.getHalfLeaveRecordsURL = this.systemXBaseURL + '/get_half_leave_records';
        this.leaveApplicationURL = this.systemXBaseURL + '/leave_application';
        // public allSurveysURL = this.surveyBaseURL + '/all_surveys';
        this.surveyURL = this.surveyBaseURL;
        this.forgotPasswordURL = this.intranetBaseURL + '/users/forgot_password';
        this.sendNotificationURL = this.intranetBaseURL + '/set_firebase_token_mobile';
        this.clearNotificationURL = this.intranetBaseURL + '/delete_token';
        this.loadMonthAttendance = this.intranetBaseURL + '/get_monthly_attendance';
        this.attendanceURL = this.intranetBaseURL + '/get_attendance';
        this.allServiceRequestsURL = this.intranetBaseURL + '/all_service_requests';
        this.getServiceRequestURL = this.intranetBaseURL + '/get_service_request';
        this.createServiceRequestsURL = this.intranetBaseURL + '/create_service_request';
        this.allIdeaURL = this.intranetBaseURL + '/all_ideas';
        this.getIdeaURL = this.intranetBaseURL + '/get_idea';
        this.createIdeaURL = this.intranetBaseURL + '/create_idea';
        this.allGrievancesCategoriesURL = this.intranetBaseURL + '/all_grievance_categories';
        this.getHolidayListURL = this.intranetBaseURL + '/get_holiday_list';
        this.uploadImageURL = this.intranetBaseURL + '/upload_image';
        this.getStaticPagesURL = this.intranetBaseURL + '/get_static_pages';
        this.allNotificationsURL = this.intranetBaseURL + '/all_notification';
        this.getArticlesURL = this.intranetBaseURL + '/get_articles';
        this.getArticleURL = this.intranetBaseURL + '/get_article';
        this.changeServiceRequestStateURL = this.intranetBaseURL + '/change_service_request_state';
        this.getStaticPageURL = this.intranetBaseURL + '/get_static_page';
        this.snoozeNotificationURL = this.intranetBaseURL + '/snooze_notification';
        this.markNotificationReadURL = this.intranetBaseURL + '/mark_notification_read';
        this.setLikes = this.intranetBaseURL + '/like_item';
        this.setComment = this.intranetBaseURL + '/comments';
        this.getLunchStatus = this.intranetBaseURL + '/ask_for_lunch';
        this.setLunchStatus = this.intranetBaseURL + '/set_lunchlist';
        this.getSuggestion = this.intranetBaseURL + '/user_search';
        this.setTags = this.intranetBaseURL + '/tag_users';
        this.allocateUser = this.intranetBaseURL + '/allocate_users';
        this.updateUserProfile = this.intranetBaseURL + '/user_update';
        this.updateMenuCounts = this.intranetBaseURL + '/view_counts';
        this.profilePictureImageURL = this.intranetBaseURL + '/user_image_edit';
        this.setUpdatedUserProfile = this.intranetBaseURL + '/user_edit';
        this.getUserProfile = this.intranetBaseURL + '/user_profile';
        // Guest Lunch Request
        this.getAllGuestLunches = this.intranetBaseURL + '/all_guest_lunch_requests';
        this.createGuestLunch = this.intranetBaseURL + '/create_guest_lunch_request';
        // Visiting Card Request
        this.getAllVisitingCards = this.intranetBaseURL + '/all_visiting_card_requests';
        this.getCompanyDetails = this.intranetBaseURL + '/get_company_details';
        this.createVisitingCard = this.intranetBaseURL + '/create_visiting_card_request';
        // Stationery Request
        this.getStationeries = this.intranetBaseURL + '/get_stationeries';
        this.getAllStationeryRequests = this.intranetBaseURL + '/get_stationery_requests';
        this.createStationeryRequest = this.intranetBaseURL + '/stationery_request';
        // Maintenance Request
        this.getMaintenanceAssets = this.intranetBaseURL + '/get_maintenance_assets';
        // Access Card Request
        this.getAllAccessCardRequests = this.intranetBaseURL + '/get_access_card_requests';
        this.createAccessCardRequest = this.intranetBaseURL + '/access_card_request';
        // Guest Room Request
        this.getRoomAddresses = this.intranetBaseURL + '/get_room_addresses';
        this.getAllGuestRoomRequests = this.intranetBaseURL + '/get_room_requests';
        this.createGuestRoomRequest = this.intranetBaseURL + '/room_request';
        this.getGuestRoomRequest = this.intranetBaseURL + '/get_room_request';
        this.getGuestLunchLocations = this.intranetBaseURL + '/all_guest_lunch_locations';
        this.getGuestLunchTypes = this.intranetBaseURL + '/all_guest_lunch_types';
        this.getMRLocations = this.intranetBaseURL + '/get_locations';
        this.getLunchCategories = this.intranetBaseURL + '/get_lunch_categories';
        this.canteenFacilityUsage = this.intranetBaseURL + '/record_canteen_usage';
        //rewards and redemption 
        this.getMyAwards = this.intranetBaseURL + "/get_user_awards";
        // ERRORs
        this.ServerError = "We're sorry, but something went wrong.";
        this.OrangeNoUserAvailable = 'No User Available';
        this.vibrationTimings = 500;
        this.answers = {};
        this.questionsList = [];
        this.benefeciaries = [];
        this.syncanswers = [];
        this.synckycs = [];
        this.HouseHold = [];
        this.options = [];
        this.seletgroup = [];
        this.selectedCheckbox = [];
        this.selectedCheckId = [];
        this.groupsurveybeneficiaries = [];
        this.loginURL = this.intranetBaseURL + '/auth/login';
        this.getsuervyrequest = this.intranetBaseURL + '/surveys/getsurvey';
        this.gethouseholdrequest = this.intranetBaseURL + '/household';
        this.answersrequest = this.intranetBaseURL + '/answer/postanswers';
        // public answersrequest = "http://165.227.139.76:8080/api/v1/answer";
        this.allSurveysURL = this.intranetBaseURL + '/surveys';
        this.allGrievancesURL = this.intranetBaseURL + '/kyc';
        this.createGrievancesURL = this.intranetBaseURL + '/kyc';
        this.getAllMaintenanceRequests = this.intranetBaseURL + '/beneficiaries';
        this.getAllMaintenanceRequestspaggination = this.intranetBaseURL + '/beneficiaries?page=';
        this.createMaintenanceRequest = "http://165.227.139.76:8080/api/v1/beneficiaries/postusersbeneficiary";
        this.createtable = [
            "CREATE TABLE beneficiaries(id INTEGER PRIMARY KEY AUTOINCREMENT,server_id INTEGER type UNIQUE,device_id TEXT,code TEXT,beneficiary_name TEXT,gender TEXT,age NUMBER,date_of_birth TEXT,marital_status TEXT,caste TEXT,religion TEXT,primary_occupation TEXT,ownership_of_land TEXT,total_land_holding TEXT,total_family_income_average_monthly NUMBER,education_status TEXT,height_in_cms NUMBER,Weight_in_kgs NUMBER,village_id NUMBER,household_id NUMBER,family_head_id NUMBER,type_of_rationa_card TEXT,family_head_relation TEXT,contact_number NUMBER,whatsapp_number NUMBER,user_id NUMBER,created_at TIMESTAMP,updated_at TIMESTAMP,sync_status INTEGER)",
            "CREATE TABLE kycs(id INTEGER PRIMARY KEY AUTOINCREMENT,server_id INTEGER type UNIQUE,user_id INTEGER,kyc_person_id INTEGER,kyc_person_type TEXT,kyc_name TEXT,kyc_detail TEXT,kyc_number TEXT,kyc_file TEXT,kyc_image BLOB,created_at TIMESTAMP,updated_at TIMESTAMP,device_id TEXT,sync_status INTEGER)",
            "CREATE TABLE `survey` ( id INTEGER PRIMARY KEY AUTOINCREMENT, server_id INTEGER type UNIQUE, `project_id` INTEGER, `title` TEXT, `description` TEXT,`type` TEXT , `start_date` TEXT, `created_at` TEXT, `updated_at` TEXT,`sync_status` INTEGER )",
            "CREATE TABLE `questions` ( `id` INTEGER PRIMARY KEY AUTOINCREMENT,`server_id` INTEGER type UNIQUE, `survey_id` INTEGER, `section_id` INTEGER, `order` INTEGER, `text` TEXT, `type` TEXT, `language_json` TEXT, `rule_json` TEXT, `created_at` TEXT, `updated_at` INTEGER ,`sync_status` INTEGER)",
            "CREATE TABLE `options` ( `id` INTEGER PRIMARY KEY AUTOINCREMENT,`server_id` INTEGER type UNIQUE, `question_id` INTEGER, `type` TEXT, `order` INTEGER, `text` TEXT, `language_json` TEXT, `created_at` TEXT, `updated_at` TEXT ,`sync_status` INTEGER)",
            "CREATE TABLE `answers` ( `id` INTEGER PRIMARY KEY AUTOINCREMENT,`server_id` INTEGER ,`beneficiarie_id` INTEGER, `survey_id` INTEGER, `question_id` INTEGER, `language_id` INTEGER, `option_id` INTEGER, `option_text` TEXT,`image` BLOB,`other_text` TEXT, `created_at` TEXT, `updated_at` TEXT ,sync_status INTEGER)",
            "CREATE TABLE Updated_beneficiaries(id INTEGER PRIMARY KEY AUTOINCREMENT,server_id INTEGER,device_id TEXT,code TEXT,beneficiary_name TEXT,gender TEXT,age NUMBER,date_of_birth TEXT,marital_status TEXT,caste TEXT,religion TEXT,primary_occupation TEXT,ownership_of_land TEXT,total_land_holding TEXT,total_family_income_average_monthly NUMBER,education_status TEXT,height_in_cms NUMBER,Weight_in_kgs NUMBER,village_id NUMBER,household_id NUMBER,family_head_id NUMBER,type_of_rationa_card TEXT,family_head_relation TEXT,contact_number NUMBER,whatsapp_number NUMBER,user_id NUMBER,created_at TIMESTAMP,updated_at TIMESTAMP,sync_status INTEGER)",
            "CREATE TABLE Updated_kycs(id INTEGER PRIMARY KEY AUTOINCREMENT,server_id INTEGER,user_id INTEGER,kyc_person_id INTEGER,kyc_person_type TEXT,kyc_name TEXT,kyc_detail TEXT,kyc_number TEXT,kyc_file TEXT,kyc_image BLOB,created_at TIMESTAMP,updated_at TIMESTAMP sync_status INTEGER)",
            "CREATE TABLE `households` (`id` INTEGER PRIMARY KEY AUTOINCREMENT,`server_id` INTEGER type UNIQUE,`village_id` NUMBER,`user_id` NUMBER,`hh_number` NUMBER,`faliya_name` TEXT,`landmark` TEXT,`sync_status` INTEGER)",
            "CREATE TABLE `villages`(`id` INTEGER PRIMARY KEY AUTOINCREMENT,`server_id` INTEGER,`talukablock_id` INTEGER,`name` TEXT,`sync_status` INTEGER)",
            "CREATE TABLE `talukas`(`id` INTEGER PRIMARY KEY AUTOINCREMENT,`server_id` INTEGER,`parent_id` INTEGER,`district_id` INTEGER,`name` TEXT,`sync_status` INTEGER)"
        ];
        this.actual = 0;
        this.total = 0;
        this.actual_hh = 0;
        console.log('Hello AppGlobalProvider Provider');
        this.device_id = this.device.uuid;
    }
    AppGlobalProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_device__["a" /* Device */]])
    ], AppGlobalProvider);
    return AppGlobalProvider;
}());

//# sourceMappingURL=app-global.js.map

/***/ }),

/***/ 110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DBmaneger; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__user_data_ts__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_sqlite__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_data_setter_data_setter__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_app_global_app_global__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_database_database__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_data_getter_service_data_getter_service__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};










var DBmaneger = /** @class */ (function () {
    function DBmaneger(http, database, platform, loadingCtrl, appGlobal, dataGetterService, dataSetterService, db, toastCtrl, user, storage) {
        this.http = http;
        this.database = database;
        this.platform = platform;
        this.loadingCtrl = loadingCtrl;
        this.appGlobal = appGlobal;
        this.dataGetterService = dataGetterService;
        this.dataSetterService = dataSetterService;
        this.db = db;
        this.toastCtrl = toastCtrl;
        this.user = user;
        this.storage = storage;
        this.isqurestatus = false;
        this.page_status = 0;
        this.page_status_hh = 0;
        this.data = this.user.userData.id;
    }
    DBmaneger.prototype.getbenificialydata = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (this.page_status == null && this.page_status == undefined && this.page_status == 0 || this.page_status == 1) {
                    this.dataGetterService.getAllMaintenanceRequests(this.data).subscribe(function (data) {
                        var a = true;
                        if (data.success || a) {
                            _this.appGlobal.actual = data.data.length + _this.appGlobal.actual;
                            for (var i = 0; i <= data.data.length; i++) {
                                _this.db.insertbeneficiarydata(data.data[i]);
                                _this.appGlobal.sync_status = "Sync is going on ....";
                            }
                            _this.total_datapage = JSON.stringify(data.meta.last_page);
                            _this.storage.set("total_count_beneficiary", JSON.stringify(data.meta.total));
                            _this.appGlobal.totalcount_bene = JSON.stringify(data.meta.total);
                            _this.appGlobal.total = data.meta.total;
                            _this.doInfinite(null);
                            return _this.isqurestatus = true;
                        }
                        else {
                            console.log("cannot get beneficiary  data for insert");
                        }
                        return _this.isqurestatus = false;
                    }, function (error) {
                        console.log(JSON.stringify(error));
                        var toast = _this.toastCtrl.create({
                            message: _this.appGlobal.ServerError,
                            duration: 3000
                        });
                        toast.present();
                    });
                }
                else {
                    this.doInfinite(null);
                }
                return [2 /*return*/];
            });
        });
    };
    DBmaneger.prototype.doInfinite = function (e) {
        var _this = this;
        if (this.page_status != null && this.page_status != undefined) {
            this.paggination(null);
        }
        // this.paggination(null);
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve();
                _this.getbenificialydata();
            }, 10000);
        });
    };
    DBmaneger.prototype.paggination = function (ev) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dataGetterService.paggination(this.page_status++).subscribe(function (data) {
                            var a = true;
                            _this.appGlobal.actual = _this.appGlobal.actual + data.data.length;
                            if (data.success || a) {
                                for (var i = 0; i <= data.data.length; i++) {
                                    _this.db.insertbeneficiarydata(data.data[i]);
                                    _this.appGlobal.sync_status = "Sync is going on ....";
                                }
                            }
                        }, function (error) {
                            console.log("error " + JSON.stringify(error));
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DBmaneger.prototype.getkycsdata = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dataGetterService.getGrievances()
                            .subscribe(function (data) {
                            var a = true;
                            if (data.success || a) {
                                for (var i = 0; i <= data.data.length; i++) {
                                    var object = data.data[i];
                                    console.log("dadaobject ##### " + object);
                                    _this.db.insertkycsdatafromapi(data.data[i]);
                                }
                                return _this.isqurestatus = true;
                            }
                            else {
                                console.log("cannot get kycs data for insert");
                            }
                            return _this.isqurestatus = false;
                            // this.db.getbeneficiarydata();
                        }, function (err) {
                            console.log(err);
                            var toast = _this.toastCtrl.create({
                                message: _this.appGlobal.ServerError,
                                duration: 3000
                            });
                            toast.present();
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DBmaneger.prototype.getsurvey = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dataGetterService.getSurveys()
                            .subscribe(function (data) {
                            var a = true;
                            if (data.success || a) {
                                for (var i = 0; i <= data.data.length; i++) {
                                    var object = data.data[i];
                                    console.log("dadaobject ##### " + object);
                                    _this.db.insertsurveydata(data.data[i]);
                                }
                                return _this.isqurestatus = true;
                            }
                            else {
                                console.log("cannot get survey data for insert");
                            }
                            return _this.isqurestatus = false;
                            // this.db.getbeneficiarydata();
                        }, function (err) {
                            console.log(err);
                            var toast = _this.toastCtrl.create({
                                message: _this.appGlobal.ServerError,
                                duration: 3000
                            });
                            toast.present();
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DBmaneger.prototype.getQuestion = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dataSetterService.gatquestionrequest().subscribe(function (data) {
                            var a = true;
                            if (data.success || a) {
                                for (var i = 0; i <= data.questions.length; i++) {
                                    //alert(" Questions ##### " + object);
                                    _this.db.insertQuestinsdata(data.questions[i]);
                                }
                                return _this.isqurestatus = true;
                            }
                            else {
                                console.log("cannot get questions data for insert");
                            }
                            return _this.isqurestatus = false;
                        }, function (err) {
                            console.log(err);
                            var toast = _this.toastCtrl.create({
                                message: _this.appGlobal.ServerError,
                                duration: 3000
                            });
                            toast.present();
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DBmaneger.prototype.getOpections = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dataSetterService.gatquestionrequest().subscribe(function (data) {
                            var a = true;
                            if (data.success || a) {
                                for (var i = 0; i <= data.options.length; i++) {
                                    _this.db.insertoptions(data.options[i]);
                                }
                                return _this.isqurestatus = true;
                            }
                            else {
                                console.log("cannot get questions data for insert");
                            }
                            return _this.isqurestatus = false;
                        }, function (err) {
                            console.log(err);
                            var toast = _this.toastCtrl.create({
                                message: _this.appGlobal.ServerError,
                                duration: 3000
                            });
                            toast.present();
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DBmaneger.prototype.gethousehold = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.page_status_hh == null && this.page_status_hh == undefined && this.page_status_hh == 0 || this.page_status_hh == 1)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.dataGetterService.gathouseholsrequest().subscribe(function (data) {
                                var a = true;
                                if (data.success || a) {
                                    _this.appGlobal.actual_hh = data.data.length;
                                    for (var i = 0; i <= data.data.length; i++) {
                                        _this.db.inserthouseholds(data.data[i]);
                                    }
                                    _this.total_pageHH = JSON.stringify(data.meta.last_page);
                                    _this.doInfiniteHH(null);
                                    return _this.isqurestatus = true;
                                }
                                else {
                                    console.log("cannot get questions data for insert");
                                }
                                return _this.isqurestatus = false;
                            }, function (err) {
                                console.log("    hous error      " + JSON.stringify(err));
                                var toast = _this.toastCtrl.create({
                                    message: _this.appGlobal.ServerError,
                                    duration: 3000
                                });
                                toast.present();
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        this.doInfiniteHH(null);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DBmaneger.prototype.doInfiniteHH = function (e) {
        var _this = this;
        if (this.page_status_hh != null && this.page_status_hh != undefined) {
            this.paggination_hh(null);
        }
        // this.paggination(null);
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve();
                _this.gethousehold();
            }, 10000);
        });
    };
    DBmaneger.prototype.paggination_hh = function (ev) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dataGetterService.paggination_hh(this.page_status_hh++).subscribe(function (data) {
                            var a = true;
                            // alert("success" + data.data.length)
                            if (data.success || a) {
                                for (var i = 0; i <= data.data.length; i++) {
                                    _this.db.inserthouseholds(data.data[i]);
                                }
                            }
                        }, function (error) {
                            console.log("error " + JSON.stringify(error));
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DBmaneger = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_sqlite__["a" /* SQLite */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["q" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_7__providers_app_global_app_global__["a" /* AppGlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_9__providers_data_getter_service_data_getter_service__["a" /* DataGetterServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_data_setter_data_setter__["a" /* DataSetterProvider */],
            __WEBPACK_IMPORTED_MODULE_8__providers_database_database__["a" /* DatabaseProvider */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["r" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_0__user_data_ts__["a" /* UserData */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */]])
    ], DBmaneger);
    return DBmaneger;
}());

//# sourceMappingURL=Dbmaneger.js.map

/***/ }),

/***/ 111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IdeaShowPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_native_vibration__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_app_global_app_global__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__comments_comments__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_data_setter_data_setter__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_filter__ = __webpack_require__(255);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_filter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_data_getter_service_data_getter_service__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_lodash__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_lodash__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










/**
 * Generated class for the IdeaShowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var IdeaShowPage = /** @class */ (function () {
    function IdeaShowPage(navCtrl, navParams, dataGetterService, loadingCtrl, events, dataSetter, appGlobal, alertCtrl, toastCtrl, modalCtrl, vibration) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataGetterService = dataGetterService;
        this.loadingCtrl = loadingCtrl;
        this.events = events;
        this.dataSetter = dataSetter;
        this.appGlobal = appGlobal;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.modalCtrl = modalCtrl;
        this.vibration = vibration;
        this.initalIdea = {
            uuid: '',
            state: '',
            title: '',
            content: '',
            attachment: [],
            tagged_users: [],
            allocated_users: [],
            comments: [],
        };
        this.isTagging = false;
        this.isAllocating = false;
        this.viewTags = [];
        this.viewAllocated = [];
        this.userTagged = [];
        this.areTagsChanged = false;
        this.areAllocationChanged = false;
        this.getTags = function (text) {
            console.log("Text", text);
            return _this.dataGetterService.getSuggestions({
                item_id: _this.Idea.id,
                item_type: _this.Idea.item_type,
                search_term: text
            }).map(function (data) {
                if (data.has_users) {
                    return data.users;
                }
                else {
                    console.log("Idea getTags", data.message);
                    _this.showToast(data.message);
                    return [];
                }
            });
        };
        this.id = navParams.get('id');
        this.loadIdeaDetails(null, this.id);
        this.events.subscribe('reload:ideaShow', function (isNotification, id) {
            _this.id = id;
            _this.refreshPage(null);
        });
    }
    IdeaShowPage.prototype.loadIdeaDetails = function (ref, id) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        if (ref === null) {
            loading.present();
        }
        this.dataGetterService.loadIdeaDetail(id)
            .subscribe(function (data) {
            console.log("Idea Details Loaded", data);
            if (data.success) {
                _this.Idea = data.idea;
                _this.userTagged = _this.Idea.tagged_users;
                _this.updateSelectedTags();
                _this.updateAllocatedTags();
            }
            else {
                // this.Idea = this.initalIdea;
                if (_this.navCtrl.canGoBack()) {
                    _this.navCtrl.pop();
                }
                var toast = _this.toastCtrl.create({
                    message: data.message,
                    duration: 3000
                });
                toast.present();
            }
            loading.dismiss();
            if (ref != null) {
                ref.complete();
            }
        }, function (err) {
            console.log(err);
            // this.Idea = this.initalIdea;
            var toast = _this.toastCtrl.create({
                message: _this.appGlobal.ServerError,
                duration: 3000
            });
            toast.present();
            loading.dismiss();
            if (ref != null) {
                ref.complete();
            }
            if (_this.navCtrl.canGoBack()) {
                _this.navCtrl.pop();
            }
        });
    };
    IdeaShowPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad IdeaShowPage');
    };
    IdeaShowPage.prototype.refreshPage = function (ev) {
        this.loadIdeaDetails(ev, this.id);
    };
    IdeaShowPage.prototype.comment = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__comments_comments__["a" /* CommentsPage */], { rootItem: this.Idea });
        modal.present();
        modal.onWillDismiss(function () {
            console.log("Comment Modal Closed");
        });
    };
    IdeaShowPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 5000
        });
        toast.present();
    };
    IdeaShowPage.prototype.tagUsers = function () {
        this.isTagging = !this.isTagging;
    };
    IdeaShowPage.prototype.submitTags = function () {
        console.log("Submit Tags", this.Idea.tagged_users);
        // let tagged_ids = _.map(this.userTagged, 'id');
        // let pre_tagged_ids = _.map(this.Idea.tagged_users, 'id');
        // let diff = _.differenceWith(tagged_ids, pre_tagged_ids, _.isEqual);
        // let areTagsChanged = _(this.userTagged).differenceWith(this.Idea.tagged_users, _.isEqual).isEmpty();
        // console.log("Are Tags Changed", !areTagsChanged);
        if (this.areTagsChanged) {
            var request = {
                item_id: this.Idea.id,
                item_type: this.Idea.item_type,
                tags: this.Idea.tagged_users
            };
            this.processTagsRequest(request);
        }
        else {
            this.tagUsers();
        }
    };
    IdeaShowPage.prototype.processTagsRequest = function (request) {
        var _this = this;
        console.log("Tags Request", request);
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.dataSetter.setTags(request)
            .subscribe(function (data) {
            console.log("Tags Response", data);
            loading.dismiss();
            if (data.success) {
                _this.areTagsChanged = false;
                _this.userTagged = _this.Idea.tagged_users;
                _this.updateSelectedTags();
                _this.tagUsers();
                _this.vibration.vibrate(_this.appGlobal.vibrationTimings);
            }
            else {
                var toast = _this.toastCtrl.create({
                    message: data.message,
                    duration: 3000
                });
                toast.present();
            }
        }, function (err) {
            loading.dismiss();
            console.log(err);
            var toast = _this.toastCtrl.create({
                message: _this.appGlobal.ServerError,
                duration: 3000
            });
            toast.present();
        });
    };
    IdeaShowPage.prototype.onAdd = function (item) {
        console.log('tag added: value is ', item);
        // this.updateSelectedTags();
        this.areTagsChanged = true;
    };
    IdeaShowPage.prototype.onRemove = function (item) {
        console.log('tag removed: value is ', item);
        // this.updateSelectedTags();
        this.areTagsChanged = true;
    };
    IdeaShowPage.prototype.updateSelectedTags = function () {
        this.viewTags = __WEBPACK_IMPORTED_MODULE_9_lodash__["map"](this.Idea.tagged_users, 'name');
    };
    IdeaShowPage.prototype.allocateUsers = function () {
        this.isAllocating = !this.isAllocating;
    };
    IdeaShowPage.prototype.updateAllocatedTags = function () {
        this.viewAllocated = __WEBPACK_IMPORTED_MODULE_9_lodash__["map"](this.Idea.allocated_users, 'name');
    };
    IdeaShowPage.prototype.onAddAllocation = function (item) {
        console.log("onAddAllocation", item);
        this.areAllocationChanged = true;
    };
    IdeaShowPage.prototype.onRemoveAllocation = function (item) {
        console.log("onRemoveAllocation", item);
        this.areAllocationChanged = true;
    };
    IdeaShowPage.prototype.onRemovingAllocation = function (tag) {
        var confirm = window.confirm('Do you really want to remove?');
        return __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__["Observable"]
            .of(tag)
            .filter(function () { return confirm; });
    };
    IdeaShowPage.prototype.submitAllocation = function () {
        var _this = this;
        console.log("submitAllocation", this.Idea.allocated_users);
        if (this.Idea.allocated_users.length > 0 && this.areAllocationChanged) {
            var alert_1 = this.alertCtrl.create({
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
                        handler: function (data) {
                        }
                    },
                    {
                        text: "Allocate",
                        handler: function (data) {
                            console.log("allocateComment", data.comment);
                            if (data.comment !== '') {
                                _this.allocateRequest({
                                    item_id: _this.Idea.id,
                                    item_type: _this.Idea.item_type,
                                    user_id: _this.Idea.allocated_users,
                                    comment: data.comment
                                });
                            }
                            else {
                                var toast = _this.toastCtrl.create({
                                    message: "Comment is mandatory",
                                    duration: 5000
                                });
                                toast.present();
                            }
                        }
                    }
                ]
            });
            alert_1.present();
        }
        else if (!this.areAllocationChanged) {
            this.allocateUsers();
        }
        else {
            var toast = this.toastCtrl.create({
                message: "You can allocate user or re-allocate user",
                duration: 5000
            });
            toast.present();
        }
    };
    IdeaShowPage.prototype.allocateRequest = function (request) {
        var _this = this;
        console.log("Allocate Request", request);
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.dataSetter.allocateUser(request)
            .subscribe(function (data) {
            console.log("Allocate Response", data);
            loading.dismiss();
            if (data.success) {
                _this.areAllocationChanged = false;
                _this.updateAllocatedTags();
                _this.allocateUsers();
                _this.vibration.vibrate(_this.appGlobal.vibrationTimings);
            }
            // else {
            //   const toast = this.toastCtrl.create({
            //     message: data.message,
            //     duration: 3000
            //   });
            //   toast.present();
            // }
        }, function (err) {
            loading.dismiss();
            console.log(err);
            var toast = _this.toastCtrl.create({
                message: _this.appGlobal.ServerError,
                duration: 3000
            });
            toast.present();
        });
    };
    IdeaShowPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_6__angular_core__["m" /* Component */])({
            selector: 'page-idea-show',template:/*ion-inline-start:"/home/linkwok/Documents/ivdp/src/pages/idea-show/idea-show.html"*/'<!--\n  Generated template for the IdeaShowPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>{{Idea ? Idea.uuid : \'\'}}\n    </ion-title>\n    <ion-buttons end *ngIf="Idea" >\n      <button ion-button icon-only clear (click)="tagUsers()" *ngIf="Idea.can_tag">\n        <ion-icon name="pricetag"></ion-icon>\n      </button>\n      <button ion-button icon-only clear (click)="allocateUsers()" *ngIf="Idea.Can_allocate && userTagged.length > 0">\n        <ion-icon [name]="Idea.allocated_users.length > 0 ? \'git-compare\' : \'git-network\'"></ion-icon>\n      </button>\n      <button ion-button icon-only clear (click)="comment()" *ngIf="Idea.can_comment">\n        <ion-icon name=\'chatbubbles\'></ion-icon>\n        {{Idea.comments.length}}\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n  <div class="idea_state_header_{{Idea ? Idea.state : \'\'}}"></div>\n</ion-header>\n\n\n<ion-content padding>\n  <ion-refresher (ionRefresh)="refreshPage($event)">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n  <div *ngIf="Idea">\n    <div *ngIf="isAllocating">\n      <tag-input \n        [(ngModel)]="Idea.allocated_users" \n        [identifyBy]="\'id\'" \n        [displayBy]="\'name\'" \n        [onlyFromAutocomplete]="true"\n        [placeholder]="\'Type User name\'"\n        [secondaryPlaceholder]="\'Search User\'"\n        [clearOnBlur]="true"\n        [maxItems]="Idea.allocation_limit"\n        (onAdd)="onAddAllocation($event)"\n        (onRemove)="onRemoveAllocation($event)"\n        [onRemoving]="onRemovingAllocation">\n        <tag-input-dropdown \n          [showDropdownIfEmpty]="true" \n          [identifyBy]="\'id\'" \n          [displayBy]="\'name\'" \n          [focusFirstElement]="true"\n          [minimumTextLength]="0"\n          [autocompleteItems]="userTagged">\n          <ng-template let-item="item" let-index="index">\n            {{ item.name }}\n          </ng-template>\n        </tag-input-dropdown>\n      </tag-input>\n      <button ion-button full (click)="submitAllocation()">{{viewAllocated.length > 0 ? \'Re-allocate\' : \'Allocate\'}}</button>\n      <hr/>\n    </div>\n    <div *ngIf="isTagging">\n      <tag-input \n        #tagsInput\n        [(ngModel)]="Idea.tagged_users"\n        [identifyBy]="\'id\'"\n        [displayBy]="\'name\'"\n        [onlyFromAutocomplete]="true"\n        [placeholder]="\'Type New User Name\'"\n        [onTextChangeDebounce]="500"\n        [secondaryPlaceholder]="\'Search User\'"\n        [clearOnBlur]="true"\n        (onAdd)="onAdd($event)"\n        (onRemove)="onRemove($event)">\n          <tag-input-dropdown \n            [showDropdownIfEmpty]="true"\n            [identifyBy]="\'id\'"\n            [focusFirstElement]="true"\n            [displayBy]="\'name\'"\n            [minimumTextLength]="1"\n            [autocompleteObservable]="getTags">\n            <ng-template let-item="item" let-index="index">\n              {{ item.name }}\n            </ng-template>\n          </tag-input-dropdown>\n      </tag-input>\n      <button ion-button full (click)="submitTags()">Submit Tags</button>\n      <hr/>\n    </div>\n    <ion-card>\n      <ion-card-header>\n        <ion-badge class="pull-right">{{Idea.state}}</ion-badge>\n        <ion-title>\n          {{Idea.title}}\n        </ion-title>\n      </ion-card-header>\n      <ion-card-content>\n        <ion-list>\n          <ion-item *ngIf=\'viewAllocated.length > 0\' text-wrap>\n            Allocated:\n            <ion-tags-input [(ngModel)]="viewAllocated" [readonly]="true"></ion-tags-input>\n            <!-- <tag-input [(ngModel)]="Idea.tagged_users" [identifyBy]="\'id\'" [displayBy]="\'name\'" [hideForm]="true" [removable]="false"></tag-input> -->\n          </ion-item>\n          <ion-item *ngIf=\'viewTags.length > 0\' text-wrap>\n            Tags:\n            <ion-tags-input [(ngModel)]="viewTags" [readonly]="true"></ion-tags-input>\n            <!-- <tag-input [(ngModel)]="Idea.tagged_users" [identifyBy]="\'id\'" [displayBy]="\'name\'" [hideForm]="true" [removable]="false"></tag-input> -->\n          </ion-item>\n          <ion-item text-wrap>\n            Details:\n            <div [innerHtml]="Idea.content"></div>\n          </ion-item>\n        </ion-list>\n      </ion-card-content>\n    </ion-card>\n\n    <ion-list>\n      <ion-item *ngFor="let attach of Idea.attachment">\n        <img src="{{attach.url}}" *ngIf="attach.file_type === \'image\'" alt="{{attach.file_name}}" width="300"/>\n        <a href="{{attach.url}}" *ngIf="attach.file_type !== \'image\'" padding>{{attach.file_name}}</a>\n      </ion-item>\n    </ion-list>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/home/linkwok/Documents/ivdp/src/pages/idea-show/idea-show.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7_ionic_angular__["o" /* NavController */], __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["p" /* NavParams */], __WEBPACK_IMPORTED_MODULE_8__providers_data_getter_service_data_getter_service__["a" /* DataGetterServiceProvider */], __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["k" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["f" /* Events */], __WEBPACK_IMPORTED_MODULE_3__providers_data_setter_data_setter__["a" /* DataSetterProvider */], __WEBPACK_IMPORTED_MODULE_1__providers_app_global_app_global__["a" /* AppGlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["r" /* ToastController */], __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["m" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_0__ionic_native_vibration__["a" /* Vibration */]])
    ], IdeaShowPage);
    return IdeaShowPage;
}());

//# sourceMappingURL=idea-show.js.map

/***/ }),

/***/ 164:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__timeline_timeline__ = __webpack_require__(877);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__comment_comment__ = __webpack_require__(878);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ComponentsModule = /** @class */ (function () {
    function ComponentsModule() {
    }
    ComponentsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__timeline_timeline__["a" /* TimelineComponent */],
                __WEBPACK_IMPORTED_MODULE_2__timeline_timeline__["b" /* TimelineItemComponent */],
                __WEBPACK_IMPORTED_MODULE_2__timeline_timeline__["c" /* TimelineTimeComponent */],
                __WEBPACK_IMPORTED_MODULE_3__comment_comment__["a" /* CommentComponent */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["i" /* IonicModule */],
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__timeline_timeline__["a" /* TimelineComponent */],
                __WEBPACK_IMPORTED_MODULE_2__timeline_timeline__["b" /* TimelineItemComponent */],
                __WEBPACK_IMPORTED_MODULE_2__timeline_timeline__["c" /* TimelineTimeComponent */],
                __WEBPACK_IMPORTED_MODULE_3__comment_comment__["a" /* CommentComponent */],
            ]
        })
    ], ComponentsModule);
    return ComponentsModule;
}());

//# sourceMappingURL=components.module.js.map

/***/ }),

/***/ 165:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BeneficiaryProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__grievance_grievance__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_database_database__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_app_global_app_global__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the BeneficiaryProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var BeneficiaryProfilePage = /** @class */ (function () {
    function BeneficiaryProfilePage(navCtrl, appGlobal, sqldatabasegetter, navParams) {
        this.navCtrl = navCtrl;
        this.appGlobal = appGlobal;
        this.sqldatabasegetter = sqldatabasegetter;
        this.navParams = navParams;
        this.data = {};
        this.name = new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["b" /* FormControl */]();
        this.beneficiary_id = navParams.get('beneficiary_id');
        // this.beneficiary_code = navParams.get('beneficiary_code');
        this.surveyorID = navParams.get('user_id');
        this.autoincrement_id = navParams.get('auto_increment_id');
        // alert(  this.beneficiary_id+"          "+ this.surveyorID + "      " + this.autoincrement_id )
        this.sqldatabasegetter.getbeneficiaryforprofile(this.beneficiary_id, this.autoincrement_id);
        this.loadMaintenanceRequests();
    }
    BeneficiaryProfilePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad BeneficiaryProfilePage');
    };
    BeneficiaryProfilePage.prototype.ionViewDidEnter = function () {
        this.loadMaintenanceRequests();
    };
    BeneficiaryProfilePage.prototype.loadMaintenanceRequests = function () {
        //alert("array size " + this.sqldatabasegetter.offlineCase.length)
        if (this.sqldatabasegetter.offlineCase.length > 0) {
            for (var i = 0; i <= this.sqldatabasegetter.offlineCase.length; i++) {
                if (this.sqldatabasegetter.offlineCase[i] != undefined) {
                    this.data = {
                        server_id: this.beneficiary_id,
                        code: this.sqldatabasegetter.offlineCase[i].code,
                        beneficiary_name: this.sqldatabasegetter.offlineCase[i].beneficiary_name,
                        age: this.sqldatabasegetter.offlineCase[i].age,
                        gender: this.sqldatabasegetter.offlineCase[i].gender,
                        date_of_birth: this.sqldatabasegetter.offlineCase[i].date_of_birth,
                        marital_status: this.sqldatabasegetter.offlineCase[i].marital_status,
                        caste: this.sqldatabasegetter.offlineCase[i].caste,
                        religion: this.sqldatabasegetter.offlineCase[i].religion,
                        primary_occupation: this.sqldatabasegetter.offlineCase[i].primary_occupation,
                        ownership_of_land: this.sqldatabasegetter.offlineCase[i].ownership_of_land,
                        total_land_holding: this.sqldatabasegetter.offlineCase[i].total_land_holding,
                        total_family_income_average_monthly: this.sqldatabasegetter.offlineCase[i].total_family_income_average_monthly,
                        education_status: this.sqldatabasegetter.offlineCase[i].education_status,
                        height_in_cms: this.sqldatabasegetter.offlineCase[i].height_in_cms,
                        Weight_in_kgs: this.sqldatabasegetter.offlineCase[i].Weight_in_kgs,
                        type_of_rationa_card: this.sqldatabasegetter.offlineCase[i].type_of_rationa_card,
                        village_id: this.sqldatabasegetter.offlineCase[i].village_id,
                        household_id: this.sqldatabasegetter.offlineCase[i].household_id,
                        family_head_id: this.sqldatabasegetter.offlineCase[i].family_head_id,
                        contact_number: this.sqldatabasegetter.offlineCase[i].contact_number,
                        whatsapp_number: this.sqldatabasegetter.offlineCase[i].whatsapp_number,
                        user_id: this.sqldatabasegetter.offlineCase[i].user_id,
                        family_head_relation: this.sqldatabasegetter.offlineCase[i].family_head_relation
                    };
                }
            }
        }
        else {
            console.log("No data i array ");
        }
    };
    BeneficiaryProfilePage.prototype.updata = function (form) {
        this.sqldatabasegetter.updatabeneficiaryProfile(form.value, this.beneficiary_id, this.autoincrement_id);
    };
    BeneficiaryProfilePage.prototype.Beneficiary_kycs = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__grievance_grievance__["a" /* GrievancePage */], {
            beneficiary_id: this.beneficiary_id,
            auto_increment_id: this.autoincrement_id
        });
    };
    // start_survey() {
    //   this.navCtrl.push(SurveyListPage, {
    //     beneficiary_id: this.beneficiary_id,
    //     auto_increment_id: this.autoincrement_id
    //   })
    // }
    BeneficiaryProfilePage.prototype.isReadonly = function () { return true; };
    BeneficiaryProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-beneficiary-profile',template:/*ion-inline-start:"/home/linkwok/Documents/ivdp/src/pages/beneficiary-profile/beneficiary-profile.html"*/'\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>beneficiaryProfile\n\n    </ion-title>\n  </ion-navbar>\n\n</ion-header>\n<ion-content padding>\n  <form #form="ngForm">\n    <ion-list>\n      <ion-item>\n        <ion-label>Beneficiary name</ion-label>\n        <ion-input name="beneficiary_name" type="text" [readonly]="isReadonly" [(ngModel)]="data.beneficiary_name" required></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label>Age</ion-label>\n        <ion-input name="age" type="text" [(ngModel)]="data.age" [readonly]="isReadonly" ></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label>gender</ion-label>\n        <ion-input name="gender" type="text" [(ngModel)]="data.gender"  [readonly]="isReadonly"required></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label>Birth Date</ion-label>\n        <ion-input name="date_of_birth" [readonly]="isReadonly"  displayFormat="dd MMM yyyy"   type="date | date:\'dd MMM yyyy\'" [(ngModel)]="data.date_of_birth" required></ion-input> \n      </ion-item>\n\n      <ion-item>\n        <ion-label> Marital Status </ion-label>\n        <ion-input name="marital_status" type="text"  [readonly]="isReadonly" [(ngModel)]="data.marital_status" required></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label>Caste</ion-label>\n        <ion-input name="caste" type="text" [readonly]="isReadonly" [(ngModel)]="data.caste" required></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label>Religion</ion-label>\n        <ion-input name="religion" type="text" [readonly]="isReadonly" [(ngModel)]="data.religion" required></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label>Primary Occupation</ion-label>\n        <ion-input name="primary_occupation" type="text" [readonly]="isReadonly" [(ngModel)]="data.primary_occupation" ></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label>Ownership Of Land</ion-label>\n        <ion-input name="ownership_of_land" type="text" [(ngModel)]="data.ownership_of_land" ></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label>Total Land Holding</ion-label>\n        <ion-input name="total_land_holding" type="text" [readonly]="isReadonly" [(ngModel)]="data.total_land_holding" ></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label>Total Family Income Average Monthly</ion-label>\n        <ion-input name="total_family_income_average_monthly" type="text" [readonly]="isReadonly" [(ngModel)]="data.total_family_income_average_monthly"\n          ></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label>Education Status</ion-label>\n        <ion-input name="education_status" type="text"  [readonly]="isReadonly" [(ngModel)]="data.education_status" required></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label>Height In Cms</ion-label>\n        <ion-input name="height_in_cms" type="text" [readonly]="isReadonly" [(ngModel)]="data.height_in_cms" ></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label>Weight In Kgs</ion-label>\n        <ion-input name="Weight_in_kgs" type="text"  [readonly]="isReadonly" [(ngModel)]="data.Weight_in_kgs" ></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label>Village ID</ion-label>\n        <ion-input name="village_id" type="number" [readonly]="isReadonly" [(ngModel)]="data.village_id" required></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label>House Hold ID </ion-label>\n        <ion-input name="household_id" type="number" [readonly]="isReadonly" [(ngModel)]="data.household_id " required></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label>Family Head Id</ion-label>\n        <ion-input name="family_head_id" type="number"  [readonly]="isReadonly" [(ngModel)]="data.family_head_id" required></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label>Ration Card Type</ion-label>\n        <ion-input name="type_of_rationa_card" type="text" [readonly]="isReadonly" [(ngModel)]="data.type_of_rationa_card" required></ion-input>\n      </ion-item>\n\n\n\n      <ion-item>\n        <ion-label>Contact Number</ion-label>\n        <ion-input name="contact_number" type="number" [readonly]="isReadonly" [(ngModel)]="data.contact_number" required></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label> Whatsapp Number</ion-label>\n        <ion-input name="whatsapp_number" type="number" [readonly]="isReadonly" [(ngModel)]="data.whatsapp_number" ></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label>Relation With Family head </ion-label>\n        <ion-input name="family_head_relation" type="text"  [readonly]="isReadonly" [(ngModel)]="data.family_head_relation" ></ion-input>\n      </ion-item>\n    </ion-list>\n    <!-- <button ion-button (click)="updata(form)" type="submit" [disabled]="!form.valid" block>Update Beneficiary\n    </button> -->\n\n  </form>\n  <button ion-button (click)="Beneficiary_kycs()" block>View kycs\n  </button>\n   <!-- <button *ngIf="data.server_id > 0" ion-button (click)="start_survey()" block>Start Surve </button> -->\n\n\n\n\n\n</ion-content>'/*ion-inline-end:"/home/linkwok/Documents/ivdp/src/pages/beneficiary-profile/beneficiary-profile.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["o" /* NavController */], __WEBPACK_IMPORTED_MODULE_5__providers_app_global_app_global__["a" /* AppGlobalProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_database_database__["a" /* DatabaseProvider */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["p" /* NavParams */]])
    ], BeneficiaryProfilePage);
    return BeneficiaryProfilePage;
}());

//# sourceMappingURL=beneficiary-profile.js.map

/***/ }),

/***/ 166:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GrievancePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_database_database__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_app_global_app_global__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_data_getter_service_data_getter_service__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__grievance_form_grievance_form__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_user_data_ts__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/**
 * Generated class for the GrievancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var GrievancePage = /** @class */ (function () {
    function GrievancePage(navCtrl, navParams, dataGetterService, loadingCtrl, events, user, modalCtrl, toastCtrl, appGlobal, sqldatabasegetter) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataGetterService = dataGetterService;
        this.loadingCtrl = loadingCtrl;
        this.events = events;
        this.user = user;
        this.modalCtrl = modalCtrl;
        this.toastCtrl = toastCtrl;
        this.appGlobal = appGlobal;
        this.sqldatabasegetter = sqldatabasegetter;
        this.grievance_m = [];
        this.queryText = '';
        this.grievanceWhoseList = [];
        this.excludeWhoseGrievances = ["mine"];
        this.descending = false;
        this.order = -1;
        this.field = 'updated_at';
        this.beneficiary_id = navParams.get('beneficiary_id');
        this.autoincrement_id = navParams.get('auto_increment_id');
        this.sqldatabasegetter.getKycsdata(this.beneficiary_id, this.autoincrement_id, this.ccallBack, this);
        this.events.subscribe('reload:page-grievance', function () {
            _this.loadGrievances(null);
        });
    }
    GrievancePage.prototype.dorefresher = function (ev) {
        var _this = this;
        setTimeout(function () {
            _this.loadGrievances(ev);
            ev.complete();
        }, 1000);
    };
    GrievancePage.prototype.ionViewDidEnter = function () {
        this.loadGrievances(null);
        // alert("ionViewDidEnter")
        this.sqldatabasegetter.getKycsdata(this.beneficiary_id, this.autoincrement_id, this.ccallBack, this);
    };
    GrievancePage.prototype.ionViewDidLoad = function () {
        this.loadGrievances(null);
        //alert("ionViewDidLoad")
        console.log('ionViewDidLoad GrievancePage');
    };
    GrievancePage.prototype.ccallBack = function (t) {
        t.loadGrievances(null);
    };
    GrievancePage.prototype.loadGrievances = function (ref) {
        if (this.sqldatabasegetter.offlineCasekycs.length > 0) {
            this.grievance_m = [];
            for (var i = 0; i <= this.sqldatabasegetter.offlineCasekycs.length; i++) {
                if (this.sqldatabasegetter.offlineCasekycs[i] != undefined) {
                    console.log(this.sqldatabasegetter.offlineCasekycs[i]);
                    this.grievance_m.push(this.sqldatabasegetter.offlineCasekycs[i]);
                }
            }
            if (ref != null) {
                ref.complete();
            }
        }
        else {
            this.grievance_m = [];
            console.log("No data i array");
            if (ref != null) {
                ref.complete();
            }
        }
    };
    GrievancePage.prototype.goToSRForm = function () {
        this.UserId = this.user.userData.id;
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__grievance_form_grievance_form__["a" /* GrievanceFormPage */], {
            Surveyor: this.UserId,
            beneficiary_id: this.beneficiary_id,
            auto_increment_id: this.autoincrement_id
        });
    };
    GrievancePage.prototype.getLastActivity = function (updated_at) {
        return __WEBPACK_IMPORTED_MODULE_7_moment__(updated_at).format("MMMM DD,YYYY hh:mm A");
    };
    GrievancePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'page-grievance',template:/*ion-inline-start:"/home/linkwok/Documents/ivdp/src/pages/grievance/grievance.html"*/'<!--\n  Generated template for the GrievancePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Kyc</ion-title>\n  </ion-navbar>\n  <ion-toolbar no-border-top>\n    <ion-searchbar color="primary" [(ngModel)]="queryText" placeholder="Search">\n    </ion-searchbar>\n\n  </ion-toolbar>\n</ion-header>\n\n\n<ion-content padding>\n  <ion-refresher (ionRefresh)="dorefresher($event)">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n\n\n  <!-- <ion-list *ngIf="grievance_m.shownGrievances > 0"> -->\n  <ion-list>\n    <ion-card\n      *ngFor="let grievance of grievance_m | search : {term:queryText,fields:[\'id\',\'kyc_number\',\'state\']} | sort: {property: field, order: order}"\n      [hidden]="grievance.hide">\n      <div class="{{\'gr_state_sidebar_\'+ grievance.state}}">\n\n        <!--<ion-card>-->\n        <ion-card-header>\n\n          {{grievance.kyc_name}}\n          <span class="pull-right sr-age"> {{grievance.kyc_person_id}}</span>\n\n        </ion-card-header>\n        <ion-card-content>\n          <p>Kyc Person Type: <strong>{{grievance.kyc_person_type}}</strong></p>\n          <p>Kyc Details: <strong>{{grievance.kyc_detail}}</strong></p>\n          <p>Kyc Number: <strong>{{grievance.kyc_number}}</strong></p>\n          <p>Kyc File: <a href="{{grievance.kyc_file}}"> <strong>Download</strong> </a></p>\n\n          <img src="{{grievance.kyc_image}}" alt="">\n\n\n        </ion-card-content>\n        <ion-row *ngIf="grievance_m.updated_at">\n          <ion-col>\n            <ion-note class="pull-right" style="color:black;">\n              Last Activity: <b>{{getLastActivity(grievance_m.updated_at)}}</b>\n            </ion-note>\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col>\n            <ion-badge class="pull-right">{{grievance_m.state}}</ion-badge>\n          </ion-col>\n        </ion-row>\n\n      </div>\n    </ion-card>\n  </ion-list>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n  <!-- <ion-list>\n    <ion-card *ngFor="let grievance of grievance_m | search : {term:queryText,fields:[\'uid\',\'content\',\'state\']} | sort: {property: field, order: order}" (click)="goToGrievance(grievance.uid)" [hidden]="grievance.hide">\n      <div class="{{\'gr_state_sidebar_\'+grievance.state}}">\n\n     \n      <ion-card-header>\n        {{grievance_m.kyc_person_id}}\n        <span class="pull-right sr-age">{{grievance_m.kyc_name}}</span>\n\n      </ion-card-header>\n      <ion-card-content>\n        <div [innerHtml]="\'<div>\'+grievance.content.substring(0,150)+\'....</div>\'">\n       \n        </div>\n     \n      </ion-card-content>\n      <ion-row *ngIf="grievance.updated_at">\n        <ion-col>\n          <ion-note class="pull-right" style="color:black;">\n            Last Activity: <b>{{getLastActivity(grievance.updated_at)}}</b>\n          </ion-note>\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col>\n          <ion-badge class="pull-right">{{grievance.state}}</ion-badge>\n        </ion-col>\n      </ion-row>\n     \n      </div>\n    </ion-card>\n  </ion-list> -->\n  <ion-fab right bottom>\n    <button ion-fab (click)="goToSRForm()">\n      <ion-icon name="add"></ion-icon>\n    </button>\n  </ion-fab>\n\n  <ion-item *ngIf="grievance_m.shownGrievances === 0" text-center>\n    No Grievance to be Shown\n  </ion-item>\n\n</ion-content>'/*ion-inline-end:"/home/linkwok/Documents/ivdp/src/pages/grievance/grievance.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["o" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["p" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__providers_data_getter_service_data_getter_service__["a" /* DataGetterServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["k" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* Events */],
            __WEBPACK_IMPORTED_MODULE_6__providers_user_data_ts__["a" /* UserData */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["m" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["r" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1__providers_app_global_app_global__["a" /* AppGlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_0__providers_database_database__["a" /* DatabaseProvider */]])
    ], GrievancePage);
    return GrievancePage;
}());

//# sourceMappingURL=grievance.js.map

/***/ }),

/***/ 168:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GrievanceFormPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_database_database__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_vibration__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_app_global_app_global__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_data_setter_data_setter__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_data_getter_service_data_getter_service__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









/**
 * Generated class for the GrievanceFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var GrievanceFormPage = /** @class */ (function () {
    function GrievanceFormPage(navCtrl, navParams, dataSetterService, dataGetterService, events, toastCtrl, loadingCtrl, appGlobal, camera, platform, sqldatabasegetter, vibration) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataSetterService = dataSetterService;
        this.dataGetterService = dataGetterService;
        this.events = events;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.appGlobal = appGlobal;
        this.camera = camera;
        this.platform = platform;
        this.sqldatabasegetter = sqldatabasegetter;
        this.vibration = vibration;
        this.grievance = {
            title: "",
            content: "",
            idea_type: "idea",
            grievance_type: "",
            category: ''
        };
        this.AddKyc = [];
        this.kyc_name = [];
        this.SurveyorID = navParams.get('Surveyor');
        this.beneficiary_id = navParams.get('beneficiary_id');
        this.autoincrement_id = navParams.get('auto_increment_id');
        this.kyc_name = [{ 'id': 1, 'name': 'Aadhar Card front' }, { 'id': 2, 'name': 'Aadhar Card back' }, { 'id': 3, 'name': 'PAN Card' }, { 'id': 4, 'name': 'BPL Card' }, { 'id': 5, 'name': 'Ration Card' }, { 'id': 6, 'name': 'Bank Account' }];
        //alert("@@@@@@@@@@@@    "  + this.beneficiary_id +"                " + this.autoincrement_id+"                      "+ this.SurveyorID)
        this.initMaintenanceRequest();
        // alert("kycs form " +this.beneficiary_id  + "   AND    "  +"AUTO INCRMENT  " +this.autoincrement_id   )
    }
    GrievanceFormPage.prototype.initMaintenanceRequest = function () {
        this.AddKyc = {
            kyc_person_id: this.beneficiary_id,
            kyc_person_type: '',
            kyc_name: '',
            kyc_detail: '',
            kyc_number: '',
            kyc_file: '',
            user_id: this.SurveyorID,
            server_id: this.autoincrement_id
        };
    };
    GrievanceFormPage.prototype.loadGrievanceCategories = function (ref) {
        // let loading = this.loadingCtrl.create({
        //   content: 'Please wait...'
        // });
        // if (ref === null) {
        //   loading.present();
        // }
        // this.dataGetterService.getGrievanceCategories()
        //   .subscribe((data: any) => {
        //     console.log("Grievance Categories Loaded", data);
        //     if (data.success) {
        //       this.grievance_categories = data.grievanceTypes;
        //     } else {
        //       this.grievance_categories = [];
        //     }
        //     loading.dismiss();
        //     if (ref != null) {
        //       ref.complete();
        //     }
        //   }, err => {
        //     console.log(err);
        //     this.grievance_categories = [];
        //     const toast = this.toastCtrl.create({
        //       message: this.appGlobal.ServerError,
        //       duration: 3000
        //     });
        //     toast.present();
        //     loading.dismiss();
        //     if (ref != null) {
        //       ref.complete();
        //     }
        //   });
    };
    GrievanceFormPage.prototype.ionViewDidEnter = function () {
        this.loadGrievanceCategories(null);
    };
    GrievanceFormPage.prototype.submitSR = function (d) {
        d["kyc_image"] = this.imageuri;
        // d["kyc_file"] =this.imageURI
        this.sqldatabasegetter.insertkycsdata(d, this.beneficiary_id, this.autoincrement_id);
        if (this.sqldatabasegetter.insertkycsdata) {
            if (this.navCtrl.canGoBack) {
                this.navCtrl.pop();
            }
            else {
                var toast = this.toastCtrl.create({
                    message: this.appGlobal.ServerError,
                    duration: 3000
                });
                toast.present();
            }
        }
        //  alert("Create Grievance Request  " + 
        //  JSON.stringify(d));
        // let loading = this.loadingCtrl.create({
        //   content: 'Please wait...'
        // });
        // loading.present();
        // -------------------------FOR ONLINE------------------------
        // this.dataSetterService.createGrievance(d)
        //   .subscribe((data: any) => {
        //     alert("Create Grievance Response       " + data);
        //     loading.dismiss();
        //     if (data.success) {
        //       this.events.publish('reload:grievance');
        //       const toast = this.toastCtrl.create({
        //         message: data.message,
        //         duration: 3000
        //       });
        //       toast.present();
        //       if (this.navCtrl.canGoBack) {
        //         this.navCtrl.pop();
        //       }
        //       this.vibration.vibrate(this.appGlobal.vibrationTimings);
        //     } else {
        //       const toast = this.toastCtrl.create({
        //         message: data.errors,
        //         duration: 3000
        //       });
        //       toast.present();
        //     }
        //   }, err => {
        //     loading.dismiss();
        //     alert(JSON.stringify(err));
        //     const toast = this.toastCtrl.create({
        //       message: this.appGlobal.ServerError,
        //       duration: 3000
        //     });
        //     toast.present();
        //   });
    };
    GrievanceFormPage.prototype.getImageFromCamera = function () {
        var _this = this;
        var options = {
            quality: 50,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
            saveToPhotoAlbum: true,
            cameraDirection: 0
        };
        this.platform.ready().then(function () {
            if (_this.platform.is('cordova')) {
                _this.camera.getPicture(options).then(function (imageData) {
                    _this.imageURI = 'data:image/jpeg;base64,' + imageData;
                    _this.imageuri = imageData;
                    //alert(this.imageURI);
                }, function (err) {
                    console.log(err);
                    // this.presentToast(err);
                });
            }
        });
    };
    GrievanceFormPage.prototype.getImageFromFS = function () {
        var _this = this;
        var options = {
            quality: 20,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            correctOrientation: true
        };
        this.camera.getPicture(options).then(function (imageData) {
            _this.imageURI = 'data:image/jpeg;base64,' + imageData;
            _this.imageuri = imageData;
        }, function (err) {
            console.log(err);
            // this.presentToast(err);
        });
    };
    GrievanceFormPage.prototype.logForm = function (form) {
        this.submitSR(form.value);
    };
    GrievanceFormPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad GrievanceFormPage');
    };
    GrievanceFormPage.prototype.isReadonly = function () { return true; };
    GrievanceFormPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_5__angular_core__["m" /* Component */])({
            selector: 'page-grievance-form',template:/*ion-inline-start:"/home/linkwok/Documents/ivdp/src/pages/grievance-form/grievance-form.html"*/'<!--\n  Generated template for the GrievanceFormPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Add kyc</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <form #form="ngForm">\n    <ion-list>\n\n\n      <ion-item>\n        <ion-label stacked floating color="primary">Person ID</ion-label>\n        <ion-input name="kyc_person_id" type="number" [(ngModel)]="AddKyc.kyc_person_id" required></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label stacked floating color="primary">User ID</ion-label>\n        <ion-input name="user_id" [readonly]="isReadonly" [(ngModel)]="AddKyc.user_id" required></ion-input>\n      </ion-item>\n      <!-- <ion-item>\n        <ion-label stacked floating color="primary">Person Occupation</ion-label>\n        <ion-input name="kyc_person_type" type="text" [(ngModel)]="AddKyc.kyc_person_type" required></ion-input>\n      </ion-item> -->\n      <ion-item>\n        <ion-label stacked floating color="primary">Document Name</ion-label>\n        <!-- <ion-input name="kyc_name" type="text" [(ngModel)]="AddKyc.kyc_name" required></ion-input> -->\n        <ion-select [(ngModel)]="AddKyc.kyc_name" name="kyc_name" required>\n          <ion-option value="{{v.name}}" *ngFor="let v of kyc_name">{{v.name}}</ion-option>\n        </ion-select>\n      </ion-item>\n      <ion-item>\n        <ion-label stacked floating color="primary">Document Details</ion-label>\n        <ion-input name="kyc_detail" type="text" [(ngModel)]="AddKyc.kyc_detail" required></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label stacked floating color="primary">Document Number</ion-label>\n        <ion-input name="kyc_number" type="text" [(ngModel)]="AddKyc.kyc_number" required></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label>Document Image</ion-label>\n      </ion-item>\n    </ion-list>\n    <ion-item *ngIf="imageURI" required>\n      <img src="{{imageURI}}" *ngIf="imageURI" alt="Ionic File" width="300" />\n    </ion-item>\n    <ion-buttons>\n      <ion-grid>\n        <ion-row>\n          <ion-col>\n            <button ion-button color="secondary" round (click)="getImageFromCamera()" block>Camera</button>\n          </ion-col>\n          <ion-col>\n            <button ion-button color="secondary" round (click)="getImageFromFS()" block>Gallery</button>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-buttons>\n    <button ion-button (click)="logForm(form)" type="submit" [disabled]="!form.valid" block>submit </button>\n  </form>\n</ion-content>'/*ion-inline-end:"/home/linkwok/Documents/ivdp/src/pages/grievance-form/grievance-form.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["o" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["p" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_6__providers_data_setter_data_setter__["a" /* DataSetterProvider */],
            __WEBPACK_IMPORTED_MODULE_7__providers_data_getter_service_data_getter_service__["a" /* DataGetterServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* Events */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["r" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["k" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_app_global_app_global__["a" /* AppGlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["q" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_0__providers_database_database__["a" /* DatabaseProvider */],
            __WEBPACK_IMPORTED_MODULE_1__ionic_native_vibration__["a" /* Vibration */]])
    ], GrievanceFormPage);
    return GrievanceFormPage;
}());

//# sourceMappingURL=grievance-form.js.map

/***/ }),

/***/ 169:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GrievanceShowPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_native_vibration__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_app_global_app_global__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__comments_comments__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular_components_toast_toast_controller__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_data_setter_data_setter__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_data_getter_service_data_getter_service__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_lodash__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_lodash__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










/**
 * Generated class for the GrievanceShowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var GrievanceShowPage = /** @class */ (function () {
    function GrievanceShowPage(navCtrl, navParams, dataGetterService, loadingCtrl, events, dataSetter, alertCtrl, toastCtrl, modalCtrl, appGlobal, vibration) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataGetterService = dataGetterService;
        this.loadingCtrl = loadingCtrl;
        this.events = events;
        this.dataSetter = dataSetter;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.modalCtrl = modalCtrl;
        this.appGlobal = appGlobal;
        this.vibration = vibration;
        this.initalGrievance = {
            uuid: '',
            state: '',
            title: '',
            grievance_category: '',
            grievance_type: '',
            content: '',
            attachment: [],
            allocated_users: [],
            comments: [],
        };
        this.isAllocating = false;
        this.viewAllocated = [];
        this.areAllocationChanged = false;
        this.getAllocationUsers = function (text) {
            console.log("Text", text);
            return _this.dataGetterService.getSuggestions({
                item_id: _this.Grievance.id,
                item_type: _this.Grievance.item_type,
                search_term: text
            }).map(function (data) {
                if (data.has_users) {
                    return data.users;
                }
                else {
                    console.log("Grievance getSuggestions", data.message);
                    _this.showToast(data.message);
                    return [];
                }
            });
        };
        this.id = navParams.get('id');
        this.loadGrievanceDetails(null, this.id);
        this.events.subscribe('reload:grievanceShow', function (isNotification, id) {
            _this.id = id;
            _this.refreshPage(null);
        });
    }
    GrievanceShowPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad GrievanceShowPage');
    };
    GrievanceShowPage.prototype.loadGrievanceDetails = function (ref, id) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        if (ref === null) {
            loading.present();
        }
        this.dataGetterService.loadIdeaDetail(id)
            .subscribe(function (data) {
            console.log("Grievance Details Loaded", data);
            if (data.success) {
                _this.Grievance = data.idea;
                _this.items = data.timeline;
                _this.updateAllocatedTags();
            }
            else {
                // this.Grievance = this.initalGrievance;
                if (_this.navCtrl.canGoBack()) {
                    _this.navCtrl.pop();
                }
                var toast = _this.toastCtrl.create({
                    message: data.message,
                    duration: 3000
                });
                toast.present();
            }
            loading.dismiss();
            if (ref != null) {
                ref.complete();
            }
        }, function (err) {
            console.log(err);
            // this.Grievance = this.initalGrievance;
            var toast = _this.toastCtrl.create({
                message: _this.appGlobal.ServerError,
                duration: 3000
            });
            toast.present();
            loading.dismiss();
            if (ref != null) {
                ref.complete();
            }
            if (_this.navCtrl.canGoBack()) {
                _this.navCtrl.pop();
            }
        });
    };
    GrievanceShowPage.prototype.refreshPage = function (ev) {
        this.loadGrievanceDetails(ev, this.id);
    };
    GrievanceShowPage.prototype.comment = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__comments_comments__["a" /* CommentsPage */], { rootItem: this.Grievance });
        modal.present();
        modal.onWillDismiss(function () {
            console.log("Comment Modal Closed");
        });
    };
    GrievanceShowPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 5000
        });
        toast.present();
    };
    GrievanceShowPage.prototype.allocateUsers = function () {
        this.isAllocating = !this.isAllocating;
    };
    GrievanceShowPage.prototype.updateAllocatedTags = function () {
        this.viewAllocated = __WEBPACK_IMPORTED_MODULE_9_lodash__["map"](this.Grievance.allocated_users, 'name');
    };
    GrievanceShowPage.prototype.onAddAllocation = function (item) {
        console.log("onAddAllocation", item);
        this.areAllocationChanged = true;
    };
    GrievanceShowPage.prototype.onRemoveAllocation = function (item) {
        console.log("onRemoveAllocation", item);
        this.areAllocationChanged = true;
    };
    GrievanceShowPage.prototype.onRemovingAllocation = function (tag) {
        var confirm = window.confirm('Do you really want to remove this tag?');
        return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"]
            .of(tag)
            .filter(function () { return confirm; });
    };
    GrievanceShowPage.prototype.submitAllocation = function () {
        var _this = this;
        console.log("submitAllocation", this.Grievance.allocated_users);
        if (this.Grievance.allocated_users.length > 0 && this.areAllocationChanged) {
            var alert_1 = this.alertCtrl.create({
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
                        handler: function (data) {
                        }
                    },
                    {
                        text: "Allocate",
                        handler: function (data) {
                            console.log("allocateComment", data.comment);
                            if (data.comment !== '') {
                                _this.allocateRequest({
                                    item_id: _this.Grievance.id,
                                    item_type: _this.Grievance.item_type,
                                    user_id: _this.Grievance.allocated_users,
                                    comment: data.comment
                                });
                            }
                            else {
                                var toast = _this.toastCtrl.create({
                                    message: "Comment is mandatory",
                                    duration: 5000
                                });
                                toast.present();
                            }
                        }
                    }
                ]
            });
            alert_1.present();
        }
        else if (!this.areAllocationChanged) {
            this.allocateUsers();
        }
        else {
            var toast = this.toastCtrl.create({
                message: "You can allocate user or re-allocate user",
                duration: 5000
            });
            toast.present();
        }
    };
    GrievanceShowPage.prototype.allocateRequest = function (request) {
        var _this = this;
        console.log("Allocate Request", request);
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.dataSetter.allocateUser(request)
            .subscribe(function (data) {
            console.log("Allocate Response", data);
            loading.dismiss();
            if (data.success) {
                _this.areAllocationChanged = false;
                _this.updateAllocatedTags();
                _this.allocateUsers();
                _this.vibration.vibrate(_this.appGlobal.vibrationTimings);
            }
            // else {
            //   const toast = this.toastCtrl.create({
            //     message: data.message,
            //     duration: 3000
            //   });
            //   toast.present();
            // }
        }, function (err) {
            loading.dismiss();
            console.log(err);
            var toast = _this.toastCtrl.create({
                message: _this.appGlobal.ServerError,
                duration: 3000
            });
            toast.present();
        });
    };
    GrievanceShowPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_6__angular_core__["m" /* Component */])({
            selector: 'page-grievance-show',template:/*ion-inline-start:"/home/linkwok/Documents/ivdp/src/pages/grievance-show/grievance-show.html"*/'<!--\n  Generated template for the GrievanceShowPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{Grievance ? Grievance.uuid : \'\'}}\n    </ion-title>\n    <ion-buttons end *ngIf="Grievance" >\n      <button ion-button icon-only clear (click)="allocateUsers()" *ngIf="Grievance.Can_allocate">\n        <ion-icon [name]="Grievance.allocated_users.length > 0 ? \'git-compare\' : \'git-network\'"></ion-icon>\n      </button>\n      <button ion-button icon-only clear (click)="comment()" *ngIf="Grievance.can_comment">\n        <ion-icon name=\'chatbubbles\'></ion-icon>\n        {{Grievance.comments.length}}\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n  <div class="gr_state_header_{{Grievance ? Grievance.state : \'\'}}"></div>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-refresher (ionRefresh)="refreshPage($event)">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n  <div *ngIf="Grievance">\n    <div *ngIf="isAllocating">\n      <tag-input \n        [(ngModel)]="Grievance.allocated_users" \n        [identifyBy]="\'id\'" \n        [displayBy]="\'name\'" \n        [onlyFromAutocomplete]="true" \n        [placeholder]="\'Type User name\'"\n        [secondaryPlaceholder]="\'Search User\'" \n        [clearOnBlur]="true" \n        [onTextChangeDebounce]="500"\n        [maxItems]="Grievance.allocation_limit" \n        (onAdd)="onAddAllocation($event)"\n        (onRemove)="onRemoveAllocation($event)"\n        [onRemoving]="onRemovingAllocation">\n        <tag-input-dropdown \n          [showDropdownIfEmpty]="true" \n          [identifyBy]="\'id\'" \n          [displayBy]="\'name\'" \n          [focusFirstElement]="true"\n          [minimumTextLength]="1"\n          [autocompleteObservable]="getAllocationUsers">\n          <ng-template let-item="item" let-index="index">\n            {{ item.name }}\n          </ng-template>\n        </tag-input-dropdown>\n      </tag-input>\n      <button ion-button full (click)="submitAllocation()">{{viewAllocated.length > 0 ? \'Re-allocate\' : \'Allocate\'}}</button>\n      <hr/>\n    </div>\n    <ion-card>\n      <ion-card-header>\n        <ion-badge class="pull-right">{{Grievance.state}}</ion-badge>\n        <ion-title>\n        {{Grievance.title}}\n        </ion-title>\n      </ion-card-header>\n      <ion-card-content>\n        <ion-list>\n          <ion-item text-wrap>\n            Category: {{Grievance.grievance_category}}\n          </ion-item>\n          <ion-item text-wrap>\n            Type: {{Grievance.grievance_type}}\n          </ion-item>\n          <ion-item *ngIf=\'viewAllocated.length > 0\' text-wrap>\n            Allocated:\n            <ion-tags-input [(ngModel)]="viewAllocated" [readonly]="true"></ion-tags-input>\n            <!-- <tag-input [(ngModel)]="Idea.tagged_users" [identifyBy]="\'id\'" [displayBy]="\'name\'" [hideForm]="true" [removable]="false"></tag-input> -->\n          </ion-item>\n          <ion-item text-wrap>\n            Details:\n            <div [innerHtml]="Grievance.content">\n              <!--{{idea.content}}-->\n            </div>\n          </ion-item>\n        </ion-list>\n      </ion-card-content>\n\n    </ion-card>\n\n    <ion-list>\n      <ion-item *ngFor="let attach of Grievance.attachment">\n        <img src="{{attach.url}}" *ngIf="attach.file_type === \'image\'" alt="{{attach.file_name}}" width="300" />\n        <a href="{{attach.url}}" *ngIf="attach.file_type !== \'image\'" padding>{{attach.file_name}}</a>\n      </ion-item>\n    </ion-list>\n\n    <hr>\n  </div>\n  <timeline endIcon="call" *ngIf="items" >\n    <timeline-item *ngFor="let item of items">\n      <timeline-time [time]="item.time"></timeline-time>\n      <ion-icon [name]="item.icon"></ion-icon>\n      <ion-card>\n\n        <ion-card-header>\n          {{item.title}}\n        </ion-card-header>\n        <ion-card-content>\n          {{item.subtitle}}\n        </ion-card-content>\n        <hr>\n        <ion-card-content>\n          {{item.content}}\n        </ion-card-content>\n      </ion-card>\n    </timeline-item>\n\n  </timeline>\n\n\n</ion-content>\n'/*ion-inline-end:"/home/linkwok/Documents/ivdp/src/pages/grievance-show/grievance-show.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7_ionic_angular__["o" /* NavController */], __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["p" /* NavParams */], __WEBPACK_IMPORTED_MODULE_8__providers_data_getter_service_data_getter_service__["a" /* DataGetterServiceProvider */], __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["k" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["f" /* Events */], __WEBPACK_IMPORTED_MODULE_5__providers_data_setter_data_setter__["a" /* DataSetterProvider */],
            __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular_components_toast_toast_controller__["a" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["m" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1__providers_app_global_app_global__["a" /* AppGlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_0__ionic_native_vibration__["a" /* Vibration */]])
    ], GrievanceShowPage);
    return GrievanceShowPage;
}());

//# sourceMappingURL=grievance-show.js.map

/***/ }),

/***/ 170:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IntroPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_database_Dbmaneger__ = __webpack_require__(110);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the IntroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var IntroPage = /** @class */ (function () {
    function IntroPage(navCtrl, navParams, db) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.db = db;
        this.introContent = [];
        this.setIntroContent();
        this.db.getbenificialydata();
        this.db.getkycsdata();
        this.db.getsurvey();
        this.db.gethousehold();
        this.db.getQuestion();
        this.db.getOpections();
    }
    IntroPage.prototype.navHome = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
    };
    IntroPage.prototype.ionViewDidLoad = function () {
        // this.setIntroContent();
        console.log('ionViewDidLoad IntroPage');
    };
    IntroPage.prototype.setIntroContent = function () {
        var titles = ['Corporate Timings', "Plant Timings", "Leave Policy", "", "Health and wellness", '', 'Dress Code', '', '', 'Employee Engagement', 'Sharing Ideas', 'Travel Management'];
        var images = ['corp_timings.png', ' factory_timings.png', 'leave_policy_holidays.png ', 'maternity_leave.png', 'death_coverage.png', 'yearly_checkup.png', 'dress_code.png', 'plant_dress_code.png', 'outside_building.png', 'birthdays.png', 'sharing_ideas.png', 'travel_bookings.png'];
        var contents = ["9.30 – 17.30  Mon-Sat  (2 flexi Saturday’s weekly off per  month)",
            "9.00 – 17.30  (General  shift)<br> 7.00 - 15.00 (1st Shift)<br> 15.00  –  23.00  (2nd  shift)<br>  23.00  –  7.00  (3rd   shift) <br> Std. Working days: Mon-Sat ",
            "Employee can avail 10  days  of  casual  leave  & 10  days  of  sick  leave. Permanent  employees  get  24  days  of  privilege  leave ",
            "Expectant  mothers  get  26  weeks  of  maternity  leave.  Expectant  fathers  get  3  days  of  paternity  leave.  Adopting  families  get  5  days  of  leave.  ",
            "If  you’re  40  years  or  older,  you  get  free  health  checkup  yearly.  Your  spouse  gets  a  free  health  checkup  once  every  two  years.  ",
            "For  full-time  employees,spouse, two  children  (under  21) and dependent parents  will  be  covered  under  the  mediclaim  policy  up  to  Rs.  5  lac. ",
            "Corporate office: Men  –  Shirts  and  Trousers. <br> Women  –  Sari/Salwar/Office  formal  ",
            "Uniforms for all at Plant",
            "When  outside  the  office,  formal  ware  (suit  and  tie)  is  expected. ",
            "Get notificaiton about Birthdays,  Marriage Anniversary  and  Work  Anniversary  announcements in  Empower.  ",
            "Deepak  Group  encourages  sharing  Ideas, share your Ideas through Empower",
            "Travel  planning  and  booking  (local/domestic/international)  can be done from Empower. Approved  travel  will  automatically  be  converted  into  On  Duty  Leaves. ",
        ];
        for (var i = 0; i < images.length; i++) {
            this.introContent.push({ image: "assets/img/" + images[i].trim(), content: contents[i], title: titles[i] });
        }
    };
    IntroPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-intro',template:/*ion-inline-start:"/home/linkwok/Documents/ivdp/src/pages/intro/intro.html"*/'<ion-content>\n  <ion-slides pager="false" parallax="true" padding>\n\n    <!-- <ion-slide *ngFor="let item of introContent">\n      <h2>{{item.title}}</h2>\n      <img src="{{item.image}}" alt="{{item.image}}">\n      <h4>\n        <div [innerHtml]="item.content"></div>\n      </h4>\n    </ion-slide> -->\n\n    <ion-slide>\n      <img src="assets/img/appicon.png">\n      <h1>Get started now!</h1>\n      <button ion-button outline small (click)="navHome()">\n        Start using the app\n      </button>\n    </ion-slide>\n\n  </ion-slides>\n</ion-content>\n'/*ion-inline-end:"/home/linkwok/Documents/ivdp/src/pages/intro/intro.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_database_Dbmaneger__["a" /* DBmaneger */]])
    ], IntroPage);
    return IntroPage;
}());

//# sourceMappingURL=intro.js.map

/***/ }),

/***/ 171:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IdeaFormPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_native_vibration__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_app_global_app_global__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_data_setter_data_setter__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular_components_toast_toast_controller__ = __webpack_require__(26);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the IdeaFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var IdeaFormPage = /** @class */ (function () {
    function IdeaFormPage(navCtrl, navParams, dataSetterService, camera, toastCtrl, events, loadingCtrl, appGlobal, vibration) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataSetterService = dataSetterService;
        this.camera = camera;
        this.toastCtrl = toastCtrl;
        this.events = events;
        this.loadingCtrl = loadingCtrl;
        this.appGlobal = appGlobal;
        this.vibration = vibration;
        this.idea = {
            title: "",
            content: "",
            idea_type: "idea"
        };
    }
    IdeaFormPage.prototype.submitSR = function (d) {
        var _this = this;
        d["file"] = this.imageURI;
        console.log("Create Idea Request", d);
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.dataSetterService.createIdea(d)
            .subscribe(function (data) {
            console.log("Create Idea Response", data);
            loading.dismiss();
            if (data.success) {
                _this.events.publish('reload:idea');
                var toast = _this.toastCtrl.create({
                    message: data.message,
                    duration: 3000
                });
                toast.present();
                if (_this.navCtrl.canGoBack) {
                    _this.navCtrl.pop();
                }
                _this.vibration.vibrate(_this.appGlobal.vibrationTimings);
            }
            else {
                var toast = _this.toastCtrl.create({
                    message: data.errors,
                    duration: 3000
                });
                toast.present();
            }
        }, function (err) {
            loading.dismiss();
            console.log(err);
            var toast = _this.toastCtrl.create({
                message: _this.appGlobal.ServerError,
                duration: 3000
            });
            toast.present();
        });
    };
    IdeaFormPage.prototype.logForm = function (form) {
        console.log(form.value);
        this.submitSR(form.value);
        // this.navCtrl.push(IdeaPage);
    };
    IdeaFormPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad IdeaFormPage');
    };
    IdeaFormPage.prototype.getImageFromCamera = function () {
        var _this = this;
        var options = {
            quality: 60,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.CAMERA,
            cameraDirection: 0,
            correctOrientation: true,
            saveToPhotoAlbum: true,
        };
        this.camera.getPicture(options).then(function (imageData) {
            _this.imageURI = 'data:image/jpeg;base64,' + imageData;
        }, function (err) {
            console.log(err);
        });
    };
    IdeaFormPage.prototype.getImageFromFS = function () {
        var _this = this;
        var options = {
            quality: 60,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            correctOrientation: true,
        };
        this.camera.getPicture(options).then(function (imageData) {
            _this.imageURI = 'data:image/jpeg;base64,' + imageData;
        }, function (err) {
            console.log(err);
            // this.presentToast(err);
        });
    };
    IdeaFormPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'page-idea-form',template:/*ion-inline-start:"/home/linkwok/Documents/ivdp/src/pages/idea-form/idea-form.html"*/'<!--\n  Generated template for the IdeaFormPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>New Idea</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <form  #form="ngForm">\n    <ion-item>\n      <ion-input type="text" [(ngModel)]="idea.title" name="title" placeholder="Enter title of your idea" required></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-textarea [(ngModel)]="idea.content" name="content" rows="5" placeholder="Enter details" required></ion-textarea>\n    </ion-item>\n    <!--<ion-list>-->\n      <!--<ion-item>-->\n        <!--<ion-label>Category</ion-label>-->\n        <!--<ion-select [(ngModel)]="idea.category" name="category" required>-->\n          <!--<ion-option value="INTRANET">Intarnet</ion-option>-->\n          <!--<ion-option value="ERP & Other Applications">ERP & Other Applications</ion-option>-->\n          <!--<ion-option value="Infrastructure">Infrastructure</ion-option>-->\n\n        <!--</ion-select>-->\n      <!--</ion-item>-->\n    <!--</ion-list>-->\n\n      <!--<h4>Image Preview</h4>-->\n      <ion-item *ngIf="imageURI">\n        <img src="{{imageURI}}"  alt="Ionic File" width="300"/>\n      </ion-item>\n\n    <ion-buttons>\n      <!-- <p>{{imageURI}}</p> -->\n      <ion-grid>\n        <ion-row>\n          <ion-col>\n            <button ion-button color="secondary" round (click)="getImageFromCamera()" block>Camera</button>\n          </ion-col>\n          <ion-col>\n            <button ion-button color="secondary" round (click)="getImageFromFS()" block>Gallery</button>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-buttons>\n\n    <button ion-button (click)="logForm(form)" type="submit" [disabled]="!form.valid" block>Add Idea</button>\n  </form>\n\n\n</ion-content>\n\n'/*ion-inline-end:"/home/linkwok/Documents/ivdp/src/pages/idea-form/idea-form.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["p" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__providers_data_setter_data_setter__["a" /* DataSetterProvider */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_6_ionic_angular_components_toast_toast_controller__["a" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* Events */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["k" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1__providers_app_global_app_global__["a" /* AppGlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_0__ionic_native_vibration__["a" /* Vibration */]])
    ], IdeaFormPage);
    return IdeaFormPage;
}());

//# sourceMappingURL=idea-form.js.map

/***/ }),

/***/ 172:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_native_network__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_user_data_ts__ = __webpack_require__(29);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, userData, alertCtrl, network, events) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.userData = userData;
        this.alertCtrl = alertCtrl;
        this.network = network;
        this.events = events;
        this.login = { username: '', password: '' };
        this.submitted = false;
        this.events.subscribe('user:error', function () {
            _this.login.password = '';
        });
    }
    LoginPage.prototype.onLogin = function (form) {
        this.submitted = true;
        if (form.valid && this.userData.isValid(this.login.username, this.login.password)) {
            this.userData.login(this.login.username, this.login.password);
        }
    };
    LoginPage.prototype.forgotPassword = function () {
        var _this = this;
        console.log("Forgot Password");
        var alert = this.alertCtrl.create({
            title: 'Forgot Password',
            subTitle: 'Enter your registered email',
            inputs: [
                {
                    name: 'username',
                    placeholder: 'Your Registered Email Address',
                    type: 'email'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Submit',
                    handler: function (data) {
                        if (_this.userData.isValid(null, null, data.username)) {
                            console.log(data);
                            _this.userData.forgotPassword(data.username);
                        }
                        else {
                            return false;
                        }
                    }
                }
            ]
        });
        alert.present();
    };
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
        // if (this.network.type === 'none') {
        //   this.navCtrl.push(OfflinePage);
        // }
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/home/linkwok/Documents/ivdp/src/pages/login/login.html"*/'\n\n<ion-content padding>\n  <div class="logo">\n    <img src="assets/img/appicon.png" alt="Ionic logo">\n    <br>\n    <div>\n      <br>\n      <h4>Integrated Village Development Programme</h4>\n      <h6><i>A Deepak Foundation Initiative</i></h6>\n    </div>\n  </div>\n\n  <div class="helptext">\n    Enter your login credentials to start using the application\n  </div>\n  <form #loginForm="ngForm" novalidate>\n    <ion-list no-lines>\n      <ion-item>\n        <ion-label stacked floating color="primary">Username</ion-label>\n        <ion-input [(ngModel)]="login.username" name="username" type="text" #username="ngModel" \n        autocomplete=“true” spellcheck=“true” (change)="this.login.password = \'\';" autocapitalize="off"\n          required>\n        </ion-input>\n      </ion-item>\n      <p ion-text [hidden]="username.valid || submitted == false" color="danger" padding-left>\n        Username is required\n      </p>\n\n      <ion-item>\n        <ion-label stacked floating color="primary">Password</ion-label>\n        <ion-input [(ngModel)]="login.password" name="password" type="password" #password="ngModel" required>\n        </ion-input>\n      </ion-item>\n      <p ion-text [hidden]="password.valid || submitted == false" color="danger" padding-left>\n        Password is required\n      </p>\n    </ion-list>\n\n    <ion-row responsive-sm>\n      <ion-col>\n        <button ion-button round (click)="onLogin(loginForm)" type="submit" block>Login</button>\n      </ion-col>\n      <!-- <ion-col>\n        <button ion-button (click)="onSignup()" color="light" block>Signup</button>\n      </ion-col> -->\n    </ion-row>\n    <!-- <ion-row responsive-sm>\n      <ion-col text-center>\n        <button ion-button round clear (click)="forgotPassword()">\n          Forgot password?\n        </button>\n      </ion-col>\n    </ion-row> -->\n  </form>\n\n</ion-content>\n'/*ion-inline-end:"/home/linkwok/Documents/ivdp/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_user_data_ts__["a" /* UserData */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_0__ionic_native_network__["a" /* Network */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* Events */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 173:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LogoutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_data_setter_data_setter__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the LogoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LogoutPage = /** @class */ (function () {
    function LogoutPage(navCtrl, navParams, db) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.db = db;
    }
    LogoutPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LogoutPage');
    };
    LogoutPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-logout',template:/*ion-inline-start:"/home/linkwok/Documents/ivdp/src/pages/logout/logout.html"*/'<!--\n  Generated template for the LogoutPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>logout</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"/home/linkwok/Documents/ivdp/src/pages/logout/logout.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["o" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["p" /* NavParams */], __WEBPACK_IMPORTED_MODULE_0__providers_data_setter_data_setter__["a" /* DataSetterProvider */]])
    ], LogoutPage);
    return LogoutPage;
}());

//# sourceMappingURL=logout.js.map

/***/ }),

/***/ 174:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MaintenanceRequestFormPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_database_database__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_data_setter_data_setter__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_data_getter_service_data_getter_service__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_vibration__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_app_global_app_global__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ionic_angular_components_toast_toast_controller__ = __webpack_require__(26);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

//import { HttpClient } from '@angular/common/http';







/**
 * Generated class for the MaintenanceRequestFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MaintenanceRequestFormPage = /** @class */ (function () {
    function MaintenanceRequestFormPage(navCtrl, navParams, dataGetterService, dataSetterService, toastCtrl, events, loadingCtrl, appGlobal, sqldatabasegetter, vibration) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataGetterService = dataGetterService;
        this.dataSetterService = dataSetterService;
        this.toastCtrl = toastCtrl;
        this.events = events;
        this.loadingCtrl = loadingCtrl;
        this.appGlobal = appGlobal;
        this.sqldatabasegetter = sqldatabasegetter;
        this.vibration = vibration;
        this.maintenanceRequest = {};
        this.Addbeneficiary = {};
        this.assets = [];
        this.locations = [];
        this.villages = [];
        this.marital_status = [];
        this.education_status = [];
        this.primary_occupation = [];
        this.ownership_of_land = [];
        this.type_of_rationa_card = [];
        this.religions = [];
        this.castes = [];
        this.household_id = [];
        var time = new Date();
        this.timestamp = time.toISOString();
        this.SurveyorID = navParams.get('Surveyor');
        this.initMaintenanceRequest();
        this.getAllDroupdown();
    }
    MaintenanceRequestFormPage.prototype.ionViewDidLoad = function () {
        // alert('ionViewDidLoad MaintenanceRequestFormPage');
    };
    MaintenanceRequestFormPage.prototype.getAllDroupdown = function () {
        this.villages = [{ 'id': 1, 'name': 'Dhamani' }, { 'id': 2, 'name': 'Brahmagaon' }, { 'id': 3, 'name': 'Kalamgaon' }, { 'id': 4, 'name': 'Beriste' }, { 'id': 5, 'name': 'Ase' }, { 'id': 6, 'name': 'Karoli' }, { 'id': 7, 'name': 'Bavalpada' }];
        this.marital_status = [{ 'id': 1, 'name': 'Currently Married' }, { 'id': 2, 'name': 'Never Married' }, { 'id': 3, 'name': 'Divorced' }, { 'id': 4, 'name': 'Widow/Widower' }, { 'id': 5, 'name': 'Separated' }];
        this.education_status = [{ 'id': 1, 'name': 'Primary School' }, { 'id': 2, 'name': 'Higher Secondary/ intermediate' }, { 'id': 3, 'name': 'High School/ Matriculate' }, { 'id': 4, 'name': 'Graduate & Above' }, { 'id': 5, 'name': 'Literate but No Formal Schooling' }];
        this.primary_occupation = [{ 'id': 1, 'name': 'Student' }, { 'id': 2, 'name': 'Agriculture' }, { 'id': 3, 'name': 'Housewife' }, { 'id': 4, 'name': 'Wage/ casual Labour' }, { 'id': 5, 'name': 'Unemployed' }];
        this.ownership_of_land = [{ 'id': 1, 'name': 'Rented' }, { 'id': 2, 'name': 'Own' }];
        this.type_of_rationa_card = [{ 'id': 1, 'name': 'BPL' }, { 'id': 2, 'name': 'APL' }, { 'id': 3, 'name': "Don't Know" }];
        this.religions = [{ 'id': 1, 'name': 'Hindu' }, { 'id': 2, 'name': 'Buddhist' }, { 'id': 3, 'name': 'Sikh' }, { 'id': 4, 'name': 'Muslim' }, { 'id': 5, 'name': 'Other' }];
        this.castes = [{ 'id': 1, 'name': 'Scheduled Tribes' }, { 'id': 2, 'name': 'Schediled Cast' }, { 'id': 3, 'name': 'Other Backward Cast' }];
        this.makeid();
    };
    MaintenanceRequestFormPage.prototype.ionViewDidEnter = function () {
        // this.loadAssetsList();
    };
    MaintenanceRequestFormPage.prototype.initMaintenanceRequest = function () {
        //alert("in mantens request from " + this.timestamp)
        this.Addbeneficiary = {
            server_id: '',
            code: '',
            beneficiary_name: '',
            gender: '',
            age: '',
            date_of_birth: '',
            marital_status: '',
            caste: '',
            religion: '',
            primary_occupation: '',
            ownership_of_land: '',
            total_land_holding: '',
            total_family_income_average_monthly: '',
            education_status: '',
            height_in_cms: '',
            Weight_in_kgs: '',
            type_of_rationa_card: '',
            village_id: '',
            household_id: '',
            family_head_id: '',
            contact_number: '',
            whatsapp_number: '',
            user_id: this.SurveyorID,
            family_head_relation: '',
            created_at: this.timestamp,
            updated_at: ''
        };
        this.maintenanceRequest = {
            maintenanceasset_id: 0,
            detail: '',
            location: ''
        };
        this.assets = [];
    };
    MaintenanceRequestFormPage.prototype.submitMaintenanceRequest = function (data) {
        //alert(this.timestamp)
        // this.sqldatabasegetter.insertMainbeneficiary(data, this.timestamp);
        this.sqldatabasegetter.insertnewbeneficiary(data, this.timestamp);
        if (this.sqldatabasegetter.insertMainbeneficiary) {
            if (this.navCtrl.canGoBack) {
                this.navCtrl.pop();
            }
            else {
                var toast = this.toastCtrl.create({
                    message: this.appGlobal.ServerError,
                    duration: 3000
                });
                toast.present();
            }
        }
        // ------------------for-OnlineDAta----------------------------
        // let loading = this.loadingCtrl.create({
        //   content: 'Please wait...'
        // });
        // loading.present();
        // this.dataSetterService.createMaintenanceRequest(data).subscribe((data: any) => {
        //   console.log("Create Maintenance Response", data);
        //   loading.dismiss();
        //   if (data.success) {
        //     const toast = this.toastCtrl.create({
        //       message: data.message,
        //       duration: 3000
        //     });
        //     toast.present();
        //     if (this.navCtrl.canGoBack) {
        //       this.navCtrl.pop();
        //     }
        //     this.vibration.vibrate(this.appGlobal.vibrationTimings);
        //   } else {
        //     const toast = this.toastCtrl.create({
        //       message: data.errors,
        //       duration: 3000
        //     });
        //     toast.present();
        //   }
        // }, error => {
        //   loading.dismiss();
        //   console.log(error);
        //   const toast = this.toastCtrl.create({
        //     message: this.appGlobal.ServerError,
        //     duration: 3000
        //   });
        //   toast.present();
        // });
    };
    MaintenanceRequestFormPage.prototype.logForm = function (form) {
        this.submitMaintenanceRequest(form.value);
    };
    MaintenanceRequestFormPage.prototype.isReadonly = function () { return true; };
    MaintenanceRequestFormPage.prototype.select_village = function (ev) {
        this.household_id = [];
        this.sqldatabasegetter.gethouseholdid(ev, this);
    };
    MaintenanceRequestFormPage.prototype.makeid = function () {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~!@#$%&*)(+";
        for (var i = 0; i < 8; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        console.log(text);
    };
    MaintenanceRequestFormPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-maintenance-request-form',template:/*ion-inline-start:"/home/linkwok/Documents/ivdp/src/pages/maintenance-request-form/maintenance-request-form.html"*/'<!--\n  Generated template for the MaintenanceRequestFormPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <!-- <ion-title>New Facility Request</ion-title> -->\n\n    <ion-title>Add New Beneficiary</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <form #form="ngForm">\n    <ion-list>\n\n\n      <!-- <ion-item>\n        <ion-label stacked floating color="primary">Code</ion-label>\n        <ion-input name="code" type="number" [(ngModel)]="Addbeneficiary.code" required></ion-input>\n      </ion-item> -->\n      <ion-item>\n        <ion-label stacked floating color="primary">Surveyor ID</ion-label>\n        <ion-input name="user_id" [readonly]="isReadonly" [(ngModel)]="Addbeneficiary.user_id" required></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label stacked floating color="primary">Beneficiary name</ion-label>\n        <ion-input name="beneficiary_name" type="text" [(ngModel)]="Addbeneficiary.beneficiary_name" required>\n        </ion-input>\n      </ion-item>\n      <!-- <ion-item>\n        <ion-label stacked floating color="primary">Firstname</ion-label>\n        <ion-input name="firstname" type="text" [(ngModel)]="Addbeneficiary.firstname" required></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label stacked floating color="primary">Middlename</ion-label>\n        <ion-input name="middlename" type="text" [(ngModel)]="Addbeneficiary.middlename" required></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label stacked floating color="primary">Lastname</ion-label>\n        <ion-input name="lastname" type="text" [(ngModel)]="Addbeneficiary.lastname" required></ion-input>\n      </ion-item> -->\n      <ion-list radio-group [(ngModel)]="Addbeneficiary.gender" name="gender">\n        <ion-list-header><strong>Gender</strong></ion-list-header>\n        <ion-item>\n          <ion-label>Male</ion-label>\n          <ion-radio value="Male"></ion-radio>\n        </ion-item>\n        <ion-item>\n          <ion-label>Female</ion-label>\n          <ion-radio value="FeMale"></ion-radio>\n        </ion-item>\n        <ion-item>\n          <ion-label>Other</ion-label>\n          <ion-radio value="other"></ion-radio>\n        </ion-item>\n      </ion-list>\n      <ion-item>\n        <ion-label stacked floating color="primary">Age</ion-label>\n        <ion-input name="age" type="number" [(ngModel)]="Addbeneficiary.age"></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label stacked floating color="primary">Birth Date</ion-label>\n        <ion-datetime name="date_of_birth" displayFormat="DD/MMM/YYYY" [(ngModel)]="Addbeneficiary.date_of_birth">\n        </ion-datetime>\n      </ion-item>\n\n      <ion-item>\n        <ion-label stacked floating color="primary">Marital Status </ion-label>\n        <ion-select [(ngModel)]="Addbeneficiary.marital_status" name="marital_status" required>\n          <ion-option value="{{v.name}}" *ngFor="let v of marital_status">{{v.name}}</ion-option>\n        </ion-select>\n      </ion-item>\n      <ion-item>\n        <ion-label stacked floating color="primary">Caste</ion-label>\n        <ion-select [(ngModel)]="Addbeneficiary.caste" name="caste" required>\n          <ion-option value="{{v.name}}" *ngFor="let v of castes">{{v.name}}</ion-option>\n        </ion-select>\n      </ion-item>\n      <ion-item>\n        <ion-label stacked floating color="primary">Religion</ion-label>\n        <ion-select [(ngModel)]="Addbeneficiary.religion" name="religion" required>\n          <ion-option value="{{v.name}}" *ngFor="let v of religions">{{v.name}}</ion-option>\n        </ion-select>\n      </ion-item>\n      <ion-item>\n        <ion-label stacked floating color="primary">Primary Occupation</ion-label>\n        <ion-select [(ngModel)]="Addbeneficiary.primary_occupation" name="primary_occupation" required>\n          <ion-option value="{{v.name}}" *ngFor="let v of primary_occupation">{{v.name}}</ion-option>\n        </ion-select>\n      </ion-item>\n\n      <ion-item>\n        <ion-label stacked floating color="primary">Ownership Of Land</ion-label>\n        <ion-select [(ngModel)]="Addbeneficiary.ownership_of_land" name="ownership_of_land">\n          <ion-option value="{{v.name}}" *ngFor="let v of ownership_of_land">{{v.name}}</ion-option>\n        </ion-select>\n      </ion-item>\n\n      <ion-item>\n        <ion-label stacked floating color="primary">Total Land Holding In Acre </ion-label>\n        <ion-input name="total_land_holding" type="number" [(ngModel)]="Addbeneficiary.total_land_holding"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label stacked floating color="primary">Total Family Income Average Monthly</ion-label>\n        <ion-input name="total_family_income_average_monthly" type="number"\n          [(ngModel)]="Addbeneficiary.total_family_income_average_monthly" required></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label stacked floating color="primary">Education Status</ion-label>\n        <ion-select [(ngModel)]="Addbeneficiary.education_status" name="education_status" required>\n          <ion-option value="{{v.name}}" *ngFor="let v of education_status">{{v.name}}</ion-option>\n        </ion-select>\n      </ion-item>\n      <ion-item>\n        <ion-label stacked floating color="primary">Height In Cms</ion-label>\n        <ion-input name="height_in_cms" type="number" [(ngModel)]="Addbeneficiary.height_in_cms" required></ion-input>\n\n      </ion-item>\n      <ion-item>\n        <ion-label stacked floating color="primary">Weight In Kgs</ion-label>\n        <ion-input name="Weight_in_kgs" type="number" [(ngModel)]="Addbeneficiary.Weight_in_kgs" required></ion-input>\n      </ion-item>\n\n\n      <ion-item>\n        <ion-label stacked floating color="primary">Village ID</ion-label>\n        <ion-select [(ngModel)]="Addbeneficiary.village_id" name="village_id" (ionChange)="select_village($event)"\n          required>\n          <ion-option value="{{v.id}}" *ngFor="let v of villages">{{v.name}}</ion-option>\n        </ion-select>\n      </ion-item>\n\n      <ion-item *ngIf="household_id">\n        <ion-label stacked floating color="primary">House Hold ID </ion-label>\n        <!-- <ion-input name="household_id" type="number" [(ngModel)]="Addbeneficiary.household_id" required></ion-input> -->\n        <ion-select [(ngModel)]="Addbeneficiary.household_id" name="household_id" required >\n          <ion-option value="{{v.server_id}}" *ngFor="let v of household_id">{{v.hh_number}}</ion-option>\n        </ion-select>\n      </ion-item>\n      <ion-item>\n\n        <ion-label stacked floating color="primary">Family Head Id</ion-label>\n        <ion-input name="family_head_id" type="number" [(ngModel)]="Addbeneficiary.family_head_id" required></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label stacked floating color="primary">Ration Card Type</ion-label>\n        <ion-select [(ngModel)]="Addbeneficiary.type_of_rationa_card" name="type_of_rationa_card" required>\n          <ion-option value="{{v.name}}" *ngFor="let v of type_of_rationa_card">{{v.name}}</ion-option>\n        </ion-select>\n      </ion-item>\n\n      <ion-item>\n        <ion-label stacked floating color="primary">Contact Number</ion-label>\n        <ion-input name="contact_number" type="number" [(ngModel)]="Addbeneficiary.contact_number" maxlength="10"\n          pattern="[0-9]{10}" required></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label stacked floating color="primary"> Whatsapp Number</ion-label>\n        <ion-input name="whatsapp_number" type="number" [(ngModel)]="Addbeneficiary.whatsapp_number" maxlength="10"\n          pattern="[0-9]{10}"></ion-input>\n      </ion-item>\n      <ion-item>\n\n        <ion-label stacked floating color="primary">Relation With Family head </ion-label>\n        <ion-input name="family_head_relation" type="text" [(ngModel)]="Addbeneficiary.family_head_relation" required>\n        </ion-input>\n      </ion-item>\n\n\n\n\n    </ion-list>\n    <button ion-button (click)="logForm(form)" type="submit" [disabled]="!form.valid" block>Create Beneficiary\n    </button>\n\n  </form>\n</ion-content>'/*ion-inline-end:"/home/linkwok/Documents/ivdp/src/pages/maintenance-request-form/maintenance-request-form.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["p" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__providers_data_getter_service_data_getter_service__["a" /* DataGetterServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_data_setter_data_setter__["a" /* DataSetterProvider */],
            __WEBPACK_IMPORTED_MODULE_7_ionic_angular_components_toast_toast_controller__["a" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* Events */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_6__providers_app_global_app_global__["a" /* AppGlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_0__providers_database_database__["a" /* DatabaseProvider */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_vibration__["a" /* Vibration */]])
    ], MaintenanceRequestFormPage);
    return MaintenanceRequestFormPage;
}());

//# sourceMappingURL=maintenance-request-form.js.map

/***/ }),

/***/ 175:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QuestionCheckboxPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__survey_list_survey_list__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__suervy_suervy__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_app_global_app_global__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular_components_toast_toast_controller__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_database_database__ = __webpack_require__(27);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the QuestionCheckboxPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var QuestionCheckboxPage = /** @class */ (function () {
    function QuestionCheckboxPage(navCtrl, navParams, appGlobal, toastCtrl, sqldatabasegetter) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.appGlobal = appGlobal;
        this.toastCtrl = toastCtrl;
        this.sqldatabasegetter = sqldatabasegetter;
        this.options = [];
        this.is_last = 0;
        // beneficiary_id: string
        // auto_increment_id: string
        this.beneficiary_id = [];
        this.auto_increment_id = [];
        this.qindex = navParams.get("qindex");
        this.question_id = navParams.get("question_id");
        this.project_id = navParams.get("project_id");
        this.survey_id = navParams.get("survey_id");
        this.beneficiary_id = navParams.get('beneficiary_id');
        this.auto_increment_id = navParams.get('auto_increment_id');
        this.options = this.appGlobal.options;
        this.cbChecked = [];
        this.selectedCheckbox = {};
        this.loadQuestions();
    }
    QuestionCheckboxPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad QuestionCheckboxPage');
    };
    QuestionCheckboxPage.prototype.loadQuestions = function () {
        this.question = this.appGlobal.questionsList[this.qindex].text;
        this.key = this.appGlobal.questionsList[this.qindex].server_id;
        if (this.appGlobal.answers[this.key] != undefined) {
            this.answer = this.appGlobal.answers[this.key];
        }
        else {
            this.answer = {
                beneficiarie_id: this.auto_increment_id, server_id: this.beneficiary_id, survey_id: this.survey_id, question_id: this.key,
                language_id: 2, option_id: 2, option_text: "", image: "N/A", other_text: "no"
            };
        }
    };
    QuestionCheckboxPage.prototype.goToNext = function (e) {
        this.appGlobal.answers[this.key] = (this.answer);
        if (this.qindex == this.appGlobal.questionsList.length - 1) {
            this.is_last = 1;
            alert("Last Question");
            return;
        }
        var nq = this.qindex + 1;
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_1__suervy_suervy__["a" /* SuervyPage */], {
            project_id: this.project_id,
            survey_id: this.survey_id,
            question_id: this.question_id,
            beneficiary_id: this.beneficiary_id,
            auto_increment_id: this.auto_increment_id,
            qindex: (nq)
        });
    };
    QuestionCheckboxPage.prototype.goToPrev = function (e) {
        if (this.qindex == 0) {
            alert("First Question");
            return;
        }
        var nq = this.qindex - 1;
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_1__suervy_suervy__["a" /* SuervyPage */], {
            project_id: this.project_id,
            survey_id: this.survey_id,
            question_id: this.question_id,
            beneficiary_id: this.beneficiary_id,
            auto_increment_id: this.auto_increment_id,
            qindex: (nq)
        });
    };
    QuestionCheckboxPage.prototype.submit = function () {
        var data = this.appGlobal.answers;
        var key = Object.keys(data);
        for (var i = 0; i <= key.length; i++) {
            if (this.appGlobal.answers[key[i]] != undefined) {
                this.sqldatabasegetter.insertAnswer(this.appGlobal.answers[key[i]]);
            }
            if (i == key.length) {
                alert("submit scussfully");
                if (this.navCtrl.canGoBack) {
                    this.navCtrl.pop();
                    this.appGlobal.answers = [];
                    this.appGlobal.questionsList = [];
                    this.beneficiary_id = [];
                    this.auto_increment_id = [];
                    // this.navCtrl.setRoot(SurveyListPage, {
                    //   beneficiary_id: this.beneficiary_id,
                    //   auto_increment_id: this.auto_increment_id,
                    // })
                    this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_0__survey_list_survey_list__["a" /* SurveyListPage */]);
                    // this.navCtrl.setRoot(QuestionDropdownPage)
                }
                else {
                    var toast = this.toastCtrl.create({
                        message: this.appGlobal.ServerError,
                        duration: 3000
                    });
                    toast.present();
                }
            }
        }
    };
    QuestionCheckboxPage.prototype.updateOptions = function () {
        console.log(this.cbChecked);
    };
    QuestionCheckboxPage.prototype.getSelectedBen = function (e, i, a) {
        if (e.isChecked)
            return e.text;
    };
    QuestionCheckboxPage.prototype.removeNull = function (e, i, a) {
        return e != null;
    };
    QuestionCheckboxPage.prototype.getChanged = function (e) {
        console.log("Selected Checkbox:" + JSON.stringify(this.selectedCheckbox));
        console.log("Selected Checkbox:" + JSON.stringify(this.options));
        this.selectedCheckbox = this.options.map(this.getSelectedBen).filter(this.removeNull);
        console.log("Selected Checkbox:" + JSON.stringify(this.selectedCheckbox));
        console.log("Final String :" + JSON.stringify(this.selectedCheckbox).replace(/\[|\]|"|"/g, ""));
        this.answer.option_text = JSON.stringify(this.selectedCheckbox).replace(/\[|\]|"|"/g, "");
    };
    QuestionCheckboxPage.prototype.goTosurveylist = function () {
        this.appGlobal.answers = [];
        this.beneficiary_id = [];
        this.auto_increment_id = [];
        this.appGlobal.options = [];
        this.options = [];
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_0__survey_list_survey_list__["a" /* SurveyListPage */], {
            beneficiary_id: this.beneficiary_id,
            auto_increment_id: this.auto_increment_id,
        });
    };
    QuestionCheckboxPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'page-question-checkbox',template:/*ion-inline-start:"/home/linkwok/Documents/ivdp/src/pages/question-checkbox/question-checkbox.html"*/'<!--\n  Generated template for the QuestionCheckboxPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar hideBackButton>\n    <ion-title  text-center>Survey Started</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <h1><strong>\n      <p>{{question}}</p>\n    </strong>\n  </h1>\n  <ion-list>\n    <ion-item *ngFor="let entry of options ;let i = index">\n      <ion-label>{{entry.text}}</ion-label>\n\n      <ion-checkbox slot="end" *ngIf="entry.text != \'\'" [(ngModel)]="entry.isChecked"\n        (ionChange)="getChanged(entry.text)"></ion-checkbox>\n    </ion-item>\n  </ion-list>\n\n  <button ion-button *ngIf="is_last == 1" (click)="submit()">Submit</button>\n  <button ion-button *ngIf="is_last == 0" (click)="goToNext()">Next</button>\n  <button ion-button *ngIf="is_last == 0" (click)="goToPrev(\'a\')">Previous</button>\n\n  <div> <button ion-button  (click)="goTosurveylist()" buttom center>Back To Survey List </button></div> \n\n</ion-content>'/*ion-inline-end:"/home/linkwok/Documents/ivdp/src/pages/question-checkbox/question-checkbox.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["o" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["p" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__providers_app_global_app_global__["a" /* AppGlobalProvider */], __WEBPACK_IMPORTED_MODULE_5_ionic_angular_components_toast_toast_controller__["a" /* ToastController */], __WEBPACK_IMPORTED_MODULE_6__providers_database_database__["a" /* DatabaseProvider */]])
    ], QuestionCheckboxPage);
    return QuestionCheckboxPage;
}());

//# sourceMappingURL=question-checkbox.js.map

/***/ }),

/***/ 176:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QuestionDropdownPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_database_database__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__suervy_suervy__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_app_global_app_global__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular_components_toast_toast_controller__ = __webpack_require__(26);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the QuestionDropdownPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var QuestionDropdownPage = /** @class */ (function () {
    function QuestionDropdownPage(navCtrl, navParams, appGlobal, toastCtrl, sqldatabasegetter) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.appGlobal = appGlobal;
        this.toastCtrl = toastCtrl;
        this.sqldatabasegetter = sqldatabasegetter;
        this.queryText = '';
        this.is_last = 0;
        this.group = [];
        this.numberOfChecks = 1;
        this.checkBoxLimit = 1;
        this.sqldatabasegetter.getdataforgroupsurvey(this.ccallBack, this);
        this.project_id = navParams.get("project_id");
        this.survey_id = navParams.get("survey_id");
        this.qId = navParams.get("qId");
        this.survey_type = navParams.get("type");
    }
    QuestionDropdownPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad QuestionDropdownPage');
        console.log("@@@    " + this.appGlobal.groupsurveybeneficiaries);
    };
    QuestionDropdownPage.prototype.getSelectedBen = function (e, i, a) {
        if (e.isChecked)
            return e.server_id;
    };
    QuestionDropdownPage.prototype.getSelectid = function (e, i, a) {
        if (e.isChecked)
            return e.id;
    };
    QuestionDropdownPage.prototype.removeNull = function (e, i, a) {
        return e != null;
    };
    QuestionDropdownPage.prototype.ccallBack = function (t) {
        t.group = t.appGlobal.groupsurveybeneficiaries;
        t.group[0].isChecked = true;
    };
    QuestionDropdownPage.prototype.getChanged = function (e) {
        if (this.survey_type === "Single") {
            if (e.isChecked === true) {
                this.numberOfChecks++;
                this.Selection();
            }
            else {
                this.numberOfChecks--;
            }
        }
        else {
            this.checkBoxLimit = 2;
            this.Selection();
        }
    };
    QuestionDropdownPage.prototype.startsurvey = function () {
        this.sqldatabasegetter.getQuestionsfroloddata(this.survey_id, this.callsurveypage(this.project_id, this.survey_id, this.qId), this);
    };
    QuestionDropdownPage.prototype.callsurveypage = function (ProjectId, suervtId, qId) {
        if (this.appGlobal.questionsList != null && this.appGlobal.questionsList != undefined) {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_1__suervy_suervy__["a" /* SuervyPage */], {
                project_id: ProjectId,
                survey_id: suervtId,
                question_id: qId,
                beneficiary_id: this.beneficiary_id,
                auto_increment_id: this.auto_increment_id,
                qindex: 0
            });
        }
    };
    QuestionDropdownPage.prototype.Selection = function () {
        // console.log("Selected Checkbox:" + JSON.stringify(this.appGlobal.selectedCheckbox));
        // console.log("Selected Checkbox:" + JSON.stringify(this.group));
        this.appGlobal.selectedCheckbox = this.group.map(this.getSelectedBen).filter(this.removeNull);
        this.appGlobal.selectedCheckId = this.group.map(this.getSelectid).filter(this.removeNull);
        console.log("Final String :" + JSON.stringify(this.appGlobal.selectedCheckId).replace(/\[|\]|"|"/g, ""));
        this.answer.option_text = JSON.stringify(this.appGlobal.selectedCheckbox).replace(/\[|\]|"|"/g, "");
    };
    QuestionDropdownPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'page-question-dropdown',template:/*ion-inline-start:"/home/linkwok/Documents/ivdp/src/pages/question-dropdown/question-dropdown.html"*/'<!--\n  Generated template for the QuestionDropdownPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar hideBackButton>\n    <ion-title text-center>Survey Started</ion-title>\n  </ion-navbar>\n  <ion-toolbar no-border-top>\n    <ion-searchbar color="primary" [(ngModel)]="queryText" placeholder="Search"></ion-searchbar>\n  </ion-toolbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-list>\n    <ion-item *ngFor="let entry of group | search : {term:queryText,fields:[\'beneficiary_name\',\'household_id\']};let i = index">\n      <ion-label>{{entry.household_id}} - <label><strong>{{entry.beneficiary_name}}</strong></label> </ion-label>\n\n      <ion-checkbox slot="end" *ngIf="entry.id != \'\' && entry.surver_id !=\'\'"  [disabled]="entry.isChecked==false && numberOfChecks>=checkBoxLimit && survey_type==\'Single\'" [(ngModel)]="entry.isChecked"\n        (ionChange)="getChanged(entry)"></ion-checkbox>\n    </ion-item>\n  </ion-list>\n  <ion-fab right bottom>\n    <button ion-fab mini (click)="startsurvey()">\n      <ion-icon name="arrow-forward"></ion-icon>\n    </button>\n\n  </ion-fab>\n\n</ion-content>'/*ion-inline-end:"/home/linkwok/Documents/ivdp/src/pages/question-dropdown/question-dropdown.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["o" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["p" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__providers_app_global_app_global__["a" /* AppGlobalProvider */], __WEBPACK_IMPORTED_MODULE_5_ionic_angular_components_toast_toast_controller__["a" /* ToastController */], __WEBPACK_IMPORTED_MODULE_0__providers_database_database__["a" /* DatabaseProvider */]])
    ], QuestionDropdownPage);
    return QuestionDropdownPage;
}());

//# sourceMappingURL=question-dropdown.js.map

/***/ }),

/***/ 177:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QuestionTextboxPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_forms__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__survey_list_survey_list__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__suervy_suervy__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_app_global_app_global__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular_components_toast_toast_controller__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_database_database__ = __webpack_require__(27);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/**
 * Generated class for the QuestionTextboxPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var QuestionTextboxPage = /** @class */ (function () {
    function QuestionTextboxPage(navCtrl, navParams, appGlobal, toastCtrl, sqldatabasegetter) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.appGlobal = appGlobal;
        this.toastCtrl = toastCtrl;
        this.sqldatabasegetter = sqldatabasegetter;
        this.opctions = [];
        this.is_last = 0;
        // beneficiary_id: string
        // auto_increment_id: string
        this.beneficiary_id = [];
        this.auto_increment_id = [];
        this.qindex = navParams.get("qindex");
        this.question_id = navParams.get("question_id");
        this.project_id = navParams.get("project_id");
        this.survey_id = navParams.get("survey_id");
        this.beneficiary_id = navParams.get('beneficiary_id');
        this.auto_increment_id = navParams.get('auto_increment_id');
        this.loadQuestions();
        this.validatror = new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormGroup */]({
            answers: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["b" /* FormControl */]('ddd', __WEBPACK_IMPORTED_MODULE_0__angular_forms__["h" /* Validators */].required)
        });
    }
    QuestionTextboxPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad QuestionTextboxPage');
    };
    QuestionTextboxPage.prototype.loadQuestions = function () {
        this.question = this.appGlobal.questionsList[this.qindex].text;
        this.key = this.appGlobal.questionsList[this.qindex].server_id;
        if (this.appGlobal.answers[this.key] != undefined) {
            this.answer = this.appGlobal.answers[this.key];
        }
        else {
            this.answer = {
                beneficiarie_id: this.auto_increment_id, server_id: this.beneficiary_id, survey_id: this.survey_id, question_id: this.key,
                language_id: 2, option_id: 2, option_text: "", image: "N/A", other_text: "no"
            };
        }
    };
    QuestionTextboxPage.prototype.goToNext = function (e) {
        this.appGlobal.answers[this.key] = (this.answer);
        if (this.qindex == this.appGlobal.questionsList.length - 1) {
            this.is_last = 1;
            alert("Last Question");
            return;
        }
        var nq = this.qindex + 1;
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__suervy_suervy__["a" /* SuervyPage */], {
            project_id: this.project_id,
            survey_id: this.survey_id,
            question_id: this.question_id,
            beneficiary_id: this.beneficiary_id,
            auto_increment_id: this.auto_increment_id,
            qindex: (nq)
        });
    };
    QuestionTextboxPage.prototype.goToPrev = function (e) {
        if (this.qindex == 0) {
            alert("First Question");
            return;
        }
        var nq = this.qindex - 1;
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__suervy_suervy__["a" /* SuervyPage */], {
            project_id: this.project_id,
            survey_id: this.survey_id,
            question_id: this.question_id,
            beneficiary_id: this.beneficiary_id,
            auto_increment_id: this.auto_increment_id,
            qindex: (nq)
        });
    };
    QuestionTextboxPage.prototype.submit = function () {
        var data = this.appGlobal.answers;
        var key = Object.keys(data);
        for (var i = 0; i <= key.length; i++) {
            if (this.appGlobal.answers[key[i]] != undefined) {
                this.sqldatabasegetter.insertAnswer(this.appGlobal.answers[key[i]]);
            }
            if (i == key.length) {
                alert("submit scussfully");
                if (this.navCtrl.canGoBack) {
                    // this.navCtrl.pop();
                    this.appGlobal.answers = [];
                    this.appGlobal.questionsList = [];
                    this.beneficiary_id = [];
                    this.auto_increment_id = [];
                    this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_1__survey_list_survey_list__["a" /* SurveyListPage */]);
                }
                else {
                    var toast = this.toastCtrl.create({
                        message: this.appGlobal.ServerError,
                        duration: 3000
                    });
                    toast.present();
                }
            }
        }
    };
    QuestionTextboxPage.prototype.goTosurveylist = function () {
        this.appGlobal.answers = [];
        this.beneficiary_id = [];
        this.auto_increment_id = [];
        this.appGlobal.options = [];
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_1__survey_list_survey_list__["a" /* SurveyListPage */], {
            beneficiary_id: this.beneficiary_id,
            auto_increment_id: this.auto_increment_id,
        });
    };
    QuestionTextboxPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["m" /* Component */])({
            selector: 'page-question-textbox',template:/*ion-inline-start:"/home/linkwok/Documents/ivdp/src/pages/question-textbox/question-textbox.html"*/'<!--\n  Generated template for the QuestionTextboxPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar hideBackButton>\n    <ion-title text-center>Survey Started</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n  <h1><strong>\n      <p>{{question}}</p>\n    </strong>\n  </h1>\n  <form #form="ngForm">\n    <div>\n      <hr>\n      <ion-item>\n        <ion-input name="option_text" type="text" placeholder="" [(ngModel)]="answer.option_text" required></ion-input>\n      </ion-item>\n      <hr>\n      <button ion-button *ngIf="is_last == 1" type="submit" [disabled]="!form.valid" (click)="submit()">Submit</button>\n      <button ion-button *ngIf="is_last == 0" type="submit" [disabled]="!form.valid" (click)="goToNext()">Next</button>\n      <button ion-button *ngIf="is_last == 0" (click)="goToPrev(\'a\')">Previous</button>\n    </div>\n  </form>\n\n  <div buttom center> <button ion-button  (click)="goTosurveylist()" >Back To Survey List </button></div> \n</ion-content>'/*ion-inline-end:"/home/linkwok/Documents/ivdp/src/pages/question-textbox/question-textbox.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["o" /* NavController */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["p" /* NavParams */], __WEBPACK_IMPORTED_MODULE_5__providers_app_global_app_global__["a" /* AppGlobalProvider */], __WEBPACK_IMPORTED_MODULE_6_ionic_angular_components_toast_toast_controller__["a" /* ToastController */], __WEBPACK_IMPORTED_MODULE_7__providers_database_database__["a" /* DatabaseProvider */]])
    ], QuestionTextboxPage);
    return QuestionTextboxPage;
}());

//# sourceMappingURL=question-textbox.js.map

/***/ }),

/***/ 178:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QuestionRadiobuttonPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__survey_list_survey_list__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__suervy_suervy__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_app_global_app_global__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular_components_toast_toast_controller__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_database_database__ = __webpack_require__(27);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the QuestionRadiobuttonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var QuestionRadiobuttonPage = /** @class */ (function () {
    // public isChecked
    function QuestionRadiobuttonPage(navCtrl, navParams, appGlobal, toastCtrl, sqldatabasegetter) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.appGlobal = appGlobal;
        this.toastCtrl = toastCtrl;
        this.sqldatabasegetter = sqldatabasegetter;
        this.opctions = [];
        this.is_last = 0;
        // beneficiary_id: string
        // auto_increment_id: string
        this.beneficiary_id = [];
        this.auto_increment_id = [];
        this.qindex = navParams.get("qindex");
        this.question_id = navParams.get("question_id");
        this.project_id = navParams.get("project_id");
        this.survey_id = navParams.get("survey_id");
        this.beneficiary_id = navParams.get('beneficiary_id');
        this.auto_increment_id = navParams.get('auto_increment_id');
        this.opctions = this.appGlobal.options;
        this.loadQuestions();
    }
    QuestionRadiobuttonPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad QuestionRadiobuttonPage');
    };
    QuestionRadiobuttonPage.prototype.loadQuestions = function () {
        this.question = this.appGlobal.questionsList[this.qindex].text;
        this.key = this.appGlobal.questionsList[this.qindex].server_id;
        if (this.appGlobal.answers[this.key] != undefined) {
            this.answer = this.appGlobal.answers[this.key];
        }
        else {
            this.answer = {
                beneficiarie_id: this.auto_increment_id, server_id: this.beneficiary_id, survey_id: this.survey_id, question_id: this.key,
                language_id: 2, option_id: 2, option_text: "", image: "N/A", other_text: "no"
            };
        }
    };
    QuestionRadiobuttonPage.prototype.goToNext = function (e) {
        {
            this.appGlobal.answers[this.key] = (this.answer);
            if (this.qindex == this.appGlobal.questionsList.length - 1) {
                this.is_last = 1;
                alert("Last Question");
                return;
            }
            var nq = this.qindex + 1;
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_1__suervy_suervy__["a" /* SuervyPage */], {
                project_id: this.project_id,
                survey_id: this.survey_id,
                question_id: this.question_id,
                beneficiary_id: this.beneficiary_id,
                auto_increment_id: this.auto_increment_id,
                qindex: (nq)
            });
        }
    };
    QuestionRadiobuttonPage.prototype.select = function (item) {
        this.answer.option_text = item;
        // this.select_radio=item
    };
    QuestionRadiobuttonPage.prototype.goToPrev = function (e) {
        if (this.qindex == 0) {
            alert("First Question");
            return;
        }
        var nq = this.qindex - 1;
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_1__suervy_suervy__["a" /* SuervyPage */], {
            project_id: this.project_id,
            survey_id: this.survey_id,
            question_id: this.question_id,
            beneficiary_id: this.beneficiary_id,
            auto_increment_id: this.auto_increment_id,
            qindex: (nq)
        });
    };
    QuestionRadiobuttonPage.prototype.submit = function () {
        var data = this.appGlobal.answers;
        var key = Object.keys(data);
        for (var i = 0; i <= key.length; i++) {
            if (this.appGlobal.answers[key[i]] != undefined) {
                this.sqldatabasegetter.insertAnswer(this.appGlobal.answers[key[i]]);
            }
            if (i == key.length) {
                alert("submit scussfully");
                if (this.navCtrl.canGoBack) {
                    // this.navCtrl.pop();
                    this.appGlobal.answers = [];
                    this.appGlobal.questionsList = [];
                    this.beneficiary_id = [];
                    this.auto_increment_id = [];
                    this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_0__survey_list_survey_list__["a" /* SurveyListPage */]);
                    // this.navCtrl.setRoot(QuestionDropdownPage)
                }
                else {
                    var toast = this.toastCtrl.create({
                        message: this.appGlobal.ServerError,
                        duration: 3000
                    });
                    toast.present();
                }
            }
        }
    };
    QuestionRadiobuttonPage.prototype.goTosurveylist = function () {
        this.appGlobal.answers = [];
        this.beneficiary_id = [];
        this.auto_increment_id = [];
        this.appGlobal.options = [];
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_0__survey_list_survey_list__["a" /* SurveyListPage */], {
            beneficiary_id: this.beneficiary_id,
            auto_increment_id: this.auto_increment_id,
        });
    };
    QuestionRadiobuttonPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'page-question-radiobutton',template:/*ion-inline-start:"/home/linkwok/Documents/ivdp/src/pages/question-radiobutton/question-radiobutton.html"*/'<!--\n  Generated template for the QuestionRadiobuttonPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar hideBackButton>\n    <ion-title text-center>Survey Started</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <h1><strong>\n      <p>{{question}}</p>\n    </strong>\n  </h1>\n  <ion-list radio-group>\n\n    <ion-item *ngFor="let entry of opctions">\n      <ion-label>{{entry.text}}</ion-label>\n      <ion-radio slot="start" value="{{entry.text}}" (ionSelect)="select(entry.text)"></ion-radio>\n    </ion-item>\n\n  </ion-list>\n  <button ion-button *ngIf="is_last == 1" (click)="submit(\'a\')">Submit</button>\n  <button ion-button *ngIf="is_last == 0" (click)="goToNext(\'a\')">Next</button>\n  <button ion-button *ngIf="is_last == 0" (click)="goToPrev(\'a\')">Previous</button>\n\n  <div buttom center> <button ion-button (click)="goTosurveylist()" >Back To Survey List </button></div>\n</ion-content>'/*ion-inline-end:"/home/linkwok/Documents/ivdp/src/pages/question-radiobutton/question-radiobutton.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["o" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["p" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__providers_app_global_app_global__["a" /* AppGlobalProvider */], __WEBPACK_IMPORTED_MODULE_5_ionic_angular_components_toast_toast_controller__["a" /* ToastController */], __WEBPACK_IMPORTED_MODULE_6__providers_database_database__["a" /* DatabaseProvider */]])
    ], QuestionRadiobuttonPage);
    return QuestionRadiobuttonPage;
}());

//# sourceMappingURL=question-radiobutton.js.map

/***/ }),

/***/ 179:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QuestionImagePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__survey_list_survey_list__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__suervy_suervy__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_app_global_app_global__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular_components_toast_toast_controller__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_database_database__ = __webpack_require__(27);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









/**
 * Generated class for the QuestionImagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var QuestionImagePage = /** @class */ (function () {
    function QuestionImagePage(navCtrl, navParams, appGlobal, camera, platform, toastCtrl, sqldatabasegetter) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.appGlobal = appGlobal;
        this.camera = camera;
        this.platform = platform;
        this.toastCtrl = toastCtrl;
        this.sqldatabasegetter = sqldatabasegetter;
        this.opctions = [];
        this.is_last = 0;
        // beneficiary_id: string
        // auto_increment_id: string
        this.beneficiary_id = [];
        this.auto_increment_id = [];
        this.qindex = navParams.get("qindex");
        this.question_id = navParams.get("question_id");
        this.project_id = navParams.get("project_id");
        this.survey_id = navParams.get("survey_id");
        this.beneficiary_id = navParams.get('beneficiary_id');
        this.auto_increment_id = navParams.get('auto_increment_id');
        this.loadQuestions();
    }
    QuestionImagePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad QuestionImagePage');
    };
    QuestionImagePage.prototype.loadQuestions = function () {
        this.question = this.appGlobal.questionsList[this.qindex].text;
        this.key = this.appGlobal.questionsList[this.qindex].server_id;
        if (this.appGlobal.answers[this.key] != undefined) {
            this.answer = this.appGlobal.answers[this.key];
        }
        else {
            this.answer = {
                beneficiarie_id: this.auto_increment_id, server_id: this.beneficiary_id, survey_id: this.survey_id, question_id: this.key,
                language_id: 2, option_id: 2, option_text: "N/A", image: "", other_text: "no"
            };
        }
    };
    QuestionImagePage.prototype.getImageFromCamera = function () {
        var _this = this;
        var options = {
            quality: 20,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
            saveToPhotoAlbum: true,
            cameraDirection: 0
        };
        this.platform.ready().then(function () {
            if (_this.platform.is('cordova')) {
                _this.camera.getPicture(options).then(function (imageData) {
                    _this.imageURI = 'data:image/jpeg;base64,' + imageData;
                }, function (err) {
                    console.log(err);
                });
            }
        });
    };
    QuestionImagePage.prototype.getImageFromFS = function () {
        var _this = this;
        var options = {
            quality: 20,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            correctOrientation: true
        };
        this.camera.getPicture(options).then(function (imageData) {
            _this.imageURI = 'data:image/jpeg;base64,' + imageData;
        }, function (err) {
            console.log(err);
        });
    };
    QuestionImagePage.prototype.goToNext = function (e) {
        this.answer["image"] = this.imageURI;
        this.appGlobal.answers[this.key] = (this.answer);
        if (this.qindex == this.appGlobal.questionsList.length - 1) {
            this.is_last = 1;
            alert("Last Question");
            return;
        }
        var nq = this.qindex + 1;
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_1__suervy_suervy__["a" /* SuervyPage */], {
            project_id: this.project_id,
            survey_id: this.survey_id,
            question_id: this.question_id,
            beneficiary_id: this.beneficiary_id,
            auto_increment_id: this.auto_increment_id,
            qindex: (nq)
        });
    };
    QuestionImagePage.prototype.goToPrev = function (e) {
        if (this.qindex == 0) {
            alert("First Question");
            return;
        }
        var nq = this.qindex - 1;
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_1__suervy_suervy__["a" /* SuervyPage */], {
            project_id: this.project_id,
            survey_id: this.survey_id,
            question_id: this.question_id,
            beneficiary_id: this.beneficiary_id,
            auto_increment_id: this.auto_increment_id,
            qindex: (nq)
        });
    };
    QuestionImagePage.prototype.submit = function () {
        var data = this.appGlobal.answers;
        var key = Object.keys(data);
        for (var i = 0; i <= key.length; i++) {
            if (this.appGlobal.answers[key[i]] != undefined) {
                this.sqldatabasegetter.insertAnswer(this.appGlobal.answers[key[i]]);
            }
            if (i == key.length) {
                alert("submit scussfully");
                if (this.navCtrl.canGoBack) {
                    this.navCtrl.pop();
                    this.appGlobal.answers = [];
                    this.appGlobal.questionsList = [];
                    this.beneficiary_id = [];
                    this.auto_increment_id = [];
                    this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_0__survey_list_survey_list__["a" /* SurveyListPage */]);
                    //this.navCtrl.setRoot(QuestionDropdownPage)
                }
                else {
                    var toast = this.toastCtrl.create({
                        message: this.appGlobal.ServerError,
                        duration: 3000
                    });
                    toast.present();
                }
            }
        }
    };
    QuestionImagePage.prototype.goTosurveylist = function () {
        this.appGlobal.answers = [];
        this.beneficiary_id = [];
        this.auto_increment_id = [];
        this.appGlobal.options = [];
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_0__survey_list_survey_list__["a" /* SurveyListPage */], {
            beneficiary_id: this.beneficiary_id,
            auto_increment_id: this.auto_increment_id,
        });
    };
    QuestionImagePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["m" /* Component */])({
            selector: 'page-question-image',template:/*ion-inline-start:"/home/linkwok/Documents/ivdp/src/pages/question-image/question-image.html"*/'<!--\n  Generated template for the QuestionImagePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar hideBackButton>\n    <ion-title text-center>Survey Started</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <h1><strong>\n      <p>{{question}}</p>\n    </strong>\n  </h1>\n  <form #form="ngForm">\n\n    <ion-item *ngIf="imageURI" required>\n      <img src="{{imageURI}}" name="image" alt="Ionic File" width="300" [(ngModel)]="answer.image" />\n    </ion-item>\n    <ion-buttons>\n      <ion-grid>\n        <ion-row>\n          <ion-col>\n            <button ion-button color="secondary" round (click)="getImageFromCamera()">\n              <ion-icon name="camera"></ion-icon>\n            </button>\n          </ion-col>\n          <ion-col>\n            <button ion-button color="secondary" round (click)="getImageFromFS()">\n              <ion-icon name="image"></ion-icon>\n            </button>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-buttons>\n    <div>\n      <button ion-button *ngIf="is_last == 1" type="submit" [disabled]="!form.valid"\n        (click)="submit(\'a\')">Submit</button>\n      <button ion-button *ngIf="is_last == 0" type="submit" [disabled]="!form.valid"\n        (click)="goToNext(\'a\')">Next</button>\n      <button ion-button *ngIf="is_last == 0" (click)="goToPrev(\'a\')">Previous</button>\n    </div>\n  </form>\n  <div> <button ion-button  buttom center (click)="goTosurveylist()">Back To Survey List </button></div>\n</ion-content>'/*ion-inline-end:"/home/linkwok/Documents/ivdp/src/pages/question-image/question-image.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["o" /* NavController */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["p" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_app_global_app_global__["a" /* AppGlobalProvider */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["q" /* Platform */], __WEBPACK_IMPORTED_MODULE_6_ionic_angular_components_toast_toast_controller__["a" /* ToastController */], __WEBPACK_IMPORTED_MODULE_7__providers_database_database__["a" /* DatabaseProvider */]])
    ], QuestionImagePage);
    return QuestionImagePage;
}());

//# sourceMappingURL=question-image.js.map

/***/ }),

/***/ 180:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchbeneficiryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__maintenance_request_maintenance_request__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__maintenance_request_form_maintenance_request_form__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_user_data_ts__ = __webpack_require__(29);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the SearchbeneficiryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SearchbeneficiryPage = /** @class */ (function () {
    function SearchbeneficiryPage(navCtrl, navParams, user) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.user = user;
        this.characterList = [
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
        ];
    }
    SearchbeneficiryPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SearchbeneficiryPage');
    };
    SearchbeneficiryPage.prototype.getcharacterforsearch = function (ev) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__maintenance_request_maintenance_request__["a" /* MaintenanceRequestPage */], {
            characterforSearch: ev
        });
    };
    SearchbeneficiryPage.prototype.goToMaintenanceRequestForm = function () {
        this.UserId = this.user.userData.id;
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__maintenance_request_form_maintenance_request_form__["a" /* MaintenanceRequestFormPage */], {
            Surveyor: this.UserId
        });
    };
    SearchbeneficiryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-searchbeneficiry',template:/*ion-inline-start:"/home/linkwok/Documents/ivdp/src/pages/searchbeneficiry/searchbeneficiry.html"*/'<!--\n  Generated template for the SearchbeneficiryPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Beneficiaries</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <ion-grid>\n    <ion-item *ngFor="let character of characterList" (click)="getcharacterforsearch(character)"> <strong>{{character}}</strong></ion-item>\n  </ion-grid>\n  <ion-fab right bottom>\n    <button ion-fab (click)="goToMaintenanceRequestForm()">\n      <ion-icon name="add"></ion-icon>\n    </button>\n  </ion-fab>\n</ion-content>'/*ion-inline-end:"/home/linkwok/Documents/ivdp/src/pages/searchbeneficiry/searchbeneficiry.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["o" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["p" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__providers_user_data_ts__["a" /* UserData */]])
    ], SearchbeneficiryPage);
    return SearchbeneficiryPage;
}());

//# sourceMappingURL=searchbeneficiry.js.map

/***/ }),

/***/ 181:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SyncPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_database_database__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_app_global_app_global__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular_components_toast_toast_controller__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_data_setter_data_setter__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_data_getter_service_data_getter_service__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_database_Dbmaneger__ = __webpack_require__(110);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};








// import {Vibration} from "@ionic-native/vibration";
/**
 * Generated class for the SyncPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SyncPage = /** @class */ (function () {
    function SyncPage(navCtrl, navParams, loadingCtrl, appGlobal, dataGetterService, dataSetterService, sqldatabasegetter, toastCtrl, db) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.appGlobal = appGlobal;
        this.dataGetterService = dataGetterService;
        this.dataSetterService = dataSetterService;
        this.sqldatabasegetter = sqldatabasegetter;
        this.toastCtrl = toastCtrl;
        this.db = db;
        //	this.sqldatabasegetter.syncbeneficiarydata();
        this.sqldatabasegetter.syncanswersdata();
        //this.sqldatabasegetter.synckycsdata();
        this.pending_beneficiaries = this.appGlobal.benefeciaries.length;
        this.pending_answers = this.appGlobal.syncanswers.length;
        this.pending_kycs = this.appGlobal.synckycs.length;
    }
    SyncPage.prototype.dorefresh = function (ev) {
        for (var i = 0; i <= this.appGlobal.syncanswers.length; i++) {
            console.log("@@@    " + JSON.stringify(this.appGlobal.syncanswers[i]));
        }
        this.datareload(ev);
        setTimeout(function () {
            console.log('Async operation has ended');
            ev.complete();
        }, 2000);
    };
    SyncPage.prototype.datareload = function (ev) {
        this.sqldatabasegetter.syncbeneficiarydata();
        this.sqldatabasegetter.syncanswersdata();
        this.sqldatabasegetter.synckycsdata();
        this.pending_beneficiaries = this.appGlobal.benefeciaries.length;
        this.pending_answers = this.appGlobal.syncanswers.length;
        this.pending_kycs = this.appGlobal.synckycs.length;
    };
    SyncPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SyncPage');
    };
    SyncPage.prototype.syncBeneficiaries = function () {
        var _this = this;
        this.presentLoading();
        var b_success = [];
        var m = this;
        var js_arr = { 'beneficiary': m.appGlobal.benefeciaries, "house_hold": [], "kyc": [] };
        m.dataSetterService.createMaintenanceRequest(js_arr).subscribe(function (data) {
            if (data[0].original.status) {
                alert("beneficiry sync done");
                _this.last_syncBeneficiariesTime = new Date().toDateString();
                b_success.push(data);
                _this.appGlobal.benefeciaries == [];
                _this.pending_beneficiaries == 0;
                _this.updaterdbbenefiliy(data[0].original.updater, _this);
                _this.loading.dismiss();
            }
            else {
                console.log("data upload beneficiry  " + data);
            }
        }, function (error) {
            alert(" s   " + JSON.stringify(error));
        });
    };
    SyncPage.prototype.updaterdbbenefiliy = function (object, t) {
        for (var i = 0; i < object.length; i++) {
            this.sqldatabasegetter.updatebeneficiarydata(object[i], t);
        }
    };
    SyncPage.prototype.syncsurveysanswer = function () {
        var _this = this;
        this.presentLoading();
        var b_success = [];
        var m = this;
        var js_arr = { "answer": m.appGlobal.syncanswers };
        //	loading.present();
        m.dataSetterService.syncAnswersRequest(js_arr).subscribe(function (data) {
            if (data.status) {
                alert("Answers sync done");
                _this.last_syncsurveysanswerTime = new Date().toDateString();
                b_success.push(data);
                m.appGlobal.syncanswers = [];
                m.pending_answers = 0;
                _this.updaterdbanswers(data.updater, _this);
                m.loading.dismiss();
            }
            else {
                alert("error else  " + data.errors);
                //loading.dismiss();
            }
        }, function (error) {
            alert(JSON.stringify(error));
            //loading.dismiss();
        });
    };
    SyncPage.prototype.updaterdbanswers = function (object, t) {
        for (var i = 0; i < object.length; i++) {
            this.sqldatabasegetter.updateanswers(object[i], t);
        }
    };
    SyncPage.prototype.syncsurveyskycs = function () {
        var _this = this;
        this.presentLoading();
        var b_success = [];
        var m = this;
        var js_arr = { 'beneficiary': [], "house_hold": [], "kyc": m.appGlobal.synckycs };
        m.dataSetterService.syncKycsRequest(js_arr).subscribe(function (data) {
            if (data[1].original.status) {
                alert("kycs sync done ");
                alert(JSON.stringify(data));
                _this.last_syncsurveyskycs = new Date().toDateString();
                b_success.push(data);
                _this.appGlobal.synckycs = [];
                _this.pending_kycs = 0;
                _this.updaterdbkycs(data[1].original.updater, _this);
                _this.loading.dismiss();
            }
            else {
                console.log(data.errors);
                //loading.dismiss();
            }
        }, function (error) {
            alert(JSON.stringify(error));
        });
    };
    SyncPage.prototype.updaterdbkycs = function (object, t) {
        for (var i = 0; i < object.length; i++) {
            this.sqldatabasegetter.updatekycsindb(object[i], t);
        }
    };
    SyncPage.prototype.presentLoading = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.loading = this.loadingCtrl.create({
                    content: 'Please wait...',
                    duration: 5000
                });
                this.loading.present();
                return [2 /*return*/];
            });
        });
    };
    SyncPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-sync',template:/*ion-inline-start:"/home/linkwok/Documents/ivdp/src/pages/sync/sync.html"*/'\n<ion-header>\n    <ion-navbar>\n      <button ion-button menuToggle>\n        <ion-icon name="menu"></ion-icon>\n      </button>\n      <ion-title>Synchronisation</ion-title>\n    </ion-navbar>\n  </ion-header>\n  \n  \n  \n  \n  <ion-content padding>\n    <ion-refresher (ionRefresh)="dorefresh($event)">\n      <ion-refresher-content></ion-refresher-content>\n    </ion-refresher>\n    <ion-list>\n      <ion-card>\n  \n        <ion-card-header>\n          <h1>Beneficiaries </h1>\n        </ion-card-header>\n  \n        <ion-card-content>\n          <p>No of Records pending:<strong>{{pending_beneficiaries}}</strong></p>\n          <p>Last Update: <strong type="number">{{last_syncBeneficiariesTime}}</strong></p>\n  \n  \n        </ion-card-content>\n  \n        <ion-row>\n          <ion-col>\n            <div class="pull-right">\n              <button class=\'big-round-btn\'>\n                <ion-icon name="sync" style="font-size:5em" (click)=\'syncBeneficiaries()\'></ion-icon>\n              </button>\n            </div>\n          </ion-col>\n        </ion-row>\n  \n      </ion-card>\n  \n      <ion-card>\n  \n        <ion-card-header>\n          <h1>KYC </h1>\n        </ion-card-header>\n  \n        <ion-card-content>\n          <p>No of Records pending:<strong>{{pending_kycs}}</strong></p>\n          <p>Last Update: <strong type="number">{{last_syncsurveyskycs}}</strong></p>\n  \n  \n        </ion-card-content>\n  \n        <ion-row>\n          <ion-col>\n            <div class="pull-right">\n              <button class=\'big-round-btn\'>\n                <ion-icon name="sync" style="font-size:5em" (click)="syncsurveyskycs()"></ion-icon>\n              </button>\n            </div>\n          </ion-col>\n        </ion-row>\n  \n      </ion-card>\n  \n      <ion-card>\n  \n        <ion-card-header>\n          <h1>Surveys </h1>\n        </ion-card-header>\n  \n        <ion-card-content>\n          <p>No of Records pending:<strong>{{pending_answers}}</strong></p>\n          <p>Last Update: <strong type="number">{{last_syncsurveysanswerTime}}</strong></p>\n  \n  \n        </ion-card-content>\n  \n        <ion-row>\n          <ion-col>\n            <div class="pull-right">\n              <button class=\'big-round-btn\'>\n                <ion-icon name="sync" style="font-size:5em" (click)="syncsurveysanswer()"></ion-icon>\n              </button>\n            </div>\n          </ion-col>\n        </ion-row>\n  \n      </ion-card>\n  \n  \n  \n  \n    </ion-list>\n  \n  </ion-content>'/*ion-inline-end:"/home/linkwok/Documents/ivdp/src/pages/sync/sync.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["o" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["p" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_app_global_app_global__["a" /* AppGlobalProvider */], __WEBPACK_IMPORTED_MODULE_6__providers_data_getter_service_data_getter_service__["a" /* DataGetterServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_data_setter_data_setter__["a" /* DataSetterProvider */], __WEBPACK_IMPORTED_MODULE_0__providers_database_database__["a" /* DatabaseProvider */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular_components_toast_toast_controller__["a" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_7__providers_database_Dbmaneger__["a" /* DBmaneger */]])
    ], SyncPage);
    return SyncPage;
}());

//# sourceMappingURL=sync.js.map

/***/ }),

/***/ 182:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserblockPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_data_getter_service_data_getter_service__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_user_data_ts__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_app_global_app_global__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the UserblockPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var UserblockPage = /** @class */ (function () {
    function UserblockPage(navCtrl, navParams, appGlobal, userData, events, dataGetter) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.appGlobal = appGlobal;
        this.userData = userData;
        this.events = events;
        this.dataGetter = dataGetter;
        this.canLeave = false;
    }
    UserblockPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad UserblockPage');
    };
    UserblockPage.prototype.ionViewDidEnter = function () {
        console.log('ionViewDidEnter UserblockPage');
        this.canLeave = false;
        if (!this.userData.userData.new_user) {
            this.canLeave = true;
            this.events.publish('app:setRootAsHome');
        }
    };
    UserblockPage.prototype.ionViewCanLeave = function () {
        // return this.canLeave;
        if (!this.appGlobal.isOnline) {
            return true;
        }
        else {
            return this.canLeave;
        }
        // here we can either return true or false
        // depending on if we want to leave this view
    };
    UserblockPage.prototype.refresh = function (refresher) {
        var _this = this;
        if (this.userData.userData.new_user) {
            this.dataGetter.updateUserProfile({
                updated_at: this.userData.userData.updated_at
            }).subscribe(function (data) {
                console.log('Get User Status', data);
                if (data.success) {
                    _this.userData.setUserData(data);
                    if (!data.new_user) {
                        _this.canLeave = true;
                        _this.events.publish('app:setRootAsHome');
                    }
                }
                refresher.complete();
            }, function (error) {
                console.log("updateUserProfile", error);
                refresher.complete();
            });
        }
        else {
            this.canLeave = true;
            this.events.publish('app:setRootAsHome');
        }
    };
    UserblockPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["m" /* Component */])({
            selector: 'page-userblock',template:/*ion-inline-start:"/home/linkwok/Documents/ivdp/src/pages/userblock/userblock.html"*/'<!--\n  Generated template for the UserblockPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar hideBackButton="true">\n    <ion-title>\n      <img src="assets/img/appicon.png" height="30" alt="Empower">\n    </ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content center text-center padding>\n  <ion-refresher (ionRefresh)="refresh($event)">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n  <h4>Profile incomplete..!!</h4>\n\n  <h5>\n    <!-- It looks like you are offline! Please check your network connection and try again. -->\n    <p>Please complete your profile on website and refresh.</p>\n  </h5>\n</ion-content>'/*ion-inline-end:"/home/linkwok/Documents/ivdp/src/pages/userblock/userblock.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["p" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_app_global_app_global__["a" /* AppGlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_1__providers_user_data_ts__["a" /* UserData */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["f" /* Events */],
            __WEBPACK_IMPORTED_MODULE_0__providers_data_getter_service_data_getter_service__["a" /* DataGetterServiceProvider */]])
    ], UserblockPage);
    return UserblockPage;
}());

//# sourceMappingURL=userblock.js.map

/***/ }),

/***/ 20:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataGetterServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular_components_loading_loading_controller__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user_data_ts__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_global_app_global__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/*
  Generated class for the DataGetterServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var DataGetterServiceProvider = /** @class */ (function () {
    function DataGetterServiceProvider(http, appGlobal, user, loadingCtrl, toastCtrl) {
        this.http = http;
        this.appGlobal = appGlobal;
        this.user = user;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        console.log('Hello DataGetterServiceProvider Provider');
    }
    DataGetterServiceProvider.prototype.getHTTPOptions = function () {
        var httpOptions = {
            headers: new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["c" /* HttpHeaders */]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.user.userData.auth_token
            })
        };
        return httpOptions;
    };
    DataGetterServiceProvider.prototype.getSurveys = function () {
        // console.log(this.user.userData.auth_token)
        // console.log("%%%%%%%%%%%%% surveyUrl "+ this.appGlobal.allSurveysURL);
        return this.http.get(this.appGlobal.allSurveysURL, this.getHTTPOptions());
    };
    DataGetterServiceProvider.prototype.getServiceRequests = function () {
        console.log(this.user.userData.auth_token);
        return this.http.get(this.appGlobal.allServiceRequestsURL, this.getHTTPOptions());
    };
    DataGetterServiceProvider.prototype.getIdeas = function () {
        return this.http.get(this.appGlobal.allIdeaURL, this.getHTTPOptions());
    };
    DataGetterServiceProvider.prototype.getGrievances = function () {
        return this.http.get(this.appGlobal.allGrievancesURL, this.getHTTPOptions());
    };
    DataGetterServiceProvider.prototype.getGrievanceCategories = function () {
        return this.http.get(this.appGlobal.allGrievancesCategoriesURL, this.getHTTPOptions());
    };
    DataGetterServiceProvider.prototype.loadSRDetail = function (id) {
        return this.http.get(this.appGlobal.getServiceRequestURL + "/" + id, this.getHTTPOptions());
    };
    DataGetterServiceProvider.prototype.loadIdeaDetail = function (id) {
        return this.http.get(this.appGlobal.getIdeaURL + "/" + id, this.getHTTPOptions());
    };
    DataGetterServiceProvider.prototype.loadAttendance = function (attendance) {
        return this.http.get(this.appGlobal.attendanceURL + "?date=" + attendance, this.getHTTPOptions());
    };
    DataGetterServiceProvider.prototype.loadHolidays = function () {
        return this.http.get(this.appGlobal.getHolidayListURL, this.getHTTPOptions());
    };
    DataGetterServiceProvider.prototype.getArticles = function () {
        return this.http.get(this.appGlobal.getArticlesURL, this.getHTTPOptions());
    };
    DataGetterServiceProvider.prototype.getArticle = function (id) {
        return this.http.get(this.appGlobal.getArticleURL + "/" + id, this.getHTTPOptions());
    };
    DataGetterServiceProvider.prototype.getStaticPages = function () {
        return this.http.get(this.appGlobal.getStaticPagesURL, this.getHTTPOptions());
    };
    DataGetterServiceProvider.prototype.getStaticPage = function (id) {
        return this.http.get(this.appGlobal.getStaticPageURL + '/' + id, this.getHTTPOptions());
    };
    DataGetterServiceProvider.prototype.getAllNotifications = function () {
        return this.http.get(this.appGlobal.allNotificationsURL, this.getHTTPOptions());
    };
    DataGetterServiceProvider.prototype.loadLeaves = function () {
        var body = {
            Emp_Code: this.user.userData.employee_id,
            FromDate: "01/01/1800",
            ToDate: "01/01/2099"
        };
        return this.http.post(this.appGlobal.getLeaveApplicationsURL, body, this.getHTTPOptions());
    };
    DataGetterServiceProvider.prototype.getLunchStatus = function () {
        return this.http.get(this.appGlobal.getLunchStatus, this.getHTTPOptions());
    };
    DataGetterServiceProvider.prototype.getSuggestions = function (body) {
        return this.http.post(this.appGlobal.getSuggestion, body, this.getHTTPOptions())
            .map(function (data) { return data; });
        // data.subscribe(res => console.log("RESPONSE",res));
    };
    DataGetterServiceProvider.prototype.updateUserProfile = function (body) {
        return this.http.post(this.appGlobal.updateUserProfile, body, this.getHTTPOptions())
            .map(function (data) { return data; });
    };
    DataGetterServiceProvider.prototype.updateMenuCounts = function () {
        return this.http.get(this.appGlobal.updateMenuCounts, this.getHTTPOptions())
            .map(function (data) { return data; });
    };
    DataGetterServiceProvider.prototype.loadMonthAttendance = function (body) {
        return this.http.post(this.appGlobal.loadMonthAttendance, body, this.getHTTPOptions())
            .map(function (data) { return data; });
    };
    DataGetterServiceProvider.prototype.getUserProfile = function (uid) {
        return this.http.get(this.appGlobal.getUserProfile + "/" + uid, this.getHTTPOptions());
    };
    // Guest Lunch Request
    DataGetterServiceProvider.prototype.getAllGuestLunches = function () {
        return this.http.get(this.appGlobal.getAllGuestLunches, this.getHTTPOptions());
    };
    // Visiting Card Request
    DataGetterServiceProvider.prototype.getAllVisitingCards = function () {
        return this.http.get(this.appGlobal.getAllVisitingCards, this.getHTTPOptions());
    };
    DataGetterServiceProvider.prototype.getCompanyDetails = function () {
        return this.http.get(this.appGlobal.getCompanyDetails, this.getHTTPOptions());
    };
    // Stationery Request
    DataGetterServiceProvider.prototype.getStationeries = function (l) {
        return this.http.get(this.appGlobal.getStationeries + "/" + l, this.getHTTPOptions());
    };
    DataGetterServiceProvider.prototype.getAllStationeryRequests = function () {
        return this.http.get(this.appGlobal.getAllStationeryRequests, this.getHTTPOptions());
    };
    // Maintenance Request
    DataGetterServiceProvider.prototype.getMaintenanceAssets = function () {
        return this.http.get(this.appGlobal.getMaintenanceAssets, this.getHTTPOptions());
    };
    DataGetterServiceProvider.prototype.getAllMaintenanceRequests = function (data) {
        return this.http.get(this.appGlobal.getAllMaintenanceRequests + '?user_id=' + data, this.getHTTPOptions());
    };
    DataGetterServiceProvider.prototype.paggination = function (page) {
        var url = "http://165.227.139.76:8080/api/v1/beneficiaries?page=" + page;
        //alert(url)
        return this.http.get(url, this.getHTTPOptions());
    };
    DataGetterServiceProvider.prototype.paggination_hh = function (page) {
        var url = " http://165.227.139.76:8080/api/v1/household?page=" + page;
        return this.http.get(url, this.getHTTPOptions());
    };
    // Access Card Request
    DataGetterServiceProvider.prototype.getAllAccessCardRequests = function () {
        return this.http.get(this.appGlobal.getAllAccessCardRequests, this.getHTTPOptions());
    };
    // Guest Room Request
    DataGetterServiceProvider.prototype.getRoomAddresses = function () {
        return this.http.get(this.appGlobal.getRoomAddresses, this.getHTTPOptions());
    };
    DataGetterServiceProvider.prototype.getAllGuestRoomRequests = function () {
        return this.http.get(this.appGlobal.getAllGuestRoomRequests, this.getHTTPOptions());
    };
    DataGetterServiceProvider.prototype.getGuestRoomRequest = function (uid) {
        return this.http.get(this.appGlobal.getGuestRoomRequest + "/" + uid, this.getHTTPOptions());
    };
    DataGetterServiceProvider.prototype.getGuestLunchLocations = function () {
        return this.http.get(this.appGlobal.getGuestLunchLocations, this.getHTTPOptions());
    };
    DataGetterServiceProvider.prototype.getGuestLunchTypes = function () {
        return this.http.get(this.appGlobal.getGuestLunchTypes, this.getHTTPOptions());
    };
    DataGetterServiceProvider.prototype.getMRLocations = function () {
        return this.http.get(this.appGlobal.getMRLocations, this.getHTTPOptions());
    };
    DataGetterServiceProvider.prototype.getLunchCategories = function () {
        return this.http.get(this.appGlobal.getLunchCategories, this.getHTTPOptions());
    };
    //rewards and redemption 
    DataGetterServiceProvider.prototype.getMyAwards = function () {
        return this.http.get(this.appGlobal.getMyAwards, this.getHTTPOptions());
    };
    DataGetterServiceProvider.prototype.gathouseholsrequest = function () {
        var data = {};
        return this.http.get(this.appGlobal.gethouseholdrequest, this.getHTTPOptions());
    };
    DataGetterServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_4__app_global_app_global__["a" /* AppGlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_1__user_data_ts__["a" /* UserData */],
            __WEBPACK_IMPORTED_MODULE_0_ionic_angular_components_loading_loading_controller__["a" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["r" /* ToastController */]])
    ], DataGetterServiceProvider);
    return DataGetterServiceProvider;
}());

//# sourceMappingURL=data-getter-service.js.map

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchBeneficiryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__maintenance_request_maintenance_request__ = __webpack_require__(82);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the SearchBeneficiryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SearchBeneficiryPage = /** @class */ (function () {
    function SearchBeneficiryPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.search = {
            search_name: ''
        };
    }
    SearchBeneficiryPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SearchBeneficiryPage');
    };
    SearchBeneficiryPage.prototype.searchdata = function (form) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__maintenance_request_maintenance_request__["a" /* MaintenanceRequestPage */], {
            characterforSearch: form.value.search_name
        });
    };
    SearchBeneficiryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-search-beneficiry',template:/*ion-inline-start:"/home/linkwok/Documents/ivdp/src/pages/search-beneficiry/search-beneficiry.html"*/'<!--\n  Generated template for the SearchBeneficiryPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>search beneficiry</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <form #form="ngForm">\n    <ion-list>\n      <ion-item>\n        <ion-input type="text" name="search_name" [(ngModel)]="search.search_name" placeholder="Name For search"\n          required></ion-input>\n      </ion-item>\n    </ion-list>\n\n    <button ion-button (click)="searchdata(form)" [disabled]="!form.valid" type="submit" block>Search in database\n    </button>\n  </form>\n\n\n</ion-content>'/*ion-inline-end:"/home/linkwok/Documents/ivdp/src/pages/search-beneficiry/search-beneficiry.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */]])
    ], SearchBeneficiryPage);
    return SearchBeneficiryPage;
}());

//# sourceMappingURL=search-beneficiry.js.map

/***/ }),

/***/ 215:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 215;

/***/ }),

/***/ 23:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataSetterProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular_components_loading_loading_controller__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user_data_ts__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_global_app_global__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_file_transfer__ = __webpack_require__(163);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/*
  Generated class for the DataSetterProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var DataSetterProvider = /** @class */ (function () {
    function DataSetterProvider(http, events, appGlobal, user, loadingCtrl, toastCtrl, transfer) {
        this.http = http;
        this.events = events;
        this.appGlobal = appGlobal;
        this.user = user;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.transfer = transfer;
        console.log('Hello DataSetterProvider Provider');
    }
    DataSetterProvider.prototype.getHTTPOptions = function () {
        console.log("token:-" + this.user.userData.auth_token);
        var httpOptions = {
            headers: new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["c" /* HttpHeaders */]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.user.userData.auth_token
            })
        };
        return httpOptions;
    };
    DataSetterProvider.prototype.sendNotificationToken = function () {
        var _this = this;
        // console.log("sendNotificationToken Called",this.appGlobal.fcmToken,this.user.hasLoggedIn,this.appGlobal.fcmTokenStatus);
        if (this.user.fcmToken !== '' && this.user.hasLoggedIn && !this.user.fcmTokenStatus) {
            var body = {
                previous_token: this.user.previousToken,
                token: this.user.fcmToken
            };
            this.http.post(this.appGlobal.sendNotificationURL, body, this.getHTTPOptions()).subscribe(function (data) {
                console.log("Send Notification", data);
                if (!!data.success) {
                    _this.events.publish("fcm_token:sent");
                }
            }, function (err) {
                console.log("Send Notification", err);
            });
        }
        else {
            console.log("FCM TOKEN ERROR");
        }
    };
    DataSetterProvider.prototype.sendNotificationClear = function () {
        console.log("Clear Notification Token Called");
        if (this.user.fcmToken !== '') {
            var body = {
                token: this.user.fcmToken
            };
            this.http.post(this.appGlobal.clearNotificationURL, body, this.getHTTPOptions()).subscribe(function (data) {
                console.log("Clear Notification", data);
            }, function (err) {
                console.log("Clear Notification", err);
            });
        }
    };
    DataSetterProvider.prototype.createServiceRequests = function (data) {
        return this.http.post(this.appGlobal.createServiceRequestsURL, data, this.getHTTPOptions());
    };
    DataSetterProvider.prototype.createIdea = function (data) {
        return this.http.post(this.appGlobal.createIdeaURL, data, this.getHTTPOptions());
    };
    DataSetterProvider.prototype.createGrievance = function (data) {
        return this.http.post(this.appGlobal.createGrievancesURL, data, this.getHTTPOptions());
    };
    DataSetterProvider.prototype.updateServiceRequestState = function (data) {
        return this.http.post(this.appGlobal.changeServiceRequestStateURL, data, this.getHTTPOptions());
    };
    DataSetterProvider.prototype.snoozeNotification = function (body) {
        console.log("Snooze Notification Called");
        return this.http.post(this.appGlobal.snoozeNotificationURL, body, this.getHTTPOptions());
    };
    DataSetterProvider.prototype.markReadNotification = function (body) {
        console.log("Mark Read Notification Called");
        return this.http.post(this.appGlobal.markNotificationReadURL, body, this.getHTTPOptions());
    };
    DataSetterProvider.prototype.sendLunchResponse = function (data) {
        var body = {
            decision: data
        };
        this.http.post(this.appGlobal.setLunchStatus, body, this.getHTTPOptions()).subscribe(function (data) {
            console.log("Lunch Status Response", data);
        }, function (err) {
            console.log("Lunch Status Response", err);
        });
    };
    DataSetterProvider.prototype.likeArticle = function (body) {
        console.log("Likes Body", body);
        return this.http.post(this.appGlobal.setLikes, body, this.getHTTPOptions());
    };
    DataSetterProvider.prototype.sendComment = function (body) {
        console.log("Comment Body", body);
        return this.http.post(this.appGlobal.setComment, body, this.getHTTPOptions());
    };
    DataSetterProvider.prototype.setTags = function (body) {
        console.log("Set Tags Body", body);
        return this.http.post(this.appGlobal.setTags, body, this.getHTTPOptions());
    };
    DataSetterProvider.prototype.allocateUser = function (body) {
        console.log("Allocate User Body", body);
        return this.http.post(this.appGlobal.allocateUser, body, this.getHTTPOptions());
    };
    DataSetterProvider.prototype.setUpdatedUserProfile = function (body) {
        console.log("Update User Profile Body", body);
        return this.http.post(this.appGlobal.setUpdatedUserProfile, body, this.getHTTPOptions());
    };
    DataSetterProvider.prototype.fileTransfer = function (filePath) {
        var fileTransfer = this.transfer.create();
        var options = {
            chunkedMode: false,
            headers: {
                'Authorization': 'Token token=' + this.user.userData.auth_token,
                'Version': this.appGlobal.applicationVersion,
            }
        };
        console.log("File Upload Options", options);
        return fileTransfer.upload(filePath, this.appGlobal.profilePictureImageURL, options, true);
    };
    // Guest Lunch Request
    DataSetterProvider.prototype.createGuestLunch = function (data) {
        return this.http.post(this.appGlobal.createGuestLunch, data, this.getHTTPOptions());
    };
    // Visiting Card Request
    DataSetterProvider.prototype.createVisitingCard = function (data) {
        return this.http.post(this.appGlobal.createVisitingCard, data, this.getHTTPOptions());
    };
    // Stationery Request
    DataSetterProvider.prototype.createStationeryRequest = function (data) {
        return this.http.post(this.appGlobal.createStationeryRequest, data, this.getHTTPOptions());
    };
    // Maintenance Request
    DataSetterProvider.prototype.createMaintenanceRequest = function (data) {
        // alert("  ff     " + JSON.stringify(this.http.post(this.appGlobal.createMaintenanceRequest, data, this.getHTTPOptions())));
        return this.http.post(this.appGlobal.createMaintenanceRequest, data, this.getHTTPOptions());
        // var obsRequest =this.http.post(this.appGlobal.createMaintenanceRequest, data, this.getHTTPOptions())
        // .catch( (error: any) => {alert ( error.json().error)} );
    };
    DataSetterProvider.prototype.syncAnswersRequest = function (data) {
        try {
            return this.http.post(this.appGlobal.answersrequest, data, this.getHTTPOptions());
        }
        catch (ErrorHandler) {
            console.log("#####################", ErrorHandler);
        }
    };
    DataSetterProvider.prototype.syncKycsRequest = function (data) {
        return this.http.post(this.appGlobal.createMaintenanceRequest, data, this.getHTTPOptions());
    };
    // Access Card Request
    DataSetterProvider.prototype.createAccessCardRequest = function (data) {
        return this.http.post(this.appGlobal.createAccessCardRequest, data, this.getHTTPOptions());
    };
    // Guest Room Request
    DataSetterProvider.prototype.createGuestRoomRequest = function (data) {
        return this.http.post(this.appGlobal.createGuestRoomRequest, data, this.getHTTPOptions());
    };
    DataSetterProvider.prototype.recordCanteenFacilityUsage = function (data) {
        return this.http.post(this.appGlobal.canteenFacilityUsage, data, this.getHTTPOptions());
    };
    DataSetterProvider.prototype.gatquestionrequest = function () {
        var data = {};
        return this.http.post(this.appGlobal.getsuervyrequest, data, this.getHTTPOptions());
    };
    DataSetterProvider.prototype.submitanswerrequest = function (data) {
        return this.http.post(this.appGlobal.answersrequest, data, this.getHTTPOptions());
    };
    DataSetterProvider.prototype.getAllMaintenanceRequests = function (data) {
        alert("data    " + JSON.stringify(data));
        return this.http.post(this.appGlobal.getAllMaintenanceRequests, data, this.getHTTPOptions());
    };
    DataSetterProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["f" /* Events */],
            __WEBPACK_IMPORTED_MODULE_4__app_global_app_global__["a" /* AppGlobalProvider */], __WEBPACK_IMPORTED_MODULE_1__user_data_ts__["a" /* UserData */],
            __WEBPACK_IMPORTED_MODULE_0_ionic_angular_components_loading_loading_controller__["a" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["r" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_file_transfer__["a" /* FileTransfer */]])
    ], DataSetterProvider);
    return DataSetterProvider;
}());

//# sourceMappingURL=data-setter.js.map

/***/ }),

/***/ 27:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DatabaseProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_sqlite__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_app_global_app_global__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var DATABASENAME = 'ivdp.db';
var DatabaseProvider = /** @class */ (function () {
    function DatabaseProvider(http, database, platform, appGlobal, loadingCtrl, events, toastCtrl) {
        var _this = this;
        this.http = http;
        this.database = database;
        this.platform = platform;
        this.appGlobal = appGlobal;
        this.loadingCtrl = loadingCtrl;
        this.events = events;
        this.toastCtrl = toastCtrl;
        this.offlineCase = [];
        this.offlineCasekycs = [];
        this.counter = 0;
        if (this.platform.is('cordova')) {
            this.database.create({
                name: DATABASENAME,
                location: "default"
            }).then(function (db) {
                _this.dbobject = db;
                console.log("open DB");
                _this.createtable();
            });
        }
        else {
            console.log("error in finding plat form !!!!!");
        }
    }
    DatabaseProvider.prototype.createtable = function () {
        for (var i = 0; i <= this.appGlobal.createtable.length; i++) {
            console.log("query in arry : -" + this.appGlobal.createtable[i]);
            this.dbobject.executeSql(this.appGlobal.createtable[i], {})
                .then(function (data) {
                console.log(JSON.stringify(data));
            }, function (error) {
                console.log(JSON.stringify(error));
            });
        }
    };
    // --------------------------load-from-api------------------------
    DatabaseProvider.prototype.insertbeneficiarydata = function (objCase) {
        var _this = this;
        // alert(" instrt    " + JSON.stringify(objCase))
        console.log(objCase);
        return new Promise(function (resolve, reject) {
            _this.dbobject.executeSql("select server_id from beneficiaries where server_id = ? and code = ?  ", [objCase.id, objCase.code])
                .then(function (data) {
                if (data.rows.length == 0 && objCase.id != undefined && objCase.id != null && objCase != undefined) {
                    _this.dbobject.executeSql("INSERT INTO beneficiaries  (server_id,device_id,code,beneficiary_name,gender,age,date_of_birth,marital_status,caste,religion,primary_occupation,ownership_of_land,total_land_holding,total_family_income_average_monthly,education_status,height_in_cms,Weight_in_kgs,village_id,household_id,family_head_id,type_of_rationa_card,family_head_relation,contact_number,whatsapp_number,user_id,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [objCase.id, _this.appGlobal.device_id, objCase.code, objCase.b_name, objCase.gender, objCase.age, objCase.date_of_birth, objCase.marital_status, objCase.caste, objCase.religion, objCase.primary_occupation, objCase.ownership_of_land, objCase.total_land_holding, objCase.total_family_income_average_monthly, objCase.education_status, objCase.height_in_cms, objCase.Weight_in_kgs, objCase.village_id, objCase.household_id, objCase.family_head_id, objCase.type_of_rationa_card, objCase.family_head_relation, objCase.contact_number, objCase.whatsapp_number, objCase.user_id, objCase.created_at, objCase.updated_at])
                        .then(function (data) {
                        resolve(data);
                        console.log("INSERTED: insertCase" + JSON.stringify(data));
                    }, function (error) {
                        reject(error);
                        _this.appGlobal.actual = _this.appGlobal.actual - 1;
                        console.log("ERROR: insertCase" + JSON.stringify(error));
                    });
                }
                else {
                    _this.appGlobal.actual = _this.appGlobal.actual - 1;
                    console.log("condiction is not full fill");
                }
            }, function (error) {
                console.log(JSON.stringify(error));
            });
        });
    };
    DatabaseProvider.prototype.insertkycsdatafromapi = function (objCase) {
        var _this = this;
        //alert("kyc person  :-" + objCase.kyc_person_id)
        return new Promise(function (resolve, reject) {
            _this.dbobject.executeSql("INSERT INTO kycs(server_id,user_id,kyc_person_id,kyc_person_type,kyc_name,kyc_detail,kyc_number,kyc_file,kyc_image,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)", [objCase.id, objCase.user_id, objCase.kyc_person_id, objCase.kyc_person_type, objCase.kyc_name, objCase.kyc_detail, objCase.kyc_number, objCase.kyc_file, objCase.kyc_image, objCase.created_at, objCase.updated_at])
                .then(function (data) {
                resolve(data);
                console.log("insert Successfully kycs main");
            }, function (error) {
                reject(error);
                console.log("ERROR IN GETTING KYC: insertCase" + JSON.stringify(error));
            });
        });
    };
    DatabaseProvider.prototype.insertsurveydata = function (objCase) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.dbobject.executeSql("select * from  `survey` where  `server_id` =?  and `title`=? and `description`=? ", [objCase.id, objCase.title, objCase.description])
                .then(function (data) {
                console.log("   check surveys     " + data.rows.length);
                if (data.rows.length == 0) {
                    console.log("   check surveys     " + data.rows.length);
                    _this.dbobject.executeSql("INSERT INTO `survey`(`server_id`,`project_id`,`title`,`description`,`type`,`start_date`,`created_at`,`updated_at`) VALUES (?,?,?,?,?,?,?,?)", [objCase.id, objCase.project_id, objCase.title, objCase.description, objCase.type, objCase.start_date, objCase.created_at, objCase.updated_at])
                        .then(function (data) {
                        resolve(data);
                        console.log("insert Survey Successfully");
                    }, function (error) {
                        reject(error);
                        console.log("ERROR IN GETTING SURVEY: insertCase" + JSON.stringify(error));
                    });
                }
                else {
                    console.log("alredy");
                }
            }, function (error) {
                console.log(JSON.stringify(error));
            });
        });
    };
    DatabaseProvider.prototype.insertQuestinsdata = function (objCase) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.dbobject.executeSql("select * from  `questions` where  `server_id` =? ", [objCase.id])
                .then(function (data) {
                //alert("   check question     " + data.rows.length);
                if (data.rows.length == 0) {
                    _this.dbobject.executeSql("INSERT INTO `questions`(`server_id`,`survey_id`,`section_id`,`order`,`text`,`type`,`language_json`,`rule_json`,`created_at`,`updated_at`) VALUES (?,?,?,?,?,?,?,?,?,?)", [objCase.id, objCase.survey_id, objCase.section_id, objCase.order, objCase.text, objCase.type, objCase.language_json, objCase.rule_json, objCase.created_at, objCase.updated_at])
                        .then(function (data) {
                        console.log("insert Questions Successfully");
                        resolve(data);
                    }, function (error) {
                        reject(error);
                        console.log("ERROR IN GETTING QUESTIONS" + JSON.stringify(error));
                    });
                }
            }, function (error) {
                console.log(error);
            });
        });
    };
    DatabaseProvider.prototype.insertvillages = function (objCase) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.dbobject.executeSql("INSERT INTO `villages`( `server_id`,`talukablock_id`,`name`) VALUES(?,?,?)", [objCase.id, objCase.talukablock_id, objCase.name])
                .then(function (data) {
                console.log("insert Questions Successfully");
                resolve(data);
            }, function (error) {
                reject(error);
                console.log("ERROR IN GETTING QUESTIONS" + JSON.stringify(error));
            });
        });
    };
    DatabaseProvider.prototype.insertoptions = function (objCase) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.dbobject.executeSql("INSERT INTO `options`( `server_id`,`question_id`,`type`,`order`,`text`,`language_json`,`created_at`,`updated_at`,'sync_status') VALUES(?,?,?,?,?,?,?,?,?)", [objCase.id, objCase.question_id, objCase.type, objCase.order, objCase.text, objCase.language_json, objCase.created_at, objCase.updated_at, 0])
                .then(function (data) {
                console.log("insert options Successfully");
                resolve(data);
            }, function (error) {
                reject(error);
                alert("ERROR IN GETTING QUESTIONS" + JSON.stringify(error));
            });
        });
    };
    DatabaseProvider.prototype.inserthouseholds = function (objCase) {
        var _this = this;
        //alert("in insert hh   " + JSON.stringify(objCase))
        return new Promise(function (resolve, reject) {
            _this.dbobject.executeSql("select server_id from `households` where server_id = ? ", [objCase.id])
                .then(function (data) {
                if (data.rows.length == 0 && objCase.id != undefined && objCase.id != null && objCase != undefined) {
                    _this.dbobject.executeSql("INSERT INTO `households`(`server_id`,`village_id`,`user_id`,`hh_number`,`faliya_name`,`landmark`) VALUES(?,?,?,?,?,?)", [objCase.id, objCase.village_id, objCase.user_id, objCase.hh_number, objCase.faliya_name, objCase.landmark])
                        .then(function (data) {
                        console.log("insert household Successfully");
                        resolve(data);
                    }, function (error) {
                        reject(error);
                        console.log("ERROR IN GETTING household" + JSON.stringify(error));
                    });
                }
            });
        });
    };
    DatabaseProvider.prototype.inserttalukas = function (objCase) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.dbobject.executeSql("INSERT INTO `talukas`( `server_id`,`parent_id`,`district_id`,`name`) VALUE(?,?,?,?,?,?)", [objCase.id, objCase.parent_id, objCase.district_id, objCase.name])
                .then(function (data) {
                console.log("insert Questions Successfully");
                resolve(data);
            }, function (error) {
                reject(error);
                "landmark";
                console.log("ERROR IN GETTING QUESTIONS" + JSON.stringify(error));
            });
        });
    };
    // ------------------------------------------------close----------------------------------------------
    // ------------------------GETLOD-BENEFICIARY-----------------------------
    DatabaseProvider.prototype.getbeneficiarydata = function (ev, cb, t) {
        var _this = this;
        var query = '';
        query = 'SELECT * FROM beneficiaries ORDER BY id DESC LIMIT 100  ';
        // query = 'SELECT * FROM beneficiaries  where id BETWEEN ' + value1 + '  AND  ' + value2 + '  ORDER BY id DESC';
        // alert(query)
        this.dbobject.executeSql(query, {})
            .then(function (data) {
            _this.offlineCase = [];
            if (data.rows.length > 0) {
                for (var i = 0; i < data.rows.length; i++) {
                    // alert(JSON.stringify(data.rows.item(i)))
                    _this.offlineCase.push({
                        id: data.rows.item(i).id,
                        server_id: data.rows.item(i).server_id,
                        code: data.rows.item(i).code,
                        beneficiary_name: data.rows.item(i).beneficiary_name,
                        gender: data.rows.item(i).gender,
                        age: data.rows.item(i).age,
                        date_of_birth: data.rows.item(i).date_of_birth,
                        marital_status: data.rows.item(i).marital_status,
                        caste: data.rows.item(i).caste,
                        religion: data.rows.item(i).religion,
                        primary_occupation: data.rows.item(i).primary_occupation,
                        ownership_of_land: data.rows.item(i).ownership_of_land,
                        total_land_holding: data.rows.item(i).total_land_holding,
                        total_family_income_average_monthly: data.rows.item(i).total_family_income_average_monthly,
                        education_status: data.rows.item(i).education_status,
                        height_in_cms: data.rows.item(i).height_in_cms,
                        Weight_in_kgs: data.rows.item(i).Weight_in_kgs,
                        village_id: data.rows.item(i).village_id,
                        household_id: data.rows.item(i).household_id,
                        family_head_id: data.rows.item(i).family_head_id,
                        type_of_rationa_card: data.rows.item(i).type_of_rationa_card,
                        contact_number: data.rows.item(i).contact_number,
                        whatsapp_number: data.rows.item(i).whatsapp_number,
                        family_head_relation: data.rows.item(i).family_head_relation,
                        user_id: data.rows.item(i).user_id,
                        created_at: data.rows.item(i).created_at,
                        updated_at: data.rows.item(i).updated_at,
                    });
                }
                cb(t);
            }
            else {
                console.log("error in getting beneficiary data from database !!!!");
                _this.offlineCase = [];
            }
        }, function (error) {
            console.log("ERROR : getAllCase " + JSON.stringify(error));
        });
    };
    // ------------------------------------CLOSE---------------------------------
    // this.dbobject.executeSql("INSERT INTO kycs(server_id,user_id,kyc_person_id,kyc_person_type,kyc_name,kyc_detail,kyc_number,kyc_file,kyc_image,created_at,updated_at,sync_status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
    //       [autoincrement_id, objCase.user_id,autoincrement_id, objCase.kyc_person_type, objCase.kyc_name, objCase.kyc_detail, objCase.kyc_number, objCase.kyc_file, objCase.kyc_image, objCase.created_at, objCase.updated_at, 0])
    DatabaseProvider.prototype.insertkycsdata = function (objCase, beneficiary_id, autoincrement_id) {
        var _this = this;
        if (beneficiary_id == null && beneficiary_id == undefined) {
            objCase.id = this.appGlobal.device_id;
            objCase.kyc_person_id = this.appGlobal.device_id;
        }
        return new Promise(function (resolve, reject) {
            _this.dbobject.executeSql("INSERT INTO kycs(user_id,kyc_person_id,kyc_person_type,kyc_name,kyc_detail,kyc_number,kyc_file,kyc_image,created_at,updated_at,device_id,sync_status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", [objCase.user_id, autoincrement_id, objCase.kyc_person_type, objCase.kyc_name, objCase.kyc_detail, objCase.kyc_number, objCase.kyc_file, objCase.kyc_image, objCase.created_at, objCase.updated_at, _this.appGlobal.device_id, 0])
                .then(function (data) {
                resolve(data);
                alert("insert kyc successfully");
                return true;
            }, function (error) {
                reject(error);
                console.log("ERROR IN GETTING KYC: insertCase" + JSON.stringify(error));
                return false;
            });
        });
    };
    DatabaseProvider.prototype.insertnewbeneficiary = function (objCase, timestamp) {
        var _this = this;
        //alert(JSON.stringify(objCase));
        console.log(objCase);
        return new Promise(function (resolve, reject) {
            _this.dbobject.executeSql("INSERT INTO Updated_beneficiaries (server_id,device_id,code,beneficiary_name,gender,age,date_of_birth,marital_status,caste,religion,primary_occupation,ownership_of_land,total_land_holding,total_family_income_average_monthly,education_status,height_in_cms,Weight_in_kgs,village_id,household_id,family_head_id,type_of_rationa_card,family_head_relation,contact_number,whatsapp_number,user_id,created_at,updated_at,sync_status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [objCase.id, _this.appGlobal.device_id, objCase.code, objCase.beneficiary_name, objCase.gender, objCase.age, objCase.date_of_birth, objCase.marital_status, objCase.caste, objCase.religion, objCase.primary_occupation, objCase.ownership_of_land, objCase.total_land_holding, objCase.total_family_income_average_monthly, objCase.education_status, objCase.height_in_cms, objCase.Weight_in_kgs, objCase.village_id, objCase.household_id, objCase.family_head_id, objCase.type_of_rationa_card, objCase.family_head_relation, objCase.contact_number, objCase.whatsapp_number, objCase.user_id, timestamp, objCase.updated_at, 0])
                .then(function (data) {
                _this.insertMainbeneficiary(objCase, timestamp);
                resolve(data);
                console.log("INSERTED: insertCase" + JSON.stringify(data));
            }, function (error) {
                reject(error);
                console.log("ERROR: insertCase" + JSON.stringify(error));
                _this.isinsertstatus = false;
            });
        });
    };
    DatabaseProvider.prototype.insertMainbeneficiary = function (objCase, timestamp) {
        var _this = this;
        // alert("TIMESTAMP in insert beni  :- " + objCase.id)
        //alert("divece in insert beni  :- " + this.appGlobal.device_id)
        return new Promise(function (resolve, reject) {
            _this.dbobject.executeSql("INSERT INTO beneficiaries (server_id,device_id,code,beneficiary_name,gender,age,date_of_birth,marital_status,caste,religion,primary_occupation,ownership_of_land,total_land_holding,total_family_income_average_monthly,education_status,height_in_cms,Weight_in_kgs,village_id,household_id,family_head_id,type_of_rationa_card,family_head_relation,contact_number,whatsapp_number,user_id,created_at,updated_at,sync_status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [objCase.id, _this.appGlobal.device_id, objCase.code, objCase.beneficiary_name, objCase.gender, objCase.age, objCase.date_of_birth, objCase.marital_status, objCase.caste, objCase.religion, objCase.primary_occupation, objCase.ownership_of_land, objCase.total_land_holding, objCase.total_family_income_average_monthly, objCase.education_status, objCase.height_in_cms, objCase.Weight_in_kgs, objCase.village_id, objCase.household_id, objCase.family_head_id, objCase.type_of_rationa_card, objCase.family_head_relation, objCase.contact_number, objCase.whatsapp_number, objCase.user_id, timestamp, objCase.updated_at, 0])
                .then(function (data) {
                alert("Insert new Beneficiary successfully");
                resolve(data);
                return true;
            }, function (error) {
                reject(error);
                console.log("ERROR: insertCase" + JSON.stringify(error));
                return false;
            });
        });
    };
    DatabaseProvider.prototype.getKycsdata = function (kyc_person_id, autoincrement_id, cb, t) {
        var _this = this;
        console.log("@@@@@@@@@@@@    " + autoincrement_id + "      kyc_person_id          " + kyc_person_id);
        var query = 'SELECT * FROM kycs WHERE kyc_person_id = ?';
        if (kyc_person_id == null && kyc_person_id == undefined) {
            kyc_person_id = this.appGlobal.device_id;
        }
        this.offlineCasekycs = [];
        this.dbobject.executeSql(query, [autoincrement_id])
            .then(function (data) {
            if (data.rows.length > 0) {
                for (var i = 0; i < data.rows.length; i++) {
                    _this.offlineCasekycs.push({
                        id: data.rows.item(i).id,
                        server_id: data.rows.item(i).server_id,
                        user_id: data.rows.item(i).user_id,
                        kyc_person_id: data.rows.item(i).kyc_person_id,
                        kyc_person_type: data.rows.item(i).kyc_person_type,
                        kyc_name: data.rows.item(i).kyc_name,
                        kyc_number: data.rows.item(i).kyc_number,
                        kyc_detail: data.rows.item(i).kyc_detail,
                        kyc_file: data.rows.item(i).kyc_file,
                        kyc_image: data.rows.item(i).kyc_image,
                        created_at: data.rows.item(i).created_at,
                        updated_at: data.rows.item(i).updated_at
                    });
                    cb(t);
                }
            }
            else {
                console.log("No kyc data In record");
            }
        }, function (error) {
            console.log("ERROR: getAllCase " + JSON.stringify(error));
        });
    };
    DatabaseProvider.prototype.getsureydatalode = function (cb, t) {
        var _this = this;
        var query = '';
        query = 'SELECT * FROM survey';
        this.offlineCase = [];
        this.dbobject.executeSql(query, {})
            .then(function (data) {
            if (data.rows.length > 0) {
                for (var i = 0; i < data.rows.length; i++) {
                    _this.offlineCase.push({
                        id: data.rows.item(i).id,
                        server_id: data.rows.item(i).server_id,
                        project_id: data.rows.item(i).project_id,
                        title: data.rows.item(i).title,
                        type: data.rows.item(i).type,
                        description: data.rows.item(i).description,
                        start_date: data.rows.item(i).start_date,
                        created_at: data.rows.item(i).created_at,
                        updated_at: data.rows.item(i).updated_at
                    });
                    cb(t);
                }
            }
            else {
                console.log("error in getting survey data from database !!!!");
            }
        }, function (error) {
            console.log("ERROR: getAllCase @@@@@ survey " + JSON.stringify(error));
        });
    };
    DatabaseProvider.prototype.getQuestionsfroloddata = function (survey_id, cal, t) {
        var _this = this;
        var query = '';
        query = 'SELECT * FROM questions WHERE survey_id = ? ';
        this.dbobject.executeSql(query, [survey_id])
            .then(function (data) {
            _this.appGlobal.questionsList = [];
            if (data.rows.length > 0) {
                for (var i = 0; i <= data.rows.length; i++) {
                    // alert(JSON.stringify(data.rows.item(i)))
                    _this.appGlobal.questionsList.push({
                        id: data.rows.item(i).id,
                        server_id: data.rows.item(i).server_id,
                        survey_id: data.rows.item(i).survey_id,
                        section_id: data.rows.item(i).section_id,
                        order: data.rows.item(i).order,
                        text: data.rows.item(i).text,
                        type: data.rows.item(i).type,
                        language_json: data.rows.item(i).language_json,
                        rule_json: data.rows.item(i).rule_json,
                        created_at: data.rows.item(i).created_at,
                        updated_at: data.rows.item(i).updated_at,
                    });
                }
                cal(t);
            }
            else {
                _this.appGlobal.questionsList = [];
            }
        }, function (error) {
            alert("ERROR: getAllCase @@@@@ survey " + JSON.stringify(error));
        });
    };
    DatabaseProvider.prototype.insertAnswer = function (objCase) {
        for (var i = 0; i < this.appGlobal.selectedCheckbox.length; i++) {
            //  console.log("Selected Checkbox array in database :" + JSON.stringify(this.appGlobal.selectedCheckbox[i]));
            // console.log("Selected Checkbox array in database :" + JSON.stringify(this.appGlobal.selectedCheckId[i]));
            objCase.server_id = this.appGlobal.selectedCheckbox[i];
            objCase.beneficiarie_id = this.appGlobal.selectedCheckId[i];
            this.insertseprateAns(objCase);
            console.log("#########     " + JSON.stringify(objCase));
        }
    };
    DatabaseProvider.prototype.insertseprateAns = function (objCase) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.dbobject.executeSql("INSERT INTO `answers` ( `server_id`, `beneficiarie_id`, `survey_id`, `question_id`, `language_id`, `option_id`,`option_text`,`image`,`other_text`,`created_at`,`updated_at`,`sync_status`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", [objCase.server_id, objCase.beneficiarie_id, objCase.survey_id, objCase.question_id, objCase.language_id, objCase.option_id, objCase.option_text, objCase.image, objCase.other_text, objCase.created_at, objCase.updated_at, 0])
                .then(function (data) {
                console.log(JSON.stringify(data));
                resolve(data);
                _this.appGlobal.selectedCheckId = [];
                _this.appGlobal.selectedCheckbox = [];
                // this.isinsertstatus = true
                // return true
            }, function (error) {
                reject(error);
                console.log("ERROR: insertCase" + JSON.stringify(error));
                _this.isinsertstatus = false;
                // return false
            });
        });
    };
    DatabaseProvider.prototype.getbeneficiaryforprofile = function (id, autoincrement_id) {
        var _this = this;
        //alert(id + "          " + autoincrement_id)
        var query = "SELECT * FROM beneficiaries WHERE server_id=?";
        if (id == undefined && id == null) {
            id = autoincrement_id;
            query = "SELECT * FROM beneficiaries WHERE id=?";
        }
        this.offlineCase = [];
        this.dbobject.executeSql(query, [id])
            .then(function (data) {
            if (data.rows.length > 0) {
                for (var i = 0; i < data.rows.length; i++) {
                    _this.offlineCase.push({
                        id: data.rows.item(i).id,
                        server_id: data.rows.item(i).server_id,
                        code: data.rows.item(i).code,
                        beneficiary_name: data.rows.item(i).beneficiary_name,
                        gender: data.rows.item(i).gender,
                        age: data.rows.item(i).age,
                        date_of_birth: data.rows.item(i).date_of_birth,
                        marital_status: data.rows.item(i).marital_status,
                        caste: data.rows.item(i).caste,
                        religion: data.rows.item(i).religion,
                        primary_occupation: data.rows.item(i).primary_occupation,
                        ownership_of_land: data.rows.item(i).ownership_of_land,
                        total_land_holding: data.rows.item(i).total_land_holding,
                        total_family_income_average_monthly: data.rows.item(i).total_family_income_average_monthly,
                        education_status: data.rows.item(i).education_status,
                        height_in_cms: data.rows.item(i).height_in_cms,
                        Weight_in_kgs: data.rows.item(i).Weight_in_kgs,
                        village_id: data.rows.item(i).village_id,
                        household_id: data.rows.item(i).household_id,
                        family_head_id: data.rows.item(i).family_head_id,
                        type_of_rationa_card: data.rows.item(i).type_of_rationa_card,
                        contact_number: data.rows.item(i).contact_number,
                        whatsapp_number: data.rows.item(i).whatsapp_number,
                        family_head_relation: data.rows.item(i).family_head_relation,
                        user_id: data.rows.item(i).user_id,
                        created_at: data.rows.item(i).created_at,
                        updated_at: data.rows.item(i).updated_at,
                    });
                }
            }
            else {
                console.log("error in getting beneficiary data from database !!!!");
            }
        }, function (error) {
            console.log("ERROR: getAllCase " + JSON.stringify(error));
        });
    };
    DatabaseProvider.prototype.updatabeneficiaryProfile = function (objCase, beneficiary_id, autoincrement_id) {
        var _this = this;
        console.log("     " + beneficiary_id + "    " + autoincrement_id);
        var query = "UPDATE beneficiaries SET beneficiary_name = ? ,gender = ?,age=?,date_of_birth = ?,marital_status=?,caste=?,religion=?,primary_occupation=?,ownership_of_land=?,total_land_holding =?, total_family_income_average_monthly =?, education_status =?, height_in_cms =?, Weight_in_kgs =?, village_id = ?, household_id = ?, family_head_id = ?,type_of_rationa_card =?, contact_number = ?, whatsapp_number = ?, user_id = ?, family_head_relation = ? ,sync_status=? WHERE server_id = ? ";
        if (beneficiary_id == undefined && beneficiary_id == null) {
            beneficiary_id = autoincrement_id;
            query = "UPDATE beneficiaries SET beneficiary_name = ? ,gender = ?,age=?,date_of_birth = ?,marital_status=?,caste=?,religion=?,primary_occupation=?,ownership_of_land=?,total_land_holding =?, total_family_income_average_monthly =?, education_status =?, height_in_cms =?, Weight_in_kgs =?, village_id = ?, household_id = ?, family_head_id = ?,type_of_rationa_card =?, contact_number = ?, whatsapp_number = ?, user_id = ?, family_head_relation = ? ,sync_status=? WHERE  id = ?";
        }
        if (objCase != undefined) {
            return new Promise(function (resolve, reject) {
                _this.dbobject.executeSql(query, [objCase.beneficiary_name, objCase.gender, objCase.age, objCase.date_of_birth, objCase.marital_status, objCase.caste, objCase.religion, objCase.primary_occupation, objCase.ownership_of_land, objCase.total_land_holding, objCase.total_family_income_average_monthly, objCase.education_status, objCase.height_in_cms, objCase.Weight_in_kgs, objCase.village_id, objCase.household_id, objCase.family_head_id, objCase.type_of_rationa_card, objCase.contact_number, objCase.whatsapp_number, objCase.user_id, objCase.family_head_relation, 0, beneficiary_id])
                    .then(function (data) {
                    resolve(data);
                    _this.updatebenenificialinsert(objCase, beneficiary_id);
                    _this.isinsertstatus = true;
                    return true;
                }, function (error) {
                    reject(error);
                    console.log("ERROR: insertCase" + JSON.stringify(error));
                    _this.isinsertstatus = false;
                    return false;
                });
            });
        }
        else {
            alert("update else ");
        }
    };
    DatabaseProvider.prototype.updatebenenificialinsert = function (objCase, beneficiary_id) {
        //alert("update $$$$$$$$$$$$$$$$$$$")
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.dbobject.executeSql("INSERT INTO Updated_beneficiaries (server_id,device_id,code,beneficiary_name,gender,date_of_birth,marital_status,caste,religion,primary_occupation,ownership_of_land,total_land_holding,total_family_income_average_monthly,education_status,height_in_cms,Weight_in_kgs,village_id,household_id,family_head_id,type_of_rationa_card,family_head_relation,contact_number,whatsapp_number,user_id,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [beneficiary_id, _this.appGlobal.device_id, objCase.code, objCase.beneficiary_name, objCase.gender, objCase.date_of_birth, objCase.marital_status, objCase.caste, objCase.religion, objCase.primary_occupation, objCase.ownership_of_land, objCase.total_land_holding, objCase.total_family_income_average_monthly, objCase.education_status, objCase.height_in_cms, objCase.Weight_in_kgs, objCase.village_id, objCase.household_id, objCase.family_head_id, objCase.type_of_rationa_card, objCase.family_head_relation, objCase.contact_number, objCase.whatsapp_number, objCase.user_id, null, objCase.updated_at])
                .then(function (data) {
                alert("Update successfully");
                resolve(data);
                console.log("INSERTED: insertCase" + JSON.stringify(data));
                _this.isinsertstatus = true;
                return true;
            }, function (error) {
                reject(error);
                console.log("ERROR: insertCase" + JSON.stringify(error));
                _this.isinsertstatus = false;
                return false;
            });
        });
    };
    DatabaseProvider.prototype.syncbeneficiarydata = function () {
        var _this = this;
        var query = '';
        //alert("in sync");
        query = 'SELECT * FROM beneficiaries where sync_status = 0 ';
        this.dbobject.executeSql(query, {})
            .then(function (data) {
            _this.appGlobal.benefeciaries = [];
            if (data.rows.length > 0) {
                for (var i = 0; i < data.rows.length; i++) {
                    console.log("  %%%%%%  " + JSON.stringify(data.rows.item(i)));
                    _this.appGlobal.benefeciaries.push({
                        client_id: data.rows.item(i).id,
                        code: data.rows.item(i).code,
                        device_id: data.rows.item(i).device_id,
                        b_name: data.rows.item(i).beneficiary_name,
                        gender: data.rows.item(i).gender,
                        age: data.rows.item(i).age,
                        date_of_birth: data.rows.item(i).date_of_birth,
                        marital_status: data.rows.item(i).marital_status,
                        caste: data.rows.item(i).caste,
                        religion: data.rows.item(i).religion,
                        primary_occupation: data.rows.item(i).primary_occupation,
                        ownership_of_land: data.rows.item(i).ownership_of_land,
                        total_land_holding: data.rows.item(i).total_land_holding,
                        total_family_income_average_monthly: data.rows.item(i).total_family_income_average_monthly,
                        education_status: data.rows.item(i).education_status,
                        height_in_cms: data.rows.item(i).height_in_cms,
                        weight_in_kgs: data.rows.item(i).Weight_in_kgs,
                        village_id: data.rows.item(i).village_id,
                        household_id: data.rows.item(i).household_id,
                        family_head_id: data.rows.item(i).family_head_id,
                        type_of_rationa_card: data.rows.item(i).type_of_rationa_card,
                        contact_number: data.rows.item(i).contact_number,
                        whatsapp_number: data.rows.item(i).whatsapp_number,
                        family_head_relation: data.rows.item(i).family_head_relation,
                        user_id: data.rows.item(i).user_id,
                        age_in_month: ""
                    });
                }
            }
            else {
                console.log("error in getting beneficiary data from database !!!!");
            }
        }, function (error) {
            alert("ERROR: getAllCase " + JSON.stringify(error));
        });
    };
    DatabaseProvider.prototype.syncanswersdata = function () {
        var _this = this;
        var query = '';
        query = 'SELECT * FROM answers where  sync_status = 0 ';
        this.dbobject.executeSql(query, {})
            .then(function (data) {
            _this.appGlobal.syncanswers = [];
            if (data.rows.length > 0) {
                for (var i = 0; i < data.rows.length; i++) {
                    // console.log(" @@@@@@@@@      " + JSON.stringify(data.rows.item(i)))
                    _this.appGlobal.syncanswers.push({
                        client_id: data.rows.item(i).id,
                        beneficiarie_id: data.rows.item(i).beneficiarie_id,
                        survey_id: data.rows.item(i).survey_id,
                        question_id: data.rows.item(i).question_id,
                        language_id: data.rows.item(i).language_id,
                        option_id: data.rows.item(i).option_id,
                        option_text: data.rows.item(i).option_text,
                        image: data.rows.item(i).image,
                        other_text: data.rows.item(i).other_text,
                        device_id: _this.appGlobal.device_id
                    });
                }
            }
            else {
                console.log("error in getting beneficiary data from database !!!!");
            }
        }, function (error) {
            console.log("ERROR: getAllCase " + JSON.stringify(error));
        });
    };
    DatabaseProvider.prototype.synckycsdata = function () {
        var _this = this;
        var query = '';
        query = 'SELECT * FROM kycs where sync_status = 0 ';
        this.dbobject.executeSql(query, {})
            .then(function (data) {
            _this.appGlobal.synckycs = [];
            if (data.rows.length > 0) {
                for (var i = 0; i < data.rows.length; i++) {
                    console.log("in sync answers");
                    _this.appGlobal.synckycs.push({
                        client_id: data.rows.item(i).id,
                        device_id: data.rows.item(i).device_id,
                        server_id: data.rows.item(i).server_id,
                        user_id: data.rows.item(i).user_id,
                        kyc_person_id: data.rows.item(i).kyc_person_id,
                        kyc_person_type: data.rows.item(i).kyc_person_type,
                        kyc_name: data.rows.item(i).kyc_name,
                        kyc_detail: data.rows.item(i).kyc_detail,
                        kyc_number: data.rows.item(i).kyc_number,
                        // kyc_file: data.rows.item(i).kyc_file,
                        kyc_image: data.rows.item(i).kyc_image
                    });
                }
            }
            else {
                console.log("error in getting beneficiary data from database !!!!");
            }
        }, function (error) {
            console.log("ERROR: getAllCase " + JSON.stringify(error));
        });
    };
    DatabaseProvider.prototype.showbeneficirybysearch = function (ev, cb, t) {
        var _this = this;
        var query = '';
        query = 'SELECT beneficiaries.*,households.hh_number FROM beneficiaries INNER JOIN households ON  beneficiaries.household_id= households.server_id WHERE beneficiary_name LIKE ' + "'" + ev + "%' order by id desc";
        this.dbobject.executeSql(query, {})
            .then(function (data) {
            _this.offlineCase = [];
            if (data.rows.length > 0) {
                for (var i = 0; i < data.rows.length; i++) {
                    _this.offlineCase.push({
                        id: data.rows.item(i).id,
                        server_id: data.rows.item(i).server_id,
                        code: data.rows.item(i).code,
                        beneficiary_name: data.rows.item(i).beneficiary_name,
                        gender: data.rows.item(i).gender,
                        date_of_birth: data.rows.item(i).date_of_birth,
                        contact_number: data.rows.item(i).contact_number,
                        created_at: data.rows.item(i).created_at,
                        updated_at: data.rows.item(i).updated_at,
                        family_head_id: data.rows.item(i).family_head_id,
                        firstname: data.rows.item(i).firstname,
                        middlename: data.rows.item(i).middlename,
                        lastname: data.rows.item(i).lastname,
                        household_id: data.rows.item(i).household_id,
                        village_id: data.rows.item(i).village_id,
                        user_id: data.rows.item(i).user_id,
                        age: data.rows.item(i).age,
                        family_head_relation: data.rows.item(i).family_head_relation,
                        whatsapp_number: data.rows.item(i).whatsapp_number,
                        hh_number: data.rows.item(i).hh_number
                    });
                }
                cb(t);
                return true;
            }
            else {
                query = 'SELECT * FROM beneficiaries  WHERE beneficiary_name LIKE ' + "'" + ev + "%' order by id desc";
                _this.dbobject.executeSql(query, {}).then(function (data) {
                    _this.offlineCase = [];
                    if (data.rows.length > 0) {
                        for (var i = 0; i < data.rows.length; i++) {
                            _this.offlineCase.push({
                                id: data.rows.item(i).id,
                                server_id: data.rows.item(i).server_id,
                                code: data.rows.item(i).code,
                                beneficiary_name: data.rows.item(i).beneficiary_name,
                                gender: data.rows.item(i).gender,
                                date_of_birth: data.rows.item(i).date_of_birth,
                                contact_number: data.rows.item(i).contact_number,
                                created_at: data.rows.item(i).created_at,
                                updated_at: data.rows.item(i).updated_at,
                                family_head_id: data.rows.item(i).family_head_id,
                                firstname: data.rows.item(i).firstname,
                                middlename: data.rows.item(i).middlename,
                                lastname: data.rows.item(i).lastname,
                                household_id: data.rows.item(i).household_id,
                                village_id: data.rows.item(i).village_id,
                                user_id: data.rows.item(i).user_id,
                                age: data.rows.item(i).age,
                                family_head_relation: data.rows.item(i).family_head_relation,
                                whatsapp_number: data.rows.item(i).whatsapp_number,
                                hh_number: data.rows.item(i).hh_number
                            });
                        }
                        cb(t);
                        return true;
                    }
                    else {
                        _this.offlineCase = [];
                        alert("No beneficiary available !!!!");
                        return false;
                    }
                }, function (error) { console.log(JSON.stringify("error in getting beneficiaries" + error)); });
            }
        }, function (error) {
            alert("ERROR : getAllCase " + JSON.stringify(error));
            return false;
        });
    };
    DatabaseProvider.prototype.getTotalcount = function (cb, t) {
        var _this = this;
        this.dbobject.executeSql("select * from beneficiaries", {})
            .then(function (data) {
            _this.total_beneficialy = data.rows.length;
            cb(t);
        }, function (error) {
            console.log(JSON.stringify(error));
        });
    };
    DatabaseProvider.prototype.getTotalsurvey = function (cb, t) {
        var _this = this;
        this.dbobject.executeSql("select * from  survey", {})
            .then(function (data) {
            _this.total_surveys = data.rows.length;
            cb(t);
        }, function (error) {
            console.log(JSON.stringify(error));
        });
    };
    DatabaseProvider.prototype.beneficiarypaggination = function (ev, cb, t) {
        var _this = this;
        var query = '';
        var limit;
        if (ev != undefined) {
            limit = ev * 50;
        }
        else {
            limit = 50;
        }
        query = 'select * from beneficiaries ORDER BY id Asc LIMIT ' + limit;
        this.dbobject.executeSql(query, {})
            .then(function (data) {
            _this.offlineCase = [];
            if (data.rows.length > 0) {
                for (var i = 0; i < data.rows.length; i++) {
                    _this.offlineCase.push({
                        id: data.rows.item(i).id,
                        server_id: data.rows.item(i).server_id,
                        code: data.rows.item(i).code,
                        beneficiary_name: data.rows.item(i).beneficiary_name,
                        gender: data.rows.item(i).gender,
                        date_of_birth: data.rows.item(i).date_of_birth,
                        contact_number: data.rows.item(i).contact_number,
                        created_at: data.rows.item(i).created_at,
                        updated_at: data.rows.item(i).updated_at,
                        family_head_id: data.rows.item(i).family_head_id,
                        firstname: data.rows.item(i).firstname,
                        middlename: data.rows.item(i).middlename,
                        lastname: data.rows.item(i).lastname,
                        household_id: data.rows.item(i).household_id,
                        village_id: data.rows.item(i).village_id,
                        user_id: data.rows.item(i).user_id,
                        age: data.rows.item(i).age,
                        family_head_relation: data.rows.item(i).family_head_relation,
                        whatsapp_number: data.rows.item(i).whatsapp_number
                    });
                }
                cb(t);
            }
            else {
                console.log("error in getting beneficiary data from database !!!!");
            }
        }, function (error) {
            console.log("ERROR : getAllCase " + JSON.stringify(error));
        });
    };
    DatabaseProvider.prototype.gethouseholdid = function (village_id, mdl) {
        var _this = this;
        var query = '';
        query = 'SELECT * FROM households WHERE `village_id` =' + village_id;
        this.dbobject.executeSql(query, {})
            .then(function (data) {
            if (data.rows.length > 0) {
                _this.appGlobal.HouseHold = [];
                for (var i = 0; i < data.rows.length; i++) {
                    _this.appGlobal.HouseHold.push({
                        server_id: data.rows.item(i).server_id,
                        village_id: data.rows.item(i).village_id,
                        hh_number: data.rows.item(i).hh_number,
                        faliya_name: data.rows.item(i).faliya_name
                    });
                }
                mdl.household_id = _this.appGlobal.HouseHold;
            }
        }, function (error) {
            console.log("errort in select  hh_number  " + error);
        });
    };
    DatabaseProvider.prototype.updatebeneficiarydata = function (object, t) {
        this.dbobject.executeSql(" update beneficiaries SET  code = ?, device_id = ?, server_id=? , sync_status = ? ,age = ?,date_of_birth = ?  WHERE id=?  ", [object.code, object.device_id, object.id, 1, object.age, object.date_of_birth, object.client_id])
            .then(function (data) {
            console.log("        " + JSON.stringify(data));
            t.pending_beneficiaries = 0;
        }, function (error) {
            console.log("        " + JSON.stringify(error));
        });
    };
    DatabaseProvider.prototype.updatekycsindb = function (object, t) {
        this.dbobject.executeSql(" update kycs SET  server_id=? , sync_status = ? ,kyc_file = ?  WHERE id=?  ", [object.id, 1, object.kyc_file, object.client_id])
            .then(function (data) {
            console.log("        " + JSON.stringify(data));
            t.pending_kycs = 0;
        }, function (error) {
            console.log("        " + JSON.stringify(error));
        });
    };
    DatabaseProvider.prototype.updateanswers = function (object, t) {
        this.dbobject.executeSql(" update `answers` SET  server_id=? , sync_status = ?  WHERE id=?  ", [object.id, 1, object.client_id])
            .then(function (data) {
            console.log("        " + JSON.stringify(data));
            t.pending_answers = 0;
        }, function (error) {
            console.log("        " + JSON.stringify(error));
        });
    };
    DatabaseProvider.prototype.getpoction = function (qid) {
        var _this = this;
        var query = '';
        query = 'SELECT * FROM options WHERE `question_id` =' + qid;
        this.dbobject.executeSql(query, {})
            .then(function (data) {
            if (data.rows.length > 0) {
                _this.appGlobal.options = [];
                for (var i = 0; i < data.rows.length; i++) {
                    _this.appGlobal.options.push({
                        server_id: data.rows.item(i).server_id,
                        question_id: data.rows.item(i).question_id,
                        type: data.rows.item(i).type,
                        text: data.rows.item(i).text
                    });
                }
                //  mdl.opction[qid] = this.appGlobal.opctions;
            }
        }, function (error) {
            console.log("errort in select  hh_number  " + error);
        });
    };
    DatabaseProvider.prototype.getdataforgroupsurvey = function (ca, t) {
        var _this = this;
        var query = '';
        query = 'SELECT beneficiaries.id,beneficiaries.server_id,beneficiaries.beneficiary_name,households.hh_number FROM beneficiaries INNER JOIN households ON  beneficiaries.household_id= households.server_id';
        this.dbobject.executeSql(query, {})
            .then(function (data) {
            if (data.rows.length > 0) {
                _this.appGlobal.groupsurveybeneficiaries = [];
                for (var i = 0; i < data.rows.length; i++) {
                    _this.appGlobal.groupsurveybeneficiaries.push({
                        id: data.rows.item(i).id,
                        server_id: data.rows.item(i).server_id,
                        beneficiary_name: data.rows.item(i).beneficiary_name,
                        isChecked: false,
                        text: data.rows.item(i).beneficiary_name,
                        household_id: data.rows.item(i).hh_number
                    });
                }
                ca(t);
            }
        }, function (error) {
            console.log("errort in select  hh_number  " + error);
        });
    };
    DatabaseProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_1__ionic_native_sqlite__["a" /* SQLite */],
            __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["q" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_4__providers_app_global_app_global__["a" /* AppGlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["k" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["f" /* Events */],
            __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["r" /* ToastController */]])
    ], DatabaseProvider);
    return DatabaseProvider;
}());

//# sourceMappingURL=database.js.map

/***/ }),

/***/ 29:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserData; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular_components_alert_alert_controller__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__login_service_login_service__ = __webpack_require__(482);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(78);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/*
  Generated class for the UserDataTsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var UserData = /** @class */ (function () {
    function UserData(events, storage, loginserviceprovider, alertCtrl) {
        var _this = this;
        this.events = events;
        this.storage = storage;
        this.loginserviceprovider = loginserviceprovider;
        this.alertCtrl = alertCtrl;
        this.HAS_LOGGED_IN = 'hasLoggedIn';
        this.fcmTokenStatus = false;
        this.getUserData().then(function (value) {
            _this.userData = value;
        });
        this.getHasLoggedIn().then(function (value) {
            _this.hasLoggedIn = value;
        });
        this.getUserToken().then(function (value) {
            _this.fcmToken = value;
        });
        this.getUserTokenStatus().then(function (value) {
            _this.fcmTokenStatus = value;
        });
    }
    UserData.prototype.login = function (username, password) {
        var _this = this;
        this.loginserviceprovider.doLogin(username, password)
            .then(function (data) {
            if (!!data.success) {
                _this.storage.set(_this.HAS_LOGGED_IN, true);
                _this.hasLoggedIn = true;
                _this.setUserData(data);
                _this.events.publish('user:login');
            }
            else {
                _this.events.publish('user:error');
                var alert_1 = _this.alertCtrl.create({
                    title: 'Login Failed',
                    subTitle: data.message,
                    buttons: ['Dismiss']
                });
                alert_1.present();
            }
        });
    };
    ;
    UserData.prototype.logout = function () {
        this.storage.clear();
        this.hasLoggedIn = false;
        this.previousToken = '';
        this.fcmToken = '';
        this.userData = '';
        this.fcmTokenStatus = false;
        // this.storage.remove(this.HAS_LOGGED_IN);
        // this.storage.remove('username');
        this.events.publish('user:logout');
    };
    ;
    UserData.prototype.setUsername = function (username) {
        this.storage.set('username', username);
    };
    ;
    UserData.prototype.setUserID = function (userId) {
        this.storage.set('userId', userId);
    };
    UserData.prototype.setUserFCMToken = function (token) {
        if (this.fcmToken !== token) {
            this.previousToken = this.fcmToken;
            this.fcmToken = token;
            this.storage.set('fcmToken', token);
            this.events.publish('fcmToken:changed');
        }
    };
    ;
    UserData.prototype.setUserFCMTokenStatus = function (status) {
        this.fcmTokenStatus = status;
        this.storage.set('fcmTokenStatus', status);
    };
    ;
    UserData.prototype.setUserData = function (userData) {
        this.userData = userData;
        // this.userData.userprofile = "assets/img/user_image_sample.png"
        this.storage.set('userdata', userData);
        this.events.publish('userdata:changed');
    };
    ;
    UserData.prototype.getUserToken = function () {
        return this.storage.get('fcmToken').then(function (value) {
            return value;
        });
    };
    ;
    UserData.prototype.getUserTokenStatus = function () {
        return this.storage.get('fcmTokenStatus').then(function (value) {
            return value;
        });
    };
    ;
    UserData.prototype.getUserData = function () {
        return this.storage.get('userdata').then(function (value) {
            return value;
        });
    };
    ;
    UserData.prototype.getAuthToken = function () {
        return this.storage.get('userdata').then(function (value) {
            return value.auth_token;
        });
    };
    ;
    UserData.prototype.getUserId = function () {
        return this.storage.get('userdata').then(function (value) {
            return value.User_id;
        });
    };
    ;
    UserData.prototype.getName = function () {
        return this.storage.get('userdata').then(function (value) {
            return value.name;
        });
    };
    ;
    UserData.prototype.getEmployeeId = function () {
        return this.storage.get('userdata').then(function (value) {
            console.log("--------------------------------------", value.employee_id);
            return value.employee_id;
        });
    };
    ;
    UserData.prototype.getRole = function () {
        return this.storage.get('userdata').then(function (value) {
            return value.role;
        });
    };
    ;
    UserData.prototype.getEmail = function () {
        return this.storage.get('userdata').then(function (value) {
            return value.email;
        });
    };
    ;
    UserData.prototype.getUsername = function () {
        return this.storage.get('username').then(function (value) {
            return value;
        });
    };
    ;
    UserData.prototype.getHasLoggedIn = function () {
        return this.storage.get(this.HAS_LOGGED_IN).then(function (value) {
            return value === true;
        });
    };
    ;
    UserData.prototype.isValid = function (username, password, email) {
        console.log("username", username);
        console.log("password", password);
        console.log("Email", email);
        var emailRegex = /[^@\s]+@[^@\s]+\.[^@\s]+/;
        if (!!email || email === '') {
            console.log("EMail Valid:", emailRegex.test(email));
            if (!emailRegex.test(email)) {
                var alert_2 = this.alertCtrl.create({
                    title: 'Invalid Email Address',
                    subTitle: "Please enter a valid email address",
                    buttons: ['Dismiss']
                });
                alert_2.present();
                return false;
            }
            // } else if(!!username && !!password){
            //   let alert = this.alertCtrl.create({
            //     title: 'Invalid Username Or Password',
            //     subTitle: "Username or Password can't be blank",
            //     buttons: ['Dismiss']
            //   });
            //   alert.present();
            //   return false;
        }
        return true;
    };
    UserData.prototype.forgotPassword = function (email) {
        var _this = this;
        console.log("Email:", email);
        this.loginserviceprovider.doForgotPassword(email)
            .then(function (data) {
            console.log(data);
            var alert = _this.alertCtrl.create({
                title: 'Forgot Password',
                subTitle: data.message,
                buttons: ['Dismiss']
            });
            alert.present();
        });
    };
    UserData = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* Events */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1__login_service_login_service__["a" /* LoginServiceProvider */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular_components_alert_alert_controller__["a" /* AlertController */]])
    ], UserData);
    return UserData;
}());

//# sourceMappingURL=user-data-ts.js.map

/***/ }),

/***/ 320:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchBeneficiryPageModule", function() { return SearchBeneficiryPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__search_beneficiry__ = __webpack_require__(203);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SearchBeneficiryPageModule = /** @class */ (function () {
    function SearchBeneficiryPageModule() {
    }
    SearchBeneficiryPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__search_beneficiry__["a" /* SearchBeneficiryPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__search_beneficiry__["a" /* SearchBeneficiryPage */]),
            ],
        })
    ], SearchBeneficiryPageModule);
    return SearchBeneficiryPageModule;
}());

//# sourceMappingURL=search-beneficiry.module.js.map

/***/ }),

/***/ 358:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/article-index/article-index.module": [
		359
	],
	"../pages/article-show/article-show.module": [
		484
	],
	"../pages/beneficiary-profile/beneficiary-profile.module": [
		485
	],
	"../pages/comments/comments.module": [
		486
	],
	"../pages/directory/directory.module": [
		487
	],
	"../pages/grievance-filter/grievance-filter.module": [
		491
	],
	"../pages/grievance-form/grievance-form.module": [
		492
	],
	"../pages/grievance-show/grievance-show.module": [
		493
	],
	"../pages/grievance/grievance.module": [
		494
	],
	"../pages/home/home.module": [
		495
	],
	"../pages/idea-filter/idea-filter.module": [
		496
	],
	"../pages/idea-form/idea-form.module": [
		498
	],
	"../pages/idea-show/idea-show.module": [
		523
	],
	"../pages/idea/idea.module": [
		499
	],
	"../pages/intro/intro.module": [
		502
	],
	"../pages/login/login.module": [
		501
	],
	"../pages/logout/logout.module": [
		503
	],
	"../pages/maintenance-request-form/maintenance-request-form.module": [
		504
	],
	"../pages/maintenance-request/maintenance-request.module": [
		505
	],
	"../pages/offline/offline.module": [
		507
	],
	"../pages/profile/profile.module": [
		512
	],
	"../pages/question-checkbox/question-checkbox.module": [
		509
	],
	"../pages/question-dropdown/question-dropdown.module": [
		510
	],
	"../pages/question-image/question-image.module": [
		511
	],
	"../pages/question-radiobutton/question-radiobutton.module": [
		514
	],
	"../pages/question-textbox/question-textbox.module": [
		515
	],
	"../pages/search-beneficiry/search-beneficiry.module": [
		320
	],
	"../pages/searchbeneficiry/searchbeneficiry.module": [
		516
	],
	"../pages/suervy/suervy.module": [
		518
	],
	"../pages/survey-list/survey-list.module": [
		517
	],
	"../pages/sync/sync.module": [
		519
	],
	"../pages/tutorial/tutorial.module": [
		520
	],
	"../pages/userblock/userblock.module": [
		522
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 358;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 359:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArticleIndexPageModule", function() { return ArticleIndexPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pipes_pipes_module__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__article_index__ = __webpack_require__(480);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ArticleIndexPageModule = /** @class */ (function () {
    function ArticleIndexPageModule() {
    }
    ArticleIndexPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__article_index__["a" /* ArticleIndexPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__article_index__["a" /* ArticleIndexPage */]),
                __WEBPACK_IMPORTED_MODULE_0__pipes_pipes_module__["a" /* PipesModule */],
            ],
        })
    ], ArticleIndexPageModule);
    return ArticleIndexPageModule;
}());

//# sourceMappingURL=article-index.module.js.map

/***/ }),

/***/ 480:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArticleIndexPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_app_global_app_global__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular_components_loading_loading_controller__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_data_getter_service_data_getter_service__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__article_show_article_show__ = __webpack_require__(103);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the ArticleIndexPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ArticleIndexPage = /** @class */ (function () {
    function ArticleIndexPage(navCtrl, navParams, dataGetterService, loadingCtrl, toastCtrl, appGlobal) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataGetterService = dataGetterService;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.appGlobal = appGlobal;
        this.queryText = '';
        this.descending = false;
        this.order = -1;
        this.field = 'updated_at';
        this.articles = [];
    }
    ArticleIndexPage.prototype.ionViewDidEnter = function () {
        this.loadArticles(null);
    };
    ArticleIndexPage.prototype.sort = function () {
        this.descending = !this.descending;
        this.order = this.descending ? 1 : -1;
    };
    ArticleIndexPage.prototype.loadArticles = function (ref) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        if (ref === null) {
            loading.present();
        }
        this.dataGetterService.getArticles()
            .subscribe(function (data) {
            console.log("Articles Loaded", data);
            if (data.success) {
                _this.articles = data.articles;
            }
            else {
                _this.articles = [];
            }
            loading.dismiss();
            if (ref != null) {
                ref.complete();
            }
        }, function (err) {
            console.log(err);
            _this.articles = [];
            var toast = _this.toastCtrl.create({
                message: _this.appGlobal.ServerError,
                duration: 3000
            });
            toast.present();
            loading.dismiss();
            if (ref != null) {
                ref.complete();
            }
        });
    };
    ArticleIndexPage.prototype.refreshPage = function (event) {
        this.loadArticles(event);
    };
    ArticleIndexPage.prototype.goToArticle = function (id) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__article_show_article_show__["a" /* ArticleShowPage */], { id: id });
    };
    ArticleIndexPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ArticleIndexPage');
    };
    ArticleIndexPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/linkwok/Documents/ivdp/src/pages/article-index/article-index.html"*/'<!--\n  Generated template for the ArticleIndexPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Articles</ion-title>\n  </ion-navbar>\n  <ion-toolbar no-border-top>\n    <ion-searchbar color="primary" [(ngModel)]="queryText" placeholder="Search">\n    </ion-searchbar>\n  </ion-toolbar>\n</ion-header>\n\n\n<ion-content >\n  <ion-refresher (ionRefresh)="refreshPage($event)">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n  <ion-list *ngIf="articles.length > 0"> \n  <ion-card *ngFor="let article of articles | search : {term:queryText,fields:[\'title\',\'snippet\']} | sort: {property: field, order: order}"\n  (click)="goToArticle(article.id)" [ngStyle]="{\'background-color\': article.background_color}">\n      <!--<ion-card>-->\n      <ion-card-header>\n      <span class="bold-text" [ngStyle]="{\'color\': article.font_color}">\n          {{article.title}}\n        </span>\n      </ion-card-header>\n      <ion-card-content class="wrap-body" *ngIf="article.show_content" [ngStyle]="{\'color\': article.font_color}">\n        <div [innerHtml]="article.snippet | safeHtml">\n          <!--{{idea.content}}-->\n        </div>\n\n      </ion-card-content>\n      <ion-item [ngStyle]="{\'color\': article.font_color, \'background-color\': article.background_color}">\n        <h5 *ngIf="article.creator" [ngStyle]="{\'color\': article.font_color}">Created By: {{article.creator}}</h5>\n        <ion-badge item-end *ngIf="article.published_on">{{article.published_on}}</ion-badge>\n      </ion-item>\n      <!--</ion-card>-->\n\n    </ion-card>\n  </ion-list>\n\n  <ion-item *ngIf="articles.length === 0" text-center>\n    No Articles to be Shown\n  </ion-item>\n\n\n</ion-content>\n\n\n'/*ion-inline-end:"/home/linkwok/Documents/ivdp/src/pages/article-index/article-index.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["o" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["p" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__providers_data_getter_service_data_getter_service__["a" /* DataGetterServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular_components_loading_loading_controller__["a" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["r" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_0__providers_app_global_app_global__["a" /* AppGlobalProvider */]])
    ], ArticleIndexPage);
    return ArticleIndexPage;
}());

//# sourceMappingURL=article-index.js.map

/***/ }),

/***/ 482:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular_components_toast_toast_controller__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_vibration__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_global_app_global__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular_components_loading_loading_controller__ = __webpack_require__(51);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/*
  Generated class for the LoginServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var LoginServiceProvider = /** @class */ (function () {
    function LoginServiceProvider(http, loadingCtrl, appGlobal, vibrationCtrl, toastCtrl) {
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.appGlobal = appGlobal;
        this.vibrationCtrl = vibrationCtrl;
        this.toastCtrl = toastCtrl;
        console.log('Hello LoginServiceProvider Provider');
    }
    LoginServiceProvider.prototype.doLogin = function (username, password) {
        var _this = this;
        console.log(this.http.get("http://google.com"));
        return new Promise(function (resolve) {
            var loading = _this.loadingCtrl.create({
                content: 'Please wait...'
            });
            loading.present();
            var httpOptions = {
                headers: new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpHeaders */]({
                    'Content-Type': 'application/json'
                    // 'Version': this.appGlobal.applicationVersion
                })
            };
            var body = {
                email: username.trim(),
                password: password,
            };
            console.log(_this.appGlobal.loginURL);
            console.log(body);
            console.log(_this.appGlobal.applicationVersion);
            _this.http.post(_this.appGlobal.loginURL, body, httpOptions).subscribe(function (data) {
                loading.dismiss();
                console.log("Login Resolved");
                _this.vibrationCtrl.vibrate(1000);
                resolve(data);
            }, function (err) {
                console.log("error!");
                console.log(Object.keys(err));
                console.log("Login", err);
                loading.dismiss();
                var toast = _this.toastCtrl.create({
                    message: _this.appGlobal.ServerError,
                    duration: 3000
                });
                toast.present();
            });
        });
    };
    LoginServiceProvider.prototype.doForgotPassword = function (email) {
        var _this = this;
        return new Promise(function (resolve) {
            var loading = _this.loadingCtrl.create({
                content: 'Please wait...'
            });
            loading.present();
            var httpOptions = {
                headers: new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpHeaders */]({
                    'Content-Type': 'application/json',
                    'Version': _this.appGlobal.applicationVersion
                })
            };
            var body = {
                email: email
            };
            _this.http.post(_this.appGlobal.forgotPasswordURL, body, httpOptions).subscribe(function (data) {
                loading.dismiss();
                console.log("ForgotPassword Resolved");
                _this.vibrationCtrl.vibrate(1000);
                resolve(data);
            }, function (err) {
                console.log("ForgotPassword", err);
                var toast = _this.toastCtrl.create({
                    message: _this.appGlobal.ServerError,
                    duration: 3000
                });
                toast.present();
                loading.dismiss();
            });
        });
    };
    LoginServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular_components_loading_loading_controller__["a" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2__app_global_app_global__["a" /* AppGlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_1__ionic_native_vibration__["a" /* Vibration */],
            __WEBPACK_IMPORTED_MODULE_0_ionic_angular_components_toast_toast_controller__["a" /* ToastController */]])
    ], LoginServiceProvider);
    return LoginServiceProvider;
}());

//# sourceMappingURL=login-service.js.map

/***/ }),

/***/ 484:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArticleShowPageModule", function() { return ArticleShowPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pipes_pipes_module__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_components_module__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__article_show__ = __webpack_require__(103);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var ArticleShowPageModule = /** @class */ (function () {
    function ArticleShowPageModule() {
    }
    ArticleShowPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__article_show__["a" /* ArticleShowPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_4__article_show__["a" /* ArticleShowPage */]),
                __WEBPACK_IMPORTED_MODULE_1__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_0__pipes_pipes_module__["a" /* PipesModule */],
            ],
        })
    ], ArticleShowPageModule);
    return ArticleShowPageModule;
}());

//# sourceMappingURL=article-show.module.js.map

/***/ }),

/***/ 485:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BeneficiaryProfilePageModule", function() { return BeneficiaryProfilePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__beneficiary_profile__ = __webpack_require__(165);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var BeneficiaryProfilePageModule = /** @class */ (function () {
    function BeneficiaryProfilePageModule() {
    }
    BeneficiaryProfilePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__beneficiary_profile__["a" /* BeneficiaryProfilePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__beneficiary_profile__["a" /* BeneficiaryProfilePage */]),
            ],
        })
    ], BeneficiaryProfilePageModule);
    return BeneficiaryProfilePageModule;
}());

//# sourceMappingURL=beneficiary-profile.module.js.map

/***/ }),

/***/ 486:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommentsPageModule", function() { return CommentsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__comments__ = __webpack_require__(104);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CommentsPageModule = /** @class */ (function () {
    function CommentsPageModule() {
    }
    CommentsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__comments__["a" /* CommentsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__comments__["a" /* CommentsPage */]),
            ],
        })
    ], CommentsPageModule);
    return CommentsPageModule;
}());

//# sourceMappingURL=comments.module.js.map

/***/ }),

/***/ 487:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DirectoryPageModule", function() { return DirectoryPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__directory__ = __webpack_require__(488);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var DirectoryPageModule = /** @class */ (function () {
    function DirectoryPageModule() {
    }
    DirectoryPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__directory__["a" /* DirectoryPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__directory__["a" /* DirectoryPage */]),
            ],
        })
    ], DirectoryPageModule);
    return DirectoryPageModule;
}());

//# sourceMappingURL=directory.module.js.map

/***/ }),

/***/ 488:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DirectoryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_data_getter_service_data_getter_service__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__profile_profile__ = __webpack_require__(105);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the DirectoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var DirectoryPage = /** @class */ (function () {
    function DirectoryPage(navCtrl, navParams, dataGetter) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataGetter = dataGetter;
        this.searchQuery = '';
        this.searchedUsers = [];
        this.isSearching = false;
    }
    DirectoryPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DirectoryPage');
    };
    DirectoryPage.prototype.onInput = function (event) {
        var _this = this;
        console.log("onInput event", event);
        console.log("onInput searchQuery", this.searchQuery);
        if (this.searchQuery !== "") {
            this.isSearching = true;
            this.dataGetter.getSuggestions({
                item_id: '',
                item_type: '',
                search_term: this.searchQuery
            }).subscribe(function (data) {
                console.log("User Searched Data", data);
                if (data.has_users) {
                    _this.searchedUsers = data.users;
                }
                else {
                    _this.searchedUsers = [];
                }
                _this.isSearching = false;
            });
        }
        else {
            this.searchedUsers = [];
            this.isSearching = false;
        }
    };
    DirectoryPage.prototype.onClear = function (event) {
        console.log("onClear event", event);
        this.isSearching = false;
    };
    DirectoryPage.prototype.openUserProfile = function (uid) {
        var params = {};
        params['user_id'] = uid;
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__profile_profile__["a" /* ProfilePage */], params).catch(function (err) {
            console.log("Didn't set nav root: " + err);
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["n" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["n" /* Nav */])
    ], DirectoryPage.prototype, "nav", void 0);
    DirectoryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-directory',template:/*ion-inline-start:"/home/linkwok/Documents/ivdp/src/pages/directory/directory.html"*/'<!--\n  Generated template for the DirectoryPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Directory</ion-title>\n  </ion-navbar>\n  <ion-toolbar>\n    <ion-searchbar\n      [(ngModel)]="searchQuery"\n      [debounce]="1000"\n      [placeholder]="\'Search Employee\'"\n      [autocorrect]="\'on\'"\n      [animated]="true"\n      [autocomplete]="\'on\'"\n      (ionInput)="onInput($event)"\n      (ionClear)="onClear($event)">\n    </ion-searchbar>\n  </ion-toolbar>\n\n</ion-header>\n\n\n<ion-content>\n  <div class="search-spinner" *ngIf="isSearching">\n    <div class="search-spinner-background"></div>\n    <ion-spinner></ion-spinner>\n  </div>\n  <ion-list *ngIf="searchedUsers.length > 0">\n    <ion-item no-lines text-wrap class="bottom-border" *ngFor="let user of searchedUsers">\n      <ion-grid>\n        <ion-row class="user-item" (click)="openUserProfile(user.id)">\n          <ion-col col-3>\n            <ion-avatar item-start>\n              <img src="{{user.profile}}" style="width: 5em;height: 5em;border: 2px solid gray;max-width: fit-content;"/>\n            </ion-avatar>\n          </ion-col>\n          <ion-col col-9 text-left>\n            <div>{{user.employee_id}}</div>\n            <div>{{user.name}}</div>\n            <h2>{{user.email}}</h2>\n            <h2>{{user.designation}}</h2>\n            <h2>{{user.location}}</h2>\n            <h2>{{user.mobile? \'Mob: \'+user.mobile : \'\'}}</h2>\n            <h2>{{user.extension? \'Ext: \'+user.extension : \'\'}}</h2>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-item>\n  </ion-list>\n\n  <ion-list *ngIf="searchedUsers.length === 0" text-center>\n    <ion-item *ngIf="searchQuery === \'\'" text-wrap>\n      <h3>\n        To search employee details, use above search bar.\n      </h3>\n    </ion-item>\n    <ion-item *ngIf="searchQuery !== \'\' && !isSearching" text-wrap>\n      <h3>\n        User not found, Please search with another term.\n      </h3>\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/home/linkwok/Documents/ivdp/src/pages/directory/directory.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["o" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["p" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_0__providers_data_getter_service_data_getter_service__["a" /* DataGetterServiceProvider */]])
    ], DirectoryPage);
    return DirectoryPage;
}());

//# sourceMappingURL=directory.js.map

/***/ }),

/***/ 491:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GrievanceFilterPageModule", function() { return GrievanceFilterPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__grievance_filter__ = __webpack_require__(879);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var GrievanceFilterPageModule = /** @class */ (function () {
    function GrievanceFilterPageModule() {
    }
    GrievanceFilterPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__grievance_filter__["a" /* GrievanceFilterPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__grievance_filter__["a" /* GrievanceFilterPage */]),
            ],
        })
    ], GrievanceFilterPageModule);
    return GrievanceFilterPageModule;
}());

//# sourceMappingURL=grievance-filter.module.js.map

/***/ }),

/***/ 492:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GrievanceFormPageModule", function() { return GrievanceFormPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__grievance_form__ = __webpack_require__(168);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var GrievanceFormPageModule = /** @class */ (function () {
    function GrievanceFormPageModule() {
    }
    GrievanceFormPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__grievance_form__["a" /* GrievanceFormPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__grievance_form__["a" /* GrievanceFormPage */]),
            ],
        })
    ], GrievanceFormPageModule);
    return GrievanceFormPageModule;
}());

//# sourceMappingURL=grievance-form.module.js.map

/***/ }),

/***/ 493:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GrievanceShowPageModule", function() { return GrievanceShowPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__grievance_show__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_tags_input__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ngx_chips__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser_animations__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_forms__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var GrievanceShowPageModule = /** @class */ (function () {
    function GrievanceShowPageModule() {
    }
    GrievanceShowPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__grievance_show__["a" /* GrievanceShowPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__grievance_show__["a" /* GrievanceShowPage */]),
                __WEBPACK_IMPORTED_MODULE_3__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_4_ionic_tags_input__["a" /* IonTagsInputModule */],
                __WEBPACK_IMPORTED_MODULE_5_ngx_chips__["a" /* TagInputModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_7__angular_forms__["d" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_7__angular_forms__["g" /* ReactiveFormsModule */]
            ],
        })
    ], GrievanceShowPageModule);
    return GrievanceShowPageModule;
}());

//# sourceMappingURL=grievance-show.module.js.map

/***/ }),

/***/ 494:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GrievancePageModule", function() { return GrievancePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pipes_pipes_module__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__grievance__ = __webpack_require__(166);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var GrievancePageModule = /** @class */ (function () {
    function GrievancePageModule() {
    }
    GrievancePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__grievance__["a" /* GrievancePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__grievance__["a" /* GrievancePage */]),
                __WEBPACK_IMPORTED_MODULE_0__pipes_pipes_module__["a" /* PipesModule */],
            ],
        })
    ], GrievancePageModule);
    return GrievancePageModule;
}());

//# sourceMappingURL=grievance.module.js.map

/***/ }),

/***/ 495:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePageModule", function() { return HomePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pipes_pipes_module__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home__ = __webpack_require__(80);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var HomePageModule = /** @class */ (function () {
    function HomePageModule() {
    }
    HomePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__home__["a" /* HomePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__home__["a" /* HomePage */]),
                __WEBPACK_IMPORTED_MODULE_0__pipes_pipes_module__["a" /* PipesModule */],
            ],
        })
    ], HomePageModule);
    return HomePageModule;
}());

//# sourceMappingURL=home.module.js.map

/***/ }),

/***/ 496:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IdeaFilterPageModule", function() { return IdeaFilterPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__idea_filter__ = __webpack_require__(497);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var IdeaFilterPageModule = /** @class */ (function () {
    function IdeaFilterPageModule() {
    }
    IdeaFilterPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__idea_filter__["a" /* IdeaFilterPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__idea_filter__["a" /* IdeaFilterPage */]),
            ],
        })
    ], IdeaFilterPageModule);
    return IdeaFilterPageModule;
}());

//# sourceMappingURL=idea-filter.module.js.map

/***/ }),

/***/ 497:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IdeaFilterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular_components_alert_alert_controller__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var IdeaFilterPage = /** @class */ (function () {
    function IdeaFilterPage(navCtrl, navParams, viewCtrl, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.alertCtrl = alertCtrl;
        this.ideaWhose = [];
        console.log(this.navParams.data);
        var excludedWhoseIdeas = this.navParams.data.excludeWhoseIdeas;
        var ideaWhoseList = this.navParams.data.ideaWhoseList;
        ideaWhoseList.forEach(function (whoseIdea) {
            _this.ideaWhose.push({
                name: whoseIdea,
                isChecked: (excludedWhoseIdeas.indexOf(whoseIdea) !== -1)
            });
        });
    }
    IdeaFilterPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad IdeaFilterPage');
    };
    IdeaFilterPage.prototype.resetFilters = function () {
        // reset all of the toggles to be checked
        this.ideaWhose.forEach(function (type) {
            type.isChecked = true;
        });
    };
    IdeaFilterPage.prototype.applyFilters = function () {
        // Pass back a new array of track names to exclude
        var excludeIdeas = this.ideaWhose.filter(function (c) { return c.isChecked; }).map(function (c) { return c.name; });
        console.log(excludeIdeas);
        this.dismiss(excludeIdeas);
    };
    IdeaFilterPage.prototype.dismiss = function (ideaWhose) {
        // using the injected ViewController this page
        // can "dismiss" itself and pass back data
        this.viewCtrl.dismiss(ideaWhose);
    };
    IdeaFilterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-idea-filter',template:/*ion-inline-start:"/home/linkwok/Documents/ivdp/src/pages/idea-filter/idea-filter.html"*/'<ion-header>\n  <ion-toolbar>\n    <ion-buttons start>\n      <button ion-button (click)="dismiss()">Cancel</button>\n    </ion-buttons>\n\n    <ion-title>\n      Filter Ideas\n    </ion-title>\n\n    <ion-buttons end>\n      <button ion-button (click)="applyFilters()" strong>Done</button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content class="outer-content">\n\n  <ion-list>\n    <ion-list-header>Whose Ideas</ion-list-header>\n\n    <ion-item *ngFor="let whoseIdea of ideaWhose" [attr.whoseIdea]="whoseIdea.name | lowercase">\n      <span item-start class="dot"></span>\n      <ion-label text-capitalize>{{whoseIdea.name}}</ion-label>\n      <ion-toggle [(ngModel)]="whoseIdea.isChecked" color="secondary"></ion-toggle>\n    </ion-item>\n\n  </ion-list>\n\n  <ion-list>\n    <button ion-item (click)="resetFilters()" detail-none class="reset-filters">\n      Reset All Filters\n    </button>\n  </ion-list>\n\n</ion-content>'/*ion-inline-end:"/home/linkwok/Documents/ivdp/src/pages/idea-filter/idea-filter.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["o" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["p" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["s" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_0_ionic_angular_components_alert_alert_controller__["a" /* AlertController */]])
    ], IdeaFilterPage);
    return IdeaFilterPage;
}());

//# sourceMappingURL=idea-filter.js.map

/***/ }),

/***/ 498:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IdeaFormPageModule", function() { return IdeaFormPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__idea_form__ = __webpack_require__(171);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var IdeaFormPageModule = /** @class */ (function () {
    function IdeaFormPageModule() {
    }
    IdeaFormPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__idea_form__["a" /* IdeaFormPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__idea_form__["a" /* IdeaFormPage */]),
            ],
        })
    ], IdeaFormPageModule);
    return IdeaFormPageModule;
}());

//# sourceMappingURL=idea-form.module.js.map

/***/ }),

/***/ 499:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IdeaPageModule", function() { return IdeaPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pipes_pipes_module__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__idea__ = __webpack_require__(500);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var IdeaPageModule = /** @class */ (function () {
    function IdeaPageModule() {
    }
    IdeaPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__idea__["a" /* IdeaPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__idea__["a" /* IdeaPage */]),
                __WEBPACK_IMPORTED_MODULE_0__pipes_pipes_module__["a" /* PipesModule */],
            ],
        })
    ], IdeaPageModule);
    return IdeaPageModule;
}());

//# sourceMappingURL=idea.module.js.map

/***/ }),

/***/ 500:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IdeaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_app_global_app_global__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__idea_filter_idea_filter__ = __webpack_require__(497);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_data_getter_service_data_getter_service__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__idea_show_idea_show__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__idea_form_idea_form__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_lodash__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









/**
 * Generated class for the IdeaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var IdeaPage = /** @class */ (function () {
    function IdeaPage(navCtrl, navParams, dataGetterService, loadingCtrl, events, modalCtrl, toastCtrl, appGlobal) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataGetterService = dataGetterService;
        this.loadingCtrl = loadingCtrl;
        this.events = events;
        this.modalCtrl = modalCtrl;
        this.toastCtrl = toastCtrl;
        this.appGlobal = appGlobal;
        this.ideas_m = [];
        this.ideaWhoseList = [];
        this.excludeWhoseIdeas = ["mine"];
        this.queryText = '';
        this.descending = false;
        this.order = -1;
        this.field = 'updated_at';
        console.log(this.ideas);
        this.events.subscribe('reload:idea', function () {
            _this.refreshSRList(null);
        });
    }
    IdeaPage.prototype.sort = function () {
        this.descending = !this.descending;
        this.order = this.descending ? 1 : -1;
    };
    IdeaPage.prototype.loadIdeas = function (ref) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        if (ref === null) {
            loading.present();
        }
        this.dataGetterService.getIdeas()
            .subscribe(function (data) {
            console.log("Ideas Loaded", data);
            if (data.success) {
                _this.ideas_m = data.ideas;
                _this.ideas = data.ideas;
                _this.ideaWhoseList = __WEBPACK_IMPORTED_MODULE_7_lodash__["uniq"](_this.ideas.map(function (idea) { return idea.whose; })).sort();
                _this.updateIdeas();
            }
            else {
                _this.ideas_m = [];
                _this.ideas = [];
                _this.ideaWhoseList = [];
                _this.updateIdeas();
            }
            loading.dismiss();
            if (ref != null) {
                ref.complete();
            }
        }, function (err) {
            console.log(err);
            _this.ideas_m = [];
            _this.ideas = [];
            _this.ideaWhoseList = [];
            _this.updateIdeas();
            var toast = _this.toastCtrl.create({
                message: _this.appGlobal.ServerError,
                duration: 3000
            });
            toast.present();
            loading.dismiss();
            if (ref != null) {
                ref.complete();
            }
        });
    };
    IdeaPage.prototype.ionViewDidEnter = function () {
        this.loadIdeas(null);
    };
    IdeaPage.prototype.refreshSRList = function (ev) {
        this.loadIdeas(ev);
    };
    IdeaPage.prototype.goToSRForm = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__idea_form_idea_form__["a" /* IdeaFormPage */]);
    };
    IdeaPage.prototype.goToIdea = function (id) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__idea_show_idea_show__["a" /* IdeaShowPage */], {
            id: id,
        });
    };
    IdeaPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad IdeaPage');
    };
    IdeaPage.prototype.presentFilter = function () {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_1__idea_filter_idea_filter__["a" /* IdeaFilterPage */], { excludeWhoseIdeas: this.excludeWhoseIdeas, ideaWhoseList: this.ideaWhoseList });
        modal.present();
        modal.onWillDismiss(function (ideaWhose) {
            if (ideaWhose) {
                _this.excludeWhoseIdeas = ideaWhose;
            }
            _this.updateIdeas();
        });
    };
    IdeaPage.prototype.updateIdeas = function () {
        var _this = this;
        this.ideas_m.shownIdeas = 0;
        this.ideas_m.forEach(function (idea) {
            _this.filterIdeas(idea, _this.excludeWhoseIdeas);
            if (!idea.hide) {
                _this.ideas_m.shownIdeas++;
            }
        });
        console.log("Final Showing", this.ideas_m.shownIdeas);
    };
    IdeaPage.prototype.filterIdeas = function (idea, excludeWhoseIdeas) {
        var matchesWhoseIdea = false;
        if (excludeWhoseIdeas.indexOf(idea.whose) !== -1) {
            matchesWhoseIdea = true;
        }
        idea.hide = !(matchesWhoseIdea);
    };
    IdeaPage.prototype.getLastActivity = function (updated_at) {
        return __WEBPACK_IMPORTED_MODULE_8_moment__(updated_at).format("MMMM DD,YYYY hh:mm A");
    };
    IdeaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'page-idea',template:/*ion-inline-start:"/home/linkwok/Documents/ivdp/src/pages/idea/idea.html"*/'<!--\n  Generated template for the IdeaPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Ideas</ion-title>\n  </ion-navbar>\n  <ion-toolbar no-border-top>\n    <ion-searchbar color="primary" [(ngModel)]="queryText" placeholder="Search">\n    </ion-searchbar>\n    <ion-buttons end>\n      <button ion-button icon-only [disabled]="ideas_m.length === 0" (click)="presentFilter()">\n        <ion-icon ios="ios-options-outline" md="md-options"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n\n<ion-content padding>\n  <ion-refresher (ionRefresh)="refreshSRList($event)">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n\n\n  <ion-list *ngIf="ideas_m.shownIdeas > 0">\n    <ion-card *ngFor="let idea of ideas_m | search : {term:queryText,fields:[\'uid\',\'content\',\'state\']} | sort: {property: field, order: order}" (click)="goToIdea(idea.uid)" [hidden]="idea.hide">\n      <div class="{{\'idea_state_sidebar_\'+idea.state}}">\n      <!--<ion-card>-->\n      <ion-card-header>\n        {{idea.uid}}\n        <span class="pull-right sr-age">{{idea.age}}</span>\n\n      </ion-card-header>\n      <ion-card-content>\n        <div [innerHtml]="\'<div>\'+idea.content.substring(0,150)+\'....</div>\'" class="inline">\n      </div>\n      </ion-card-content>\n      <ion-row *ngIf="idea.updated_at">\n        <ion-col>\n          <ion-note class="pull-right" style="color:black;">\n            Last Activity:\n            <b>{{getLastActivity(idea.updated_at)}}</b>\n          </ion-note>\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col>\n          <ion-badge class="pull-right">{{idea.state}}</ion-badge>\n        </ion-col>\n      </ion-row>\n      </div>\n    </ion-card>\n  </ion-list>\n  <ion-fab right bottom>\n    <button ion-fab (click)="goToSRForm()"><ion-icon name="add"></ion-icon></button>\n  </ion-fab>\n\n  <ion-item *ngIf="ideas_m.shownIdeas === 0" text-center>\n    No Ideas to be Shown\n  </ion-item>\n\n</ion-content>\n'/*ion-inline-end:"/home/linkwok/Documents/ivdp/src/pages/idea/idea.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["o" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["p" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__providers_data_getter_service_data_getter_service__["a" /* DataGetterServiceProvider */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["k" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* Events */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["m" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["r" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_0__providers_app_global_app_global__["a" /* AppGlobalProvider */]])
    ], IdeaPage);
    return IdeaPage;
}());

//# sourceMappingURL=idea.js.map

/***/ }),

/***/ 501:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPageModule", function() { return LoginPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login__ = __webpack_require__(172);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var LoginPageModule = /** @class */ (function () {
    function LoginPageModule() {
    }
    LoginPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__login__["a" /* LoginPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__login__["a" /* LoginPage */]),
            ],
        })
    ], LoginPageModule);
    return LoginPageModule;
}());

//# sourceMappingURL=login.module.js.map

/***/ }),

/***/ 502:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IntroPageModule", function() { return IntroPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__intro__ = __webpack_require__(170);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var IntroPageModule = /** @class */ (function () {
    function IntroPageModule() {
    }
    IntroPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__intro__["a" /* IntroPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__intro__["a" /* IntroPage */]),
            ],
        })
    ], IntroPageModule);
    return IntroPageModule;
}());

//# sourceMappingURL=intro.module.js.map

/***/ }),

/***/ 503:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogoutPageModule", function() { return LogoutPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__logout__ = __webpack_require__(173);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var LogoutPageModule = /** @class */ (function () {
    function LogoutPageModule() {
    }
    LogoutPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__logout__["a" /* LogoutPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__logout__["a" /* LogoutPage */]),
            ],
        })
    ], LogoutPageModule);
    return LogoutPageModule;
}());

//# sourceMappingURL=logout.module.js.map

/***/ }),

/***/ 504:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaintenanceRequestFormPageModule", function() { return MaintenanceRequestFormPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__maintenance_request_form__ = __webpack_require__(174);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var MaintenanceRequestFormPageModule = /** @class */ (function () {
    function MaintenanceRequestFormPageModule() {
    }
    MaintenanceRequestFormPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__maintenance_request_form__["a" /* MaintenanceRequestFormPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__maintenance_request_form__["a" /* MaintenanceRequestFormPage */]),
            ],
        })
    ], MaintenanceRequestFormPageModule);
    return MaintenanceRequestFormPageModule;
}());

//# sourceMappingURL=maintenance-request-form.module.js.map

/***/ }),

/***/ 505:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaintenanceRequestPageModule", function() { return MaintenanceRequestPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__maintenance_request__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pipes_pipes_module__ = __webpack_require__(52);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var MaintenanceRequestPageModule = /** @class */ (function () {
    function MaintenanceRequestPageModule() {
    }
    MaintenanceRequestPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__maintenance_request__["a" /* MaintenanceRequestPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__maintenance_request__["a" /* MaintenanceRequestPage */]),
                __WEBPACK_IMPORTED_MODULE_3__pipes_pipes_module__["a" /* PipesModule */],
            ],
        })
    ], MaintenanceRequestPageModule);
    return MaintenanceRequestPageModule;
}());

//# sourceMappingURL=maintenance-request.module.js.map

/***/ }),

/***/ 507:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OfflinePageModule", function() { return OfflinePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__offline__ = __webpack_require__(508);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var OfflinePageModule = /** @class */ (function () {
    function OfflinePageModule() {
    }
    OfflinePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__offline__["a" /* OfflinePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__offline__["a" /* OfflinePage */]),
            ],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_2__offline__["a" /* OfflinePage */],
            ],
        })
    ], OfflinePageModule);
    return OfflinePageModule;
}());

//# sourceMappingURL=offline.module.js.map

/***/ }),

/***/ 508:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OfflinePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_native_network__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_app_global_app_global__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the OfflinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var OfflinePage = /** @class */ (function () {
    function OfflinePage(navCtrl, navParams, network, appGlobal, events, menuCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.network = network;
        this.appGlobal = appGlobal;
        this.events = events;
        this.menuCtrl = menuCtrl;
        console.log("TYPE: ", this.network.type);
    }
    OfflinePage.prototype.ionViewDidEnter = function () {
        //this.appGlobal.isOnline = false;
        this.appGlobal.isOnline = true;
    };
    OfflinePage.prototype.ionViewDidLoad = function () {
        // console.log('ionViewDidLoad OfflinePage');
        // if(this.menuCtrl.isOpen()){
        //   this.menuCtrl.close();
        // }
    };
    OfflinePage.prototype.ionViewCanLeave = function () {
        return this.appGlobal.isOnline;
        // here we can either return true or false
        // depending on if we want to leave this view
    };
    OfflinePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-offline',template:/*ion-inline-start:"/home/linkwok/Documents/ivdp/src/pages/offline/offline.html"*/'<!--\n  Generated template for the OfflinePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar hideBackButton="true">\n    <ion-title>\n      <img src="assets/img/appicon.png" height="30" alt="DF IVDP">\n    </ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content center text-center padding>\n  <ion-refresher (ionRefresh)="refresh($event)">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n  <!-- <div class="logo">\n    <img src="assets/img/appicon.png" alt="Empower">\n  </div> -->\n  <h4>You are offline !!</h4>\n\n  <h5>\n <!-- It looks like you are offline! Please check your network connection and try again. -->\n    <p>It seems currently you are offline and we are unable to reach our servers.</p>\n    <p>This being an online application, cannot be used in this state. Please wait while we automatically detect your internet\n      status and take you back to action!</p>\n  </h5>\n</ion-content>\n'/*ion-inline-end:"/home/linkwok/Documents/ivdp/src/pages/offline/offline.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["p" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_0__ionic_native_network__["a" /* Network */],
            __WEBPACK_IMPORTED_MODULE_3__providers_app_global_app_global__["a" /* AppGlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* Events */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* MenuController */]])
    ], OfflinePage);
    return OfflinePage;
}());

//# sourceMappingURL=offline.js.map

/***/ }),

/***/ 509:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuestionCheckboxPageModule", function() { return QuestionCheckboxPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__question_checkbox__ = __webpack_require__(175);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var QuestionCheckboxPageModule = /** @class */ (function () {
    function QuestionCheckboxPageModule() {
    }
    QuestionCheckboxPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__question_checkbox__["a" /* QuestionCheckboxPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__question_checkbox__["a" /* QuestionCheckboxPage */]),
            ],
        })
    ], QuestionCheckboxPageModule);
    return QuestionCheckboxPageModule;
}());

//# sourceMappingURL=question-checkbox.module.js.map

/***/ }),

/***/ 510:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuestionDropdownPageModule", function() { return QuestionDropdownPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__question_dropdown__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pipes_pipes_module__ = __webpack_require__(52);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var QuestionDropdownPageModule = /** @class */ (function () {
    function QuestionDropdownPageModule() {
    }
    QuestionDropdownPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__question_dropdown__["a" /* QuestionDropdownPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__question_dropdown__["a" /* QuestionDropdownPage */]), __WEBPACK_IMPORTED_MODULE_3__pipes_pipes_module__["a" /* PipesModule */],
            ],
        })
    ], QuestionDropdownPageModule);
    return QuestionDropdownPageModule;
}());

//# sourceMappingURL=question-dropdown.module.js.map

/***/ }),

/***/ 511:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuestionImagePageModule", function() { return QuestionImagePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__question_image__ = __webpack_require__(179);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var QuestionImagePageModule = /** @class */ (function () {
    function QuestionImagePageModule() {
    }
    QuestionImagePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__question_image__["a" /* QuestionImagePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__question_image__["a" /* QuestionImagePage */]),
            ],
        })
    ], QuestionImagePageModule);
    return QuestionImagePageModule;
}());

//# sourceMappingURL=question-image.module.js.map

/***/ }),

/***/ 512:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfilePageModule", function() { return ProfilePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__directives_directives_module__ = __webpack_require__(513);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__profile__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_tags_input__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ngx_chips__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser_animations__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_forms__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var ProfilePageModule = /** @class */ (function () {
    function ProfilePageModule() {
    }
    ProfilePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__profile__["a" /* ProfilePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__profile__["a" /* ProfilePage */]),
                __WEBPACK_IMPORTED_MODULE_0__directives_directives_module__["a" /* DirectivesModule */],
                __WEBPACK_IMPORTED_MODULE_4_ionic_tags_input__["a" /* IonTagsInputModule */],
                __WEBPACK_IMPORTED_MODULE_5_ngx_chips__["a" /* TagInputModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_7__angular_forms__["d" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_7__angular_forms__["g" /* ReactiveFormsModule */]
            ],
        })
    ], ProfilePageModule);
    return ProfilePageModule;
}());

//# sourceMappingURL=profile.module.js.map

/***/ }),

/***/ 513:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DirectivesModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__autoresize_autoresize__ = __webpack_require__(882);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var DirectivesModule = /** @class */ (function () {
    function DirectivesModule() {
    }
    DirectivesModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_1__autoresize_autoresize__["a" /* AutoresizeDirective */]],
            imports: [],
            exports: [__WEBPACK_IMPORTED_MODULE_1__autoresize_autoresize__["a" /* AutoresizeDirective */]]
        })
    ], DirectivesModule);
    return DirectivesModule;
}());

//# sourceMappingURL=directives.module.js.map

/***/ }),

/***/ 514:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuestionRadiobuttonPageModule", function() { return QuestionRadiobuttonPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__question_radiobutton__ = __webpack_require__(178);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var QuestionRadiobuttonPageModule = /** @class */ (function () {
    function QuestionRadiobuttonPageModule() {
    }
    QuestionRadiobuttonPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__question_radiobutton__["a" /* QuestionRadiobuttonPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__question_radiobutton__["a" /* QuestionRadiobuttonPage */]),
            ],
        })
    ], QuestionRadiobuttonPageModule);
    return QuestionRadiobuttonPageModule;
}());

//# sourceMappingURL=question-radiobutton.module.js.map

/***/ }),

/***/ 515:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuestionTextboxPageModule", function() { return QuestionTextboxPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__question_textbox__ = __webpack_require__(177);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var QuestionTextboxPageModule = /** @class */ (function () {
    function QuestionTextboxPageModule() {
    }
    QuestionTextboxPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__question_textbox__["a" /* QuestionTextboxPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__question_textbox__["a" /* QuestionTextboxPage */]),
            ],
        })
    ], QuestionTextboxPageModule);
    return QuestionTextboxPageModule;
}());

//# sourceMappingURL=question-textbox.module.js.map

/***/ }),

/***/ 516:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchbeneficiryPageModule", function() { return SearchbeneficiryPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__searchbeneficiry__ = __webpack_require__(180);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SearchbeneficiryPageModule = /** @class */ (function () {
    function SearchbeneficiryPageModule() {
    }
    SearchbeneficiryPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__searchbeneficiry__["a" /* SearchbeneficiryPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__searchbeneficiry__["a" /* SearchbeneficiryPage */]),
            ],
        })
    ], SearchbeneficiryPageModule);
    return SearchbeneficiryPageModule;
}());

//# sourceMappingURL=searchbeneficiry.module.js.map

/***/ }),

/***/ 517:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SurveyListPageModule", function() { return SurveyListPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pipes_pipes_module__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__survey_list__ = __webpack_require__(57);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var SurveyListPageModule = /** @class */ (function () {
    function SurveyListPageModule() {
    }
    SurveyListPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__survey_list__["a" /* SurveyListPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__survey_list__["a" /* SurveyListPage */]),
                __WEBPACK_IMPORTED_MODULE_0__pipes_pipes_module__["a" /* PipesModule */],
            ],
        })
    ], SurveyListPageModule);
    return SurveyListPageModule;
}());

//# sourceMappingURL=survey-list.module.js.map

/***/ }),

/***/ 518:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SuervyPageModule", function() { return SuervyPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__suervy__ = __webpack_require__(58);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SuervyPageModule = /** @class */ (function () {
    function SuervyPageModule() {
    }
    SuervyPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__suervy__["a" /* SuervyPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__suervy__["a" /* SuervyPage */]),
            ],
        })
    ], SuervyPageModule);
    return SuervyPageModule;
}());

//# sourceMappingURL=suervy.module.js.map

/***/ }),

/***/ 519:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SyncPageModule", function() { return SyncPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sync__ = __webpack_require__(181);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SyncPageModule = /** @class */ (function () {
    function SyncPageModule() {
    }
    SyncPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__sync__["a" /* SyncPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__sync__["a" /* SyncPage */]),
            ],
        })
    ], SyncPageModule);
    return SyncPageModule;
}());

//# sourceMappingURL=sync.module.js.map

/***/ }),

/***/ 52:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PipesModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__search_search__ = __webpack_require__(868);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__safe_safe__ = __webpack_require__(869);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sort_sort__ = __webpack_require__(870);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__safe_html_safe_html__ = __webpack_require__(872);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var PipesModule = /** @class */ (function () {
    function PipesModule() {
    }
    PipesModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_1__search_search__["a" /* SearchPipe */],
                __WEBPACK_IMPORTED_MODULE_2__safe_safe__["a" /* SafePipe */],
                __WEBPACK_IMPORTED_MODULE_3__sort_sort__["a" /* SortPipe */],
                __WEBPACK_IMPORTED_MODULE_4__safe_html_safe_html__["a" /* SafeHtmlPipe */]],
            imports: [],
            exports: [__WEBPACK_IMPORTED_MODULE_1__search_search__["a" /* SearchPipe */],
                __WEBPACK_IMPORTED_MODULE_2__safe_safe__["a" /* SafePipe */],
                __WEBPACK_IMPORTED_MODULE_3__sort_sort__["a" /* SortPipe */],
                __WEBPACK_IMPORTED_MODULE_4__safe_html_safe_html__["a" /* SafeHtmlPipe */]]
        })
    ], PipesModule);
    return PipesModule;
}());

//# sourceMappingURL=pipes.module.js.map

/***/ }),

/***/ 520:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TutorialPageModule", function() { return TutorialPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tutorial__ = __webpack_require__(521);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(112);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var TutorialPageModule = /** @class */ (function () {
    function TutorialPageModule() {
    }
    TutorialPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__tutorial__["a" /* TutorialPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__tutorial__["a" /* TutorialPage */]),
                __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */].forChild()
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__tutorial__["a" /* TutorialPage */]
            ]
        })
    ], TutorialPageModule);
    return TutorialPageModule;
}());

//# sourceMappingURL=tutorial.module.js.map

/***/ }),

/***/ 521:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TutorialPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(80);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TutorialPage = /** @class */ (function () {
    function TutorialPage(navCtrl, menu, translate, platform) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.menu = menu;
        this.platform = platform;
        this.showSkip = true;
        this.dir = 'ltr';
        this.dir = platform.dir();
        translate.get(["TUTORIAL_SLIDE1_TITLE",
            "TUTORIAL_SLIDE1_DESCRIPTION",
            "TUTORIAL_SLIDE2_TITLE",
            "TUTORIAL_SLIDE2_DESCRIPTION",
            "TUTORIAL_SLIDE3_TITLE",
            "TUTORIAL_SLIDE3_DESCRIPTION",
        ]).subscribe(function (values) {
            console.log('Loaded values', values);
            _this.slides = [
                {
                    title: values.TUTORIAL_SLIDE1_TITLE,
                    description: values.TUTORIAL_SLIDE1_DESCRIPTION,
                    image: 'assets/img/ica-slidebox-img-1.png',
                },
                {
                    title: values.TUTORIAL_SLIDE2_TITLE,
                    description: values.TUTORIAL_SLIDE2_DESCRIPTION,
                    image: 'assets/img/ica-slidebox-img-2.png',
                },
                {
                    title: values.TUTORIAL_SLIDE3_TITLE,
                    description: values.TUTORIAL_SLIDE3_DESCRIPTION,
                    image: 'assets/img/ica-slidebox-img-3.png',
                }
            ];
        });
    }
    TutorialPage.prototype.startApp = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */], {}, {
            animate: true,
            direction: 'forward'
        });
    };
    TutorialPage.prototype.onSlideChangeStart = function (slider) {
        this.showSkip = !slider.isEnd();
    };
    TutorialPage.prototype.ionViewDidEnter = function () {
        // the root left menu should be disabled on the tutorial page
        this.menu.enable(false);
    };
    TutorialPage.prototype.ionViewWillLeave = function () {
        // enable the root left menu when leaving the tutorial page
        this.menu.enable(true);
    };
    TutorialPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-tutorial',template:/*ion-inline-start:"/home/linkwok/Documents/ivdp/src/pages/tutorial/tutorial.html"*/'<ion-header no-shadow>\n  <ion-navbar>\n    <ion-buttons end *ngIf="showSkip">\n      <button ion-button (click)="startApp()" color="primary">{{ \'TUTORIAL_SKIP_BUTTON\' | translate}}</button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content no-bounce>\n  <ion-slides pager="true" dir="{{dir}}" (ionSlideWillChange)="onSlideChangeStart($event)">\n    <ion-slide *ngFor="let slide of slides">\n      <img [src]="slide.image" class="slide-image" />\n      <h2 class="slide-title" [innerHTML]="slide.title"></h2>\n      <p [innerHTML]="slide.description"></p>\n    </ion-slide>\n    <ion-slide>\n      <img src="assets/img/ica-slidebox-img-4.png" class="slide-image" />\n      <h2 class="slide-title">{{ \'TUTORIAL_SLIDE4_TITLE\' | translate }}</h2>\n      <button ion-button icon-end large clear (click)="startApp()">\n        {{ \'TUTORIAL_CONTINUE_BUTTON\' | translate }}\n        <ion-icon name="arrow-forward"></ion-icon>\n      </button>\n    </ion-slide>\n  </ion-slides>\n</ion-content>\n'/*ion-inline-end:"/home/linkwok/Documents/ivdp/src/pages/tutorial/tutorial.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* MenuController */], __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Platform */]])
    ], TutorialPage);
    return TutorialPage;
}());

//# sourceMappingURL=tutorial.js.map

/***/ }),

/***/ 522:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserblockPageModule", function() { return UserblockPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__userblock__ = __webpack_require__(182);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var UserblockPageModule = /** @class */ (function () {
    function UserblockPageModule() {
    }
    UserblockPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__userblock__["a" /* UserblockPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__userblock__["a" /* UserblockPage */]),
            ],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_2__userblock__["a" /* UserblockPage */],
            ],
        })
    ], UserblockPageModule);
    return UserblockPageModule;
}());

//# sourceMappingURL=userblock.module.js.map

/***/ }),

/***/ 523:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IdeaShowPageModule", function() { return IdeaShowPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__idea_show__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_tags_input__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ngx_chips__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser_animations__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_forms__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var IdeaShowPageModule = /** @class */ (function () {
    function IdeaShowPageModule() {
    }
    IdeaShowPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__idea_show__["a" /* IdeaShowPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__idea_show__["a" /* IdeaShowPage */]),
                __WEBPACK_IMPORTED_MODULE_3_ionic_tags_input__["a" /* IonTagsInputModule */],
                __WEBPACK_IMPORTED_MODULE_4_ngx_chips__["a" /* TagInputModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_forms__["d" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_forms__["g" /* ReactiveFormsModule */]
            ],
        })
    ], IdeaShowPageModule);
    return IdeaShowPageModule;
}());

//# sourceMappingURL=idea-show.module.js.map

/***/ }),

/***/ 565:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(566);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_module__ = __webpack_require__(570);



Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_14" /* enableProdMode */])();
Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 57:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SurveyListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__question_dropdown_question_dropdown__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_user_data_ts__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_data_getter_service_data_getter_service__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_app_global_app_global__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_database_database__ = __webpack_require__(27);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the SurveyListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SurveyListPage = /** @class */ (function () {
    function SurveyListPage(navCtrl, navParams, dataGetterService, events, userData, loadingCtrl, appGlobal, sqldatabasegetter, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataGetterService = dataGetterService;
        this.events = events;
        this.userData = userData;
        this.loadingCtrl = loadingCtrl;
        this.appGlobal = appGlobal;
        this.sqldatabasegetter = sqldatabasegetter;
        this.toastCtrl = toastCtrl;
        this.surveys = [];
        this.beneficiary_id = navParams.get('beneficiary_id');
        this.auto_increment_id = navParams.get('auto_increment_id');
        this.user = userData.userData;
        this.sqldatabasegetter.getsureydatalode(this.ccallBack, this);
        this.appGlobal.questionsList = [];
        this.events.subscribe('reload:surveys', function () {
            _this.loadSurveys(null);
        });
        this.appGlobal.answers = [];
        this.appGlobal.options = [];
        this.appGlobal.selectedCheckId = [];
        this.appGlobal.selectedCheckbox = [];
    }
    SurveyListPage.prototype.ionViewDidLoad = function () {
        this.loadSurveys(null);
    };
    SurveyListPage.prototype.ccallBack = function (t) {
        t.loadSurveys(null);
    };
    SurveyListPage.prototype.ionViewDidEnter = function () {
        this.appGlobal.answers = [];
        this.appGlobal.options = [];
        console.log('ionViewDidEnter SurveyListPage');
    };
    SurveyListPage.prototype.refreshSurveys = function (reference) {
        var _this = this;
        setTimeout(function () {
            console.log('Async operation has ended');
            _this.loadSurveys(null);
            reference.complete();
        }, 1000);
    };
    SurveyListPage.prototype.loadSurveys = function (ref) {
        if (this.sqldatabasegetter.offlineCase.length > 0) {
            this.surveys = [];
            for (var i = 0; i <= this.sqldatabasegetter.offlineCase.length; i++) {
                if (this.sqldatabasegetter.offlineCase[i] != undefined) {
                    console.log(this.sqldatabasegetter.offlineCase[i]);
                    this.surveys.push(this.sqldatabasegetter.offlineCase[i]);
                }
            }
            if (ref != null) {
                ref.complete();
            }
        }
        else {
            this.surveys = [];
            console.log("No data i array");
            if (ref != null) {
                ref.complete();
            }
        }
    };
    SurveyListPage.prototype.StartSurvey = function (ProjectId, suervtId, type, qId) {
        if (type == "Group") {
            this.appGlobal.selectedCheckId = [];
            this.appGlobal.selectedCheckbox = [];
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__question_dropdown_question_dropdown__["a" /* QuestionDropdownPage */], {
                project_id: ProjectId,
                survey_id: suervtId,
                gId: qId,
                type: "Group"
            });
        }
        else if (type == "Single") {
            this.appGlobal.selectedCheckId = [];
            this.appGlobal.selectedCheckbox = [];
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__question_dropdown_question_dropdown__["a" /* QuestionDropdownPage */], {
                project_id: ProjectId,
                survey_id: suervtId,
                gId: qId,
                type: "Single"
            });
            //this.sqldatabasegetter.getQuestionsfroloddata(suervtId, this.callsurveypage(ProjectId, suervtId, qId), this);
        }
        else {
            this.appGlobal.selectedCheckId = [];
            this.appGlobal.selectedCheckbox = [];
            alert("can not read survey type!!!  " + type);
        }
    };
    SurveyListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["m" /* Component */])({
            selector: 'page-survey-list',template:/*ion-inline-start:"/home/linkwok/Documents/ivdp/src/pages/survey-list/survey-list.html"*/'<!--\n  Generated template for the SurveyListPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Survey</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content>\n \n  <ion-refresher (ionRefresh)="refreshSurveys($event)">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n\n  <ion-list>\n    <ion-card *ngFor="let survey of surveys" (click)="StartSurvey(survey.project_id,survey.server_id,survey.type, 1)">\n      <ion-card-header>{{survey.title}}\n        <span class="pull-right sr-age">\n          <p>Project ID: <strong>{{survey.project_id}}</strong></p>\n        </span>\n      </ion-card-header>\n      <ion-card-content>\n        <p>Survey Description:<strong>{{survey.description}}</strong></p>\n        <p>Duration:<strong>{{survey.duration_months}}</strong></p>\n        <p>Start Date:<strong>{{survey.start_date}}</strong></p>\n\n      </ion-card-content>\n    </ion-card>\n  </ion-list>\n\n</ion-content>'/*ion-inline-end:"/home/linkwok/Documents/ivdp/src/pages/survey-list/survey-list.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["p" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_data_getter_service_data_getter_service__["a" /* DataGetterServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["f" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1__providers_user_data_ts__["a" /* UserData */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["k" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_5__providers_app_global_app_global__["a" /* AppGlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_6__providers_database_database__["a" /* DatabaseProvider */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["r" /* ToastController */]])
    ], SurveyListPage);
    return SurveyListPage;
}());

//# sourceMappingURL=survey-list.js.map

/***/ }),

/***/ 570:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export createTranslateLoader */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_native_qr_scanner_ngx__ = __webpack_require__(571);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_search_beneficiry_search_beneficiry_module__ = __webpack_require__(320);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__directives_directives_module__ = __webpack_require__(513);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_userblock_userblock__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_directory_directory__ = __webpack_require__(488);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_grievance_filter_grievance_filter_module__ = __webpack_require__(491);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_idea_filter_idea_filter_module__ = __webpack_require__(496);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_survey_list_survey_list_module__ = __webpack_require__(517);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_home_home_module__ = __webpack_require__(495);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_tutorial_tutorial_module__ = __webpack_require__(520);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_logout_logout_module__ = __webpack_require__(503);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_login_login_module__ = __webpack_require__(501);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_idea_form_idea_form_module__ = __webpack_require__(498);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_idea_idea_module__ = __webpack_require__(499);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_grievance_show_grievance_show_module__ = __webpack_require__(493);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_grievance_form_grievance_form_module__ = __webpack_require__(492);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_grievance_grievance_module__ = __webpack_require__(494);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_article_show_article_show_module__ = __webpack_require__(484);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__components_components_module__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_article_index_article_index_module__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_offline_offline_module__ = __webpack_require__(507);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_logout_logout__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__angular_platform_browser__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__app_component__ = __webpack_require__(899);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_home_home__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_login_login__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__ionic_native_splash_screen__ = __webpack_require__(563);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__angular_common_http__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__ngx_translate_core__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__ngx_translate_http_loader__ = __webpack_require__(900);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__ionic_native_in_app_browser__ = __webpack_require__(902);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__providers_data_getter_service_data_getter_service__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__providers_data_setter_data_setter__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__pages_idea_idea__ = __webpack_require__(500);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__pages_idea_form_idea_form__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__pages_grievance_grievance__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__pages_grievance_form_grievance_form__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__ionic_native_file_transfer__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__ionic_native_file__ = __webpack_require__(903);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__ionic_native_image_picker__ = __webpack_require__(489);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__ionic_native_crop__ = __webpack_require__(490);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__ionic_native_camera__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__ionic_native_file_path__ = __webpack_require__(904);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__pages_idea_show_idea_show__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__pages_grievance_show_grievance_show__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__providers_user_data_ts__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__ionic_storage__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__providers_login_service_login_service__ = __webpack_require__(482);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__providers_leave_data_leave_data__ = __webpack_require__(905);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51__providers_app_global_app_global__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52__pages_tutorial_tutorial__ = __webpack_require__(521);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53__pages_article_index_article_index__ = __webpack_require__(480);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_54__pages_article_show_article_show__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_55__ionic_native_vibration__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_56__ionic_native_fcm__ = __webpack_require__(564);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_57__ionic_native_local_notifications__ = __webpack_require__(561);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_58__ionic_native_app_version__ = __webpack_require__(562);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_59__ionic_native_network__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_60__pages_idea_show_idea_show_module__ = __webpack_require__(523);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_61__pages_survey_list_survey_list__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_62_ionic2_calendar_en__ = __webpack_require__(906);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_63__pages_comments_comments_module__ = __webpack_require__(486);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_64_ionic_tags_input__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_65_ngx_chips__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_66__angular_platform_browser_animations__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_67__angular_forms__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_68__pages_directory_directory_module__ = __webpack_require__(487);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_69__pages_userblock_userblock_module__ = __webpack_require__(522);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_70__pages_profile_profile_module__ = __webpack_require__(512);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_71__pages_profile_profile__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_72__pages_maintenance_request_maintenance_request_module__ = __webpack_require__(505);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_73__pages_maintenance_request_form_maintenance_request_form_module__ = __webpack_require__(504);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_74__pages_maintenance_request_maintenance_request__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_75__pages_maintenance_request_form_maintenance_request_form__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_76__pages_intro_intro__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_77__pages_intro_intro_module__ = __webpack_require__(502);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_78__ionic_native_call_number__ = __webpack_require__(506);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_79__ionic_native_device__ = __webpack_require__(481);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_80__pages_sync_sync__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_81__pages_sync_sync_module__ = __webpack_require__(519);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_82__pages_beneficiary_profile_beneficiary_profile__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_83__pages_beneficiary_profile_beneficiary_profile_module__ = __webpack_require__(485);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_84__pages_suervy_suervy__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_85__pages_suervy_suervy_module__ = __webpack_require__(518);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_86__providers_database_database__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_87__ionic_native_sqlite__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_88__providers_database_Dbmaneger__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_89__pages_tabs_tabs__ = __webpack_require__(910);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_90__pages_searchbeneficiry_searchbeneficiry__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_91__pages_searchbeneficiry_searchbeneficiry_module__ = __webpack_require__(516);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_92__pages_search_beneficiry_search_beneficiry__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_93__pages_question_textbox_question_textbox_module__ = __webpack_require__(515);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_94__pages_question_radiobutton_question_radiobutton_module__ = __webpack_require__(514);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_95__pages_question_dropdown_question_dropdown_module__ = __webpack_require__(510);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_96__pages_question_checkbox_question_checkbox_module__ = __webpack_require__(509);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_97__pages_question_checkbox_question_checkbox__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_98__pages_question_dropdown_question_dropdown__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_99__pages_question_radiobutton_question_radiobutton__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_100__pages_question_textbox_question_textbox__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_101__pages_question_image_question_image__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_102__pages_question_image_question_image_module__ = __webpack_require__(511);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








































































































// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_31__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_23__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_25__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_89__pages_tabs_tabs__["a" /* TabsPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_22__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_24_ionic_angular__["i" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_25__app_component__["a" /* MyApp */], {
                    preloadModules: true,
                    scrollPadding: false,
                    scrollAssist: true,
                    autoFocusAssist: false
                }, {
                    links: [
                        { loadChildren: '../pages/article-index/article-index.module#ArticleIndexPageModule', name: 'ArticleIndexPage', segment: 'article-index', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/article-show/article-show.module#ArticleShowPageModule', name: 'ArticleShowPage', segment: 'article-show', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/beneficiary-profile/beneficiary-profile.module#BeneficiaryProfilePageModule', name: 'BeneficiaryProfilePage', segment: 'beneficiary-profile', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/comments/comments.module#CommentsPageModule', name: 'CommentsPage', segment: 'comments', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/directory/directory.module#DirectoryPageModule', name: 'DirectoryPage', segment: 'directory', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/grievance-filter/grievance-filter.module#GrievanceFilterPageModule', name: 'GrievanceFilterPage', segment: 'grievance-filter', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/grievance-form/grievance-form.module#GrievanceFormPageModule', name: 'GrievanceFormPage', segment: 'grievance-form', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/grievance-show/grievance-show.module#GrievanceShowPageModule', name: 'GrievanceShowPage', segment: 'grievance-show', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/grievance/grievance.module#GrievancePageModule', name: 'GrievancePage', segment: 'grievance', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/home/home.module#HomePageModule', name: 'HomePage', segment: 'home', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/idea-filter/idea-filter.module#IdeaFilterPageModule', name: 'IdeaFilterPage', segment: 'idea-filter', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/idea-form/idea-form.module#IdeaFormPageModule', name: 'IdeaFormPage', segment: 'idea-form', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/idea/idea.module#IdeaPageModule', name: 'IdeaPage', segment: 'idea', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/intro/intro.module#IntroPageModule', name: 'IntroPage', segment: 'intro', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/logout/logout.module#LogoutPageModule', name: 'LogoutPage', segment: 'logout', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/maintenance-request-form/maintenance-request-form.module#MaintenanceRequestFormPageModule', name: 'MaintenanceRequestFormPage', segment: 'maintenance-request-form', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/maintenance-request/maintenance-request.module#MaintenanceRequestPageModule', name: 'MaintenanceRequestPage', segment: 'maintenance-request', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/offline/offline.module#OfflinePageModule', name: 'OfflinePage', segment: 'offline', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/question-checkbox/question-checkbox.module#QuestionCheckboxPageModule', name: 'QuestionCheckboxPage', segment: 'question-checkbox', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/question-dropdown/question-dropdown.module#QuestionDropdownPageModule', name: 'QuestionDropdownPage', segment: 'question-dropdown', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/question-image/question-image.module#QuestionImagePageModule', name: 'QuestionImagePage', segment: 'question-image', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/profile/profile.module#ProfilePageModule', name: 'ProfilePage', segment: 'profile', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/question-radiobutton/question-radiobutton.module#QuestionRadiobuttonPageModule', name: 'QuestionRadiobuttonPage', segment: 'question-radiobutton', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/search-beneficiry/search-beneficiry.module#SearchBeneficiryPageModule', name: 'SearchBeneficiryPage', segment: 'search-beneficiry', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/question-textbox/question-textbox.module#QuestionTextboxPageModule', name: 'QuestionTextboxPage', segment: 'question-textbox', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/searchbeneficiry/searchbeneficiry.module#SearchbeneficiryPageModule', name: 'SearchbeneficiryPage', segment: 'searchbeneficiry', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/survey-list/survey-list.module#SurveyListPageModule', name: 'SurveyListPage', segment: 'survey-list', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/suervy/suervy.module#SuervyPageModule', name: 'SuervyPage', segment: 'suervy', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/sync/sync.module#SyncPageModule', name: 'SyncPage', segment: 'sync', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/tutorial/tutorial.module#TutorialPageModule', name: 'TutorialPage', segment: 'tutorial', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/userblock/userblock.module#UserblockPageModule', name: 'UserblockPage', segment: 'userblock', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/idea-show/idea-show.module#IdeaShowPageModule', name: 'IdeaShowPage', segment: 'idea-show', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_29__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_30__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_30__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: (createTranslateLoader),
                        deps: [__WEBPACK_IMPORTED_MODULE_29__angular_common_http__["a" /* HttpClient */]]
                    }
                }),
                __WEBPACK_IMPORTED_MODULE_48__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_20__pages_offline_offline_module__["OfflinePageModule"],
                __WEBPACK_IMPORTED_MODULE_8__pages_home_home_module__["HomePageModule"],
                __WEBPACK_IMPORTED_MODULE_18__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_62_ionic2_calendar_en__["a" /* CalendarModule */],
                __WEBPACK_IMPORTED_MODULE_19__pages_article_index_article_index_module__["ArticleIndexPageModule"],
                __WEBPACK_IMPORTED_MODULE_17__pages_article_show_article_show_module__["ArticleShowPageModule"],
                __WEBPACK_IMPORTED_MODULE_16__pages_grievance_grievance_module__["GrievancePageModule"],
                __WEBPACK_IMPORTED_MODULE_15__pages_grievance_form_grievance_form_module__["GrievanceFormPageModule"],
                __WEBPACK_IMPORTED_MODULE_14__pages_grievance_show_grievance_show_module__["GrievanceShowPageModule"],
                __WEBPACK_IMPORTED_MODULE_5__pages_grievance_filter_grievance_filter_module__["GrievanceFilterPageModule"],
                __WEBPACK_IMPORTED_MODULE_13__pages_idea_idea_module__["IdeaPageModule"],
                __WEBPACK_IMPORTED_MODULE_12__pages_idea_form_idea_form_module__["IdeaFormPageModule"],
                __WEBPACK_IMPORTED_MODULE_60__pages_idea_show_idea_show_module__["IdeaShowPageModule"],
                __WEBPACK_IMPORTED_MODULE_6__pages_idea_filter_idea_filter_module__["IdeaFilterPageModule"],
                __WEBPACK_IMPORTED_MODULE_11__pages_login_login_module__["LoginPageModule"],
                __WEBPACK_IMPORTED_MODULE_10__pages_logout_logout_module__["LogoutPageModule"],
                __WEBPACK_IMPORTED_MODULE_20__pages_offline_offline_module__["OfflinePageModule"],
                __WEBPACK_IMPORTED_MODULE_9__pages_tutorial_tutorial_module__["TutorialPageModule"],
                __WEBPACK_IMPORTED_MODULE_7__pages_survey_list_survey_list_module__["SurveyListPageModule"],
                __WEBPACK_IMPORTED_MODULE_63__pages_comments_comments_module__["CommentsPageModule"],
                __WEBPACK_IMPORTED_MODULE_68__pages_directory_directory_module__["DirectoryPageModule"],
                __WEBPACK_IMPORTED_MODULE_69__pages_userblock_userblock_module__["UserblockPageModule"],
                __WEBPACK_IMPORTED_MODULE_91__pages_searchbeneficiry_searchbeneficiry_module__["SearchbeneficiryPageModule"],
                __WEBPACK_IMPORTED_MODULE_1__pages_search_beneficiry_search_beneficiry_module__["SearchBeneficiryPageModule"],
                __WEBPACK_IMPORTED_MODULE_96__pages_question_checkbox_question_checkbox_module__["QuestionCheckboxPageModule"],
                __WEBPACK_IMPORTED_MODULE_95__pages_question_dropdown_question_dropdown_module__["QuestionDropdownPageModule"],
                __WEBPACK_IMPORTED_MODULE_94__pages_question_radiobutton_question_radiobutton_module__["QuestionRadiobuttonPageModule"],
                __WEBPACK_IMPORTED_MODULE_93__pages_question_textbox_question_textbox_module__["QuestionTextboxPageModule"],
                __WEBPACK_IMPORTED_MODULE_102__pages_question_image_question_image_module__["QuestionImagePageModule"],
                __WEBPACK_IMPORTED_MODULE_72__pages_maintenance_request_maintenance_request_module__["MaintenanceRequestPageModule"],
                __WEBPACK_IMPORTED_MODULE_73__pages_maintenance_request_form_maintenance_request_form_module__["MaintenanceRequestFormPageModule"],
                __WEBPACK_IMPORTED_MODULE_64_ionic_tags_input__["a" /* IonTagsInputModule */],
                __WEBPACK_IMPORTED_MODULE_65_ngx_chips__["a" /* TagInputModule */],
                __WEBPACK_IMPORTED_MODULE_66__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_67__angular_forms__["d" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_67__angular_forms__["g" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_70__pages_profile_profile_module__["ProfilePageModule"],
                __WEBPACK_IMPORTED_MODULE_2__directives_directives_module__["a" /* DirectivesModule */],
                __WEBPACK_IMPORTED_MODULE_77__pages_intro_intro_module__["IntroPageModule"],
                __WEBPACK_IMPORTED_MODULE_85__pages_suervy_suervy_module__["SuervyPageModule"],
                __WEBPACK_IMPORTED_MODULE_81__pages_sync_sync_module__["SyncPageModule"],
                __WEBPACK_IMPORTED_MODULE_83__pages_beneficiary_profile_beneficiary_profile_module__["BeneficiaryProfilePageModule"]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_24_ionic_angular__["g" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_25__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_26__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_36__pages_idea_form_idea_form__["a" /* IdeaFormPage */],
                __WEBPACK_IMPORTED_MODULE_35__pages_idea_idea__["a" /* IdeaPage */],
                __WEBPACK_IMPORTED_MODULE_37__pages_grievance_grievance__["a" /* GrievancePage */],
                __WEBPACK_IMPORTED_MODULE_38__pages_grievance_form_grievance_form__["a" /* GrievanceFormPage */],
                __WEBPACK_IMPORTED_MODULE_52__pages_tutorial_tutorial__["a" /* TutorialPage */],
                __WEBPACK_IMPORTED_MODULE_45__pages_idea_show_idea_show__["a" /* IdeaShowPage */],
                __WEBPACK_IMPORTED_MODULE_46__pages_grievance_show_grievance_show__["a" /* GrievanceShowPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_logout_logout__["a" /* LogoutPage */],
                __WEBPACK_IMPORTED_MODULE_46__pages_grievance_show_grievance_show__["a" /* GrievanceShowPage */],
                __WEBPACK_IMPORTED_MODULE_53__pages_article_index_article_index__["a" /* ArticleIndexPage */],
                __WEBPACK_IMPORTED_MODULE_54__pages_article_show_article_show__["a" /* ArticleShowPage */],
                __WEBPACK_IMPORTED_MODULE_61__pages_survey_list_survey_list__["a" /* SurveyListPage */],
                __WEBPACK_IMPORTED_MODULE_4__pages_directory_directory__["a" /* DirectoryPage */],
                __WEBPACK_IMPORTED_MODULE_3__pages_userblock_userblock__["a" /* UserblockPage */],
                __WEBPACK_IMPORTED_MODULE_71__pages_profile_profile__["a" /* ProfilePage */],
                __WEBPACK_IMPORTED_MODULE_76__pages_intro_intro__["a" /* IntroPage */],
                __WEBPACK_IMPORTED_MODULE_90__pages_searchbeneficiry_searchbeneficiry__["a" /* SearchbeneficiryPage */],
                __WEBPACK_IMPORTED_MODULE_92__pages_search_beneficiry_search_beneficiry__["a" /* SearchBeneficiryPage */],
                __WEBPACK_IMPORTED_MODULE_97__pages_question_checkbox_question_checkbox__["a" /* QuestionCheckboxPage */],
                __WEBPACK_IMPORTED_MODULE_98__pages_question_dropdown_question_dropdown__["a" /* QuestionDropdownPage */],
                __WEBPACK_IMPORTED_MODULE_99__pages_question_radiobutton_question_radiobutton__["a" /* QuestionRadiobuttonPage */],
                __WEBPACK_IMPORTED_MODULE_100__pages_question_textbox_question_textbox__["a" /* QuestionTextboxPage */],
                __WEBPACK_IMPORTED_MODULE_74__pages_maintenance_request_maintenance_request__["a" /* MaintenanceRequestPage */],
                __WEBPACK_IMPORTED_MODULE_75__pages_maintenance_request_form_maintenance_request_form__["a" /* MaintenanceRequestFormPage */],
                __WEBPACK_IMPORTED_MODULE_84__pages_suervy_suervy__["a" /* SuervyPage */],
                __WEBPACK_IMPORTED_MODULE_80__pages_sync_sync__["a" /* SyncPage */],
                __WEBPACK_IMPORTED_MODULE_82__pages_beneficiary_profile_beneficiary_profile__["a" /* BeneficiaryProfilePage */],
                __WEBPACK_IMPORTED_MODULE_101__pages_question_image_question_image__["a" /* QuestionImagePage */]
            ],
            providers: [
                // StatusBar,
                __WEBPACK_IMPORTED_MODULE_28__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_23__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_24_ionic_angular__["h" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_33__providers_data_getter_service_data_getter_service__["a" /* DataGetterServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_34__providers_data_setter_data_setter__["a" /* DataSetterProvider */],
                __WEBPACK_IMPORTED_MODULE_79__ionic_native_device__["a" /* Device */],
                __WEBPACK_IMPORTED_MODULE_39__ionic_native_file_transfer__["b" /* FileTransferObject */],
                __WEBPACK_IMPORTED_MODULE_40__ionic_native_file__["a" /* File */],
                __WEBPACK_IMPORTED_MODULE_39__ionic_native_file_transfer__["a" /* FileTransfer */],
                __WEBPACK_IMPORTED_MODULE_43__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_44__ionic_native_file_path__["a" /* FilePath */],
                __WEBPACK_IMPORTED_MODULE_32__ionic_native_in_app_browser__["a" /* InAppBrowser */],
                __WEBPACK_IMPORTED_MODULE_55__ionic_native_vibration__["a" /* Vibration */],
                __WEBPACK_IMPORTED_MODULE_47__providers_user_data_ts__["a" /* UserData */],
                __WEBPACK_IMPORTED_MODULE_49__providers_login_service_login_service__["a" /* LoginServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_50__providers_leave_data_leave_data__["a" /* LeaveDataProvider */],
                __WEBPACK_IMPORTED_MODULE_51__providers_app_global_app_global__["a" /* AppGlobalProvider */],
                __WEBPACK_IMPORTED_MODULE_56__ionic_native_fcm__["a" /* FCM */],
                __WEBPACK_IMPORTED_MODULE_58__ionic_native_app_version__["a" /* AppVersion */],
                __WEBPACK_IMPORTED_MODULE_59__ionic_native_network__["a" /* Network */],
                __WEBPACK_IMPORTED_MODULE_57__ionic_native_local_notifications__["a" /* LocalNotifications */],
                __WEBPACK_IMPORTED_MODULE_41__ionic_native_image_picker__["a" /* ImagePicker */],
                __WEBPACK_IMPORTED_MODULE_42__ionic_native_crop__["a" /* Crop */],
                __WEBPACK_IMPORTED_MODULE_43__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_86__providers_database_database__["a" /* DatabaseProvider */],
                __WEBPACK_IMPORTED_MODULE_87__ionic_native_sqlite__["a" /* SQLite */],
                __WEBPACK_IMPORTED_MODULE_78__ionic_native_call_number__["a" /* CallNumber */],
                __WEBPACK_IMPORTED_MODULE_88__providers_database_Dbmaneger__["a" /* DBmaneger */],
                __WEBPACK_IMPORTED_MODULE_0__ionic_native_qr_scanner_ngx__["a" /* QRScanner */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 58:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SuervyPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__question_textbox_question_textbox__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__question_radiobutton_question_radiobutton__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__question_checkbox_question_checkbox__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_database_database__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_data_setter_data_setter__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_app_global_app_global__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ionic_angular_components_toast_toast_controller__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__question_image_question_image__ = __webpack_require__(179);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











/**
 * Generated class for the SuervyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SuervyPage = /** @class */ (function () {
    function SuervyPage(navCtrl, navParams, storage, appGlobal, dataSetterService, toastCtrl, sqldatabasegetter) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.appGlobal = appGlobal;
        this.dataSetterService = dataSetterService;
        this.toastCtrl = toastCtrl;
        this.sqldatabasegetter = sqldatabasegetter;
        this.is_last = 0;
        this.dataobject = [];
        this.beneficiary_id = [];
        this.auto_increment_id = [];
        this.appGlobal.options = [];
        this.qindex = navParams.get("qindex");
        this.question_id = navParams.get("question_id");
        this.project_id = navParams.get("project_id");
        this.survey_id = navParams.get("survey_id");
        if (navParams.get('beneficiary_id') != null && navParams.get('auto_increment_id') != null) {
            this.beneficiary_id = navParams.get('beneficiary_id');
            this.auto_increment_id = navParams.get('auto_increment_id');
        }
        else {
            this.beneficiary_id = JSON.stringify(this.appGlobal.selectedCheckbox);
            this.auto_increment_id = JSON.stringify(this.appGlobal.selectedCheckId);
        }
        this.questionType = this.appGlobal.questionsList[this.qindex].type;
        if (this.appGlobal.questionsList[this.qindex].type == "CheckBox") {
            this.sqldatabasegetter.getpoction(this.appGlobal.questionsList[this.qindex].server_id);
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__question_checkbox_question_checkbox__["a" /* QuestionCheckboxPage */], {
                qindex: this.qindex,
                question_id: this.question_id,
                project_id: this.project_id,
                survey_id: this.survey_id,
                beneficiary_id: this.beneficiary_id,
                auto_increment_id: this.auto_increment_id
            });
        }
        if (this.appGlobal.questionsList[this.qindex].type == "TextBox") {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__question_textbox_question_textbox__["a" /* QuestionTextboxPage */], {
                qindex: this.qindex,
                question_id: this.question_id,
                project_id: this.project_id,
                survey_id: this.survey_id,
                beneficiary_id: this.beneficiary_id,
                auto_increment_id: this.auto_increment_id
            });
        }
        if (this.appGlobal.questionsList[this.qindex].type == "Radio" || this.appGlobal.questionsList[this.qindex].type == "radio") {
            this.sqldatabasegetter.getpoction(this.appGlobal.questionsList[this.qindex].server_id);
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_1__question_radiobutton_question_radiobutton__["a" /* QuestionRadiobuttonPage */], {
                qindex: this.qindex,
                question_id: this.question_id,
                project_id: this.project_id,
                survey_id: this.survey_id,
                beneficiary_id: this.beneficiary_id,
                auto_increment_id: this.auto_increment_id
            });
        }
        if (this.appGlobal.questionsList[this.qindex].type == "Image" || this.appGlobal.questionsList[this.qindex].type == "image") {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_10__question_image_question_image__["a" /* QuestionImagePage */], {
                qindex: this.qindex,
                question_id: this.question_id,
                project_id: this.project_id,
                survey_id: this.survey_id,
                beneficiary_id: this.beneficiary_id,
                auto_increment_id: this.auto_increment_id
            });
        }
        this.loadQuestion();
    }
    SuervyPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SuervyPage');
    };
    SuervyPage.prototype.ionViewDidEnter = function () { };
    SuervyPage.prototype.loadQuestion = function () { };
    SuervyPage.prototype.goToNext = function (e) { };
    SuervyPage.prototype.goToPrev = function (e) { };
    SuervyPage.prototype.submit = function () { };
    SuervyPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_5__angular_core__["m" /* Component */])({
            selector: 'page-suervy',template:/*ion-inline-start:"/home/linkwok/Documents/ivdp/src/pages/suervy/suervy.html"*/'<!--\n  Generated template for the SuervyPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar hideBackButton *navbar>\n    <!-- <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>SurveyPage</ion-title> -->\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n\n  <!-- <p>{{question}}</p> -->\n\n  <hr>\n  <!-- <ion-input name="anser_input" type="text" placeholder="Test Placeholder" [(ngModel)]="answer.option_text"></ion-input> -->\n  <hr>\n  <!-- <button ion-button *ngIf="is_last == 1" (click)="submit()">Submit</button>\n  <button ion-button *ngIf="is_last == 0 " (click)="goToNext(\'a\')">Next</button>\n  <button ion-button *ngIf="is_last == 0" (click)="goToPrev(\'a\')">Previous</button> -->\n\n\n</ion-content>'/*ion-inline-end:"/home/linkwok/Documents/ivdp/src/pages/suervy/suervy.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["p" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_8__providers_app_global_app_global__["a" /* AppGlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_data_setter_data_setter__["a" /* DataSetterProvider */],
            __WEBPACK_IMPORTED_MODULE_9_ionic_angular_components_toast_toast_controller__["a" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_database_database__["a" /* DatabaseProvider */]])
    ], SuervyPage);
    return SuervyPage;
}());

//# sourceMappingURL=suervy.js.map

/***/ }),

/***/ 80:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_database_database__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_app_global_app_global__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_data_setter_data_setter__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular_components_toast_toast_controller__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_network__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_data_getter_service_data_getter_service__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_storage__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__intro_intro__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_observable_interval__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_observable_interval___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_rxjs_add_observable_interval__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, network, dataGetterService, toastCtrl, dataSetterService, loadingCtrl, appGlobal, storage, events, sqldatabasegetter) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.network = network;
        this.dataGetterService = dataGetterService;
        this.toastCtrl = toastCtrl;
        this.dataSetterService = dataSetterService;
        this.loadingCtrl = loadingCtrl;
        this.appGlobal = appGlobal;
        this.storage = storage;
        this.events = events;
        this.sqldatabasegetter = sqldatabasegetter;
        this.notifications = [];
        this.descending = false;
        this.order = -1;
        this.field = 'updated_at';
        this.totalbeneficiary = this.sqldatabasegetter.total_beneficialy;
        this.totalsurvey = this.sqldatabasegetter.total_surveys;
        this.totalcount_benificiary = this.appGlobal.totalcount_bene;
        this.sync_status = this.appGlobal.sync_status;
        this.actual = this.appGlobal.actual;
        this.total = this.appGlobal.total;
        this.aactual_hhc = this.appGlobal.actual_hh;
        storage.get('total_count_beneficiary').then(function (val) {
            _this.totalcount_benificiary = val;
        });
        if (this.totalbeneficiary == this.totalcount_benificiary) {
            this.sync_status = "Sync Done";
        }
        else {
            this.sync_status = "Sync is going ... ";
        }
        this.events.subscribe('reload:page-home', function () {
            _this.loadtotalbeneficialy();
            _this.reloadfunction();
        });
    }
    HomePage.prototype.reloadfunction = function () {
        this.sqldatabasegetter.getTotalcount(this.ccallBack, this);
        this.sqldatabasegetter.getTotalsurvey(this.ccallBack, this);
    };
    HomePage.prototype.ccallBack = function (t) {
        t.loadtotalbeneficialy();
        t.loading_livedata();
    };
    HomePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.loadtotalbeneficialy();
        this.loading_livedata();
        // this.sub = Observable.interval(2000)
        //   .subscribe((val) => {
        //     this.sqldatabasegetter.getTotalcount(this.ccallBack, this);
        //     this.sqldatabasegetter.getTotalsurvey(this.ccallBack, this);
        //     this.totalbeneficiary = this.sqldatabasegetter.total_beneficialy;
        //     this.totalsurvey = this.sqldatabasegetter.total_surveys;
        //     this.loadtotalbeneficialy()
        //     this.loading_livedata()
        //   });
        this.storage.get('intro-done').then(function (done) {
            if (!done) {
                _this.storage.set('intro-done', true);
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_9__intro_intro__["a" /* IntroPage */]);
            }
        });
    };
    HomePage.prototype.ionViewDidEnter = function () {
        this.loadtotalbeneficialy();
        this.loading_livedata();
    };
    HomePage.prototype.refreshHomepage = function (ev) {
        var _this = this;
        this.dataget();
        setTimeout(function () {
            console.log('Async operation has ended');
            _this.loadtotalbeneficialy();
            _this.loading_livedata();
            ev.complete();
        }, 2000);
        // this.percentincrease();
        // alert("Home page is reloading");
    };
    // percentincrease()
    // {
    //   this.live_dataLoade = this.live_dataLoade + 1;
    //   if(this.live_dataLoade < 100){
    //   setTimeout(this.percentincrease,500);
    //   }
    // }
    HomePage.prototype.dataget = function () {
        this.sqldatabasegetter.getTotalcount(this.ccallBack, this);
        this.sqldatabasegetter.getTotalsurvey(this.ccallBack, this);
    };
    HomePage.prototype.loadtotalbeneficialy = function () {
        var _this = this;
        this.totalbeneficiary = this.sqldatabasegetter.total_beneficialy;
        this.totalsurvey = this.sqldatabasegetter.total_surveys;
        this.storage.get('total_count_beneficiary').then(function (val) {
            _this.totalcount_benificiary = val;
        });
        if (this.totalbeneficiary == this.totalcount_benificiary) {
            this.sync_status = "Sync Done";
            // this.sub.unsubscribe();
        }
        else {
            this.sync_status = "Sync is going ... ";
        }
    };
    HomePage.prototype.loading_livedata = function () {
        this.live_dataLoade = Math.round(this.appGlobal.actual * (100) / this.appGlobal.total);
        // this.storage.get('total_count_beneficiary').then((val) => {
        //   this.totalcount_benificiary = val;
        // });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_5__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/home/linkwok/Documents/ivdp/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      <img src="assets/img/appicon.png" height="30" alt="DF IVDP">\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-refresher (ionRefresh)="refreshHomepage($event)">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n  <ion-label><strong>{{sync_status}} </strong> </ion-label>\n\n  <ion-card>\n    <ion-card-header>\n      <div><strong>Total Number of Beneficiary :- </strong></div>\n    </ion-card-header>\n    <ion-card-content>\n      <p>Count: <strong>{{appGlobal.actual}} / {{appGlobal.total}}</strong></p>\n\n        <!-- <div class="progerss">\n          <div class="loader" style="width:{{live_dataLoade}}%;">\n            <p class="percent">{{live_dataLoade}}%</p>\n          </div>\n        </div> -->\n      <p><strong>{{live_dataLoade}}<label>%</label> </strong></p>\n    </ion-card-content>\n  </ion-card>\n\n  <ion-card>\n    <ion-card-header>\n      <div><strong>Total Number of HouseHold :- </strong></div>\n    </ion-card-header>\n    <ion-card-content>\n     \n      <p> Count: <strong>{{appGlobal.actual_hh}}</strong></p>\n    </ion-card-content>\n  </ion-card>\n\n  <ion-card>\n    <ion-card-header>\n      <div><strong>Total Number of Survey :- </strong></div>\n    </ion-card-header>\n    <ion-card-content>\n      <p>Count: <strong>{{totalsurvey}}</strong></p>\n\n    </ion-card-content>\n  </ion-card>\n\n</ion-content>\n\n<!-- <script>\nvar ele = document.getElementsByClassName("loader");\nvar width = 0;\nvar id = setInterval(frame, 1000);\n\nfunction frame(){\n  alrt("hi");\n  if(width >= 100){\n    clearInterval(id);\n  }else{\n    width++;\n    ele.style.width = width + \'%\';\n  }\n}\n</script> -->'/*ion-inline-end:"/home/linkwok/Documents/ivdp/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6_ionic_angular__["o" /* NavController */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_network__["a" /* Network */],
            __WEBPACK_IMPORTED_MODULE_7__providers_data_getter_service_data_getter_service__["a" /* DataGetterServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular_components_toast_toast_controller__["a" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__providers_data_setter_data_setter__["a" /* DataSetterProvider */],
            __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["k" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1__providers_app_global_app_global__["a" /* AppGlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["f" /* Events */],
            __WEBPACK_IMPORTED_MODULE_0__providers_database_database__["a" /* DatabaseProvider */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 82:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MaintenanceRequestPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_database_Dbmaneger__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_database_database__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_data_setter_data_setter__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_user_data_ts__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_data_getter_service_data_getter_service__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_app_global_app_global__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_call_number__ = __webpack_require__(506);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__beneficiary_profile_beneficiary_profile__ = __webpack_require__(165);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










/**
 * Generated class for the MaintenanceRequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MaintenanceRequestPage = /** @class */ (function () {
    function MaintenanceRequestPage(navCtrl, navParams, dataGetterService, loadingCtrl, events, user, toastCtrl, appGlobal, sqldatabasegetter, db, dataSetter, callNumber) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataGetterService = dataGetterService;
        this.loadingCtrl = loadingCtrl;
        this.events = events;
        this.user = user;
        this.toastCtrl = toastCtrl;
        this.appGlobal = appGlobal;
        this.sqldatabasegetter = sqldatabasegetter;
        this.db = db;
        this.dataSetter = dataSetter;
        this.callNumber = callNumber;
        this.maintenanceRequests = [];
        this.queryText = '';
        this.counter = 0;
        this.characterforSearch = navParams.get('characterforSearch');
        if (this.characterforSearch == null && this.characterforSearch == undefined) {
            this.sqldatabasegetter.getbeneficiarydata(null, this.ccallBack, this);
        }
        else {
            this.sqldatabasegetter.showbeneficirybysearch(this.characterforSearch, this.ccallBack, this);
        }
        this.events.subscribe('reload:page-maintenance-request', function () {
            _this.maintenanceRequests = [];
            _this.loadMaintenanceRequests(null);
            alert("constructor  page ref");
        });
    }
    MaintenanceRequestPage.prototype.refreshMaintenanceRequestList = function (reference) {
        var _this = this;
        if (this.characterforSearch == null && this.characterforSearch == undefined) {
            this.sqldatabasegetter.getbeneficiarydata(null, this.ccallBack, this);
        }
        else {
            this.maintenanceRequests = [];
            this.sqldatabasegetter.showbeneficirybysearch(this.characterforSearch, this.ccallBack, this);
        }
        setTimeout(function () {
            console.log('Async operation has ended');
            _this.loadMaintenanceRequests(null);
            reference.complete();
        }, 2000);
    };
    MaintenanceRequestPage.prototype.datareload = function (rf) {
        this.loadMaintenanceRequests(rf);
    };
    MaintenanceRequestPage.prototype.ionViewDidLoad = function () {
        this.maintenanceRequests = [];
        this.loadMaintenanceRequests(null);
        console.log('ionViewDidLoad MaintenanceRequestPage');
    };
    MaintenanceRequestPage.prototype.ionViewDidEnter = function () {
        this.refreshMaintenanceRequestList(null);
    };
    MaintenanceRequestPage.prototype.ccallBack = function (t) {
        t.loadMaintenanceRequests(null);
    };
    MaintenanceRequestPage.prototype.loadMaintenanceRequests = function (reference) {
        // let loading = this.loadingCtrl.create({
        //   content: 'Please wait...'
        // });
        // if (reference === null) {
        //   loading.present();
        // }
        if (this.sqldatabasegetter.offlineCase.length > 0) {
            this.maintenanceRequests = [];
            for (var i = 0; i <= this.sqldatabasegetter.offlineCase.length; i++) {
                if (this.sqldatabasegetter.offlineCase[i] != undefined) {
                    console.log(this.sqldatabasegetter.offlineCase[i]);
                    this.maintenanceRequests.push(this.sqldatabasegetter.offlineCase[i]);
                }
            }
            //loading.dismiss();
            this.total_data = this.maintenanceRequests.length;
            if (reference != null) {
                reference.complete();
            }
        }
        else {
            this.maintenanceRequests = [];
            console.log("No data i array");
            //loading.dismiss();
            if (reference != null) {
                reference.complete();
            }
        }
    };
    MaintenanceRequestPage.prototype.EditUserProfile = function (server_id, id, code) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__beneficiary_profile_beneficiary_profile__["a" /* BeneficiaryProfilePage */], {
            beneficiary_id: server_id,
            user_id: this.UserId,
            auto_increment_id: id
        });
    };
    MaintenanceRequestPage.prototype.call = function (num) {
        this.callNumber.callNumber(num, true);
    };
    MaintenanceRequestPage.prototype.doInfinite = function (e) {
        this.datareloadforcounter(this.ccallBack, this);
        console.log("Begin async operation");
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve();
            }, 500);
        });
    };
    MaintenanceRequestPage.prototype.datareloadforcounter = function (ca, t) {
        if (this.characterforSearch == null && this.characterforSearch == undefined) {
            this.sqldatabasegetter.beneficiarypaggination(this.counter++, this.ccallBack, this);
        }
        else {
            this.sqldatabasegetter.showbeneficirybysearch(this.characterforSearch, this.ccallBack, this);
        }
        ca(t);
    };
    MaintenanceRequestPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["m" /* Component */])({
            selector: 'page-maintenance-request',template:/*ion-inline-start:"/home/linkwok/Documents/ivdp/src/pages/maintenance-request/maintenance-request.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Beneficiaries</ion-title>\n  </ion-navbar>\n\n  <ion-toolbar no-border-top>\n    <ion-searchbar color="primary" [(ngModel)]="queryText" placeholder="Search"></ion-searchbar>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-refresher (ionRefresh)="refreshMaintenanceRequestList($event)">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n\n\n  <ion-list>\n    <ion-card *ngFor="let maintenanceRequest of maintenanceRequests | search : {term:queryText,fields:[\'beneficiary_name\',\'code\']}"\n      (click)="EditUserProfile(maintenanceRequest.server_id,maintenanceRequest.id,maintenanceRequest.code)" [hidden]="maintenanceRequests.hide">\n      <div class="{{\'maintenance_request_state_sidebar_\'+maintenanceRequest.state}}">\n        <ion-card-header>\n          CODE: {{maintenanceRequest.code}}\n          <span class="pull-right sr-age">\n            <p>Age: <strong type="number">{{maintenanceRequest.age}}</strong></p>\n          </span>\n        </ion-card-header>\n        <ion-card-content>\n          <p>Name: <strong>{{maintenanceRequest.beneficiary_name}}</strong></p>\n          <p>Gender: <strong>{{maintenanceRequest.gender}}</strong></p>\n          <p >DOB: <strong>{{maintenanceRequest.date_of_birth | date: \'dd MMM yyyy\'}}</strong></p>\n          <p>Contact Number: <strong><a href="#" (click)=\'call(maintenanceRequest.contact_number)\'>{{maintenanceRequest.contact_number}}</a></strong></p>\n          <p>Whatsapp Number:<strong>{{maintenanceRequest.whatsapp_number}}</strong> </p>\n          <p>Household ID: <strong>{{maintenanceRequest.hh_number}}</strong> </p>\n        </ion-card-content>\n\n        <ion-row *ngIf="maintenanceRequest.resolved">\n          <ion-col>\n            <div class="pull-right">\n              <p>Closed By: <strong>{{maintenanceRequest.resolver}}</strong></p>\n              <p>Closed At: <strong>{{maintenanceRequest.resolved_on}}</strong></p>\n            </div>\n          </ion-col>\n        </ion-row>\n\n        <ion-row>\n          <ion-col>\n            <ion-badge class="pull-right">{{maintenanceRequest.state}}</ion-badge>\n          </ion-col>\n        </ion-row>\n      </div>\n    </ion-card>\n  </ion-list>\n  <!-- ------------------infinite-scroll------------------ -->\n  <ion-infinite-scroll (ionInfinite)="$event.waitFor(doInfinite())">\n    <ion-infinite-scroll-content></ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n  <!-- <ion-fab right bottom>\n    <button ion-fab (click)="goToMaintenanceRequestForm()">\n      <ion-icon name="add"></ion-icon>\n    </button>\n  </ion-fab> -->\n  <ion-fab left bottom>\n    <ion-label>{{total_data}}</ion-label>\n  </ion-fab>\n\n</ion-content>'/*ion-inline-end:"/home/linkwok/Documents/ivdp/src/pages/maintenance-request/maintenance-request.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["p" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_6__providers_data_getter_service_data_getter_service__["a" /* DataGetterServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["k" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["f" /* Events */],
            __WEBPACK_IMPORTED_MODULE_3__providers_user_data_ts__["a" /* UserData */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["r" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_7__providers_app_global_app_global__["a" /* AppGlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_1__providers_database_database__["a" /* DatabaseProvider */],
            __WEBPACK_IMPORTED_MODULE_0__providers_database_Dbmaneger__["a" /* DBmaneger */],
            __WEBPACK_IMPORTED_MODULE_2__providers_data_setter_data_setter__["a" /* DataSetterProvider */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_call_number__["a" /* CallNumber */]])
    ], MaintenanceRequestPage);
    return MaintenanceRequestPage;
}());

//# sourceMappingURL=maintenance-request.js.map

/***/ }),

/***/ 868:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/**
 * Generated class for the SearchPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
var SearchPipe = /** @class */ (function () {
    function SearchPipe() {
    }
    SearchPipe.prototype.transform = function (items, condition) {
        var _this = this;
        if (!items)
            return [];
        if (!condition)
            return items;
        if (!condition.term)
            return items;
        if (!condition.fields)
            return items;
        var queryText = condition.term.toLowerCase().replace(/,|\.|-/g, ' ');
        var queryWords = queryText.split(' ').filter(function (w) { return !!w.trim().length; });
        return items.filter(function (item) {
            return _this.filterItem(item, queryWords, condition);
        });
    };
    SearchPipe.prototype.filterItem = function (item, queryWords, condition) {
        var foundStatus = false;
        var fields = condition.fields;
        for (var i = 0; i < queryWords.length; i++) {
            for (var j = 0; j < fields.length; j++) {
                var includes = item[fields[j]].toString().toLowerCase().includes(queryWords[i]);
                if (includes) {
                    foundStatus = true;
                    break;
                }
            }
            if (foundStatus) {
                break;
            }
        }
        return foundStatus;
    };
    SearchPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
            name: 'search',
        })
    ], SearchPipe);
    return SearchPipe;
}());

//# sourceMappingURL=search.js.map

/***/ }),

/***/ 869:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SafePipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the SafePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
var SafePipe = /** @class */ (function () {
    /**
     * Takes a value and makes it lowercase.
     */
    function SafePipe(domSanitizer) {
        this.domSanitizer = domSanitizer;
    }
    SafePipe.prototype.transform = function (url) {
        return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
    };
    SafePipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["S" /* Pipe */])({
            name: 'safe',
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["c" /* DomSanitizer */]])
    ], SafePipe);
    return SafePipe;
}());

//# sourceMappingURL=safe.js.map

/***/ }),

/***/ 870:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SortPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


/**
 * Generated class for the SortPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
var SortPipe = /** @class */ (function () {
    function SortPipe() {
    }
    /**
     * Takes a value and makes it lowercase.
     */
    SortPipe.prototype.transform = function (array, args) {
        return array.sort(function (a, b) {
            if (__WEBPACK_IMPORTED_MODULE_1_moment__(a[args.property]).isBefore(__WEBPACK_IMPORTED_MODULE_1_moment__(b[args.property]))) { // <
                //return -1;
                return -1 * args.order;
            }
            else if (__WEBPACK_IMPORTED_MODULE_1_moment__(a[args.property]).isAfter(__WEBPACK_IMPORTED_MODULE_1_moment__(b[args.property]))) { // >
                //return 1;
                return 1 * args.order;
            }
            else if (__WEBPACK_IMPORTED_MODULE_1_moment__(a[args.property]).isSame(__WEBPACK_IMPORTED_MODULE_1_moment__(b[args.property]))) {
                return 0;
            }
        });
    };
    SortPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
            name: 'sort',
        })
    ], SortPipe);
    return SortPipe;
}());

//# sourceMappingURL=sort.js.map

/***/ }),

/***/ 871:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 361,
	"./af.js": 361,
	"./ar": 362,
	"./ar-dz": 363,
	"./ar-dz.js": 363,
	"./ar-kw": 364,
	"./ar-kw.js": 364,
	"./ar-ly": 365,
	"./ar-ly.js": 365,
	"./ar-ma": 366,
	"./ar-ma.js": 366,
	"./ar-sa": 367,
	"./ar-sa.js": 367,
	"./ar-tn": 368,
	"./ar-tn.js": 368,
	"./ar.js": 362,
	"./az": 369,
	"./az.js": 369,
	"./be": 370,
	"./be.js": 370,
	"./bg": 371,
	"./bg.js": 371,
	"./bm": 372,
	"./bm.js": 372,
	"./bn": 373,
	"./bn.js": 373,
	"./bo": 374,
	"./bo.js": 374,
	"./br": 375,
	"./br.js": 375,
	"./bs": 376,
	"./bs.js": 376,
	"./ca": 377,
	"./ca.js": 377,
	"./cs": 378,
	"./cs.js": 378,
	"./cv": 379,
	"./cv.js": 379,
	"./cy": 380,
	"./cy.js": 380,
	"./da": 381,
	"./da.js": 381,
	"./de": 382,
	"./de-at": 383,
	"./de-at.js": 383,
	"./de-ch": 384,
	"./de-ch.js": 384,
	"./de.js": 382,
	"./dv": 385,
	"./dv.js": 385,
	"./el": 386,
	"./el.js": 386,
	"./en-au": 387,
	"./en-au.js": 387,
	"./en-ca": 388,
	"./en-ca.js": 388,
	"./en-gb": 389,
	"./en-gb.js": 389,
	"./en-ie": 390,
	"./en-ie.js": 390,
	"./en-nz": 391,
	"./en-nz.js": 391,
	"./eo": 392,
	"./eo.js": 392,
	"./es": 393,
	"./es-do": 394,
	"./es-do.js": 394,
	"./es-us": 395,
	"./es-us.js": 395,
	"./es.js": 393,
	"./et": 396,
	"./et.js": 396,
	"./eu": 397,
	"./eu.js": 397,
	"./fa": 398,
	"./fa.js": 398,
	"./fi": 399,
	"./fi.js": 399,
	"./fo": 400,
	"./fo.js": 400,
	"./fr": 401,
	"./fr-ca": 402,
	"./fr-ca.js": 402,
	"./fr-ch": 403,
	"./fr-ch.js": 403,
	"./fr.js": 401,
	"./fy": 404,
	"./fy.js": 404,
	"./gd": 405,
	"./gd.js": 405,
	"./gl": 406,
	"./gl.js": 406,
	"./gom-latn": 407,
	"./gom-latn.js": 407,
	"./gu": 408,
	"./gu.js": 408,
	"./he": 409,
	"./he.js": 409,
	"./hi": 410,
	"./hi.js": 410,
	"./hr": 411,
	"./hr.js": 411,
	"./hu": 412,
	"./hu.js": 412,
	"./hy-am": 413,
	"./hy-am.js": 413,
	"./id": 414,
	"./id.js": 414,
	"./is": 415,
	"./is.js": 415,
	"./it": 416,
	"./it.js": 416,
	"./ja": 417,
	"./ja.js": 417,
	"./jv": 418,
	"./jv.js": 418,
	"./ka": 419,
	"./ka.js": 419,
	"./kk": 420,
	"./kk.js": 420,
	"./km": 421,
	"./km.js": 421,
	"./kn": 422,
	"./kn.js": 422,
	"./ko": 423,
	"./ko.js": 423,
	"./ky": 424,
	"./ky.js": 424,
	"./lb": 425,
	"./lb.js": 425,
	"./lo": 426,
	"./lo.js": 426,
	"./lt": 427,
	"./lt.js": 427,
	"./lv": 428,
	"./lv.js": 428,
	"./me": 429,
	"./me.js": 429,
	"./mi": 430,
	"./mi.js": 430,
	"./mk": 431,
	"./mk.js": 431,
	"./ml": 432,
	"./ml.js": 432,
	"./mr": 433,
	"./mr.js": 433,
	"./ms": 434,
	"./ms-my": 435,
	"./ms-my.js": 435,
	"./ms.js": 434,
	"./mt": 436,
	"./mt.js": 436,
	"./my": 437,
	"./my.js": 437,
	"./nb": 438,
	"./nb.js": 438,
	"./ne": 439,
	"./ne.js": 439,
	"./nl": 440,
	"./nl-be": 441,
	"./nl-be.js": 441,
	"./nl.js": 440,
	"./nn": 442,
	"./nn.js": 442,
	"./pa-in": 443,
	"./pa-in.js": 443,
	"./pl": 444,
	"./pl.js": 444,
	"./pt": 445,
	"./pt-br": 446,
	"./pt-br.js": 446,
	"./pt.js": 445,
	"./ro": 447,
	"./ro.js": 447,
	"./ru": 448,
	"./ru.js": 448,
	"./sd": 449,
	"./sd.js": 449,
	"./se": 450,
	"./se.js": 450,
	"./si": 451,
	"./si.js": 451,
	"./sk": 452,
	"./sk.js": 452,
	"./sl": 453,
	"./sl.js": 453,
	"./sq": 454,
	"./sq.js": 454,
	"./sr": 455,
	"./sr-cyrl": 456,
	"./sr-cyrl.js": 456,
	"./sr.js": 455,
	"./ss": 457,
	"./ss.js": 457,
	"./sv": 458,
	"./sv.js": 458,
	"./sw": 459,
	"./sw.js": 459,
	"./ta": 460,
	"./ta.js": 460,
	"./te": 461,
	"./te.js": 461,
	"./tet": 462,
	"./tet.js": 462,
	"./th": 463,
	"./th.js": 463,
	"./tl-ph": 464,
	"./tl-ph.js": 464,
	"./tlh": 465,
	"./tlh.js": 465,
	"./tr": 466,
	"./tr.js": 466,
	"./tzl": 467,
	"./tzl.js": 467,
	"./tzm": 468,
	"./tzm-latn": 469,
	"./tzm-latn.js": 469,
	"./tzm.js": 468,
	"./uk": 470,
	"./uk.js": 470,
	"./ur": 471,
	"./ur.js": 471,
	"./uz": 472,
	"./uz-latn": 473,
	"./uz-latn.js": 473,
	"./uz.js": 472,
	"./vi": 474,
	"./vi.js": 474,
	"./x-pseudo": 475,
	"./x-pseudo.js": 475,
	"./yo": 476,
	"./yo.js": 476,
	"./zh-cn": 477,
	"./zh-cn.js": 477,
	"./zh-hk": 478,
	"./zh-hk.js": 478,
	"./zh-tw": 479,
	"./zh-tw.js": 479
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 871;

/***/ }),

/***/ 872:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SafeHtmlPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(40);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the SafeHtmlPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
var SafeHtmlPipe = /** @class */ (function () {
    /**
     * Takes a value and makes it lowercase.
     */
    function SafeHtmlPipe(sanitized) {
        this.sanitized = sanitized;
    }
    SafeHtmlPipe.prototype.transform = function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return this.sanitized.bypassSecurityTrustHtml(value);
    };
    SafeHtmlPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
            name: 'safeHtml',
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */]])
    ], SafeHtmlPipe);
    return SafeHtmlPipe;
}());

//# sourceMappingURL=safe-html.js.map

/***/ }),

/***/ 877:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TimelineComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return TimelineItemComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return TimelineTimeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TimelineComponent = /** @class */ (function () {
    function TimelineComponent() {
        this.endIcon = "ionic";
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('endIcon'),
        __metadata("design:type", Object)
    ], TimelineComponent.prototype, "endIcon", void 0);
    TimelineComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'timeline',template:/*ion-inline-start:"/home/linkwok/Documents/ivdp/src/components/timeline/timeline.html"*/'<div class="timeline">\n  <ng-content></ng-content>\n\n  <timeline-item>\n    <ion-icon class="" [name]="endIcon"></ion-icon>\n  </timeline-item>\n\n</div>\n'/*ion-inline-end:"/home/linkwok/Documents/ivdp/src/components/timeline/timeline.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], TimelineComponent);
    return TimelineComponent;
}());

var TimelineItemComponent = /** @class */ (function () {
    function TimelineItemComponent() {
    }
    TimelineItemComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'timeline-item',
            template: '<ng-content></ng-content>'
        }),
        __metadata("design:paramtypes", [])
    ], TimelineItemComponent);
    return TimelineItemComponent;
}());

var TimelineTimeComponent = /** @class */ (function () {
    function TimelineTimeComponent() {
        this.time = {
            subtitle: '',
            title: '',
        };
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('time'),
        __metadata("design:type", Object)
    ], TimelineTimeComponent.prototype, "time", void 0);
    TimelineTimeComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'timeline-time',
            template: '<span>{{time.subtitle}}</span> <span>{{time.title}}</span>'
        }),
        __metadata("design:paramtypes", [])
    ], TimelineTimeComponent);
    return TimelineTimeComponent;
}());

//# sourceMappingURL=timeline.js.map

/***/ }),

/***/ 878:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommentComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_data_setter_data_setter__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the CommentComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var CommentComponent = /** @class */ (function () {
    function CommentComponent(events, dataSetter) {
        this.events = events;
        this.dataSetter = dataSetter;
        this.rootItem = {};
        this.editorComment = '';
        console.log('CommentComponent Component');
        // this.rootItem = this.navParams.data.rootItem;
        // this.user = userData.userData;
    }
    CommentComponent.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CommentsPage');
    };
    CommentComponent.prototype.ionViewWillLeave = function () {
        // unsubscribe
        this.events.unsubscribe('comment:received');
    };
    CommentComponent.prototype.ionViewDidEnter = function () {
        var _this = this;
        // Subscribe to received  new message events
        if (this.rootItem.comments) {
            this.scrollToBottom();
        }
        this.events.subscribe('comment:received', function (comment) {
            _this.pushNewComment(comment);
        });
    };
    // dismiss() {
    //   this.viewCtrl.dismiss();
    // }
    CommentComponent.prototype.onFocus = function () {
        // this.showEmojiPicker = false;
        this.content.resize();
        this.scrollToBottom();
    };
    CommentComponent.prototype.switchEmojiPicker = function () {
        // this.showEmojiPicker = !this.showEmojiPicker;
        // if (!this.showEmojiPicker) {
        //   this.focus();
        // } else {
        //   this.setTextareaScroll();
        // }
        // this.content.resize();
        // this.scrollToBottom();
    };
    CommentComponent.prototype.sendComment = function () {
        var _this = this;
        if (!this.editorComment.trim())
            return;
        // Mock message
        var id = Date.now().toString();
        var time = __WEBPACK_IMPORTED_MODULE_3_moment__().format("DD/MM/YY HH:mm");
        var comment = {
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
            .subscribe(function (data) {
            console.log("Comments Response", data);
            var index = _this.getMsgIndexById(id);
            if (index !== -1) {
                if (data.success) {
                    _this.rootItem.comments[index].status = 'success';
                }
                else {
                    _this.rootItem.comments[index].status = 'failed';
                }
            }
        }, function (err) {
            console.log(err);
            var index = _this.getMsgIndexById(id);
            if (index !== -1) {
                _this.rootItem.comments[index].status = 'failed';
            }
        });
    };
    CommentComponent.prototype.pushNewComment = function (comment) {
        this.rootItem.comments.push(comment);
        this.scrollToBottom();
    };
    CommentComponent.prototype.getMsgIndexById = function (id) {
        return this.rootItem.comments.findIndex(function (e) { return e.messageId === id; });
    };
    CommentComponent.prototype.scrollToBottom = function () {
        var _this = this;
        setTimeout(function () {
            if (_this.content.scrollToBottom) {
                _this.content.scrollToBottom();
            }
        }, 400);
    };
    CommentComponent.prototype.focus = function () {
        if (this.messageInput && this.messageInput.nativeElement) {
            this.messageInput.nativeElement.focus();
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* Content */])
    ], CommentComponent.prototype, "content", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_8" /* ViewChild */])('comment_input'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["t" /* ElementRef */])
    ], CommentComponent.prototype, "messageInput", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["D" /* Input */])(),
        __metadata("design:type", Object)
    ], CommentComponent.prototype, "rootItem", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["D" /* Input */])(),
        __metadata("design:type", Object)
    ], CommentComponent.prototype, "user", void 0);
    CommentComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'comment',template:/*ion-inline-start:"/home/linkwok/Documents/ivdp/src/components/comment/comment.html"*/'<!-- Generated template for the CommentComponent component -->\n<div>\n  <div class="message-wrap" *ngIf="rootItem" >\n\n    <div *ngFor="let comment of rootItem.comments" class="message" [class.left]="comment.comment_by !== user.id" [class.right]="comment.comment_by === user.id">\n      <img class="user-img" [src]="comment.profile_pic ? comment.profile_pic : \'https://intranetstaging.herokuapp.com/assets/user_pic_missing.png\'"\n        alt="" src="">\n      <ion-spinner name="dots" *ngIf="comment.status === \'pending\'"></ion-spinner>\n      <label *ngIf="comment.status === \'failed\'" class=\'status liked\'>Failed</label>\n      <div class="msg-detail">\n        <!-- <div class="msg-info">\n          <p>{{comment.user}}</p>\n        </div> -->\n        <div class="msg-content">\n          <span class="triangle"></span>\n          <div [class]="comment.comment_by === user.id ? \'msg-info-right\':\'msg-info-left\'">\n            <p>{{comment.user}}</p>\n          </div>\n          <p class="line-breaker " [innerHTML]=\'comment.content\'></p>\n          <div [class]="comment.comment_by === user.id ? \'msg-info-right-time\':\'msg-info-left-time\'">\n            <p>{{comment.comment_time}}</p>\n          </div>\n        </div>\n\n      </div>\n    </div>\n    <div class="input-wrap" keyboard-attach [style.height]="\'55px\'">\n      <!-- <button ion-button clear icon-only item-right (click)="switchEmojiPicker()">\n            <ion-icon name="md-happy"></ion-icon>\n          </button> -->\n    \n      <ion-textarea name="comment_input" #comment_input placeholder="Type your comment" [(ngModel)]="editorComment" (focusin)="onFocus()"></ion-textarea>\n    \n      <button ion-button clear icon-only item-right (click)="sendComment()">\n        <ion-icon name="ios-send" ios="ios-send" md="md-send"></ion-icon>\n      </button>\n    </div>\n  </div>\n\n</div>'/*ion-inline-end:"/home/linkwok/Documents/ivdp/src/components/comment/comment.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* Events */],
            __WEBPACK_IMPORTED_MODULE_0__providers_data_setter_data_setter__["a" /* DataSetterProvider */]])
    ], CommentComponent);
    return CommentComponent;
}());

//# sourceMappingURL=comment.js.map

/***/ }),

/***/ 879:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GrievanceFilterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular_components_alert_alert_controller__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var GrievanceFilterPage = /** @class */ (function () {
    function GrievanceFilterPage(navCtrl, navParams, viewCtrl, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.alertCtrl = alertCtrl;
        this.grievanceWhose = [];
        console.log(this.navParams.data);
        var excludeWhoseGrievances = this.navParams.data.excludeWhoseGrievances;
        var grievanceWhoseList = this.navParams.data.grievanceWhoseList;
        grievanceWhoseList.forEach(function (whoseGrievance) {
            _this.grievanceWhose.push({
                name: whoseGrievance,
                isChecked: (excludeWhoseGrievances.indexOf(whoseGrievance) !== -1)
            });
        });
    }
    GrievanceFilterPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad GrievanceFilterPage');
    };
    GrievanceFilterPage.prototype.resetFilters = function () {
        // reset all of the toggles to be checked
        this.grievanceWhose.forEach(function (type) {
            type.isChecked = true;
        });
    };
    GrievanceFilterPage.prototype.applyFilters = function () {
        // Pass back a new array of track names to exclude
        var excludeGrievance = this.grievanceWhose.filter(function (c) { return c.isChecked; }).map(function (c) { return c.name; });
        console.log(excludeGrievance);
        this.dismiss(excludeGrievance);
    };
    GrievanceFilterPage.prototype.dismiss = function (grievanceWhose) {
        // using the injected ViewController this page
        // can "dismiss" itself and pass back data
        this.viewCtrl.dismiss(grievanceWhose);
    };
    GrievanceFilterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-grievance-filter',template:/*ion-inline-start:"/home/linkwok/Documents/ivdp/src/pages/grievance-filter/grievance-filter.html"*/'<ion-header>\n  <ion-toolbar>\n    <ion-buttons start>\n      <button ion-button (click)="dismiss()">Cancel</button>\n    </ion-buttons>\n\n    <ion-title>\n      Filter Grievance\n    </ion-title>\n\n    <ion-buttons end>\n      <button ion-button (click)="applyFilters()" strong>Done</button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content class="outer-content">\n\n  <ion-list>\n    <ion-list-header>Whose Grievances</ion-list-header>\n\n    <ion-item *ngFor="let whoseGrievance of grievanceWhose" [attr.whoseGrievance]="whoseGrievance.name | lowercase">\n      <span item-start class="dot"></span>\n      <ion-label text-capitalize>{{whoseGrievance.name}}</ion-label>\n      <ion-toggle [(ngModel)]="whoseGrievance.isChecked" color="secondary"></ion-toggle>\n    </ion-item>\n\n  </ion-list>\n\n  <ion-list>\n    <button ion-item (click)="resetFilters()" detail-none class="reset-filters">\n      Reset All Filters\n    </button>\n  </ion-list>\n\n</ion-content>'/*ion-inline-end:"/home/linkwok/Documents/ivdp/src/pages/grievance-filter/grievance-filter.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["o" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["p" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["s" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_0_ionic_angular_components_alert_alert_controller__["a" /* AlertController */]])
    ], GrievanceFilterPage);
    return GrievanceFilterPage;
}());

//# sourceMappingURL=grievance-filter.js.map

/***/ }),

/***/ 882:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AutoresizeDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
 * Generated class for the AutoresizeDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
var AutoresizeDirective = /** @class */ (function () {
    function AutoresizeDirective(element) {
        this.element = element;
    }
    AutoresizeDirective.prototype.onInput = function (textArea) {
        this.adjust();
    };
    AutoresizeDirective.prototype.ngOnInit = function () {
        this.adjust();
    };
    AutoresizeDirective.prototype.ngAfterViewInit = function () {
        this.adjust();
    };
    AutoresizeDirective.prototype.adjust = function () {
        var _this = this;
        setTimeout(function () {
            var ta = _this.element.nativeElement.querySelector("textarea"), newHeight;
            if (ta) {
                ta.style.overflow = "hidden";
                ta.style.height = "auto";
                if (_this.maxHeight) {
                    console.log('this.maxHeight', _this.maxHeight);
                    newHeight = Math.min(ta.scrollHeight, _this.maxHeight);
                    console.log('newHeight', newHeight);
                }
                else {
                    newHeight = ta.scrollHeight;
                }
                ta.style.height = newHeight + "px";
            }
        }, 500);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* HostListener */])('input', ['$event.target']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [HTMLTextAreaElement]),
        __metadata("design:returntype", void 0)
    ], AutoresizeDirective.prototype, "onInput", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('autoresize'),
        __metadata("design:type", Number)
    ], AutoresizeDirective.prototype, "maxHeight", void 0);
    AutoresizeDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Directive */])({
            selector: 'ion-textarea[autoresize]' // Attribute selector
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */]])
    ], AutoresizeDirective);
    return AutoresizeDirective;
}());

//# sourceMappingURL=autoresize.js.map

/***/ }),

/***/ 899:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_search_beneficiry_search_beneficiry__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_userblock_userblock__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular_components_alert_alert_controller__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_survey_list_survey_list__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_searchbeneficiry_searchbeneficiry__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_article_show_article_show__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_grievance_show_grievance_show__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_idea_show_idea_show__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_local_notifications__ = __webpack_require__(561);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_offline_offline__ = __webpack_require__(508);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_network__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_app_version__ = __webpack_require__(562);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_vibration__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_data_setter_data_setter__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_logout_logout__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_sync_sync__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_splash_screen__ = __webpack_require__(563);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_home_home__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ngx_translate_core__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_login_login__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__providers_user_data_ts__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__ionic_native_fcm__ = __webpack_require__(564);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__providers_app_global_app_global__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__providers_data_getter_service_data_getter_service__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26_lodash__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_26_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_profile_profile__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_maintenance_request_maintenance_request__ = __webpack_require__(82);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

//import { DatabaseProvider } from './../providers/database/database';

//import { DirectoryPage } from './../pages/directory/directory';











//import { ArticleIndexPage } from './../pages/article-index/article-index';








//import { GrievancePage } from "../pages/grievance/grievance";








var MyApp = /** @class */ (function () {
    function MyApp(translate, app, platform, splashScreen, config, plt, events, userData, fcm, localNotifications, appGlobal, dataGetter, dataSetter, vibrationCtrl, toastCtrl, appVersion, network, menuCtrl, alertCtrl) {
        var _this = this;
        this.translate = translate;
        this.app = app;
        this.platform = platform;
        this.splashScreen = splashScreen;
        this.config = config;
        this.plt = plt;
        this.events = events;
        this.userData = userData;
        this.fcm = fcm;
        this.localNotifications = localNotifications;
        this.appGlobal = appGlobal;
        this.dataGetter = dataGetter;
        this.dataSetter = dataSetter;
        this.vibrationCtrl = vibrationCtrl;
        this.toastCtrl = toastCtrl;
        this.appVersion = appVersion;
        this.network = network;
        this.menuCtrl = menuCtrl;
        this.alertCtrl = alertCtrl;
        this.loggedInPages = [
            { title: 'Dashboard', name: 'HomePage', component: __WEBPACK_IMPORTED_MODULE_19__pages_home_home__["a" /* HomePage */], icon: 'home' }
        ];
        // { title: 'Beneficiary', name: "IdeaPage", component: MaintenanceRequestPage, icon: 'people', countName: 'Idea' },
        // { title: 'Surveys', name: "SurveyListPage", component: SurveyListPage, icon: 'list-box' },
        this.myVoicePages = [
            { title: 'Beneficiary', name: "SearchbeneficiryPage", component: __WEBPACK_IMPORTED_MODULE_4__pages_searchbeneficiry_searchbeneficiry__["a" /* SearchbeneficiryPage */], icon: 'people', countName: 'Idea' },
            { title: 'Search', name: "Search", component: __WEBPACK_IMPORTED_MODULE_0__pages_search_beneficiry_search_beneficiry__["a" /* SearchBeneficiryPage */], icon: 'search' },
            { title: 'Surveys', name: "SurveyListPage", component: __WEBPACK_IMPORTED_MODULE_3__pages_survey_list_survey_list__["a" /* SurveyListPage */], icon: 'list-box' }
        ];
        //{ title: 'KYC', name: "GrievancePage", component: GrievancePage, icon: 'body', countName: 'Grievance' }
        this.loggedOutPages = [
            { title: 'Sync', name: 'SyncPage', component: __WEBPACK_IMPORTED_MODULE_15__pages_sync_sync__["a" /* SyncPage */], icon: 'sync' },
            { title: 'Logout', name: 'LogoutPage', component: __WEBPACK_IMPORTED_MODULE_14__pages_logout_logout__["a" /* LogoutPage */], icon: 'log-out', logsOut: true }
        ];
        this.pagesCounts = [];
        this.userprofile_sample = "assets/img/user_sample.jpg";
        this.userData.getHasLoggedIn().then(function (hasLoggedIn) {
            if (hasLoggedIn) {
                console.log("HASLOGGEDIN TOKEN SEND");
                _this.dataSetter.sendNotificationToken();
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_19__pages_home_home__["a" /* HomePage */];
            }
            else {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_21__pages_login_login__["a" /* LoginPage */];
            }
            _this.initializeApp();
        });
        this.listenToLoginEvents();
        this.events.subscribe('app:setRootAsHome', function () {
            _this.openPage(_this.loggedInPages[0]);
        });
        this.events.subscribe('userdata:changed', function () {
            _this.username = _this.userData.userData.name;
            _this.userprofile = _this.userData.userData.profile;
        });
        // used for an example of ngFor and navigation
    }
    MyApp.prototype.openProfile = function () {
        console.log("openProfile");
        this.nav.push(__WEBPACK_IMPORTED_MODULE_27__pages_profile_profile__["a" /* ProfilePage */]).catch(function (err) {
            console.log("Didn't set nav root: " + err);
        });
        // this.openPage({
        //   title: 'Profile',
        //   name: 'ProfilePage',
        //   component: ProfilePage,
        //   icon: 'home'
        // });
    };
    MyApp.prototype.initAppVersion = function () {
        var _this = this;
        this.appVersion.getVersionNumber().then(function (data) {
            console.log("Application Version", data);
            _this.applicationVersion = data;
            _this.appGlobal.applicationVersion = data;
            _this.applicationVersion = "1.1s";
            _this.appGlobal.applicationVersion = "1.1s";
        });
        this.appVersion.getAppName().then(function (data) {
            console.log("Application Name", data);
            _this.appGlobal.applicationName = data;
        });
    };
    MyApp.prototype.initializeFCM = function () {
        var _this = this;
        if (this.platform.is('android') || this.platform.is('ios')) {
            console.log("CORDOVA DETECTED", this.platform.platforms());
            this.fcm.getToken().then(function (token) {
                console.log("TOKEN:", token);
                if (token !== null) {
                    _this.userData.setUserFCMToken(token);
                }
            });
            this.fcm.onTokenRefresh().subscribe(function (token) {
                console.log("TOKEN REFRESHED:", token);
                if (_this.userData.fcmToken !== token) {
                    _this.userData.setUserFCMToken(token);
                    _this.userData.setUserFCMTokenStatus(false);
                }
            });
            this.fcm.onNotification().subscribe(function (data) {
                console.log("Notification", data);
                if (data.wasTapped) {
                    console.log("Received in background", JSON.stringify(data));
                    _this.processNotification(data);
                }
                else {
                    console.log("Received in foreground", JSON.stringify(data));
                    _this.localNotifications.schedule({
                        id: data.notificationId,
                        title: data.notificationTitle,
                        text: data.notificationBody,
                        icon: data.notificationIcon,
                        smallIcon: data.notificationSmallIcon,
                        color: data.notificationColor,
                        data: data
                    });
                }
            });
            // this.localNotifications.on('click', (notification) => {
            //   this.processNotification(notification.data);
            // });
        }
    };
    MyApp.prototype.processNotification = function (data) {
        var page, reloadType;
        switch (data.type) {
            case "idea":
                page = __WEBPACK_IMPORTED_MODULE_7__pages_idea_show_idea_show__["a" /* IdeaShowPage */];
                reloadType = 'reload:ideaShow';
                break;
            case "grievance":
                page = __WEBPACK_IMPORTED_MODULE_6__pages_grievance_show_grievance_show__["a" /* GrievanceShowPage */];
                reloadType = 'reload:grievanceShow';
                break;
            case "cms":
                page = __WEBPACK_IMPORTED_MODULE_5__pages_article_show_article_show__["a" /* ArticleShowPage */];
                reloadType = 'reload:articleShow';
                break;
            case "maintenance_requests":
                page = __WEBPACK_IMPORTED_MODULE_28__pages_maintenance_request_maintenance_request__["a" /* MaintenanceRequestPage */];
                reloadType = 'reload:maintenance-request';
                break;
            default:
                console.log("Notification TYPE NOT FOUND");
                break;
        }
        if (page) {
            if (this.nav.getActive().instance instanceof page) {
                this.events.publish(reloadType, true, data.uid);
            }
            else {
                this.nav.push(page, { isNotification: true, id: data.uid });
            }
        }
    };
    MyApp.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.nav.viewDidEnter.subscribe(function (view) {
            _this.applicationVersion = "1.1s";
            _this.appGlobal.applicationVersion = "1.1s";
            console.log("viewDidEnter", view.instance);
            var pageName = view.instance;
            if (!(pageName instanceof __WEBPACK_IMPORTED_MODULE_21__pages_login_login__["a" /* LoginPage */]) && !(pageName instanceof __WEBPACK_IMPORTED_MODULE_9__pages_offline_offline__["a" /* OfflinePage */]) && !(pageName instanceof __WEBPACK_IMPORTED_MODULE_1__pages_userblock_userblock__["a" /* UserblockPage */])) {
                //this.updateMenuCounts();
                //this.updateUserProfile();
                _this.username = _this.userData.userData.name;
                _this.userprofile = _this.userData.userData.profile;
                if (_this.userData.userData.new_user) {
                    _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_1__pages_userblock_userblock__["a" /* UserblockPage */]);
                }
                // this.askForLunch();
            }
            //if (!this.appGlobal.isOnline ) {
            if (false) {
                // if (pageName instanceof this.rootPage) {
                //   this.nav.push(OfflinePage);
                // }
            }
            if (pageName instanceof __WEBPACK_IMPORTED_MODULE_21__pages_login_login__["a" /* LoginPage */] || pageName instanceof __WEBPACK_IMPORTED_MODULE_9__pages_offline_offline__["a" /* OfflinePage */] || pageName instanceof __WEBPACK_IMPORTED_MODULE_1__pages_userblock_userblock__["a" /* UserblockPage */]) {
                _this.menuCtrl.swipeEnable(false);
            }
            else {
                _this.menuCtrl.swipeEnable(true);
            }
        });
    };
    MyApp.prototype.updateMenuCounts = function () {
        var _this = this;
        this.dataGetter.updateMenuCounts().subscribe(function (data) {
            console.log('Update Menu Counts', data);
            if (data.success) {
                _this.pagesCounts = data.data;
                // this.pagesCounts = [
                //   { "name": "ServiceRequest", "count": Math.floor((Math.random() * 30) + 1) },
                //   { "name": "Idea", "count": Math.floor((Math.random() * 30) + 1) },
                //   { "name": "Articles", "count": Math.floor((Math.random() * 30) + 1) },
                //   { "name": "Grievance", "count": Math.floor((Math.random() * 30) + 1) }
                // ];
                // console.log('Update Menu Counts------------', this.pagesCounts);
            }
        }, function (error) {
            console.log("Update Menu Counts", error);
        });
    };
    MyApp.prototype.getCount = function (countName) {
        var object = __WEBPACK_IMPORTED_MODULE_26_lodash__["find"](this.pagesCounts, { name: countName });
        if (object !== undefined) {
            return object.count;
        }
        else {
            return 0;
        }
    };
    MyApp.prototype.askForLunch = function () {
        this.dataGetter.getLunchStatus().subscribe(function (data) {
            console.log('Get Lunch Status', data);
            // if (data.show) {
            if (false) {
                // let alert = this.alertCtrl.create({
                //   subTitle: data.question,
                //   buttons: [
                //     {
                //       text: 'No',
                //       handler: data => {
                //         this.dataSetter.sendLunchResponse("no");
                //       }
                //     },
                //     {
                //       text: 'Yes',
                //       handler: data => {
                //         this.dataSetter.sendLunchResponse("yes");
                //       }
                //     }
                //   ]
                // });
                // alert.present();
            }
        }, function (err) {
            console.log(err);
        });
    };
    MyApp.prototype.updateUserProfile = function () {
        var _this = this;
        this.dataGetter.updateUserProfile({
            updated_at: this.userData.userData.updated_at
        }).subscribe(function (data) {
            console.log('Get User Status', data);
            if (data.success) {
                _this.userData.setUserData(data);
                _this.username = data.name;
                _this.userprofile = data.profile;
                console.log("isNewUser", data.new_user);
                if (data.new_user) {
                    _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_1__pages_userblock_userblock__["a" /* UserblockPage */]);
                }
            }
        }, function (error) {
            console.log("updateUserProfile", error);
        });
    };
    MyApp.prototype.listenToNetworkEvents = function () {
        var _this = this;
        console.log("listenToNetworkEvents");
        this.network.onDisconnect().subscribe(function () {
            console.log('network was disconnected :-(');
            console.log("onDisconnect", _this.appGlobal.isOnline);
            if (_this.appGlobal.isOnline) {
                _this.appGlobal.isOnline = false;
                //this.nav.push(OfflinePage);
            }
        });
        this.network.onConnect().subscribe(function () {
            console.log('network connected!');
            // We just got a connection but we need to wait briefly
            // before we determine the connection type. Might need to wait.
            // prior to doing any api requests as well.
            setTimeout(function () {
                console.log("NETWORK TYPE", _this.network.type);
                if (_this.network.type !== 'none') {
                    console.log('we got a wifi connection, woohoo!');
                    console.log("isOnline", _this.appGlobal.isOnline);
                    if (!_this.appGlobal.isOnline) {
                        _this.appGlobal.isOnline = true;
                        console.log("Can Go Back", _this.nav.canGoBack());
                        if (_this.nav.canGoBack()) {
                            _this.nav.pop();
                        }
                        else {
                            _this.events.publish('app:setRootAsHome');
                        }
                    }
                }
            }, 3000);
        });
        if (this.network.type !== 'none') {
            console.log("listenToNetworkEvents ONline");
            this.appGlobal.isOnline = true;
        }
    };
    MyApp.prototype.initTranslate = function () {
        var _this = this;
        // Set the default language for translation strings, and the current language.
        this.translate.setDefaultLang('en');
        var browserLang = this.translate.getBrowserLang();
        if (browserLang) {
            if (browserLang === 'zh') {
                var browserCultureLang = this.translate.getBrowserCultureLang();
                if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
                    this.translate.use('zh-cmn-Hans');
                }
                else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
                    this.translate.use('zh-cmn-Hant');
                }
            }
            else {
                this.translate.use(this.translate.getBrowserLang());
            }
        }
        else {
            this.translate.use('en'); // Set your language here
        }
        this.translate.get(['BACK_BUTTON_TEXT']).subscribe(function (values) {
            _this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
        });
    };
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.initAppVersion();
            // this.initBackgroundGeolocation();
            //this.listenToNetworkEvents();
            _this.initializeFCM();
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            // this.statusBar.styleDefault();
            _this.splashScreen.hide();
            _this.platform.registerBackButtonAction(function () {
                var overlay = _this.app._appRoot._overlayPortal.getActive();
                var modal = _this.app._appRoot._modalPortal.getActive();
                var nav = _this.nav;
                var view = _this.nav.getActive();
                var closeDelay = 2000;
                var spamDelay = 500;
                if (modal && modal.dismiss) {
                    modal.dismiss();
                }
                else if (overlay && overlay.dismiss) {
                    overlay.dismiss();
                }
                else if (nav.canGoBack()) {
                    nav.pop();
                }
                else if (!(view.instance instanceof __WEBPACK_IMPORTED_MODULE_19__pages_home_home__["a" /* HomePage */]) && !(view.instance instanceof __WEBPACK_IMPORTED_MODULE_21__pages_login_login__["a" /* LoginPage */])) {
                    _this.openPage(_this.loggedInPages[0]);
                }
                else if (Date.now() - _this.lastBack > spamDelay && !_this.allowClose) {
                    _this.allowClose = true;
                    var toast = _this.toastCtrl.create({
                        message: _this.translate.instant("Press back button again to exit"),
                        duration: closeDelay,
                        dismissOnPageChange: true
                    });
                    toast.onDidDismiss(function () {
                        _this.allowClose = false;
                    });
                    toast.present();
                }
                else if (Date.now() - _this.lastBack < closeDelay && _this.allowClose) {
                    _this.platform.exitApp();
                }
                _this.lastBack = Date.now();
            });
        });
        this.initTranslate();
    };
    // openPage(page) {
    //   // Reset the content nav to have just this page
    //   // we wouldn't want the back button to show in this scenario
    //   this.nav.setRoot(page.component);
    // }
    MyApp.prototype.openPage = function (page) {
        var params = {};
        if (page.logsOut === true) {
            this.dataSetter.sendNotificationClear();
            this.userData.setUserFCMTokenStatus(false);
            this.userData.logout();
        }
        else {
            this.nav.setRoot(page.component, params).catch(function (err) {
                console.log("Didn't set nav root: " + err);
            });
        }
    };
    MyApp.prototype.listenToLoginEvents = function () {
        var _this = this;
        this.events.subscribe('user:login', function () {
            var toast = _this.toastCtrl.create({
                message: 'Logged In Successfully.',
                duration: 3000
            });
            toast.present();
            if (_this.platform.is('android') || _this.platform.is('ios')) {
                _this.fcm.getToken().then(function (token) {
                    console.log("TOKEN:", token);
                    if (token !== null) {
                        _this.userData.setUserFCMToken(token);
                        console.log("LOGIN TOKEN SEND");
                        _this.dataSetter.sendNotificationToken();
                    }
                });
            }
            // this.backgroundGeolocation.start();
            // this.nav.setRoot(HomePage);
            _this.rootPage = __WEBPACK_IMPORTED_MODULE_19__pages_home_home__["a" /* HomePage */];
            _this.content.scrollToTop();
        });
        this.events.subscribe('user:logout', function () {
            // this.nav.setRoot(LoginPage);
            _this.username = '';
            _this.userprofile = '';
            _this.vibrationCtrl.vibrate(1000);
            var toast = _this.toastCtrl.create({
                message: 'Logged Out Successfully.',
                duration: 3000
            });
            toast.present();
            // this.backgroundGeolocation.stop();
            _this.rootPage = __WEBPACK_IMPORTED_MODULE_21__pages_login_login__["a" /* LoginPage */];
            _this.content.scrollToTop();
        });
        this.events.subscribe('fcmToken:changed', function () {
            console.log("TOKEN CHANGED & SENDING");
            _this.dataSetter.sendNotificationToken();
        });
        this.events.subscribe('fcm_token:sent', function () {
            _this.userData.setUserFCMTokenStatus(true);
        });
    };
    MyApp.prototype.isActive = function (page) {
        var childNav = this.nav.getActiveChildNavs()[0];
        // Tabs are a special case because they have their own navigation
        if (childNav) {
            if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
                return 'primary';
            }
            return;
        }
        if (this.nav.getActive() && this.nav.getActive().instance instanceof page.component) {
            return 'primary';
        }
        return;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_16__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_17_ionic_angular__["e" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_17_ionic_angular__["e" /* Content */])
    ], MyApp.prototype, "content", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_16__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_17_ionic_angular__["n" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_17_ionic_angular__["n" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_16__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/linkwok/Documents/ivdp/src/app/app.html"*/'<!-- <ion-split-pane> -->\n\n<ion-menu id="loggedInMenu" [content]="content">\n\n  <!-- <ion-header>\n    <ion-toolbar>\n      <ion-title>EmPower</ion-title>\n      <ion-title>{{username}}</ion-title>\n    </ion-toolbar>\n  </ion-header> -->\n\n  <ion-content class="outer-content">\n    <ion-item menuClose (click)="openProfile()">\n      <ion-avatar item-start>\n        <img src="{{userprofile_sample}}" style="width:5em; height:5em; border:3px solid gray;">\n        <!-- <img src="{{userprofile}}" style="width:5em; height:5em; border:3px solid gray;"> -->\n      </ion-avatar>\n      <ion-title>{{username}}</ion-title>\n    </ion-item>\n\n    <ion-list>\n      <button ion-item menuClose *ngFor="let p of loggedInPages" (click)="openPage(p)">\n        <ion-icon item-start [name]="p.icon" [color]="isActive(p)"></ion-icon>\n        {{p.title}}\n        <ion-badge item-end color="light" *ngIf="p.countName && getCount(p.countName) > 0">{{getCount(p.countName)}}\n        </ion-badge>\n      </button>\n    </ion-list>\n\n    <ion-list>\n      <ion-list-header style="margin-bottom: 0;">\n        My Features\n      </ion-list-header>\n      <button ion-item menuClose *ngFor="let p of myVoicePages" (click)="openPage(p)">\n        <ion-icon item-start [name]="p.icon" [color]="isActive(p)"></ion-icon>\n        {{p.title}}\n      </button>\n    </ion-list>\n\n  <!--   <ion-list>\n      <ion-list-header style="margin-bottom: 0;">\n        IT\n      </ion-list-header>\n      <button ion-item menuClose *ngFor="let p of itPages" (click)="openPage(p)">\n        <ion-icon item-start [name]="p.icon" [color]="isActive(p)"></ion-icon>\n        {{p.title}}\n      </button>\n    </ion-list>\n\n    <ion-list>\n      <ion-list-header style="margin-bottom: 0;">\n        HR\n      </ion-list-header>\n      <button ion-item menuClose *ngFor="let p of hrPages" (click)="openPage(p)">\n        <ion-icon item-start [name]="p.icon" [color]="isActive(p)"></ion-icon>\n        {{p.title}}\n      </button>\n    </ion-list>\n\n    <ion-list>\n      <ion-list-header style="margin-bottom: 0;">\n        Company\n      </ion-list-header>\n      <button ion-item menuClose *ngFor="let p of companyPages" (click)="openPage(p)">\n        <ion-icon item-start [name]="p.icon" [color]="isActive(p)"></ion-icon>\n        {{p.title}}\n      </button>\n    </ion-list>\n\n    <ion-list>\n      <ion-list-header style="margin-bottom: 0;">\n        Services\n      </ion-list-header>\n      <button ion-item menuClose *ngFor="let p of servicesPages" (click)="openPage(p)">\n        <ion-icon item-start [name]="p.icon" [color]="isActive(p)"></ion-icon>\n        {{p.title}}\n      </button>\n    </ion-list>\n -->\n    <ion-list>\n      <ion-list-header style="margin-bottom: 0;">\n        Account\n      </ion-list-header>\n      <button ion-item menuClose *ngFor="let p of loggedOutPages" (click)="openPage(p)">\n        <ion-icon item-start [name]="p.icon" [color]="isActive(p)"></ion-icon>\n        {{p.title}}\n      </button>\n    </ion-list>\n\n    <ion-list>\n      <ion-list-header style="margin-bottom: 0;">\n        About the App\n      </ion-list-header>\n      <ion-title left>\n        <h6 class="version">Version: {{applicationVersion}}</h6>\n        <h6 class="version">Server: {{appGlobal.server}}</h6>\n        <h6 class="version">Powered by: Deepak Cybit Pvt. Ltd.</h6>\n      </ion-title>\n    </ion-list>\n  </ion-content>\n\n  <!-- <ion-footer>\n    <ion-title left>\n      <h6 class="version">Version: {{applicationVersion}}</h6>\n      <h6 class="version">Powered By: Deepak Cybit Pvt. Ltd.</h6>\n    </ion-title>\n  </ion-footer> -->\n\n</ion-menu>\n\n<!-- </ion-split-pane> -->\n\n<!-- <ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu> -->\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false" main name="MyApp"></ion-nav>\n'/*ion-inline-end:"/home/linkwok/Documents/ivdp/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_20__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_17_ionic_angular__["c" /* App */],
            __WEBPACK_IMPORTED_MODULE_17_ionic_angular__["q" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_18__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_17_ionic_angular__["d" /* Config */],
            __WEBPACK_IMPORTED_MODULE_17_ionic_angular__["q" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_17_ionic_angular__["f" /* Events */],
            __WEBPACK_IMPORTED_MODULE_22__providers_user_data_ts__["a" /* UserData */],
            __WEBPACK_IMPORTED_MODULE_23__ionic_native_fcm__["a" /* FCM */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_local_notifications__["a" /* LocalNotifications */],
            __WEBPACK_IMPORTED_MODULE_24__providers_app_global_app_global__["a" /* AppGlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_25__providers_data_getter_service_data_getter_service__["a" /* DataGetterServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_13__providers_data_setter_data_setter__["a" /* DataSetterProvider */],
            __WEBPACK_IMPORTED_MODULE_12__ionic_native_vibration__["a" /* Vibration */],
            __WEBPACK_IMPORTED_MODULE_17_ionic_angular__["r" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_app_version__["a" /* AppVersion */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_network__["a" /* Network */],
            __WEBPACK_IMPORTED_MODULE_17_ionic_angular__["l" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular_components_alert_alert_controller__["a" /* AlertController */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 905:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LeaveDataProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_global_app_global__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__user_data_ts__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(266);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_of__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ionic_angular_components_loading_loading_controller__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_lodash__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ionic_angular_components_toast_toast_controller__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












/*
  Generated class for the LeaveDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var LeaveDataProvider = /** @class */ (function () {
    function LeaveDataProvider(http, user, loadingCtrl, toastCtrl, appGlobal, events) {
        this.http = http;
        this.user = user;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.appGlobal = appGlobal;
        this.events = events;
        this.isUserAvailable = true;
        console.log('Hello LeaveDataProvider Provider');
    }
    // load():any {
    //   this.user.getUserData().then((value) => {
    //     this.userData = value;
    //     return this.loadLeaves().then(() => {
    //     });
    //   });
    // }
    LeaveDataProvider.prototype.load = function (update, segment) {
        var _this = this;
        if (!this.isUserAvailable) {
            update = true;
        }
        this.userData = this.user.userData;
        this.segment = segment;
        console.log("Update & Segment", update, segment);
        if (segment === 'all') {
            if (this.allLeavesData && !update
                && (this.userData.employee_id === this.allLeavesData.employee_id)) {
                this.data = this.allLeavesData;
                return __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__["Observable"].of(this.data);
            }
            else {
                this.loading = this.loadingCtrl.create({
                    content: 'Please wait...'
                });
                this.loading.present();
                var httpOptions = {
                    headers: new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({
                        'Content-Type': 'application/json',
                    })
                };
                var body = {
                    Emp_Code: this.userData.employee_id,
                    FromDate: "01/01/1800",
                    ToDate: "01/01/2099"
                };
                return this.http.post(this.appGlobal.getLeaveApplicationsURL, body, httpOptions)
                    .map(this.processData, this)
                    .catch(function (err) {
                    console.log("Error", err);
                    return __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__["Observable"].of(_this.processData(err.error));
                });
            }
        }
        else if (segment === 'pending') {
            console.log("update & segment", update, segment);
            if (this.pendingLeavesData && !update
                && (this.userData.employee_id === this.pendingLeavesData.employee_id)) {
                this.data = this.pendingLeavesData;
                return __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__["Observable"].of(this.data);
            }
            else {
                this.loading = this.loadingCtrl.create({
                    content: 'Please wait...'
                });
                this.loading.present();
                var httpOptions = {
                    headers: new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({
                        'Content-Type': 'application/json',
                    })
                };
                var body = {
                    Emp_Code: this.userData.employee_id
                };
                return this.http.post(this.appGlobal.pendingLeaveApplicationsURL, body, httpOptions)
                    .map(this.processData, this)
                    .catch(function (err) {
                    console.log("Error", err);
                    return __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__["Observable"].of(_this.processData(err.error));
                });
            }
        }
    };
    LeaveDataProvider.prototype.processData = function (data) {
        this.loading.dismiss();
        console.log("========================", data);
        console.log("++++++++++++++++++++++++++", this.segment);
        data.segment = this.segment;
        data.employee_id = this.userData.employee_id;
        if (!__WEBPACK_IMPORTED_MODULE_9_lodash__["isArray"](data.data)) {
            data.data = [];
            if (data.message) {
                if (data.message == this.appGlobal.OrangeNoUserAvailable) {
                    this.isUserAvailable = false;
                    this.events.publish('leaves:exit');
                }
                var toast = this.toastCtrl.create({
                    message: data.message,
                    duration: 3000
                });
                toast.present();
            }
        }
        if (this.segment === 'all') {
            this.allLeavesData = data;
        }
        else if (this.segment === 'pending') {
            this.pendingLeavesData = data;
        }
        this.data = data;
        return this.data;
    };
    LeaveDataProvider.prototype.getLeaves = function (update, queryText, excludeLeaveType, excludeLeaveStatues, segment) {
        var _this = this;
        if (queryText === void 0) { queryText = ''; }
        if (excludeLeaveType === void 0) { excludeLeaveType = []; }
        if (excludeLeaveStatues === void 0) { excludeLeaveStatues = []; }
        if (segment === void 0) { segment = 'all'; }
        console.log("segment", segment);
        return this.load(update, segment).map(function (data) {
            if (!__WEBPACK_IMPORTED_MODULE_9_lodash__["isArray"](data.data)) {
                data.data = [];
            }
            data.shownLeaves = 0;
            queryText = queryText.toLowerCase().replace(/,|\.|-/g, ' ');
            var queryWords = queryText.split(' ').filter(function (w) { return !!w.trim().length; });
            data.data.forEach(function (leave) {
                _this.filterLeaves(leave, queryWords, excludeLeaveType, excludeLeaveStatues, segment);
                if (!leave.hide) {
                    data.shownLeaves++;
                }
            });
            return data;
        });
    };
    LeaveDataProvider.prototype.filterLeaves = function (leave, queryWords, excludeLeaveType, excludeLeaveStatues, segment) {
        var matchesQueryText = false;
        if (queryWords.length) {
            queryWords.forEach(function (queryWord) {
                if (leave.Leave_Reason.toLowerCase().indexOf(queryWord) > -1) {
                    matchesQueryText = true;
                }
            });
        }
        else {
            matchesQueryText = true;
        }
        var matchesLeaveType = false;
        if (excludeLeaveType.indexOf(leave.Leave_Name) === -1) {
            matchesLeaveType = true;
        }
        var matchesLeaveStatus = false;
        if (excludeLeaveStatues.indexOf(leave.AppStatus) === -1) {
            matchesLeaveStatus = true;
        }
        leave.hide = !(matchesQueryText && matchesLeaveType && matchesLeaveStatus);
    };
    LeaveDataProvider.prototype.loadCurrent = function () {
        return __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__["Observable"].of(this.data.data);
    };
    LeaveDataProvider.prototype.getLeaveTypes = function () {
        return this.loadCurrent().map(function (data) {
            // console.log(data);
            var leaveTypes = __WEBPACK_IMPORTED_MODULE_9_lodash__["uniq"](data.map(function (leave) { return leave.Leave_Name; })).sort();
            console.log(leaveTypes);
            return leaveTypes;
        });
    };
    LeaveDataProvider.prototype.getLeaveStatus = function () {
        return this.loadCurrent().map(function (data) {
            // console.log(data);
            var leaveStatues = __WEBPACK_IMPORTED_MODULE_9_lodash__["uniq"](data.map(function (leave) { return leave.AppStatus; })).sort();
            console.log(leaveStatues);
            return leaveStatues;
        });
    };
    LeaveDataProvider.prototype.doLeaveApproval = function (leaveData, application_status, application_comment) {
        var _this = this;
        return new Promise(function (resolve) {
            var loading = _this.loadingCtrl.create({
                content: 'Please wait...'
            });
            loading.present();
            var httpOptions = {
                headers: new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({
                    'Content-Type': 'application/json',
                })
            };
            var body = {
                UserEmpID: leaveData.Emp_ID.toString(),
                Cmp_ID: leaveData.Cmp_ID.toString(),
                Leave_ID: leaveData.Leave_ID.toString(),
                Leave_Application_ID: leaveData.Leave_Application_ID.toString(),
                From_Date: leaveData.From_Date.toString(),
                Leave_Period: leaveData.Leave_Period.toString(),
                To_Date: leaveData.To_Date.toString(),
                Comment: leaveData.Leave_Reason.toString(),
                AppStatus: application_status.toString(),
                AppComment: application_comment.toString(),
                Final_Approver: leaveData.Final_Approver.toString(),
                Is_Fwd_Leave_Rej: leaveData.Is_Fwd_Leave_Rej.toString(),
                Rpt_Level: leaveData.Rpt_Level.toString(),
                Emp_Code: _this.userData.employee_id.toString(),
            };
            _this.http.post(_this.appGlobal.leaveApprovalURL, body, httpOptions).subscribe(function (data) {
                loading.dismiss();
                console.log("Leave Approval Resolved");
                resolve(data);
            }, function (err) {
                console.log("Leave Approval", err);
                loading.dismiss();
                var toast = _this.toastCtrl.create({
                    message: "Sorry someting went wrong, Please try later",
                    duration: 3000
                });
                toast.present();
            });
        });
    };
    LeaveDataProvider.prototype.loadLeaveDetails = function (Leave_Application_ID) {
        var _this = this;
        console.log("Leave_Application_ID", Leave_Application_ID);
        return new Promise(function (resolve) {
            var loading = _this.loadingCtrl.create({
                content: 'Please wait...'
            });
            loading.present();
            var httpOptions = {
                headers: new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({
                    'Content-Type': 'application/json',
                })
            };
            var body = {
                LeaveAppId: Leave_Application_ID.toString()
            };
            _this.http.post(_this.appGlobal.leaveDetailsURL, body, httpOptions).subscribe(function (data) {
                loading.dismiss();
                console.log("Leave Application Details Resolved");
                resolve(data);
            }, function (err) {
                console.log("Leave Application Details", err);
                loading.dismiss();
                var toast = _this.toastCtrl.create({
                    message: "Sorry someting went wrong, Please try later",
                    duration: 3000
                });
                toast.present();
            });
        });
    };
    LeaveDataProvider.prototype.loadLeaveRecords = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var loading = _this.loadingCtrl.create({
                content: 'Please wait...'
            });
            loading.present();
            var httpOptions = {
                headers: new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({
                    'Content-Type': 'application/json',
                })
            };
            var body = {
                Emp_Code: _this.userData.employee_id.toString()
            };
            _this.http.post(_this.appGlobal.leaveRecordsURL, body, httpOptions).subscribe(function (data) {
                loading.dismiss();
                console.log("Leave Records Resolved");
                resolve(data);
            }, function (err) {
                console.log("Leave Records", err);
                loading.dismiss();
                var toast = _this.toastCtrl.create({
                    message: "Sorry someting went wrong, Please try later",
                    duration: 3000
                });
                toast.present();
            });
        });
    };
    LeaveDataProvider.prototype.checkScheme = function (leaveType) {
        var _this = this;
        return new Promise(function (resolve) {
            var loading = _this.loadingCtrl.create({
                content: 'Please wait...'
            });
            loading.present();
            var httpOptions = {
                headers: new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({
                    'Content-Type': 'application/json',
                })
            };
            var body = {
                Emp_Code: _this.userData.employee_id.toString(),
                LeaveID: leaveType.toString()
            };
            _this.http.post(_this.appGlobal.checkSchemeURL, body, httpOptions).subscribe(function (data) {
                loading.dismiss();
                console.log("Check Scheme Resolved");
                resolve(data);
            }, function (err) {
                console.log("Check Scheme Records", err);
                loading.dismiss();
                var toast = _this.toastCtrl.create({
                    message: "Sorry someting went wrong, Please try later",
                    duration: 3000
                });
                toast.present();
            });
        });
    };
    LeaveDataProvider.prototype.getHalfLeaveRecords = function (leaveApplication) {
        var _this = this;
        return new Promise(function (resolve) {
            var loading = _this.loadingCtrl.create({
                content: 'Please wait...'
            });
            loading.present();
            var httpOptions = {
                headers: new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({
                    'Content-Type': 'application/json',
                })
            };
            var body = {
                Emp_Code: _this.userData.employee_id.toString(),
                FromDate: leaveApplication.fromDate.toString(),
                Period: leaveApplication.period.toString()
            };
            _this.http.post(_this.appGlobal.getHalfLeaveRecordsURL, body, httpOptions).subscribe(function (data) {
                loading.dismiss();
                console.log("Get Half Leave Records Resolved");
                resolve(data);
            }, function (err) {
                console.log("Get Half Leave Records", err);
                loading.dismiss();
                var toast = _this.toastCtrl.create({
                    message: "Sorry someting went wrong, Please try later",
                    duration: 3000
                });
                toast.present();
            });
        });
    };
    LeaveDataProvider.prototype.leaveApplication = function (leaveApplication, strType) {
        var _this = this;
        return new Promise(function (resolve) {
            var loading = _this.loadingCtrl.create({
                content: 'Please wait...'
            });
            loading.present();
            var httpOptions = {
                headers: new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({
                    'Content-Type': 'application/json',
                })
            };
            var body = {};
            if (strType === 'I') {
                body = {
                    Emp_Code: _this.userData.employee_id.toString(),
                    LeaveID: leaveApplication.leaveType.toString(),
                    FromDate: leaveApplication.fromDate.toString(),
                    Period: leaveApplication.period.toString(),
                    Todate: leaveApplication.toDate.toString(),
                    AssignAs: leaveApplication.assignAs.toString(),
                    Comment: leaveApplication.comment.toString(),
                    HLeaveDate: leaveApplication.halfLeaveDate.toString(),
                    strType: strType.toString(),
                };
            }
            else if (strType === 'V') {
                body = {
                    Emp_Code: _this.userData.employee_id.toString(),
                    LeaveID: leaveApplication.leaveType.toString(),
                    FromDate: leaveApplication.fromDate.toString(),
                    Period: leaveApplication.period.toString(),
                    strType: strType.toString(),
                };
            }
            _this.http.post(_this.appGlobal.leaveApplicationURL, body, httpOptions).subscribe(function (data) {
                loading.dismiss();
                console.log("Leave Application " + strType + " Resolved");
                resolve(data);
            }, function (err) {
                console.log("Leave Application " + strType, err);
                loading.dismiss();
                var toast = _this.toastCtrl.create({
                    message: "Sorry someting went wrong, Please try later",
                    duration: 3000
                });
                toast.present();
            });
        });
    };
    LeaveDataProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__user_data_ts__["a" /* UserData */], __WEBPACK_IMPORTED_MODULE_8_ionic_angular_components_loading_loading_controller__["a" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_10_ionic_angular_components_toast_toast_controller__["a" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_0__app_global_app_global__["a" /* AppGlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_11_ionic_angular__["f" /* Events */]])
    ], LeaveDataProvider);
    return LeaveDataProvider;
}());

//# sourceMappingURL=leave-data.js.map

/***/ }),

/***/ 910:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

// import { AboutPage } from '../about/about';
// import { ContactPage } from '../contact/contact';
// import { HomePage } from '../home/home';
// import { InventoryPage } from "../inventory/inventory";
var TabsPage = /** @class */ (function () {
    // tab1Root = HomePage;
    // tab2Root = AboutPage;
    // tab3Root = ContactPage;
    // tab4Root = InventoryPage;
    function TabsPage() {
    }
    TabsPage.prototype.homeclick = function () {
        //alert("This is home click");
    };
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/linkwok/Documents/ivdp/src/pages/tabs/tabs.html"*/'<ion-tabs>\n  <ion-tab [root]="tab1Root" (ionSelect)="homeclick()" tabTitle="Home" tabIcon="home" ></ion-tab>\n  <ion-tab [root]="tab4Root" tabTitle="Inventory" tabIcon="logo-buffer"></ion-tab>\n  <ion-tab [root]="tab3Root" tabTitle="Production" tabIcon="cog"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="Sales" tabIcon="podium"></ion-tab>\n\n</ion-tabs>\n'/*ion-inline-end:"/home/linkwok/Documents/ivdp/src/pages/tabs/tabs.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ })

},[565]);
//# sourceMappingURL=main.js.map