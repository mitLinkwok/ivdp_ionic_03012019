
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppGlobalProvider } from "../../providers/app-global/app-global";


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
  public offlineCase: any = [];
  public offlineCasekycs: any = [];
  public tablname = "beneficiaries";
  public isinsertstatus: boolean;
  constructor(public http: HttpClient,
    public database: SQLite,
    public platform: Platform,
    public appGlobal: AppGlobalProvider,

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
      alert("error in finding plat form !!!!!")
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


  public insertbeneficiarydata(objCase: any) {
    console.log(objCase);
    return new Promise((resolve, reject) => {
      
      this.dbobject.executeSql("INSERT INTO beneficiaries (id,code,beneficiary_name,gender,date_of_birth,contact_number,created_at,updated_at,family_head_id,firstname,middlename,lastname,household_id,village_id,user_id,age,family_head_relation,whatsapp_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [objCase.id, objCase.code, objCase.beneficiary_name, objCase.gender, objCase.date_of_birth, objCase.contact_number, objCase.created_at, objCase.updated_at, objCase.family_head_id, objCase.firstname, objCase.middlename, objCase.lastname, objCase.household_id, objCase.village_id, objCase.user_id, objCase.age, objCase.family_head_relation, objCase.whatsapp_number])
        .then((data) => {
          resolve(data);
          console.log("INSERTED: insertCase" + JSON.stringify(data));
        }, (error) => {
          reject(error);
          console.log("ERROR: insertCase" + JSON.stringify(error));
        });
    });
  }
  public insertkycsdata(objCase: any) {
    console.log(objCase);
    return new Promise((resolve, reject) => {
      this.dbobject.executeSql("INSERT INTO kycs(id,user_id,kyc_person_id,kyc_person_type,kyc_name,kyc_detail,kyc_number,kyc_file,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?)",
        [objCase.id, objCase.user_id, objCase.kyc_person_id, objCase.kyc_person_type, objCase.kyc_name, objCase.kyc_detail, objCase.kyc_number, objCase.kyc_file, objCase.created_at, objCase.updated_at])
        .then((data) => {
          resolve(data);
          // alert("insert 4444 in " + data)
          // alert("INSERTED: insertCase" + JSON.stringify(data));
        }, (error) => {
          reject(error);

          console.log("ERROR: insertCase" + JSON.stringify(error));
        });
    });
  }


  public insertsurveydata(objCase: any) {
    console.log(objCase);
    // alert("in surey insert")
    return new Promise((resolve, reject) => {
      this.dbobject.executeSql("INSERT INTO `survey`(`id`,`project_id`,`title`,`description`,`start_date`,`created_at`,`updated_at`) VALUES (?,?,?,?,?,?,?)",
        [objCase.id, objCase.project_id, objCase.title, objCase.description, objCase.start_date, objCase.created_at, objCase.updated_at])
        .then((data) => {
          resolve(data);

        }, (error) => {
          reject(error);
          console.log("insert 4444 survey " + error)
          console.log("ERROR: insertCase" + JSON.stringify(error));
        });
    });

  }
  public insertQuestinsdata(objCase: any) {
    console.log(objCase);
    alert("I am in insrt questions")
    return new Promise((resolve, reject) => {
      this.dbobject.executeSql("INSERT INTO `questions`(`id`,`survey_id`,`section_id`,`order`,`text`,`type`,`language_json`,`rule_json`,`created_at`,`updated_at`) VALUES (?,?,?,?,?,?,?,?,?,?)",
        [objCase.id, objCase.survey_id, objCase.section_id, objCase.order, objCase.text, objCase.type, objCase.language_json, objCase.rule_json, objCase.created_at, objCase.updated_at])
        .then((data) => {
          resolve(data);
        }, (error) => {
          reject(error);
          console.log("ERROR: @@@@@@@@@@@@@ insertCase" + JSON.stringify(error));
        });
    });

  }

  public insertnewbeneficiary(objCase: any) {
    this.dbobject.executeSql("select * from Updated_beneficiaries", {})
      .then((data) => {
        console.log(" new benificialy data  " + data.rows.length)
      }, (error) => {
        console.log("ERROR: getAllCase " + JSON.stringify(error));
      });
    console.log(objCase);
    return new Promise((resolve, reject) => {
      this.dbobject.executeSql("INSERT INTO Updated_beneficiaries(id,code,beneficiary_name,gender,date_of_birth,contact_number,created_at,updated_at,family_head_id,firstname,middlename,lastname,household_id,village_id,user_id,age,family_head_relation,whatsapp_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [objCase.id, objCase.code, objCase.beneficiary_name, objCase.gender, objCase.date_of_birth, objCase.contact_number, objCase.created_at, objCase.updated_at, objCase.family_head_id, objCase.firstname, objCase.middlename, objCase.lastname, objCase.household_id, objCase.village_id, objCase.user_id, objCase.age, objCase.family_head_relation, objCase.whatsapp_number])
        .then((data) => {
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







  public getbeneficiarydata() {
    let query = '';
    query = 'SELECT * FROM beneficiaries';
    this.offlineCase = []
    this.dbobject.executeSql(query, {})
      .then((data) => {
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            this.offlineCase.push({
              id: data.rows.item(i).id,
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
        } else {
          alert("error in getting beneficiary data from database !!!!")
        }
      }, (error) => {
        console.log("ERROR: getAllCase " + JSON.stringify(error));
      });
  }
  public getKycsdata(kyc_person_id: string) {
    this.offlineCasekycs = [];
    this.dbobject.executeSql("SELECT * FROM kycs WHERE kyc_person_id = ?", [kyc_person_id])
      .then((data) => {
        // alert(" red kycs " + data.rows.length);
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            this.offlineCasekycs.push({
              id: data.rows.item(i).id,
              user_id: data.rows.item(i).user_id,
              kyc_person_id: data.rows.item(i).kyc_person_id,
              kyc_person_type: data.rows.item(i).kyc_person_type,
              kyc_name: data.rows.item(i).kyc_name,
              kyc_number: data.rows.item(i).kyc_number,
              kyc_detail: data.rows.item(i).kyc_detail,
              kyc_file: data.rows.item(i).kyc_file,
              created_at: data.rows.item(i).created_at,
              updated_at: data.rows.item(i).updated_at
            });
          }
        } else {
          alert("No kyc data In record")
        }
      }, (error) => {
        console.log("ERROR: getAllCase " + JSON.stringify(error));
      });
  }

  public getsureydatalode() {
    let query = '';
    query = 'SELECT * FROM survey';
    this.offlineCase = [];
    this.dbobject.executeSql(query, {})
      .then((data) => {
        //  alert(" red survey " + data.rows.length);
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            alert("i am in red survey for loop   " + data.rows.item(i).id)
            this.offlineCase.push({

              id: data.rows.item(i).id,
              project_id: data.rows.item(i).project_id,
              title: data.rows.item(i).title,
              description: data.rows.item(i).description,
              start_date: data.rows.item(i).start_date,
              created_at: data.rows.item(i).created_at,
              updated_at: data.rows.item(i).updated_at
            });

          }
        } else { alert("error in getting survey data from database !!!!") }
      }, (error) => {
        console.log("ERROR: getAllCase @@@@@ survey " + JSON.stringify(error));
      });
  }
  public getQuestionsfroloddata() {
    let query = '';
    query = 'SELECT * FROM questions';




    this.offlineCase = [];
    this.dbobject.executeSql(query, {})
      .then((data) => {
        for (var i = 0; i < data.rows.length; i++) {
          this.appGlobal.questionsList.push({
                  id: data.rows.item(i).id,
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
        // if (data.rows.length > 0) {

        //   this.appGlobal.questionsList = data

        //   for (var i = 0; i < data.rows.length; i++) {

        //     // this.appGlobal.questionsList.push(
        //     //   data.rows[i]
        //     // )

        //     this.appGlobal.questionsList.push({
        //       id: data.rows.item(i).id,
        //       survey_id: data.rows.item(i).survey_id,
        //       section_id: data.rows.item(i).section_id,
        //       order: data.rows.item(i).order,
        //       text: data.rows.item(i).text,
        //       type: data.rows.item(i).type,
        //       language_json: data.rows.item(i).language_json,
        //       rule_json: data.rows.item(i).rule_json,
        //       created_at: data.rows.item(i).created_at,
        //       updated_at: data.rows.item(i).updated_at,
        //     });
        //   }
        //} else { alert("error in getting questions data from database !!!!") }
      }, (error) => {
        console.log("ERROR: getAllCase @@@@@ survey " + JSON.stringify(error));
      });
  }







}








