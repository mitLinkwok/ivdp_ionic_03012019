var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AppGlobalProvider } from "../../providers/app-global/app-global";
import { ToastController } from "ionic-angular/components/toast/toast-controller";
import { DataSetterProvider } from "../../providers/data-setter/data-setter";
import { DataGetterServiceProvider } from "../../providers/data-getter-service/data-getter-service";
/**
 * Generated class for the SyncPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SyncPage = /** @class */ (function () {
    function SyncPage(navCtrl, navParams, loadingCtrl, appGlobal, dataGetterService, dataSetterService, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.appGlobal = appGlobal;
        this.dataGetterService = dataGetterService;
        this.dataSetterService = dataSetterService;
        this.toastCtrl = toastCtrl;
        this.pending_beneficiaries = this.appGlobal.benefeciaries.length;
    }
    SyncPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SyncPage');
    };
    SyncPage.prototype.syncBeneficiaries = function () {
        var b_success = [];
        var m = this;
        this.appGlobal.benefeciaries.forEach(function (b, index) {
            var loading = m.loadingCtrl.create({
                content: 'Syncing Beneficiaries ' + index.toString() + " of " + m.appGlobal.benefeciaries.length
            });
            loading.present();
            m.dataSetterService.createMaintenanceRequest(b).subscribe(function (data) {
                if (data) {
                    b_success.push(data);
                    loading.dismiss();
                }
                else {
                    alert(data.errors);
                    loading.dismiss();
                }
            });
        });
    };
    SyncPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-sync',
            templateUrl: 'sync.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, LoadingController,
            AppGlobalProvider, DataGetterServiceProvider,
            DataSetterProvider,
            ToastController])
    ], SyncPage);
    return SyncPage;
}());
export { SyncPage };
//# sourceMappingURL=sync.js.map