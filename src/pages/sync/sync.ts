import { Storage } from '@ionic/storage';
import { DatabaseProvider } from './../../providers/database/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Platform } from 'ionic-angular';
import { AppGlobalProvider } from "../../providers/app-global/app-global";
import { ToastController } from "ionic-angular/components/toast/toast-controller";
import { DataSetterProvider } from "../../providers/data-setter/data-setter";
import { DataGetterServiceProvider } from "../../providers/data-getter-service/data-getter-service";
import { DBmaneger } from './../../providers/database/Dbmaneger';

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
	syncBeneficiaries() {
		this.presentLoading();
		let b_success = []
		let m = this;
		const js_arr = { 'beneficiary': m.appGlobal.benefeciaries, "house_hold": [], "kyc": [] };
		m.dataSetterService.createMaintenanceRequest(js_arr).subscribe((data: any) => {

			if (data[0].original.status) {
				alert("beneficiry sync done")
				this.last_syncBeneficiariesTime = new Date().toDateString();

				b_success.push(data)
				this.appGlobal.benefeciaries == []
				this.pending_beneficiaries == 0
				this.updaterdbbenefiliy(data[0].original.updater, this);
				this.loading.dismiss();
			}
			else {
				console.log("data upload beneficiry  " + data)

			}
		}, (error) => {
			alert(" s   " + JSON.stringify(error))
		})

	}


	updaterdbbenefiliy(object: any, t) {
		for (let i = 0; i < object.length; i++) {
			this.sqldatabasegetter.updatebeneficiarydata(object[i], t);
		}
	}

	syncsurveysanswer() {
		this.presentLoading();
		let b_success = []
		let m = this;
		const js_arr = { "answer": m.appGlobal.syncanswers };
		//	loading.present();
		m.dataSetterService.syncAnswersRequest(js_arr).subscribe((data: any) => {

			if (data.status) {
				alert("Answers sync done")
				this.last_syncsurveysanswerTime = new Date().toDateString();
				b_success.push(data)
				m.appGlobal.syncanswers = []
				m.pending_answers = 0
				this.updaterdbanswers(data.updater, this)
				m.loading.dismiss();
			}
			else {
				console.log("error in Answers sync" + data.errors);
				//loading.dismiss();
			}
		}, (error) => {
			alert(JSON.stringify(error))
			//loading.dismiss();
		})

	}

	updaterdbanswers(object: any, t) {
		for (let i = 0; i < object.length; i++) {
			this.sqldatabasegetter.updateanswers(object[i], t);
		}
	}
	receivesurvey() {
		alert("receive survey");
	}
	syncsurveyskycs() {
		// kycCanSync: Boolean;
		this.storage.get('kycCansync').then(done => {
			alert(JSON.stringify(done));

			if (done) {
				alert(JSON.stringify(done));
				this.presentLoading();
				let b_success = []
				let m = this;
				const js_arr = { 'beneficiary': [], "house_hold": [], "kyc": m.appGlobal.synckycs };
				m.dataSetterService.syncKycsRequest(js_arr).subscribe((data: any) => {
					if (data[1].original.status) {
						alert("kycs sync done ")
						this.last_syncsurveyskycs = new Date().toDateString();
						b_success.push(data)
						this.appGlobal.synckycs = []
						this.pending_kycs = 0;
						this.updaterdbkycs(data[1].original.updater, this)
						this.loading.dismiss();
					}
					else {
						console.log(data.errors);
						//loading.dismiss();
					}
				}, (error) => {
					alert(JSON.stringify(error))
				})
			}
			else {
				alert('Frist sync beneficiry');
			}

		});



	}

	updaterdbkycs(object: any, t) {
		for (let i = 0; i < object.length; i++) {
			this.sqldatabasegetter.updatekycsindb(object[i], t);
		}
	}



	async presentLoading() {
		this.loading = this.loadingCtrl.create({
			content: 'Please wait...',
			duration: 5000
		});
		this.loading.present();
	}








}
