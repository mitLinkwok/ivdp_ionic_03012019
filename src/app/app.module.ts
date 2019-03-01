import { QRScanner } from '@ionic-native/qr-scanner/ngx';

import { SearchBeneficiryPageModule } from './../pages/search-beneficiry/search-beneficiry.module';
import { DirectivesModule } from './../directives/directives.module';
import { UserblockPage } from './../pages/userblock/userblock';
import { DirectoryPage } from './../pages/directory/directory';
import { GrievanceFilterPageModule } from './../pages/grievance-filter/grievance-filter.module';
import { IdeaFilterPageModule } from './../pages/idea-filter/idea-filter.module';
import { SurveyListPageModule } from './../pages/survey-list/survey-list.module';
import { HomePageModule } from './../pages/home/home.module';
import { TutorialPageModule } from './../pages/tutorial/tutorial.module';
import { LogoutPageModule } from './../pages/logout/logout.module';
import { LoginPageModule } from './../pages/login/login.module';
import { IdeaFormPageModule } from './../pages/idea-form/idea-form.module';
import { IdeaPageModule } from './../pages/idea/idea.module';
import { GrievanceShowPageModule } from './../pages/grievance-show/grievance-show.module';
import { GrievanceFormPageModule } from './../pages/grievance-form/grievance-form.module';
import { GrievancePageModule } from './../pages/grievance/grievance.module';
import { ArticleShowPageModule } from './../pages/article-show/article-show.module';
import { ComponentsModule } from './../components/components.module';
import { ArticleIndexPageModule } from './../pages/article-index/article-index.module';
import { OfflinePageModule } from './../pages/offline/offline.module';
import { LogoutPage } from './../pages/logout/logout';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { HttpClientModule } from '@angular/common/http';
import { DataGetterServiceProvider } from '../providers/data-getter-service/data-getter-service';
import { DataSetterProvider } from '../providers/data-setter/data-setter';
import { IdeaPage } from "../pages/idea/idea";
import { IdeaFormPage } from "../pages/idea-form/idea-form";
import { GrievancePage } from "../pages/grievance/grievance";
import { GrievanceFormPage } from "../pages/grievance-form/grievance-form";
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { ImagePicker } from '@ionic-native/image-picker';
import { Crop } from '@ionic-native/crop';
import { Camera } from '@ionic-native/camera';
import { FilePath } from '@ionic-native/file-path';
import { IdeaShowPage } from "../pages/idea-show/idea-show";
import { GrievanceShowPage } from "../pages/grievance-show/grievance-show";
import { UserData } from '../providers/user-data-ts';
import { IonicStorageModule } from '@ionic/storage';
import { LoginServiceProvider } from '../providers/login-service/login-service';
import { LeaveDataProvider } from '../providers/leave-data/leave-data';
import { AppGlobalProvider } from '../providers/app-global/app-global';
import { TutorialPage } from "../pages/tutorial/tutorial";
import { ArticleIndexPage } from "../pages/article-index/article-index";
import { ArticleShowPage } from "../pages/article-show/article-show";
import { Vibration } from '@ionic-native/vibration';
import { FCM } from '@ionic-native/fcm';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { AppVersion } from '@ionic-native/app-version';
import { Network } from '@ionic-native/network';
import { IdeaShowPageModule } from '../pages/idea-show/idea-show.module';
import { SurveyListPage } from '../pages/survey-list/survey-list';
import { CalendarModule } from 'ionic2-calendar-en';
import { CommentsPageModule } from '../pages/comments/comments.module';
import { IonTagsInputModule } from "ionic-tags-input";
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectoryPageModule } from '../pages/directory/directory.module';
import { UserblockPageModule } from '../pages/userblock/userblock.module';
import { ProfilePageModule } from '../pages/profile/profile.module';
import { ProfilePage } from '../pages/profile/profile';
import { MaintenanceRequestPageModule } from "../pages/maintenance-request/maintenance-request.module";
import { MaintenanceRequestFormPageModule } from "../pages/maintenance-request-form/maintenance-request-form.module";
import { MaintenanceRequestPage } from "../pages/maintenance-request/maintenance-request";
import { MaintenanceRequestFormPage } from "../pages/maintenance-request-form/maintenance-request-form";
import { IntroPage } from '../pages/intro/intro';
import { IntroPageModule } from '../pages/intro/intro.module';
import { CallNumber } from '@ionic-native/call-number';
import { Device } from '@ionic-native/device';
import { SyncPage } from "../pages/sync/sync";
import { SyncPageModule } from "../pages/sync/sync.module";
import { BeneficiaryProfilePage } from "../pages/beneficiary-profile/beneficiary-profile"
import { BeneficiaryProfilePageModule } from "../pages/beneficiary-profile/beneficiary-profile.module"


import { SuervyPage } from "./../pages/suervy/suervy";
import { SuervyPageModule } from "./../pages/suervy/suervy.module";
import { DatabaseProvider } from '../providers/database/database';
import { SQLite } from '@ionic-native/sqlite';
import { DBmaneger } from "../providers/database/Dbmaneger"
import { TabsPage } from '../pages/tabs/tabs';
import { SearchbeneficiryPage } from '../pages/searchbeneficiry/searchbeneficiry';
import { SearchbeneficiryPageModule } from '../pages/searchbeneficiry/searchbeneficiry.module';
import { SearchBeneficiryPage } from './../pages/search-beneficiry/search-beneficiry';

import { QuestionTextboxPageModule } from './../pages/question-textbox/question-textbox.module';
import { QuestionRadiobuttonPageModule } from './../pages/question-radiobutton/question-radiobutton.module';
import { QuestionDropdownPageModule } from './../pages/question-dropdown/question-dropdown.module';
import { QuestionCheckboxPageModule } from './../pages/question-checkbox/question-checkbox.module';
import { QuestionCheckboxPage } from './../pages/question-checkbox/question-checkbox'
import { QuestionDropdownPage } from './../pages/question-dropdown/question-dropdown'
import { QuestionRadiobuttonPage } from './../pages/question-radiobutton/question-radiobutton'
import { QuestionTextboxPage } from './../pages/question-textbox/question-textbox'
import { QuestionImagePage } from './../pages/question-image/question-image'
import { QuestionImagePageModule } from './../pages/question-image/question-image.module'

import { from } from 'rxjs/observable/from';






// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    TabsPage


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
    GrievancePageModule,
    GrievanceFormPageModule,
    GrievanceShowPageModule,
    GrievanceFilterPageModule,
    IdeaPageModule,
    IdeaFormPageModule,
    IdeaShowPageModule,
    IdeaFilterPageModule,
    LoginPageModule,
    LogoutPageModule,
    OfflinePageModule,
    TutorialPageModule,
    SurveyListPageModule,
    CommentsPageModule,
    DirectoryPageModule,
    UserblockPageModule,
    SearchbeneficiryPageModule,
    SearchBeneficiryPageModule,
    QuestionCheckboxPageModule,
    QuestionDropdownPageModule,
    QuestionRadiobuttonPageModule,
    QuestionTextboxPageModule,
    QuestionImagePageModule,
    MaintenanceRequestPageModule,
    MaintenanceRequestFormPageModule,
    IonTagsInputModule,
    TagInputModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ProfilePageModule,
    DirectivesModule,
    IntroPageModule,
    SuervyPageModule,
    SyncPageModule,
    BeneficiaryProfilePageModule



  ],

  bootstrap: [IonicApp],

  entryComponents: [
    MyApp,
    HomePage,
    IdeaFormPage,
    IdeaPage,
    GrievancePage,
    GrievanceFormPage,
    TutorialPage,
    IdeaShowPage,
    GrievanceShowPage,
    LoginPage,
    LogoutPage,
    GrievanceShowPage,
    ArticleIndexPage,
    ArticleShowPage,
    SurveyListPage,
    DirectoryPage,
    UserblockPage,
    ProfilePage,
    IntroPage,
    SearchbeneficiryPage,
    SearchBeneficiryPage,
    QuestionCheckboxPage,
    QuestionDropdownPage,
    QuestionRadiobuttonPage,
    QuestionTextboxPage,
    MaintenanceRequestPage,
    MaintenanceRequestFormPage,
    SuervyPage,
    SyncPage,
    BeneficiaryProfilePage,
    QuestionImagePage
  ],
  providers: [
    // StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },

    DataGetterServiceProvider,
    DataSetterProvider,
    Device,
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
    SQLite,
    CallNumber,
    DBmaneger,
    QRScanner


  ]
})
export class AppModule {
}
