import {Injectable} from '@angular/core';

@Injectable()
export class AppGlobalProvider {

  applicationVersion: '1.1s';
  applicationName: any;
  isOnline: boolean = false;

  // DEVELOPMENT PROXY URLS
  // private intranetBaseURL = '';
  // private systemXBaseURL = '';


  // LOCAL URLS
  public server = 'Local';
  // private intranetBaseURL = 'http://165.227.139.76:8080/api/v1';

  
  private intranetBaseURL = 'http://172.16.17.146:8000/api/v1';
  // private intranetBaseURL = 'http://172.16.17./api/v1';
  private surveyBaseURL = 'https://deepaksurveystaging.herokuapp.com/rapidfire/surveys';
  private systemXBaseURL = 'https://system-x.herokuapp.com/api';

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

  public getLeaveApplicationsURL = this.systemXBaseURL + '/leave_application_records';
  public pendingLeaveApplicationsURL = this.systemXBaseURL + '/pending_leave_application';
  public leaveApprovalURL = this.systemXBaseURL + '/leave_approval';
  public leaveDetailsURL = this.systemXBaseURL + '/leave_application_details';
  public leaveRecordsURL = this.systemXBaseURL + '/leave_records_type';
  public checkSchemeURL = this.systemXBaseURL + '/check_scheme';
  public getHalfLeaveRecordsURL = this.systemXBaseURL + '/get_half_leave_records';
  public leaveApplicationURL = this.systemXBaseURL + '/leave_application';

  // public allSurveysURL = this.surveyBaseURL + '/all_surveys';
  public allSurveysURL = this.intranetBaseURL + '/surveys';
  public surveyURL = this.surveyBaseURL;

  public loginURL = this.intranetBaseURL + '/auth/login';
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
  public allGrievancesURL = this.intranetBaseURL + '/kyc';
  public createGrievancesURL = this.intranetBaseURL + '/kyc';
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
  public getAllMaintenanceRequests = this.intranetBaseURL + '/beneficiaries';
  public createMaintenanceRequest = this.intranetBaseURL + '/beneficiaries';

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
  public getMyAwards  = this.intranetBaseURL + "/get_user_awards"

  constructor() {
    console.log('Hello AppGlobalProvider Provider');
    
  }


  // ERRORs
  public ServerError = "We're sorry, but something went wrong.";
  public OrangeNoUserAvailable = 'No User Available';

  public vibrationTimings = 500;


  public answers  = {};

  public questionsList = [{
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
]
}
