import { QuestionTextboxPage } from './../pages/question-textbox/question-textbox';
import { SearchBeneficiryPage } from './../pages/search-beneficiry/search-beneficiry';
//import { DatabaseProvider } from './../providers/database/database';
import { UserblockPage } from './../pages/userblock/userblock';
//import { DirectoryPage } from './../pages/directory/directory';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { SurveyListPage } from './../pages/survey-list/survey-list';
import { SearchbeneficiryPage } from '../pages/searchbeneficiry/searchbeneficiry';
import { ArticleShowPage } from './../pages/article-show/article-show';
import { GrievanceShowPage } from './../pages/grievance-show/grievance-show';
import { IdeaShowPage } from './../pages/idea-show/idea-show';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { OfflinePage } from './../pages/offline/offline';
import { Network } from '@ionic-native/network';
import { AppVersion } from '@ionic-native/app-version';
import { Vibration } from '@ionic-native/vibration';
//import { ArticleIndexPage } from './../pages/article-index/article-index';
import { DataSetterProvider } from './../providers/data-setter/data-setter';
import { LogoutPage } from './../pages/logout/logout';
import { SyncPage } from './../pages/sync/sync';
import { Component, ViewChild } from '@angular/core';
import { App, Events, Nav, Platform, Config, ToastController, MenuController, Content } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { TranslateService } from '@ngx-translate/core';


//import { GrievancePage } from "../pages/grievance/grievance";
import { LoginPage } from '../pages/login/login';
import { UserData } from '../providers/user-data-ts';
import { FCM } from "@ionic-native/fcm";
import { AppGlobalProvider } from "../providers/app-global/app-global";
import { DataGetterServiceProvider } from '../providers/data-getter-service/data-getter-service';
import * as _ from "lodash";
import { ProfilePage } from '../pages/profile/profile';
import { MaintenanceRequestPage } from "../pages/maintenance-request/maintenance-request";







export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;
  countName?: any;
}


@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Content) content: Content;
  @ViewChild(Nav) nav: Nav;

  loggedInPages: PageInterface[] = [
    { title: 'Dashboard', name: 'HomePage', component: HomePage, icon: 'home' }
  ];
  // { title: 'Beneficiary', name: "IdeaPage", component: MaintenanceRequestPage, icon: 'people', countName: 'Idea' },
  // { title: 'Surveys', name: "SurveyListPage", component: SurveyListPage, icon: 'list-box' },
  myVoicePages: PageInterface[] = [
    { title: 'Beneficiary', name: "SearchbeneficiryPage", component: SearchbeneficiryPage, icon: 'people', countName: 'Idea' },

    { title: 'Search', name: "Search", component: SearchBeneficiryPage, icon: 'search' },
    { title: 'Surveys', name: "SurveyListPage", component: SurveyListPage, icon: 'list-box' }

  ];
  //{ title: 'KYC', name: "GrievancePage", component: GrievancePage, icon: 'body', countName: 'Grievance' }

  loggedOutPages: PageInterface[] = [
    { title: 'Sync', name: 'SyncPage', component: SyncPage, icon: 'sync' },
    { title: 'Logout', name: 'LogoutPage', component: LogoutPage, icon: 'log-out', logsOut: true }


  ];

  rootPage: any;
  applicationVersion: any;
  username: any;
  userprofile: any;
  lastBack: any;
  allowClose: any;
  pagesCounts: any = [];
  userprofile_sample: any = "assets/img/user_sample.jpg"
  constructor(private translate: TranslateService,
    public app: App,
    public platform: Platform,
    public splashScreen: SplashScreen,
    private config: Config,
    public plt: Platform,
    public events: Events,
    public userData: UserData,
    public fcm: FCM,
    private localNotifications: LocalNotifications,
    public appGlobal: AppGlobalProvider,
    public dataGetter: DataGetterServiceProvider,
    public dataSetter: DataSetterProvider,
    public vibrationCtrl: Vibration,
    public toastCtrl: ToastController,
    public appVersion: AppVersion,
    public network: Network,
    public menuCtrl: MenuController,
    public alertCtrl: AlertController
  ) {

    this.userData.getHasLoggedIn().then((hasLoggedIn) => {
      if (hasLoggedIn) {
        console.log("HASLOGGEDIN TOKEN SEND");
        this.dataSetter.sendNotificationToken();
        this.rootPage = HomePage;
      } else {
        this.rootPage = LoginPage;
      }
      this.initializeApp();
    });

    this.listenToLoginEvents();

    this.events.subscribe('app:setRootAsHome', () => {
      this.openPage(this.loggedInPages[0]);
    });

    this.events.subscribe('userdata:changed', () => {
      this.username = this.userData.userData.name;
      this.userprofile = this.userData.userData.profile;
    });
    // used for an example of ngFor and navigation
  }

  openProfile() {
    console.log("openProfile");

    this.nav.push(ProfilePage).catch((err: any) => {
      console.log(`Didn't set nav root: ${err}`);
    });

    // this.openPage({
    //   title: 'Profile',
    //   name: 'ProfilePage',
    //   component: ProfilePage,
    //   icon: 'home'
    // });
  }


  initAppVersion() {
    this.appVersion.getVersionNumber().then((data: any) => {
      console.log("Application Version", data);
      this.applicationVersion = data;
      this.appGlobal.applicationVersion = data;
      this.applicationVersion = "1.1s";
      this.appGlobal.applicationVersion = "1.1s";

    });

    this.appVersion.getAppName().then((data: any) => {
      console.log("Application Name", data);
      this.appGlobal.applicationName = data;
    });
  }

  initializeFCM() {
    if (this.platform.is('android') || this.platform.is('ios')) {
      console.log("CORDOVA DETECTED", this.platform.platforms());

      this.fcm.getToken().then((token: any) => {
        console.log("TOKEN:", token);
        if (token !== null) {
          this.userData.setUserFCMToken(token);
        }
      });

      this.fcm.onTokenRefresh().subscribe(token => {
        console.log("TOKEN REFRESHED:", token);
        if (this.userData.fcmToken !== token) {
          this.userData.setUserFCMToken(token);
          this.userData.setUserFCMTokenStatus(false);
        }
      });

      this.fcm.onNotification().subscribe(data => {
        console.log("Notification", data);
        if (data.wasTapped) {
          console.log("Received in background", JSON.stringify(data));
          this.processNotification(data);
        } else {
          console.log("Received in foreground", JSON.stringify(data));
          this.localNotifications.schedule({
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
  }

  processNotification(data: any) {

    let page, reloadType;
    switch (data.type) {
      case "idea":
        page = IdeaShowPage;
        reloadType = 'reload:ideaShow';
        break;
      case "grievance":
        page = GrievanceShowPage;
        reloadType = 'reload:grievanceShow';
        break;
      case "cms":
        page = ArticleShowPage;
        reloadType = 'reload:articleShow';
        break;
      case "maintenance_requests":
        page = MaintenanceRequestPage;
        reloadType = 'reload:maintenance-request';
        break;


      default:
        console.log("Notification TYPE NOT FOUND");
        break;
    }
    if (page) {
      if (this.nav.getActive().instance instanceof page) {
        this.events.publish(reloadType, true, data.uid);
      } else {
        this.nav.push(page, { isNotification: true, id: data.uid });
      }
    }
  }

  ngAfterViewInit() {
    this.nav.viewDidEnter.subscribe((view) => {
      this.applicationVersion = "1.1s";
      this.appGlobal.applicationVersion = "1.1s";
      console.log("viewDidEnter", view.instance);
      let pageName = view.instance;
      if (!(pageName instanceof LoginPage) && !(pageName instanceof OfflinePage) && !(pageName instanceof UserblockPage)) {
        //this.updateMenuCounts();
        //this.updateUserProfile();
        this.username = this.userData.userData.name;
        this.userprofile = this.userData.userData.profile;
        if (this.userData.userData.new_user) {
          this.nav.setRoot(UserblockPage);
        }
        // this.askForLunch();
      }
      //if (!this.appGlobal.isOnline ) {
      if (false) {
        // if (pageName instanceof this.rootPage) {
        //   this.nav.push(OfflinePage);
        // }
      }
      if (pageName instanceof LoginPage || pageName instanceof OfflinePage || pageName instanceof UserblockPage) {
        this.menuCtrl.swipeEnable(false);
      } else {
        this.menuCtrl.swipeEnable(true);
      }
    });
  }

  updateMenuCounts() {
    this.dataGetter.updateMenuCounts().subscribe((data: any) => {
      console.log('Update Menu Counts', data);
      if (data.success) {
        this.pagesCounts = data.data;
        // this.pagesCounts = [
        //   { "name": "ServiceRequest", "count": Math.floor((Math.random() * 30) + 1) },
        //   { "name": "Idea", "count": Math.floor((Math.random() * 30) + 1) },
        //   { "name": "Articles", "count": Math.floor((Math.random() * 30) + 1) },
        //   { "name": "Grievance", "count": Math.floor((Math.random() * 30) + 1) }
        // ];
        // console.log('Update Menu Counts------------', this.pagesCounts);
      }
    }, (error: any) => {
      console.log("Update Menu Counts", error);
    });
  }

  getCount(countName) {
    let object: any = _.find(this.pagesCounts, { name: countName });
    if (object !== undefined) {
      return object.count;
    } else {
      return 0;
    }
  }

  askForLunch() {
    this.dataGetter.getLunchStatus().subscribe((data: any) => {
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
    }, err => {
      console.log(err);
    });
  }

  updateUserProfile() {
    this.dataGetter.updateUserProfile({
      updated_at: this.userData.userData.updated_at
    }).subscribe((data: any) => {
      console.log('Get User Status', data);
      if (data.success) {
        this.userData.setUserData(data);
        this.username = data.name;
        this.userprofile = data.profile;
        console.log("isNewUser", data.new_user);
        if (data.new_user) {
          this.nav.setRoot(UserblockPage);
        }
      }
    }, (error: any) => {
      console.log("updateUserProfile", error);
    });
  }

  listenToNetworkEvents() {
    console.log("listenToNetworkEvents");

    this.network.onDisconnect().subscribe(() => {
      console.log('network was disconnected :-(');
      console.log("onDisconnect", this.appGlobal.isOnline);
      if (this.appGlobal.isOnline) {
        this.appGlobal.isOnline = false;
        //this.nav.push(OfflinePage);
      }
    });

    this.network.onConnect().subscribe(() => {
      console.log('network connected!');
      // We just got a connection but we need to wait briefly
      // before we determine the connection type. Might need to wait.
      // prior to doing any api requests as well.
      setTimeout(() => {
        console.log("NETWORK TYPE", this.network.type);
        if (this.network.type !== 'none') {
          console.log('we got a wifi connection, woohoo!');
          console.log("isOnline", this.appGlobal.isOnline);

          if (!this.appGlobal.isOnline) {
            this.appGlobal.isOnline = true;
            console.log("Can Go Back", this.nav.canGoBack());
            if (this.nav.canGoBack()) {
              this.nav.pop();
            } else {
              this.events.publish('app:setRootAsHome');
            }
          }
        }
      }, 3000);
    });

    if (this.network.type !== 'none') {
      console.log("listenToNetworkEvents ONline");
      this.appGlobal.isOnline = true;
    }
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();

    if (browserLang) {
      if (browserLang === 'zh') {
        const browserCultureLang = this.translate.getBrowserCultureLang();

        if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
          this.translate.use('zh-cmn-Hans');
        } else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
          this.translate.use('zh-cmn-Hant');
        }
      } else {
        this.translate.use(this.translate.getBrowserLang());
      }
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });

  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.initAppVersion();
      // this.initBackgroundGeolocation();
      //this.listenToNetworkEvents();
      this.initializeFCM();
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.platform.registerBackButtonAction(() => {
        const overlay = this.app._appRoot._overlayPortal.getActive();
        const modal = this.app._appRoot._modalPortal.getActive();
        const nav = this.nav;
        const view = this.nav.getActive();
        const closeDelay = 2000;
        const spamDelay = 500;

        if (modal && modal.dismiss) {
          modal.dismiss();
        } else if (overlay && overlay.dismiss) {
          overlay.dismiss();
        } else if (nav.canGoBack()) {
          nav.pop();
        } else if (!(view.instance instanceof HomePage) && !(view.instance instanceof LoginPage)) {
          this.openPage(this.loggedInPages[0]);
        } else if (Date.now() - this.lastBack > spamDelay && !this.allowClose) {
          this.allowClose = true;
          let toast = this.toastCtrl.create({
            message: this.translate.instant("Press back button again to exit"),
            duration: closeDelay,
            dismissOnPageChange: true
          });
          toast.onDidDismiss(() => {
            this.allowClose = false;
          });
          toast.present();
        } else if (Date.now() - this.lastBack < closeDelay && this.allowClose) {
          this.platform.exitApp();
        }
        this.lastBack = Date.now();
      });
    });
    this.initTranslate();
  }

  // openPage(page) {
  //   // Reset the content nav to have just this page
  //   // we wouldn't want the back button to show in this scenario
  //   this.nav.setRoot(page.component);
  // }

  openPage(page: PageInterface) {
    let params = {};

    if (page.logsOut === true) {
      this.dataSetter.sendNotificationClear();
      this.userData.setUserFCMTokenStatus(false);
      this.userData.logout();
    } else {
      this.nav.setRoot(page.component, params).catch((err: any) => {
        console.log(`Didn't set nav root: ${err}`);
      });
    }
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      const toast = this.toastCtrl.create({
        message: 'Logged In Successfully.',
        duration: 3000
      });
      toast.present();
      if (this.platform.is('android') || this.platform.is('ios')) {
        this.fcm.getToken().then((token: any) => {
          console.log("TOKEN:", token);
          if (token !== null) {
            this.userData.setUserFCMToken(token);
            console.log("LOGIN TOKEN SEND");
            this.dataSetter.sendNotificationToken();
          }
        });
      }
      this.rootPage = HomePage;
      this.content.scrollToTop();
    });

    this.events.subscribe('user:logout', () => {
      this.username = '';
      this.userprofile = '';
      this.vibrationCtrl.vibrate(1000);
      const toast = this.toastCtrl.create({
        message: 'Logged Out Successfully.',
        duration: 3000
      });
      toast.present();
      // this.backgroundGeolocation.stop();
      this.rootPage = LoginPage;
      this.content.scrollToTop();
    });

    this.events.subscribe('fcmToken:changed', () => {
      console.log("TOKEN CHANGED & SENDING");

      this.dataSetter.sendNotificationToken();
    });

    this.events.subscribe('fcm_token:sent', () => {
      this.userData.setUserFCMTokenStatus(true);
    });
  }

  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNavs()[0];

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
  }

  // initBackgroundGeolocation(){
  //   const config: BackgroundGeolocationConfig = {
  //     desiredAccuracy: 0,
  //     stationeryRadius: 2,
  //     distanceFilter: 10,
  //     debug: true, //  enable this hear sounds for background-geolocation life-cycle.
  //     stopOnTerminate: false, // enable this to clear background location settings when the app terminates
  //     startOnBoot: true, //ANDROID ONLY
  //     // startForeground: true, //ANDROID ONLY
  //     interval: 60000, //ANDROID ONLY
  //     pauseLocationUpdates: false, //IOS ONLY
  //     // url: this.appGlobal.location,
  //     // syncUrl: this.appGlobal.location,
  //     syncThreshold:5000,
  //     httpHeaders: {
  //       'Authorization': 'Token token=' + this.userData.userData.auth_token,
  //       'Version': this.appGlobal.applicationVersion
  //     },

  //   };

  //   this.backgroundGeolocation.configure(config)
  //     .subscribe((location: BackgroundGeolocationResponse) => {

  //       console.log(location);

  //       this.backgroundGeolocation.finish();
  //     });
  // }
}
