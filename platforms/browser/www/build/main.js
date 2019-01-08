webpackJsonp([0],{

/***/ 100:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StationeryRequestPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_data_getter_service_data_getter_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_app_global_app_global__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__stationery_request_form_stationery_request_form__ = __webpack_require__(162);
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
 * Generated class for the StationeryRequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var StationeryRequestPage = /** @class */ (function () {
    function StationeryRequestPage(navCtrl, navParams, dataGetterService, loadingCtrl, events, toastCtrl, appGlobal) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataGetterService = dataGetterService;
        this.loadingCtrl = loadingCtrl;
        this.events = events;
        this.toastCtrl = toastCtrl;
        this.appGlobal = appGlobal;
        this.stationeryRequests = [];
        this.queryText = '';
        this.events.subscribe('reload:stationery-request', function (isNotification, id) {
            _this.refreshStationeryRequestList(null);
        });
    }
    StationeryRequestPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad StationeryRequestPage');
    };
    StationeryRequestPage.prototype.ionViewDidEnter = function () {
        this.loadStationeryRequests(null);
    };
    StationeryRequestPage.prototype.refreshStationeryRequestList = function (reference) {
        this.loadStationeryRequests(reference);
    };
    StationeryRequestPage.prototype.loadStationeryRequests = function (reference) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        if (reference === null) {
            loading.present();
        }
        this.dataGetterService.getAllStationeryRequests().subscribe(function (data) {
            console.log("Stationery Requests Loaded", data);
            if (data.success) {
                _this.stationeryRequests = data.stationery_requests;
            }
            else {
                _this.stationeryRequests = [];
            }
            loading.dismiss();
            if (reference != null) {
                reference.complete();
            }
        }, function (error) {
            console.log(error);
            _this.stationeryRequests = [];
            var toast = _this.toastCtrl.create({
                message: _this.appGlobal.ServerError,
                duration: 3000
            });
            toast.present();
            loading.dismiss();
            if (reference != null) {
                reference.complete();
            }
        });
    };
    StationeryRequestPage.prototype.goToStationeryRequestForm = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__stationery_request_form_stationery_request_form__["a" /* StationeryRequestFormPage */]);
    };
    StationeryRequestPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-stationery-request',template:/*ion-inline-start:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/stationery-request/stationery-request.html"*/'<!--\n  Generated template for the StationeryRequestPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Stationery Requests</ion-title>\n  </ion-navbar>\n\n  <ion-toolbar no-border-top>\n    <ion-searchbar color="primary" [(ngModel)]="queryText" placeholder="Search"></ion-searchbar>\n  </ion-toolbar>\n</ion-header>\n\n\n<ion-content>\n  <ion-refresher (ionRefresh)="refreshStationeryRequestList($event)">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n\n  <ion-list>\n    <ion-card\n      *ngFor="let stationeryRequest of stationeryRequests | search : {term:queryText,fields:[\'uid\',\'stationery\',\'requested_quantity\']}">\n      <div class="{{\'stationery_request_state_sidebar_\'+stationeryRequest.state}}">\n        <ion-card-header>\n          {{stationeryRequest.uid}}\n          <span class="pull-right sr-age">{{stationeryRequest.age}}</span>\n        </ion-card-header>\n\n        <ion-card-content>\n          <p>Stationery: <strong>{{stationeryRequest.stationery}}</strong></p>\n          <p>Requested Quantity: <strong>{{stationeryRequest.requested_quantity}}</strong></p>\n        </ion-card-content>\n\n        <ion-row *ngIf="stationeryRequest.closed">\n          <ion-col>\n            <div class="pull-right">\n              <p>Closed By: <strong>{{stationeryRequest.closer}}</strong></p>\n              <p>Closed At: <strong>{{stationeryRequest.closed_at}}</strong></p>\n            </div>\n          </ion-col>\n        </ion-row>\n\n        <ion-row>\n          <ion-col>\n            <ion-badge class="pull-right">{{stationeryRequest.state}}</ion-badge>\n          </ion-col>\n        </ion-row>\n      </div>\n    </ion-card>\n  </ion-list>\n\n  <ion-fab right bottom>\n    <button ion-fab (click)="goToStationeryRequestForm()">\n      <ion-icon name="add"></ion-icon>\n    </button>\n  </ion-fab>\n</ion-content>\n'/*ion-inline-end:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/stationery-request/stationery-request.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_data_getter_service_data_getter_service__["a" /* DataGetterServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_app_global_app_global__["a" /* AppGlobalProvider */]])
    ], StationeryRequestPage);
    return StationeryRequestPage;
}());

//# sourceMappingURL=stationery-request.js.map

/***/ }),

/***/ 116:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserblockPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_data_getter_service_data_getter_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_user_data_ts__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_app_global_app_global__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(2);
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
            selector: 'page-userblock',template:/*ion-inline-start:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/userblock/userblock.html"*/'<!--\n  Generated template for the UserblockPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar hideBackButton="true">\n    <ion-title>\n      <img src="assets/img/appicon.png" height="30" alt="Empower">\n    </ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content center text-center padding>\n  <ion-refresher (ionRefresh)="refresh($event)">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n  <h4>Profile incomplete..!!</h4>\n\n  <h5>\n    <!-- It looks like you are offline! Please check your network connection and try again. -->\n    <p>Please complete your profile on website and refresh.</p>\n  </h5>\n</ion-content>'/*ion-inline-end:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/userblock/userblock.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["p" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["q" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_app_global_app_global__["a" /* AppGlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_1__providers_user_data_ts__["a" /* UserData */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["f" /* Events */],
            __WEBPACK_IMPORTED_MODULE_0__providers_data_getter_service_data_getter_service__["a" /* DataGetterServiceProvider */]])
    ], UserblockPage);
    return UserblockPage;
}());

//# sourceMappingURL=userblock.js.map

/***/ }),

/***/ 143:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccessCardRequestFormPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_data_setter_data_setter__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_vibration__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_app_global_app_global__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular_components_toast_toast_controller__ = __webpack_require__(17);
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
 * Generated class for the AccessCardRequestFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AccessCardRequestFormPage = /** @class */ (function () {
    function AccessCardRequestFormPage(navCtrl, navParams, dataSetterService, toastCtrl, events, loadingCtrl, appGlobal, vibration) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataSetterService = dataSetterService;
        this.toastCtrl = toastCtrl;
        this.events = events;
        this.loadingCtrl = loadingCtrl;
        this.appGlobal = appGlobal;
        this.vibration = vibration;
        this.accessCardRequest = {
            justification: ''
        };
    }
    AccessCardRequestFormPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AccessCardRequestFormPage');
    };
    AccessCardRequestFormPage.prototype.submitAccessCardRequest = function (data) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.dataSetterService.createAccessCardRequest(data).subscribe(function (data) {
            console.log("Create Access Card Response", data);
            loading.dismiss();
            if (data.success) {
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
        }, function (error) {
            loading.dismiss();
            console.log(error);
            var toast = _this.toastCtrl.create({
                message: _this.appGlobal.ServerError,
                duration: 3000
            });
            toast.present();
        });
    };
    AccessCardRequestFormPage.prototype.logForm = function (form) {
        if (form.value.justification.trim().length > 0)
            this.submitAccessCardRequest(form.value);
        else
            alert("Justification cannot be blank!");
    };
    AccessCardRequestFormPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-access-card-request-form',template:/*ion-inline-start:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/access-card-request-form/access-card-request-form.html"*/'<!--\n  Generated template for the AccessCardRequestFormPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>New Access Card Request</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n  <form #form="ngForm">\n    <ion-item>\n      <ion-label color="primary" stacked>Remarks</ion-label>\n      <ion-textarea autoresize [(ngModel)]="accessCardRequest.justification" name="justification" required></ion-textarea>\n    </ion-item>\n\n    <button ion-button (click)="logForm(form)" type="submit" [disabled]="!form.valid" block>Create ID/Access Card Request\n    </button>\n  </form>\n</ion-content>\n'/*ion-inline-end:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/access-card-request-form/access-card-request-form.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_data_setter_data_setter__["a" /* DataSetterProvider */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular_components_toast_toast_controller__["a" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_app_global_app_global__["a" /* AppGlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_vibration__["a" /* Vibration */]])
    ], AccessCardRequestFormPage);
    return AccessCardRequestFormPage;
}());

//# sourceMappingURL=access-card-request-form.js.map

/***/ }),

/***/ 144:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArticleIndexPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_app_global_app_global__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular_components_loading_loading_controller__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_data_getter_service_data_getter_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__article_show_article_show__ = __webpack_require__(67);
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
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/article-index/article-index.html"*/'<!--\n  Generated template for the ArticleIndexPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Articles</ion-title>\n  </ion-navbar>\n  <ion-toolbar no-border-top>\n    <ion-searchbar color="primary" [(ngModel)]="queryText" placeholder="Search">\n    </ion-searchbar>\n  </ion-toolbar>\n</ion-header>\n\n\n<ion-content >\n  <ion-refresher (ionRefresh)="refreshPage($event)">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n  <ion-list *ngIf="articles.length > 0"> \n  <ion-card *ngFor="let article of articles | search : {term:queryText,fields:[\'title\',\'snippet\']} | sort: {property: field, order: order}"\n  (click)="goToArticle(article.id)" [ngStyle]="{\'background-color\': article.background_color}">\n      <!--<ion-card>-->\n      <ion-card-header>\n      <span class="bold-text" [ngStyle]="{\'color\': article.font_color}">\n          {{article.title}}\n        </span>\n      </ion-card-header>\n      <ion-card-content class="wrap-body" *ngIf="article.show_content" [ngStyle]="{\'color\': article.font_color}">\n        <div [innerHtml]="article.snippet | safeHtml">\n          <!--{{idea.content}}-->\n        </div>\n\n      </ion-card-content>\n      <ion-item [ngStyle]="{\'color\': article.font_color, \'background-color\': article.background_color}">\n        <h5 *ngIf="article.creator" [ngStyle]="{\'color\': article.font_color}">Created By: {{article.creator}}</h5>\n        <ion-badge item-end *ngIf="article.published_on">{{article.published_on}}</ion-badge>\n      </ion-item>\n      <!--</ion-card>-->\n\n    </ion-card>\n  </ion-list>\n\n  <ion-item *ngIf="articles.length === 0" text-center>\n    No Articles to be Shown\n  </ion-item>\n\n\n</ion-content>\n\n\n'/*ion-inline-end:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/article-index/article-index.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["p" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["q" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__providers_data_getter_service_data_getter_service__["a" /* DataGetterServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular_components_loading_loading_controller__["a" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["s" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_0__providers_app_global_app_global__["a" /* AppGlobalProvider */]])
    ], ArticleIndexPage);
    return ArticleIndexPage;
}());

//# sourceMappingURL=article-index.js.map

/***/ }),

/***/ 145:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalendarViewPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_app_global_app_global__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular_components_toast_toast_controller__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_data_getter_service_data_getter_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__leave_details_leave_details__ = __webpack_require__(146);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







// import {Calendar} from "@ionic-native/calendar";
// import { ItemSliding } from 'ionic-angular';
/**
 * Generated class for the CalendarViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CalendarViewPage = /** @class */ (function () {
    // public initalAttendance:any = {
    //     'for_date':"NA",
    //     'present':"NA",
    //     'in_time':"NA",
    //     'out_time':"NA",
    //     'working_hours':"NA"
    // };
    function CalendarViewPage(navCtrl, navParams, http, dataGetterService, loadingCtrl, toastCtrl, appGlobal) {
        // this.attendance={
        //   'for_date':"NA",
        //   'present':"NA",
        //   'in_time':"NA",
        //   'out_time':"NA",
        //   'working_hours':"NA"
        // };
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.dataGetterService = dataGetterService;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.appGlobal = appGlobal;
        this.holidaysList = [];
        this.attendanceList = [];
        this.isSelectedDayHoliday = false;
        this.initalAttendance = undefined;
        // this.attendanceList = [
        //   {
        //     year: 2018,
        //     month: 2,
        //     date: 2,
        //     background: '#fff',
        //     color: 'red',
        //     data: {
        //       test12:'test12',
        //       test22:'test22'
        //     }
        //   },
        //   {
        //     year: 2018,
        //     month: 2,
        //     date: 9,
        //     background: '#CBF1D9',
        //     color: '#006029',
        //     data: {
        //       test19: 'test19',
        //       test29: 'test29'
        //     }
        //   },
        //   {
        //     year: 2018,
        //     month: 2,
        //     date: 10,
        //     background: '#FFD3D7',
        //     color: '#7C0820',
        //     data: {
        //       test110: 'test110',
        //       test210: 'test210'
        //     }
        //   },{
        //     year: 2018,
        //     month: 2,
        //     date: 8,
        //     background: "#BDBDBD",
        //     color: "#FFFFFF",
        //     data: {
        //       test18: 'test18',
        //       test28: 'test28'
        //     }
        //   },{
        //     year: 2018,
        //     month: 2,
        //     date: 11,
        //     background: "#FEF8C9",
        //     color: "#876A00",
        //     data: {
        //       test111: 'test111',
        //       test211: 'test211'
        //     }
        //   }
        // ];
    }
    CalendarViewPage.prototype.getAttendance = function (attendance, event) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.dataGetterService.loadAttendance(attendance)
            .subscribe(function (data) {
            console.log("Calendar Attendance Loaded", data);
            if (data.success) {
                var att = data.attendance;
                if (Object.keys(att).length == 0) {
                    _this.attendance = _this.initalAttendance;
                }
                else {
                    _this.attendance = att;
                    _this.setIsSelectedDayHoliday(event);
                }
            }
            else {
                _this.attendance = _this.initalAttendance;
                _this.setIsSelectedDayHoliday(event);
            }
            loading.dismiss();
        }, function (err) {
            console.log(err);
            _this.attendance = _this.initalAttendance;
            _this.setIsSelectedDayHoliday(event);
            var toast = _this.toastCtrl.create({
                message: _this.appGlobal.ServerError,
                duration: 3000
            });
            toast.present();
            loading.dismiss();
        });
    };
    CalendarViewPage.prototype.getHolidays = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.dataGetterService.loadHolidays()
            .subscribe(function (data) {
            console.log("Calendar Holidays Loaded", data);
            if (data.success) {
                var holidays = data.holidays;
                if (Object.keys(holidays).length == 0) {
                    _this.holidaysList = [];
                }
                else {
                    holidays.forEach(function (holiday) {
                        _this.holidaysList.push({
                            year: holiday.year,
                            month: holiday.month_numerical,
                            date: holiday.day,
                            reason: holiday.holiday_reason,
                        });
                    });
                }
            }
            else {
                _this.holidaysList = [];
            }
            loading.dismiss();
            _this.isTodayHoliday();
        }, function (err) {
            console.log(err);
            _this.holidaysList = [];
            var toast = _this.toastCtrl.create({
                message: _this.appGlobal.ServerError,
                duration: 3000
            });
            toast.present();
            loading.dismiss();
        });
    };
    CalendarViewPage.prototype.isTodayHoliday = function () {
        var date = new Date();
        var dateObj = {
            year: date.getFullYear(),
            month: date.getMonth(),
            date: date.getDate()
        };
        var i = 0, len = this.holidaysList.length;
        for (; i < len; i++) {
            if (this.holidaysList[i].year == dateObj.year && this.holidaysList[i].month == dateObj.month && this.holidaysList[i].date == dateObj.date) {
                this.isSelectedDayHoliday = true;
                return;
            }
        }
        this.isSelectedDayHoliday = false;
    };
    CalendarViewPage.prototype.onDaySelect = function (event) {
        var attendanceDate;
        console.log("onDaySelect: ", event);
        attendanceDate = event.date + "/" + (event.month + 1) + "/" + event.year;
        console.log("attendanceDate", attendanceDate);
        if (event.attendanceData === "") {
            this.getAttendance(attendanceDate, event);
        }
        else {
            this.attendance = event.attendanceData;
            this.setIsSelectedDayHoliday(event);
        }
    };
    CalendarViewPage.prototype.onMonthSelect = function (event) {
        var _this = this;
        console.log("onMonthSelect Event: ", event);
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.dataGetterService.loadMonthAttendance(event).subscribe(function (data) {
            console.log("Calendar Month Attendance Loaded", data);
            if (data.success) {
                _this.attendanceList = data.attendance;
            }
            else {
                _this.attendanceList = [];
            }
            loading.dismiss();
        }, function (err) {
            console.log(err);
            _this.attendanceList = [];
            var toast = _this.toastCtrl.create({
                message: _this.appGlobal.ServerError,
                duration: 3000
            });
            toast.present();
            loading.dismiss();
        });
    };
    CalendarViewPage.prototype.swipeEvent = function (event, calendar) {
        if (event.direction === 2) {
            calendar.toNextDay();
        }
        if (event.direction === 4) {
            calendar.toPreviousDay();
        }
    };
    CalendarViewPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CalendarViewPage');
    };
    CalendarViewPage.prototype.ionViewDidEnter = function () {
        console.log('ionViewDidEnter CalendarViewPage');
        this.getHolidays();
    };
    CalendarViewPage.prototype.setIsSelectedDayHoliday = function (event) {
        console.log("setIsSelectedDayHoliday", this.attendance);
        if (this.attendance) {
            switch (this.attendance.present) {
                case "HO":
                    this.isSelectedDayHoliday = true;
                    console.log("setIsSelectedDayHoliday", "HO");
                    break;
                default:
                    this.isSelectedDayHoliday = false;
                    console.log("setIsSelectedDayHoliday", "DEFAULT");
                    break;
            }
        }
        else {
            this.isSelectedDayHoliday = event.isHoliday;
        }
        console.log("setIsSelectedDayHoliday", this.isSelectedDayHoliday);
    };
    CalendarViewPage.prototype.goToLeaveDetailsPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__leave_details_leave_details__["a" /* LeaveDetailsPage */]);
    };
    CalendarViewPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'page-calendar-view',template:/*ion-inline-start:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/calendar-view/calendar-view.html"*/'<!--\n  Generated template for the CalendarViewPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n  <ion-header>\n\n    <ion-navbar>\n      <button ion-button menuToggle>\n        <ion-icon name="menu"></ion-icon>\n      </button>\n      <ion-title>Attendance</ion-title>\n    </ion-navbar>\n\n  </ion-header>\n\n\n\n\n<ion-content padding>\n\n  <ion-fab right bottom (click)="goToLeaveDetailsPage()">\n    <button ion-fab color="light"><ion-icon name="cog"></ion-icon></button>\n  </ion-fab>\n  <ion-calendar #calendar [holidays]="holidaysList" [attendance]="attendanceList" (onMonthSelect)="onMonthSelect($event)" (onDaySelect)="onDaySelect($event)"></ion-calendar>\n  <ion-buttons text-center>\n    <!-- <button ion-button (click)="calendar.toNextDay()">Next</button> -->\n    <button ion-button (click)="calendar.today()" clear>Today</button>\n    <!-- <button ion-button (click)="calendar.toPreviousDay()">Previous</button> -->\n  </ion-buttons>\n\n  <ion-card (swipe)="swipeEvent($event,calendar)">\n    <div *ngIf="isSelectedDayHoliday">\n      <ion-card-header>\n        <h3 class="text-left">{{calendar.getSelectedDateString()}}\n          <ion-badge class="pull-right" color="danger">Holiday</ion-badge>\n        </h3>\n      </ion-card-header>\n      <ion-card-content>\n        <span class="bold-text">{{calendar.getHolidayReason()}}</span>\n      </ion-card-content>\n    </div>\n    <div *ngIf="!isSelectedDayHoliday && attendance">\n      <ion-card-header>\n        <h3 class="text-left">{{attendance.for_date}}\n          <ion-badge class="pull-right">{{attendance.present}}</ion-badge>\n        </h3>\n      </ion-card-header>\n      <ion-card-content>\n      \n        <ion-row *ngIf="attendance.in_time" >\n          <p>In Time:\n            <span class="bold-text">{{attendance.in_time}}</span>\n          </p>\n        </ion-row>\n        <ion-row *ngIf="attendance.out_time">\n          <p>Out Time:\n            <span class="bold-text">{{attendance.out_time}}</span>\n          </p>\n        </ion-row>\n        <ion-row *ngIf="attendance.working_hours" >\n          <p>Working hours:\n            <span class="bold-text">{{attendance.working_hours}}</span>\n          </p>\n        </ion-row>\n\n      </ion-card-content>\n    </div>\n  </ion-card>\n</ion-content>\n'/*ion-inline-end:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/calendar-view/calendar-view.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["p" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["q" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_5__providers_data_getter_service_data_getter_service__["a" /* DataGetterServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["l" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular_components_toast_toast_controller__["a" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_0__providers_app_global_app_global__["a" /* AppGlobalProvider */]])
    ], CalendarViewPage);
    return CalendarViewPage;
}());

//# sourceMappingURL=calendar-view.js.map

/***/ }),

/***/ 146:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LeaveDetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_app_global_app_global__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular_components_toast_toast_controller__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_data_getter_service_data_getter_service__ = __webpack_require__(9);
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
 * Generated class for the LeaveDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LeaveDetailsPage = /** @class */ (function () {
    function LeaveDetailsPage(navCtrl, navParams, dataGetterService, loadingCtrl, toastCtrl, appGlobal) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataGetterService = dataGetterService;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.appGlobal = appGlobal;
        this.holidays = [];
        this.leaves = [];
        this.lts = '';
        this.lts = "lt";
    }
    LeaveDetailsPage.prototype.ionViewDidEnter = function () {
        this.getHolidays();
        this.getLeaves();
    };
    LeaveDetailsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LeaveDetailsPage');
    };
    LeaveDetailsPage.prototype.getHolidays = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.dataGetterService.loadHolidays()
            .subscribe(function (data) {
            console.log("Show Holidays Loaded", data);
            if (data.success) {
                var holidays = data.holidays;
                if (Object.keys(holidays).length == 0) {
                    _this.holidays = [];
                }
                else {
                    _this.holidays = holidays;
                }
            }
            else {
                _this.holidays = [];
            }
            loading.dismiss();
        }, function (err) {
            console.log(err);
            _this.holidays = [];
            var toast = _this.toastCtrl.create({
                message: _this.appGlobal.ServerError,
                duration: 3000
            });
            toast.present();
            loading.dismiss();
        });
    };
    LeaveDetailsPage.prototype.getLeaves = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.dataGetterService.loadLeaves()
            .subscribe(function (data) {
            console.log("Show Leaves Loaded", data);
            if (data.success) {
                var leaves = data.data;
                if (Object.keys(leaves).length == 0) {
                    _this.leaves = [];
                }
                else {
                    _this.leaves = leaves;
                }
            }
            else {
                _this.leaves = [];
            }
            loading.dismiss();
        }, function (err) {
            console.log(err.error);
            _this.leaves = [];
            if (err.error.message) {
                if (err.error.message === 'No User Available') {
                    var toast = _this.toastCtrl.create({
                        message: "You are not registered with Orange HRMS, Please contact HR.",
                        duration: 3000
                    });
                    toast.present();
                }
                else {
                    var toast = _this.toastCtrl.create({
                        message: err.error.message,
                        duration: 3000
                    });
                    toast.present();
                }
            }
            else {
                var toast = _this.toastCtrl.create({
                    message: _this.appGlobal.ServerError,
                    duration: 3000
                });
                toast.present();
            }
            loading.dismiss();
        });
    };
    LeaveDetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'page-leave-details',template:/*ion-inline-start:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/leave-details/leave-details.html"*/'<!--\n  Generated template for the LeaveDetailsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>LeaveDetails</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n  <div padding>\n    <ion-segment [(ngModel)]="lts">\n      <ion-segment-button value="lt" >\n        Leaves Taken\n      </ion-segment-button>\n      <ion-segment-button value="hlds">\n        Holidays\n      </ion-segment-button>\n    </ion-segment>\n  </div>\n\n  <div [ngSwitch]="lts">\n    <div *ngSwitchCase="\'hlds\'">\n    <ion-list *ngIf="holidays.length > 0">\n      <ion-item *ngFor="let holiday of holidays">\n        <ion-grid>\n          <ion-row class="holiday-item">\n            <ion-col col-3><div class="day">{{holiday.day}}</div>\n              <div>{{holiday.month}}</div></ion-col>\n            <ion-col col-6 offset-3><h2>{{holiday.holiday_reason}}</h2>\n\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n\n\n      </ion-item>\n    </ion-list>\n    <ion-item *ngIf="holidays.length === 0" text-center>\n      No Holidays to be Shown\n    </ion-item>\n    </div>\n    <div *ngSwitchCase="\'lt\'">\n      <ion-list *ngIf="leaves.length > 0">\n        <ion-card *ngFor="let leave of leaves">\n          <ion-card-header>\n            <h3 class="text-left">{{leave.Leave_Code}} for {{leave.Leave_Period}} <ion-badge class="pull-right">{{leave.AppStatus}}</ion-badge></h3>\n\n          </ion-card-header>\n          <ion-card-content>\n\n            <ion-row class="text-left">\n              From: <span class="bold-text">{{leave.From_Date}}</span>\n            </ion-row>\n            <ion-row class="text-left">\n              To: <span class="bold-text">{{leave.To_Date}}</span>\n            </ion-row>\n            <ion-row class="text-left">\n              Reason: <span class="bold-text">{{leave.Leave_Reason}}</span>\n            </ion-row>\n          </ion-card-content>\n        </ion-card>\n\n\n\n      </ion-list>\n      <ion-item *ngIf="leaves.length === 0" text-center>\n        No Leaves to be Shown\n      </ion-item>\n    </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/leave-details/leave-details.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["p" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["q" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__providers_data_getter_service_data_getter_service__["a" /* DataGetterServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["l" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular_components_toast_toast_controller__["a" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_0__providers_app_global_app_global__["a" /* AppGlobalProvider */]])
    ], LeaveDetailsPage);
    return LeaveDetailsPage;
}());

//# sourceMappingURL=leave-details.js.map

/***/ }),

/***/ 147:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CanteenFacilityPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_data_getter_service_data_getter_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_data_setter_data_setter__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_app_global_app_global__ = __webpack_require__(6);
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
 * Generated class for the CanteenFacilityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CanteenFacilityPage = /** @class */ (function () {
    function CanteenFacilityPage(navCtrl, navParams, events, dataGetterService, loadingCtrl, toastCtrl, appGlobal, dataSetterService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.events = events;
        this.dataGetterService = dataGetterService;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.appGlobal = appGlobal;
        this.dataSetterService = dataSetterService;
        this.dates = [];
        this.categories = [];
        this.locked_data = [];
        this.disabled_data = [];
        var d = new Date();
        d.setDate(d.getDate() + 1);
        this.dates = [new Date(), d];
        this.loadLunchCategories();
        this.events.subscribe('reload:canteen-facility', function (isNotification, id) {
            _this.loadLunchCategories();
        });
    }
    CanteenFacilityPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CanteenFacilityPage');
        this.loadLunchCategories();
    };
    CanteenFacilityPage.prototype.formatDate = function (date) {
        var monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
        ];
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
        return day + ' ' + monthNames[monthIndex] + ' ' + year;
    };
    CanteenFacilityPage.prototype.customFormatDate = function (date) {
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
        return day + '-' + (monthIndex + 1) + '-' + year;
    };
    CanteenFacilityPage.prototype.loadLunchCategories = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.dataGetterService.getLunchCategories().subscribe(function (data) {
            if (data.success) {
                _this.categories = data.categories;
                _this.locked_data = data.locked_data;
                _this.disabled_data = data.disabled_data;
                loading.dismiss();
            }
        }, function (error) {
            console.log(error);
            var toast = _this.toastCtrl.create({
                message: _this.appGlobal.ServerError,
                duration: 3000
            });
            toast.present();
        });
    };
    CanteenFacilityPage.prototype.registerCanteenFacility = function (e, v) {
        var _this = this;
        console.log(v);
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        var data = {};
        data['c'] = v.split("_")[0];
        data['d'] = v.split("_")[1];
        data['checked'] = e.checked;
        this.dataSetterService.recordCanteenFacilityUsage(data).subscribe(function (data) {
            loading.dismiss();
            if (data.success) {
                var toast = _this.toastCtrl.create({
                    message: data.message,
                    duration: 3000
                });
                toast.present();
            }
            else {
                var toast = _this.toastCtrl.create({
                    message: data.errors,
                    duration: 3000
                });
                toast.present();
            }
        }, function (error) {
            loading.dismiss();
            console.log(error);
            var toast = _this.toastCtrl.create({
                message: _this.appGlobal.ServerError,
                duration: 3000
            });
            toast.present();
        });
    };
    CanteenFacilityPage.prototype.getLockedDataBoolean = function (c, d) {
        if (this.locked_data.indexOf(c + "_" + d) >= 0)
            return true;
        return false;
    };
    CanteenFacilityPage.prototype.getDisabledDataBoolean = function (c, d) {
        if (this.disabled_data.indexOf(c + "_" + d) >= 0)
            return true;
        return false;
    };
    CanteenFacilityPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-canteen-facility',template:/*ion-inline-start:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/canteen-facility/canteen-facility.html"*/'<!--\n  Generated template for the CanteenFacilityPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Canteen Facility</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<!--<ion-content padding>-->\n<!-- <ion-list no-border *ngFor="let date of dates">-->\n\n<!--    <ion-list-header>-->\n<!--      {{formatDate(date)}}-->\n<!--    </ion-list-header>-->\n\n<!--    <ion-item *ngFor="let category of categories">-->\n<!--    	 <ion-toggle checked="{{getLockedDataBoolean(category[1],customFormatDate(date))}}" (ionChange)="registerCanteenFacility($event,category[1]+\'_\'+customFormatDate(date))"  disabled="{{getDisabledDataBoolean(category[1],customFormatDate(date))}}"  ></ion-toggle>-->\n<!--      <ion-label>-->\n<!--        {{category[0]}}-->\n<!--      </ion-label>-->\n<!--      <ion-icon name=\'pizza\' item-start></ion-icon>-->\n\n<!--    </ion-item>-->\n\n<!--  </ion-list>-->\n\n\n\n<!--</ion-content>-->\n'/*ion-inline-end:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/canteen-facility/canteen-facility.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["p" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["q" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* Events */], __WEBPACK_IMPORTED_MODULE_1__providers_data_getter_service_data_getter_service__["a" /* DataGetterServiceProvider */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["l" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["s" /* ToastController */], __WEBPACK_IMPORTED_MODULE_4__providers_app_global_app_global__["a" /* AppGlobalProvider */], __WEBPACK_IMPORTED_MODULE_2__providers_data_setter_data_setter__["a" /* DataSetterProvider */]])
    ], CanteenFacilityPage);
    return CanteenFacilityPage;
}());

//# sourceMappingURL=canteen-facility.js.map

/***/ }),

/***/ 148:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DirectoryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_data_getter_service_data_getter_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__profile_profile__ = __webpack_require__(89);
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
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["o" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["o" /* Nav */])
    ], DirectoryPage.prototype, "nav", void 0);
    DirectoryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-directory',template:/*ion-inline-start:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/directory/directory.html"*/'<!--\n  Generated template for the DirectoryPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Directory</ion-title>\n  </ion-navbar>\n  <ion-toolbar>\n    <ion-searchbar\n      [(ngModel)]="searchQuery"\n      [debounce]="1000"\n      [placeholder]="\'Search Employee\'"\n      [autocorrect]="\'on\'"\n      [animated]="true"\n      [autocomplete]="\'on\'"\n      (ionInput)="onInput($event)"\n      (ionClear)="onClear($event)">\n    </ion-searchbar>\n  </ion-toolbar>\n\n</ion-header>\n\n\n<ion-content>\n  <div class="search-spinner" *ngIf="isSearching">\n    <div class="search-spinner-background"></div>\n    <ion-spinner></ion-spinner>\n  </div>\n  <ion-list *ngIf="searchedUsers.length > 0">\n    <ion-item no-lines text-wrap class="bottom-border" *ngFor="let user of searchedUsers">\n      <ion-grid>\n        <ion-row class="user-item" (click)="openUserProfile(user.id)">\n          <ion-col col-3>\n            <ion-avatar item-start>\n              <img src="{{user.profile}}" style="width: 5em;height: 5em;border: 2px solid gray;max-width: fit-content;"/>\n            </ion-avatar>\n          </ion-col>\n          <ion-col col-9 text-left>\n            <div>{{user.employee_id}}</div>\n            <div>{{user.name}}</div>\n            <h2>{{user.email}}</h2>\n            <h2>{{user.designation}}</h2>\n            <h2>{{user.location}}</h2>\n            <h2>{{user.mobile? \'Mob: \'+user.mobile : \'\'}}</h2>\n            <h2>{{user.extension? \'Ext: \'+user.extension : \'\'}}</h2>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-item>\n  </ion-list>\n\n  <ion-list *ngIf="searchedUsers.length === 0" text-center>\n    <ion-item *ngIf="searchQuery === \'\'" text-wrap>\n      <h3>\n        To search employee details, use above search bar.\n      </h3>\n    </ion-item>\n    <ion-item *ngIf="searchQuery !== \'\' && !isSearching" text-wrap>\n      <h3>\n        User not found, Please search with another term.\n      </h3>\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/directory/directory.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["p" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["q" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_0__providers_data_getter_service_data_getter_service__["a" /* DataGetterServiceProvider */]])
    ], DirectoryPage);
    return DirectoryPage;
}());

//# sourceMappingURL=directory.js.map

/***/ }),

/***/ 149:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GrievanceFormPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_native_vibration__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_app_global_app_global__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_data_setter_data_setter__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_data_getter_service_data_getter_service__ = __webpack_require__(9);
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
    function GrievanceFormPage(navCtrl, navParams, dataSetterService, dataGetterService, events, toastCtrl, loadingCtrl, appGlobal, camera, vibration) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataSetterService = dataSetterService;
        this.dataGetterService = dataGetterService;
        this.events = events;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.appGlobal = appGlobal;
        this.camera = camera;
        this.vibration = vibration;
        this.grievance = {
            title: "",
            content: "",
            idea_type: "idea",
            grievance_type: "",
            category: ''
        };
        this.AddKyc = [];
        this.initMaintenanceRequest();
    }
    GrievanceFormPage.prototype.initMaintenanceRequest = function () {
        this.AddKyc = {
            kyc_person_id: '',
            kyc_person_type: '',
            kyc_name: '',
            kyc_detail: '',
            kyc_number: '',
            kyc_file: '',
            user_id: ''
        };
    };
    GrievanceFormPage.prototype.loadGrievanceCategories = function (ref) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        if (ref === null) {
            loading.present();
        }
        this.dataGetterService.getGrievanceCategories()
            .subscribe(function (data) {
            console.log("Grievance Categories Loaded", data);
            if (data.success) {
                _this.grievance_categories = data.grievanceTypes;
            }
            else {
                _this.grievance_categories = [];
            }
            loading.dismiss();
            if (ref != null) {
                ref.complete();
            }
        }, function (err) {
            console.log(err);
            _this.grievance_categories = [];
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
    GrievanceFormPage.prototype.ionViewDidEnter = function () {
        this.loadGrievanceCategories(null);
    };
    GrievanceFormPage.prototype.submitSR = function (d) {
        var _this = this;
        d["kyc_file"] = this.imageURI;
        console.log("Create Grievance Request", d);
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.dataSetterService.createGrievance(d)
            .subscribe(function (data) {
            console.log("Create Grievance Response", data);
            loading.dismiss();
            if (data.success) {
                _this.events.publish('reload:grievance');
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
    GrievanceFormPage.prototype.getImageFromCamera = function () {
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
            // this.presentToast(err);
        });
    };
    GrievanceFormPage.prototype.getImageFromFS = function () {
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
    GrievanceFormPage.prototype.logForm = function (form) {
        this.submitSR(form.value);
        // this.navCtrl.push(GrievancePage);
    };
    GrievanceFormPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad GrievanceFormPage');
    };
    GrievanceFormPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["m" /* Component */])({
            selector: 'page-grievance-form',template:/*ion-inline-start:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/grievance-form/grievance-form.html"*/'<!--\n  Generated template for the GrievanceFormPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Add kyc</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n \n<!-- <ion-content padding> -->\n\n    <!-- <form #form="ngForm"  >         <ion-list>\n    \n    \n            <ion-item>\n                <ion-label stacked floating color="primary">kyc Person ID</ion-label>\n               <ion-input name="kyc_person_id" type="text" [(ngModel)]="AddKyc.kyc_person_id" required></ion-input>\n             </ion-item>\n             <ion-item>\n                <ion-label stacked floating color="primary">User ID</ion-label>\n               <ion-input name="user_id" type="text" [(ngModel)]="AddKyc.user_id" required></ion-input>\n             </ion-item>\n             <ion-item>\n                <ion-label stacked floating color="primary">Person Type</ion-label>\n               <ion-input name="kyc_person_type" type="text" [(ngModel)]="AddKyc.kyc_person_type" required></ion-input>\n             </ion-item>\n            <ion-item>\n                <ion-label stacked floating color="primary">Document Name</ion-label>\n               <ion-input name="kyc_name" type="text" [(ngModel)]="AddKyc.kyc_name" required></ion-input>\n             </ion-item>\n             <ion-item>\n                <ion-label stacked floating color="primary">Document Details</ion-label>\n               <ion-input name="kyc_detail" type="text" [(ngModel)]="AddKyc.kyc_detail" required></ion-input>\n             </ion-item>\n             <ion-item>\n                <ion-label stacked floating color="primary">Document Number</ion-label>\n               <ion-input name="kyc_number" type="text" [(ngModel)]="AddKyc.kyc_number" required></ion-input>\n             </ion-item>\n              <ion-item>\n                <ion-label stacked floating color="primary">Document Image</ion-label>\n                <ion-input  type="text"  ></ion-input>\n           </ion-item> \n        </ion-list>\n         <ion-label stacked floating color="primary">Document Image</ion-label>\n       \n         <ion-item *ngIf="imageURI" name="kyc_file" [(ngModel)]="AddKyc.kyc_file" required >\n           \n            <img src="{{imageURI}}" *ngIf="imageURI" alt="Ionic File" width="300" />\n          </ion-item> \n              <ion-item *ngIf="imageURI">\n            <img src="{{imageURI}}" *ngIf="imageURI" alt="Ionic File" width="300" />\n          </ion-item> ionic cordova plugin add cordova-sqlite-storage\n -->\n\n          <!--<ion-buttons>\n            <ion-grid>\n              <ion-row>\n                <ion-col>\n                  <button ion-button color="secondary" round (click)="getImageFromCamera()" block>Camera</button>\n                </ion-col>\n                <ion-col>\n                  <button ion-button color="secondary" round (click)="getImageFromFS()" block>Gallery</button>\n                </ion-col>\n              </ion-row>\n            </ion-grid>\n          </ion-buttons>\n\n    \n         \n\n\n        <button ion-button (click)="logForm(form)" type="submit" [disabled]="!form.valid" block>submit </button>  \n      \n      </form>\n    </ion-content> -->\n\n\n\n\n\n\n\n\n\n\n\n<ion-content padding>\n  <form  #form="ngForm">\n    <ion-list>\n      <ion-item>\n        <ion-input type="text" [(ngModel)]="grievance.title" name="title" placeholder="Enter title of your grievance" required></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label>Grievance Type</ion-label>\n        <ion-select [(ngModel)]="grievance.grievance_type" name="grievance_type" required interface="popover">\n          <ion-option value="Individual Grievance">Individual Grievance</ion-option>\n          <ion-option value="Group Grievance">Group Grievance</ion-option>\n          <ion-option value="Policy Issue">Policy Issue</ion-option>\n        </ion-select>\n      </ion-item>\n    </ion-list>\n    <ion-list>\n    <ion-item>\n        <ion-label>Category</ion-label>\n          <ion-select [(ngModel)]="grievance.category" name="category" required interface="popover">\n            <ion-option value={{grievance_category.uuid}}  *ngFor="let grievance_category of grievance_categories" >{{grievance_category.name}}</ion-option>\n            <ion-option value="Group Grievance">Group Grievance</ion-option>-->\n        <ion-option value="Policy Issue">Policy Issue</ion-option>-->\n      </ion-select>\n      </ion-item>\n      <ion-item>\n        <ion-textarea [(ngModel)]="grievance.content" name="content" rows="5" placeholder="Enter Description" required></ion-textarea>\n      </ion-item>\n    </ion-list>\n    <ion-item *ngIf="imageURI">\n      <img src="{{imageURI}}" *ngIf="imageURI" alt="Ionic File" width="300" />\n    </ion-item>\n    <ion-buttons>\n      <ion-grid>\n        <ion-row> \n         <ion-col>\n            <button ion-button color="secondary" round (click)="getImageFromCamera()" block>Camera</button>\n          </ion-col>\n          <ion-col>\n            <button ion-button color="secondary" round (click)="getImageFromFS()" block>Gallery</button>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-buttons>\n    <button ion-button type="submit" [disabled]="!form.valid" (click)="logForm(form)" block>Add Grievance</button> \n  </form>  \n </ion-content> \n'/*ion-inline-end:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/grievance-form/grievance-form.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["p" /* NavController */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["q" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_5__providers_data_setter_data_setter__["a" /* DataSetterProvider */],
            __WEBPACK_IMPORTED_MODULE_6__providers_data_getter_service_data_getter_service__["a" /* DataGetterServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["f" /* Events */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["s" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["l" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1__providers_app_global_app_global__["a" /* AppGlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_0__ionic_native_vibration__["a" /* Vibration */]])
    ], GrievanceFormPage);
    return GrievanceFormPage;
}());

//# sourceMappingURL=grievance-form.js.map

/***/ }),

/***/ 15:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataSetterProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular_components_loading_loading_controller__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user_data_ts__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_global_app_global__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_file_transfer__ = __webpack_require__(85);
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
        var httpOptions = {
            headers: new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["c" /* HttpHeaders */]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.user.userData.auth_token
                // 'Version': this.appGlobal.applicationVersion
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
        try {
            console.log("########################################" + data);
            debugger;
            return this.http.post(this.appGlobal.createMaintenanceRequest, data, this.getHTTPOptions());
        }
        catch (ErrorHandler) {
            console.log("#####################", ErrorHandler);
        }
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
    DataSetterProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["f" /* Events */],
            __WEBPACK_IMPORTED_MODULE_4__app_global_app_global__["a" /* AppGlobalProvider */], __WEBPACK_IMPORTED_MODULE_1__user_data_ts__["a" /* UserData */],
            __WEBPACK_IMPORTED_MODULE_0_ionic_angular_components_loading_loading_controller__["a" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["s" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_file_transfer__["a" /* FileTransfer */]])
    ], DataSetterProvider);
    return DataSetterProvider;
}());

//# sourceMappingURL=data-setter.js.map

/***/ }),

/***/ 155:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GuestLunchFormPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_vibration__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_data_setter_data_setter__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular_components_toast_toast_controller__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_app_global_app_global__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_data_getter_service_data_getter_service__ = __webpack_require__(9);
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
 * Generated class for the GuestLunchFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var GuestLunchFormPage = /** @class */ (function () {
    function GuestLunchFormPage(navCtrl, navParams, dataSetterService, toastCtrl, events, loadingCtrl, appGlobal, vibration, dataGetterService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataSetterService = dataSetterService;
        this.toastCtrl = toastCtrl;
        this.events = events;
        this.loadingCtrl = loadingCtrl;
        this.appGlobal = appGlobal;
        this.vibration = vibration;
        this.dataGetterService = dataGetterService;
        this.guestLunch = {
            no_of_people: 1,
            date_of_lunch: "",
            lunch_type: "",
            lunch_location: "",
            lunch_category: "",
            remarks: "",
            food_item_masters: []
        };
        this.minDate = "";
        this.categories = [];
        this.displayCategories = false;
        this.listedCategories = [];
        this.todayDate = true;
        this.lunchToBeShown = true;
        this.dinnerToBeShown = true;
        this.breakfastToBeShown = true;
        this.toBeShown = {};
    }
    GuestLunchFormPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad GuestLunchFormPage');
    };
    GuestLunchFormPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.minDate = __WEBPACK_IMPORTED_MODULE_6_moment__().format('YYYY-MM-DD');
        this.dataGetterService.getGuestLunchLocations().subscribe(function (data) {
            console.log("Assets Loaded", data);
            if (data.success) {
                _this.lunchLocations = data.locations;
                loading.dismiss();
            }
        }, function (error) {
            console.log(error);
            var toast = _this.toastCtrl.create({
                message: _this.appGlobal.ServerError,
                duration: 3000
            });
            toast.present();
            loading.dismiss();
        });
        this.dataGetterService.getGuestLunchTypes().subscribe(function (data) {
            console.log("Assets Loaded", data);
            if (data.success) {
                _this.lunchTypes = data.lunch_type;
                for (var i = 0; i < _this.lunchTypes.length; i++) {
                    _this.guestLunch[_this.lunchTypes[i][1]] = 0;
                }
                // loading.dismiss();
            }
        }, function (error) {
            console.log(error);
            var toast = _this.toastCtrl.create({
                message: _this.appGlobal.ServerError,
                duration: 3000
            });
            toast.present();
            // loading.dismiss();
        });
        this.loadLunchCategories();
    };
    GuestLunchFormPage.prototype.submitGuestLunchRequest = function (data) {
        var _this = this;
        var date = __WEBPACK_IMPORTED_MODULE_6_moment__(this.guestLunch.date_of_lunch);
        var now = __WEBPACK_IMPORTED_MODULE_6_moment__();
        if (date.isBefore(now, 'day')) {
            var toast = this.toastCtrl.create({
                message: "Select appropriate date",
                duration: 3000
            });
            toast.present();
            return false;
        }
        if (this.displayCategories && data.lunch_category > 0) {
            var loading_1 = this.loadingCtrl.create({
                content: 'Please wait...'
            });
            loading_1.present();
            this.dataSetterService.createGuestLunch(data).subscribe(function (data) {
                console.log("Create Guest Lunch Response", data);
                loading_1.dismiss();
                if (data.success) {
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
                        message: data.message,
                        duration: 3000
                    });
                    toast.present();
                }
            }, function (error) {
                loading_1.dismiss();
                console.log(error);
                var toast = _this.toastCtrl.create({
                    message: _this.appGlobal.ServerError,
                    duration: 3000
                });
                toast.present();
            });
        }
        else {
            var toast = this.toastCtrl.create({
                message: "Select atleast one category",
                duration: 3000
            });
            toast.present();
        }
    };
    GuestLunchFormPage.prototype.logForm = function (form) {
        console.log(form.value);
        this.submitGuestLunchRequest(form.value);
    };
    GuestLunchFormPage.prototype.loadLunchCategories = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.dataGetterService.getLunchCategories().subscribe(function (data) {
            if (data.success) {
                _this.categories = data.categories;
                _this.displayCategories = false;
                loading.dismiss();
            }
        }, function (error) {
            console.log(error);
            var toast = _this.toastCtrl.create({
                message: _this.appGlobal.ServerError,
                duration: 3000
            });
            toast.present();
        });
    };
    GuestLunchFormPage.prototype.resetCategories = function (e) {
        this.displayCategories = true;
        this.listedCategories = [];
        if (e == "Corporate")
            for (var i = 0; i < this.categories.length; i++) {
                if (this.categories[i][0] == "Lunch" && this.lunchToBeShown)
                    this.listedCategories.push(this.categories[i]);
            }
        else
            this.listedCategories = JSON.parse(JSON.stringify(this.categories));
    };
    GuestLunchFormPage.prototype.resetAllCategories = function () {
        this.listedCategories = JSON.parse(JSON.stringify(this.categories));
    };
    GuestLunchFormPage.prototype.resetCategoriesFromArg = function (e) {
        this.displayCategories = true;
        // this.listedCategories = [];
        for (var i = 0; i < this.categories.length; i++) {
            if (this.categories[i][0] == e)
                this.listedCategories.splice(i, 1);
        }
    };
    GuestLunchFormPage.prototype.performValidation = function (v) {
        var time_for_dinner = __WEBPACK_IMPORTED_MODULE_6_moment__().set({ hour: 17, minute: 30, second: 0, millisecond: 0 });
        var time_for_lunch = __WEBPACK_IMPORTED_MODULE_6_moment__().set({ hour: 12, minute: 30, second: 0, millisecond: 0 });
        var time_for_breakfast = __WEBPACK_IMPORTED_MODULE_6_moment__().set({ hour: 21, minute: 0, second: 0, millisecond: 0 });
        this.displayCategories = false;
        if (v == "date") {
            this.guestLunch.lunch_location = "";
            this.guestLunch.lunch_category = "0";
        }
        if (v == "loc") {
            this.guestLunch.lunch_category = "0";
        }
        if (this.guestLunch.date_of_lunch.length > 0 && this.guestLunch.lunch_location.length > 0) {
            var date = __WEBPACK_IMPORTED_MODULE_6_moment__(this.guestLunch.date_of_lunch);
            var now = __WEBPACK_IMPORTED_MODULE_6_moment__();
            this.listedCategories = [];
            this.displayCategories = true;
            if (this.guestLunch.lunch_location == "Dahej") {
                //Breakfast
                if (!date.isSame(now, 'day') && (__WEBPACK_IMPORTED_MODULE_6_moment__() < time_for_breakfast)) {
                    for (var i = 0; i < this.categories.length; i++) {
                        if (this.categories[i][0] == "Breakfast")
                            this.listedCategories.push(this.categories[i]);
                    }
                }
                if (!date.isSame(now, 'day')) {
                    for (var i = 0; i < this.categories.length; i++) {
                        if (this.categories[i][0] == "Lunch")
                            this.listedCategories.push(this.categories[i]);
                    }
                }
                if (date.isSame(now, 'day') && (__WEBPACK_IMPORTED_MODULE_6_moment__() < time_for_lunch)) {
                    for (var i = 0; i < this.categories.length; i++) {
                        if (this.categories[i][0] == "Lunch")
                            this.listedCategories.push(this.categories[i]);
                    }
                }
                //Dinner
                if (!date.isSame(now, 'day')) {
                    for (var i = 0; i < this.categories.length; i++) {
                        if (this.categories[i][0] == "Dinner")
                            this.listedCategories.push(this.categories[i]);
                    }
                }
                if (date.isSame(now, 'day') && (__WEBPACK_IMPORTED_MODULE_6_moment__() < time_for_dinner)) {
                    for (var i = 0; i < this.categories.length; i++) {
                        if (this.categories[i][0] == "Dinner")
                            this.listedCategories.push(this.categories[i]);
                    }
                }
            }
            else {
                if (this.guestLunch.lunch_location == "Corporate") {
                    if (!date.isSame(now, 'day')) {
                        for (var i = 0; i < this.categories.length; i++) {
                            if (this.categories[i][0] == "Lunch")
                                this.listedCategories.push(this.categories[i]);
                        }
                    }
                    if (date.isSame(now, 'day') && (__WEBPACK_IMPORTED_MODULE_6_moment__() < time_for_lunch)) {
                        for (var i = 0; i < this.categories.length; i++) {
                            if (this.categories[i][0] == "Lunch")
                                this.listedCategories.push(this.categories[i]);
                        }
                    }
                }
                else {
                    this.displayCategories = false;
                }
            }
        }
    };
    GuestLunchFormPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-guest-lunch-form',template:/*ion-inline-start:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/guest-lunch-form/guest-lunch-form.html"*/'<!--\n  Generated template for the GuestLunchFormPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>New Guest Lunch Request</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n  <form #form="ngForm">\n    <ion-item>\n      <ion-label fixed color="primary">No. of Guests</ion-label>\n      <ion-input type="number"  text-right  [(ngModel)]="guestLunch.no_of_people" name="no_of_people"\n                 placeholder="Enter No. of Guests" min="1" max="50" step="1" pattern="(0*)([1-9])+(0*)" required></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label color="primary" stacked>Date of Lunch</ion-label>\n      <ion-datetime [(ngModel)]="guestLunch.date_of_lunch" name="date_of_lunch" displayFormat="DDDD MMM DD, YYYY"\n                    min="{{minDate}}" placeholder="Select Date" required (ionChange)="performValidation(\'date\')"></ion-datetime>\n    </ion-item>\n\n    <ion-item>\n      <ion-label>Location</ion-label>\n      <ion-select  [(ngModel)]="guestLunch.lunch_location" name="lunch_location" (ionChange)="performValidation(\'loc\')">\n        <ion-option *ngFor="let l of lunchLocations" [value]="l">{{l}}</ion-option>\n\n\n      </ion-select>\n    </ion-item>\n\n   <ion-item *ngIf="displayCategories">\n      <ion-label>Category</ion-label>\n      <ion-select  [(ngModel)]="guestLunch.lunch_category" name="lunch_category">\n\n        <ion-option *ngFor="let category of listedCategories" [value]="category[1]" >{{category[0]}}</ion-option>\n\n\n      </ion-select>\n    </ion-item>\n\n\n  <ion-item *ngFor="let t of lunchTypes" >\n      <ion-label>{{t[0]}}</ion-label>\n      <ion-input type="number" text-right [(ngModel)]="guestLunch[t[1]]" name="{{t[1]}}" min="0" max="50" step="1" pattern="([0-9])+" required aria-placeholder="Enter number">\n      </ion-input>\n    </ion-item>\n\n\n<ion-item>\n  <ion-textarea [(ngModel)]="guestLunch.remarks" name="remarks"\n             placeholder="Enter remarks if any" ></ion-textarea>\n\n</ion-item>\n\n    <button ion-button (click)="logForm(form)" type="submit" [disabled]="!form.valid" block>Create Guest Lunch Request\n    </button>\n  </form>\n</ion-content>\n'/*ion-inline-end:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/guest-lunch-form/guest-lunch-form.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_data_setter_data_setter__["a" /* DataSetterProvider */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular_components_toast_toast_controller__["a" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_5__providers_app_global_app_global__["a" /* AppGlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_vibration__["a" /* Vibration */],
            __WEBPACK_IMPORTED_MODULE_7__providers_data_getter_service_data_getter_service__["a" /* DataGetterServiceProvider */]])
    ], GuestLunchFormPage);
    return GuestLunchFormPage;
}());

//# sourceMappingURL=guest-lunch-form.js.map

/***/ }),

/***/ 156:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GrievancePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_app_global_app_global__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__grievance_filter_grievance_filter__ = __webpack_require__(385);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_data_getter_service_data_getter_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__grievance_form_grievance_form__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_moment__);
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
    function GrievancePage(navCtrl, navParams, dataGetterService, loadingCtrl, events, modalCtrl, toastCtrl, appGlobal) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataGetterService = dataGetterService;
        this.loadingCtrl = loadingCtrl;
        this.events = events;
        this.modalCtrl = modalCtrl;
        this.toastCtrl = toastCtrl;
        this.appGlobal = appGlobal;
        this.grievance_m = [];
        this.queryText = '';
        this.grievanceWhoseList = [];
        this.excludeWhoseGrievances = ["mine"];
        this.descending = false;
        this.order = -1;
        this.field = 'updated_at';
        this.events.subscribe('reload:grievance', function () {
            _this.refreshSRList(null);
        });
    }
    GrievancePage.prototype.sort = function () {
        this.descending = !this.descending;
        this.order = this.descending ? 1 : -1;
    };
    GrievancePage.prototype.loadGrievances = function (ref) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        if (ref === null) {
            loading.present();
        }
        this.dataGetterService.getGrievances()
            .subscribe(function (data) {
            console.log("kyc Loaded", data);
            var a = true;
            if (data.success || a) {
                _this.grievance_m = data.data;
                // this.grievance_m = data.grievances;
                _this.grievances = data.grievances;
                // this.grievanceWhoseList = _.uniq(this.grievances.map(grievance => grievance.whose)).sort();
                // this.updateGrievances();
            }
            else {
                // this.grievance_m = [];
                _this.grievance_m = [];
                // this.grievanceWhoseList = [];
                _this.updateGrievances();
            }
            loading.dismiss();
            if (ref != null) {
                ref.complete();
            }
        }, function (err) {
            console.log(err);
            _this.grievance_m = [];
            _this.grievances = [];
            // this.grievanceWhoseList = [];
            _this.updateGrievances();
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
    GrievancePage.prototype.ionViewDidEnter = function () {
        this.loadGrievances(null);
    };
    GrievancePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad GrievancePage');
    };
    GrievancePage.prototype.refreshSRList = function (ev) {
        this.loadGrievances(ev);
    };
    GrievancePage.prototype.goToSRForm = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__grievance_form_grievance_form__["a" /* GrievanceFormPage */]);
    };
    GrievancePage.prototype.goToGrievance = function (id) {
        console.log("@@click" + id);
        // this.navCtrl.push(GrievanceShowPage,{
        //   id:id,
        // });
    };
    GrievancePage.prototype.presentFilter = function () {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_1__grievance_filter_grievance_filter__["a" /* GrievanceFilterPage */], { excludeWhoseGrievances: this.excludeWhoseGrievances, grievanceWhoseList: this.grievanceWhoseList });
        modal.present();
        modal.onWillDismiss(function (grievanceWhose) {
            if (grievanceWhose) {
                _this.excludeWhoseGrievances = grievanceWhose;
            }
            _this.updateGrievances();
        });
    };
    GrievancePage.prototype.updateGrievances = function () {
        var _this = this;
        this.grievance_m.shownGrievances = 0;
        this.grievance_m.forEach(function (grievance) {
            _this.filterGrievances(grievance, _this.excludeWhoseGrievances);
            if (!grievance.hide) {
                _this.grievance_m.shownGrievances++;
            }
        });
        console.log("Final Showing", this.grievance_m);
    };
    GrievancePage.prototype.filterGrievances = function (grievance, excludeWhoseGrievances) {
        var excludeWhoseGrievance = false;
        if (excludeWhoseGrievances.indexOf(grievance.whose) !== -1) {
            excludeWhoseGrievance = true;
        }
        grievance.hide = !(excludeWhoseGrievance);
    };
    GrievancePage.prototype.getLastActivity = function (updated_at) {
        return __WEBPACK_IMPORTED_MODULE_6_moment__(updated_at).format("MMMM DD,YYYY hh:mm A");
    };
    GrievancePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'page-grievance',template:/*ion-inline-start:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/grievance/grievance.html"*/'<!--\n  Generated template for the GrievancePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Kyc</ion-title>\n  </ion-navbar>\n  <ion-toolbar no-border-top>\n    <ion-searchbar color="primary" [(ngModel)]="queryText" placeholder="Search">\n    </ion-searchbar>\n    <ion-buttons end>\n      <button ion-button icon-only [disabled]="grievance_m.length === 0" (click)="presentFilter()">\n        <ion-icon ios="ios-options-outline" md="md-options"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n\n<ion-content padding>\n  <ion-refresher (ionRefresh)="refreshSRList($event)">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n\n\n  <!-- <ion-list *ngIf="grievance_m.shownGrievances > 0"> -->\n      <ion-list>\n          <ion-card *ngFor="let grievance of grievance_m | search : {term:queryText,fields:[\'id\',\'kyc_number\',\'state\']} | sort: {property: field, order: order}" (click)="goToGrievance(grievance.id)" [hidden]="grievance.hide">\n            <div class="{{\'gr_state_sidebar_\'+ grievance.state}}">\n      \n            <!--<ion-card>-->\n            <ion-card-header>\n             \n              {{grievance.kyc_name}}\n              <span class="pull-right sr-age"> {{grievance.kyc_person_id}}</span>\n      \n            </ion-card-header>\n            <ion-card-content>\n                <p>Kyc Person Type:  <strong>{{grievance.kyc_person_type}}</strong></p>\n                <p>Kyc Details:      <strong>{{grievance.kyc_detail}}</strong></p>\n                <p>Kyc Number:       <strong>{{grievance.kyc_number}}</strong></p>\n                <p >Kyc File:        <strong> {{grievance.kyc_file}}</strong></p>\n               \n      \n            </ion-card-content>\n            <ion-row *ngIf="grievance_m.updated_at">\n              <ion-col>\n                <ion-note class="pull-right" style="color:black;">\n                  Last Activity: <b>{{getLastActivity(grievance_m.updated_at)}}</b>\n                </ion-note>\n              </ion-col>\n            </ion-row>\n            <ion-row>\n              <ion-col>\n                <ion-badge class="pull-right">{{grievance_m.state}}</ion-badge>\n              </ion-col>\n            </ion-row>\n           \n            </div>\n          </ion-card>\n        </ion-list>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n    <!-- <ion-list>\n    <ion-card *ngFor="let grievance of grievance_m | search : {term:queryText,fields:[\'uid\',\'content\',\'state\']} | sort: {property: field, order: order}" (click)="goToGrievance(grievance.uid)" [hidden]="grievance.hide">\n      <div class="{{\'gr_state_sidebar_\'+grievance.state}}">\n\n     \n      <ion-card-header>\n        {{grievance_m.kyc_person_id}}\n        <span class="pull-right sr-age">{{grievance_m.kyc_name}}</span>\n\n      </ion-card-header>\n      <ion-card-content>\n        <div [innerHtml]="\'<div>\'+grievance.content.substring(0,150)+\'....</div>\'">\n       \n        </div>\n     \n      </ion-card-content>\n      <ion-row *ngIf="grievance.updated_at">\n        <ion-col>\n          <ion-note class="pull-right" style="color:black;">\n            Last Activity: <b>{{getLastActivity(grievance.updated_at)}}</b>\n          </ion-note>\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col>\n          <ion-badge class="pull-right">{{grievance.state}}</ion-badge>\n        </ion-col>\n      </ion-row>\n     \n      </div>\n    </ion-card>\n  </ion-list> -->\n  <ion-fab right bottom>\n    <button ion-fab (click)="goToSRForm()"><ion-icon name="add"></ion-icon></button>\n  </ion-fab>\n\n  <ion-item *ngIf="grievance_m.shownGrievances === 0" text-center>\n    No Grievance to be Shown\n  </ion-item>\n\n</ion-content>\n'/*ion-inline-end:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/grievance/grievance.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["p" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["q" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__providers_data_getter_service_data_getter_service__["a" /* DataGetterServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["l" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* Events */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["n" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["s" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_0__providers_app_global_app_global__["a" /* AppGlobalProvider */]])
    ], GrievancePage);
    return GrievancePage;
}());

//# sourceMappingURL=grievance.js.map

/***/ }),

/***/ 157:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GuestRoomRequestFormPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_data_setter_data_setter__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_data_getter_service_data_getter_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_vibration__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_app_global_app_global__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular_components_toast_toast_controller__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_moment__ = __webpack_require__(1);
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
 * Generated class for the GuestRoomRequestFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var GuestRoomRequestFormPage = /** @class */ (function () {
    function GuestRoomRequestFormPage(navCtrl, navParams, dataGetterService, dataSetterService, toastCtrl, events, loadingCtrl, appGlobal, vibration) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataGetterService = dataGetterService;
        this.dataSetterService = dataSetterService;
        this.toastCtrl = toastCtrl;
        this.events = events;
        this.loadingCtrl = loadingCtrl;
        this.appGlobal = appGlobal;
        this.vibration = vibration;
        this.guestRoomRequest = {};
        this.rooms = [];
        this.minDate = "";
        this.initGuestRoomRequest();
    }
    GuestRoomRequestFormPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad GuestRoomRequestFormPage');
    };
    GuestRoomRequestFormPage.prototype.ionViewDidEnter = function () {
        this.loadRoomList();
        this.minDate = __WEBPACK_IMPORTED_MODULE_7_moment__().format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z';
    };
    GuestRoomRequestFormPage.prototype.initGuestRoomRequest = function () {
        this.guestRoomRequest = {
            address: '',
            check_in: '',
            check_out: '',
            number_of_guest: 1,
            single_lady: false,
            single_bed: false,
            food: false,
            detail: ''
        };
        this.rooms = [];
        this.minDate = "";
    };
    GuestRoomRequestFormPage.prototype.loadRoomList = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.dataGetterService.getRoomAddresses().subscribe(function (data) {
            console.log("Guest Room Loaded", data);
            if (data.success) {
                _this.events.publish('reload:guest-room-request');
                _this.rooms = data.room_addresses;
            }
            else {
                _this.initGuestRoomRequest();
                var toast = _this.toastCtrl.create({
                    message: _this.appGlobal.ServerError,
                    duration: 3000
                });
                toast.present();
                loading.dismiss();
                _this.navCtrl.pop();
            }
            loading.dismiss();
        }, function (error) {
            console.log(error);
            _this.initGuestRoomRequest();
            var toast = _this.toastCtrl.create({
                message: _this.appGlobal.ServerError,
                duration: 3000
            });
            toast.present();
            loading.dismiss();
        });
    };
    GuestRoomRequestFormPage.prototype.submitGuestRoomRequest = function (data) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.dataSetterService.createGuestRoomRequest(data).subscribe(function (data) {
            console.log("Create Guest Room Response", data);
            loading.dismiss();
            if (data.success) {
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
        }, function (error) {
            loading.dismiss();
            console.log(error);
            var toast = _this.toastCtrl.create({
                message: _this.appGlobal.ServerError,
                duration: 3000
            });
            toast.present();
        });
    };
    GuestRoomRequestFormPage.prototype.logForm = function (form) {
        if (form.value.detail.trim().length > 0)
            this.submitGuestRoomRequest(form.value);
        else
            alert("Details can't be blank");
    };
    GuestRoomRequestFormPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-guest-room-request-form',template:/*ion-inline-start:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/guest-room-request-form/guest-room-request-form.html"*/'<!--\n  Generated template for the GuestRoomRequestFormPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>New Guest House Request</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n  <form #form="ngForm">\n    <ion-item>\n      <ion-label color="primary" stacked>Address</ion-label>\n      <ion-select [(ngModel)]="guestRoomRequest.address" name="address" placeholder="Select Address"\n                  required interface="popover">\n        <ion-option value={{room.uid}} *ngFor="let room of rooms">{{room.name}}</ion-option>\n      </ion-select>\n    </ion-item>\n\n    <ion-item>\n      <ion-label color="primary" stacked>Check In</ion-label>\n      <ion-datetime [(ngModel)]="guestRoomRequest.check_in" name="check_in" displayFormat="DDDD MMM DD, YYYY HH:mm"\n                    min="{{minDate}}" placeholder="Select Date & Time" required></ion-datetime>\n    </ion-item>\n\n    <ion-item>\n      <ion-label color="primary" stacked>Check Out</ion-label>\n      <ion-datetime [(ngModel)]="guestRoomRequest.check_out" name="check_out" displayFormat="DDDD MMM DD, YYYY HH:mm"\n                    min="{{guestRoomRequest.check_in}}" placeholder="Select Date & Time" required></ion-datetime>\n    </ion-item>\n\n    <ion-item>\n      <ion-label color="primary">Number of Guests</ion-label>\n      <ion-input type="number" [(ngModel)]="guestRoomRequest.number_of_guest" name="number_of_guest"\n                 min="1" placeholder="Select Number of Guests" required></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label>Single Lady</ion-label>\n      <ion-checkbox [(ngModel)]="guestRoomRequest.single_lady" name="single_lady"></ion-checkbox>\n    </ion-item>\n\n    <ion-item>\n      <ion-label>Single Room</ion-label>\n      <ion-checkbox [(ngModel)]="guestRoomRequest.single_bed" name="single_bed"></ion-checkbox>\n    </ion-item>\n\n\n    <ion-item>\n      <ion-label color="primary" stacked>Details</ion-label>\n      <ion-textarea autoresize [(ngModel)]="guestRoomRequest.detail" name="detail"></ion-textarea>\n    </ion-item>\n\n\n    <button ion-button (click)="logForm(form)" type="submit" [disabled]="!form.valid" block>Create Guest House Request\n    </button>\n  </form>\n</ion-content>\n'/*ion-inline-end:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/guest-room-request-form/guest-room-request-form.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_data_getter_service_data_getter_service__["a" /* DataGetterServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_2__providers_data_setter_data_setter__["a" /* DataSetterProvider */],
            __WEBPACK_IMPORTED_MODULE_6_ionic_angular_components_toast_toast_controller__["a" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_5__providers_app_global_app_global__["a" /* AppGlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_vibration__["a" /* Vibration */]])
    ], GuestRoomRequestFormPage);
    return GuestRoomRequestFormPage;
}());

//# sourceMappingURL=guest-room-request-form.js.map

/***/ }),

/***/ 158:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GuestRoomRequestPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_data_getter_service_data_getter_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_app_global_app_global__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__guest_room_request_form_guest_room_request_form__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__guest_room_request_show_guest_room_request_show__ = __webpack_require__(71);
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
 * Generated class for the GuestRoomRequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var GuestRoomRequestPage = /** @class */ (function () {
    function GuestRoomRequestPage(navCtrl, navParams, dataGetterService, loadingCtrl, events, toastCtrl, appGlobal) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataGetterService = dataGetterService;
        this.loadingCtrl = loadingCtrl;
        this.events = events;
        this.toastCtrl = toastCtrl;
        this.appGlobal = appGlobal;
        this.guestRoomRequests = [];
        this.queryText = '';
        this.events.subscribe('reload:guest-room-request', function () {
            _this.refreshGuestRoomRequestList(null);
        });
    }
    GuestRoomRequestPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad GuestRoomRequestPage');
        this.loadGuestRoomRequests(null);
    };
    GuestRoomRequestPage.prototype.ionViewDidEnter = function () { };
    GuestRoomRequestPage.prototype.refreshGuestRoomRequestList = function (reference) {
        this.loadGuestRoomRequests(reference);
    };
    GuestRoomRequestPage.prototype.loadGuestRoomRequests = function (reference) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        if (reference === null) {
            loading.present();
        }
        this.dataGetterService.getAllGuestRoomRequests().subscribe(function (data) {
            console.log("Guest Room Requests Loaded", data);
            if (data.success) {
                _this.guestRoomRequests = data.room_requests;
            }
            else {
                _this.guestRoomRequests = [];
            }
            loading.dismiss();
            if (reference != null) {
                reference.complete();
            }
        }, function (error) {
            console.log(error);
            _this.guestRoomRequests = [];
            var toast = _this.toastCtrl.create({
                message: _this.appGlobal.ServerError,
                duration: 3000
            });
            toast.present();
            loading.dismiss();
            if (reference != null) {
                reference.complete();
            }
        });
    };
    GuestRoomRequestPage.prototype.goToGuestRoomRequest = function (uid) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__guest_room_request_show_guest_room_request_show__["a" /* GuestRoomRequestShowPage */], {
            id: uid,
        });
    };
    GuestRoomRequestPage.prototype.goToGuestRoomRequestForm = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__guest_room_request_form_guest_room_request_form__["a" /* GuestRoomRequestFormPage */]);
    };
    GuestRoomRequestPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-guest-room-request',template:/*ion-inline-start:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/guest-room-request/guest-room-request.html"*/'<!--\n  Generated template for the GuestRoomRequestPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Guest House Requests</ion-title>\n  </ion-navbar>\n\n  <ion-toolbar no-border-top>\n    <ion-searchbar color="primary" [(ngModel)]="queryText" placeholder="Search"></ion-searchbar>\n  </ion-toolbar>\n</ion-header>\n\n\n<ion-content>\n  <ion-refresher (ionRefresh)="refreshGuestRoomRequestList($event)">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n\n  <ion-list>\n    <ion-card\n      *ngFor="let guestRoomRequest of guestRoomRequests | search : {term:queryText,fields:[\'uid\',\'address\',\'number_of_guest\', \'check_in\', \'check_out\', \'detail\']}"\n      (click)="goToGuestRoomRequest(guestRoomRequest.uid)">\n      <div class="{{\'guest_room_request_state_sidebar_\'+guestRoomRequest.state}}">\n        <ion-card-header>\n          {{guestRoomRequest.uid}}\n          <span class="pull-right sr-age">{{guestRoomRequest.age}}</span>\n        </ion-card-header>\n\n        <ion-card-content>\n          <p>Address: <strong>{{guestRoomRequest.address}}</strong></p>\n          <p>Number of Guest: <strong>{{guestRoomRequest.number_of_guest}}</strong></p>\n          <p>Check In: <strong>{{guestRoomRequest.check_in}}</strong></p>\n          <p>Check Out: <strong>{{guestRoomRequest.check_out}}</strong></p>\n        </ion-card-content>\n\n        <ion-row *ngIf="guestRoomRequest.approved">\n          <ion-col>\n            <div class="pull-right">\n              <p>Approved By: <strong>{{guestRoomRequest.approver}}</strong></p>\n              <p>Approved At: <strong>{{guestRoomRequest.approved_at}}</strong></p>\n            </div>\n          </ion-col>\n        </ion-row>\n\n        <ion-row>\n          <ion-col>\n            <ion-badge class="pull-right">{{guestRoomRequest.state}}</ion-badge>\n          </ion-col>\n        </ion-row>\n      </div>\n    </ion-card>\n  </ion-list>\n\n  <ion-fab right bottom>\n    <button ion-fab (click)="goToGuestRoomRequestForm()">\n      <ion-icon name="add"></ion-icon>\n    </button>\n  </ion-fab>\n</ion-content>\n'/*ion-inline-end:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/guest-room-request/guest-room-request.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_data_getter_service_data_getter_service__["a" /* DataGetterServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_app_global_app_global__["a" /* AppGlobalProvider */]])
    ], GuestRoomRequestPage);
    return GuestRoomRequestPage;
}());

//# sourceMappingURL=guest-room-request.js.map

/***/ }),

/***/ 159:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IntroPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(72);
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
    function IntroPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.introContent = [];
        this.setIntroContent();
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
            selector: 'page-intro',template:/*ion-inline-start:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/intro/intro.html"*/'<ion-content>\n  <ion-slides pager="false" parallax="true" padding>\n\n    <ion-slide *ngFor="let item of introContent">\n      <h2>{{item.title}}</h2>\n      <img src="{{item.image}}" alt="{{item.image}}">\n      <h4>\n        <div [innerHtml]="item.content"></div>\n      </h4>\n    </ion-slide>\n\n\n    <ion-slide>\n      <img src="assets/img/appicon.png">\n      <h1>Get started now!</h1>\n      <button ion-button outline small (click)="navHome()">\n        Start using the app\n      </button>\n    </ion-slide>\n\n  </ion-slides>\n</ion-content>\n'/*ion-inline-end:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/intro/intro.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavParams */]])
    ], IntroPage);
    return IntroPage;
}());

//# sourceMappingURL=intro.js.map

/***/ }),

/***/ 160:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VisitingCardFormPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_user_data_ts__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_vibration__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_data_setter_data_setter__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular_components_toast_toast_controller__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_app_global_app_global__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_data_getter_service_data_getter_service__ = __webpack_require__(9);
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
 * Generated class for the VisitingCardFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var VisitingCardFormPage = /** @class */ (function () {
    function VisitingCardFormPage(navCtrl, navParams, user, dataGetterService, dataSetterService, toastCtrl, events, loadingCtrl, appGlobal, vibration) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.user = user;
        this.dataGetterService = dataGetterService;
        this.dataSetterService = dataSetterService;
        this.toastCtrl = toastCtrl;
        this.events = events;
        this.loadingCtrl = loadingCtrl;
        this.appGlobal = appGlobal;
        this.vibration = vibration;
        this.visitingCard = {};
        this.initVisitingCard();
    }
    VisitingCardFormPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad VisitingCardFormPage');
    };
    VisitingCardFormPage.prototype.ionViewDidEnter = function () {
        this.loadCompanyDetails();
    };
    VisitingCardFormPage.prototype.initVisitingCard = function () {
        this.visitingCard = {
            company_name: "",
            company_address: "",
            name: "",
            designation: "",
            email: "",
            mobile_no: "",
            landline: ""
        };
    };
    VisitingCardFormPage.prototype.loadCompanyDetails = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.dataGetterService.getCompanyDetails().subscribe(function (data) {
            console.log("Guest Lunch Loaded", data);
            if (data.success) {
                _this.visitingCard.company_name = data.data.company_name;
                _this.visitingCard.company_address = data.data.company_address;
                _this.visitingCard.name = _this.user.userData.name;
                _this.visitingCard.designation = _this.user.userData.designation;
                _this.visitingCard.email = _this.user.userData.email;
                _this.visitingCard.mobile_no = _this.user.userData.mobile;
                _this.visitingCard.landline = _this.user.userData.extension;
            }
            else {
                _this.initVisitingCard();
                var toast = _this.toastCtrl.create({
                    message: _this.appGlobal.ServerError,
                    duration: 3000
                });
                toast.present();
                loading.dismiss();
                _this.navCtrl.pop();
            }
            loading.dismiss();
        }, function (error) {
            console.log(error);
            _this.initVisitingCard();
            var toast = _this.toastCtrl.create({
                message: _this.appGlobal.ServerError,
                duration: 3000
            });
            toast.present();
            loading.dismiss();
        });
    };
    VisitingCardFormPage.prototype.submitVisitingCardRequest = function (data) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.dataSetterService.createVisitingCard(data).subscribe(function (data) {
            console.log("Create Visiting Card Response", data);
            loading.dismiss();
            if (data.success) {
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
        }, function (error) {
            loading.dismiss();
            console.log(error);
            var toast = _this.toastCtrl.create({
                message: _this.appGlobal.ServerError,
                duration: 3000
            });
            toast.present();
        });
    };
    VisitingCardFormPage.prototype.logForm = function (form) {
        if (form.value.name.trim().length > 0)
            this.submitVisitingCardRequest(form.value);
        else
            alert("Name cannot be blank!");
    };
    VisitingCardFormPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-visiting-card-form',template:/*ion-inline-start:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/visiting-card-form/visiting-card-form.html"*/'<!--\n  Generated template for the VisitingCardFormPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>New Visiting Card Request</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n  <form #form="ngForm">\n    <ion-item>\n      <ion-label color="primary" stacked>Company Name</ion-label>\n      <ion-input type="text" [(ngModel)]="visitingCard.company_name" name="company_name" readonly></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label color="primary" stacked>Company Address</ion-label>\n      <ion-textarea autoresize [(ngModel)]="visitingCard.company_address" name="company_address"\n                    readonly></ion-textarea>\n    </ion-item>\n\n    <ion-item>\n      <ion-label color="primary" stacked>Name</ion-label>\n      <ion-input type="text" [(ngModel)]="visitingCard.name" name="name" required></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label color="primary" stacked>Designation</ion-label>\n      <ion-input type="text" [(ngModel)]="visitingCard.designation" name="designation" readonly></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label color="primary" stacked>Email</ion-label>\n      <ion-input type="text" [(ngModel)]="visitingCard.email" name="email" readonly></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label color="primary" stacked>Mobile Number</ion-label>\n      <ion-input type="text" [(ngModel)]="visitingCard.mobile_no" name="mobile_no" pattern="^\\d{10}$" minlength="10"\n                 maxlength="10" required></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label color="primary" stacked>Landline</ion-label>\n      <ion-input type="text" [(ngModel)]="visitingCard.landline" name="landline" pattern="^\\d{1,15}$" minlength="1"\n                 maxlength="15" required></ion-input>\n    </ion-item>\n\n    <button ion-button (click)="logForm(form)" type="submit" [disabled]="!form.valid" block>Create Visiting Card Request\n    </button>\n  </form>\n</ion-content>\n'/*ion-inline-end:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/visiting-card-form/visiting-card-form.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_user_data_ts__["a" /* UserData */],
            __WEBPACK_IMPORTED_MODULE_7__providers_data_getter_service_data_getter_service__["a" /* DataGetterServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_data_setter_data_setter__["a" /* DataSetterProvider */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular_components_toast_toast_controller__["a" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_6__providers_app_global_app_global__["a" /* AppGlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_vibration__["a" /* Vibration */]])
    ], VisitingCardFormPage);
    return VisitingCardFormPage;
}());

//# sourceMappingURL=visiting-card-form.js.map

/***/ }),

/***/ 161:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MaintenanceRequestFormPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_data_setter_data_setter__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_data_getter_service_data_getter_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_vibration__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_app_global_app_global__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular_components_toast_toast_controller__ = __webpack_require__(17);
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
 * Generated class for the MaintenanceRequestFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MaintenanceRequestFormPage = /** @class */ (function () {
    function MaintenanceRequestFormPage(navCtrl, navParams, dataGetterService, dataSetterService, toastCtrl, events, loadingCtrl, appGlobal, vibration) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataGetterService = dataGetterService;
        this.dataSetterService = dataSetterService;
        this.toastCtrl = toastCtrl;
        this.events = events;
        this.loadingCtrl = loadingCtrl;
        this.appGlobal = appGlobal;
        this.vibration = vibration;
        this.maintenanceRequest = {};
        this.Addbeneficialy = {};
        this.assets = [];
        this.locations = [];
        this.SurveyorID = navParams.get('Surveyor');
        console.log("@@@@@  Surveyor :" + this.SurveyorID);
        this.initMaintenanceRequest();
    }
    MaintenanceRequestFormPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MaintenanceRequestFormPage');
    };
    MaintenanceRequestFormPage.prototype.ionViewDidEnter = function () {
        this.loadAssetsList();
    };
    MaintenanceRequestFormPage.prototype.initMaintenanceRequest = function () {
        this.Addbeneficialy = {
            code: '',
            firstname: '',
            lastname: '',
            middlename: '',
            age: '',
            gender: '',
            date_of_birth: '',
            household_id: '',
            village_id: '',
            family_head_id: '',
            contact_number: '',
            whatsapp_number: '',
            user_id: this.SurveyorID,
            family_head_relation: ''
        };
        this.maintenanceRequest = {
            maintenanceasset_id: 0,
            detail: '',
            location: ''
        };
        this.assets = [];
    };
    MaintenanceRequestFormPage.prototype.loadAssetsList = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.dataGetterService.getMaintenanceAssets().subscribe(function (data) {
            console.log("Assets Loaded", data);
            if (data.success) {
                _this.assets = data.maintenance_assets;
            }
            else {
                _this.initMaintenanceRequest();
                var toast = _this.toastCtrl.create({
                    message: _this.appGlobal.ServerError,
                    duration: 3000
                });
                toast.present();
                loading.dismiss();
                _this.navCtrl.pop();
            }
            loading.dismiss();
        }, function (error) {
            console.log(error);
            _this.initMaintenanceRequest();
            var toast = _this.toastCtrl.create({
                message: _this.appGlobal.ServerError,
                duration: 3000
            });
            toast.present();
            loading.dismiss();
        });
        this.dataGetterService.getMRLocations().subscribe(function (data) {
            console.log("Assets Loaded", data);
            if (data.success) {
                _this.locations = data.locations;
            }
            else {
                var toast = _this.toastCtrl.create({
                    message: _this.appGlobal.ServerError,
                    duration: 3000
                });
                toast.present();
                loading.dismiss();
                _this.navCtrl.pop();
            }
        }, function (error) {
            console.log(error);
            _this.initMaintenanceRequest();
            var toast = _this.toastCtrl.create({
                message: _this.appGlobal.ServerError,
                duration: 3000
            });
            toast.present();
            loading.dismiss();
        });
    };
    MaintenanceRequestFormPage.prototype.submitMaintenanceRequest = function (data) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.dataSetterService.createMaintenanceRequest(data).subscribe(function (data) {
            console.log("Create Maintenance Response", data);
            loading.dismiss();
            if (data.success) {
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
        }, function (error) {
            loading.dismiss();
            console.log(error);
            var toast = _this.toastCtrl.create({
                message: _this.appGlobal.ServerError,
                duration: 3000
            });
            toast.present();
        });
    };
    MaintenanceRequestFormPage.prototype.logForm = function (form) {
        this.submitMaintenanceRequest(form.value);
        // debugger;
        // if(form.value.detail.trim().length > 0){
        //   console.log("formvale folloing")
        //   this.submitMaintenanceRequest(form.value);
        // }else{
        //   alert("Detail cannot be blank!");
        // }
    };
    MaintenanceRequestFormPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-maintenance-request-form',template:/*ion-inline-start:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/maintenance-request-form/maintenance-request-form.html"*/'<!--\n  Generated template for the MaintenanceRequestFormPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <!-- <ion-title>New Facility Request</ion-title> -->\n\n    <ion-title>Add New Beneficialy</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <form #form="ngForm"  >\n    <ion-list>\n\n\n        <ion-item>\n            <ion-label stacked floating color="primary">Code</ion-label>\n           <ion-input name="code" type="text" [(ngModel)]="Addbeneficialy.code" required></ion-input>\n         </ion-item>\n         <ion-item>\n            <ion-label stacked floating color="primary">serveryer Id</ion-label>\n           <ion-input name="user_id" type="text" [(ngModel)]="Addbeneficialy.user_id" required></ion-input>\n         </ion-item>\n        <ion-item>\n            <ion-label stacked floating color="primary">Firstname</ion-label>\n           <ion-input name="firstname" type="text" [(ngModel)]="Addbeneficialy.firstname" required></ion-input>\n         </ion-item>\n         <ion-item>\n            <ion-label stacked floating color="primary">Middlename</ion-label>\n           <ion-input name="middlename" type="text" [(ngModel)]="Addbeneficialy.middlename" required></ion-input>\n         </ion-item>\n         <ion-item>\n            <ion-label stacked floating color="primary">Lastname</ion-label>\n           <ion-input name="lastname" type="text" [(ngModel)]="Addbeneficialy.lastname" required></ion-input>\n         </ion-item>\n          <ion-item> \n          <ion-label stacked floating color="primary">Age</ion-label>\n          <ion-input name="age" type="text" [(ngModel)]="Addbeneficialy.age" required></ion-input>\n      </ion-item>\n\n\n\n      <ion-list  radio-group [(ngModel)]="Addbeneficialy.gender" name="gender" >\n        <ion-list-header><strong>Gender</strong></ion-list-header>\n          <ion-item >\n              <ion-label>Male</ion-label>\n              <ion-radio value="Male"></ion-radio>\n          </ion-item>\n          <ion-item >\n              <ion-label>FeMale</ion-label>\n              <ion-radio value="FeMale"></ion-radio>\n          </ion-item>\n          <ion-item >\n              <ion-label>Other</ion-label>\n              <ion-radio value="other"></ion-radio>\n          </ion-item>\n      </ion-list>\n\n\n\n\n\n    <ion-item> \n          <ion-label stacked floating color="primary">Borth Date</ion-label>\n          <ion-datetime  name="date_of_birth"  displayFormat="MM/DD/YYYY"  [(ngModel)]="Addbeneficialy.date_of_birth" ></ion-datetime>\n      </ion-item>\n      <ion-item> \n          <ion-label stacked floating color="primary">House hold ID  </ion-label>\n          <ion-input name="household_id" type="text" [(ngModel)]="Addbeneficialy.household_id" required></ion-input>\n      </ion-item>\n      <ion-item> \n          <ion-label stacked floating color="primary">Village ID</ion-label>\n          <ion-input name="village_id" type="text" [(ngModel)]="Addbeneficialy.village_id" required></ion-input>\n      </ion-item>\n      <ion-item> \n          <ion-label stacked floating color="primary">Family Hade Id</ion-label>\n          <ion-input name="family_head_id" type="text" [(ngModel)]="Addbeneficialy.family_head_id" required></ion-input>\n      </ion-item>\n      <ion-item> \n          <ion-label stacked floating color="primary">Contact Number</ion-label>\n          <ion-input name="contact_number" type="text" [(ngModel)]="Addbeneficialy.contact_number" required></ion-input>\n      </ion-item>\n      <ion-item> \n          <ion-label stacked floating color="primary"> Whatsapp Number</ion-label>\n          <ion-input name="whatsapp_number" type="text" [(ngModel)]="Addbeneficialy.whatsapp_number" required></ion-input>\n      </ion-item>\n      <ion-item> \n        <ion-label stacked floating color="primary">Relation With Family had  </ion-label>\n        <ion-input name="family_head_relation" type="text" [(ngModel)]="Addbeneficialy.family_head_relation" required></ion-input>\n    </ion-item>\n    </ion-list>\n    <button ion-button (click)="logForm(form)" type="submit" [disabled]="!form.valid" block>submit \n      </button>  \n  \n  </form>\n</ion-content>\n\n\n\n\n\n\n<!-- <ion-content padding>\n  <form #form="ngForm">\n    <ion-item>\n      <ion-label color="primary" stacked>Assets</ion-label>\n      <ion-select [(ngModel)]="maintenanceRequest.maintenanceasset_id" name="maintenanceasset_id"\n                  placeholder="Select Asset"\n                  required interface="popover"><button ion-button (click)="logForm(form)" type="submit" [disabled]="!form.valid" block>Create Facility Request\n    </button>\n        <ion-option value={{asset.uid}} *ngFor="let asset of assets">{{asset.name}}</ion-option>\n      </ion-select>\n    </ion-item>\n\n    <ion-item>\n      <ion-label>Location</ion-label>\n      <ion-select  [(ngModel)]="maintenanceRequest.location" name="location">\n        <ion-option *ngFor="let l of locations" [value]="l">{{l}}</ion-option>\n      </ion-select>\n    </ion-item>\n\n\n\n    <ion-item>\n      <ion-label color="primary" stacked>Details</ion-label>\n      <ion-textarea autoresize [(ngModel)]="maintenanceRequest.detail" name="detail" required minLength="1"></ion-textarea>\n    </ion-item>\n\n    <button ion-button (click)="logForm(form)" type="submit" [disabled]="!form.valid" block>Create Facility Request\n    </button>\n  </form>\n</ion-content> -->\n\n\n\n\n\n'/*ion-inline-end:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/maintenance-request-form/maintenance-request-form.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_data_getter_service_data_getter_service__["a" /* DataGetterServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_2__providers_data_setter_data_setter__["a" /* DataSetterProvider */],
            __WEBPACK_IMPORTED_MODULE_6_ionic_angular_components_toast_toast_controller__["a" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_5__providers_app_global_app_global__["a" /* AppGlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_vibration__["a" /* Vibration */]])
    ], MaintenanceRequestFormPage);
    return MaintenanceRequestFormPage;
}());

//# sourceMappingURL=maintenance-request-form.js.map

/***/ }),

/***/ 162:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StationeryRequestFormPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_vibration__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_data_setter_data_setter__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular_components_toast_toast_controller__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_data_getter_service_data_getter_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_app_global_app_global__ = __webpack_require__(6);
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
 * Generated class for the StationeryRequestFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var StationeryRequestFormPage = /** @class */ (function () {
    function StationeryRequestFormPage(navCtrl, navParams, dataGetterService, dataSetterService, toastCtrl, events, loadingCtrl, appGlobal, vibration) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataGetterService = dataGetterService;
        this.dataSetterService = dataSetterService;
        this.toastCtrl = toastCtrl;
        this.events = events;
        this.loadingCtrl = loadingCtrl;
        this.appGlobal = appGlobal;
        this.vibration = vibration;
        this.stationeryRequest = {};
        this.stationeries = [];
        this.locations = [];
        this.initStationeryRequest();
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
    }
    StationeryRequestFormPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad StationeryRequestFormPage');
    };
    StationeryRequestFormPage.prototype.ionViewDidEnter = function () {
        this.loading.present();
        this.loadStationeryList("Corporate");
    };
    StationeryRequestFormPage.prototype.initStationeryRequest = function () {
        this.stationeryRequest = {
            stationery_id: 0,
            requested_quantity: 0,
            location: "",
            details: ""
        };
        this.stationeries = [];
    };
    StationeryRequestFormPage.prototype.getStationeryList = function (l) {
        this.loadStationeryList(l);
    };
    StationeryRequestFormPage.prototype.loadLocations = function () {
        var _this = this;
        this.dataGetterService.getMRLocations().subscribe(function (data) {
            console.log("Assets Loaded", data);
            if (data.success) {
                _this.locations = data.locations;
                _this.loading.dismiss();
            }
            else {
                var toast = _this.toastCtrl.create({
                    message: _this.appGlobal.ServerError,
                    duration: 3000
                });
                toast.present();
                _this.navCtrl.pop();
            }
        }, function (error) {
            console.log(error);
            var toast = _this.toastCtrl.create({
                message: _this.appGlobal.ServerError,
                duration: 3000
            });
            toast.present();
        });
    };
    StationeryRequestFormPage.prototype.loadStationeryList = function (l) {
        var _this = this;
        this.dataGetterService.getStationeries(l).subscribe(function (data) {
            console.log("Stationeries Loaded", data);
            if (data.success) {
                _this.stationeries = data.stationeries;
                _this.loadLocations();
            }
            else {
                _this.initStationeryRequest();
                var toast = _this.toastCtrl.create({
                    message: _this.appGlobal.ServerError,
                    duration: 3000
                });
                toast.present();
                _this.navCtrl.pop();
            }
        }, function (error) {
            console.log(error);
            _this.initStationeryRequest();
            var toast = _this.toastCtrl.create({
                message: _this.appGlobal.ServerError,
                duration: 3000
            });
            toast.present();
            _this.loading.dismiss();
        });
    };
    StationeryRequestFormPage.prototype.submitStationeryRequest = function (data) {
        var _this = this;
        if (data.location.length == 0) {
            var toast = this.toastCtrl.create({
                message: "Select a location",
                duration: 3000
            });
            toast.present();
            return false;
        }
        if (data.stationery_id == 0 || data.requested_quantity == 0) {
            var toast = this.toastCtrl.create({
                message: "Select a category and ensure required quantity is more than 0",
                duration: 3000
            });
            toast.present();
            return false;
        }
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.dataSetterService.createStationeryRequest(data).subscribe(function (data) {
            console.log("Create Stationery Response", data);
            loading.dismiss();
            if (data.success) {
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
        }, function (error) {
            loading.dismiss();
            console.log(error);
            var toast = _this.toastCtrl.create({
                message: _this.appGlobal.ServerError,
                duration: 3000
            });
            toast.present();
        });
    };
    StationeryRequestFormPage.prototype.logForm = function (form) {
        console.log(form.value);
        this.submitStationeryRequest(form.value);
    };
    StationeryRequestFormPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-stationery-request-form',template:/*ion-inline-start:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/stationery-request-form/stationery-request-form.html"*/'<!--\n  Generated template for the StationeryRequestFormPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>New Stationery Request</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n  <form #form="ngForm">\n\n    <ion-item>\n      <ion-label>Location</ion-label>\n      <ion-select #location  [(ngModel)]="stationeryRequest.location" name="location" (ionChange)="getStationeryList(location.value)" >\n        <ion-option *ngFor="let l of locations" [value]="l">{{l}}</ion-option>\n\n\n      </ion-select>\n    </ion-item>\n    <ion-item>\n      <ion-label color="primary" stacked>Stationery Item</ion-label>\n      <ion-select [(ngModel)]="stationeryRequest.stationery_id" name="stationery_id" placeholder="Select Stationery"\n                  required interface="popover">\n        <ion-option value={{stationery.uid}} *ngFor="let stationery of stationeries">{{stationery.name}}</ion-option>\n      </ion-select>\n    </ion-item>\n\n    <ion-item>\n      <ion-label color="primary">Required Quantity</ion-label>\n      <ion-input [(ngModel)]="stationeryRequest.requested_quantity" name="requested_quantity" min="1" max="50" step="1" pattern="([1-90])+" required></ion-input>\n    </ion-item>\n<ion-item>\n      <ion-label color="primary">Details</ion-label>\n      <ion-textarea autoresize [(ngModel)]="stationeryRequest.details" name="details" ></ion-textarea>\n    </ion-item>\n\n\n    <button ion-button (click)="logForm(form)" type="submit" [disabled]="!form.valid" block>Create Stationery Request\n    </button>\n  </form>\n</ion-content>\n'/*ion-inline-end:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/stationery-request-form/stationery-request-form.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_5__providers_data_getter_service_data_getter_service__["a" /* DataGetterServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_data_setter_data_setter__["a" /* DataSetterProvider */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular_components_toast_toast_controller__["a" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_6__providers_app_global_app_global__["a" /* AppGlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_vibration__["a" /* Vibration */]])
    ], StationeryRequestFormPage);
    return StationeryRequestFormPage;
}());

//# sourceMappingURL=stationery-request-form.js.map

/***/ }),

/***/ 163:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IdeaFormPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_native_vibration__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_app_global_app_global__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_data_setter_data_setter__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular_components_toast_toast_controller__ = __webpack_require__(17);
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
            selector: 'page-idea-form',template:/*ion-inline-start:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/idea-form/idea-form.html"*/'<!--\n  Generated template for the IdeaFormPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>New Idea</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <form  #form="ngForm">\n    <ion-item>\n      <ion-input type="text" [(ngModel)]="idea.title" name="title" placeholder="Enter title of your idea" required></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-textarea [(ngModel)]="idea.content" name="content" rows="5" placeholder="Enter details" required></ion-textarea>\n    </ion-item>\n    <!--<ion-list>-->\n      <!--<ion-item>-->\n        <!--<ion-label>Category</ion-label>-->\n        <!--<ion-select [(ngModel)]="idea.category" name="category" required>-->\n          <!--<ion-option value="INTRANET">Intarnet</ion-option>-->\n          <!--<ion-option value="ERP & Other Applications">ERP & Other Applications</ion-option>-->\n          <!--<ion-option value="Infrastructure">Infrastructure</ion-option>-->\n\n        <!--</ion-select>-->\n      <!--</ion-item>-->\n    <!--</ion-list>-->\n\n      <!--<h4>Image Preview</h4>-->\n      <ion-item *ngIf="imageURI">\n        <img src="{{imageURI}}"  alt="Ionic File" width="300"/>\n      </ion-item>\n\n    <ion-buttons>\n      <!-- <p>{{imageURI}}</p> -->\n      <ion-grid>\n        <ion-row>\n          <ion-col>\n            <button ion-button color="secondary" round (click)="getImageFromCamera()" block>Camera</button>\n          </ion-col>\n          <ion-col>\n            <button ion-button color="secondary" round (click)="getImageFromFS()" block>Gallery</button>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-buttons>\n\n    <button ion-button (click)="logForm(form)" type="submit" [disabled]="!form.valid" block>Add Idea</button>\n  </form>\n\n\n</ion-content>\n\n'/*ion-inline-end:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/idea-form/idea-form.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["p" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["q" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__providers_data_setter_data_setter__["a" /* DataSetterProvider */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_6_ionic_angular_components_toast_toast_controller__["a" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* Events */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["l" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1__providers_app_global_app_global__["a" /* AppGlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_0__ionic_native_vibration__["a" /* Vibration */]])
    ], IdeaFormPage);
    return IdeaFormPage;
}());

//# sourceMappingURL=idea-form.js.map

/***/ }),

/***/ 164:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LeaveDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_leave_data_leave_data__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular_components_toast_toast_controller__ = __webpack_require__(17);
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
 * Generated class for the LeaveDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LeaveDetailPage = /** @class */ (function () {
    function LeaveDetailPage(navCtrl, navParams, leaveData, toastCtrl, alertCtrl, events) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.leaveData = leaveData;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.events = events;
        console.log(this.navParams.data);
        this.leave = this.navParams.get("LeaveData");
        this.segment = this.navParams.get("segment");
    }
    LeaveDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LeaveDetailPage');
    };
    LeaveDetailPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        console.log('ionViewWillEnter LeaveDetailPage');
        this.leaveData.loadLeaveDetails(this.leave.Leave_Application_ID)
            .then(function (data) {
            console.log(data);
            if (!!data.success) {
                _this.leaveDetails = data.data[0];
            }
            else {
                var toast = _this.toastCtrl.create({
                    message: data.message,
                    duration: 3000
                });
                toast.present();
                _this.navCtrl.pop();
            }
        });
    };
    LeaveDetailPage.prototype.ionViewDidEnter = function () {
        console.log(this.leaveDetails);
    };
    LeaveDetailPage.prototype.cancelLeave = function () {
    };
    LeaveDetailPage.prototype.leaveApproval = function (title, btntext, application_status) {
        var _this = this;
        title = btntext + " Leave";
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: 'Are You Sure?',
            inputs: [
                {
                    name: 'application_comment',
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
                    text: btntext,
                    handler: function (data) {
                        console.log(_this.leave, application_status, data.application_comment);
                        if (data.application_comment !== '') {
                            _this.leaveData.doLeaveApproval(_this.leave, application_status, data.application_comment)
                                .then(function (data) {
                                console.log(data);
                                if (!!data.success) {
                                    var toast = _this.toastCtrl.create({
                                        message: data.message,
                                        duration: 3000
                                    });
                                    toast.present();
                                    _this.events.publish('reload:leaves');
                                    _this.navCtrl.pop();
                                }
                                else {
                                    var toast = _this.toastCtrl.create({
                                        message: data.message,
                                        duration: 3000
                                    });
                                    toast.present();
                                }
                            });
                        }
                        else {
                            var toast = _this.toastCtrl.create({
                                message: "Comment is required",
                                duration: 5000
                            });
                            toast.present();
                        }
                    }
                }
            ]
        });
        alert.present();
    };
    LeaveDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-leave-detail',template:/*ion-inline-start:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/leave-detail/leave-detail.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Leave Application</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <div *ngIf="leaveDetails">\n    <h1>LEAVE FROM {{leaveDetails.FromDate}} FOR {{leaveDetails.Leave_Period}} DAYS</h1>\n    <ion-grid class="border">\n      <ion-row>\n        <ion-col col-6><strong>Status</strong></ion-col>\n        <ion-col col-6>{{leaveDetails.Application_Status === \'A\'?\'Approved\':leaveDetails.Application_Status === \'R\'?\'Rejected\':\'Pending\'}}</ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col col-6><strong>Type</strong></ion-col>\n        <ion-col col-6>{{leaveDetails.Leave_Name}}</ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col col-6><strong>From</strong></ion-col>\n        <ion-col col-6>{{leaveDetails.FromDate}}</ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col col-6><strong>To</strong></ion-col>\n        <ion-col col-6>{{leaveDetails.ToDate}}</ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col col-6><strong>No. of Day(s)</strong></ion-col>\n        <ion-col col-6>{{leaveDetails.Leave_Period}}</ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col col-6><strong>Reporting Manager</strong></ion-col>\n        <ion-col col-6>{{leaveDetails.Senior_Emp_Name}}</ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col col-6><strong>Reason</strong></ion-col>\n        <ion-col col-6>{{leaveDetails.Leave_Reason}}</ion-col>\n      </ion-row>\n      <ion-row *ngIf=\'leaveDetails.Approval_Rejection_Comment\'>\n        <ion-col col-6><strong>Approver Comments</strong></ion-col>\n        <ion-col col-6>{{leaveDetails.Approval_Rejection_Comment}}</ion-col>\n      </ion-row>\n    </ion-grid>\n  </div>\n  <div *ngIf="!leaveDetails">\n    <h4>Please wait loading...</h4>\n  </div>\n</ion-content>\n<ion-footer no-shadow>\n  <ion-buttons position="bottom">\n    <div *ngIf=\'segment === "all"\'>\n      <ion-grid>\n        <ion-row>\n          <ion-col>\n            <button ion-button color="danger" round hidden="true" icon-left (click)="cancelLeave()" block>\n              <ion-icon name="close"></ion-icon>\n              Cancel\n            </button>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </div>\n    <div *ngIf=\'segment === "pending"\'>\n      <ion-grid>\n        <ion-row>\n          <ion-col>\n            <button ion-button color="danger" round icon-left (click)="leaveApproval(\'Rejection\',\'Reject\',\'R\')" block>\n              <ion-icon name="close"></ion-icon>\n              Reject\n            </button>\n          </ion-col>\n          <ion-col>\n            <button ion-button color="secondary" round icon-left (click)="leaveApproval(\'Approval\',\'Approve\',\'A\')" block>\n              <ion-icon name="checkmark"></ion-icon>\n              Approve\n            </button>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </div>\n  </ion-buttons>\n</ion-footer>\n\n'/*ion-inline-end:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/leave-detail/leave-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["p" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["q" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_0__providers_leave_data_leave_data__["a" /* LeaveDataProvider */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular_components_toast_toast_controller__["a" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* Events */]])
    ], LeaveDetailPage);
    return LeaveDetailPage;
}());

//# sourceMappingURL=leave-detail.js.map

/***/ }),

/***/ 165:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LeaveFilterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular_components_alert_alert_controller__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_leave_data_leave_data__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(2);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LeaveFilterPage = /** @class */ (function () {
    function LeaveFilterPage(navCtrl, navParams, viewCtrl, leaveData, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.leaveData = leaveData;
        this.alertCtrl = alertCtrl;
        this.leaveTypes = [];
        this.leaveStatues = [];
        console.log(this.navParams.data);
        var excludedLeaveTypes = this.navParams.data.excludeLeaves;
        var excludedLeaveStatus = this.navParams.data.excludeStatues;
        this.leaveData.getLeaveTypes().subscribe(function (leaveTypes) {
            leaveTypes.forEach(function (leavetype) {
                _this.leaveTypes.push({
                    name: leavetype,
                    isChecked: (excludedLeaveTypes.indexOf(leavetype) === -1)
                });
            });
        });
        this.leaveData.getLeaveStatus().subscribe(function (leaveStatues) {
            leaveStatues.forEach(function (leaveStatus) {
                _this.leaveStatues.push({
                    name: leaveStatus,
                    isChecked: (excludedLeaveStatus.indexOf(leaveStatus) === -1)
                });
            });
        });
    }
    LeaveFilterPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LeaveFilterPage');
    };
    LeaveFilterPage.prototype.resetFilters = function () {
        // reset all of the toggles to be checked
        this.leaveTypes.forEach(function (type) {
            type.isChecked = true;
        });
        this.leaveStatues.forEach(function (status) {
            status.isChecked = true;
        });
    };
    LeaveFilterPage.prototype.applyFilters = function () {
        // Pass back a new array of track names to exclude
        var excludeLeaveType = this.leaveTypes.filter(function (c) { return !c.isChecked; }).map(function (c) { return c.name; });
        var excludeLeaveStatus = this.leaveStatues.filter(function (c) { return !c.isChecked; }).map(function (c) { return c.name; });
        this.dismiss(excludeLeaveType, excludeLeaveStatus);
    };
    LeaveFilterPage.prototype.dismiss = function (leaveTypes, leaveStatus) {
        // using the injected ViewController this page
        // can "dismiss" itself and pass back data
        this.viewCtrl.dismiss(leaveTypes, leaveStatus);
    };
    LeaveFilterPage.prototype.help = function () {
        var alert = this.alertCtrl.create({
            title: 'How it works?',
            message: 'Filter type of leaves along with status, aleast one type & one status should be selected for results',
            buttons: ['OK']
        });
        alert.present();
    };
    LeaveFilterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'page-leave-filter',template:/*ion-inline-start:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/leave-filter/leave-filter.html"*/'<ion-header>\n  <ion-toolbar>\n    <ion-buttons start>\n      <button ion-button icon-only (click)="help()">\n        <ion-icon name="information-circle"></ion-icon>\n      </button>\n      <button ion-button (click)="dismiss()">Cancel</button>\n    </ion-buttons>\n\n    <ion-title>\n      Filter Leaves\n    </ion-title>\n\n    <ion-buttons end>\n      <button ion-button (click)="applyFilters()" strong>Done</button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content class="outer-content">\n\n  <ion-list>\n    <ion-list-header>Status of Leaves</ion-list-header>\n  \n    <ion-item *ngFor="let leavestatus of leaveStatues" [attr.leavestatus]="leavestatus.name | lowercase">\n      <span item-start class="dot"></span>\n      <ion-label>{{leavestatus.name}}</ion-label>\n      <ion-toggle [(ngModel)]="leavestatus.isChecked" color="secondary"></ion-toggle>\n    </ion-item>\n  \n  </ion-list>\n\n  <ion-list>\n    <ion-list-header>Types of Leaves</ion-list-header>\n\n    <ion-item *ngFor="let leavetype of leaveTypes" [attr.leavetype]="leavetype.name | lowercase">\n      <span item-start class="dot"></span>\n      <ion-label>{{leavetype.name}}</ion-label>\n      <ion-toggle [(ngModel)]="leavetype.isChecked" color="secondary"></ion-toggle>\n    </ion-item>\n\n  </ion-list>\n\n  <ion-list>\n    <button ion-item (click)="resetFilters()" detail-none class="reset-filters">\n      Reset All Filters\n    </button>\n  </ion-list>\n\n</ion-content>'/*ion-inline-end:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/leave-filter/leave-filter.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["p" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["q" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["t" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1__providers_leave_data_leave_data__["a" /* LeaveDataProvider */],
            __WEBPACK_IMPORTED_MODULE_0_ionic_angular_components_alert_alert_controller__["a" /* AlertController */]])
    ], LeaveFilterPage);
    return LeaveFilterPage;
}());

//# sourceMappingURL=leave-filter.js.map

/***/ }),

/***/ 166:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LeaveNewPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__leave_confirm_leave_confirm__ = __webpack_require__(423);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular_components_alert_alert_controller__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_user_data_ts__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_leave_data_leave_data__ = __webpack_require__(76);
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
 * Generated class for the LeaveNewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LeaveNewPage = /** @class */ (function () {
    function LeaveNewPage(navCtrl, userData, leaveData, navParams, toastCtrl, alertCtrl, modalCtrl) {
        this.navCtrl = navCtrl;
        this.userData = userData;
        this.leaveData = leaveData;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.today = new Date();
        this.date = this.today.toISOString();
        this.dateString = this.zerofill(this.today.getDate()) + '/' + (this.zerofill(this.today.getMonth() + 1)) + '/' + this.today.getFullYear();
        this.leaveApplication = {
            leaveType: '',
            formDate: '',
            fromDate: '',
            period: '',
            toDate: '',
            assignAs: 'Full Day',
            halfLeaveDate: '',
            comment: ''
        };
        this.previousFormDate = '';
        this.enableHalfLeave = false;
        this.leave_types = [];
        this.halfLeaveRecords = [];
        this.allHalfLeaveRecords = [];
    }
    LeaveNewPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad LeaveNewPage');
        this.leaveData.loadLeaveRecords().then(function (data) {
            console.log(data);
            _this.leave_types = data.data;
        });
    };
    LeaveNewPage.prototype.zerofill = function (i) {
        return (i < 10 ? '0' : '') + i;
    };
    LeaveNewPage.prototype.clearFields = function () {
        if (this.previousFormDate !== '') {
            if (this.previousFormDate !== this.leaveApplication.formDate) {
                this.leaveApplication.period = '';
                this.leaveApplication.toDate = '';
                this.leaveApplication.assignAs = 'Full Day';
                this.leaveApplication.comment = '';
                this.enableHalfLeave = false;
            }
        }
    };
    LeaveNewPage.prototype.checkScheme = function () {
        var _this = this;
        console.log(this.leaveApplication.leaveType);
        this.leaveData.checkScheme(this.leaveApplication.leaveType).then(function (data) {
            console.log(data);
            _this.checkSchemeStatus = data.success;
            _this.leaveApplication.formDate = _this.date;
            if (!data.success) {
                var toast = _this.toastCtrl.create({
                    message: data.message,
                    duration: 3000
                });
                toast.present();
            }
        });
    };
    LeaveNewPage.prototype.processPeriod = function () {
        var _this = this;
        // let leavePeriodRegex = /^\d{1,2}(\.5|\d{1,2})?$/g;
        var leavePeriodRegex = /^\d{1,2}(\.5)$/g;
        console.log(this.leaveApplication);
        this.previousFormDate = this.leaveApplication.formDate;
        var formDate = new Date(this.leaveApplication.formDate);
        var fromDate = formDate.getDate() + '/' + (formDate.getMonth() + 1) + '/' + formDate.getFullYear();
        console.log(fromDate);
        this.leaveApplication.fromDate = fromDate;
        if (this.leaveApplication.period !== '') {
            this.leaveApplication.assignAs = 'Full Day';
            this.leaveApplication.toDate = '';
            this.leaveApplication.comment = '';
            if (this.leaveApplication.period.indexOf('.') !== -1) {
                if (!leavePeriodRegex.test(this.leaveApplication.period)) {
                    var toast = this.toastCtrl.create({
                        message: "No. of Days can have decimal value as .5 only",
                        duration: 5000
                    });
                    toast.present();
                }
                else {
                    this.leaveValidation();
                    this.enableHalfLeave = true;
                    this.leaveData.getHalfLeaveRecords(this.leaveApplication).then(function (data) {
                        console.log(data);
                        if (data.success) {
                            _this.allHalfLeaveRecords = data.data;
                            _this.halfLeaveRecords = [];
                            data.data.forEach(function (record) {
                                if (record.leavedetails === 'Working Day') {
                                    _this.halfLeaveRecords.push(record.Applieddates);
                                    _this.leaveApplication.halfLeaveDate = record.Applieddates;
                                }
                            });
                            _this.leaveApplication.assignAs = "Second Half";
                            _this.showLeaveDetail();
                        }
                        else {
                            var toast = _this.toastCtrl.create({
                                message: data.message,
                                duration: 3000
                            });
                            toast.present();
                        }
                    });
                }
            }
            else {
                this.enableHalfLeave = false;
                this.leaveValidation();
                this.leaveData.getHalfLeaveRecords(this.leaveApplication).then(function (data) {
                    console.log(data);
                    if (data.success) {
                        _this.allHalfLeaveRecords = data.data;
                        _this.showLeaveDetail();
                    }
                    else {
                        var toast = _this.toastCtrl.create({
                            message: data.message,
                            duration: 3000
                        });
                        toast.present();
                    }
                });
            }
        }
        else {
            var toast = this.toastCtrl.create({
                message: "No. of Days is required",
                duration: 3000
            });
            toast.present();
        }
    };
    LeaveNewPage.prototype.showLeaveDetail = function () {
        if (this.allHalfLeaveRecords) {
            var leaveDaysModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_0__leave_confirm_leave_confirm__["a" /* LeaveConfirmPage */], { allHalfLeaveRecords: this.allHalfLeaveRecords });
            leaveDaysModal.present();
        }
    };
    LeaveNewPage.prototype.leaveValidation = function () {
        var _this = this;
        this.leaveData.leaveApplication(this.leaveApplication, 'V').then(function (data) {
            console.log(data);
            _this.validateLeaveStatus = data.success;
            if (data.success) {
                _this.leaveApplication.toDate = data.Todate;
            }
            else {
                var toast = _this.toastCtrl.create({
                    message: data.message,
                    // duration: 3000,
                    showCloseButton: true,
                    closeButtonText: 'OK'
                });
                toast.present();
                _this.enableHalfLeave = false;
                // this.leaveApplication.formDate = '';
                _this.leaveApplication.period = '';
            }
        });
    };
    LeaveNewPage.prototype.onLeaveApplication = function (leaveApplicationForm) {
        var _this = this;
        console.log(leaveApplicationForm.value);
        this.leaveData.leaveApplication(this.leaveApplication, 'I').then(function (data) {
            console.log(data);
            if (data.success) {
                var alert_1 = _this.alertCtrl.create({
                    title: data.message,
                    buttons: [
                        {
                            text: 'OK',
                            handler: function (data) {
                                _this.navCtrl.pop();
                            }
                        },
                    ]
                });
                // now present the alert on top of all other content
                alert_1.present();
            }
            else {
                var toast = _this.toastCtrl.create({
                    message: data.message,
                    duration: 3000
                });
                toast.present();
            }
        });
    };
    LeaveNewPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'page-leave-new',template:/*ion-inline-start:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/leave-new/leave-new.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Leave Application</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <form #leaveApplicationForm="ngForm" novalidate>\n    <ion-list no-lines>\n      <ion-item>\n        <ion-label fixed color="primary">Leave</ion-label>\n        <ion-select [(ngModel)]="leaveApplication.leaveType" name="leaveType" placeholder="Select Type" (ionChange)="checkScheme()" required interface="popover">\n          <ion-option value={{leavetype.Leave_ID}} *ngFor="let leavetype of leave_types">{{leavetype.Leave_Name}}</ion-option>\n        </ion-select>\n      </ion-item>\n      <div>\n        <ion-item>\n          <ion-label fixed color="primary">From Date</ion-label>\n          <ion-datetime [(ngModel)]="leaveApplication.formDate" [disabled]="checkSchemeStatus !== true" (ionBlur)="clearFields()" placeholder="From Date" name="formDate" displayFormat="DD/MM/YYYY" min="2017" max="3000" required></ion-datetime>\n        </ion-item>\n        <ion-item>\n          <ion-label fixed color="primary">No. of Days</ion-label>\n          <ion-input [(ngModel)]="leaveApplication.period" [disabled]="checkSchemeStatus !== true" (ionBlur)="processPeriod()" placeholder="No. of Days" name="period" type="number" pattern="([0-9])+(.5)*" required>\n          </ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label fixed color="primary">To Date</ion-label>\n          <ion-input [(ngModel)]="leaveApplication.toDate" name="toDate" placeholder="To Date" type="text" [disabled]="true"></ion-input>\n        </ion-item>\n        <div *ngIf="!enableHalfLeave">\n          <ion-item>\n            <ion-label fixed color="primary">Leave Type</ion-label>\n            <ion-select [(ngModel)]="leaveApplication.assignAs" name="assignAs" [disabled]="checkSchemeStatus !== true" required interface="popover">\n              <ion-option value="Full Day">Full Day</ion-option>\n            </ion-select>\n          </ion-item>\n        </div>\n        <div *ngIf="enableHalfLeave">\n          <ion-item>\n            <ion-label fixed color="primary">Leave Type</ion-label>\n            <ion-select [(ngModel)]="leaveApplication.assignAs" name="assignAs" required interface="popover">\n              <ion-option value="First Half">First Half</ion-option>\n              <ion-option value="Second Half">Second Half</ion-option>\n            </ion-select>\n          </ion-item>\n          <ion-item>\n            <ion-label fixed color="primary">Half Leave Date</ion-label>\n            <ion-select [(ngModel)]="leaveApplication.halfLeaveDate" name="halfLeaveDate" required interface="popover">\n              <ion-option value={{halfLeaveDates}} *ngFor="let halfLeaveDates of halfLeaveRecords">{{halfLeaveDates}}</ion-option>\n            </ion-select>\n          </ion-item>\n        </div>\n        <ion-item>\n          <ion-label fixed color="primary">Comment</ion-label>\n          <ion-textarea [(ngModel)]="leaveApplication.comment"\n            name="comment" \n            placeholder="Enter leave reason"\n            [disabled]="checkSchemeStatus !== true" \n            autocomplete="on" autocorrect="on" rows="5" required>\n          </ion-textarea>\n        </ion-item>\n      </div>\n    </ion-list>\n\n    <div padding>\n      <button ion-button (click)="onLeaveApplication(leaveApplicationForm)" [disabled]="!leaveApplicationForm.valid" type="submit" block round>Apply</button>\n    </div>\n  </form>\n</ion-content>\n'/*ion-inline-end:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/leave-new/leave-new.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["p" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_user_data_ts__["a" /* UserData */],
            __WEBPACK_IMPORTED_MODULE_5__providers_leave_data_leave_data__["a" /* LeaveDataProvider */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["q" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["s" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular_components_alert_alert_controller__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["n" /* ModalController */]])
    ], LeaveNewPage);
    return LeaveNewPage;
}());

//# sourceMappingURL=leave-new.js.map

/***/ }),

/***/ 167:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LeavesShowPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__leave_new_leave_new__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__leave_detail_leave_detail__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_user_data_ts__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_leave_data_leave_data__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__leave_filter_leave_filter__ = __webpack_require__(165);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var LeavesShowPage = /** @class */ (function () {
    function LeavesShowPage(alertCtrl, app, loadingCtrl, modalCtrl, navCtrl, toastCtrl, leaveData, user, events) {
        var _this = this;
        this.alertCtrl = alertCtrl;
        this.app = app;
        this.loadingCtrl = loadingCtrl;
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.leaveData = leaveData;
        this.user = user;
        this.events = events;
        this.queryText = '';
        this.segment = 'all';
        this.excludeLeaves = [];
        this.excludeStatues = [];
        this.shownLeaves = [];
        this.leaves = [];
        this.events.subscribe('reload:leaves', function () {
            _this.updateLeaves(true, false);
        });
        this.events.subscribe('leaves:exit', function () {
            _this.events.publish('app:setRootAsHome');
        });
    }
    LeavesShowPage.prototype.ionViewDidLoad = function () {
        this.app.setTitle('Leaves');
        this.updateLeaves(false, false);
        console.log('ionViewDidLoad LeavesShowPage');
    };
    LeavesShowPage.prototype.updateLeaves = function (update, segmentChanged) {
        var _this = this;
        console.log(update);
        if (segmentChanged) {
            this.shownLeaves = 0;
            this.leaves = [];
        }
        // Close any open sliding items when the schedule updates
        this.LeavesList && this.LeavesList.closeSlidingItems();
        this.leaveData.getLeaves(update, this.queryText, this.excludeLeaves, this.excludeStatues, this.segment).subscribe(function (data) {
            _this.shownLeaves = data.shownLeaves;
            _this.leaves = data.data;
        });
    };
    LeavesShowPage.prototype.presentFilter = function () {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__leave_filter_leave_filter__["a" /* LeaveFilterPage */], { excludeLeaves: this.excludeLeaves, excludeStatues: this.excludeStatues });
        modal.present();
        modal.onWillDismiss(function (leaveTypes, leaveStatues) {
            if (leaveTypes || leaveStatues) {
                _this.excludeLeaves = leaveTypes;
                _this.excludeStatues = leaveStatues;
                _this.updateLeaves(false, false);
            }
        });
    };
    LeavesShowPage.prototype.goToLeaveDetail = function (LeaveData) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_1__leave_detail_leave_detail__["a" /* LeaveDetailPage */], { LeaveData: LeaveData, segment: this.segment });
    };
    LeavesShowPage.prototype.goToNewLeave = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__leave_new_leave_new__["a" /* LeaveNewPage */]);
    };
    LeavesShowPage.prototype.doRefresh = function (refresher) {
        var _this = this;
        this.leaveData.getLeaves(true, this.queryText, this.excludeLeaves, this.excludeStatues, this.segment).subscribe(function (data) {
            _this.shownLeaves = data.shownLeaves;
            _this.leaves = data.data;
            // simulate a network request that would take longer
            // than just pulling from out local json file
            setTimeout(function () {
                refresher.complete();
                if (data.message === 'Leave Application Records') {
                    var toast = _this.toastCtrl.create({
                        message: 'Leaves have been updated.',
                        duration: 3000
                    });
                    toast.present();
                }
            }, 1000);
        });
    };
    LeavesShowPage.prototype.cancelLeave = function (slidingItem, leaveData, title) {
        slidingItem.close();
        var toast = this.toastCtrl.create({
            message: "Feature is Currently Unavailable",
            duration: 3000
        });
        toast.present();
    };
    LeavesShowPage.prototype.leaveApproval = function (slidingItem, leaveData, title, btntext, application_status) {
        var _this = this;
        title = btntext + " Leave";
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: 'Are You Sure?',
            inputs: [
                {
                    name: 'application_comment',
                    placeholder: 'Comment',
                    type: 'text'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                        slidingItem.close();
                    }
                },
                {
                    text: btntext,
                    handler: function (data) {
                        console.log(leaveData, application_status, data.application_comment);
                        if (data.application_comment !== '') {
                            slidingItem.close();
                            _this.leaveData.doLeaveApproval(leaveData, application_status, data.application_comment)
                                .then(function (data) {
                                console.log(data);
                                if (!!data.success) {
                                    _this.updateLeaves(true, false);
                                    var toast = _this.toastCtrl.create({
                                        message: data.message,
                                        duration: 3000
                                    });
                                    toast.present();
                                }
                                else {
                                    var toast = _this.toastCtrl.create({
                                        message: data.message,
                                        duration: 3000
                                    });
                                    toast.present();
                                }
                            });
                        }
                        else {
                            var toast = _this.toastCtrl.create({
                                message: "Comment is required",
                                duration: 5000
                            });
                            toast.present();
                        }
                    }
                }
            ]
        });
        // now present the alert on top of all other content
        alert.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["_8" /* ViewChild */])('LeavesList', { read: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["k" /* List */] }),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["k" /* List */])
    ], LeavesShowPage.prototype, "LeavesList", void 0);
    LeavesShowPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'page-leaves-show',template:/*ion-inline-start:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/leaves-show/leaves-show.html"*/'<ion-header>\n  <ion-navbar no-border-bottom>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Leaves</ion-title>\n  </ion-navbar>\n\n  <ion-toolbar no-border-top>\n    <ion-segment [(ngModel)]="segment" (ionChange)="updateLeaves(false,true)">\n      <ion-segment-button value="all">\n        All\n      </ion-segment-button>\n      <ion-segment-button value="pending">\n        Pending Approvals\n      </ion-segment-button>\n    </ion-segment>\n  </ion-toolbar>\n\n  <ion-toolbar no-border-top>\n    <ion-searchbar color="primary" [(ngModel)]="queryText" (ionInput)="updateLeaves(false,false)" placeholder="Search">\n    </ion-searchbar>\n    <ion-buttons end>\n      <button ion-button icon-only [disabled]="leaves.length === 0" (click)="presentFilter()">\n        <ion-icon ios="ios-options-outline" md="md-options"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n\n  <ion-list #LeavesList [hidden]="shownLeaves === 0" *ngIf="segment === \'all\'">\n\n    <ion-item-group *ngFor="let leave of leaves" [hidden]="leave.hide">\n\n      <ion-item-divider sticky>\n        <ion-label>\n          {{leave.From_Date}}\n        </ion-label>\n      </ion-item-divider>\n\n      <ion-item-sliding #slidingItem [attr.leavetype]="leave.Leave_Name | lowercase" [hidden]="leave.hide">\n\n        <button ion-item (click)="goToLeaveDetail(leave)">\n            <!-- <h3>{{leave.Leave_Name}}</h3><br>\n            <h3>{{leave.Leave_Reason}}</h3>\n          <p>\n            {{leave.From_Date}} &mdash; {{leave.To_Date}}: {{leave.AppStatus}}\n          </p> -->\n\n          <ion-badge class="pull-right">{{leave.AppStatus}}</ion-badge>\n          <h3 class="text-left" text-wrap>\n            <span class="bold-text">{{leave.Leave_Name}}</span> for <span class="bold-text">{{leave.Leave_Period}} Day{{leave.Leave_Period > 1?\'s\':\'\'}}</span>\n          </h3>\n          <h3>&nbsp;</h3>\n          <ion-row class="text-left">\n            From:&nbsp;\n            <span class="bold-text">{{leave.From_Date}}</span>\n          </ion-row>\n          <ion-row class="text-left">\n            To:&nbsp;\n            <span class="bold-text">{{leave.To_Date}}</span>\n          </ion-row>\n          <ion-row class="text-left" text-wrap>\n            Reason:&nbsp;\n            <span class="bold-text">{{leave.Leave_Reason}}</span>\n          </ion-row>\n          \n        </button>\n\n        <ion-item-options side="right">\n          <button ion-button color="danger" (click)="cancelLeave(slidingItem, leave)" *ngIf="segment === \'all\'">\n            Cancel\n          </button>\n        </ion-item-options>\n\n      </ion-item-sliding>\n\n    </ion-item-group>\n\n  </ion-list>\n\n  <ion-list #LeavesList [hidden]="shownLeaves === 0" *ngIf="segment === \'pending\'">\n  \n    <ion-item-group *ngFor="let leave of leaves" [hidden]="leave.hide">\n  \n      <ion-item-divider sticky>\n        <ion-label>\n          {{leave.From_Date}}\n        </ion-label>\n      </ion-item-divider>\n  \n      <ion-item-sliding #slidingItem [attr.leavetype]="leave.Leave_Name | lowercase" [hidden]="leave.hide">\n  \n        <button ion-item (click)="goToLeaveDetail(leave)">\n            <!-- <h3>{{leave.Emp_Full_Name}} Applied for {{leave.Leave_Name}}</h3><br>\n            <h3>{{leave.Leave_Reason}}</h3>\n          <p>\n            {{leave.From_Date}} &mdash; {{leave.To_Date}}: {{leave.AppStatus}}\n          </p> -->\n          <ion-badge class="pull-right">{{leave.AppStatus}}</ion-badge>\n          <h3 class="text-left" text-wrap>\n            <span class="bold-text">{{leave.Emp_Full_Name}}</span> Applied <span class="bold-text">{{leave.Leave_Name}}</span> for\n            <span class="bold-text">{{leave.Leave_Period}} Day{{leave.Leave_Period > 1?\'s\':\'\'}}</span>\n          </h3>\n          <h3>&nbsp;</h3>\n          <ion-row class="text-left">\n            From:&nbsp;\n            <span class="bold-text">{{leave.From_Date}}</span>\n          </ion-row>\n          <ion-row class="text-left">\n            To:&nbsp;\n            <span class="bold-text">{{leave.To_Date}}</span>\n          </ion-row>\n          <ion-row class="text-left" text-wrap>\n            Reason:&nbsp;\n            <span class="bold-text">{{leave.Leave_Reason}}</span>\n          </ion-row>\n        </button>\n  \n        <ion-item-options side="right">\n          <button ion-button color="secondary" (click)="leaveApproval(slidingItem, leave, \'Approval\',\'Approve\',\'A\')" *ngIf="segment === \'pending\'">\n            Approve\n          </button>\n        </ion-item-options>\n\n        <ion-item-options side="left">\n          <button ion-button color="danger" (click)="leaveApproval(slidingItem, leave, \'Rejection\',\'Reject\',\'R\')" *ngIf="segment === \'pending\'">\n            Reject\n          </button>\n        </ion-item-options>\n  \n      </ion-item-sliding>\n  \n    </ion-item-group>\n  \n  </ion-list>\n\n  <ion-list-header [hidden]="shownLeaves > 0">\n    No Leaves Found\n  </ion-list-header>\n\n  <ion-fab bottom right #fab>\n    <button ion-fab (click)="goToNewLeave()">\n      <ion-icon name="add"></ion-icon>\n    </button>\n    <!-- <ion-fab-list side="top">\n      <button ion-fab color="vimeo" (click)="openSocial(\'Vimeo\', fab)">\n        <ion-icon name="logo-vimeo"></ion-icon>\n      </button>\n      <button ion-fab color="google" (click)="openSocial(\'Google+\', fab)">\n        <ion-icon name="logo-googleplus"></ion-icon>\n      </button>\n      <button ion-fab color="twitter" (click)="openSocial(\'Twitter\', fab)">\n        <ion-icon name="logo-twitter"></ion-icon>\n      </button>\n      <button ion-fab color="facebook" (click)="openSocial(\'Facebook\', fab)">\n        <ion-icon name="logo-facebook"></ion-icon>\n      </button>\n    </ion-fab-list> -->\n  </ion-fab>\n\n\n</ion-content>'/*ion-inline-end:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/leaves-show/leaves-show.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* App */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["l" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["n" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["p" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["s" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_5__providers_leave_data_leave_data__["a" /* LeaveDataProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_user_data_ts__["a" /* UserData */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* Events */]])
    ], LeavesShowPage);
    return LeavesShowPage;
}());

//# sourceMappingURL=leaves-show.js.map

/***/ }),

/***/ 168:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_native_network__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_user_data_ts__ = __webpack_require__(23);
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
            selector: 'page-login',template:/*ion-inline-start:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/login/login.html"*/'<!-- <ion-header>\n  <ion-navbar>\n    <!-- <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button> -->\n   <!-- <ion-title>Login</ion-title>\n  </ion-navbar>\n</ion-header> -->\n\n<ion-content padding>\n  <div class="logo">\n    <img src="assets/img/appicon.png" alt="Ionic logo">\n    <br>\n    <div>\n      <br>\n      <h4>Welcome to Empower...</h4>\n      <h6>Your Digital Workspace...</h6>\n    </div>\n  </div>\n\n  <div class="helptext">\n    Please enter your username and password and click on login\n  </div>\n  <form #loginForm="ngForm" novalidate>\n    <ion-list no-lines>\n      <ion-item>\n        <ion-label stacked floating color="primary">Employee ID/Email</ion-label>\n        <ion-input [(ngModel)]="login.username" name="username" type="text" #username="ngModel" \n        autocomplete=“true” spellcheck=“true” (change)="this.login.password = \'\';" autocapitalize="off"\n          required>\n        </ion-input>\n      </ion-item>\n      <p ion-text [hidden]="username.valid || submitted == false" color="danger" padding-left>\n        Employee ID or Email is required\n      </p>\n\n      <ion-item>\n        <ion-label stacked floating color="primary">Password</ion-label>\n        <ion-input [(ngModel)]="login.password" name="password" type="password" #password="ngModel" required>\n        </ion-input>\n      </ion-item>\n      <p ion-text [hidden]="password.valid || submitted == false" color="danger" padding-left>\n        Password is required\n      </p>\n    </ion-list>\n\n    <ion-row responsive-sm>\n      <ion-col>\n        <button ion-button round (click)="onLogin(loginForm)" type="submit" block>Login</button>\n      </ion-col>\n      <!-- <ion-col>\n        <button ion-button (click)="onSignup()" color="light" block>Signup</button>\n      </ion-col> -->\n    </ion-row>\n    <ion-row responsive-sm>\n      <ion-col text-center>\n        <button ion-button round clear (click)="forgotPassword()">\n          Forgot password?\n        </button>\n      </ion-col>\n    </ion-row>\n  </form>\n\n</ion-content>\n'/*ion-inline-end:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["p" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_user_data_ts__["a" /* UserData */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_0__ionic_native_network__["a" /* Network */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* Events */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 169:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LogoutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
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
    function LogoutPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    LogoutPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LogoutPage');
    };
    LogoutPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-logout',template:/*ion-inline-start:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/logout/logout.html"*/'<!--\n  Generated template for the LogoutPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>logout</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/logout/logout.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavParams */]])
    ], LogoutPage);
    return LogoutPage;
}());

//# sourceMappingURL=logout.js.map

/***/ }),

/***/ 170:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ParakhDashboardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_data_getter_service_data_getter_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_app_global_app_global__ = __webpack_require__(6);
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
 * Generated class for the ParakhDashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ParakhDashboardPage = /** @class */ (function () {
    function ParakhDashboardPage(navCtrl, navParams, dataGetterService, loadingCtrl, events, toastCtrl, appGlobal) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataGetterService = dataGetterService;
        this.loadingCtrl = loadingCtrl;
        this.events = events;
        this.toastCtrl = toastCtrl;
        this.appGlobal = appGlobal;
        this.maintenanceRequests = [];
        this.queryText = '';
        this.events.subscribe('reload:maintenance-request', function (isNotification, id) {
            _this.refreshMaintenanceRequestList(null);
        });
    }
    ParakhDashboardPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ParakhDashboardPage');
    };
    ParakhDashboardPage.prototype.ionViewDidEnter = function () {
        this.loadMaintenanceRequests(null);
    };
    ParakhDashboardPage.prototype.refreshMaintenanceRequestList = function (reference) {
        this.loadMaintenanceRequests(reference);
    };
    ParakhDashboardPage.prototype.loadMaintenanceRequests = function (reference) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        if (reference === null) {
            loading.present();
        }
        this.dataGetterService.getMyAwards().subscribe(function (data) {
            console.log("Stationery Requests Loaded", data);
            if (data.success) {
                console.log(data.awards);
                _this.maintenanceRequests = data.awards;
            }
            else {
                _this.maintenanceRequests = [];
            }
            loading.dismiss();
            if (reference != null) {
                reference.complete();
            }
        }, function (error) {
            console.log(error);
            _this.maintenanceRequests = [];
            var toast = _this.toastCtrl.create({
                message: _this.appGlobal.ServerError,
                duration: 3000
            });
            toast.present();
            loading.dismiss();
            if (reference != null) {
                reference.complete();
            }
        });
    };
    ParakhDashboardPage.prototype.goToMaintenanceRequestForm = function () {
        console.log("OK");
        // this.navCtrl.push(MaintenanceRequestFormPage);
    };
    ParakhDashboardPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-parakh-dashboard',template:/*ion-inline-start:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/parakh-dashboard/parakh-dashboard.html"*/'<!--\n  Generated template for the ParakhDashboardPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Parakh Dashboard</ion-title>\n  </ion-navbar>\n  \n    <ion-toolbar no-border-top>\n    <ion-searchbar color="primary" [(ngModel)]="queryText" placeholder="Search"></ion-searchbar>\n  </ion-toolbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-refresher (ionRefresh)="refreshMaintenanceRequestList($event)">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n\n  <ion-list>\n    <ion-card *ngFor="let maintenanceRequest of maintenanceRequests | search : {term:queryText,fields:[\'uid\',\'asset\',\'detail\']}">\n      <div class="{{\'maintenance_request_state_sidebar_\'+maintenanceRequest.state}}">\n        <ion-card-header>\n          {{maintenanceRequest.award_type}}\n          <span class="pull-right sr-age">{{maintenanceRequest.age}}</span>\n        </ion-card-header>\n\n        <ion-card-content>\n          <p>Nominator: <strong>{{maintenanceRequest.nominator}}</strong></p>\n          <p>Values: <strong>{{maintenanceRequest.award_value}}</strong></p>\n          <hr>\n          <p>Justification: <strong>{{maintenanceRequest.justification}}</strong></p>\n        </ion-card-content>\n\n    \n\n        <ion-row>\n          <ion-col>\n            <ion-badge class="pull-right">Points: {{maintenanceRequest.points}}</ion-badge>\n          </ion-col>\n        </ion-row>\n      </div>\n    </ion-card>\n  </ion-list>\n  <ion-fab right bottom>\n    <button ion-fab (click)="goToMaintenanceRequestForm()">\n      <ion-icon name="add"></ion-icon>\n    </button>\n  </ion-fab>\n</ion-content>\n'/*ion-inline-end:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/parakh-dashboard/parakh-dashboard.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_data_getter_service_data_getter_service__["a" /* DataGetterServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_app_global_app_global__["a" /* AppGlobalProvider */]])
    ], ParakhDashboardPage);
    return ParakhDashboardPage;
}());

//# sourceMappingURL=parakh-dashboard.js.map

/***/ }),

/***/ 171:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PoliciesShowPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_app_global_app_global__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular_components_toast_toast_controller__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_data_getter_service_data_getter_service__ = __webpack_require__(9);
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
 * Generated class for the PoliciesShowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PoliciesShowPage = /** @class */ (function () {
    function PoliciesShowPage(navCtrl, navParams, dataGetterService, loadingCtrl, toastCtrl, appGlobal) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataGetterService = dataGetterService;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.appGlobal = appGlobal;
        this.initalPage = {
            page_name: '',
            html_content: ''
        };
        // public page: any = this.initalPage;
        this.page = this.page;
        this.id = this.navParams.get('id');
        this.loadStaticPage(null, this.id);
    }
    PoliciesShowPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PoliciesShowPage');
    };
    PoliciesShowPage.prototype.loadStaticPage = function (ref, id) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        if (ref === null) {
            loading.present();
        }
        this.dataGetterService.getStaticPage(id)
            .subscribe(function (data) {
            console.log("Static Page Details Loaded", data);
            if (data.success) {
                _this.page = data.static_page;
            }
            else {
                // this.page = this.initalPage;
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
            // this.page = this.initalPage;
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
    PoliciesShowPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'page-policies-show',template:/*ion-inline-start:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/policies-show/policies-show.html"*/'<!--\n  Generated template for the PoliciesShowPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{page ? page.page_name : \'\'}}</ion-title>\n  </ion-navbar>\n\n\n</ion-header>\n\n\n<ion-content padding>\n    <ion-grid>\n      <div *ngIf="page" >\n        <div [innerHtml]="page.html_content">\n        </div>\n      </div>\n  </ion-grid>\n</ion-content>\n'/*ion-inline-end:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/policies-show/policies-show.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["p" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["q" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__providers_data_getter_service_data_getter_service__["a" /* DataGetterServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["l" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular_components_toast_toast_controller__["a" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_0__providers_app_global_app_global__["a" /* AppGlobalProvider */]])
    ], PoliciesShowPage);
    return PoliciesShowPage;
}());

//# sourceMappingURL=policies-show.js.map

/***/ }),

/***/ 172:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PoliciesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_app_global_app_global__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_data_getter_service_data_getter_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__policies_show_policies_show__ = __webpack_require__(171);
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
 * Generated class for the PoliciesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PoliciesPage = /** @class */ (function () {
    function PoliciesPage(navCtrl, navParams, dataGetterService, loadingCtrl, toastCtrl, appGlobal) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataGetterService = dataGetterService;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.appGlobal = appGlobal;
        this.pages = [];
    }
    PoliciesPage.prototype.loadPolicies = function (ref) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        if (ref === null) {
            loading.present();
        }
        this.dataGetterService.getStaticPages()
            .subscribe(function (data) {
            console.log("Static Pages Loaded", data);
            if (data.success) {
                _this.pages = data.StaticPage;
            }
            else {
                _this.pages = [];
            }
            loading.dismiss();
            if (ref != null) {
                ref.complete();
            }
        }, function (err) {
            console.log(err);
            _this.pages = [];
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
    PoliciesPage.prototype.ionViewDidEnter = function () {
        console.log('ionViewDidEnter PoliciesPage');
        this.loadPolicies(null);
    };
    PoliciesPage.prototype.itemTapped = function (id) {
        console.log(id);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__policies_show_policies_show__["a" /* PoliciesShowPage */], {
            id: id,
        });
    };
    PoliciesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PoliciesPage');
    };
    PoliciesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-policies',template:/*ion-inline-start:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/policies/policies.html"*/'<!--\n  Generated template for the PoliciesPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Policies</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-list *ngIf="pages.length > 0">\n    <button ion-item *ngFor="let page of pages" (click)="itemTapped(page.id)">\n      {{page.page}}\n    </button>\n  </ion-list>\n  <ion-item *ngIf="pages.length === 0" text-center>\n    No Policies to be Shown\n  </ion-item>\n</ion-content>\n'/*ion-inline-end:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/policies/policies.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["p" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["q" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_data_getter_service_data_getter_service__["a" /* DataGetterServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["s" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_0__providers_app_global_app_global__["a" /* AppGlobalProvider */]])
    ], PoliciesPage);
    return PoliciesPage;
}());

//# sourceMappingURL=policies.js.map

/***/ }),

/***/ 173:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ServiceRequestFormPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_native_vibration__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular_components_toast_toast_controller__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_app_global_app_global__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_data_setter_data_setter__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_file_transfer__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_camera__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_file__ = __webpack_require__(439);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








// import { LoadingController, ToastController } from 'ionic-angular';

/**
 * Generated class for the ServiceRequestFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ServiceRequestFormPage = /** @class */ (function () {
    function ServiceRequestFormPage(navCtrl, navParams, dataSetterService, transfer, camera, toastCtrl, events, appGlobal, file, loadingCtrl, vibration) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataSetterService = dataSetterService;
        this.transfer = transfer;
        this.camera = camera;
        this.toastCtrl = toastCtrl;
        this.events = events;
        this.appGlobal = appGlobal;
        this.file = file;
        this.loadingCtrl = loadingCtrl;
        this.vibration = vibration;
        this.service_request = {
            detail: '',
            category: '',
            service_type: 'Service Request'
        };
    }
    ServiceRequestFormPage.prototype.getImageFromCamera = function () {
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
            // this.presentToast(err);
        });
    };
    ServiceRequestFormPage.prototype.getImageFromFS = function () {
        var _this = this;
        var options = {
            quality: 60,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            correctOrientation: true,
        };
        this.camera.getPicture(options).then(function (imageData) {
            console.log(imageData);
            _this.imageURI = 'data:image/jpeg;base64,' + imageData;
            // if (this.platform.is('android')) {
            //   this.filePath.resolveNativePath(imagePath)
            //     .then(filePath => {
            //       let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            //       let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1);
            //       // this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
            //   console.log(correctPath)
            //   console.log(currentName)
            //       this.imageURI=this.file.readAsDataURL(correctPath,currentName).then((imageData)=>{
            //         console.log(imageData)
            //       },(err)=>{
            //         console.log(err)
            //       })
            //       console.log(this.imageURI)
            //     });
            // } else {
            //   var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
            //   var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
            //   // this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
            // }
        }, function (err) {
            console.log(err);
            // this.presentToast(err);
        });
    };
    ServiceRequestFormPage.prototype.uploadFile = function () {
        // let loader = this.loadingCtrl.create({
        //   content: "Uploading..."
        // });
        // loader.present();
        var fileTransfer = this.transfer.create();
        var options = {
            fileKey: 'ionicfile',
            fileName: 'ionicfile',
            chunkedMode: false,
            mimeType: "image/jpeg",
            headers: {}
        };
        fileTransfer.upload(this.imageURI, this.appGlobal.uploadImageURL, options)
            .then(function (data) {
            console.log(data + " Uploaded Successfully");
            // this.imageFileName = "http://127.0.0.1:3000/static/images/ionicfile.jpg"
            // loader.dismiss();
            // this.presentToast("Image uploaded successfully");
        }, function (err) {
            console.log(err);
            // loader.dismiss();
            // this.presentToast(err);
        });
    };
    ServiceRequestFormPage.prototype.submitSR = function (d) {
        var _this = this;
        d["file"] = this.imageURI;
        console.log("Create Service Request", d);
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.dataSetterService.createServiceRequests(d)
            .subscribe(function (data) {
            console.log("Create Service Response", data);
            loading.dismiss();
            if (data.success) {
                _this.events.publish('reload:serviceRequest');
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
    ServiceRequestFormPage.prototype.logForm = function (form) {
        this.submitSR(form.value);
        console.log(form.value);
    };
    ServiceRequestFormPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ServiceRequestFormPage');
    };
    ServiceRequestFormPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["m" /* Component */])({
            selector: 'page-service-request-form',template:/*ion-inline-start:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/service-request-form/service-request-form.html"*/'<!--\n  Generated template for the ServiceRequestFormPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>New Tech Support Request</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <form  #form="ngForm">\n    <ion-item>\n      <ion-textarea [(ngModel)]="service_request.detail" name="detail" rows="5" placeholder="Enter details of the issue" required></ion-textarea>\n    </ion-item>\n        <ion-item>\n          <ion-label>Category</ion-label>\n          <ion-select [(ngModel)]="service_request.category" name="category" required interface="popover">\n            <ion-option value="INTRANET">Intranet</ion-option>\n            <ion-option value="ERP & Other Applications">ERP & Other Applications</ion-option>\n            <ion-option value="Infrastructure">Infrastructure</ion-option>\n\n          </ion-select>\n        </ion-item>\n\n    <!--<h4>Image Preview</h4>-->\n    <ion-item *ngIf="imageURI">\n      <img src="{{imageURI}}" *ngIf="imageURI" alt="Ionic File" width="300" />\n    </ion-item>\n  <ion-buttons>\n    <ion-grid>\n      <ion-row>\n        <ion-col>\n          <button ion-button color="secondary" round (click)="getImageFromCamera()" block>Camera</button>\n        </ion-col>\n        <ion-col>\n          <button ion-button color="secondary" round (click)="getImageFromFS()" block>Gallery</button>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-buttons>\n\n\n    <button ion-button (click)="logForm(form)" type="submit" [disabled]="!form.valid" block>Add Service Request</button>\n  </form>\n  \n    <!-- <p>{{imageURI}}</p> -->\n    \n  \n\n\n  <!--<ion-item>-->\n    <!--<button ion-button (click)="uploadFile()">Upload</button>-->\n  <!--</ion-item>-->\n\n</ion-content>\n'/*ion-inline-end:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/service-request-form/service-request-form.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["p" /* NavController */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["q" /* NavParams */], __WEBPACK_IMPORTED_MODULE_5__providers_data_setter_data_setter__["a" /* DataSetterProvider */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_file_transfer__["a" /* FileTransfer */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular_components_toast_toast_controller__["a" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["f" /* Events */], __WEBPACK_IMPORTED_MODULE_2__providers_app_global_app_global__["a" /* AppGlobalProvider */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["l" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_0__ionic_native_vibration__["a" /* Vibration */]])
    ], ServiceRequestFormPage);
    return ServiceRequestFormPage;
}());

//# sourceMappingURL=service-request-form.js.map

/***/ }),

/***/ 174:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ServiceRequestPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_app_global_app_global__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_data_getter_service_data_getter_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_request_form_service_request_form__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__service_request_show_service_request_show__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_moment__);
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
 * Generated class for the ServiceRequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ServiceRequestPage = /** @class */ (function () {
    function ServiceRequestPage(navCtrl, navParams, dataGetterService, events, loadingCtrl, toastCtrl, appGlobal) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataGetterService = dataGetterService;
        this.events = events;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.appGlobal = appGlobal;
        this.servicerequests = [];
        this.queryText = '';
        this.temp = "pending";
        this.descending = false;
        this.order = -1;
        this.field = 'updated_at';
        this.events.subscribe('reload:serviceRequest', function () {
            _this.refreshSRList(null);
        });
    }
    ServiceRequestPage.prototype.loadSR = function (ref) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        if (ref === null) {
            loading.present();
        }
        this.dataGetterService.getServiceRequests()
            .subscribe(function (data) {
            console.log("Service Requests Loaded", data);
            if (data.success) {
                _this.servicerequests = data.service_requests;
            }
            else {
                _this.servicerequests = [];
            }
            loading.dismiss();
            if (ref != null) {
                ref.complete();
            }
        }, function (err) {
            console.log(err);
            _this.servicerequests = [];
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
    ServiceRequestPage.prototype.sort = function () {
        this.descending = !this.descending;
        this.order = this.descending ? 1 : -1;
    };
    ServiceRequestPage.prototype.ionViewDidEnter = function () {
        this.loadSR(null);
    };
    ServiceRequestPage.prototype.goToSRForm = function () {
        //push another page onto the history stack
        //causing the nav controller to animate the new page in
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__service_request_form_service_request_form__["a" /* ServiceRequestFormPage */]);
    };
    ServiceRequestPage.prototype.goToSR = function (id) {
        console.log(id);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__service_request_show_service_request_show__["a" /* ServiceRequestShowPage */], {
            id: id,
        });
    };
    ServiceRequestPage.prototype.refreshSRList = function (ev) {
        this.loadSR(ev);
    };
    // onInput(event){
    //
    //
    // }
    ServiceRequestPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ServiceRequestPage');
    };
    ServiceRequestPage.prototype.getLastActivity = function (updated_at) {
        return __WEBPACK_IMPORTED_MODULE_6_moment__(updated_at).format("MMMM DD,YYYY hh:mm A");
    };
    ServiceRequestPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-service-request',template:/*ion-inline-start:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/service-request/service-request.html"*/'<!--\n  Generated template for the ServiceRequestPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n      <button ion-button menuToggle>\n        <ion-icon name="menu"></ion-icon>\n      </button>\n    <ion-title>Tech Support</ion-title>\n  </ion-navbar>\n  <ion-toolbar no-border-top>\n    <ion-searchbar color="primary" [(ngModel)]="queryText" placeholder="Search">\n    </ion-searchbar>\n  </ion-toolbar>\n</ion-header>\n\n\n<ion-content padding>\n  <ion-refresher (ionRefresh)="refreshSRList($event)">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n  <ion-list *ngIf="servicerequests.length > 0">\n    <ion-card *ngFor="let servicerequest of servicerequests | search : {term:queryText,fields:[\'uid\',\'detail\',\'status\']} | sort: {property: field, order: order}" (click)="goToSR(servicerequest.uid)">\n      <div class="{{\'sr_state_sidebar_\'+servicerequest.status}}">\n\n      <!--<ion-card>-->\n        <ion-card-header>\n      {{servicerequest.uid}}\n      <span class="pull-right sr-age">{{servicerequest.age}} ago</span>\n\n      </ion-card-header>\n      <ion-card-content class="wrap">\n        {{servicerequest.detail}}\n      </ion-card-content>\n      <ion-row *ngIf="servicerequest.updated_at">\n        <ion-col>\n          <ion-note class="pull-right" style="color:black;">\n            Last Activity:\n            <b>{{getLastActivity(servicerequest.updated_at)}}</b>\n          </ion-note>\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col>\n          <h5 class="pull-right">Resolver: <b>{{servicerequest.resolver}}</b></h5>\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col>\n          <ion-badge class="pull-right">{{servicerequest.status}}</ion-badge>\n        </ion-col>\n      </ion-row>\n      <!-- <ion-item>\n          <h5 style="margin-top: 0px;">Resolver:{{servicerequest.resolver}}</h5>\n        <ion-badge item-end>{{servicerequest.status}}</ion-badge>\n      </ion-item> -->\n      <!--</ion-card>-->\n\n      </div>\n    </ion-card>\n  </ion-list>\n  <ion-fab right bottom>\n    <button ion-fab (click)="goToSRForm()"><ion-icon name="add"></ion-icon></button>\n  </ion-fab>\n\n  <ion-item *ngIf="servicerequests.length === 0" text-center>\n    No Tech Support Request to be Shown\n  </ion-item>\n\n\n</ion-content>\n\n\n'/*ion-inline-end:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/service-request/service-request.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["p" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["q" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_data_getter_service_data_getter_service__["a" /* DataGetterServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* Events */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["s" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_0__providers_app_global_app_global__["a" /* AppGlobalProvider */]])
    ], ServiceRequestPage);
    return ServiceRequestPage;
}());

//# sourceMappingURL=service-request.js.map

/***/ }),

/***/ 175:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SuervyPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_app_global_app_global__ = __webpack_require__(6);
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
    function SuervyPage(navCtrl, navParams, storage, appGlobal) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.appGlobal = appGlobal;
        this.qindex = navParams.get("qindex");
        this.loadQuestion();
    }
    SuervyPage_1 = SuervyPage;
    SuervyPage.prototype.loadQuestion = function () {
        console.log(this.qindex);
        this.question = this.appGlobal.questionsList[this.qindex].question;
        this.key = this.appGlobal.questionsList[this.qindex].key;
        // this.answer.question_key = this.key;
        if (this.appGlobal.answers[this.key] != undefined)
            this.answer = this.appGlobal.answers[this.key];
        else
            this.answer = { question_key: this.key, value: "" };
    };
    SuervyPage.prototype.goToNext = function (e) {
        this.appGlobal.answers[this.key] = (this.answer);
        if (this.qindex == this.appGlobal.questionsList.length - 1) {
            alert("Last Question");
            console.log(this.appGlobal.answers);
            return;
        }
        console.log(this.answer);
        var nq = this.qindex + 1;
        this.navCtrl.push(SuervyPage_1, { qindex: (nq) });
    };
    SuervyPage.prototype.goToPrev = function (e) {
        if (this.qindex == 0) {
            alert("First Question");
            return;
        }
        console.log(this.answer);
        var nq = this.qindex - 1;
        this.navCtrl.push(SuervyPage_1, { qindex: (nq) });
    };
    SuervyPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SuervyPage');
        // this.navCtrl.push(SuervyPage,{qindex: 0});
    };
    var SuervyPage_1;
    SuervyPage = SuervyPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-suervy',template:/*ion-inline-start:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/suervy/suervy.html"*/'<!--\n  Generated template for the SuervyPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>SuervyPage</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <p>{{question}}</p>\n\n  <hr>\n  <ion-input type="text" placeholder="Test Placeholder" [(ngModel)]="answer.value"></ion-input>\n  <hr>\n  <button ion-button (click)="goToNext(\'a\')" >Next</button>\n  <button ion-button (click)="goToPrev(\'a\')">Previous</button>\n</ion-content>\n'/*ion-inline-end:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/suervy/suervy.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_3__providers_app_global_app_global__["a" /* AppGlobalProvider */]])
    ], SuervyPage);
    return SuervyPage;
}());

//# sourceMappingURL=suervy.js.map

/***/ }),

/***/ 176:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SurveyListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_user_data_ts__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_data_getter_service_data_getter_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_app_global_app_global__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__suervy_suervy__ = __webpack_require__(175);
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
    function SurveyListPage(navCtrl, navParams, dataGetterService, events, userData, loadingCtrl, appGlobal, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataGetterService = dataGetterService;
        this.events = events;
        this.userData = userData;
        this.loadingCtrl = loadingCtrl;
        this.appGlobal = appGlobal;
        this.toastCtrl = toastCtrl;
        this.surveys = [];
        this.user = userData.userData;
        this.events.subscribe('reload:surveys', function () {
            _this.refreshSurveysList(null);
            // this.loadSurveys(null);
        });
    }
    SurveyListPage.prototype.refreshSurveysList = function (refrence) {
        this.loadSurveys(refrence);
    };
    SurveyListPage.prototype.ionViewDidLoad = function () {
        // this.presentLoading();
    };
    SurveyListPage.prototype.ionViewDidEnter = function () {
        console.log('ionViewDidEnter SurveyListPage');
        this.loadSurveys(null);
    };
    SurveyListPage.prototype.presentLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
    };
    SurveyListPage.prototype.dismissLoading = function () {
        this.loading.dismiss();
    };
    SurveyListPage.prototype.refreshSurveys = function (ev) {
        this.loadSurveys(ev);
    };
    SurveyListPage.prototype.loadSurveys = function (ref) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        if (ref === null) {
            loading.present();
        }
        this.dataGetterService.getSurveys().subscribe(function (data) {
            console.log("Survey Loaded", data.data);
            var a = true;
            if (data.success || a) {
                _this.surveys = data.data;
            }
            else {
                _this.surveys = [];
            }
            loading.dismiss();
            if (ref != null) {
                ref.complete();
            }
        }, function (err) {
            console.log(err);
            _this.surveys = [];
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
    SurveyListPage.prototype.StartSurvey = function (ProjectId) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__suervy_suervy__["a" /* SuervyPage */], { qindex: 0 });
    };
    SurveyListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'page-survey-list',template:/*ion-inline-start:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/survey-list/survey-list.html"*/'<!--\n  Generated template for the SurveyListPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Surveys</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content>\n  <ion-refresher (ionRefresh)="refreshSurveys($event)">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n\n  <ion-list>\n    <ion-card *ngFor="let survey of surveys" (click)="StartSurvey(survey.project_id)"  >\n      <ion-card-header>{{survey.title}}\n          <span class="pull-right sr-age"><p>Project ID: <strong>{{survey.project_id}}</strong></p></span>\n      </ion-card-header>\n      <ion-card-content>\n          <p>Survey Description:<strong>{{survey.description}}</strong></p>\n          <p>duration_months:<strong>{{survey.duration_months}}</strong></p>\n          <p>start_date:<strong>{{survey.start_date}}</strong></p>\n\n      </ion-card-content>\n    </ion-card>\n  </ion-list>\n\n</ion-content>\n\n\n\n\n'/*ion-inline-end:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/survey-list/survey-list.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["p" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["q" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1__providers_data_getter_service_data_getter_service__["a" /* DataGetterServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* Events */],
            __WEBPACK_IMPORTED_MODULE_0__providers_user_data_ts__["a" /* UserData */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["l" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_app_global_app_global__["a" /* AppGlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["s" /* ToastController */]])
    ], SurveyListPage);
    return SurveyListPage;
}());

//# sourceMappingURL=survey-list.js.map

/***/ }),

/***/ 206:
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
webpackEmptyAsyncContext.id = 206;

/***/ }),

/***/ 208:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DirectivesModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__autoresize_autoresize__ = __webpack_require__(510);
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

/***/ 210:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular_components_toast_toast_controller__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_vibration__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_global_app_global__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular_components_loading_loading_controller__ = __webpack_require__(46);
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

/***/ 23:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserData; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular_components_alert_alert_controller__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__login_service_login_service__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(97);
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
        console.log('Hello UserData Provider');
    }
    UserData.prototype.login = function (username, password) {
        var _this = this;
        console.log("USERNAME:", username);
        console.log("PASSWORD:", password);
        this.loginserviceprovider.doLogin(username, password)
            .then(function (data) {
            console.log(data);
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

/***/ 252:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/access-card-request-form/access-card-request-form.module": [
		253
	],
	"../pages/access-card-request/access-card-request.module": [
		254
	],
	"../pages/article-index/article-index.module": [
		375
	],
	"../pages/article-show/article-show.module": [
		376
	],
	"../pages/calendar-view/calendar-view.module": [
		377
	],
	"../pages/canteen-facility/canteen-facility.module": [
		379
	],
	"../pages/comments/comments.module": [
		380
	],
	"../pages/directory/directory.module": [
		381
	],
	"../pages/grievance-filter/grievance-filter.module": [
		384
	],
	"../pages/grievance-form/grievance-form.module": [
		386
	],
	"../pages/grievance-show/grievance-show.module": [
		387
	],
	"../pages/grievance/grievance.module": [
		407
	],
	"../pages/guest-lunch-form/guest-lunch-form.module": [
		406
	],
	"../pages/guest-lunch/guest-lunch.module": [
		408
	],
	"../pages/guest-room-request-form/guest-room-request-form.module": [
		409
	],
	"../pages/guest-room-request-show/guest-room-request-show.module": [
		410
	],
	"../pages/guest-room-request/guest-room-request.module": [
		411
	],
	"../pages/home/home.module": [
		412
	],
	"../pages/idea-filter/idea-filter.module": [
		414
	],
	"../pages/idea-form/idea-form.module": [
		416
	],
	"../pages/idea-show/idea-show.module": [
		417
	],
	"../pages/idea/idea.module": [
		418
	],
	"../pages/intro/intro.module": [
		420
	],
	"../pages/leave-confirm/leave-confirm.module": [
		422
	],
	"../pages/leave-detail/leave-detail.module": [
		421
	],
	"../pages/leave-details/leave-details.module": [
		424
	],
	"../pages/leave-filter/leave-filter.module": [
		425
	],
	"../pages/leave-new/leave-new.module": [
		426
	],
	"../pages/leaves-show/leaves-show.module": [
		427
	],
	"../pages/login/login.module": [
		428
	],
	"../pages/logout/logout.module": [
		429
	],
	"../pages/maintenance-request-form/maintenance-request-form.module": [
		430
	],
	"../pages/maintenance-request/maintenance-request.module": [
		431
	],
	"../pages/offline/offline.module": [
		432
	],
	"../pages/parakh-dashboard/parakh-dashboard.module": [
		434
	],
	"../pages/policies-show/policies-show.module": [
		435
	],
	"../pages/policies/policies.module": [
		436
	],
	"../pages/profile/profile.module": [
		437
	],
	"../pages/service-request-form/service-request-form.module": [
		438
	],
	"../pages/service-request-show/service-request-show.module": [
		440
	],
	"../pages/service-request/service-request.module": [
		441
	],
	"../pages/stationery-request-form/stationery-request-form.module": [
		442
	],
	"../pages/stationery-request/stationery-request.module": [
		443
	],
	"../pages/suervy/suervy.module": [
		444
	],
	"../pages/survey-list/survey-list.module": [
		445
	],
	"../pages/tutorial/tutorial.module": [
		447
	],
	"../pages/userblock/userblock.module": [
		446
	],
	"../pages/visiting-card-form/visiting-card-form.module": [
		449
	],
	"../pages/visiting-card/visiting-card.module": [
		450
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
webpackAsyncContext.id = 252;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 253:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccessCardRequestFormPageModule", function() { return AccessCardRequestFormPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__access_card_request_form__ = __webpack_require__(143);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AccessCardRequestFormPageModule = /** @class */ (function () {
    function AccessCardRequestFormPageModule() {
    }
    AccessCardRequestFormPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__access_card_request_form__["a" /* AccessCardRequestFormPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__access_card_request_form__["a" /* AccessCardRequestFormPage */]),
            ],
        })
    ], AccessCardRequestFormPageModule);
    return AccessCardRequestFormPageModule;
}());

//# sourceMappingURL=access-card-request-form.module.js.map

/***/ }),

/***/ 254:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccessCardRequestPageModule", function() { return AccessCardRequestPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__access_card_request__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pipes_pipes_module__ = __webpack_require__(27);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var AccessCardRequestPageModule = /** @class */ (function () {
    function AccessCardRequestPageModule() {
    }
    AccessCardRequestPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__access_card_request__["a" /* AccessCardRequestPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__access_card_request__["a" /* AccessCardRequestPage */]),
                __WEBPACK_IMPORTED_MODULE_3__pipes_pipes_module__["a" /* PipesModule */],
            ],
        })
    ], AccessCardRequestPageModule);
    return AccessCardRequestPageModule;
}());

//# sourceMappingURL=access-card-request.module.js.map

/***/ }),

/***/ 27:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PipesModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__search_search__ = __webpack_require__(534);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__safe_safe__ = __webpack_require__(535);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sort_sort__ = __webpack_require__(536);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__safe_html_safe_html__ = __webpack_require__(538);
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

/***/ 375:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArticleIndexPageModule", function() { return ArticleIndexPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pipes_pipes_module__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__article_index__ = __webpack_require__(144);
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

/***/ 376:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArticleShowPageModule", function() { return ArticleShowPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pipes_pipes_module__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_components_module__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__article_show__ = __webpack_require__(67);
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

/***/ 377:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CalendarViewPageModule", function() { return CalendarViewPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__calendar_view__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic2_calendar_en__ = __webpack_require__(378);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var CalendarViewPageModule = /** @class */ (function () {
    function CalendarViewPageModule() {
    }
    CalendarViewPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__calendar_view__["a" /* CalendarViewPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__calendar_view__["a" /* CalendarViewPage */]),
                __WEBPACK_IMPORTED_MODULE_3_ionic2_calendar_en__["a" /* CalendarModule */]
            ],
        })
    ], CalendarViewPageModule);
    return CalendarViewPageModule;
}());

//# sourceMappingURL=calendar-view.module.js.map

/***/ }),

/***/ 379:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanteenFacilityPageModule", function() { return CanteenFacilityPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__canteen_facility__ = __webpack_require__(147);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CanteenFacilityPageModule = /** @class */ (function () {
    function CanteenFacilityPageModule() {
    }
    CanteenFacilityPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__canteen_facility__["a" /* CanteenFacilityPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__canteen_facility__["a" /* CanteenFacilityPage */]),
            ],
        })
    ], CanteenFacilityPageModule);
    return CanteenFacilityPageModule;
}());

//# sourceMappingURL=canteen-facility.module.js.map

/***/ }),

/***/ 380:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommentsPageModule", function() { return CommentsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__comments__ = __webpack_require__(87);
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

/***/ 381:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DirectoryPageModule", function() { return DirectoryPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__directory__ = __webpack_require__(148);
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

/***/ 384:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GrievanceFilterPageModule", function() { return GrievanceFilterPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__grievance_filter__ = __webpack_require__(385);
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

/***/ 385:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GrievanceFilterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular_components_alert_alert_controller__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(2);
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
            selector: 'page-grievance-filter',template:/*ion-inline-start:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/grievance-filter/grievance-filter.html"*/'<ion-header>\n  <ion-toolbar>\n    <ion-buttons start>\n      <button ion-button (click)="dismiss()">Cancel</button>\n    </ion-buttons>\n\n    <ion-title>\n      Filter Grievance\n    </ion-title>\n\n    <ion-buttons end>\n      <button ion-button (click)="applyFilters()" strong>Done</button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content class="outer-content">\n\n  <ion-list>\n    <ion-list-header>Whose Grievances</ion-list-header>\n\n    <ion-item *ngFor="let whoseGrievance of grievanceWhose" [attr.whoseGrievance]="whoseGrievance.name | lowercase">\n      <span item-start class="dot"></span>\n      <ion-label text-capitalize>{{whoseGrievance.name}}</ion-label>\n      <ion-toggle [(ngModel)]="whoseGrievance.isChecked" color="secondary"></ion-toggle>\n    </ion-item>\n\n  </ion-list>\n\n  <ion-list>\n    <button ion-item (click)="resetFilters()" detail-none class="reset-filters">\n      Reset All Filters\n    </button>\n  </ion-list>\n\n</ion-content>'/*ion-inline-end:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/grievance-filter/grievance-filter.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["p" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["q" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["t" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_0_ionic_angular_components_alert_alert_controller__["a" /* AlertController */]])
    ], GrievanceFilterPage);
    return GrievanceFilterPage;
}());

//# sourceMappingURL=grievance-filter.js.map

/***/ }),

/***/ 386:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GrievanceFormPageModule", function() { return GrievanceFormPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__grievance_form__ = __webpack_require__(149);
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

/***/ 387:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GrievanceShowPageModule", function() { return GrievanceShowPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__grievance_show__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_tags_input__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ngx_chips__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser_animations__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_forms__ = __webpack_require__(22);
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

/***/ 406:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GuestLunchFormPageModule", function() { return GuestLunchFormPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__guest_lunch_form__ = __webpack_require__(155);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var GuestLunchFormPageModule = /** @class */ (function () {
    function GuestLunchFormPageModule() {
    }
    GuestLunchFormPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__guest_lunch_form__["a" /* GuestLunchFormPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__guest_lunch_form__["a" /* GuestLunchFormPage */]),
            ],
        })
    ], GuestLunchFormPageModule);
    return GuestLunchFormPageModule;
}());

//# sourceMappingURL=guest-lunch-form.module.js.map

/***/ }),

/***/ 407:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GrievancePageModule", function() { return GrievancePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pipes_pipes_module__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__grievance__ = __webpack_require__(156);
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

/***/ 408:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GuestLunchPageModule", function() { return GuestLunchPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__guest_lunch__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pipes_pipes_module__ = __webpack_require__(27);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var GuestLunchPageModule = /** @class */ (function () {
    function GuestLunchPageModule() {
    }
    GuestLunchPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__guest_lunch__["a" /* GuestLunchPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__guest_lunch__["a" /* GuestLunchPage */]),
                __WEBPACK_IMPORTED_MODULE_3__pipes_pipes_module__["a" /* PipesModule */],
            ],
        })
    ], GuestLunchPageModule);
    return GuestLunchPageModule;
}());

//# sourceMappingURL=guest-lunch.module.js.map

/***/ }),

/***/ 409:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GuestRoomRequestFormPageModule", function() { return GuestRoomRequestFormPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__guest_room_request_form__ = __webpack_require__(157);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var GuestRoomRequestFormPageModule = /** @class */ (function () {
    function GuestRoomRequestFormPageModule() {
    }
    GuestRoomRequestFormPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__guest_room_request_form__["a" /* GuestRoomRequestFormPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__guest_room_request_form__["a" /* GuestRoomRequestFormPage */]),
            ],
        })
    ], GuestRoomRequestFormPageModule);
    return GuestRoomRequestFormPageModule;
}());

//# sourceMappingURL=guest-room-request-form.module.js.map

/***/ }),

/***/ 410:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GuestRoomRequestShowPageModule", function() { return GuestRoomRequestShowPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__guest_room_request_show__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_tags_input__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ngx_chips__ = __webpack_require__(70);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var GuestRoomRequestShowPageModule = /** @class */ (function () {
    function GuestRoomRequestShowPageModule() {
    }
    GuestRoomRequestShowPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__guest_room_request_show__["a" /* GuestRoomRequestShowPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__guest_room_request_show__["a" /* GuestRoomRequestShowPage */]),
                __WEBPACK_IMPORTED_MODULE_3_ionic_tags_input__["a" /* IonTagsInputModule */],
                __WEBPACK_IMPORTED_MODULE_4_ngx_chips__["a" /* TagInputModule */],
            ],
        })
    ], GuestRoomRequestShowPageModule);
    return GuestRoomRequestShowPageModule;
}());

//# sourceMappingURL=guest-room-request-show.module.js.map

/***/ }),

/***/ 411:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GuestRoomRequestPageModule", function() { return GuestRoomRequestPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__guest_room_request__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pipes_pipes_module__ = __webpack_require__(27);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var GuestRoomRequestPageModule = /** @class */ (function () {
    function GuestRoomRequestPageModule() {
    }
    GuestRoomRequestPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__guest_room_request__["a" /* GuestRoomRequestPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__guest_room_request__["a" /* GuestRoomRequestPage */]),
                __WEBPACK_IMPORTED_MODULE_3__pipes_pipes_module__["a" /* PipesModule */],
            ],
        })
    ], GuestRoomRequestPageModule);
    return GuestRoomRequestPageModule;
}());

//# sourceMappingURL=guest-room-request.module.js.map

/***/ }),

/***/ 412:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePageModule", function() { return HomePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pipes_pipes_module__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home__ = __webpack_require__(72);
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

/***/ 413:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DatabaseProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__ = __webpack_require__(114);
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
var DatabaseProvider = /** @class */ (function () {
    function DatabaseProvider(http, sqlstorage) {
        this.http = http;
        this.sqlstorage = sqlstorage;
        console.log('Hello DatabaseProvider Provider');
        this.sqlstorage.create({ name: 'ivdp.db',
            location: 'default' })
            .then(function (db) {
            db.executeSql('create table danceMoves(name VARCHAR(32))', [])
                .then(function () { return console.log('Executed SQL'); })
                .catch(function (e) { return console.log(e); });
        }).catch(function (e) { return console.log(e); });
    }
    DatabaseProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__["a" /* SQLite */]])
    ], DatabaseProvider);
    return DatabaseProvider;
}());

//# sourceMappingURL=database.js.map

/***/ }),

/***/ 414:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IdeaFilterPageModule", function() { return IdeaFilterPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__idea_filter__ = __webpack_require__(415);
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

/***/ 415:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IdeaFilterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular_components_alert_alert_controller__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(2);
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
            selector: 'page-idea-filter',template:/*ion-inline-start:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/idea-filter/idea-filter.html"*/'<ion-header>\n  <ion-toolbar>\n    <ion-buttons start>\n      <button ion-button (click)="dismiss()">Cancel</button>\n    </ion-buttons>\n\n    <ion-title>\n      Filter Ideas\n    </ion-title>\n\n    <ion-buttons end>\n      <button ion-button (click)="applyFilters()" strong>Done</button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content class="outer-content">\n\n  <ion-list>\n    <ion-list-header>Whose Ideas</ion-list-header>\n\n    <ion-item *ngFor="let whoseIdea of ideaWhose" [attr.whoseIdea]="whoseIdea.name | lowercase">\n      <span item-start class="dot"></span>\n      <ion-label text-capitalize>{{whoseIdea.name}}</ion-label>\n      <ion-toggle [(ngModel)]="whoseIdea.isChecked" color="secondary"></ion-toggle>\n    </ion-item>\n\n  </ion-list>\n\n  <ion-list>\n    <button ion-item (click)="resetFilters()" detail-none class="reset-filters">\n      Reset All Filters\n    </button>\n  </ion-list>\n\n</ion-content>'/*ion-inline-end:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/idea-filter/idea-filter.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["p" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["q" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["t" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_0_ionic_angular_components_alert_alert_controller__["a" /* AlertController */]])
    ], IdeaFilterPage);
    return IdeaFilterPage;
}());

//# sourceMappingURL=idea-filter.js.map

/***/ }),

/***/ 416:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IdeaFormPageModule", function() { return IdeaFormPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__idea_form__ = __webpack_require__(163);
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

/***/ 417:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IdeaShowPageModule", function() { return IdeaShowPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__idea_show__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_tags_input__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ngx_chips__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser_animations__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_forms__ = __webpack_require__(22);
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

/***/ 418:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IdeaPageModule", function() { return IdeaPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pipes_pipes_module__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__idea__ = __webpack_require__(419);
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

/***/ 419:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IdeaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_app_global_app_global__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__idea_filter_idea_filter__ = __webpack_require__(415);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_data_getter_service_data_getter_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__idea_show_idea_show__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__idea_form_idea_form__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_lodash__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_moment__ = __webpack_require__(1);
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
            selector: 'page-idea',template:/*ion-inline-start:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/idea/idea.html"*/'<!--\n  Generated template for the IdeaPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Ideas</ion-title>\n  </ion-navbar>\n  <ion-toolbar no-border-top>\n    <ion-searchbar color="primary" [(ngModel)]="queryText" placeholder="Search">\n    </ion-searchbar>\n    <ion-buttons end>\n      <button ion-button icon-only [disabled]="ideas_m.length === 0" (click)="presentFilter()">\n        <ion-icon ios="ios-options-outline" md="md-options"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n\n<ion-content padding>\n  <ion-refresher (ionRefresh)="refreshSRList($event)">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n\n\n  <ion-list *ngIf="ideas_m.shownIdeas > 0">\n    <ion-card *ngFor="let idea of ideas_m | search : {term:queryText,fields:[\'uid\',\'content\',\'state\']} | sort: {property: field, order: order}" (click)="goToIdea(idea.uid)" [hidden]="idea.hide">\n      <div class="{{\'idea_state_sidebar_\'+idea.state}}">\n      <!--<ion-card>-->\n      <ion-card-header>\n        {{idea.uid}}\n        <span class="pull-right sr-age">{{idea.age}}</span>\n\n      </ion-card-header>\n      <ion-card-content>\n        <div [innerHtml]="\'<div>\'+idea.content.substring(0,150)+\'....</div>\'" class="inline">\n      </div>\n      </ion-card-content>\n      <ion-row *ngIf="idea.updated_at">\n        <ion-col>\n          <ion-note class="pull-right" style="color:black;">\n            Last Activity:\n            <b>{{getLastActivity(idea.updated_at)}}</b>\n          </ion-note>\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col>\n          <ion-badge class="pull-right">{{idea.state}}</ion-badge>\n        </ion-col>\n      </ion-row>\n      </div>\n    </ion-card>\n  </ion-list>\n  <ion-fab right bottom>\n    <button ion-fab (click)="goToSRForm()"><ion-icon name="add"></ion-icon></button>\n  </ion-fab>\n\n  <ion-item *ngIf="ideas_m.shownIdeas === 0" text-center>\n    No Ideas to be Shown\n  </ion-item>\n\n</ion-content>\n'/*ion-inline-end:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/idea/idea.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["p" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["q" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__providers_data_getter_service_data_getter_service__["a" /* DataGetterServiceProvider */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["l" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* Events */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["n" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["s" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_0__providers_app_global_app_global__["a" /* AppGlobalProvider */]])
    ], IdeaPage);
    return IdeaPage;
}());

//# sourceMappingURL=idea.js.map

/***/ }),

/***/ 420:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IntroPageModule", function() { return IntroPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__intro__ = __webpack_require__(159);
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

/***/ 421:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LeaveDetailPageModule", function() { return LeaveDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__leave_detail__ = __webpack_require__(164);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var LeaveDetailPageModule = /** @class */ (function () {
    function LeaveDetailPageModule() {
    }
    LeaveDetailPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__leave_detail__["a" /* LeaveDetailPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__leave_detail__["a" /* LeaveDetailPage */]),
            ],
        })
    ], LeaveDetailPageModule);
    return LeaveDetailPageModule;
}());

//# sourceMappingURL=leave-detail.module.js.map

/***/ }),

/***/ 422:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LeaveConfirmPageModule", function() { return LeaveConfirmPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__leave_confirm__ = __webpack_require__(423);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var LeaveConfirmPageModule = /** @class */ (function () {
    function LeaveConfirmPageModule() {
    }
    LeaveConfirmPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__leave_confirm__["a" /* LeaveConfirmPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__leave_confirm__["a" /* LeaveConfirmPage */]),
            ],
        })
    ], LeaveConfirmPageModule);
    return LeaveConfirmPageModule;
}());

//# sourceMappingURL=leave-confirm.module.js.map

/***/ }),

/***/ 423:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LeaveConfirmPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
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
 * Generated class for the LeaveConfirmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LeaveConfirmPage = /** @class */ (function () {
    function LeaveConfirmPage(navCtrl, navParams, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.allHalfLeaveRecords = [];
        console.log("LeaveConfirmPage", this.navParams.get('allHalfLeaveRecords'));
        this.allHalfLeaveRecords = this.navParams.get('allHalfLeaveRecords');
    }
    LeaveConfirmPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LeaveConfirmPage');
    };
    LeaveConfirmPage.prototype.cancel = function () {
        this.viewCtrl.dismiss();
    };
    LeaveConfirmPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-leave-confirm',template:/*ion-inline-start:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/leave-confirm/leave-confirm.html"*/'<!--\n  Generated template for the LeaveConfirmPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<!-- <ion-header>\n\n  <ion-navbar>\n    <ion-title></ion-title>\n  </ion-navbar>\n\n</ion-header> -->\n\n\n<ion-content>\n  <div padding>\n    <h5>Current Application Details</h5>\n    <ion-grid>\n      <ion-row>\n        <ion-col><strong>Applied dates</strong></ion-col>\n        <ion-col><strong>Leave Details</strong></ion-col>\n        <ion-col><strong>Day</strong></ion-col>\n      </ion-row>\n      <ion-row *ngFor=\'let leaveRecords of allHalfLeaveRecords; index as i; odd as isOdd; even as isEven\' [class.row-odd]="isOdd" [class.row-even]="isEven">\n        <ion-col>{{leaveRecords.Applieddates}}</ion-col>\n        <ion-col>{{leaveRecords.leavedetails}}</ion-col>\n        <ion-col>{{leaveRecords.wday}}</ion-col>\n      </ion-row>\n    </ion-grid>\n  </div>\n  <button ion-button full (tap)="cancel()">OK</button>\n</ion-content>\n'/*ion-inline-end:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/leave-confirm/leave-confirm.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ViewController */]])
    ], LeaveConfirmPage);
    return LeaveConfirmPage;
}());

//# sourceMappingURL=leave-confirm.js.map

/***/ }),

/***/ 424:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LeaveDetailsPageModule", function() { return LeaveDetailsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__leave_details__ = __webpack_require__(146);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var LeaveDetailsPageModule = /** @class */ (function () {
    function LeaveDetailsPageModule() {
    }
    LeaveDetailsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__leave_details__["a" /* LeaveDetailsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__leave_details__["a" /* LeaveDetailsPage */]),
            ],
        })
    ], LeaveDetailsPageModule);
    return LeaveDetailsPageModule;
}());

//# sourceMappingURL=leave-details.module.js.map

/***/ }),

/***/ 425:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LeaveFilterPageModule", function() { return LeaveFilterPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__leave_filter__ = __webpack_require__(165);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var LeaveFilterPageModule = /** @class */ (function () {
    function LeaveFilterPageModule() {
    }
    LeaveFilterPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__leave_filter__["a" /* LeaveFilterPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__leave_filter__["a" /* LeaveFilterPage */]),
            ],
        })
    ], LeaveFilterPageModule);
    return LeaveFilterPageModule;
}());

//# sourceMappingURL=leave-filter.module.js.map

/***/ }),

/***/ 426:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LeaveNewPageModule", function() { return LeaveNewPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__leave_new__ = __webpack_require__(166);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var LeaveNewPageModule = /** @class */ (function () {
    function LeaveNewPageModule() {
    }
    LeaveNewPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__leave_new__["a" /* LeaveNewPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__leave_new__["a" /* LeaveNewPage */]),
            ],
        })
    ], LeaveNewPageModule);
    return LeaveNewPageModule;
}());

//# sourceMappingURL=leave-new.module.js.map

/***/ }),

/***/ 427:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LeavesShowPageModule", function() { return LeavesShowPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__leaves_show__ = __webpack_require__(167);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var LeavesShowPageModule = /** @class */ (function () {
    function LeavesShowPageModule() {
    }
    LeavesShowPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__leaves_show__["a" /* LeavesShowPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__leaves_show__["a" /* LeavesShowPage */]),
            ],
        })
    ], LeavesShowPageModule);
    return LeavesShowPageModule;
}());

//# sourceMappingURL=leaves-show.module.js.map

/***/ }),

/***/ 428:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPageModule", function() { return LoginPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login__ = __webpack_require__(168);
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

/***/ 429:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogoutPageModule", function() { return LogoutPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__logout__ = __webpack_require__(169);
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

/***/ 430:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaintenanceRequestFormPageModule", function() { return MaintenanceRequestFormPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__maintenance_request_form__ = __webpack_require__(161);
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

/***/ 431:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaintenanceRequestPageModule", function() { return MaintenanceRequestPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__maintenance_request__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pipes_pipes_module__ = __webpack_require__(27);
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

/***/ 432:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OfflinePageModule", function() { return OfflinePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__offline__ = __webpack_require__(433);
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

/***/ 433:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OfflinePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_native_network__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_app_global_app_global__ = __webpack_require__(6);
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
        this.appGlobal.isOnline = false;
    };
    OfflinePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad OfflinePage');
        if (this.menuCtrl.isOpen()) {
            this.menuCtrl.close();
        }
    };
    OfflinePage.prototype.ionViewCanLeave = function () {
        return this.appGlobal.isOnline;
        // here we can either return true or false
        // depending on if we want to leave this view
    };
    OfflinePage.prototype.refresh = function (refresher) {
        var _this = this;
        setTimeout(function () {
            var network_type = _this.network.type;
            if (network_type != "none") {
                _this.appGlobal.isOnline = true;
                if (_this.navCtrl.canGoBack) {
                    _this.navCtrl.pop();
                }
                else {
                    _this.events.publish('app:setRootAsHome');
                }
            }
            refresher.complete();
        }, 2000);
    };
    OfflinePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-offline',template:/*ion-inline-start:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/offline/offline.html"*/'<!--\n  Generated template for the OfflinePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar hideBackButton="true">\n    <ion-title>\n      <img src="assets/img/appicon.png" height="30" alt="Empower">\n    </ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content center text-center padding>\n  <ion-refresher (ionRefresh)="refresh($event)">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n  <!-- <div class="logo">\n    <img src="assets/img/appicon.png" alt="Empower">\n  </div> -->\n  <h4>You are offline !!</h4>\n\n  <h5>\n <!-- It looks like you are offline! Please check your network connection and try again. -->\n    <p>It seems currently you are offline and we are unable to reach our servers.</p>\n    <p>This being an online application, cannot be used in this state. Please wait while we automatically detect your internet\n      status and take you back to action!</p>\n  </h5>\n</ion-content>\n'/*ion-inline-end:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/offline/offline.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["p" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["q" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_0__ionic_native_network__["a" /* Network */],
            __WEBPACK_IMPORTED_MODULE_3__providers_app_global_app_global__["a" /* AppGlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* Events */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* MenuController */]])
    ], OfflinePage);
    return OfflinePage;
}());

//# sourceMappingURL=offline.js.map

/***/ }),

/***/ 434:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ParakhDashboardPageModule", function() { return ParakhDashboardPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__parakh_dashboard__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pipes_pipes_module__ = __webpack_require__(27);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ParakhDashboardPageModule = /** @class */ (function () {
    function ParakhDashboardPageModule() {
    }
    ParakhDashboardPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__parakh_dashboard__["a" /* ParakhDashboardPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__parakh_dashboard__["a" /* ParakhDashboardPage */]),
                __WEBPACK_IMPORTED_MODULE_3__pipes_pipes_module__["a" /* PipesModule */]
            ],
        })
    ], ParakhDashboardPageModule);
    return ParakhDashboardPageModule;
}());

//# sourceMappingURL=parakh-dashboard.module.js.map

/***/ }),

/***/ 435:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PoliciesShowPageModule", function() { return PoliciesShowPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__policies_show__ = __webpack_require__(171);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PoliciesShowPageModule = /** @class */ (function () {
    function PoliciesShowPageModule() {
    }
    PoliciesShowPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__policies_show__["a" /* PoliciesShowPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__policies_show__["a" /* PoliciesShowPage */]),
            ],
        })
    ], PoliciesShowPageModule);
    return PoliciesShowPageModule;
}());

//# sourceMappingURL=policies-show.module.js.map

/***/ }),

/***/ 436:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PoliciesPageModule", function() { return PoliciesPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__policies__ = __webpack_require__(172);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PoliciesPageModule = /** @class */ (function () {
    function PoliciesPageModule() {
    }
    PoliciesPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__policies__["a" /* PoliciesPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__policies__["a" /* PoliciesPage */]),
            ],
        })
    ], PoliciesPageModule);
    return PoliciesPageModule;
}());

//# sourceMappingURL=policies.module.js.map

/***/ }),

/***/ 437:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfilePageModule", function() { return ProfilePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__directives_directives_module__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__profile__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_tags_input__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ngx_chips__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser_animations__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_forms__ = __webpack_require__(22);
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

/***/ 438:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServiceRequestFormPageModule", function() { return ServiceRequestFormPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_request_form__ = __webpack_require__(173);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ServiceRequestFormPageModule = /** @class */ (function () {
    function ServiceRequestFormPageModule() {
    }
    ServiceRequestFormPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__service_request_form__["a" /* ServiceRequestFormPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__service_request_form__["a" /* ServiceRequestFormPage */]),
            ],
        })
    ], ServiceRequestFormPageModule);
    return ServiceRequestFormPageModule;
}());

//# sourceMappingURL=service-request-form.module.js.map

/***/ }),

/***/ 440:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServiceRequestShowPageModule", function() { return ServiceRequestShowPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_request_show__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(88);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ServiceRequestShowPageModule = /** @class */ (function () {
    function ServiceRequestShowPageModule() {
    }
    ServiceRequestShowPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__service_request_show__["a" /* ServiceRequestShowPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__service_request_show__["a" /* ServiceRequestShowPage */]),
                __WEBPACK_IMPORTED_MODULE_3__components_components_module__["a" /* ComponentsModule */],
            ],
        })
    ], ServiceRequestShowPageModule);
    return ServiceRequestShowPageModule;
}());

//# sourceMappingURL=service-request-show.module.js.map

/***/ }),

/***/ 441:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServiceRequestPageModule", function() { return ServiceRequestPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pipes_pipes_module__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_request__ = __webpack_require__(174);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ServiceRequestPageModule = /** @class */ (function () {
    function ServiceRequestPageModule() {
    }
    ServiceRequestPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__service_request__["a" /* ServiceRequestPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__service_request__["a" /* ServiceRequestPage */]),
                __WEBPACK_IMPORTED_MODULE_0__pipes_pipes_module__["a" /* PipesModule */],
            ],
        })
    ], ServiceRequestPageModule);
    return ServiceRequestPageModule;
}());

//# sourceMappingURL=service-request.module.js.map

/***/ }),

/***/ 442:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StationeryRequestFormPageModule", function() { return StationeryRequestFormPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__stationery_request_form__ = __webpack_require__(162);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var StationeryRequestFormPageModule = /** @class */ (function () {
    function StationeryRequestFormPageModule() {
    }
    StationeryRequestFormPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__stationery_request_form__["a" /* StationeryRequestFormPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__stationery_request_form__["a" /* StationeryRequestFormPage */]),
            ],
        })
    ], StationeryRequestFormPageModule);
    return StationeryRequestFormPageModule;
}());

//# sourceMappingURL=stationery-request-form.module.js.map

/***/ }),

/***/ 443:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StationeryRequestPageModule", function() { return StationeryRequestPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__stationery_request__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pipes_pipes_module__ = __webpack_require__(27);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var StationeryRequestPageModule = /** @class */ (function () {
    function StationeryRequestPageModule() {
    }
    StationeryRequestPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__stationery_request__["a" /* StationeryRequestPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__stationery_request__["a" /* StationeryRequestPage */]),
                __WEBPACK_IMPORTED_MODULE_3__pipes_pipes_module__["a" /* PipesModule */],
            ],
        })
    ], StationeryRequestPageModule);
    return StationeryRequestPageModule;
}());

//# sourceMappingURL=stationery-request.module.js.map

/***/ }),

/***/ 444:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SuervyPageModule", function() { return SuervyPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__suervy__ = __webpack_require__(175);
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

/***/ 445:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SurveyListPageModule", function() { return SurveyListPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pipes_pipes_module__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__survey_list__ = __webpack_require__(176);
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

/***/ 446:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserblockPageModule", function() { return UserblockPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__userblock__ = __webpack_require__(116);
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

/***/ 447:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TutorialPageModule", function() { return TutorialPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tutorial__ = __webpack_require__(448);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(101);
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

/***/ 448:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TutorialPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(72);
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
            selector: 'page-tutorial',template:/*ion-inline-start:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/tutorial/tutorial.html"*/'<ion-header no-shadow>\n  <ion-navbar>\n    <ion-buttons end *ngIf="showSkip">\n      <button ion-button (click)="startApp()" color="primary">{{ \'TUTORIAL_SKIP_BUTTON\' | translate}}</button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content no-bounce>\n  <ion-slides pager="true" dir="{{dir}}" (ionSlideWillChange)="onSlideChangeStart($event)">\n    <ion-slide *ngFor="let slide of slides">\n      <img [src]="slide.image" class="slide-image" />\n      <h2 class="slide-title" [innerHTML]="slide.title"></h2>\n      <p [innerHTML]="slide.description"></p>\n    </ion-slide>\n    <ion-slide>\n      <img src="assets/img/ica-slidebox-img-4.png" class="slide-image" />\n      <h2 class="slide-title">{{ \'TUTORIAL_SLIDE4_TITLE\' | translate }}</h2>\n      <button ion-button icon-end large clear (click)="startApp()">\n        {{ \'TUTORIAL_CONTINUE_BUTTON\' | translate }}\n        <ion-icon name="arrow-forward"></ion-icon>\n      </button>\n    </ion-slide>\n  </ion-slides>\n</ion-content>\n'/*ion-inline-end:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/tutorial/tutorial.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* MenuController */], __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* Platform */]])
    ], TutorialPage);
    return TutorialPage;
}());

//# sourceMappingURL=tutorial.js.map

/***/ }),

/***/ 449:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VisitingCardFormPageModule", function() { return VisitingCardFormPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__visiting_card_form__ = __webpack_require__(160);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var VisitingCardFormPageModule = /** @class */ (function () {
    function VisitingCardFormPageModule() {
    }
    VisitingCardFormPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__visiting_card_form__["a" /* VisitingCardFormPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__visiting_card_form__["a" /* VisitingCardFormPage */]),
            ],
        })
    ], VisitingCardFormPageModule);
    return VisitingCardFormPageModule;
}());

//# sourceMappingURL=visiting-card-form.module.js.map

/***/ }),

/***/ 450:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VisitingCardPageModule", function() { return VisitingCardPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__visiting_card__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pipes_pipes_module__ = __webpack_require__(27);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var VisitingCardPageModule = /** @class */ (function () {
    function VisitingCardPageModule() {
    }
    VisitingCardPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__visiting_card__["a" /* VisitingCardPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__visiting_card__["a" /* VisitingCardPage */]),
                __WEBPACK_IMPORTED_MODULE_3__pipes_pipes_module__["a" /* PipesModule */],
            ],
        })
    ], VisitingCardPageModule);
    return VisitingCardPageModule;
}());

//# sourceMappingURL=visiting-card.module.js.map

/***/ }),

/***/ 492:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(493);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_module__ = __webpack_require__(501);



Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_14" /* enableProdMode */])();
Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 501:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export createTranslateLoader */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_native_sqlite__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__directives_directives_module__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_userblock_userblock__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_directory_directory__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_grievance_filter_grievance_filter_module__ = __webpack_require__(384);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_idea_filter_idea_filter_module__ = __webpack_require__(414);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_survey_list_survey_list_module__ = __webpack_require__(445);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_leave_confirm_leave_confirm_module__ = __webpack_require__(422);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_home_home_module__ = __webpack_require__(412);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_tutorial_tutorial_module__ = __webpack_require__(447);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_service_request_show_service_request_show_module__ = __webpack_require__(440);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_service_request_form_service_request_form_module__ = __webpack_require__(438);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_service_request_service_request_module__ = __webpack_require__(441);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_policies_show_policies_show_module__ = __webpack_require__(435);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_policies_policies_module__ = __webpack_require__(436);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_logout_logout_module__ = __webpack_require__(429);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_login_login_module__ = __webpack_require__(428);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_leaves_show_leaves_show_module__ = __webpack_require__(427);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_leave_new_leave_new_module__ = __webpack_require__(426);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_leave_filter_leave_filter_module__ = __webpack_require__(425);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_leave_details_leave_details_module__ = __webpack_require__(424);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_leave_detail_leave_detail_module__ = __webpack_require__(421);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_idea_form_idea_form_module__ = __webpack_require__(416);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_idea_idea_module__ = __webpack_require__(418);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_grievance_show_grievance_show_module__ = __webpack_require__(387);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_grievance_form_grievance_form_module__ = __webpack_require__(386);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_grievance_grievance_module__ = __webpack_require__(407);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_calendar_view_calendar_view_module__ = __webpack_require__(377);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_article_show_article_show_module__ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__components_components_module__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_article_index_article_index_module__ = __webpack_require__(375);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_offline_offline_module__ = __webpack_require__(432);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__pages_leave_detail_leave_detail__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__pages_leave_filter_leave_filter__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__pages_leaves_show_leaves_show__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__pages_logout_logout__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__angular_platform_browser__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__app_component__ = __webpack_require__(666);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__pages_home_home__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__pages_login_login__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__ionic_native_splash_screen__ = __webpack_require__(490);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__pages_service_request_service_request__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__angular_common_http__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__ngx_translate_core__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__ngx_translate_http_loader__ = __webpack_require__(667);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__ionic_native_in_app_browser__ = __webpack_require__(669);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__pages_calendar_view_calendar_view__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__providers_data_getter_service_data_getter_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__pages_service_request_form_service_request_form__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51__providers_data_setter_data_setter__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52__pages_idea_idea__ = __webpack_require__(419);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53__pages_idea_form_idea_form__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_54__pages_grievance_grievance__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_55__pages_grievance_form_grievance_form__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_56__pages_service_request_show_service_request_show__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_57__pages_leave_details_leave_details__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_58__ionic_native_file_transfer__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_59__ionic_native_file__ = __webpack_require__(439);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_60__ionic_native_image_picker__ = __webpack_require__(382);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_61__ionic_native_crop__ = __webpack_require__(383);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_62__ionic_native_camera__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_63__ionic_native_file_path__ = __webpack_require__(670);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_64__pages_idea_show_idea_show__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_65__pages_grievance_show_grievance_show__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_66__providers_user_data_ts__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_67__ionic_storage__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_68__providers_login_service_login_service__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_69__providers_leave_data_leave_data__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_70__pages_leave_new_leave_new__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_71__providers_app_global_app_global__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_72__pages_tutorial_tutorial__ = __webpack_require__(448);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_73__pages_article_index_article_index__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_74__pages_article_show_article_show__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_75__pages_policies_policies__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_76__ionic_native_vibration__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_77__ionic_native_fcm__ = __webpack_require__(491);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_78__ionic_native_local_notifications__ = __webpack_require__(488);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_79__ionic_native_app_version__ = __webpack_require__(489);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_80__ionic_native_network__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_81__pages_policies_show_policies_show__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_82__pages_idea_show_idea_show_module__ = __webpack_require__(417);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_83__pages_survey_list_survey_list__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_84_ionic2_calendar_en__ = __webpack_require__(378);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_85__pages_comments_comments_module__ = __webpack_require__(380);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_86_ionic_tags_input__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_87_ngx_chips__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_88__angular_platform_browser_animations__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_89__angular_forms__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_90__pages_directory_directory_module__ = __webpack_require__(381);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_91__pages_userblock_userblock_module__ = __webpack_require__(446);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_92__pages_profile_profile_module__ = __webpack_require__(437);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_93__pages_profile_profile__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_94__pages_guest_lunch_guest_lunch_module__ = __webpack_require__(408);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_95__pages_guest_lunch_guest_lunch__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_96__pages_guest_lunch_form_guest_lunch_form__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_97__pages_guest_lunch_form_guest_lunch_form_module__ = __webpack_require__(406);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_98__pages_visiting_card_visiting_card_module__ = __webpack_require__(450);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_99__pages_visiting_card_form_visiting_card_form_module__ = __webpack_require__(449);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_100__pages_visiting_card_visiting_card__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_101__pages_visiting_card_form_visiting_card_form__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_102__pages_stationery_request_stationery_request_module__ = __webpack_require__(443);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_103__pages_stationery_request_form_stationery_request_form_module__ = __webpack_require__(442);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_104__pages_maintenance_request_maintenance_request_module__ = __webpack_require__(431);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_105__pages_maintenance_request_form_maintenance_request_form_module__ = __webpack_require__(430);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_106__pages_access_card_request_access_card_request_module__ = __webpack_require__(254);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_107__pages_access_card_request_form_access_card_request_form_module__ = __webpack_require__(253);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_108__pages_stationery_request_stationery_request__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_109__pages_stationery_request_form_stationery_request_form__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_110__pages_maintenance_request_maintenance_request__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_111__pages_maintenance_request_form_maintenance_request_form__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_112__pages_access_card_request_access_card_request__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_113__pages_access_card_request_form_access_card_request_form__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_114__pages_guest_room_request_guest_room_request_module__ = __webpack_require__(411);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_115__pages_guest_room_request_form_guest_room_request_form_module__ = __webpack_require__(409);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_116__pages_guest_room_request_show_guest_room_request_show_module__ = __webpack_require__(410);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_117__pages_guest_room_request_guest_room_request__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_118__pages_guest_room_request_form_guest_room_request_form__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_119__pages_guest_room_request_show_guest_room_request_show__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_120__pages_intro_intro__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_121__pages_intro_intro_module__ = __webpack_require__(420);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_122__pages_canteen_facility_canteen_facility_module__ = __webpack_require__(379);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_123__pages_canteen_facility_canteen_facility__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_124__pages_parakh_dashboard_parakh_dashboard__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_125__pages_parakh_dashboard_parakh_dashboard_module__ = __webpack_require__(434);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_126__pages_suervy_suervy__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_127__pages_suervy_suervy_module__ = __webpack_require__(444);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_128__providers_database_database__ = __webpack_require__(413);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


































































































































// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_46__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_37__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_39__app_component__["a" /* MyApp */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_36__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_38_ionic_angular__["i" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_39__app_component__["a" /* MyApp */], {
                    preloadModules: true,
                    scrollPadding: false,
                    scrollAssist: true,
                    autoFocusAssist: false
                }, {
                    links: [
                        { loadChildren: '../pages/access-card-request-form/access-card-request-form.module#AccessCardRequestFormPageModule', name: 'AccessCardRequestFormPage', segment: 'access-card-request-form', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/access-card-request/access-card-request.module#AccessCardRequestPageModule', name: 'AccessCardRequestPage', segment: 'access-card-request', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/article-index/article-index.module#ArticleIndexPageModule', name: 'ArticleIndexPage', segment: 'article-index', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/article-show/article-show.module#ArticleShowPageModule', name: 'ArticleShowPage', segment: 'article-show', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/calendar-view/calendar-view.module#CalendarViewPageModule', name: 'CalendarViewPage', segment: 'calendar-view', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/canteen-facility/canteen-facility.module#CanteenFacilityPageModule', name: 'CanteenFacilityPage', segment: 'canteen-facility', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/comments/comments.module#CommentsPageModule', name: 'CommentsPage', segment: 'comments', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/directory/directory.module#DirectoryPageModule', name: 'DirectoryPage', segment: 'directory', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/grievance-filter/grievance-filter.module#GrievanceFilterPageModule', name: 'GrievanceFilterPage', segment: 'grievance-filter', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/grievance-form/grievance-form.module#GrievanceFormPageModule', name: 'GrievanceFormPage', segment: 'grievance-form', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/grievance-show/grievance-show.module#GrievanceShowPageModule', name: 'GrievanceShowPage', segment: 'grievance-show', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/guest-lunch-form/guest-lunch-form.module#GuestLunchFormPageModule', name: 'GuestLunchFormPage', segment: 'guest-lunch-form', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/grievance/grievance.module#GrievancePageModule', name: 'GrievancePage', segment: 'grievance', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/guest-lunch/guest-lunch.module#GuestLunchPageModule', name: 'GuestLunchPage', segment: 'guest-lunch', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/guest-room-request-form/guest-room-request-form.module#GuestRoomRequestFormPageModule', name: 'GuestRoomRequestFormPage', segment: 'guest-room-request-form', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/guest-room-request-show/guest-room-request-show.module#GuestRoomRequestShowPageModule', name: 'GuestRoomRequestShowPage', segment: 'guest-room-request-show', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/guest-room-request/guest-room-request.module#GuestRoomRequestPageModule', name: 'GuestRoomRequestPage', segment: 'guest-room-request', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/home/home.module#HomePageModule', name: 'HomePage', segment: 'home', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/idea-filter/idea-filter.module#IdeaFilterPageModule', name: 'IdeaFilterPage', segment: 'idea-filter', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/idea-form/idea-form.module#IdeaFormPageModule', name: 'IdeaFormPage', segment: 'idea-form', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/idea-show/idea-show.module#IdeaShowPageModule', name: 'IdeaShowPage', segment: 'idea-show', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/idea/idea.module#IdeaPageModule', name: 'IdeaPage', segment: 'idea', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/intro/intro.module#IntroPageModule', name: 'IntroPage', segment: 'intro', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/leave-detail/leave-detail.module#LeaveDetailPageModule', name: 'LeaveDetailPage', segment: 'leave-detail', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/leave-confirm/leave-confirm.module#LeaveConfirmPageModule', name: 'LeaveConfirmPage', segment: 'leave-confirm', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/leave-details/leave-details.module#LeaveDetailsPageModule', name: 'LeaveDetailsPage', segment: 'leave-details', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/leave-filter/leave-filter.module#LeaveFilterPageModule', name: 'LeaveFilterPage', segment: 'leave-filter', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/leave-new/leave-new.module#LeaveNewPageModule', name: 'LeaveNewPage', segment: 'leave-new', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/leaves-show/leaves-show.module#LeavesShowPageModule', name: 'LeavesShowPage', segment: 'leaves-show', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/logout/logout.module#LogoutPageModule', name: 'LogoutPage', segment: 'logout', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/maintenance-request-form/maintenance-request-form.module#MaintenanceRequestFormPageModule', name: 'MaintenanceRequestFormPage', segment: 'maintenance-request-form', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/maintenance-request/maintenance-request.module#MaintenanceRequestPageModule', name: 'MaintenanceRequestPage', segment: 'maintenance-request', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/offline/offline.module#OfflinePageModule', name: 'OfflinePage', segment: 'offline', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/parakh-dashboard/parakh-dashboard.module#ParakhDashboardPageModule', name: 'ParakhDashboardPage', segment: 'parakh-dashboard', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/policies-show/policies-show.module#PoliciesShowPageModule', name: 'PoliciesShowPage', segment: 'policies-show', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/policies/policies.module#PoliciesPageModule', name: 'PoliciesPage', segment: 'policies', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/profile/profile.module#ProfilePageModule', name: 'ProfilePage', segment: 'profile', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/service-request-form/service-request-form.module#ServiceRequestFormPageModule', name: 'ServiceRequestFormPage', segment: 'service-request-form', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/service-request-show/service-request-show.module#ServiceRequestShowPageModule', name: 'ServiceRequestShowPage', segment: 'service-request-show', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/service-request/service-request.module#ServiceRequestPageModule', name: 'ServiceRequestPage', segment: 'service-request', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/stationery-request-form/stationery-request-form.module#StationeryRequestFormPageModule', name: 'StationeryRequestFormPage', segment: 'stationery-request-form', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/stationery-request/stationery-request.module#StationeryRequestPageModule', name: 'StationeryRequestPage', segment: 'stationery-request', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/suervy/suervy.module#SuervyPageModule', name: 'SuervyPage', segment: 'suervy', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/survey-list/survey-list.module#SurveyListPageModule', name: 'SurveyListPage', segment: 'survey-list', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/userblock/userblock.module#UserblockPageModule', name: 'UserblockPage', segment: 'userblock', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/tutorial/tutorial.module#TutorialPageModule', name: 'TutorialPage', segment: 'tutorial', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/visiting-card-form/visiting-card-form.module#VisitingCardFormPageModule', name: 'VisitingCardFormPage', segment: 'visiting-card-form', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/visiting-card/visiting-card.module#VisitingCardPageModule', name: 'VisitingCardPage', segment: 'visiting-card', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_44__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_45__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_45__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: (createTranslateLoader),
                        deps: [__WEBPACK_IMPORTED_MODULE_44__angular_common_http__["a" /* HttpClient */]]
                    }
                }),
                __WEBPACK_IMPORTED_MODULE_67__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_31__pages_offline_offline_module__["OfflinePageModule"],
                __WEBPACK_IMPORTED_MODULE_8__pages_home_home_module__["HomePageModule"],
                __WEBPACK_IMPORTED_MODULE_29__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_84_ionic2_calendar_en__["a" /* CalendarModule */],
                __WEBPACK_IMPORTED_MODULE_30__pages_article_index_article_index_module__["ArticleIndexPageModule"],
                __WEBPACK_IMPORTED_MODULE_28__pages_article_show_article_show_module__["ArticleShowPageModule"],
                __WEBPACK_IMPORTED_MODULE_27__pages_calendar_view_calendar_view_module__["CalendarViewPageModule"],
                __WEBPACK_IMPORTED_MODULE_26__pages_grievance_grievance_module__["GrievancePageModule"],
                __WEBPACK_IMPORTED_MODULE_25__pages_grievance_form_grievance_form_module__["GrievanceFormPageModule"],
                __WEBPACK_IMPORTED_MODULE_24__pages_grievance_show_grievance_show_module__["GrievanceShowPageModule"],
                __WEBPACK_IMPORTED_MODULE_4__pages_grievance_filter_grievance_filter_module__["GrievanceFilterPageModule"],
                __WEBPACK_IMPORTED_MODULE_23__pages_idea_idea_module__["IdeaPageModule"],
                __WEBPACK_IMPORTED_MODULE_22__pages_idea_form_idea_form_module__["IdeaFormPageModule"],
                __WEBPACK_IMPORTED_MODULE_82__pages_idea_show_idea_show_module__["IdeaShowPageModule"],
                __WEBPACK_IMPORTED_MODULE_5__pages_idea_filter_idea_filter_module__["IdeaFilterPageModule"],
                __WEBPACK_IMPORTED_MODULE_21__pages_leave_detail_leave_detail_module__["LeaveDetailPageModule"],
                __WEBPACK_IMPORTED_MODULE_20__pages_leave_details_leave_details_module__["LeaveDetailsPageModule"],
                __WEBPACK_IMPORTED_MODULE_19__pages_leave_filter_leave_filter_module__["LeaveFilterPageModule"],
                __WEBPACK_IMPORTED_MODULE_18__pages_leave_new_leave_new_module__["LeaveNewPageModule"],
                __WEBPACK_IMPORTED_MODULE_17__pages_leaves_show_leaves_show_module__["LeavesShowPageModule"],
                __WEBPACK_IMPORTED_MODULE_16__pages_login_login_module__["LoginPageModule"],
                __WEBPACK_IMPORTED_MODULE_15__pages_logout_logout_module__["LogoutPageModule"],
                __WEBPACK_IMPORTED_MODULE_31__pages_offline_offline_module__["OfflinePageModule"],
                __WEBPACK_IMPORTED_MODULE_14__pages_policies_policies_module__["PoliciesPageModule"],
                __WEBPACK_IMPORTED_MODULE_13__pages_policies_show_policies_show_module__["PoliciesShowPageModule"],
                __WEBPACK_IMPORTED_MODULE_12__pages_service_request_service_request_module__["ServiceRequestPageModule"],
                __WEBPACK_IMPORTED_MODULE_11__pages_service_request_form_service_request_form_module__["ServiceRequestFormPageModule"],
                __WEBPACK_IMPORTED_MODULE_10__pages_service_request_show_service_request_show_module__["ServiceRequestShowPageModule"],
                __WEBPACK_IMPORTED_MODULE_9__pages_tutorial_tutorial_module__["TutorialPageModule"],
                __WEBPACK_IMPORTED_MODULE_7__pages_leave_confirm_leave_confirm_module__["LeaveConfirmPageModule"],
                __WEBPACK_IMPORTED_MODULE_6__pages_survey_list_survey_list_module__["SurveyListPageModule"],
                __WEBPACK_IMPORTED_MODULE_85__pages_comments_comments_module__["CommentsPageModule"],
                __WEBPACK_IMPORTED_MODULE_90__pages_directory_directory_module__["DirectoryPageModule"],
                __WEBPACK_IMPORTED_MODULE_91__pages_userblock_userblock_module__["UserblockPageModule"],
                // Guest Lunch Request
                __WEBPACK_IMPORTED_MODULE_94__pages_guest_lunch_guest_lunch_module__["GuestLunchPageModule"],
                __WEBPACK_IMPORTED_MODULE_97__pages_guest_lunch_form_guest_lunch_form_module__["GuestLunchFormPageModule"],
                __WEBPACK_IMPORTED_MODULE_122__pages_canteen_facility_canteen_facility_module__["CanteenFacilityPageModule"],
                // Visiting Card Request
                __WEBPACK_IMPORTED_MODULE_98__pages_visiting_card_visiting_card_module__["VisitingCardPageModule"],
                __WEBPACK_IMPORTED_MODULE_99__pages_visiting_card_form_visiting_card_form_module__["VisitingCardFormPageModule"],
                // Stationery Request
                __WEBPACK_IMPORTED_MODULE_102__pages_stationery_request_stationery_request_module__["StationeryRequestPageModule"],
                __WEBPACK_IMPORTED_MODULE_103__pages_stationery_request_form_stationery_request_form_module__["StationeryRequestFormPageModule"],
                // Maintenance Request
                __WEBPACK_IMPORTED_MODULE_104__pages_maintenance_request_maintenance_request_module__["MaintenanceRequestPageModule"],
                __WEBPACK_IMPORTED_MODULE_105__pages_maintenance_request_form_maintenance_request_form_module__["MaintenanceRequestFormPageModule"],
                // Access Card Request
                __WEBPACK_IMPORTED_MODULE_106__pages_access_card_request_access_card_request_module__["AccessCardRequestPageModule"],
                __WEBPACK_IMPORTED_MODULE_107__pages_access_card_request_form_access_card_request_form_module__["AccessCardRequestFormPageModule"],
                // Guest Room Request
                __WEBPACK_IMPORTED_MODULE_114__pages_guest_room_request_guest_room_request_module__["GuestRoomRequestPageModule"],
                __WEBPACK_IMPORTED_MODULE_115__pages_guest_room_request_form_guest_room_request_form_module__["GuestRoomRequestFormPageModule"],
                __WEBPACK_IMPORTED_MODULE_116__pages_guest_room_request_show_guest_room_request_show_module__["GuestRoomRequestShowPageModule"],
                __WEBPACK_IMPORTED_MODULE_86_ionic_tags_input__["a" /* IonTagsInputModule */],
                __WEBPACK_IMPORTED_MODULE_87_ngx_chips__["a" /* TagInputModule */],
                __WEBPACK_IMPORTED_MODULE_88__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_89__angular_forms__["d" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_89__angular_forms__["g" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_92__pages_profile_profile_module__["ProfilePageModule"],
                __WEBPACK_IMPORTED_MODULE_1__directives_directives_module__["a" /* DirectivesModule */],
                __WEBPACK_IMPORTED_MODULE_121__pages_intro_intro_module__["IntroPageModule"],
                __WEBPACK_IMPORTED_MODULE_125__pages_parakh_dashboard_parakh_dashboard_module__["ParakhDashboardPageModule"],
                __WEBPACK_IMPORTED_MODULE_127__pages_suervy_suervy_module__["SuervyPageModule"]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_38_ionic_angular__["g" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_39__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_40__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_43__pages_service_request_service_request__["a" /* ServiceRequestPage */],
                __WEBPACK_IMPORTED_MODULE_48__pages_calendar_view_calendar_view__["a" /* CalendarViewPage */],
                __WEBPACK_IMPORTED_MODULE_50__pages_service_request_form_service_request_form__["a" /* ServiceRequestFormPage */],
                __WEBPACK_IMPORTED_MODULE_53__pages_idea_form_idea_form__["a" /* IdeaFormPage */],
                __WEBPACK_IMPORTED_MODULE_52__pages_idea_idea__["a" /* IdeaPage */],
                __WEBPACK_IMPORTED_MODULE_54__pages_grievance_grievance__["a" /* GrievancePage */],
                __WEBPACK_IMPORTED_MODULE_55__pages_grievance_form_grievance_form__["a" /* GrievanceFormPage */],
                __WEBPACK_IMPORTED_MODULE_50__pages_service_request_form_service_request_form__["a" /* ServiceRequestFormPage */],
                __WEBPACK_IMPORTED_MODULE_56__pages_service_request_show_service_request_show__["a" /* ServiceRequestShowPage */],
                __WEBPACK_IMPORTED_MODULE_48__pages_calendar_view_calendar_view__["a" /* CalendarViewPage */],
                __WEBPACK_IMPORTED_MODULE_57__pages_leave_details_leave_details__["a" /* LeaveDetailsPage */],
                __WEBPACK_IMPORTED_MODULE_72__pages_tutorial_tutorial__["a" /* TutorialPage */],
                __WEBPACK_IMPORTED_MODULE_57__pages_leave_details_leave_details__["a" /* LeaveDetailsPage */],
                __WEBPACK_IMPORTED_MODULE_64__pages_idea_show_idea_show__["a" /* IdeaShowPage */],
                __WEBPACK_IMPORTED_MODULE_65__pages_grievance_show_grievance_show__["a" /* GrievanceShowPage */],
                __WEBPACK_IMPORTED_MODULE_75__pages_policies_policies__["a" /* PoliciesPage */],
                __WEBPACK_IMPORTED_MODULE_81__pages_policies_show_policies_show__["a" /* PoliciesShowPage */],
                __WEBPACK_IMPORTED_MODULE_41__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_35__pages_logout_logout__["a" /* LogoutPage */],
                __WEBPACK_IMPORTED_MODULE_34__pages_leaves_show_leaves_show__["a" /* LeavesShowPage */],
                __WEBPACK_IMPORTED_MODULE_32__pages_leave_detail_leave_detail__["a" /* LeaveDetailPage */],
                __WEBPACK_IMPORTED_MODULE_33__pages_leave_filter_leave_filter__["a" /* LeaveFilterPage */],
                __WEBPACK_IMPORTED_MODULE_70__pages_leave_new_leave_new__["a" /* LeaveNewPage */],
                __WEBPACK_IMPORTED_MODULE_65__pages_grievance_show_grievance_show__["a" /* GrievanceShowPage */],
                __WEBPACK_IMPORTED_MODULE_73__pages_article_index_article_index__["a" /* ArticleIndexPage */],
                __WEBPACK_IMPORTED_MODULE_74__pages_article_show_article_show__["a" /* ArticleShowPage */],
                __WEBPACK_IMPORTED_MODULE_83__pages_survey_list_survey_list__["a" /* SurveyListPage */],
                __WEBPACK_IMPORTED_MODULE_3__pages_directory_directory__["a" /* DirectoryPage */],
                __WEBPACK_IMPORTED_MODULE_2__pages_userblock_userblock__["a" /* UserblockPage */],
                __WEBPACK_IMPORTED_MODULE_93__pages_profile_profile__["a" /* ProfilePage */],
                __WEBPACK_IMPORTED_MODULE_120__pages_intro_intro__["a" /* IntroPage */],
                // Guest Lunch Request
                __WEBPACK_IMPORTED_MODULE_95__pages_guest_lunch_guest_lunch__["a" /* GuestLunchPage */],
                __WEBPACK_IMPORTED_MODULE_96__pages_guest_lunch_form_guest_lunch_form__["a" /* GuestLunchFormPage */],
                // Visiting Card Request
                __WEBPACK_IMPORTED_MODULE_100__pages_visiting_card_visiting_card__["a" /* VisitingCardPage */],
                __WEBPACK_IMPORTED_MODULE_101__pages_visiting_card_form_visiting_card_form__["a" /* VisitingCardFormPage */],
                // Stationery Request
                __WEBPACK_IMPORTED_MODULE_108__pages_stationery_request_stationery_request__["a" /* StationeryRequestPage */],
                __WEBPACK_IMPORTED_MODULE_109__pages_stationery_request_form_stationery_request_form__["a" /* StationeryRequestFormPage */],
                // Maintenance Request
                __WEBPACK_IMPORTED_MODULE_110__pages_maintenance_request_maintenance_request__["a" /* MaintenanceRequestPage */],
                __WEBPACK_IMPORTED_MODULE_111__pages_maintenance_request_form_maintenance_request_form__["a" /* MaintenanceRequestFormPage */],
                // Access Card Request
                __WEBPACK_IMPORTED_MODULE_112__pages_access_card_request_access_card_request__["a" /* AccessCardRequestPage */],
                __WEBPACK_IMPORTED_MODULE_113__pages_access_card_request_form_access_card_request_form__["a" /* AccessCardRequestFormPage */],
                // Guest Room Request
                __WEBPACK_IMPORTED_MODULE_117__pages_guest_room_request_guest_room_request__["a" /* GuestRoomRequestPage */],
                __WEBPACK_IMPORTED_MODULE_118__pages_guest_room_request_form_guest_room_request_form__["a" /* GuestRoomRequestFormPage */],
                __WEBPACK_IMPORTED_MODULE_119__pages_guest_room_request_show_guest_room_request_show__["a" /* GuestRoomRequestShowPage */],
                __WEBPACK_IMPORTED_MODULE_123__pages_canteen_facility_canteen_facility__["a" /* CanteenFacilityPage */],
                __WEBPACK_IMPORTED_MODULE_124__pages_parakh_dashboard_parakh_dashboard__["a" /* ParakhDashboardPage */],
                __WEBPACK_IMPORTED_MODULE_126__pages_suervy_suervy__["a" /* SuervyPage */]
            ],
            providers: [
                // StatusBar,
                __WEBPACK_IMPORTED_MODULE_42__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_37__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_38_ionic_angular__["h" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_49__providers_data_getter_service_data_getter_service__["a" /* DataGetterServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_51__providers_data_setter_data_setter__["a" /* DataSetterProvider */],
                __WEBPACK_IMPORTED_MODULE_58__ionic_native_file_transfer__["b" /* FileTransferObject */],
                __WEBPACK_IMPORTED_MODULE_59__ionic_native_file__["a" /* File */],
                __WEBPACK_IMPORTED_MODULE_58__ionic_native_file_transfer__["a" /* FileTransfer */],
                __WEBPACK_IMPORTED_MODULE_62__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_63__ionic_native_file_path__["a" /* FilePath */],
                __WEBPACK_IMPORTED_MODULE_47__ionic_native_in_app_browser__["a" /* InAppBrowser */],
                __WEBPACK_IMPORTED_MODULE_76__ionic_native_vibration__["a" /* Vibration */],
                __WEBPACK_IMPORTED_MODULE_66__providers_user_data_ts__["a" /* UserData */],
                __WEBPACK_IMPORTED_MODULE_68__providers_login_service_login_service__["a" /* LoginServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_69__providers_leave_data_leave_data__["a" /* LeaveDataProvider */],
                __WEBPACK_IMPORTED_MODULE_71__providers_app_global_app_global__["a" /* AppGlobalProvider */],
                __WEBPACK_IMPORTED_MODULE_77__ionic_native_fcm__["a" /* FCM */],
                __WEBPACK_IMPORTED_MODULE_79__ionic_native_app_version__["a" /* AppVersion */],
                __WEBPACK_IMPORTED_MODULE_80__ionic_native_network__["a" /* Network */],
                __WEBPACK_IMPORTED_MODULE_78__ionic_native_local_notifications__["a" /* LocalNotifications */],
                __WEBPACK_IMPORTED_MODULE_60__ionic_native_image_picker__["a" /* ImagePicker */],
                __WEBPACK_IMPORTED_MODULE_61__ionic_native_crop__["a" /* Crop */],
                __WEBPACK_IMPORTED_MODULE_62__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_128__providers_database_database__["a" /* DatabaseProvider */],
                __WEBPACK_IMPORTED_MODULE_0__ionic_native_sqlite__["a" /* SQLite */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 510:
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

/***/ 534:
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

/***/ 535:
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

/***/ 536:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SortPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__(1);
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

/***/ 537:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 256,
	"./af.js": 256,
	"./ar": 257,
	"./ar-dz": 258,
	"./ar-dz.js": 258,
	"./ar-kw": 259,
	"./ar-kw.js": 259,
	"./ar-ly": 260,
	"./ar-ly.js": 260,
	"./ar-ma": 261,
	"./ar-ma.js": 261,
	"./ar-sa": 262,
	"./ar-sa.js": 262,
	"./ar-tn": 263,
	"./ar-tn.js": 263,
	"./ar.js": 257,
	"./az": 264,
	"./az.js": 264,
	"./be": 265,
	"./be.js": 265,
	"./bg": 266,
	"./bg.js": 266,
	"./bm": 267,
	"./bm.js": 267,
	"./bn": 268,
	"./bn.js": 268,
	"./bo": 269,
	"./bo.js": 269,
	"./br": 270,
	"./br.js": 270,
	"./bs": 271,
	"./bs.js": 271,
	"./ca": 272,
	"./ca.js": 272,
	"./cs": 273,
	"./cs.js": 273,
	"./cv": 274,
	"./cv.js": 274,
	"./cy": 275,
	"./cy.js": 275,
	"./da": 276,
	"./da.js": 276,
	"./de": 277,
	"./de-at": 278,
	"./de-at.js": 278,
	"./de-ch": 279,
	"./de-ch.js": 279,
	"./de.js": 277,
	"./dv": 280,
	"./dv.js": 280,
	"./el": 281,
	"./el.js": 281,
	"./en-au": 282,
	"./en-au.js": 282,
	"./en-ca": 283,
	"./en-ca.js": 283,
	"./en-gb": 284,
	"./en-gb.js": 284,
	"./en-ie": 285,
	"./en-ie.js": 285,
	"./en-nz": 286,
	"./en-nz.js": 286,
	"./eo": 287,
	"./eo.js": 287,
	"./es": 288,
	"./es-do": 289,
	"./es-do.js": 289,
	"./es-us": 290,
	"./es-us.js": 290,
	"./es.js": 288,
	"./et": 291,
	"./et.js": 291,
	"./eu": 292,
	"./eu.js": 292,
	"./fa": 293,
	"./fa.js": 293,
	"./fi": 294,
	"./fi.js": 294,
	"./fo": 295,
	"./fo.js": 295,
	"./fr": 296,
	"./fr-ca": 297,
	"./fr-ca.js": 297,
	"./fr-ch": 298,
	"./fr-ch.js": 298,
	"./fr.js": 296,
	"./fy": 299,
	"./fy.js": 299,
	"./gd": 300,
	"./gd.js": 300,
	"./gl": 301,
	"./gl.js": 301,
	"./gom-latn": 302,
	"./gom-latn.js": 302,
	"./gu": 303,
	"./gu.js": 303,
	"./he": 304,
	"./he.js": 304,
	"./hi": 305,
	"./hi.js": 305,
	"./hr": 306,
	"./hr.js": 306,
	"./hu": 307,
	"./hu.js": 307,
	"./hy-am": 308,
	"./hy-am.js": 308,
	"./id": 309,
	"./id.js": 309,
	"./is": 310,
	"./is.js": 310,
	"./it": 311,
	"./it.js": 311,
	"./ja": 312,
	"./ja.js": 312,
	"./jv": 313,
	"./jv.js": 313,
	"./ka": 314,
	"./ka.js": 314,
	"./kk": 315,
	"./kk.js": 315,
	"./km": 316,
	"./km.js": 316,
	"./kn": 317,
	"./kn.js": 317,
	"./ko": 318,
	"./ko.js": 318,
	"./ky": 319,
	"./ky.js": 319,
	"./lb": 320,
	"./lb.js": 320,
	"./lo": 321,
	"./lo.js": 321,
	"./lt": 322,
	"./lt.js": 322,
	"./lv": 323,
	"./lv.js": 323,
	"./me": 324,
	"./me.js": 324,
	"./mi": 325,
	"./mi.js": 325,
	"./mk": 326,
	"./mk.js": 326,
	"./ml": 327,
	"./ml.js": 327,
	"./mr": 328,
	"./mr.js": 328,
	"./ms": 329,
	"./ms-my": 330,
	"./ms-my.js": 330,
	"./ms.js": 329,
	"./mt": 331,
	"./mt.js": 331,
	"./my": 332,
	"./my.js": 332,
	"./nb": 333,
	"./nb.js": 333,
	"./ne": 334,
	"./ne.js": 334,
	"./nl": 335,
	"./nl-be": 336,
	"./nl-be.js": 336,
	"./nl.js": 335,
	"./nn": 337,
	"./nn.js": 337,
	"./pa-in": 338,
	"./pa-in.js": 338,
	"./pl": 339,
	"./pl.js": 339,
	"./pt": 340,
	"./pt-br": 341,
	"./pt-br.js": 341,
	"./pt.js": 340,
	"./ro": 342,
	"./ro.js": 342,
	"./ru": 343,
	"./ru.js": 343,
	"./sd": 344,
	"./sd.js": 344,
	"./se": 345,
	"./se.js": 345,
	"./si": 346,
	"./si.js": 346,
	"./sk": 347,
	"./sk.js": 347,
	"./sl": 348,
	"./sl.js": 348,
	"./sq": 349,
	"./sq.js": 349,
	"./sr": 350,
	"./sr-cyrl": 351,
	"./sr-cyrl.js": 351,
	"./sr.js": 350,
	"./ss": 352,
	"./ss.js": 352,
	"./sv": 353,
	"./sv.js": 353,
	"./sw": 354,
	"./sw.js": 354,
	"./ta": 355,
	"./ta.js": 355,
	"./te": 356,
	"./te.js": 356,
	"./tet": 357,
	"./tet.js": 357,
	"./th": 358,
	"./th.js": 358,
	"./tl-ph": 359,
	"./tl-ph.js": 359,
	"./tlh": 360,
	"./tlh.js": 360,
	"./tr": 361,
	"./tr.js": 361,
	"./tzl": 362,
	"./tzl.js": 362,
	"./tzm": 363,
	"./tzm-latn": 364,
	"./tzm-latn.js": 364,
	"./tzm.js": 363,
	"./uk": 365,
	"./uk.js": 365,
	"./ur": 366,
	"./ur.js": 366,
	"./uz": 367,
	"./uz-latn": 368,
	"./uz-latn.js": 368,
	"./uz.js": 367,
	"./vi": 369,
	"./vi.js": 369,
	"./x-pseudo": 370,
	"./x-pseudo.js": 370,
	"./yo": 371,
	"./yo.js": 371,
	"./zh-cn": 372,
	"./zh-cn.js": 372,
	"./zh-hk": 373,
	"./zh-hk.js": 373,
	"./zh-tw": 374,
	"./zh-tw.js": 374
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
webpackContext.id = 537;

/***/ }),

/***/ 538:
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

/***/ 539:
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
            selector: 'timeline',template:/*ion-inline-start:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/components/timeline/timeline.html"*/'<div class="timeline">\n  <ng-content></ng-content>\n\n  <timeline-item>\n    <ion-icon class="" [name]="endIcon"></ion-icon>\n  </timeline-item>\n\n</div>\n'/*ion-inline-end:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/components/timeline/timeline.html"*/
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

/***/ 540:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommentComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_data_setter_data_setter__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment__ = __webpack_require__(1);
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
            selector: 'comment',template:/*ion-inline-start:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/components/comment/comment.html"*/'<!-- Generated template for the CommentComponent component -->\n<div>\n  <div class="message-wrap" *ngIf="rootItem" >\n\n    <div *ngFor="let comment of rootItem.comments" class="message" [class.left]="comment.comment_by !== user.id" [class.right]="comment.comment_by === user.id">\n      <img class="user-img" [src]="comment.profile_pic ? comment.profile_pic : \'https://intranetstaging.herokuapp.com/assets/user_pic_missing.png\'"\n        alt="" src="">\n      <ion-spinner name="dots" *ngIf="comment.status === \'pending\'"></ion-spinner>\n      <label *ngIf="comment.status === \'failed\'" class=\'status liked\'>Failed</label>\n      <div class="msg-detail">\n        <!-- <div class="msg-info">\n          <p>{{comment.user}}</p>\n        </div> -->\n        <div class="msg-content">\n          <span class="triangle"></span>\n          <div [class]="comment.comment_by === user.id ? \'msg-info-right\':\'msg-info-left\'">\n            <p>{{comment.user}}</p>\n          </div>\n          <p class="line-breaker " [innerHTML]=\'comment.content\'></p>\n          <div [class]="comment.comment_by === user.id ? \'msg-info-right-time\':\'msg-info-left-time\'">\n            <p>{{comment.comment_time}}</p>\n          </div>\n        </div>\n\n      </div>\n    </div>\n    <div class="input-wrap" keyboard-attach [style.height]="\'55px\'">\n      <!-- <button ion-button clear icon-only item-right (click)="switchEmojiPicker()">\n            <ion-icon name="md-happy"></ion-icon>\n          </button> -->\n    \n      <ion-textarea name="comment_input" #comment_input placeholder="Type your comment" [(ngModel)]="editorComment" (focusin)="onFocus()"></ion-textarea>\n    \n      <button ion-button clear icon-only item-right (click)="sendComment()">\n        <ion-icon name="ios-send" ios="ios-send" md="md-send"></ion-icon>\n      </button>\n    </div>\n  </div>\n\n</div>'/*ion-inline-end:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/components/comment/comment.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* Events */],
            __WEBPACK_IMPORTED_MODULE_0__providers_data_setter_data_setter__["a" /* DataSetterProvider */]])
    ], CommentComponent);
    return CommentComponent;
}());

//# sourceMappingURL=comment.js.map

/***/ }),

/***/ 6:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppGlobalProvider; });
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

var AppGlobalProvider = /** @class */ (function () {
    function AppGlobalProvider() {
        this.isOnline = false;
        // DEVELOPMENT PROXY URLS
        // private intranetBaseURL = '';
        // private systemXBaseURL = '';
        // LOCAL URLS
        this.server = 'Local';
        // private intranetBaseURL = 'http://165.227.139.76:8080/api/v1';
        this.intranetBaseURL = 'http://172.16.17.146:8000/api/v1';
        // private intranetBaseURL = 'http://172.16.17./api/v1';
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
        this.allSurveysURL = this.intranetBaseURL + '/surveys';
        this.surveyURL = this.surveyBaseURL;
        this.loginURL = this.intranetBaseURL + '/auth/login';
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
        this.allGrievancesURL = this.intranetBaseURL + '/kyc';
        this.createGrievancesURL = this.intranetBaseURL + '/kyc';
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
        this.getAllMaintenanceRequests = this.intranetBaseURL + '/beneficiaries';
        this.createMaintenanceRequest = this.intranetBaseURL + '/beneficiaries';
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
        this.questionsList = [{
                question: "What is your first name",
                key: "q1"
            },
            {
                question: "What is your middle name",
                key: "q2"
            },
            {
                question: "What is your last name",
                key: "q3"
            }
        ];
        console.log('Hello AppGlobalProvider Provider');
    }
    AppGlobalProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], AppGlobalProvider);
    return AppGlobalProvider;
}());

//# sourceMappingURL=app-global.js.map

/***/ }),

/***/ 666:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_userblock_userblock__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_directory_directory__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular_components_alert_alert_controller__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_survey_list_survey_list__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_article_show_article_show__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_grievance_show_grievance_show__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_idea_show_idea_show__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_service_request_show_service_request_show__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_local_notifications__ = __webpack_require__(488);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_offline_offline__ = __webpack_require__(433);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_network__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_app_version__ = __webpack_require__(489);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_vibration__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_article_index_article_index__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_data_setter_data_setter__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_leaves_show_leaves_show__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_logout_logout__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_splash_screen__ = __webpack_require__(490);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_home_home__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_service_request_service_request__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ngx_translate_core__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_calendar_view_calendar_view__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_grievance_grievance__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_policies_policies__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_login_login__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__providers_user_data_ts__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__ionic_native_fcm__ = __webpack_require__(491);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__providers_app_global_app_global__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__providers_data_getter_service_data_getter_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31_lodash__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_31_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__pages_profile_profile__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__pages_guest_lunch_guest_lunch__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__pages_visiting_card_visiting_card__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__pages_stationery_request_stationery_request__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__pages_maintenance_request_maintenance_request__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__pages_access_card_request_access_card_request__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__pages_guest_room_request_guest_room_request__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__pages_canteen_facility_canteen_facility__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__pages_guest_room_request_show_guest_room_request_show__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__pages_parakh_dashboard_parakh_dashboard__ = __webpack_require__(170);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










































var MyApp = /** @class */ (function () {
    //Counts Variables
    // ServiceRequest:number;
    // Idea:number;
    // Grievance:number;
    // Articles:number;
    // pages: Array<{title: string, component: any}>;
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
            { title: 'Dashboard', name: 'HomePage', component: __WEBPACK_IMPORTED_MODULE_20__pages_home_home__["a" /* HomePage */], icon: 'home' }
        ];
        this.myVoicePages = [
            { title: 'Beneficiary', name: "IdeaPage", component: __WEBPACK_IMPORTED_MODULE_36__pages_maintenance_request_maintenance_request__["a" /* MaintenanceRequestPage */], icon: 'bulb', countName: 'Idea' },
            { title: 'Surveys', name: "SurveyListPage", component: __WEBPACK_IMPORTED_MODULE_3__pages_survey_list_survey_list__["a" /* SurveyListPage */], icon: 'paper' },
            { title: 'Kyc', name: "GrievancePage", component: __WEBPACK_IMPORTED_MODULE_24__pages_grievance_grievance__["a" /* GrievancePage */], icon: 'chatbubbles', countName: 'Grievance' }
        ];
        this.itPages = [
            {
                title: 'Tech Support',
                name: 'ServiceRequestPage',
                component: __WEBPACK_IMPORTED_MODULE_21__pages_service_request_service_request__["a" /* ServiceRequestPage */],
                icon: 'construct',
                countName: 'ServiceRequest'
            }
        ];
        this.hrPages = [
            { title: 'Attendance', name: "CalendarViewPage", component: __WEBPACK_IMPORTED_MODULE_23__pages_calendar_view_calendar_view__["a" /* CalendarViewPage */], icon: 'calendar' },
            { title: 'Leaves', name: 'LeavesShowPage', component: __WEBPACK_IMPORTED_MODULE_15__pages_leaves_show_leaves_show__["a" /* LeavesShowPage */], icon: 'paper-plane' },
            { title: 'Parakh Dashboard', name: 'ParakhDashboardPage', component: __WEBPACK_IMPORTED_MODULE_41__pages_parakh_dashboard_parakh_dashboard__["a" /* ParakhDashboardPage */], icon: 'trophy' }
        ];
        this.companyPages = [
            { title: 'Articles', name: "ArticleIndexPage", component: __WEBPACK_IMPORTED_MODULE_13__pages_article_index_article_index__["a" /* ArticleIndexPage */], icon: 'easel', countName: 'Articles' },
            { title: 'Policies', name: "PoliciesPage", component: __WEBPACK_IMPORTED_MODULE_25__pages_policies_policies__["a" /* PoliciesPage */], icon: 'document' },
            { title: 'Directory', name: "DirectoryPage", component: __WEBPACK_IMPORTED_MODULE_1__pages_directory_directory__["a" /* DirectoryPage */], icon: 'book' }
        ];
        this.servicesPages = [
            { title: 'Visiting Card Requests', name: "VisitingCardPage", component: __WEBPACK_IMPORTED_MODULE_34__pages_visiting_card_visiting_card__["a" /* VisitingCardPage */], icon: 'person' },
            { title: 'Guest Lunch Requests', name: "GuestLunchPage", component: __WEBPACK_IMPORTED_MODULE_33__pages_guest_lunch_guest_lunch__["a" /* GuestLunchPage */], icon: 'pizza' },
            {
                title: 'Facility Requests',
                name: "MaintenanceRequestPage",
                component: __WEBPACK_IMPORTED_MODULE_36__pages_maintenance_request_maintenance_request__["a" /* MaintenanceRequestPage */],
                icon: 'build'
            },
            { title: 'ID / Access Card Requests', name: "AccessCardRequestPage", component: __WEBPACK_IMPORTED_MODULE_37__pages_access_card_request_access_card_request__["a" /* AccessCardRequestPage */], icon: 'card' },
            { title: 'Stationery Requests', name: "StationeryRequestPage", component: __WEBPACK_IMPORTED_MODULE_35__pages_stationery_request_stationery_request__["a" /* StationeryRequestPage */], icon: 'clipboard' },
            { title: 'Guest House Requests', name: "GuestRoomRequestPage", component: __WEBPACK_IMPORTED_MODULE_38__pages_guest_room_request_guest_room_request__["a" /* GuestRoomRequestPage */], icon: 'home' },
            { title: 'Canteen Facility', name: "CanteenFacilityPage", component: __WEBPACK_IMPORTED_MODULE_39__pages_canteen_facility_canteen_facility__["a" /* CanteenFacilityPage */], icon: 'pizza' }
        ];
        this.loggedOutPages = [
            { title: 'Logout', name: 'LogoutPage', component: __WEBPACK_IMPORTED_MODULE_16__pages_logout_logout__["a" /* LogoutPage */], icon: 'log-out', logsOut: true }
        ];
        this.pagesCounts = [];
        this.userData.getHasLoggedIn().then(function (hasLoggedIn) {
            if (hasLoggedIn) {
                console.log("HASLOGGEDIN TOKEN SEND");
                _this.dataSetter.sendNotificationToken();
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_20__pages_home_home__["a" /* HomePage */];
            }
            else {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_26__pages_login_login__["a" /* LoginPage */];
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
        this.nav.push(__WEBPACK_IMPORTED_MODULE_32__pages_profile_profile__["a" /* ProfilePage */]).catch(function (err) {
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
            case "Service Request":
                page = __WEBPACK_IMPORTED_MODULE_7__pages_service_request_show_service_request_show__["a" /* ServiceRequestShowPage */];
                reloadType = 'reload:serviceRequestShow';
                break;
            case "idea":
                page = __WEBPACK_IMPORTED_MODULE_6__pages_idea_show_idea_show__["a" /* IdeaShowPage */];
                reloadType = 'reload:ideaShow';
                break;
            case "grievance":
                page = __WEBPACK_IMPORTED_MODULE_5__pages_grievance_show_grievance_show__["a" /* GrievanceShowPage */];
                reloadType = 'reload:grievanceShow';
                break;
            case "cms":
                page = __WEBPACK_IMPORTED_MODULE_4__pages_article_show_article_show__["a" /* ArticleShowPage */];
                reloadType = 'reload:articleShow';
                break;
            case "guest_lunch_requests":
                page = __WEBPACK_IMPORTED_MODULE_33__pages_guest_lunch_guest_lunch__["a" /* GuestLunchPage */];
                reloadType = 'reload:guest-lunch';
                break;
            case "visiting_card_requests":
                page = __WEBPACK_IMPORTED_MODULE_34__pages_visiting_card_visiting_card__["a" /* VisitingCardPage */];
                reloadType = 'reload:visiting-card';
                break;
            case "maintenance_requests":
                page = __WEBPACK_IMPORTED_MODULE_36__pages_maintenance_request_maintenance_request__["a" /* MaintenanceRequestPage */];
                reloadType = 'reload:maintenance-request';
                break;
            case "room_requests":
                page = __WEBPACK_IMPORTED_MODULE_40__pages_guest_room_request_show_guest_room_request_show__["a" /* GuestRoomRequestShowPage */];
                reloadType = 'reload:guest-room-request';
                break;
            case "stationery_requests":
                page = __WEBPACK_IMPORTED_MODULE_35__pages_stationery_request_stationery_request__["a" /* StationeryRequestPage */];
                reloadType = 'reload:stationery-request';
                break;
            case "LunchList":
                page = __WEBPACK_IMPORTED_MODULE_39__pages_canteen_facility_canteen_facility__["a" /* CanteenFacilityPage */];
                reloadType = 'reload:canteen-facility';
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
            if (!(pageName instanceof __WEBPACK_IMPORTED_MODULE_26__pages_login_login__["a" /* LoginPage */]) && !(pageName instanceof __WEBPACK_IMPORTED_MODULE_9__pages_offline_offline__["a" /* OfflinePage */]) && !(pageName instanceof __WEBPACK_IMPORTED_MODULE_0__pages_userblock_userblock__["a" /* UserblockPage */])) {
                _this.updateMenuCounts();
                _this.updateUserProfile();
                _this.username = _this.userData.userData.name;
                _this.userprofile = _this.userData.userData.profile;
                if (_this.userData.userData.new_user) {
                    _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_0__pages_userblock_userblock__["a" /* UserblockPage */]);
                }
                // this.askForLunch();
            }
            //if (!this.appGlobal.isOnline ) {
            if (false) {
                if (pageName instanceof _this.rootPage) {
                    _this.nav.push(OfflinePage);
                }
            }
            if (pageName instanceof __WEBPACK_IMPORTED_MODULE_26__pages_login_login__["a" /* LoginPage */] || pageName instanceof __WEBPACK_IMPORTED_MODULE_9__pages_offline_offline__["a" /* OfflinePage */] || pageName instanceof __WEBPACK_IMPORTED_MODULE_0__pages_userblock_userblock__["a" /* UserblockPage */]) {
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
        var object = __WEBPACK_IMPORTED_MODULE_31_lodash__["find"](this.pagesCounts, { name: countName });
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
                    _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_0__pages_userblock_userblock__["a" /* UserblockPage */]);
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
                _this.nav.push(__WEBPACK_IMPORTED_MODULE_9__pages_offline_offline__["a" /* OfflinePage */]);
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
            _this.listenToNetworkEvents();
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
                else if (!(view.instance instanceof __WEBPACK_IMPORTED_MODULE_20__pages_home_home__["a" /* HomePage */]) && !(view.instance instanceof __WEBPACK_IMPORTED_MODULE_26__pages_login_login__["a" /* LoginPage */])) {
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
            _this.rootPage = __WEBPACK_IMPORTED_MODULE_20__pages_home_home__["a" /* HomePage */];
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
            _this.rootPage = __WEBPACK_IMPORTED_MODULE_26__pages_login_login__["a" /* LoginPage */];
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
        Object(__WEBPACK_IMPORTED_MODULE_17__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_18_ionic_angular__["e" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_18_ionic_angular__["e" /* Content */])
    ], MyApp.prototype, "content", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_17__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_18_ionic_angular__["o" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_18_ionic_angular__["o" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_17__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/app/app.html"*/'<!-- <ion-split-pane> -->\n\n<ion-menu id="loggedInMenu" [content]="content">\n\n  <!-- <ion-header>\n    <ion-toolbar>\n      <ion-title>EmPower</ion-title>\n      <ion-title>{{username}}</ion-title>\n    </ion-toolbar>\n  </ion-header> -->\n\n  <ion-content class="outer-content">\n    <ion-item menuClose (click)="openProfile()">\n      <ion-avatar item-start>\n        <img src="{{userprofile}}" style="width:5em; height:5em; border:3px solid gray;">\n      </ion-avatar>\n      <ion-title>{{username}}</ion-title>\n    </ion-item>\n\n    <ion-list>\n      <button ion-item menuClose *ngFor="let p of loggedInPages" (click)="openPage(p)">\n        <ion-icon item-start [name]="p.icon" [color]="isActive(p)"></ion-icon>\n        {{p.title}}\n        <ion-badge item-end color="light" *ngIf="p.countName && getCount(p.countName) > 0">{{getCount(p.countName)}}\n        </ion-badge>\n      </button>\n    </ion-list>\n\n    <ion-list>\n      <ion-list-header style="margin-bottom: 0;">\n        My Voice\n      </ion-list-header>\n      <button ion-item menuClose *ngFor="let p of myVoicePages" (click)="openPage(p)">\n        <ion-icon item-start [name]="p.icon" [color]="isActive(p)"></ion-icon>\n        {{p.title}}\n      </button>\n    </ion-list>\n\n    <ion-list>\n      <ion-list-header style="margin-bottom: 0;">\n        IT\n      </ion-list-header>\n      <button ion-item menuClose *ngFor="let p of itPages" (click)="openPage(p)">\n        <ion-icon item-start [name]="p.icon" [color]="isActive(p)"></ion-icon>\n        {{p.title}}\n      </button>\n    </ion-list>\n\n    <ion-list>\n      <ion-list-header style="margin-bottom: 0;">\n        HR\n      </ion-list-header>\n      <button ion-item menuClose *ngFor="let p of hrPages" (click)="openPage(p)">\n        <ion-icon item-start [name]="p.icon" [color]="isActive(p)"></ion-icon>\n        {{p.title}}\n      </button>\n    </ion-list>\n\n    <ion-list>\n      <ion-list-header style="margin-bottom: 0;">\n        Company\n      </ion-list-header>\n      <button ion-item menuClose *ngFor="let p of companyPages" (click)="openPage(p)">\n        <ion-icon item-start [name]="p.icon" [color]="isActive(p)"></ion-icon>\n        {{p.title}}\n      </button>\n    </ion-list>\n\n    <ion-list>\n      <ion-list-header style="margin-bottom: 0;">\n        Services\n      </ion-list-header>\n      <button ion-item menuClose *ngFor="let p of servicesPages" (click)="openPage(p)">\n        <ion-icon item-start [name]="p.icon" [color]="isActive(p)"></ion-icon>\n        {{p.title}}\n      </button>\n    </ion-list>\n\n    <ion-list>\n      <ion-list-header style="margin-bottom: 0;">\n        Account\n      </ion-list-header>\n      <button ion-item menuClose *ngFor="let p of loggedOutPages" (click)="openPage(p)">\n        <ion-icon item-start [name]="p.icon" [color]="isActive(p)"></ion-icon>\n        {{p.title}}\n      </button>\n    </ion-list>\n\n    <ion-list>\n      <ion-list-header style="margin-bottom: 0;">\n        About the App\n      </ion-list-header>\n      <ion-title left>\n        <h6 class="version">Version: {{applicationVersion}}</h6>\n        <h6 class="version">Server: {{appGlobal.server}}</h6>\n        <h6 class="version">Powered by: Deepak Cybit Pvt. Ltd.</h6>\n      </ion-title>\n    </ion-list>\n  </ion-content>\n\n  <!-- <ion-footer>\n    <ion-title left>\n      <h6 class="version">Version: {{applicationVersion}}</h6>\n      <h6 class="version">Powered By: Deepak Cybit Pvt. Ltd.</h6>\n    </ion-title>\n  </ion-footer> -->\n\n</ion-menu>\n\n<!-- </ion-split-pane> -->\n\n<!-- <ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu> -->\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false" main name="MyApp"></ion-nav>\n'/*ion-inline-end:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_22__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_18_ionic_angular__["c" /* App */],
            __WEBPACK_IMPORTED_MODULE_18_ionic_angular__["r" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_19__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_18_ionic_angular__["d" /* Config */],
            __WEBPACK_IMPORTED_MODULE_18_ionic_angular__["r" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_18_ionic_angular__["f" /* Events */],
            __WEBPACK_IMPORTED_MODULE_27__providers_user_data_ts__["a" /* UserData */],
            __WEBPACK_IMPORTED_MODULE_28__ionic_native_fcm__["a" /* FCM */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_local_notifications__["a" /* LocalNotifications */],
            __WEBPACK_IMPORTED_MODULE_29__providers_app_global_app_global__["a" /* AppGlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_30__providers_data_getter_service_data_getter_service__["a" /* DataGetterServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_14__providers_data_setter_data_setter__["a" /* DataSetterProvider */],
            __WEBPACK_IMPORTED_MODULE_12__ionic_native_vibration__["a" /* Vibration */],
            __WEBPACK_IMPORTED_MODULE_18_ionic_angular__["s" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_app_version__["a" /* AppVersion */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_network__["a" /* Network */],
            __WEBPACK_IMPORTED_MODULE_18_ionic_angular__["m" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular_components_alert_alert_controller__["a" /* AlertController */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 67:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArticleShowPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_user_data_ts__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_vibration__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_app_global_app_global__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular_components_toast_toast_controller__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__comments_comments__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_data_setter_data_setter__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_data_getter_service_data_getter_service__ = __webpack_require__(9);
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
            selector: 'page-article-show',template:/*ion-inline-start:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/article-show/article-show.html"*/'<!--\n  Generated template for the ArticleShowPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Article</ion-title>\n    <ion-buttons end *ngIf="article" >\n      <button ion-button icon-only clear (click)="like()">\n        <ion-icon [name]="article.liked_by_me ? \'heart\' : \'heart-outline\'" isActive="true" [class.liked]="article.liked_by_me"></ion-icon>\n        {{article.likes}}\n      </button>\n      <button ion-button icon-only clear (click)="comment()" *ngIf="article.can_comment">\n        <ion-icon name=\'chatbubbles\' isActive="true"></ion-icon>\n        {{article.comments.length}}\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-refresher (ionRefresh)="refreshPage($event)">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n  <div *ngIf="article">\n    <div *ngIf="article.showHeader">\n      <h1>{{article.title}}</h1>\n      <hr>\n    </div>\n    <ion-slides *ngIf="article.courasel_attachments.length > 0" [autoplay]="5000" [pager]="true" [loop]="true" style="height: auto;">\n      <ion-slide *ngFor="let slide of article.courasel_attachments">\n        <img [src]="slide.url">\n      </ion-slide>\n    </ion-slides>\n    <hr *ngIf="article.courasel_attachments.length > 0" >\n    <div [innerHtml]="article.content | safeHtml">\n      <!--{{idea.content}}-->\n    </div>\n    <div *ngIf="article.showFooter">\n      <hr>\n      <h5 *ngIf="article.date">Created on: {{article.date}}</h5>\n      <h5 *ngIf="article.creator">Created by: {{article.creator}}</h5>\n    </div>\n  </div>\n  <hr>\n  <!-- <comment [rootItem]="article" [user]="user"></comment> -->\n</ion-content>\n'/*ion-inline-end:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/article-show/article-show.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7_ionic_angular__["p" /* NavController */], __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["q" /* NavParams */], __WEBPACK_IMPORTED_MODULE_8__providers_data_getter_service_data_getter_service__["a" /* DataGetterServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_data_setter_data_setter__["a" /* DataSetterProvider */], __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["f" /* Events */],
            __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["n" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["l" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular_components_toast_toast_controller__["a" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_app_global_app_global__["a" /* AppGlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_1__ionic_native_vibration__["a" /* Vibration */],
            __WEBPACK_IMPORTED_MODULE_0__providers_user_data_ts__["a" /* UserData */]])
    ], ArticleShowPage);
    return ArticleShowPage;
}());

//# sourceMappingURL=article-show.js.map

/***/ }),

/***/ 71:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GuestRoomRequestShowPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_data_setter_data_setter__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_data_getter_service_data_getter_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_vibration__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_app_global_app_global__ = __webpack_require__(6);
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
 * Generated class for the GuestRoomRequestShowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var GuestRoomRequestShowPage = /** @class */ (function () {
    function GuestRoomRequestShowPage(navCtrl, navParams, dataGetterService, loadingCtrl, events, dataSetter, appGlobal, alertCtrl, toastCtrl, modalCtrl, vibration) {
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
        this.guestRoomRequest = {};
        this.id = '';
        this.room_flags = [];
        this.id = navParams.get('id');
        this.events.subscribe('reload:guest-room-request', function (isNotification, id) {
            _this.id = id;
            _this.refreshPage(null);
        });
    }
    GuestRoomRequestShowPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad GuestRoomRequestShowPage');
    };
    GuestRoomRequestShowPage.prototype.ionViewDidEnter = function () {
        this.loadGuestRoomRequestDetails(null, this.id);
    };
    GuestRoomRequestShowPage.prototype.initGuestRoomRequest = function () {
        this.guestRoomRequest = {};
        this.id = '';
        this.room_flags = [];
    };
    GuestRoomRequestShowPage.prototype.refreshPage = function (event) {
        this.loadGuestRoomRequestDetails(event, this.id);
    };
    GuestRoomRequestShowPage.prototype.loadGuestRoomRequestDetails = function (reference, id) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        if (reference === null) {
            loading.present();
        }
        this.dataGetterService.getGuestRoomRequest(id)
            .subscribe(function (data) {
            console.log("Guest Room Request Loaded", data);
            if (data.success) {
                _this.guestRoomRequest = data.room_request;
                _this.room_flags = [];
                _this.getRequestTags();
            }
            else {
                _this.initGuestRoomRequest();
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
            if (reference != null) {
                reference.complete();
            }
        }, function (err) {
            console.log(err);
            _this.initGuestRoomRequest();
            var toast = _this.toastCtrl.create({
                message: _this.appGlobal.ServerError,
                duration: 3000
            });
            toast.present();
            loading.dismiss();
            if (reference != null) {
                reference.complete();
            }
            if (_this.navCtrl.canGoBack()) {
                _this.navCtrl.pop();
            }
        });
    };
    GuestRoomRequestShowPage.prototype.getRequestTags = function () {
        if (this.guestRoomRequest.single_lady)
            this.room_flags.push('Single Lady');
        if (this.guestRoomRequest.single_bed)
            this.room_flags.push('Single Bed');
        if (this.guestRoomRequest.food)
            this.room_flags.push('Food');
    };
    GuestRoomRequestShowPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-guest-room-request-show',template:/*ion-inline-start:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/guest-room-request-show/guest-room-request-show.html"*/'<!--\n  Generated template for the GuestRoomRequestShowPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>{{guestRoomRequest ? guestRoomRequest.uid : \'\'}}</ion-title>\n  </ion-navbar>\n  <div class="idea_state_header_{{guestRoomRequest ? guestRoomRequest.state : \'\'}}"></div>\n</ion-header>\n\n\n<ion-content>\n  <ion-refresher (ionRefresh)="refreshPage($event)">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n\n  <ion-card>\n    <ion-card-header>\n      <ion-row>\n        <ion-col>\n          <div class="pull-right" *ngIf="guestRoomRequest.approved">\n            <p>Approved By: <strong>{{guestRoomRequest.approver}}</strong></p>\n            <p>Approved At: <strong>{{guestRoomRequest.approved_at}}</strong></p>\n          </div>\n        </ion-col>\n\n        <ion-col>\n          <ion-badge class="pull-right">{{guestRoomRequest.state}}</ion-badge>\n        </ion-col>\n      </ion-row>\n    </ion-card-header>\n\n    <ion-card-content>\n      <ion-row>\n        <ion-col>\n          <p>Address: <strong>{{guestRoomRequest.address}}</strong></p>\n          <p>Number of Guest: <strong>{{guestRoomRequest.number_of_guest}}</strong></p>\n          <p>Details: <strong>{{guestRoomRequest.detail}}</strong></p>\n        </ion-col>\n      </ion-row>\n\n      <ion-row>\n        <ion-col>Check In</ion-col>\n        <ion-col>Check Out</ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col><strong>{{guestRoomRequest.check_in}}</strong></ion-col>\n        <ion-col><strong>{{guestRoomRequest.check_out}}</strong></ion-col>\n      </ion-row>\n\n      <ion-row *ngIf=\'room_flags.length > 0\'>\n        <ion-col>\n          <ion-tags-input [(ngModel)]="room_flags" [readonly]="true"></ion-tags-input>\n        </ion-col>\n      </ion-row>\n    </ion-card-content>\n  </ion-card>\n</ion-content>\n'/*ion-inline-end:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/guest-room-request-show/guest-room-request-show.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_data_getter_service_data_getter_service__["a" /* DataGetterServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Events */],
            __WEBPACK_IMPORTED_MODULE_2__providers_data_setter_data_setter__["a" /* DataSetterProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_app_global_app_global__["a" /* AppGlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_vibration__["a" /* Vibration */]])
    ], GuestRoomRequestShowPage);
    return GuestRoomRequestShowPage;
}());

//# sourceMappingURL=guest-room-request-show.js.map

/***/ }),

/***/ 72:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_app_global_app_global__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_data_setter_data_setter__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular_components_toast_toast_controller__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_network__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_data_getter_service_data_getter_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__idea_show_idea_show__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__service_request_show_service_request_show__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__grievance_show_grievance_show__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__article_show_article_show__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_storage__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__intro_intro__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_database_database__ = __webpack_require__(413);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_sqlite__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__guest_lunch_guest_lunch__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__visiting_card_visiting_card__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__maintenance_request_maintenance_request__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__guest_room_request_show_guest_room_request_show__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__stationery_request_stationery_request__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__access_card_request_access_card_request__ = __webpack_require__(86);
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
    function HomePage(navCtrl, network, dataGetterService, toastCtrl, dataSetterService, loadingCtrl, appGlobal, storage, sql, databse //  public sqlProvider:DatabaseProvider
    ) {
        //this.sqlProvider=this.sqlstorage;
        // sqlservice.createDB();
        this.navCtrl = navCtrl;
        this.network = network;
        this.dataGetterService = dataGetterService;
        this.toastCtrl = toastCtrl;
        this.dataSetterService = dataSetterService;
        this.loadingCtrl = loadingCtrl;
        this.appGlobal = appGlobal;
        this.storage = storage;
        this.sql = sql;
        this.databse = databse;
        this.notifications = [];
        this.descending = false;
        this.order = -1;
        this.field = 'updated_at';
    }
    HomePage.prototype.sort = function () {
        this.descending = !this.descending;
        this.order = this.descending ? 1 : -1;
    };
    HomePage.prototype.loadNotifications = function (ref) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        if (ref === null) {
            loading.present();
        }
        this.dataGetterService.getAllNotifications()
            .subscribe(function (data) {
            console.log("Notifications Loaded", data);
            if (data.success) {
                _this.notifications = data.notification;
            }
            else {
                _this.notifications = [];
            }
            loading.dismiss();
            if (ref != null) {
                ref.complete();
            }
        }, function (err) {
            console.log(err);
            _this.notifications = [];
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
    HomePage.prototype.goToPage = function (id, association) {
        console.log(this.notification);
        switch (association) {
            case "idea": {
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__idea_show_idea_show__["a" /* IdeaShowPage */], { id: id });
                break;
            }
            case "Service Request": {
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__service_request_show_service_request_show__["a" /* ServiceRequestShowPage */], { id: id });
                break;
            }
            case "grievance": {
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_10__grievance_show_grievance_show__["a" /* GrievanceShowPage */], { id: id });
                break;
            }
            case "cms": {
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_11__article_show_article_show__["a" /* ArticleShowPage */], { id: id });
                break;
            }
            case "guest_lunch_requests": {
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_16__guest_lunch_guest_lunch__["a" /* GuestLunchPage */], { id: id });
                break;
            }
            case "visiting_card_requests": {
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_17__visiting_card_visiting_card__["a" /* VisitingCardPage */], { id: id });
                break;
            }
            case "maintenance_requests": {
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_18__maintenance_request_maintenance_request__["a" /* MaintenanceRequestPage */], { id: id });
                break;
            }
            case "room_requests": {
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_19__guest_room_request_show_guest_room_request_show__["a" /* GuestRoomRequestShowPage */], { id: id });
                break;
            }
            case "stationery_requests": {
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_20__stationery_request_stationery_request__["a" /* StationeryRequestPage */], { id: id });
                break;
            }
            case "access_card_requests": {
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_21__access_card_request_access_card_request__["a" /* AccessCardRequestPage */], { id: id });
                break;
            }
            default: {
                console.log("default");
            }
        }
    };
    HomePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.storage.get('intro-done').then(function (done) {
            if (!done) {
                _this.storage.set('intro-done', true);
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_13__intro_intro__["a" /* IntroPage */]);
            }
        });
    };
    HomePage.prototype.ionViewDidEnter = function () {
        this.loadNotifications(null);
    };
    HomePage.prototype.refreshPage = function (ev) {
        this.loadNotifications(ev);
    };
    HomePage.prototype.onSnooze = function (slidingItem, notification) {
        var _this = this;
        slidingItem.close();
        var request = {
            id: notification.id
        };
        console.log("Snooze Notification Request", request);
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.dataSetterService.snoozeNotification(request)
            .subscribe(function (data) {
            console.log("Snooze Notification Response", data);
            loading.dismiss();
            if (data.success) {
                __WEBPACK_IMPORTED_MODULE_1_lodash__["pull"](_this.notifications, notification);
                var toast = _this.toastCtrl.create({
                    message: data.message,
                    duration: 3000
                });
                toast.present();
                // this.vibration.vibrate(this.appGlobal.vibrationTimings);
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
    HomePage.prototype.onDismiss = function (slidingItem, notification) {
        var _this = this;
        slidingItem.close();
        var request = {
            id: notification.id
        };
        console.log("Mark as Read Notification Request", request);
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.dataSetterService.markReadNotification(request)
            .subscribe(function (data) {
            console.log("Mark as Read Notification Response", data);
            loading.dismiss();
            if (data.success) {
                __WEBPACK_IMPORTED_MODULE_1_lodash__["pull"](_this.notifications, notification);
                // this.vibration.vibrate(this.appGlobal.vibrationTimings);
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
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_5__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      <img src="assets/img/appicon.png" height="30" alt="Empower">\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-refresher (ionRefresh)="refreshPage($event)">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n\n  <ion-list *ngIf="notifications.length > 0">\n    <ion-item-sliding #item *ngFor="let notification of notifications | sort: {property: field, order: order}">\n      <ion-item no-lines class="bottom-border"\n                (click)="goToPage(notification.associated_item_id, notification.associated_item_type)"\n                [ngStyle]="{\'background-color\': notification.background_color}">\n        <ion-avatar item-start>\n          <img src="{{notification.profile}}" style="border:2px solid gray;width:3.5em;height:3.5em;">\n        </ion-avatar>\n\n        <ion-card-header [ngStyle]="{\'font-weight\': bold, \'color\': notification.font_color}">\n          {{notification.title}}\n        </ion-card-header>\n\n        <ion-card-content [ngStyle]="{\'text-align\':left, \'color\': notification.font_color}">\n          {{notification.message}}\n        </ion-card-content>\n      </ion-item>\n\n      <ion-item-options side="left">\n        <button ion-button (click)="onSnooze(item,notification)">Snooze</button>\n      </ion-item-options>\n\n      <ion-item-options side="right">\n        <button ion-button color="danger" (click)="onDismiss(item,notification)">Dismiss</button>\n      </ion-item-options>\n    </ion-item-sliding>\n  </ion-list>\n  <ion-item no-lines class="bottom-border" *ngIf="notifications.length === 0" text-center>\n    No Notifications Available\n  </ion-item>\n</ion-content>\n'/*ion-inline-end:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6_ionic_angular__["p" /* NavController */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_network__["a" /* Network */],
            __WEBPACK_IMPORTED_MODULE_7__providers_data_getter_service_data_getter_service__["a" /* DataGetterServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular_components_toast_toast_controller__["a" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__providers_data_setter_data_setter__["a" /* DataSetterProvider */],
            __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["l" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_0__providers_app_global_app_global__["a" /* AppGlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_12__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_15__ionic_native_sqlite__["a" /* SQLite */],
            __WEBPACK_IMPORTED_MODULE_14__providers_database_database__["a" /* DatabaseProvider */] //  public sqlProvider:DatabaseProvider
        ])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 74:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IdeaShowPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_native_vibration__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_app_global_app_global__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__comments_comments__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_data_setter_data_setter__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_filter__ = __webpack_require__(642);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_filter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_data_getter_service_data_getter_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_lodash__ = __webpack_require__(55);
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
            selector: 'page-idea-show',template:/*ion-inline-start:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/idea-show/idea-show.html"*/'<!--\n  Generated template for the IdeaShowPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>{{Idea ? Idea.uuid : \'\'}}\n    </ion-title>\n    <ion-buttons end *ngIf="Idea" >\n      <button ion-button icon-only clear (click)="tagUsers()" *ngIf="Idea.can_tag">\n        <ion-icon name="pricetag"></ion-icon>\n      </button>\n      <button ion-button icon-only clear (click)="allocateUsers()" *ngIf="Idea.Can_allocate && userTagged.length > 0">\n        <ion-icon [name]="Idea.allocated_users.length > 0 ? \'git-compare\' : \'git-network\'"></ion-icon>\n      </button>\n      <button ion-button icon-only clear (click)="comment()" *ngIf="Idea.can_comment">\n        <ion-icon name=\'chatbubbles\'></ion-icon>\n        {{Idea.comments.length}}\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n  <div class="idea_state_header_{{Idea ? Idea.state : \'\'}}"></div>\n</ion-header>\n\n\n<ion-content padding>\n  <ion-refresher (ionRefresh)="refreshPage($event)">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n  <div *ngIf="Idea">\n    <div *ngIf="isAllocating">\n      <tag-input \n        [(ngModel)]="Idea.allocated_users" \n        [identifyBy]="\'id\'" \n        [displayBy]="\'name\'" \n        [onlyFromAutocomplete]="true"\n        [placeholder]="\'Type User name\'"\n        [secondaryPlaceholder]="\'Search User\'"\n        [clearOnBlur]="true"\n        [maxItems]="Idea.allocation_limit"\n        (onAdd)="onAddAllocation($event)"\n        (onRemove)="onRemoveAllocation($event)"\n        [onRemoving]="onRemovingAllocation">\n        <tag-input-dropdown \n          [showDropdownIfEmpty]="true" \n          [identifyBy]="\'id\'" \n          [displayBy]="\'name\'" \n          [focusFirstElement]="true"\n          [minimumTextLength]="0"\n          [autocompleteItems]="userTagged">\n          <ng-template let-item="item" let-index="index">\n            {{ item.name }}\n          </ng-template>\n        </tag-input-dropdown>\n      </tag-input>\n      <button ion-button full (click)="submitAllocation()">{{viewAllocated.length > 0 ? \'Re-allocate\' : \'Allocate\'}}</button>\n      <hr/>\n    </div>\n    <div *ngIf="isTagging">\n      <tag-input \n        #tagsInput\n        [(ngModel)]="Idea.tagged_users"\n        [identifyBy]="\'id\'"\n        [displayBy]="\'name\'"\n        [onlyFromAutocomplete]="true"\n        [placeholder]="\'Type New User Name\'"\n        [onTextChangeDebounce]="500"\n        [secondaryPlaceholder]="\'Search User\'"\n        [clearOnBlur]="true"\n        (onAdd)="onAdd($event)"\n        (onRemove)="onRemove($event)">\n          <tag-input-dropdown \n            [showDropdownIfEmpty]="true"\n            [identifyBy]="\'id\'"\n            [focusFirstElement]="true"\n            [displayBy]="\'name\'"\n            [minimumTextLength]="1"\n            [autocompleteObservable]="getTags">\n            <ng-template let-item="item" let-index="index">\n              {{ item.name }}\n            </ng-template>\n          </tag-input-dropdown>\n      </tag-input>\n      <button ion-button full (click)="submitTags()">Submit Tags</button>\n      <hr/>\n    </div>\n    <ion-card>\n      <ion-card-header>\n        <ion-badge class="pull-right">{{Idea.state}}</ion-badge>\n        <ion-title>\n          {{Idea.title}}\n        </ion-title>\n      </ion-card-header>\n      <ion-card-content>\n        <ion-list>\n          <ion-item *ngIf=\'viewAllocated.length > 0\' text-wrap>\n            Allocated:\n            <ion-tags-input [(ngModel)]="viewAllocated" [readonly]="true"></ion-tags-input>\n            <!-- <tag-input [(ngModel)]="Idea.tagged_users" [identifyBy]="\'id\'" [displayBy]="\'name\'" [hideForm]="true" [removable]="false"></tag-input> -->\n          </ion-item>\n          <ion-item *ngIf=\'viewTags.length > 0\' text-wrap>\n            Tags:\n            <ion-tags-input [(ngModel)]="viewTags" [readonly]="true"></ion-tags-input>\n            <!-- <tag-input [(ngModel)]="Idea.tagged_users" [identifyBy]="\'id\'" [displayBy]="\'name\'" [hideForm]="true" [removable]="false"></tag-input> -->\n          </ion-item>\n          <ion-item text-wrap>\n            Details:\n            <div [innerHtml]="Idea.content"></div>\n          </ion-item>\n        </ion-list>\n      </ion-card-content>\n    </ion-card>\n\n    <ion-list>\n      <ion-item *ngFor="let attach of Idea.attachment">\n        <img src="{{attach.url}}" *ngIf="attach.file_type === \'image\'" alt="{{attach.file_name}}" width="300"/>\n        <a href="{{attach.url}}" *ngIf="attach.file_type !== \'image\'" padding>{{attach.file_name}}</a>\n      </ion-item>\n    </ion-list>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/idea-show/idea-show.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7_ionic_angular__["p" /* NavController */], __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["q" /* NavParams */], __WEBPACK_IMPORTED_MODULE_8__providers_data_getter_service_data_getter_service__["a" /* DataGetterServiceProvider */], __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["l" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["f" /* Events */], __WEBPACK_IMPORTED_MODULE_3__providers_data_setter_data_setter__["a" /* DataSetterProvider */], __WEBPACK_IMPORTED_MODULE_1__providers_app_global_app_global__["a" /* AppGlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["s" /* ToastController */], __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["n" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_0__ionic_native_vibration__["a" /* Vibration */]])
    ], IdeaShowPage);
    return IdeaShowPage;
}());

//# sourceMappingURL=idea-show.js.map

/***/ }),

/***/ 75:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ServiceRequestShowPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_native_vibration__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_app_global_app_global__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular_components_toast_toast_controller__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_data_getter_service_data_getter_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_data_setter_data_setter__ = __webpack_require__(15);
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
 * Generated class for the ServiceRequestShowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ServiceRequestShowPage = /** @class */ (function () {
    function ServiceRequestShowPage(navCtrl, navParams, dataGetterService, dataSetterService, alertCtrl, toastCtrl, events, loadingCtrl, appGlobal, vibration) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataGetterService = dataGetterService;
        this.dataSetterService = dataSetterService;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.events = events;
        this.loadingCtrl = loadingCtrl;
        this.appGlobal = appGlobal;
        this.vibration = vibration;
        this.initalServiceRequest = {
            uid: '',
            state: '',
            category: '',
            detail: '',
            attachment: [],
        };
        this.show_buttons = false;
        this.rate = 0;
        this.srid = this.navParams.get("id");
        this.loadSRDetails(null, this.srid);
        this.events.subscribe('reload:serviceRequestShow', function (isNotification, id) {
            _this.srid = id;
            _this.refreshPage(null);
        });
    }
    ServiceRequestShowPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ServiceRequestShowPage');
        this.show_buttons = false;
        if (this.serviceRequest) {
            if (this.serviceRequest.state === "Completed") {
                this.show_buttons = true;
            }
            else {
                this.show_buttons = false;
            }
            console.log(this.serviceRequest.state);
            console.log(this.serviceRequest["state"]);
        }
    };
    ServiceRequestShowPage.prototype.loadSRDetails = function (ref, id) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        if (ref === null) {
            loading.present();
        }
        this.dataGetterService.loadSRDetail(id)
            .subscribe(function (data) {
            console.log("Service Request Details Loaded", data);
            if (data.success) {
                _this.serviceRequest = data.service_request;
                _this.items = data.timeline;
                if (_this.serviceRequest) {
                    if (_this.serviceRequest.state === "Completed") {
                        _this.show_buttons = true;
                    }
                    else {
                        _this.show_buttons = false;
                    }
                }
            }
            else {
                // this.serviceRequest = this.initalServiceRequest;
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
            // this.serviceRequest = this.initalServiceRequest;
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
    ServiceRequestShowPage.prototype.refreshPage = function (ev) {
        this.loadSRDetails(ev, this.srid);
    };
    ServiceRequestShowPage.prototype.change_state = function (state) {
        var _this = this;
        console.log(state);
        var title, comment;
        switch (state) {
            case 'closed':
                title = 'Close';
                comment = 'Closed';
                break;
            case 'reopen':
                title = 'Reopen';
                break;
            default:
                break;
        }
        if (state === 'reopen') {
            var alert_1 = this.alertCtrl.create({
                // title: title,
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
                        text: title,
                        handler: function (data) {
                            console.log(data.comment);
                            if (data.comment !== '') {
                                var request = {
                                    state: state,
                                    id: _this.srid,
                                    comment: data.comment
                                };
                                _this.processRequest(request);
                            }
                            else {
                                var toast = _this.toastCtrl.create({
                                    message: "Comment is mandatory",
                                    duration: 5000
                                });
                                toast.present();
                                // this.change_state(state);
                            }
                        }
                    }
                ]
            });
            // now present the alert on top of all other content
            alert_1.present();
        }
        else {
            var alert_2 = this.alertCtrl.create({
                title: 'Close Request ?',
                subTitle: 'Please rate the resolution',
                cssClass: 'alertstar',
                enableBackdropDismiss: true,
                buttons: [
                    {
                        text: 'Cancel',
                        cssClass: 'alert-button-no-rating',
                        handler: function (data) {
                        }
                    },
                    {
                        text: title,
                        cssClass: 'alert-button-no-rating',
                        handler: function () {
                            var request = {
                                state: state,
                                id: _this.srid,
                                comment: comment,
                                rating: 0,
                            };
                            _this.processRequest(request);
                        }
                    },
                    { text: '1', cssClass: 'stars', handler: function (data) {
                            var request = {
                                state: state,
                                id: _this.srid,
                                comment: comment,
                                rating: 1,
                            };
                            _this.processRequest(request);
                        }
                    },
                    { text: '2', cssClass: 'stars', handler: function (data) {
                            var request = {
                                state: state,
                                id: _this.srid,
                                comment: comment,
                                rating: 2,
                            };
                            _this.processRequest(request);
                        }
                    },
                    { text: '3', cssClass: 'stars', handler: function (data) {
                            var request = {
                                state: state,
                                id: _this.srid,
                                comment: comment,
                                rating: 3,
                            };
                            _this.processRequest(request);
                        }
                    },
                    {
                        text: '4', cssClass: 'stars', handler: function (data) {
                            var request = {
                                state: state,
                                id: _this.srid,
                                comment: comment,
                                rating: 4,
                            };
                            _this.processRequest(request);
                        }
                    },
                    { text: '5', cssClass: 'stars', handler: function (data) {
                            var request = {
                                state: state,
                                id: _this.srid,
                                comment: comment,
                                rating: 5,
                            };
                            _this.processRequest(request);
                        }
                    },
                ]
            });
            alert_2.present();
        }
    };
    ServiceRequestShowPage.prototype.processRequest = function (request) {
        var _this = this;
        console.log("Update SR State Request", request);
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.dataSetterService.updateServiceRequestState(request)
            .subscribe(function (data) {
            console.log("Update SR State Response", data);
            loading.dismiss();
            if (data.success) {
                _this.loadSRDetails(null, _this.srid);
                var toast = _this.toastCtrl.create({
                    message: data.message,
                    duration: 3000
                });
                toast.present();
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
    ServiceRequestShowPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["m" /* Component */])({
            selector: 'page-service-request-show',template:/*ion-inline-start:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/service-request-show/service-request-show.html"*/'<!--\n  Generated template for the ServiceRequestShowPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{serviceRequest ? serviceRequest.uid : \'\'}}\n    </ion-title>\n  </ion-navbar>\n  <div class="sr_state_header_{{serviceRequest ? serviceRequest.state : \'\'}}">\n\n  </div>\n\n</ion-header>\n\n<ion-content padding>\n\n  <ion-refresher (ionRefresh)="refreshPage($event)">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n\n  <div *ngIf="serviceRequest">\n   <ion-card>\n    <ion-card-header>\n      <ion-badge class="pull-right">{{serviceRequest.state}}</ion-badge>\n      <ion-title>\n        {{serviceRequest.category}}\n      </ion-title>\n    </ion-card-header>\n    <ion-card-content> \n      <!-- Category: {{serviceRequest.category}}<br/> -->\n     Details: {{serviceRequest.detail}}\n    </ion-card-content>\n    <div *ngIf="show_buttons">\n      <button  ion-button color="secondary" (click)="change_state(\'closed\')">Close</button>\n      <button float-right ion-button color="danger" (click)="change_state(\'reopen\')">Reopen</button>\n    </div>\n    <ion-list>\n      <ion-item *ngFor="let attach of serviceRequest.attachment">\n        <img src="{{attach.url}}" *ngIf="attach.file_type === \'image\'" alt="{{attach.file_name}}" width="300" />\n        <a href="{{attach.url}}" *ngIf="attach.file_type !== \'image\'" padding>{{attach.file_name}}</a>\n      </ion-item>\n    </ion-list>\n  </ion-card>\n\n\n  <hr>\n  </div>\n  <timeline endIcon="call" *ngIf="items">\n    <timeline-item *ngFor="let item of items">\n      <timeline-time [time]="item.time"></timeline-time>\n      <ion-icon [name]="item.icon"></ion-icon>\n      <ion-card>\n\n        <ion-card-header>\n          {{item.title}}\n        </ion-card-header>\n        <ion-card-content>\n\n          {{item.subtitle}}\n        </ion-card-content>\n        <hr>\n        <ion-card-content>\n          {{item.content}}\n        </ion-card-content>\n      </ion-card>\n    </timeline-item>\n\n  </timeline>\n</ion-content>\n'/*ion-inline-end:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/service-request-show/service-request-show.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["p" /* NavController */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["q" /* NavParams */], __WEBPACK_IMPORTED_MODULE_5__providers_data_getter_service_data_getter_service__["a" /* DataGetterServiceProvider */], __WEBPACK_IMPORTED_MODULE_6__providers_data_setter_data_setter__["a" /* DataSetterProvider */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular_components_toast_toast_controller__["a" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["f" /* Events */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["l" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1__providers_app_global_app_global__["a" /* AppGlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_0__ionic_native_vibration__["a" /* Vibration */]])
    ], ServiceRequestShowPage);
    return ServiceRequestShowPage;
}());

//# sourceMappingURL=service-request-show.js.map

/***/ }),

/***/ 76:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LeaveDataProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_global_app_global__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__user_data_ts__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(646);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_of__ = __webpack_require__(647);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch__ = __webpack_require__(648);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ionic_angular_components_loading_loading_controller__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_lodash__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ionic_angular_components_toast_toast_controller__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ionic_angular__ = __webpack_require__(2);
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

/***/ 86:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccessCardRequestPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_data_getter_service_data_getter_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_app_global_app_global__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__access_card_request_form_access_card_request_form__ = __webpack_require__(143);
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
 * Generated class for the AccessCardRequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AccessCardRequestPage = /** @class */ (function () {
    function AccessCardRequestPage(navCtrl, navParams, dataGetterService, loadingCtrl, events, toastCtrl, appGlobal) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataGetterService = dataGetterService;
        this.loadingCtrl = loadingCtrl;
        this.events = events;
        this.toastCtrl = toastCtrl;
        this.appGlobal = appGlobal;
        this.accessCardRequests = [];
        this.queryText = '';
        this.canCreate = false;
        this.events.subscribe('reload:access-card', function () {
            _this.refreshAccessCardRequestList(null);
        });
        this.initAccessCardRequest();
    }
    AccessCardRequestPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AccessCardRequestPage');
    };
    AccessCardRequestPage.prototype.ionViewDidEnter = function () {
        this.loadAccessCardRequests(null);
    };
    AccessCardRequestPage.prototype.initAccessCardRequest = function () {
        this.accessCardRequests = [];
        this.canCreate = false;
    };
    AccessCardRequestPage.prototype.refreshAccessCardRequestList = function (reference) {
        this.loadAccessCardRequests(reference);
    };
    AccessCardRequestPage.prototype.loadAccessCardRequests = function (reference) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        if (reference === null) {
            loading.present();
        }
        this.dataGetterService.getAllAccessCardRequests().subscribe(function (data) {
            console.log("Access Card Requests Loaded", data);
            if (data.success) {
                _this.accessCardRequests = data.access_card_requests;
                _this.canCreate = data.can_create;
            }
            else {
                _this.initAccessCardRequest();
            }
            loading.dismiss();
            if (reference != null) {
                reference.complete();
            }
        }, function (error) {
            console.log(error);
            _this.initAccessCardRequest();
            var toast = _this.toastCtrl.create({
                message: _this.appGlobal.ServerError,
                duration: 3000
            });
            toast.present();
            loading.dismiss();
            if (reference != null) {
                reference.complete();
            }
        });
    };
    AccessCardRequestPage.prototype.goToAccessCardRequestForm = function () {
        if (this.canCreate)
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__access_card_request_form_access_card_request_form__["a" /* AccessCardRequestFormPage */]);
        else {
            this.toastCtrl.create({
                message: "Can't have more than 1 open requests",
                duration: 3000
            }).present();
        }
    };
    AccessCardRequestPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-access-card-request',template:/*ion-inline-start:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/access-card-request/access-card-request.html"*/'<!--\n  Generated template for the AccessCardRequestPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>ID/Access Card Requests</ion-title>\n  </ion-navbar>\n\n  <ion-toolbar no-border-top>\n    <ion-searchbar color="primary" [(ngModel)]="queryText" placeholder="Search"></ion-searchbar>\n  </ion-toolbar>\n</ion-header>\n\n\n<ion-content>\n  <ion-refresher (ionRefresh)="refreshAccessCardRequestList($event)">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n\n  <ion-list>\n    <ion-card\n      *ngFor="let accessCardRequest of accessCardRequests | search : {term:queryText,fields:[\'uid\',\'justification\']}">\n      <div class="{{\'access_card_state_sidebar_\'+accessCardRequest.state}}">\n        <ion-card-header>\n          {{accessCardRequest.uid}}\n          <span class="pull-right sr-age">{{accessCardRequest.age}}</span>\n        </ion-card-header>\n\n        <ion-card-content>\n          <p>{{accessCardRequest.justification}}</p>\n        </ion-card-content>\n\n        <ion-row *ngIf="accessCardRequest.approved">\n          <ion-col>\n            <div class="pull-right">\n              <p>Approved By: <strong>{{accessCardRequest.approver}}</strong></p>\n              <p>Approved At: <strong>{{accessCardRequest.approved_at}}</strong></p>\n            </div>\n          </ion-col>\n        </ion-row>\n\n        <ion-row *ngIf="accessCardRequest.closed">\n          <ion-col>\n            <div class="pull-right">\n              <p>Closed By: <strong>{{accessCardRequest.closer}}</strong></p>\n              <p>Closed At: <strong>{{accessCardRequest.closed_at}}</strong></p>\n            </div>\n          </ion-col>\n        </ion-row>\n\n        <ion-row>\n          <ion-col>\n            <ion-badge class="pull-right">{{accessCardRequest.state}}</ion-badge>\n          </ion-col>\n        </ion-row>\n      </div>\n    </ion-card>\n  </ion-list>\n  <ion-fab right bottom>\n    <button ion-fab (click)="goToAccessCardRequestForm()">\n      <ion-icon name="add"></ion-icon>\n    </button>\n  </ion-fab>\n</ion-content>\n'/*ion-inline-end:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/access-card-request/access-card-request.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_data_getter_service_data_getter_service__["a" /* DataGetterServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_app_global_app_global__["a" /* AppGlobalProvider */]])
    ], AccessCardRequestPage);
    return AccessCardRequestPage;
}());

//# sourceMappingURL=access-card-request.js.map

/***/ }),

/***/ 87:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommentsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_data_setter_data_setter__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_user_data_ts__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment__ = __webpack_require__(1);
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
            selector: 'page-comments',template:/*ion-inline-start:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/comments/comments.html"*/'<!--\n  Generated template for the CommentsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-buttons start>\n      <button ion-button icon-only (click)="dismiss()">\n        <ion-icon name="close-circle"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>Comments ({{rootItem.comments.length}})</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n  <div class="message-wrap">\n\n    <div *ngFor="let comment of rootItem.comments" class="message" [class.left]="comment.comment_by !== user.id" [class.right]="comment.comment_by === user.id">\n      <img class="user-img" [src]="comment.profile_pic ? comment.profile_pic : \'https://intranetstaging.herokuapp.com/assets/user_pic_missing.png\'" alt="" src="">\n      <ion-spinner name="dots" *ngIf="comment.status === \'pending\'"></ion-spinner>\n      <label *ngIf="comment.status === \'failed\'" class=\'status liked\'>Failed</label>\n      <div class="msg-detail">\n        <!-- <div class="msg-info">\n          <p>{{comment.user}}</p>\n        </div> -->\n        <div class="msg-content">\n          <span class="triangle"></span>\n          <div [class]="comment.comment_by === user.id ? \'msg-info-right\':\'msg-info-left\'">\n            <p>{{comment.user}}</p>\n          </div>\n          <p class="line-breaker " [innerHTML]=\'comment.content\'></p>\n          <div [class]="comment.comment_by === user.id ? \'msg-info-right-time\':\'msg-info-left-time\'">\n            <p>{{comment.comment_time}}</p>\n          </div>\n        </div>\n        \n      </div>\n    </div>\n\n  </div>\n\n</ion-content>\n\n<ion-footer no-border [style.height]="\'55px\'">\n  <div class="input-wrap">\n    <!-- <button ion-button clear icon-only item-right (click)="switchEmojiPicker()">\n      <ion-icon name="md-happy"></ion-icon>\n    </button> -->\n    <ion-textarea name="comment_input" #comment_input placeholder="Type your comment" [(ngModel)]="editorComment" (focusin)="onFocus()"></ion-textarea>\n    <button ion-button clear icon-only item-right (click)="sendComment()">\n      <ion-icon name="ios-send" ios="ios-send" md="md-send"></ion-icon>\n    </button>\n  </div>\n  <!-- <emoji-picker [(ngModel)]="editorMsg"></emoji-picker> -->\n</ion-footer>\n\n'/*ion-inline-end:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/comments/comments.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["p" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["q" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["t" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1__providers_user_data_ts__["a" /* UserData */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* Events */],
            __WEBPACK_IMPORTED_MODULE_0__providers_data_setter_data_setter__["a" /* DataSetterProvider */]])
    ], CommentsPage);
    return CommentsPage;
}());

//# sourceMappingURL=comments.js.map

/***/ }),

/***/ 88:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__timeline_timeline__ = __webpack_require__(539);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__comment_comment__ = __webpack_require__(540);
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

/***/ 89:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_app_global_app_global__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular_components_loading_loading_controller__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_data_setter_data_setter__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_data_getter_service_data_getter_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_user_data_ts__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_file_transfer__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_image_picker__ = __webpack_require__(382);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_crop__ = __webpack_require__(383);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_camera__ = __webpack_require__(68);
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
            selector: 'page-profile',template:/*ion-inline-start:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/profile/profile.html"*/'<!--\n  Generated template for the ProfilePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>PROFILE</ion-title>\n\n    <ion-buttons end *ngIf="showEditBtn">\n      <button ion-button icon-only clear (click)="onSubmit(!edit)">\n        <ion-icon [name]="edit ? \'checkmark\' : \'create\'"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content>\n  <div *ngIf="profile && !edit">\n    <ion-card class="blurred-title-card">\n      <!-- <div class="card-image" [style.background-image]="\'url(\' + profile.profile + \')\'"></div> -->\n\n      <div class="card-title-background">\n        <span [style.background-image]="\'url(\' + profile.profile + \')\'"></span>\n      </div>\n      <div class="item-md" style="justify-content: center; display: flex; background: transparent;">\n        <ion-avatar>\n          <img [src]="profile.profile" style="width:8em;height:8em;">\n        </ion-avatar>\n      </div>\n    </ion-card>\n    <ion-card text-center>\n      <ion-card-content>\n        <p *ngIf="profile.name" style="font-size: 2rem;">\n          <b>{{profile.name ? profile.name : \'\'}}</b>\n        </p>\n        <p *ngIf="profile.designation">\n          <b>{{profile.designation ? profile.designation : \'\'}}</b>\n        </p>\n        <p *ngIf="profile.department">\n          <b>{{profile.department ? profile.department : \'\'}}</b>\n        </p>\n        <hr style="width: 50%"/>\n        <p *ngIf="profile.location">\n          <ion-icon name="pin"></ion-icon>\n          {{profile.location ? profile.location : \'\'}}\n        </p>\n        <p *ngIf="profile.mobile">\n          <ion-icon name="phone-portrait"></ion-icon>\n          {{profile.mobile ? profile.mobile:\'\'}}\n        </p>\n        <p *ngIf="profile.extension">\n          <ion-icon name="call"></ion-icon>\n          {{profile.extension ? profile.extension : \'\'}}\n        </p>\n      </ion-card-content>\n    </ion-card>\n    <ion-card>\n      <ion-card-header>\n        <ion-card-title>\n           About Me\n        </ion-card-title>\n      </ion-card-header>\n      <ion-card-content *ngIf="profile.about_me" >\n        {{profile.about_me}}\n      </ion-card-content>\n      <ion-card-content *ngIf="!profile.about_me">\n        Details Not Updated\n      </ion-card-content>\n    </ion-card>\n\n    <ion-card>\n      <ion-card-header>\n        <ion-card-title>\n          Experience\n        </ion-card-title>\n      </ion-card-header>\n      <ion-card-content *ngIf="profile.experience" >\n        {{profile.experience}}\n      </ion-card-content>\n      <ion-card-content *ngIf="!profile.experience">\n        Details Not Updated\n      </ion-card-content>\n    </ion-card>\n\n    <ion-card>\n      <ion-card-header>\n        <ion-card-title>\n          Skill Set\n        </ion-card-title>\n      </ion-card-header>\n      <ion-card-content *ngIf="profile.skill_set.length > 0" >\n        <ion-tags-input\n          [(ngModel)]="profile.skill_set"\n          [mode]="\'ios\'"\n          [readonly]="true">\n        </ion-tags-input>\n      </ion-card-content>\n      <ion-card-content *ngIf="profile.skill_set.length === 0">\n        Details Not Updated\n      </ion-card-content>\n    </ion-card>\n\n    <ion-card>\n      <ion-card-header>\n        <ion-card-title>\n          Learning and Development\n        </ion-card-title>\n      </ion-card-header>\n      <ion-card-content *ngIf="profile.learning_and_development" >\n        {{profile.learning_and_development}}\n      </ion-card-content>\n      <ion-card-content *ngIf="!profile.learning_and_development" >\n        Details Not Updated\n      </ion-card-content>\n    </ion-card>\n  </div>\n\n  <div *ngIf="edit_profile && edit">\n      <!-- <div class="item item-block item-md" style="justify-content: center;">\n        <ion-avatar item-start>\n          <img [src]="edit_profile.profile" style="width:120px;height:120px;">\n        </ion-avatar>\n      </div> -->\n      <ion-card class="blurred-title-card" (click)="editImage()">\n        <div class="card-title-background">\n          <span [style.background-image]="\'url(\' + edit_profile.profile + \')\'"></span>\n        </div>\n        <div class="item-md" style="justify-content: center; display: flex; background: transparent;">\n          <ion-avatar>\n            <img [src]="edit_profile.profile" style="width:8em;height:8em;">\n          </ion-avatar>\n          <ion-icon name="create"></ion-icon>\n        </div>\n      </ion-card>\n      <ion-list padding>\n        <ion-item>\n          <ion-label for="name" stacked>Name</ion-label>\n          <ion-input type="text" name="name" [(ngModel)]="edit_profile.name" autocomplete="on" autocorrect="on" required></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label for="department" stacked>Department</ion-label>\n          <ion-input type="text" name="department" [(ngModel)]="edit_profile.department"  autocomplete="on" autocorrect="on" required></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label for="designation" stacked>Designation</ion-label>\n          <ion-input type="text" name="designation" [(ngModel)]="edit_profile.designation"  autocomplete="on" autocorrect="on" required></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label for="mobile" stacked>Mobile</ion-label>\n          <ion-input type="tel" name="mobile" [(ngModel)]="edit_profile.mobile"  autocomplete="on" autocorrect="on" required></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label for="extension" stacked>Extension Number</ion-label>\n          <ion-input type="tel" name="extension" [(ngModel)]="edit_profile.extension"  autocomplete="on" autocorrect="on" required></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label for="location" stacked>Location</ion-label>\n          <ion-input type="text" name="location" [(ngModel)]="edit_profile.location"  autocomplete="on" autocorrect="on" required></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label for="about_me" stacked>About Me</ion-label>\n          <ion-textarea autoresize name="about_me" [(ngModel)]="edit_profile.about_me"  autocomplete="on" autocorrect="on" required></ion-textarea>\n        </ion-item>\n        <ion-item>\n          <ion-label for="experience" stacked>Experience</ion-label>\n          <ion-textarea autoresize name="experience" [(ngModel)]="edit_profile.experience"  autocomplete="on" autocorrect="on" required></ion-textarea>\n        </ion-item>\n        <ion-label class="item-md" style="color: #999;" stacked>Skill Set</ion-label>\n\n        <ion-tags-input style="margin-left: 16px;"\n            [(ngModel)]="edit_profile.skill_set"\n            [once]="\'true\'"\n            [mode]="\'ios\'"\n            [placeholder]="\'Add Skills\'"\n            [canBackspaceRemove]="true"\n            [canEnterAdd]="true"\n            [readonly]="false">\n          </ion-tags-input>\n        <ion-item>\n          <ion-label for="learning_and_development" stacked>Learning and Development</ion-label>\n          <ion-textarea autoresize name="learning_and_development" [(ngModel)]="edit_profile.learning_and_development"  autocomplete="on" autocorrect="on" required></ion-textarea>\n        </ion-item>\n        <ion-item>\n          <ion-buttons text-center>\n            <button ion-button block round color="primary" (click)="onSubmit(!edit)">{{edit? "Update" : "Edit"}}</button>\n          </ion-buttons>\n        </ion-item>\n      </ion-list>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/profile/profile.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6_ionic_angular__["p" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["q" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__providers_user_data_ts__["a" /* UserData */],
            __WEBPACK_IMPORTED_MODULE_2__providers_data_setter_data_setter__["a" /* DataSetterProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_data_getter_service_data_getter_service__["a" /* DataGetterServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular_components_loading_loading_controller__["a" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["s" /* ToastController */],
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

/***/ 9:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataGetterServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular_components_loading_loading_controller__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user_data_ts__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_global_app_global__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(2);
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
        console.log(this.user.userData.auth_token);
        console.log("%%%%%%%%%%%%% surveyUrl " + this.appGlobal.allSurveysURL);
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
    DataGetterServiceProvider.prototype.getAllMaintenanceRequests = function () {
        return this.http.get(this.appGlobal.getAllMaintenanceRequests, this.getHTTPOptions());
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
    DataGetterServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_4__app_global_app_global__["a" /* AppGlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_1__user_data_ts__["a" /* UserData */],
            __WEBPACK_IMPORTED_MODULE_0_ionic_angular_components_loading_loading_controller__["a" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["s" /* ToastController */]])
    ], DataGetterServiceProvider);
    return DataGetterServiceProvider;
}());

//# sourceMappingURL=data-getter-service.js.map

/***/ }),

/***/ 90:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GrievanceShowPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_native_vibration__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_app_global_app_global__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__comments_comments__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular_components_toast_toast_controller__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_data_setter_data_setter__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_data_getter_service_data_getter_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_lodash__ = __webpack_require__(55);
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
            selector: 'page-grievance-show',template:/*ion-inline-start:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/grievance-show/grievance-show.html"*/'<!--\n  Generated template for the GrievanceShowPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{Grievance ? Grievance.uuid : \'\'}}\n    </ion-title>\n    <ion-buttons end *ngIf="Grievance" >\n      <button ion-button icon-only clear (click)="allocateUsers()" *ngIf="Grievance.Can_allocate">\n        <ion-icon [name]="Grievance.allocated_users.length > 0 ? \'git-compare\' : \'git-network\'"></ion-icon>\n      </button>\n      <button ion-button icon-only clear (click)="comment()" *ngIf="Grievance.can_comment">\n        <ion-icon name=\'chatbubbles\'></ion-icon>\n        {{Grievance.comments.length}}\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n  <div class="gr_state_header_{{Grievance ? Grievance.state : \'\'}}"></div>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-refresher (ionRefresh)="refreshPage($event)">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n  <div *ngIf="Grievance">\n    <div *ngIf="isAllocating">\n      <tag-input \n        [(ngModel)]="Grievance.allocated_users" \n        [identifyBy]="\'id\'" \n        [displayBy]="\'name\'" \n        [onlyFromAutocomplete]="true" \n        [placeholder]="\'Type User name\'"\n        [secondaryPlaceholder]="\'Search User\'" \n        [clearOnBlur]="true" \n        [onTextChangeDebounce]="500"\n        [maxItems]="Grievance.allocation_limit" \n        (onAdd)="onAddAllocation($event)"\n        (onRemove)="onRemoveAllocation($event)"\n        [onRemoving]="onRemovingAllocation">\n        <tag-input-dropdown \n          [showDropdownIfEmpty]="true" \n          [identifyBy]="\'id\'" \n          [displayBy]="\'name\'" \n          [focusFirstElement]="true"\n          [minimumTextLength]="1"\n          [autocompleteObservable]="getAllocationUsers">\n          <ng-template let-item="item" let-index="index">\n            {{ item.name }}\n          </ng-template>\n        </tag-input-dropdown>\n      </tag-input>\n      <button ion-button full (click)="submitAllocation()">{{viewAllocated.length > 0 ? \'Re-allocate\' : \'Allocate\'}}</button>\n      <hr/>\n    </div>\n    <ion-card>\n      <ion-card-header>\n        <ion-badge class="pull-right">{{Grievance.state}}</ion-badge>\n        <ion-title>\n        {{Grievance.title}}\n        </ion-title>\n      </ion-card-header>\n      <ion-card-content>\n        <ion-list>\n          <ion-item text-wrap>\n            Category: {{Grievance.grievance_category}}\n          </ion-item>\n          <ion-item text-wrap>\n            Type: {{Grievance.grievance_type}}\n          </ion-item>\n          <ion-item *ngIf=\'viewAllocated.length > 0\' text-wrap>\n            Allocated:\n            <ion-tags-input [(ngModel)]="viewAllocated" [readonly]="true"></ion-tags-input>\n            <!-- <tag-input [(ngModel)]="Idea.tagged_users" [identifyBy]="\'id\'" [displayBy]="\'name\'" [hideForm]="true" [removable]="false"></tag-input> -->\n          </ion-item>\n          <ion-item text-wrap>\n            Details:\n            <div [innerHtml]="Grievance.content">\n              <!--{{idea.content}}-->\n            </div>\n          </ion-item>\n        </ion-list>\n      </ion-card-content>\n\n    </ion-card>\n\n    <ion-list>\n      <ion-item *ngFor="let attach of Grievance.attachment">\n        <img src="{{attach.url}}" *ngIf="attach.file_type === \'image\'" alt="{{attach.file_name}}" width="300" />\n        <a href="{{attach.url}}" *ngIf="attach.file_type !== \'image\'" padding>{{attach.file_name}}</a>\n      </ion-item>\n    </ion-list>\n\n    <hr>\n  </div>\n  <timeline endIcon="call" *ngIf="items" >\n    <timeline-item *ngFor="let item of items">\n      <timeline-time [time]="item.time"></timeline-time>\n      <ion-icon [name]="item.icon"></ion-icon>\n      <ion-card>\n\n        <ion-card-header>\n          {{item.title}}\n        </ion-card-header>\n        <ion-card-content>\n          {{item.subtitle}}\n        </ion-card-content>\n        <hr>\n        <ion-card-content>\n          {{item.content}}\n        </ion-card-content>\n      </ion-card>\n    </timeline-item>\n\n  </timeline>\n\n\n</ion-content>\n'/*ion-inline-end:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/grievance-show/grievance-show.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7_ionic_angular__["p" /* NavController */], __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["q" /* NavParams */], __WEBPACK_IMPORTED_MODULE_8__providers_data_getter_service_data_getter_service__["a" /* DataGetterServiceProvider */], __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["l" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["f" /* Events */], __WEBPACK_IMPORTED_MODULE_5__providers_data_setter_data_setter__["a" /* DataSetterProvider */],
            __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular_components_toast_toast_controller__["a" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["n" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1__providers_app_global_app_global__["a" /* AppGlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_0__ionic_native_vibration__["a" /* Vibration */]])
    ], GrievanceShowPage);
    return GrievanceShowPage;
}());

//# sourceMappingURL=grievance-show.js.map

/***/ }),

/***/ 96:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GuestLunchPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_data_getter_service_data_getter_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_app_global_app_global__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__guest_lunch_form_guest_lunch_form__ = __webpack_require__(155);
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
 * Generated class for the GuestLunchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var GuestLunchPage = /** @class */ (function () {
    function GuestLunchPage(navCtrl, navParams, dataGetterService, loadingCtrl, events, toastCtrl, appGlobal) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataGetterService = dataGetterService;
        this.loadingCtrl = loadingCtrl;
        this.events = events;
        this.toastCtrl = toastCtrl;
        this.appGlobal = appGlobal;
        this.guestLunches = [];
        this.queryText = '';
        this.events.subscribe('reload:guest-lunch', function (isNotification, id) {
            _this.refreshGuestLunchList(null);
        });
    }
    GuestLunchPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad GuestLunchPage');
    };
    GuestLunchPage.prototype.ionViewDidEnter = function () {
        this.loadGuestLunches(null);
    };
    GuestLunchPage.prototype.refreshGuestLunchList = function (reference) {
        this.loadGuestLunches(reference);
    };
    GuestLunchPage.prototype.loadGuestLunches = function (reference) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        if (reference === null) {
            loading.present();
        }
        this.dataGetterService.getAllGuestLunches().subscribe(function (data) {
            console.log("Guest Lunch Loaded", data);
            if (data.success) {
                _this.guestLunches = data.guest_lunch_requests;
            }
            else {
                _this.guestLunches = [];
            }
            loading.dismiss();
            if (reference != null) {
                reference.complete();
            }
        }, function (error) {
            console.log(error);
            _this.guestLunches = [];
            var toast = _this.toastCtrl.create({
                message: _this.appGlobal.ServerError,
                duration: 3000
            });
            toast.present();
            loading.dismiss();
            if (reference != null) {
                reference.complete();
            }
        });
    };
    GuestLunchPage.prototype.goToGuestLunchForm = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__guest_lunch_form_guest_lunch_form__["a" /* GuestLunchFormPage */]);
    };
    GuestLunchPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-guest-lunch',template:/*ion-inline-start:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/guest-lunch/guest-lunch.html"*/'<!--\n  Generated template for the GuestLunchPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Guest Lunch Requests</ion-title>\n  </ion-navbar>\n\n  <ion-toolbar no-border-top>\n    <ion-searchbar color="primary" [(ngModel)]="queryText" placeholder="Search"></ion-searchbar>\n  </ion-toolbar>\n</ion-header>\n\n\n<ion-content>\n  <ion-refresher (ionRefresh)="refreshGuestLunchList($event)">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n\n  <ion-list>\n    <ion-card\n      *ngFor="let guestLunch of guestLunches | search : {term:queryText,fields:[\'uid\',\'date_of_lunch\',\'no_of_people\']}">\n      <div class="{{\'guest_lunch_state_sidebar_\'+guestLunch.state}}">\n        <ion-card-header>\n          {{guestLunch.uid}}\n          <span class="pull-right sr-age">{{guestLunch.age}}</span>\n        </ion-card-header>\n\n        <ion-card-content>\n          <p>Date of Lunch: <strong>{{guestLunch.date_of_lunch}}</strong></p>\n          <p>No. of Guests: <strong>{{guestLunch.no_of_people}}</strong></p>\n        </ion-card-content>\n\n        <ion-row *ngIf="guestLunch.accepted">\n          <ion-col>\n            <div class="pull-right">\n              <p>Approved By: <strong>{{guestLunch.accepted_by}}</strong></p>\n            </div>\n          </ion-col>\n        </ion-row>\n\n        <ion-row>\n          <ion-col>\n            <ion-badge class="pull-right">{{guestLunch.state}}</ion-badge>\n          </ion-col>\n        </ion-row>\n      </div>\n    </ion-card>\n  </ion-list>\n  <ion-fab right bottom>\n    <button ion-fab (click)="goToGuestLunchForm()">\n      <ion-icon name="add"></ion-icon>\n    </button>\n  </ion-fab>\n</ion-content>\n'/*ion-inline-end:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/guest-lunch/guest-lunch.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_data_getter_service_data_getter_service__["a" /* DataGetterServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_app_global_app_global__["a" /* AppGlobalProvider */]])
    ], GuestLunchPage);
    return GuestLunchPage;
}());

//# sourceMappingURL=guest-lunch.js.map

/***/ }),

/***/ 98:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VisitingCardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_data_getter_service_data_getter_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_app_global_app_global__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__visiting_card_form_visiting_card_form__ = __webpack_require__(160);
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
 * Generated class for the VisitingCardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var VisitingCardPage = /** @class */ (function () {
    function VisitingCardPage(navCtrl, navParams, dataGetterService, loadingCtrl, events, toastCtrl, appGlobal) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataGetterService = dataGetterService;
        this.loadingCtrl = loadingCtrl;
        this.events = events;
        this.toastCtrl = toastCtrl;
        this.appGlobal = appGlobal;
        this.visitingCards = [];
        this.queryText = '';
        this.canCreate = false;
        this.events.subscribe('reload:visiting-card', function (isNotification, id) {
            _this.refreshVisitingCardList(null);
        });
    }
    VisitingCardPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad VisitingCardPage');
    };
    VisitingCardPage.prototype.ionViewDidEnter = function () {
        this.loadVisitingCards(null);
    };
    VisitingCardPage.prototype.refreshVisitingCardList = function (reference) {
        this.loadVisitingCards(reference);
    };
    VisitingCardPage.prototype.loadVisitingCards = function (reference) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        if (reference === null) {
            loading.present();
        }
        this.dataGetterService.getAllVisitingCards().subscribe(function (data) {
            console.log("Visiting Card Loaded", data);
            if (data.success) {
                _this.visitingCards = data.visting_card_requests;
                _this.canCreate = data.can_create;
            }
            else {
                _this.visitingCards = [];
                _this.canCreate = false;
            }
            loading.dismiss();
            if (reference != null) {
                reference.complete();
            }
        }, function (error) {
            console.log(error);
            _this.visitingCards = [];
            _this.canCreate = false;
            var toast = _this.toastCtrl.create({
                message: _this.appGlobal.ServerError,
                duration: 3000
            });
            toast.present();
            loading.dismiss();
            if (reference != null) {
                reference.complete();
            }
        });
    };
    VisitingCardPage.prototype.goToVisitingCardForm = function () {
        if (this.canCreate)
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__visiting_card_form_visiting_card_form__["a" /* VisitingCardFormPage */]);
        else {
            this.toastCtrl.create({
                message: "Can't have more than 5 open requests",
                duration: 3000
            }).present();
        }
    };
    VisitingCardPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-visiting-card',template:/*ion-inline-start:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/visiting-card/visiting-card.html"*/'<!--\n  Generated template for the VisitingCardPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Visiting Card Requests</ion-title>\n  </ion-navbar>\n\n  <ion-toolbar no-border-top>\n    <ion-searchbar color="primary" [(ngModel)]="queryText" placeholder="Search"></ion-searchbar>\n  </ion-toolbar>\n</ion-header>\n\n\n<ion-content>\n  <ion-refresher (ionRefresh)="refreshVisitingCardList($event)">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n\n  <ion-list>\n    <ion-card\n      *ngFor="let visitingCard of visitingCards | search : {term:queryText,fields:[\'uid\',\'name\',\'mobile_no\', \'landline\']}">\n      <div class="{{\'visiting_card_state_sidebar_\'+visitingCard.state}}">\n        <ion-card-header>\n          {{visitingCard.uid}}\n          <span class="pull-right sr-age">{{visitingCard.age}}</span>\n        </ion-card-header>\n\n        <ion-card-content>\n          <h1>{{visitingCard.name}}</h1>\n          <h2>{{visitingCard.designation}}</h2>\n          <h2>{{visitingCard.company_name}}</h2>\n          <hr/>\n          <p>\n            <ion-icon name="pin"></ion-icon>&nbsp;{{visitingCard.company_address}}\n          </p>\n          <p>\n            <ion-icon name="mail"></ion-icon>&nbsp;{{visitingCard.email}}\n          </p>\n          <p>\n            <ion-icon name="phone-portrait"></ion-icon>&nbsp;{{visitingCard.mobile_no}}\n          </p>\n          <p>\n            <ion-icon name="call"></ion-icon>&nbsp;{{visitingCard.landline}}\n          </p>\n        </ion-card-content>\n\n        <ion-row *ngIf="visitingCard.approved">\n          <ion-col>\n            <div class="pull-right">\n              <p>Approved By: <strong>{{visitingCard.approved_by}}</strong></p>\n            </div>\n          </ion-col>\n        </ion-row>\n\n        <ion-row>\n          <ion-col>\n            <ion-badge class="pull-right">{{visitingCard.state}}</ion-badge>\n          </ion-col>\n        </ion-row>\n      </div>\n    </ion-card>\n  </ion-list>\n  <ion-fab right bottom>\n    <button ion-fab (click)="goToVisitingCardForm()">\n      <ion-icon name="add"></ion-icon>\n    </button>\n  </ion-fab>\n</ion-content>\n'/*ion-inline-end:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/visiting-card/visiting-card.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_data_getter_service_data_getter_service__["a" /* DataGetterServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_app_global_app_global__["a" /* AppGlobalProvider */]])
    ], VisitingCardPage);
    return VisitingCardPage;
}());

//# sourceMappingURL=visiting-card.js.map

/***/ }),

/***/ 99:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MaintenanceRequestPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_user_data_ts__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_data_getter_service_data_getter_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_app_global_app_global__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__maintenance_request_form_maintenance_request_form__ = __webpack_require__(161);
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
    function MaintenanceRequestPage(navCtrl, navParams, dataGetterService, loadingCtrl, events, user, toastCtrl, appGlobal) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataGetterService = dataGetterService;
        this.loadingCtrl = loadingCtrl;
        this.events = events;
        this.user = user;
        this.toastCtrl = toastCtrl;
        this.appGlobal = appGlobal;
        this.maintenanceRequests = [];
        this.queryText = '';
        this.events.subscribe('reload:maintenance-request', function (isNotification, id) {
            _this.refreshMaintenanceRequestList(null);
        });
    }
    MaintenanceRequestPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MaintenanceRequestPage');
    };
    MaintenanceRequestPage.prototype.ionViewDidEnter = function () {
        this.loadMaintenanceRequests(null);
    };
    MaintenanceRequestPage.prototype.refreshMaintenanceRequestList = function (reference) {
        this.loadMaintenanceRequests(reference);
    };
    MaintenanceRequestPage.prototype.loadMaintenanceRequests = function (reference) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        if (reference === null) {
            loading.present();
        }
        this.dataGetterService.getAllMaintenanceRequests().subscribe(function (data) {
            // console.log("Stationery Requests Loaded", data);
            console.log("@@@@@", data.data);
            var a = true;
            if (data.success || a) {
                _this.maintenanceRequests = data.data;
            }
            else {
                _this.maintenanceRequests = [];
            }
            loading.dismiss();
            if (reference != null) {
                reference.complete();
            }
        }, function (error) {
            console.log(error);
            _this.maintenanceRequests = [];
            var toast = _this.toastCtrl.create({
                message: _this.appGlobal.ServerError,
                duration: 3000
            });
            toast.present();
            loading.dismiss();
            if (reference != null) {
                reference.complete();
            }
        });
    };
    MaintenanceRequestPage.prototype.goToMaintenanceRequestForm = function () {
        this.UserId = this.user.userData.id;
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__maintenance_request_form_maintenance_request_form__["a" /* MaintenanceRequestFormPage */], {
            Surveyor: this.UserId
        });
    };
    MaintenanceRequestPage.prototype.EditUserProfile = function (id) {
        console.log("@@@@@### @@@@@@@   :- " + id);
        console.log("@@@@@###    :- " + this.UserId);
    };
    MaintenanceRequestPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-maintenance-request',template:/*ion-inline-start:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/maintenance-request/maintenance-request.html"*/'<!--\n  Generated template for the MaintenanceRequestPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Beneficialy</ion-title>\n  </ion-navbar>\n\n  <ion-toolbar no-border-top>\n    <ion-searchbar color="primary" [(ngModel)]="queryText" placeholder="Search"></ion-searchbar>\n  </ion-toolbar>\n</ion-header>\n\n\n<ion-content>\n  <ion-refresher (ionRefresh)="refreshMaintenanceRequestList($event)">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n\n  <ion-list>\n    <ion-card\n      *ngFor="let maintenanceRequest of maintenanceRequests | search : {term:queryText,fields:[\'uid\',\'asset\',\'detail\']}"  (click)="EditUserProfile(maintenanceRequest.id)" [hidden]="maintenanceRequests.hide">\n      <div class="{{\'maintenance_request_state_sidebar_\'+maintenanceRequest.state}}">\n        <ion-card-header >\n          {{maintenanceRequest.code}} \n          <span class="pull-right sr-age"><p>Age: <strong>{{maintenanceRequest.age}}</strong></p></span>\n        </ion-card-header>\n\n        <ion-card-content>\n          <p>Name:           <strong>{{maintenanceRequest.beneficiary_name}}</strong></p>\n          <p>gender:         <strong>{{maintenanceRequest.gender}}</strong></p>\n          <p>date_of_birth:  <strong>{{maintenanceRequest.date_of_birth}}</strong></p>\n          <p>contact_number: <strong>{{maintenanceRequest.contact_number}}</strong></p>\n          <p>whatsapp_number:<strong>{{maintenanceRequest.whatsapp_number}}</strong> </p>\n          <p>household_id:   <strong>{{maintenanceRequest.household_id}}</strong> </p>\n\n        </ion-card-content>\n\n        <ion-row *ngIf="maintenanceRequest.resolved">\n          <ion-col>\n            <div class="pull-right">\n              <p>Closed By: <strong>{{maintenanceRequest.resolver}}</strong></p>\n              <p>Closed At: <strong>{{maintenanceRequest.resolved_on}}</strong></p>\n            </div>\n          </ion-col>\n        </ion-row>\n\n        <ion-row>\n          <ion-col>\n            <ion-badge class="pull-right">{{maintenanceRequest.state}}</ion-badge>\n          </ion-col>\n        </ion-row>\n      </div>\n    </ion-card>\n  </ion-list>\n  <ion-fab right bottom>\n    <button ion-fab (click)="goToMaintenanceRequestForm()">\n      <ion-icon name="add"></ion-icon>\n    </button>\n  </ion-fab>\n</ion-content>\n'/*ion-inline-end:"/home/linkwok/ionicproject/intranetmobile-1.1.0/ivdp_ionic_03012019/src/pages/maintenance-request/maintenance-request.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["p" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["q" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_data_getter_service_data_getter_service__["a" /* DataGetterServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* Events */],
            __WEBPACK_IMPORTED_MODULE_0__providers_user_data_ts__["a" /* UserData */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["s" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_app_global_app_global__["a" /* AppGlobalProvider */]])
    ], MaintenanceRequestPage);
    return MaintenanceRequestPage;
}());

//# sourceMappingURL=maintenance-request.js.map

/***/ })

},[492]);
//# sourceMappingURL=main.js.map