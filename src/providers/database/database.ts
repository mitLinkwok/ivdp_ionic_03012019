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


    this.sqlstorage.create({name: 'ivdp.db',
    location: 'default'})
    .then((db: SQLiteObject) => {
  
  
      db.executeSql('create table danceMoves(name VARCHAR(32))', [])
        .then(() => console.log('Executed SQL'))
        .catch(e => console.log(e));
  
  
    }).catch(e => console.log(e));
  }

 





}

