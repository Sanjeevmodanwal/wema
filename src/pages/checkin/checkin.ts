import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController ,ModalController, ToastController, Events, Modal } from 'ionic-angular';
import { AppConst } from '../../AppConst';
import { ApiProvider } from '../../providers/api/api';
import { DatePipe } from "@angular/common";
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AppState } from '../../AppStates';
import { ProviderCheckinSuccessPage } from '../provider-checkin-success/provider-checkin-success';
import { ModelPage } from '../model/model';
import { CheckinReasonPopupPage } from '../checkin-reason-popup/checkin-reason-popup';
/**
 * Generated class for the CheckinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-checkin',
  templateUrl: 'checkin.html',
})
export class CheckinPage {
  appointment: any;
  selector:boolean
  ckeckindata: boolean;
  constructor(public navCtrl: NavController,private datePipe: DatePipe, private barcodeScanner: BarcodeScanner, private apiProvider: ApiProvider, public alertCtrl: AlertController, public navParams: NavParams, private modalCtrl: ModalController, private toastCtrl: ToastController) {
  console.log(navParams.data)
  this.appointment=navParams.data
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckinPage');
  }


  
  /**
   * CheckIn
   * @param appointment 
   */
  checkIn(appointment: any) {
    if (appointment != null) {
      if (appointment.status == "5" || appointment.status == "3" || appointment.status == "8") return;

      this.barcodeScanner.scan().then((data) => {
        console.log('inside checkin()');
        console.log(JSON.stringify(data));
        if (data != null) {
          let appointmentIds = appointment.id.split('_');
          let scanResult = data.text.split('||');
          console.log('scan result');
          console.log(JSON.stringify(scanResult));
          console.log(scanResult,appointmentIds)
          if (scanResult[1] == appointmentIds[appointmentIds.length - 1]) {
            //if (scanResult[scanResult.length - 1] == 'true') {              
            if (scanResult['5'] == 'true') {
              
              this.getReasonForLatePopup(scanResult, appointment, 'early');
            }
            //else if (scanResult[scanResult.length - 2] == 'true') {
            else if (scanResult['4'] == 'true') {
              this.getReasonForLatePopup(scanResult, appointment, 'late')
            }
            else {
              this.executeCheckIn(scanResult, appointment, null, null)
            }
          }
          else {
            console.log('in mismatch')
         //  this.getReasonForLatePopup(scanResult, appointment, 'early');
            this.toastCtrl.create({
              message: 'Mismatched ' + appointment.status == '4' ? "check out" : "check in",
              duration: 2000
            }).present();
          }
        }
      },
        (err) => {
          this.toastCtrl.create({
            message: 'something went wrong',
            duration: 2000
          }).present();
        });
    }
  }
  
  /**
   * Late Reasong popup
   */
  getReasonForLatePopup(scanResult: any, appointment: any, type: string) {
    var checkinType = appointment.status == '4' ? "check out" : "check in";
    var title = 'Give reason for ' + type + ' ' + checkinType;
    console.log(title)
    let checkinReasonPopup = this.modalCtrl.create('ModelPage', { title: title, appointment:appointment });
    checkinReasonPopup.onDidDismiss((reason) => {
      if (reason != null)
        this.executeCheckIn(scanResult, appointment, reason, type);
    });
    checkinReasonPopup.present();
  }

  /**
   * Execute checkin
   */
  async executeCheckIn(scanResult: any, appointment: any, reason: string, checkinType: any) {
    let appointmentIds = appointment.id.split('_');
    let response;
    if (appointment.status == '4') {
      let request = {
        Action: 'end',
        AppointmEntId: appointmentIds[appointmentIds.length - 1],
        EndTime: scanResult[3],
        CompanyId: appointment.companyid,
        ApptSource: appointment.apptsource
      };
      if (checkinType == "early")
        request['EarlyReason'] = reason;
      else if (checkinType == "late") {
        request['LateReason'] = reason;
      }

      response = await this.apiProvider.Post(AppConst.CHECK_INOUT, request).toPromise();
    }
    else {
      let request = {
        Action: 'start',
        AppointmEntId: scanResult[1],
        ProviderId: AppState.UserCred.userid,
        StartTime: scanResult[3],
        CompanyId: appointment.companyid,
        ApptSource: appointment.apptsource
      };
      if (checkinType == "early")
        request['EarlyReason'] = reason;
      else if (checkinType == "late") {
        request['LateReason'] = reason;
      }

      response = await this.apiProvider.Post(AppConst.CHECK_INOUT, request).toPromise();
    }

    if (response != null && response['status'])
      this.navCtrl.push('ProviderCheckinSuccessPage', appointment);
  }
}
