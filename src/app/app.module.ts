
import {DirectivesModule} from './../directives/directives.module';
import {UserblockPage} from './../pages/userblock/userblock';
import {DirectoryPage} from './../pages/directory/directory';
import {GrievanceFilterPageModule} from './../pages/grievance-filter/grievance-filter.module';
import {IdeaFilterPageModule} from './../pages/idea-filter/idea-filter.module';
import {SurveyListPageModule} from './../pages/survey-list/survey-list.module';
import {LeaveConfirmPageModule} from './../pages/leave-confirm/leave-confirm.module';
import {HomePageModule} from './../pages/home/home.module';
import {TutorialPageModule} from './../pages/tutorial/tutorial.module';
import {ServiceRequestShowPageModule} from './../pages/service-request-show/service-request-show.module';
import {ServiceRequestFormPageModule} from './../pages/service-request-form/service-request-form.module';
import {ServiceRequestPageModule} from './../pages/service-request/service-request.module';
import {PoliciesShowPageModule} from './../pages/policies-show/policies-show.module';
import {PoliciesPageModule} from './../pages/policies/policies.module';
import {LogoutPageModule} from './../pages/logout/logout.module';
import {LoginPageModule} from './../pages/login/login.module';
import {LeavesShowPageModule} from './../pages/leaves-show/leaves-show.module';
import {LeaveNewPageModule} from './../pages/leave-new/leave-new.module';
import {LeaveFilterPageModule} from './../pages/leave-filter/leave-filter.module';
import {LeaveDetailsPageModule} from './../pages/leave-details/leave-details.module';
import {LeaveDetailPageModule} from './../pages/leave-detail/leave-detail.module';
import {IdeaFormPageModule} from './../pages/idea-form/idea-form.module';
import {IdeaPageModule} from './../pages/idea/idea.module';
import {GrievanceShowPageModule} from './../pages/grievance-show/grievance-show.module';
import {GrievanceFormPageModule} from './../pages/grievance-form/grievance-form.module';
import {GrievancePageModule} from './../pages/grievance/grievance.module';
import {CalendarViewPageModule} from './../pages/calendar-view/calendar-view.module';
import {ArticleShowPageModule} from './../pages/article-show/article-show.module';
import {ComponentsModule} from './../components/components.module';
import {ArticleIndexPageModule} from './../pages/article-index/article-index.module';
import {OfflinePageModule} from './../pages/offline/offline.module';
import {LeaveDetailPage} from './../pages/leave-detail/leave-detail';
import {LeaveFilterPage} from './../pages/leave-filter/leave-filter';
import {LeavesShowPage} from './../pages/leaves-show/leaves-show';
import {LogoutPage} from './../pages/logout/logout';
import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {LoginPage} from '../pages/login/login';
import {SplashScreen} from '@ionic-native/splash-screen';
import {ServiceRequestPage} from "../pages/service-request/service-request";
import {HttpClient} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {CalendarViewPage} from "../pages/calendar-view/calendar-view";
import {HttpClientModule} from '@angular/common/http';
import {DataGetterServiceProvider} from '../providers/data-getter-service/data-getter-service';
import {ServiceRequestFormPage} from "../pages/service-request-form/service-request-form";
import {DataSetterProvider} from '../providers/data-setter/data-setter';
import {IdeaPage} from "../pages/idea/idea";
import {IdeaFormPage} from "../pages/idea-form/idea-form";
import {GrievancePage} from "../pages/grievance/grievance";
import {GrievanceFormPage} from "../pages/grievance-form/grievance-form";
import {ServiceRequestShowPage} from "../pages/service-request-show/service-request-show";
import {LeaveDetailsPage} from "../pages/leave-details/leave-details";
import {FileTransfer, FileTransferObject} from '@ionic-native/file-transfer';
import {File} from '@ionic-native/file';
import {ImagePicker} from '@ionic-native/image-picker';
import {Crop} from '@ionic-native/crop';
import {Camera} from '@ionic-native/camera';
import {FilePath} from '@ionic-native/file-path';
import {IdeaShowPage} from "../pages/idea-show/idea-show";
import {GrievanceShowPage} from "../pages/grievance-show/grievance-show";
import {UserData} from '../providers/user-data-ts';
import {IonicStorageModule} from '@ionic/storage';
import {LoginServiceProvider} from '../providers/login-service/login-service';
import {LeaveDataProvider} from '../providers/leave-data/leave-data';
import {LeaveNewPage} from "../pages/leave-new/leave-new";
import {AppGlobalProvider} from '../providers/app-global/app-global';
import {TutorialPage} from "../pages/tutorial/tutorial";
import {ArticleIndexPage} from "../pages/article-index/article-index";
import {ArticleShowPage} from "../pages/article-show/article-show";
import {PoliciesPage} from "../pages/policies/policies";
import {Vibration} from '@ionic-native/vibration';
import {FCM} from '@ionic-native/fcm';
import {LocalNotifications} from '@ionic-native/local-notifications';
import {AppVersion} from '@ionic-native/app-version';
import {Network} from '@ionic-native/network';
import {PoliciesShowPage} from "../pages/policies-show/policies-show";
import {IdeaShowPageModule} from '../pages/idea-show/idea-show.module';
import {SurveyListPage} from '../pages/survey-list/survey-list';
import {CalendarModule} from 'ionic2-calendar-en';
import {CommentsPageModule} from '../pages/comments/comments.module';
import {IonTagsInputModule} from "ionic-tags-input";
import {TagInputModule} from 'ngx-chips';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DirectoryPageModule} from '../pages/directory/directory.module';
import {UserblockPageModule} from '../pages/userblock/userblock.module';
import {ProfilePageModule} from '../pages/profile/profile.module';
import {ProfilePage} from '../pages/profile/profile';
import {GuestLunchPageModule} from "../pages/guest-lunch/guest-lunch.module";
import {GuestLunchPage} from "../pages/guest-lunch/guest-lunch";
import {GuestLunchFormPage} from "../pages/guest-lunch-form/guest-lunch-form";
import {GuestLunchFormPageModule} from "../pages/guest-lunch-form/guest-lunch-form.module";
import {VisitingCardPageModule} from "../pages/visiting-card/visiting-card.module";
import {VisitingCardFormPageModule} from "../pages/visiting-card-form/visiting-card-form.module";
import {VisitingCardPage} from "../pages/visiting-card/visiting-card";
import {VisitingCardFormPage} from "../pages/visiting-card-form/visiting-card-form";
import {StationeryRequestPageModule} from "../pages/stationery-request/stationery-request.module";
import {StationeryRequestFormPageModule} from "../pages/stationery-request-form/stationery-request-form.module";
import {MaintenanceRequestPageModule} from "../pages/maintenance-request/maintenance-request.module";
import {MaintenanceRequestFormPageModule} from "../pages/maintenance-request-form/maintenance-request-form.module";
import {AccessCardRequestPageModule} from "../pages/access-card-request/access-card-request.module";
import {AccessCardRequestFormPageModule} from "../pages/access-card-request-form/access-card-request-form.module";
import {StationeryRequestPage} from "../pages/stationery-request/stationery-request";
import {StationeryRequestFormPage} from "../pages/stationery-request-form/stationery-request-form";
import {MaintenanceRequestPage} from "../pages/maintenance-request/maintenance-request";
import {MaintenanceRequestFormPage} from "../pages/maintenance-request-form/maintenance-request-form";
import {AccessCardRequestPage} from "../pages/access-card-request/access-card-request";
import {AccessCardRequestFormPage} from "../pages/access-card-request-form/access-card-request-form";
import {GuestRoomRequestPageModule} from "../pages/guest-room-request/guest-room-request.module";
import {GuestRoomRequestFormPageModule} from "../pages/guest-room-request-form/guest-room-request-form.module";
import {GuestRoomRequestShowPageModule} from "../pages/guest-room-request-show/guest-room-request-show.module";
import {GuestRoomRequestPage} from "../pages/guest-room-request/guest-room-request";
import {GuestRoomRequestFormPage} from "../pages/guest-room-request-form/guest-room-request-form";
import {GuestRoomRequestShowPage} from "../pages/guest-room-request-show/guest-room-request-show";
import { IntroPage } from '../pages/intro/intro';
import { IntroPageModule } from '../pages/intro/intro.module';
import {CanteenFacilityPageModule} from "../pages/canteen-facility/canteen-facility.module";
import {CanteenFacilityPage} from "../pages/canteen-facility/canteen-facility";
import {ParakhDashboardPage} from "../pages/parakh-dashboard/parakh-dashboard";
import {ParakhDashboardPageModule} from "../pages/parakh-dashboard/parakh-dashboard.module";


import { SuervyPage } from "./../pages/suervy/suervy";
import { SuervyPageModule } from "./../pages/suervy/suervy.module";
import { DatabaseProvider } from '../providers/database/database';
import { SQLite } from '@ionic-native/sqlite';
// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule ({
  declarations: [
    MyApp,

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      preloadModules: true,
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false
    }),

    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),

    IonicStorageModule.forRoot(),
    OfflinePageModule,
    HomePageModule,
    ComponentsModule,
    CalendarModule,
    ArticleIndexPageModule,
    ArticleShowPageModule,
    CalendarViewPageModule,
    GrievancePageModule,
    GrievanceFormPageModule,
    GrievanceShowPageModule,
    GrievanceFilterPageModule,
    IdeaPageModule,
    IdeaFormPageModule,
    IdeaShowPageModule,
    IdeaFilterPageModule,
    LeaveDetailPageModule,
    LeaveDetailsPageModule,
    LeaveFilterPageModule,
    LeaveNewPageModule,
    LeavesShowPageModule,
    LoginPageModule,
    LogoutPageModule,
    OfflinePageModule,
    PoliciesPageModule,
    PoliciesShowPageModule,
    ServiceRequestPageModule,
    ServiceRequestFormPageModule,
    ServiceRequestShowPageModule,
    TutorialPageModule,
    LeaveConfirmPageModule,
    SurveyListPageModule,
    CommentsPageModule,
    DirectoryPageModule,
    UserblockPageModule,

    // Guest Lunch Request
    GuestLunchPageModule,
    GuestLunchFormPageModule,
    CanteenFacilityPageModule,

    // Visiting Card Request
    VisitingCardPageModule,
    VisitingCardFormPageModule,

    // Stationery Request
    StationeryRequestPageModule,
    StationeryRequestFormPageModule,

    // Maintenance Request
    MaintenanceRequestPageModule,
    MaintenanceRequestFormPageModule,

    // Access Card Request
    AccessCardRequestPageModule,
    AccessCardRequestFormPageModule,

    // Guest Room Request
    GuestRoomRequestPageModule,
    GuestRoomRequestFormPageModule,
    GuestRoomRequestShowPageModule,

    IonTagsInputModule,
    TagInputModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ProfilePageModule,
    DirectivesModule,
    IntroPageModule,
    ParakhDashboardPageModule,
    SuervyPageModule
   
  ],

  bootstrap: [IonicApp],

  entryComponents: [
    MyApp,
    HomePage,
    ServiceRequestPage,

    CalendarViewPage,
    ServiceRequestFormPage,
    IdeaFormPage,
    IdeaPage,
    GrievancePage,
    GrievanceFormPage,
    ServiceRequestFormPage,
    ServiceRequestShowPage,
    CalendarViewPage,
    LeaveDetailsPage,
    TutorialPage,
    LeaveDetailsPage,
    IdeaShowPage,
    GrievanceShowPage,
    PoliciesPage,
    PoliciesShowPage,
    LoginPage,
    LogoutPage,
    LeavesShowPage,
    LeaveDetailPage,
    LeaveFilterPage,
    LeaveNewPage,
    GrievanceShowPage,
    ArticleIndexPage,
    ArticleShowPage,
    SurveyListPage,
    DirectoryPage,
    UserblockPage,
    ProfilePage,
    IntroPage,

    // Guest Lunch Request
    GuestLunchPage,
    GuestLunchFormPage,

    // Visiting Card Request
    VisitingCardPage,
    VisitingCardFormPage,

    // Stationery Request
    StationeryRequestPage,
    StationeryRequestFormPage,

    // Maintenance Request
    MaintenanceRequestPage,
    MaintenanceRequestFormPage,

    // Access Card Request
    AccessCardRequestPage,
    AccessCardRequestFormPage,

    // Guest Room Request
    GuestRoomRequestPage,
    GuestRoomRequestFormPage,
    GuestRoomRequestShowPage,
    CanteenFacilityPage,
    ParakhDashboardPage,
    SuervyPage
    
   
  ],
  providers: [
    // StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},

    DataGetterServiceProvider,
    DataSetterProvider,
    FileTransferObject,
    File,
    FileTransfer,
    Camera,
    FilePath,
    InAppBrowser,
    Vibration,
    UserData,
    LoginServiceProvider,
    LeaveDataProvider,
    AppGlobalProvider,
    FCM,
    AppVersion,
    Network,
    LocalNotifications,
    ImagePicker,
    Crop,
    Camera,
    DatabaseProvider,
    SQLite
   
   
  
    
    
  ]
})
export class AppModule {
}
