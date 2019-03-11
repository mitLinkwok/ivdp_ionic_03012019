
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppGlobalProvider } from "../../providers/app-global/app-global";
import { Events, IonicPage, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';



/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const DATABASENAME: string = 'ivdp.db'
@Injectable()
export class DatabaseProvider {
  public dbobject: any;
  public db: null
  public total_beneficialy: string;
  public total_Hh: number;
  public total_surveys: string;
  public offlineCase: any = [];
  public offlineCasekycs: any = [];
  public isinsertstatus: boolean;
  counter = 0;
  constructor(public http: HttpClient,
    public database: SQLite,
    public platform: Platform,
    public appGlobal: AppGlobalProvider,
    public loadingCtrl: LoadingController,
    public events: Events,
    public toastCtrl: ToastController,


  ) {


    if (this.platform.is('cordova')) {
      this.database.create({
        name: DATABASENAME,
        location: "default"
      }).then((db: SQLiteObject) => {
        this.dbobject = db;
        console.log("open DB");
        this.createtable();
      })
    } else {
      console.log("error in finding plat form !!!!!")
    }


  }
  public createtable() {
    for (let i = 0; i <= this.appGlobal.createtable.length; i++) {
      console.log("query in arry : -" + this.appGlobal.createtable[i]);

      this.dbobject.executeSql(this.appGlobal.createtable[i], {})
        .then((data) => {
          console.log(JSON.stringify(data));
        }, (error) => {
          console.log(JSON.stringify(error));
        });

    }

  }

  // --------------------------load-from-api------------------------
  public insertbeneficiarydata(objCase: any) {
    return new Promise((resolve, reject) => {
      this.dbobject.executeSql("select server_id from beneficiaries where server_id = ? and code = ?  ", [objCase.id, objCase.code])
        .then((data) => {
          if (data.rows.length == 0 && objCase.id != undefined && objCase.id != null && objCase != undefined) {
            this.dbobject.executeSql("INSERT INTO beneficiaries  (server_id,device_id,code,beneficiary_name,gender,age,date_of_birth,marital_status,caste,religion,primary_occupation,ownership_of_land,total_land_holding,total_family_income_average_monthly,education_status,height_in_cms,Weight_in_kgs,village_id,household_id,family_head_id,type_of_rationa_card,family_head_relation,contact_number,whatsapp_number,user_id,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
              [objCase.id, this.appGlobal.device_id, objCase.code, objCase.b_name, objCase.gender, objCase.age, objCase.date_of_birth, objCase.marital_status, objCase.caste, objCase.religion, objCase.primary_occupation, objCase.ownership_of_land, objCase.total_land_holding, objCase.total_family_income_average_monthly, objCase.education_status, objCase.height_in_cms, objCase.Weight_in_kgs, objCase.village_id, objCase.household_id, objCase.family_head_id, objCase.type_of_rationa_card, objCase.family_head_relation, objCase.contact_number, objCase.whatsapp_number, objCase.user_id, objCase.created_at, objCase.updated_at])
              .then((data) => {
                resolve(data);
                console.log("INSERTED: insertCase" + JSON.stringify(data));
                this.appGlobal.insertcountbene = this.appGlobal.insertcountbene + 1;
              }, (error) => {
                reject(error);
                 this.appGlobal.actual = this.appGlobal.actual - 1
                //this.appGlobal.insertcountbene = this.appGlobal.insertcountbene - 1;
                console.log("ERROR: insertCase" + JSON.stringify(error));
              });
          } else {
            this.appGlobal.actual = this.appGlobal.actual - 1
            console.log("condiction is not full fill")
          }

        }, (error) => {
          console.log(JSON.stringify(error));
        });

    });
  }
  public insertkycsdatafromapi(objCase: any) {
    return new Promise((resolve, reject) => {
      this.dbobject.executeSql("INSERT INTO kycs(server_id,user_id,kyc_person_id,kyc_person_type,kyc_name,kyc_detail,kyc_number,kyc_file,kyc_image,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
        [objCase.id, objCase.user_id, objCase.kyc_person_id, objCase.kyc_person_type, objCase.kyc_name, objCase.kyc_detail, objCase.kyc_number, objCase.kyc_file, objCase.kyc_image, objCase.created_at, objCase.updated_at])
        .then((data) => {
          resolve(data);
          console.log("insert Successfully kycs main")

        }, (error) => {
          reject(error);

          console.log("ERROR IN GETTING KYC: insertCase" + JSON.stringify(error));
        });
    });
  }
  public insertsurveydata(objCase: any) {
    return new Promise((resolve, reject) => {
      this.dbobject.executeSql("select * from  `survey` where  `server_id` =?  and `title`=? and `description`=? ", [objCase.id, objCase.title, objCase.description])
        .then((data) => {
          console.log("   check surveys     " + data.rows.length);
          if (data.rows.length == 0) {
            console.log("   check surveys     " + data.rows.length);
            this.dbobject.executeSql("INSERT INTO `survey`(`server_id`,`project_id`,`title`,`description`,`type`,`start_date`,`created_at`,`updated_at`) VALUES (?,?,?,?,?,?,?,?)",
              [objCase.id, objCase.project_id, objCase.title, objCase.description, objCase.type, objCase.start_date, objCase.created_at, objCase.updated_at])
              .then((data) => {
                resolve(data);
                console.log("insert Survey Successfully")
              }, (error) => {
                reject(error);
                console.log("ERROR IN GETTING SURVEY: insertCase" + JSON.stringify(error));
              });
          }
          else {
            console.log("alredy")
          }
        }, (error) => {
          console.log(JSON.stringify(error))
        });
    });
  }
  public insertQuestinsdata(objCase: any) {
    return new Promise((resolve, reject) => {
      this.dbobject.executeSql("select * from  `questions` where  `server_id` =? ", [objCase.id])
        .then((data) => {
          if (data.rows.length == 0) {
            this.dbobject.executeSql("INSERT INTO `questions`(`server_id`,`survey_id`,`section_id`,`order`,`text`,`type`,`language_json`,`rule_json`,`created_at`,`updated_at`) VALUES (?,?,?,?,?,?,?,?,?,?)",
              [objCase.id, objCase.survey_id, objCase.section_id, objCase.order, objCase.text, objCase.type, objCase.language_json, objCase.rule_json, objCase.created_at, objCase.updated_at])
              .then((data) => {
                console.log("insert Questions Successfully")
                resolve(data);
              }, (error) => {
                reject(error);
                console.log("ERROR IN GETTING QUESTIONS" + JSON.stringify(error));
              });
          }
        }, (error) => {
          console.log(error)
        });
    });
  }

  public insertvillages(objCase: any) {
    return new Promise((resolve, reject) => {
      this.dbobject.executeSql("INSERT INTO `villages`( `server_id`,`talukablock_id`,`name`) VALUES(?,?,?)", [objCase.id, objCase.talukablock_id, objCase.name])
        .then((data) => {
          console.log("insert Questions Successfully")
          resolve(data);
        }, (error) => {
          reject(error);
          console.log("ERROR IN GETTING QUESTIONS" + JSON.stringify(error));
        });
    });
  }

  public insertoptions(objCase: any) {
    return new Promise((resolve, reject) => {
      this.dbobject.executeSql("INSERT INTO `options`( `server_id`,`question_id`,`type`,`order`,`text`,`language_json`,`created_at`,`updated_at`,'sync_status') VALUES(?,?,?,?,?,?,?,?,?)", [objCase.id, objCase.question_id, objCase.type, objCase.order, objCase.text, objCase.language_json, objCase.created_at, objCase.updated_at, 0])
        .then((data) => {

          console.log("insert options Successfully")
          resolve(data);

        }, (error) => {
          reject(error);
          console.log("ERROR IN GETTING QUESTIONS" + JSON.stringify(error));
        });
    });
  }


  public inserthouseholds(objCase: any) {
    return new Promise((resolve, reject) => {
      this.dbobject.executeSql("select server_id from `households` where server_id = ? ", [objCase.id])
        .then((data) => {
          if (data.rows.length == 0 && objCase.id != undefined && objCase.id != null && objCase != undefined) {
            this.dbobject.executeSql("INSERT INTO `households`(`server_id`,`village_id`,`user_id`,`hh_number`,`faliya_name`,`landmark`) VALUES(?,?,?,?,?,?)", [objCase.id, objCase.village_id, objCase.user_id, objCase.hh_number, objCase.faliya_name, objCase.landmark])
              .then((data) => {
                console.log("insert household Successfully")
                resolve(data);
              }, (error) => {
                reject(error);
                console.log("ERROR IN GETTING household" + JSON.stringify(error));
              });
          }
        });
    });
  }
  public inserttalukas(objCase: any) {
    return new Promise((resolve, reject) => {
      this.dbobject.executeSql("INSERT INTO `talukas`( `server_id`,`parent_id`,`district_id`,`name`) VALUE(?,?,?,?,?,?)", [objCase.id, objCase.parent_id, objCase.district_id, objCase.name])
        .then((data) => {
          console.log("insert Questions Successfully")
          resolve(data);

        }, (error) => {
          reject(error); `landmark`
          console.log("ERROR IN GETTING QUESTIONS" + JSON.stringify(error));
        });
    });
  }


  // ------------------------------------------------close----------------------------------------------

  // ------------------------GETLOD-BENEFICIARY-----------------------------
  public getbeneficiarydata(ev, cb, t) {
    let query = '';
    query = 'SELECT * FROM beneficiaries ORDER BY id DESC LIMIT 100  '
    this.dbobject.executeSql(query, {})
      .then((data) => {
        this.offlineCase = []
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            this.offlineCase.push({
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
          cb(t)
        } else {
          console.log("error in getting beneficiary data from database !!!!")
          this.offlineCase = []
        }
      }, (error) => {
        console.log("ERROR : getAllCase " + JSON.stringify(error));

      });
  }
  // ------------------------------------CLOSE---------------------------------

  // this.dbobject.executeSql("INSERT INTO kycs(server_id,user_id,kyc_person_id,kyc_person_type,kyc_name,kyc_detail,kyc_number,kyc_file,kyc_image,created_at,updated_at,sync_status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
  //       [autoincrement_id, objCase.user_id,autoincrement_id, objCase.kyc_person_type, objCase.kyc_name, objCase.kyc_detail, objCase.kyc_number, objCase.kyc_file, objCase.kyc_image, objCase.created_at, objCase.updated_at, 0])







  public insertkycsdata(objCase: any, beneficiary_id: string, autoincrement_id: string) {
    if (beneficiary_id == null && beneficiary_id == undefined) {
      objCase.id = this.appGlobal.device_id;
      objCase.kyc_person_id = this.appGlobal.device_id;
    }
    return new Promise((resolve, reject) => {
      this.dbobject.executeSql("INSERT INTO kycs(user_id,kyc_person_id,kyc_person_type,kyc_name,kyc_detail,kyc_number,kyc_file,kyc_image,created_at,updated_at,device_id,sync_status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
        [objCase.user_id, autoincrement_id, objCase.kyc_person_type, objCase.kyc_name, objCase.kyc_detail, objCase.kyc_number, objCase.kyc_file, objCase.kyc_image, objCase.created_at, objCase.updated_at, this.appGlobal.device_id, 0])
        .then((data) => {
          resolve(data);
          alert("insert kyc successfully")
          return true
        }, (error) => {
          reject(error);
          console.log("ERROR IN GETTING KYC: insertCase" + JSON.stringify(error));
          return false
        });
    });
  }





  public insertnewbeneficiary(objCase: any, timestamp: string) {
    return new Promise((resolve, reject) => {
      this.dbobject.executeSql("INSERT INTO Updated_beneficiaries (server_id,device_id,code,beneficiary_name,gender,age,date_of_birth,marital_status,caste,religion,primary_occupation,ownership_of_land,total_land_holding,total_family_income_average_monthly,education_status,height_in_cms,Weight_in_kgs,village_id,household_id,family_head_id,type_of_rationa_card,family_head_relation,contact_number,whatsapp_number,user_id,created_at,updated_at,sync_status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [objCase.id, this.appGlobal.device_id, objCase.code, objCase.beneficiary_name, objCase.gender, objCase.age, objCase.date_of_birth, objCase.marital_status, objCase.caste, objCase.religion, objCase.primary_occupation, objCase.ownership_of_land, objCase.total_land_holding, objCase.total_family_income_average_monthly, objCase.education_status, objCase.height_in_cms, objCase.Weight_in_kgs, objCase.village_id, objCase.household_id, objCase.family_head_id, objCase.type_of_rationa_card, objCase.family_head_relation, objCase.contact_number, objCase.whatsapp_number, objCase.user_id, timestamp, objCase.updated_at, 0])
        .then((data) => {
          this.insertMainbeneficiary(objCase, timestamp)
          resolve(data);
          console.log("INSERTED: insertCase" + JSON.stringify(data));

        }, (error) => {
          reject(error);
          console.log("ERROR: insertCase" + JSON.stringify(error));
          this.isinsertstatus = false

        });
    });

  }

  public insertMainbeneficiary(objCase: any, timestamp: string) {
    return new Promise((resolve, reject) => {
      this.dbobject.executeSql("INSERT INTO beneficiaries (server_id,device_id,code,beneficiary_name,gender,age,date_of_birth,marital_status,caste,religion,primary_occupation,ownership_of_land,total_land_holding,total_family_income_average_monthly,education_status,height_in_cms,Weight_in_kgs,village_id,household_id,family_head_id,type_of_rationa_card,family_head_relation,contact_number,whatsapp_number,user_id,created_at,updated_at,sync_status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [objCase.id, this.appGlobal.device_id, objCase.code, objCase.beneficiary_name, objCase.gender, objCase.age, objCase.date_of_birth, objCase.marital_status, objCase.caste, objCase.religion, objCase.primary_occupation, objCase.ownership_of_land, objCase.total_land_holding, objCase.total_family_income_average_monthly, objCase.education_status, objCase.height_in_cms, objCase.Weight_in_kgs, objCase.village_id, objCase.household_id, objCase.family_head_id, objCase.type_of_rationa_card, objCase.family_head_relation, objCase.contact_number, objCase.whatsapp_number, objCase.user_id, timestamp, objCase.updated_at, 0])
        .then((data) => {
          alert("Insert new Beneficiary successfully")
          resolve(data);
          return true
        }, (error) => {
          reject(error);
          console.log("ERROR: insertCase" + JSON.stringify(error));
          return false
        });
    });
  }

  public getKycsdata(kyc_person_id: string, autoincrement_id: string, cb, t) {
    console.log("@@@@@@@@@@@@    " + autoincrement_id + "      kyc_person_id          " + kyc_person_id)
    let query = 'SELECT * FROM kycs WHERE kyc_person_id = ?';
    if (kyc_person_id == null && kyc_person_id == undefined) {
      kyc_person_id = this.appGlobal.device_id;
    }
    this.offlineCasekycs = [];
    this.dbobject.executeSql(query, [autoincrement_id])
      .then((data) => {
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            this.offlineCasekycs.push({
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
            cb(t)
          }
        } else {
          console.log("No kyc data In record")
        }
      }, (error) => {
        console.log("ERROR: getAllCase " + JSON.stringify(error));
      });
  }



  public getsureydatalode(cb, t) {
    let query = '';
    query = 'SELECT * FROM survey ORDER BY server_id ASC';
    this.offlineCase = [];
    this.dbobject.executeSql(query, {})
      .then((data) => {
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            console.log(JSON.stringify(data.rows.item(i)))
            this.offlineCase.push({
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
        } else { console.log("error in getting survey data from database !!!!") }
      }, (error) => {
        console.log("ERROR: getAllCase @@@@@ survey " + JSON.stringify(error));
      });
  }

  public getQuestionsfroloddata(survey_id: any, cal, t) {
    let query = '';
    query = 'SELECT * FROM questions WHERE survey_id = ? ';
    this.dbobject.executeSql(query, [survey_id])
      .then((data) => {
        this.appGlobal.questionsList = [];
        if (data.rows.length > 0) {
          for (var i = 0; i <= data.rows.length; i++) {
            this.appGlobal.questionsList.push({
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
          cal(t)
        } else {
          this.appGlobal.questionsList = [];
        }
      }, (error) => {
        console.log("ERROR: getAllCase @@@@@ survey " + JSON.stringify(error));
      });
  }

  public insertAnswer(objCase: any) {

    for (let i = 0; i < this.appGlobal.selectedCheckbox.length; i++) {
      objCase.server_id = this.appGlobal.selectedCheckbox[i];
      objCase.beneficiarie_id = this.appGlobal.selectedCheckId[i];
      this.insertseprateAns(objCase)
      console.log("server  ID     " + objCase.server_id + " B ID  " + objCase.beneficiarie_id)
    }


  }
  insertseprateAns(objCase) {
    return new Promise((resolve, reject) => {
      this.dbobject.executeSql("INSERT INTO `answers` ( `server_id`, `beneficiarie_id`, `survey_id`, `question_id`, `language_id`, `option_id`,`option_text`,`image`,`other_text`,`created_at`,`updated_at`,`sync_status`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
        [objCase.server_id, objCase.server_id, objCase.survey_id, objCase.question_id, objCase.language_id, objCase.option_id, objCase.option_text, objCase.image, objCase.other_text, objCase.created_at, objCase.updated_at, 0])
        .then((data) => {
          resolve(data);
        }, (error) => {
          reject(error);
          console.log("ERROR: insertCase" + JSON.stringify(error));
          this.isinsertstatus = false
          // return false
        });
    });

  }

  public getbeneficiaryforprofile(id: string, autoincrement_id: string) {
    let query = "SELECT * FROM beneficiaries WHERE server_id=?";
    if (id == undefined && id == null) {
      id = autoincrement_id
      query = "SELECT * FROM beneficiaries WHERE id=?"
    }
    this.offlineCase = []
    this.dbobject.executeSql(query, [id])
      .then((data) => {
        if (data.rows.length > 0) {

          for (var i = 0; i < data.rows.length; i++) {
            this.offlineCase.push({
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
        } else {
          console.log("error in getting beneficiary data from database !!!!")
        }
      }, (error) => {
        console.log("ERROR: getAllCase " + JSON.stringify(error));
      });
  }

  public updatabeneficiaryProfile(objCase: any, beneficiary_id: string, autoincrement_id: string) {
    console.log("     " + beneficiary_id + "    " + autoincrement_id)
    let query = "UPDATE beneficiaries SET beneficiary_name = ? ,gender = ?,age=?,date_of_birth = ?,marital_status=?,caste=?,religion=?,primary_occupation=?,ownership_of_land=?,total_land_holding =?, total_family_income_average_monthly =?, education_status =?, height_in_cms =?, Weight_in_kgs =?, village_id = ?, household_id = ?, family_head_id = ?,type_of_rationa_card =?, contact_number = ?, whatsapp_number = ?, user_id = ?, family_head_relation = ? ,sync_status=? WHERE server_id = ? ";
    if (beneficiary_id == undefined && beneficiary_id == null) {
      beneficiary_id = autoincrement_id
      query = "UPDATE beneficiaries SET beneficiary_name = ? ,gender = ?,age=?,date_of_birth = ?,marital_status=?,caste=?,religion=?,primary_occupation=?,ownership_of_land=?,total_land_holding =?, total_family_income_average_monthly =?, education_status =?, height_in_cms =?, Weight_in_kgs =?, village_id = ?, household_id = ?, family_head_id = ?,type_of_rationa_card =?, contact_number = ?, whatsapp_number = ?, user_id = ?, family_head_relation = ? ,sync_status=? WHERE  id = ?";
    }
    if (objCase != undefined) {
      return new Promise((resolve, reject) => {
        this.dbobject.executeSql(query,
          [objCase.beneficiary_name, objCase.gender, objCase.age, objCase.date_of_birth, objCase.marital_status, objCase.caste, objCase.religion, objCase.primary_occupation, objCase.ownership_of_land, objCase.total_land_holding, objCase.total_family_income_average_monthly, objCase.education_status, objCase.height_in_cms, objCase.Weight_in_kgs, objCase.village_id, objCase.household_id, objCase.family_head_id, objCase.type_of_rationa_card, objCase.contact_number, objCase.whatsapp_number, objCase.user_id, objCase.family_head_relation, 0, beneficiary_id])
          .then((data) => {
            resolve(data);
            this.updatebenenificialinsert(objCase, beneficiary_id);
            this.isinsertstatus = true
            return true
          }, (error) => {
            reject(error);
            console.log("ERROR: insertCase" + JSON.stringify(error));
            this.isinsertstatus = false
            return false
          });
      });
    } else {
      console.log("update else ");
    }
  }
  updatebenenificialinsert(objCase: any, beneficiary_id: string) {
    //alert("update $$$$$$$$$$$$$$$$$$$")

    return new Promise((resolve, reject) => {
      this.dbobject.executeSql("INSERT INTO Updated_beneficiaries (server_id,device_id,code,beneficiary_name,gender,date_of_birth,marital_status,caste,religion,primary_occupation,ownership_of_land,total_land_holding,total_family_income_average_monthly,education_status,height_in_cms,Weight_in_kgs,village_id,household_id,family_head_id,type_of_rationa_card,family_head_relation,contact_number,whatsapp_number,user_id,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [beneficiary_id, this.appGlobal.device_id, objCase.code, objCase.beneficiary_name, objCase.gender, objCase.date_of_birth, objCase.marital_status, objCase.caste, objCase.religion, objCase.primary_occupation, objCase.ownership_of_land, objCase.total_land_holding, objCase.total_family_income_average_monthly, objCase.education_status, objCase.height_in_cms, objCase.Weight_in_kgs, objCase.village_id, objCase.household_id, objCase.family_head_id, objCase.type_of_rationa_card, objCase.family_head_relation, objCase.contact_number, objCase.whatsapp_number, objCase.user_id, null, objCase.updated_at])
        .then((data) => {
          alert("Update successfully")
          resolve(data);
          console.log("INSERTED: insertCase" + JSON.stringify(data));
          this.isinsertstatus = true
          return true
        }, (error) => {
          reject(error);
          console.log("ERROR: insertCase" + JSON.stringify(error));
          this.isinsertstatus = false
          return false
        });
    });

  }
  public syncbeneficiarydata() {
    let query = '';
    query = 'SELECT * FROM beneficiaries where sync_status = 0 ';
    this.dbobject.executeSql(query, {})
      .then((data) => {
        this.appGlobal.benefeciaries = []
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            console.log("  %%%%%%  " + JSON.stringify(data.rows.item(i)));
            this.appGlobal.benefeciaries.push({
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
        } else {
          console.log("error in getting beneficiary data from database !!!!")
        }
      }, (error) => {
        console.log("ERROR: getAllCase " + JSON.stringify(error));
      });
  }


  public syncanswersdata() {
    let query = '';
    query = 'SELECT * FROM answers where  sync_status = 0 ';
    this.dbobject.executeSql(query, {})
      .then((data) => {
        this.appGlobal.syncanswers = []
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            this.appGlobal.syncanswers.push({
              client_id: data.rows.item(i).id,
              beneficiarie_id: data.rows.item(i).beneficiarie_id,
              survey_id: data.rows.item(i).survey_id,
              question_id: data.rows.item(i).question_id,
              language_id: data.rows.item(i).language_id,
              option_id: data.rows.item(i).option_id,
              option_text: data.rows.item(i).option_text,
              image: data.rows.item(i).image,
              other_text: data.rows.item(i).other_text,
              device_id: this.appGlobal.device_id
            });
          }
        } else {
          console.log("error in getting beneficiary data from database !!!!")
        }
      }, (error) => {
        console.log("ERROR: getAllCase " + JSON.stringify(error));
      });
  }




  public synckycsdata() {
    let query = '';
    query = 'SELECT * FROM kycs where sync_status = 0 ';
    this.dbobject.executeSql(query, {})
      .then((data) => {
        this.appGlobal.synckycs = []
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            console.log("in sync answers")
            this.appGlobal.synckycs.push({
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
        } else {
          console.log("error in getting beneficiary data from database !!!!")
        }
      }, (error) => {
        console.log("ERROR: getAllCase " + JSON.stringify(error));
      });
  }
  showbeneficirybysearch(ev: any, cb, t) {
    let query = '';
    query = 'SELECT beneficiaries.*,households.hh_number FROM beneficiaries INNER JOIN households ON  beneficiaries.household_id= households.server_id WHERE households.hh_number LIKE' + "'" + ev + "'" + ' OR  beneficiary_name LIKE ' + "'" + ev + "%'   order by id desc";
    console.log(query)
    this.dbobject.executeSql(query, {})
      .then((data) => {
        this.offlineCase = []
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            this.offlineCase.push({
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
          cb(t)
          return true;
        } else {
          query = 'SELECT * FROM beneficiaries  WHERE beneficiary_name LIKE ' + "'" + ev + "%' order by id desc";
          this.dbobject.executeSql(query, {}).then((data) => {
            this.offlineCase = []
            if (data.rows.length > 0) {
              for (var i = 0; i < data.rows.length; i++) {
                this.offlineCase.push({
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
              cb(t)
              return true;
            }
            else {
              this.offlineCase = []
              alert("No beneficiary available !!!!")
              return false;
            }
          }, (error) => { console.log(JSON.stringify("error in getting beneficiaries" + error)) })
        }
      }, (error) => {
        console.log("ERROR : getAllCase " + JSON.stringify(error));
        return false;
      });
  }

  getTotalcount(cb, t) {
    this.dbobject.executeSql("select * from beneficiaries", {})
      .then((data) => {
        this.total_beneficialy = data.rows.length;
        cb(t)
      }, (error) => {
        console.log(JSON.stringify(error))
      })
  }
  getTotalhh(cb, t) {
    this.dbobject.executeSql("select * from households", {})
      .then((data) => {
        this.total_Hh = data.rows.length;
        cb(t)
      }, (error) => {
        console.log(JSON.stringify(error))
      })
  }
  deleteDb() {
    this.dbobject.executeSql("DROP DATABASE ivdp", {})
      .then((data) => {
        console.log('delete database');
      }, (error) => {
        console.log(JSON.stringify(JSON.stringify(error)));
      });
  }



  getTotalsurvey(cb, t) {

    this.dbobject.executeSql("select * from  survey", {})
      .then((data) => {

        this.total_surveys = data.rows.length;
        cb(t)
      }, (error) => {

        console.log(JSON.stringify(error))
      })
  }

  public beneficiarypaggination(ev, cb, t) {
    let query = '';
    let limit;
    if (ev != undefined) {
      limit = ev * 50
    } else {
      limit = 50
    }
    query = 'select * from beneficiaries ORDER BY id Asc LIMIT ' + limit
    this.dbobject.executeSql(query, {})
      .then((data) => {
        this.offlineCase = []
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            this.offlineCase.push({
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
          cb(t)
        } else {
          console.log("error in getting beneficiary data from database !!!!")

        }
      }, (error) => {
        console.log("ERROR : getAllCase " + JSON.stringify(error));

      });
  }

  public gethouseholdid(village_id, mdl) {
    let query = '';
    query = 'SELECT * FROM households WHERE `village_id` =' + village_id;

    this.dbobject.executeSql(query, {})
      .then((data) => {
        if (data.rows.length > 0) {
          this.appGlobal.HouseHold = []
          for (var i = 0; i < data.rows.length; i++) {
            this.appGlobal.HouseHold.push({
              server_id: data.rows.item(i).server_id,
              village_id: data.rows.item(i).village_id,
              hh_number: data.rows.item(i).hh_number,
              faliya_name: data.rows.item(i).faliya_name
            })
          }
          mdl.household_id = this.appGlobal.HouseHold;
        }
      }, (error) => {
        console.log("errort in select  hh_number  " + error)

      })


  }


  public updatebeneficiarydata(object: any, t) {

    this.dbobject.executeSql(" update beneficiaries SET  code = ?, device_id = ?, server_id=? , sync_status = ? ,age = ?,date_of_birth = ?  WHERE id=?  ",
      [object.code, object.device_id, object.id, 1, object.age, object.date_of_birth, object.client_id])
      .then((data) => {
        console.log("        " + JSON.stringify(data))


        t.pending_beneficiaries = 0
      }, (error) => {
        console.log("        " + JSON.stringify(error))
      })

  }
  pending_answers: any;

  public updatekycsindb(object: any, t) {

    this.dbobject.executeSql(" update kycs SET  server_id=? , sync_status = ? ,kyc_file = ?  WHERE id=?  ",
      [object.id, 1, object.kyc_file, object.client_id])
      .then((data) => {
        console.log("        " + JSON.stringify(data))
        t.pending_kycs = 0
      }, (error) => {
        console.log("        " + JSON.stringify(error))
      })
  }


  public updateanswers(object: any, t) {

    this.dbobject.executeSql(" update `answers` SET  server_id=? , sync_status = ?  WHERE id=?  ",
      [object.id, 1, object.client_id])

      .then((data) => {
        console.log("        " + JSON.stringify(data))
        t.pending_answers = 0
      }, (error) => {
        console.log("        " + JSON.stringify(error))
      })
  }


  public getpoction(qid) {
    let query = '';
    query = 'SELECT * FROM options WHERE `question_id` =' + qid;

    this.dbobject.executeSql(query, {})
      .then((data) => {

        if (data.rows.length > 0) {
          this.appGlobal.options = []
          for (var i = 0; i < data.rows.length; i++) {

            this.appGlobal.options.push({
              server_id: data.rows.item(i).server_id,
              question_id: data.rows.item(i).question_id,
              type: data.rows.item(i).type,
              text: data.rows.item(i).text
            })

          }
          //  mdl.opction[qid] = this.appGlobal.opctions;

        }
      }, (error) => {
        console.log("errort in select  hh_number  " + error)

      })


  }

  public getdataforgroupsurvey(ev, ca, t) {
    let query = '';
    if (ev != null) {
      query = 'SELECT beneficiaries.id,beneficiaries.server_id,beneficiaries.beneficiary_name,households.hh_number FROM beneficiaries INNER JOIN households ON  beneficiaries.household_id= households.server_id  WHERE households.hh_number LIKE ' + "'" + ev + "'";
    } else {
      query = 'SELECT beneficiaries.id,beneficiaries.server_id,beneficiaries.beneficiary_name,households.hh_number FROM beneficiaries INNER JOIN households ON  beneficiaries.household_id= households.server_id ';
    }

   
    this.dbobject.executeSql(query, {})
      .then((data) => {
        if (data.rows.length > 0) {
          //  this.appGlobal.groupsurveybeneficiaries = []
          for (var i = 0; i < data.rows.length; i++) {

            this.appGlobal.groupsurveybeneficiaries.push({
              id: data.rows.item(i).id,
              server_id: data.rows.item(i).server_id,
              beneficiary_name: data.rows.item(i).beneficiary_name,
              isChecked: false,
              text: data.rows.item(i).beneficiary_name,
              household_id: data.rows.item(i).hh_number

            })
          }
          ca(t)
        }
        else {
          alert("Data is not Available");
        }
      }, (error) => {
        console.log("errort in select  hh_number  " + error)

      })

  }











}




















