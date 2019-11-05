import { Storage } from '@ionic/storage';
import { DatabaseProvider } from './../../providers/database/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Platform } from 'ionic-angular';
import { AppGlobalProvider } from "../../providers/app-global/app-global";
import { ToastController } from "ionic-angular/components/toast/toast-controller";
import { DataSetterProvider } from "../../providers/data-setter/data-setter";
import { DataGetterServiceProvider } from "../../providers/data-getter-service/data-getter-service";
import { DBmaneger } from './../../providers/database/Dbmaneger';
import { Loading } from 'ionic-angular/components/loading/loading';

// import {Vibration} from "@ionic-native/vibration";

/**
 * Generated class for the SyncPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-sync',
	templateUrl: 'sync.html'
})
export class SyncPage {

	pending_beneficiaries: any;
	pending_answers: any;
	pending_kycs: any;
	current_time: any
	last_syncBeneficiariesTime: any
	last_syncsurveysanswerTime: any
	last_syncsurveyskycs: any;
	loading: any


	constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController,
		public appGlobal: AppGlobalProvider, public dataGetterService: DataGetterServiceProvider,
		public dataSetterService: DataSetterProvider, public sqldatabasegetter: DatabaseProvider,
		public toastCtrl: ToastController,
		public db: DBmaneger, public storage: Storage, public platform: Platform) {
		this.sqldatabasegetter.syncbeneficiarydata();
		this.sqldatabasegetter.syncanswersdata();
		this.sqldatabasegetter.synckycsdata();
		this.pending_beneficiaries = this.appGlobal.benefeciaries.length;
		this.pending_answers = this.appGlobal.syncanswers.length
		this.pending_kycs = this.appGlobal.synckycs.length
	}
	dorefresh(ev) {
		if (this.platform.is('android') || this.platform.is('ios')) {
			this.datareload(ev)
		}
		setTimeout(() => {
			console.log('Async operation has ended');
			ev.complete();
		}, 2000);
	}
	datareload(ev) {
		this.sqldatabasegetter.syncbeneficiarydata();
		this.sqldatabasegetter.syncanswersdata();
		this.sqldatabasegetter.synckycsdata();
		this.pending_beneficiaries = this.appGlobal.benefeciaries.length;
		this.pending_answers = this.appGlobal.syncanswers.length
		this.pending_kycs = this.appGlobal.synckycs.length
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad SyncPage');
	}
	async syncBeneficiaries() {
		//if (this.appGlobal.benefeciaries.length > 0) {
		
		let m = this;
		//this.presentLoading(m);
		let b_success = [];
		this.loading = this.loadingCtrl.create({
			content: 'please wait while syncing data..'
		});
		await this.loading.present()

		const js_arr = { 'beneficiary': m.appGlobal.benefeciaries, "house_hold": [], "kyc": [] };
		await m.dataSetterService.createMaintenanceRequest(js_arr).subscribe(async (data: any) => {
			this.loading.dismiss();

			if (data[0].original.status || data[0].original.status == "true") {
				await this.updaterdbbenefiliy(data[0].original.updater, this, this.loading)
				this.last_syncBeneficiariesTime = new Date().toDateString();
				b_success.push(data)
				this.appGlobal.benefeciaries == []
				this.pending_beneficiaries == 0;

			}
			else if (!data[0].original.status || data[0].original.status == "false") {
				console.log("data upload beneficiry  " + data)
				this.loading.dismiss();
			} else {
				this.loading.dismiss();
			}

		}, (error) => {
			alert(" Error   " + JSON.stringify(error));
			this.loading.dismiss();
		});


	}


	async updaterdbbenefiliy(object: any, t, l): Promise<any> {

		l.dismiss();

		if (object.length == 0) {
			l.dismiss()
		}
		for (let i = 0; i < object.length; i++) {
			this.sqldatabasegetter.updatebeneficiarydata(object[i], t);
			if (i == object.length) {
				alert("beneficiry sync done")
				l.dismiss();
			}
		}


	}

	syncsurveysanswer() {
		let m = this;
		let l = this.loadingCtrl.create({
			content: 'please wait while syncing data..'
		});
		l.present();

		let b_success = []

		const js_arr = { "answer": m.appGlobal.syncanswers };
		//	loading.present();
		m.dataSetterService.syncAnswersRequest(js_arr).subscribe((data: any) => {


			if (data.status) {
				l.dismiss();
				alert("Answers sync done");
				this.updaterdbanswers(data.updater, this, l);

				this.last_syncsurveysanswerTime = new Date().toDateString();
				b_success.push(data)
				m.appGlobal.syncanswers = []
				m.pending_answers = 0
			}
			else {
				console.log("error in Answers sync" + data.errors);
				l.dismiss();
			}
		}, (error) => {
			alert(JSON.stringify(error))
			l.dismiss();
		})

	}

	updaterdbanswers(object: any, t, l) {
		alert(object.length + '  ans ')
		if (object.length == 0) {
			l.dismiss();
		}
		for (let i = 0; i < object.length; i++) {
			this.sqldatabasegetter.updateanswers(object[i], t);
			if (i == object.length) {
				l.dismiss();
			}
		}
	}
	receivesurvey() {
		alert("receive survey");
	}
	syncsurveyskycs() {
		// kycCanSync: Boolean;
		this.storage.get('kycCansync').then(done => {
			if (done) {
				let m = this;
				//this.presentLoading(m);
				let l = this.loadingCtrl.create({
					content: 'please wait while syncing data..'
				});
				l.present();
				let b_success = []
				const js_arr = { 'beneficiary': [], "house_hold": [], "kyc": m.appGlobal.synckycs };
				m.dataSetterService.syncKycsRequest(js_arr).subscribe((data: any) => {
					if (data[1].original.status) {
						l.dismiss();
						alert("kycs sync done ");
						
						this.updaterdbkycs(data[1].original.updater, this, l)

						this.last_syncsurveyskycs = new Date().toDateString();
						b_success.push(data)
						this.appGlobal.synckycs = []
						this.pending_kycs = 0;

					}
					else {
						console.log(data.errors);
						l.dismiss();
					}
				}, (error) => {
					alert(JSON.stringify(error));
					l.dismiss();
				})
			}
			else {
				alert('Frist sync beneficiry');
			}

		});



	}

	updaterdbkycs(object: any, t, l) {
		alert(object.length + '  kyc ')
		if (object.length == 0) {
			l.dismiss();
		}

		for (let i = 0; i < object.length; i++) {
			this.sqldatabasegetter.updatekycsindb(object[i], t);
			if (i == object.length) {
				l.dismiss();
			}
		}
	}



	/* presentLoading(m) {
		this.loading = this.loadingCtrl.create({
			content: "Plase wite.."
		});
		this.loading.present();
	}
 */







}
