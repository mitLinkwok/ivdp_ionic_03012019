import { Injectable } from '@angular/core';
import { Device } from '@ionic-native/device';


@Injectable()
export class AppGlobalProvider {

  public device_id: string


  constructor(private device: Device) {
    console.log('Hello AppGlobalProvider Provider');
    this.device_id = this.device.uuid;
  }

  applicationVersion: '1.1s';
  generatedSqlQuery: string
  applicationName: any;
  isOnline: boolean = false;

  // DEVELOPMENT PROXY URLS
  // private intranetBaseURL = '';
  // private systemXBaseURL = '';


  // LOCAL URLS
  public server = 'Local';
  private intranetBaseURL = 'http://192.168.43.228:8000/api/v1';
  private surveyBaseURL = 'https://deepaksurveystaging.herokuapp.com/rapidfire/surveys';
  private systemXBaseURL = 'https://system-x.herokuapp.com/api';

  // STAGING URLS
  // private intranetBaseURL = 'http://165.227.139.76/api/v1';
  // private surveyBaseURL = 'https://deepaksurveystaging.herokuapp.com/rapidfire/surveys';
  // private systemXBaseURL = 'https://system-x.herokuapp.com/api';


  
  public getLeaveApplicationsURL = this.systemXBaseURL + '/leave_application_records';
  public pendingLeaveApplicationsURL = this.systemXBaseURL + '/pending_leave_application';
  public leaveApprovalURL = this.systemXBaseURL + '/leave_approval';
  public leaveDetailsURL = this.systemXBaseURL + '/leave_application_details';
  public leaveRecordsURL = this.systemXBaseURL + '/leave_records_type';
  public checkSchemeURL = this.systemXBaseURL + '/check_scheme';
  public getHalfLeaveRecordsURL = this.systemXBaseURL + '/get_half_leave_records';
  public leaveApplicationURL = this.systemXBaseURL + '/leave_application';
  // public allSurveysURL = this.surveyBaseURL + '/all_surveys';
  public surveyURL = this.surveyBaseURL;
  public forgotPasswordURL = this.intranetBaseURL + '/users/forgot_password';
  public sendNotificationURL = this.intranetBaseURL + '/set_firebase_token_mobile';
  public clearNotificationURL = this.intranetBaseURL + '/delete_token';
  public loadMonthAttendance = this.intranetBaseURL + '/get_monthly_attendance';
  public attendanceURL = this.intranetBaseURL + '/get_attendance';
  public allServiceRequestsURL = this.intranetBaseURL + '/all_service_requests';
  public getServiceRequestURL = this.intranetBaseURL + '/get_service_request';
  public createServiceRequestsURL = this.intranetBaseURL + '/create_service_request';
  public allIdeaURL = this.intranetBaseURL + '/all_ideas';
  public getIdeaURL = this.intranetBaseURL + '/get_idea';
  public createIdeaURL = this.intranetBaseURL + '/create_idea';
  public allGrievancesCategoriesURL = this.intranetBaseURL + '/all_grievance_categories';
  public getHolidayListURL = this.intranetBaseURL + '/get_holiday_list';
  public uploadImageURL = this.intranetBaseURL + '/upload_image';
  public getStaticPagesURL = this.intranetBaseURL + '/get_static_pages';
  public allNotificationsURL = this.intranetBaseURL + '/all_notification';
  public getArticlesURL = this.intranetBaseURL + '/get_articles';
  public getArticleURL = this.intranetBaseURL + '/get_article';
  public changeServiceRequestStateURL = this.intranetBaseURL + '/change_service_request_state';
  public getStaticPageURL = this.intranetBaseURL + '/get_static_page'
  public snoozeNotificationURL = this.intranetBaseURL + '/snooze_notification'
  public markNotificationReadURL = this.intranetBaseURL + '/mark_notification_read'
  public setLikes = this.intranetBaseURL + '/like_item'
  public setComment = this.intranetBaseURL + '/comments'
  public getLunchStatus = this.intranetBaseURL + '/ask_for_lunch';
  public setLunchStatus = this.intranetBaseURL + '/set_lunchlist';
  public getSuggestion = this.intranetBaseURL + '/user_search';
  public setTags = this.intranetBaseURL + '/tag_users';
  public allocateUser = this.intranetBaseURL + '/allocate_users';
  public updateUserProfile = this.intranetBaseURL + '/user_update';
  public updateMenuCounts = this.intranetBaseURL + '/view_counts';
  public profilePictureImageURL = this.intranetBaseURL + '/user_image_edit';
  public setUpdatedUserProfile = this.intranetBaseURL + '/user_edit';
  public getUserProfile = this.intranetBaseURL + '/user_profile';
  // Guest Lunch Request
  public getAllGuestLunches = this.intranetBaseURL + '/all_guest_lunch_requests';
  public createGuestLunch = this.intranetBaseURL + '/create_guest_lunch_request';
  // Visiting Card Request
  public getAllVisitingCards = this.intranetBaseURL + '/all_visiting_card_requests';
  public getCompanyDetails = this.intranetBaseURL + '/get_company_details';
  public createVisitingCard = this.intranetBaseURL + '/create_visiting_card_request';
  // Stationery Request
  public getStationeries = this.intranetBaseURL + '/get_stationeries';
  public getAllStationeryRequests = this.intranetBaseURL + '/get_stationery_requests';
  public createStationeryRequest = this.intranetBaseURL + '/stationery_request';
  // Maintenance Request
  public getMaintenanceAssets = this.intranetBaseURL + '/get_maintenance_assets';
  // Access Card Request
  public getAllAccessCardRequests = this.intranetBaseURL + '/get_access_card_requests';
  public createAccessCardRequest = this.intranetBaseURL + '/access_card_request';
  // Guest Room Request
  public getRoomAddresses = this.intranetBaseURL + '/get_room_addresses';
  public getAllGuestRoomRequests = this.intranetBaseURL + '/get_room_requests';
  public createGuestRoomRequest = this.intranetBaseURL + '/room_request';
  public getGuestRoomRequest = this.intranetBaseURL + '/get_room_request';
  public getGuestLunchLocations = this.intranetBaseURL + '/all_guest_lunch_locations';
  public getGuestLunchTypes = this.intranetBaseURL + '/all_guest_lunch_types';
  public getMRLocations = this.intranetBaseURL + '/get_locations';
  public getLunchCategories = this.intranetBaseURL + '/get_lunch_categories';
  public canteenFacilityUsage = this.intranetBaseURL + '/record_canteen_usage';

  //rewards and redemption 
  public getMyAwards = this.intranetBaseURL + "/get_user_awards"

  // ERRORs
  public ServerError = "We're sorry, but something went wrong.";
  public OrangeNoUserAvailable = 'No User Available';
  public vibrationTimings = 500;
  public answers = {};
  public questionsList = [];
  public benefeciaries = [];
  public syncanswers = [];
  public synckycs = [];
  public HouseHold = [];
  public Quesion_number = 1;
  public options = [];
  public seletgroup = [];
  public selectedCheckbox = []
  public selectedCheckId = []

  public sync_status;
  public groupsurveybeneficiaries = []
  public loginURL = this.intranetBaseURL + '/auth/login';
  public getsuervyrequest = this.intranetBaseURL + '/surveys/getsurvey';
  public gethouseholdrequest = this.intranetBaseURL + '/household';
  public answersrequest = this.intranetBaseURL + '/answer/postanswers';
  // public answersrequest = "http://165.227.139.76/api/v1/answer";
  public allSurveysURL = this.intranetBaseURL + '/surveys';
  public allGrievancesURL = this.intranetBaseURL + '/kyc';
  public createGrievancesURL = this.intranetBaseURL + '/kyc';
  public getAllMaintenanceRequests = this.intranetBaseURL + '/beneficiaries';
  public getAllMaintenanceRequestspaggination = this.intranetBaseURL + '/beneficiaries?page=';
  public createMaintenanceRequest = "http://165.227.139.76:8081/api/v1/beneficiaries/postusersbeneficiary"


  public createtable = [

    "CREATE TABLE beneficiaries(id INTEGER PRIMARY KEY AUTOINCREMENT,server_id INTEGER type UNIQUE,device_id TEXT,code TEXT,beneficiary_name TEXT,gender TEXT,age NUMBER,date_of_birth TEXT,marital_status TEXT,caste TEXT,religion TEXT,primary_occupation TEXT,ownership_of_land TEXT,total_land_holding TEXT,total_family_income_average_monthly NUMBER,education_status TEXT,height_in_cms NUMBER,Weight_in_kgs NUMBER,village_id NUMBER,household_id NUMBER,family_head_id NUMBER,type_of_rationa_card TEXT,family_head_relation TEXT,contact_number NUMBER,whatsapp_number NUMBER,user_id NUMBER,created_at TIMESTAMP,updated_at TIMESTAMP,sync_status INTEGER)"
    , "CREATE TABLE kycs(id INTEGER PRIMARY KEY AUTOINCREMENT,server_id INTEGER type UNIQUE,user_id INTEGER,kyc_person_id INTEGER,kyc_person_type TEXT,kyc_name TEXT,kyc_detail TEXT,kyc_number TEXT,kyc_file TEXT,kyc_image BLOB,created_at TIMESTAMP,updated_at TIMESTAMP,device_id TEXT,sync_status INTEGER)"
    , "CREATE TABLE `survey` ( id INTEGER PRIMARY KEY AUTOINCREMENT, server_id INTEGER type UNIQUE, `project_id` INTEGER, `title` TEXT, `description` TEXT,`type` TEXT , `start_date` TEXT, `created_at` TEXT, `updated_at` TEXT,`sync_status` INTEGER )"
    , "CREATE TABLE `questions` ( `id` INTEGER PRIMARY KEY AUTOINCREMENT,`server_id` INTEGER type UNIQUE, `survey_id` INTEGER, `section_id` INTEGER, `order` INTEGER, `text` TEXT, `type` TEXT, `language_json` TEXT, `rule_json` TEXT, `created_at` TEXT, `updated_at` INTEGER ,`sync_status` INTEGER)"
    , "CREATE TABLE `options` ( `id` INTEGER PRIMARY KEY AUTOINCREMENT,`server_id` INTEGER type UNIQUE, `question_id` INTEGER, `type` TEXT, `order` INTEGER, `text` TEXT, `language_json` TEXT,`rule_json` TEXT,`created_at` TEXT, `updated_at` TEXT ,`sync_status` INTEGER)"
    , "CREATE TABLE `answers` ( `id` INTEGER PRIMARY KEY AUTOINCREMENT,`server_id` INTEGER ,`beneficiarie_id` INTEGER, `survey_id` INTEGER, `question_id` INTEGER, `language_id` INTEGER, `option_id` INTEGER, `option_text` TEXT,`image` BLOB,`other_text` TEXT, `created_at` TEXT, `updated_at` TEXT ,sync_status INTEGER)"
    , "CREATE TABLE Updated_beneficiaries(id INTEGER PRIMARY KEY AUTOINCREMENT,server_id INTEGER,device_id TEXT,code TEXT,beneficiary_name TEXT,gender TEXT,age NUMBER,date_of_birth TEXT,marital_status TEXT,caste TEXT,religion TEXT,primary_occupation TEXT,ownership_of_land TEXT,total_land_holding TEXT,total_family_income_average_monthly NUMBER,education_status TEXT,height_in_cms NUMBER,Weight_in_kgs NUMBER,village_id NUMBER,household_id NUMBER,family_head_id NUMBER,type_of_rationa_card TEXT,family_head_relation TEXT,contact_number NUMBER,whatsapp_number NUMBER,user_id NUMBER,created_at TIMESTAMP,updated_at TIMESTAMP,sync_status INTEGER)"
    , "CREATE TABLE Updated_kycs(id INTEGER PRIMARY KEY AUTOINCREMENT,server_id INTEGER,user_id INTEGER,kyc_person_id INTEGER,kyc_person_type TEXT,kyc_name TEXT,kyc_detail TEXT,kyc_number TEXT,kyc_file TEXT,kyc_image BLOB,created_at TIMESTAMP,updated_at TIMESTAMP sync_status INTEGER)"
    , "CREATE TABLE `households` (`id` INTEGER PRIMARY KEY AUTOINCREMENT,`server_id` INTEGER type UNIQUE,`village_id` NUMBER,`user_id` NUMBER,`hh_number` NUMBER,`faliya_name` TEXT,`landmark` TEXT,`sync_status` INTEGER,`qrcode` TEXT)"
    , "CREATE TABLE `villages`(`id` INTEGER PRIMARY KEY AUTOINCREMENT,`server_id` INTEGER,`talukablock_id` INTEGER,`name` TEXT,`sync_status` INTEGER)"
    , "CREATE TABLE `talukas`(`id` INTEGER PRIMARY KEY AUTOINCREMENT,`server_id` INTEGER,`parent_id` INTEGER,`district_id` INTEGER,`name` TEXT,`sync_status` INTEGER)"


  ]
  public actual = 0;
  public insertcountbene = 0;
  public total = 0;
  public actual_hh = 0;
  public total_househ = 0

}


