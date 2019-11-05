import { UserData } from './../user-data-ts';

import { Injectable } from '@angular/core';
import { Platform, LoadingController, ToastController } from 'ionic-angular';
import { SQLite } from '@ionic-native/sqlite';
import { HttpClient } from '@angular/common/http';
import { DataSetterProvider } from './../../providers/data-setter/data-setter';
import { Storage } from '@ionic/storage';
import { AppGlobalProvider } from "../../providers/app-global/app-global";
import { DatabaseProvider } from './../../providers/database/database';
import { DataGetterServiceProvider } from "../../providers/data-getter-service/data-getter-service";


@Injectable()
export class DBmaneger {

    public isqurestatus: boolean = false;
    total_datapage: number
    total_pageHH: any
    page_status = 0;
    page_status_hh = 0;
    UserId: any
    data: any
    total_count_beneficiary: string

    constructor(public http: HttpClient,
        public database: SQLite,
        public platform: Platform,
        public loadingCtrl: LoadingController,
        public appGlobal: AppGlobalProvider,
        public dataGetterService: DataGetterServiceProvider,
        public dataSetterService: DataSetterProvider,
        public db: DatabaseProvider,
        public toastCtrl: ToastController,
        public user: UserData,
        public storage: Storage
    ) {

        this.data = this.user.userData.id
        this.page_status = 0;

    }

    public async getbenificialydata() {
        console.log("====== getbenificialydata ======");
        if (this.platform.is('cordova')) {
            if (this.page_status == 0 || this.page_status == 1) {

                console.log("page_status  in 1 Api call  " + this.page_status)
                await this.dataGetterService.getAllbeneficiary(this.data).subscribe((data: any) => {
                    let a = true
                    if (data.success || a) {
                        this.appGlobal.actual = data.data.length + this.appGlobal.actual;
                        for (let i = 0; i <= data.data.length; i++) {
                            this.db.insertbeneficiarydata(data.data[i]);
                            this.appGlobal.sync_status = "Sync is going on ...."
                        }
                        // this.total_datapage = JSON.stringify(data.meta.last_page);
                        this.total_datapage = data.meta.last_page
                        console.log("page_status  in 1 Api call  total " + this.total_datapage)
                        this.appGlobal.total = data.meta.total;
                        this.doInfinite(null);
                        return this.isqurestatus = true
                    } else {
                        console.log("cannot get beneficiary  data for insert");
                    }
                    return this.isqurestatus = false
                }, error => {
                    console.log(JSON.stringify(error))
                    const toast = this.toastCtrl.create({
                        message: this.appGlobal.ServerError,
                        duration: 3000
                    });
                    toast.present();
                });
            } else {
                if (this.page_status != null && this.page_status != undefined && this.page_status <= this.total_datapage) {
                    this.doInfinite(null);
                }

            }
        }
    }

    doInfinite(e): Promise<any> {
        if (this.page_status != null && this.page_status != undefined && this.page_status <= this.total_datapage) {
            this.paggination(null);
        }
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
                this.getbenificialydata();
            }, 10000);
        });
    }



    public async paggination(ev) {
        await this.dataGetterService.paggination(this.page_status++).subscribe((data: any) => {
            let a = true
            this.appGlobal.actual = this.appGlobal.actual + data.data.length;
            if (data.success || a) {
                for (let i = 0; i <= data.data.length; i++) {
                    this.db.insertbeneficiarydata(data.data[i]);
                    // this.appGlobal.sync_status = "Sync is going on ...."
                    // console.log("@@@    paggination  beneficial " + this.page_status);
                }
            }
        }, (error) => {
            console.log("error " + JSON.stringify(error));
        });
    }






    public async getkycsdata() {
        if (this.platform.is('cordova')) {

            await this.dataGetterService.getGrievances()
                .subscribe((data: any) => {
                    let a = true
                    if (data.success || a) {
                        for (let i = 0; i <= data.data.length; i++) {
                            let object = data.data[i]
                            console.log("dadaobject ##### " + object);
                            this.db.insertkycsdatafromapi(data.data[i]);
                        }
                        return this.isqurestatus = true
                    } else {
                        console.log("cannot get kycs data for insert");
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
    }

    public async getsurvey() {
        if (this.platform.is('cordova')) {
            await this.dataGetterService.getSurveys()
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
                        console.log("cannot get survey data for insert");
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
    }
    public async getQuestion() {
        await this.dataSetterService.gatquestionrequest().subscribe((data: any) => {
            let a = true

            if (data.success || a) {
                for (let i = 0; i <= data.questions.length; i++) {
                    //alert(" Questions ##### " + object);
                    this.db.insertQuestinsdata(data.questions[i]);
                }
                return this.isqurestatus = true
            } else {
                console.log("cannot get questions data for insert");
            }
            return this.isqurestatus = false

        }, err => {
            console.log(err);
            const toast = this.toastCtrl.create({
                message: this.appGlobal.ServerError,
                duration: 3000
            });
            toast.present();
        });

    }
    public async getOpections() {
        await this.dataSetterService.gatquestionrequest().subscribe((data: any) => {
            let a = true

            if (data.success || a) {
                for (let i = 0; i <= data.options.length; i++) {

                    this.db.insertoptions(data.options[i]);
                }
                return this.isqurestatus = true
            } else {
                console.log("cannot get questions data for insert");
            }
            return this.isqurestatus = false

        }, err => {
            console.log(err);
            const toast = this.toastCtrl.create({
                message: this.appGlobal.ServerError,
                duration: 3000
            });
            toast.present();
        });

    }

    public async gethousehold() {
        console.log("====== gethousehold ======");
        if (this.page_status_hh == null && this.page_status_hh == undefined && this.page_status_hh == 0 || this.page_status_hh == 1) {
            await this.dataGetterService.gathouseholsrequest().subscribe((data: any) => {
                let a = true
                if (data.success || a) {

                    for (let i = 0; i <= data.data.length; i++) {

                        this.db.inserthouseholds(data.data[i]);
                    }
                    this.total_pageHH = JSON.stringify(data.meta.last_page);
                    this.appGlobal.total_househ = data.meta.total;
                    //this.doInfiniteHH(null);
                    return this.isqurestatus = true
                } else {
                    console.log("cannot get questions data for insert");
                }
                return this.isqurestatus = false

            }, err => {
                console.log("    hous error      " + JSON.stringify(err));
                const toast = this.toastCtrl.create({
                    message: this.appGlobal.ServerError,
                    duration: 3000
                });
                toast.present();
            });
        } else {
            this.doInfiniteHH(null);
        }

    }
    doInfiniteHH(e): Promise<any> {

        if (this.page_status_hh != null && this.page_status_hh != undefined) {
            this.paggination_hh(null);
        }
        // this.paggination(null);
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
                this.gethousehold();

            }, 10000);
        });
    }
    public async paggination_hh(ev) {
        await this.dataGetterService.paggination_hh(this.page_status_hh++).subscribe((data: any) => {
            let a = true
            // alert("success" + data.data.length)
            if (data.success || a) {

                for (let i = 0; i <= data.data.length; i++) {
                    this.db.inserthouseholds(data.data[i]);
                }
            }
        }, (error) => {
            console.log("error " + JSON.stringify(error));
        });
    }



}


