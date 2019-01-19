
import { Injectable } from '@angular/core';
import { Platform, LoadingController, ToastController } from 'ionic-angular';
import { SQLite } from '@ionic-native/sqlite';
import { HttpClient } from '@angular/common/http';
import { DataSetterProvider } from './../../providers/data-setter/data-setter';

import { AppGlobalProvider } from "../../providers/app-global/app-global";
import { DatabaseProvider } from './../../providers/database/database';
import { DataGetterServiceProvider } from "../../providers/data-getter-service/data-getter-service";


@Injectable()
export class DBmaneger {

    public isqurestatus: boolean = false;
    constructor(public http: HttpClient,
        public database: SQLite,
        public platform: Platform,
        public loadingCtrl: LoadingController,
        public appGlobal: AppGlobalProvider,
        public dataGetterService: DataGetterServiceProvider,
        public dataSetterService: DataSetterProvider,
        public db: DatabaseProvider,
        public toastCtrl: ToastController
    ) {


    }

    public getbenificialydata() {
        this.dataGetterService.getAllMaintenanceRequests().subscribe((data: any) => {
            let a = true
            if (data.success || a) {
                for (let i = 0; i <= data.data.length; i++) {
                    this.db.insertbeneficiarydata(data.data[i]);
                }
                return this.isqurestatus = true
            } else {
                alert("cannot get beneficiary  data for insert");
            }
            return this.isqurestatus = false
        }, error => {
            console.log(error);
            const toast = this.toastCtrl.create({
                message: this.appGlobal.ServerError,
                duration: 3000
            });
            toast.present();
        });
    }

    public getkycsdata() {
        this.dataGetterService.getGrievances()
            .subscribe((data: any) => {

                let a = true
                if (data.success || a) {
                    for (let i = 0; i <= data.data.length; i++) {
                        let object = data.data[i]
                        console.log("dadaobject ##### " + object);
                        this.db.insertkycsdata(data.data[i]);
                    }
                    return this.isqurestatus = true
                } else {
                    alert("cannot get kycs data for insert");
                }
                return this.isqurestatus = false
                // this.db.getbeneficiarydata();
            }, err => {
                console.log(err);
                const toast = this.toastCtrl.create({
                    message: this.appGlobal.ServerError,
                    duration: 3000
                });
                toast.present();
            });
    }

    public getsurvey() {

        this.dataGetterService.getSurveys()
            .subscribe((data: any) => {
                let a = true
                if (data.success || a) {
                    for (let i = 0; i <= data.data.length; i++) {
                        let object = data.data[i]
                        console.log("dadaobject ##### " + object);
                        this.db.insertsurveydata(data.data[i]);
                    }
                    return this.isqurestatus = true
                } else {
                    alert("cannot get survey data for insert");
                }
                return this.isqurestatus = false
                // this.db.getbeneficiarydata();
            }, err => {
                console.log(err);
                const toast = this.toastCtrl.create({
                    message: this.appGlobal.ServerError,
                    duration: 3000
                });
                toast.present();
            });

    }
    public getQuestion() {
         alert("!!!!!!!!!!!!!!!!");
        console.log('Question');
        this.dataSetterService.gatquestionrequest().subscribe((data: any) => {
            alert(" in ========= "+data.data.questions);

        }, (error) => { 
            alert("error in getting questions " + error);
        });


        // alert(" in getquestions  @@@@@@");
        // this.dataSetterService.gatquestionrequest().subscribe((data: any) => {
        //     alert(" in getquestions  #####");
        //     let a = true
        //     if (data.success || a) {
        //         for (let i = 0; i <= data.questions.length; i++) {
        //             let object = data.questions[i]
        //             alert(" Questions ##### " + object);
        //             this.db.insertQuestinsdata(data.questions[i]);
        //         }
        //         return this.isqurestatus = true
        //     } else {
        //         alert("cannot get questions data for insert");
        //     }
        //     return this.isqurestatus = false

        // }, err => {
        //     console.log(err);
        //     const toast = this.toastCtrl.create({
        //         message: this.appGlobal.ServerError,
        //         duration: 3000
        //     });
        //     toast.present();
        // });

    }




}


