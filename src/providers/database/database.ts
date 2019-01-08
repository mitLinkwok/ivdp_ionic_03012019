import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SQLite,SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {



  constructor(public http: HttpClient ,
              public sqlstorage:SQLite) {
    console.log('Hello DatabaseProvider Provider');


   
  }
  createDataBase(){
    this.sqlstorage.create({name: 'ivdp.db',
    location: 'default'})
    .then((db: SQLiteObject) => {
  
  
      db.executeSql('CREATE TABLE beneficiaries(id INTEGER PRIMARY KEY AUTOINCREMENT,code TEXT,beneficiary_name TEXT,gender NUMBER,date_of_birth TEXT,contact_number NUMBER,created_at TIMESTAMP,updated_at TIMESTAMP,family_head_id TEXT,firstname TEXT,middlename TEXT,lastname TEXT,household_id NUMBER,village_id NUMBER,user_id NUMBER,age NUMBER,family_head_relation TEXT,whatsapp_number NUMBER)', [])
        .then(() => console.log('Executed beneficiaries'))
        .catch(e => console.log(e));

        db.executeSql('CREATE TABLE kycs(id INTEGER PRIMARY KEY AUTOINCREMENT,user_id INTEGER,kyc_person_id INTEGER,kyc_person_type TEXT,kyc_name TEXT,kyc_detail TEXT,kyc_number TEXT,kyc_file TEXT,created_at TIMESTAMP,updated_at TIMESTAMP)', [])
        .then(() => console.log('Executed kycs'))
        .catch(e => console.log(e));
        db.executeSql('CREATE TABLE kycs_NEW(id INTEGER PRIMARY KEY AUTOINCREMENT,kyc_person_id INTEGER,kyc_person_type TEXT,kyc_name TEXT,kyc_detail TEXT,kyc_number TEXT,kyc_file TEXT)', [])
        .then(() => console.log('Executed SQL'))
        .catch(e => console.log(e));
        db.executeSql('CREATE TABLE users(id INTEGER PRIMARY KEY AUTOINCREMENT,first_name TEXT,last_name TEXT,email TEXT,password TEXT)', [])
        .then(() => console.log('Executed SQL'))
        .catch(e => console.log(e));

        alert("Executed")

  
  
    }).catch(e => alert(e));
  }

 





}

