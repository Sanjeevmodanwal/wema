import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Modal, ModalController, ToastController,ModalOptions } from 'ionic-angular';
import { DatePipe } from '@angular/common';
import { ApiProvider } from '../../providers/api/api';
import { AppState } from '../../AppStates';
import { AppConst } from '../../AppConst';
import { ExpensespopupPage } from '../expensespopup/expensespopup';
import { BillViewPopupPage } from '../bill-view-popup/bill-view-popup';
import { ProviderReportFilterPopupPage } from '../provider-report-filter-popup/provider-report-filter-popup';

/**
 * Generated class for the ExpensesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({  
  selector: 'page-expenses',
  templateUrl: 'expenses.html',
})
export class ExpensesPage {
  datePeriod: any;
  isReportEmpty: boolean = false;
  expenseReports:any;
  filter:any;
  isEmpty: boolean = false;
  bills: any;
  data: any;
  totalExpenses: any;
  currencySymb ='';
  alldateArray = [];
  fromDate='';
  toDate='';
  filterStartDate : any ='';
  filterEndDate : any ='';
  constructor(public navCtrl: NavController, public navParams: NavParams, private modal: ModalController,private datePipe:DatePipe,private apiProvider:ApiProvider,private modalCtrl:ModalController, private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
   
    let date = new Date(Date.now());
    let startDate = new Date(date.getFullYear(), date.getMonth(), 1);
    let endDate = new Date(date.getTime() - 24 * 60 * 60 * 1000);
    this.filter = {
      startDate:startDate ,
      endDate: endDate,
    };

    this.getAllBills(this.filter);
  }

  ionViewDidEnter() {
    let date = new Date(Date.now());
    let startDate = new Date(date.getFullYear(), date.getMonth(), 1);
    let endDate = new Date(date.getTime() - 24 * 60 * 60 * 1000);
    this.filter = {
      startDate:startDate ,
      endDate: endDate,
    };

    this.getAllBills(this.filter);
  }

  async  getAllBills(filter:any) {

    this.filterStartDate  ='';
    this.filterEndDate  ='';

    
    this.datePeriod = "From "+ this.datePipe.transform(filter.startDate, 'dd MMMM yyyy') + ' to ' + this.datePipe.transform(filter.endDate, 'dd MMMM yyyy');
    console.log('====filterdata======');
    console.log(filter);
    console.log('====filterdata======');

    if(filter != undefined ) {
    

     this.filterStartDate =  this.datePipe.transform(filter.startDate, 'yyyy-MM-dd');
     this.filterEndDate =  this.datePipe.transform(filter.endDate, 'yyyy-MM-dd');

  }
    


    console.log(AppState.CurrentCompany);
    let filters = [
      { fieldname: "providerid", fieldvalue: AppState.UserCred.userid, operators: "Equal" },
      { fieldname: "companyid", fieldvalue: AppState.UserCred.currentCompanyId, operators: "Equal" },
      ]
    var request = {
      filter: filters,
      filterproperty: { offset: 0, orderby: "date", recordlimit: 0 },
      //CompanyId: AppState.CurrentCompany.companyId,
      StartDate: this.filterStartDate,  
      EndDate: this.filterEndDate
    };

    let response = await this.apiProvider.Post(AppConst.GET_All_BILLS, request).toPromise();
    if (response != null) {
      if (response['totalrecord'] == 0){
        this.isEmpty = true;  this.totalExpenses = 0;
      }else if (response.hasOwnProperty('records') && response['records'].length > 0) {
        this.bills = response['records'];
        var loopamount = 0;
        this.bills.forEach(element => { 
          if (element.status == "0"){
            element['statusReport'] = "Pending";
            element['statusColor']="3px solid #DF8433";
          } 
          else if (element.status == "1"){
            element['statusReport'] = "<ion-icon name='md-checkmark'></ion-icon>";
            element['statusColor']="3px solid #188A4E";
          }
          else{
            element['statusReport'] = "Rejected";
            element['statusColor']="3px solid #D13237";
          }
         var amount_value = 0;
         if(element.details.length != null && element.details.length >0){ 
          var detailsData   = element.details['0'];

          if(detailsData.amount != undefined){
            var elementamount =  (detailsData.amount >0) ? parseFloat(detailsData.amount) : 0 ;
            loopamount += elementamount;

            amount_value = elementamount;
          }
        }
        element['amount_value'] = amount_value;

          this.currencySymb = element.currency;
          this.alldateArray.push(new Date(element.actualdate));
        });
        this.isEmpty = false;
        this.totalExpenses = loopamount;

        if(this.alldateArray.length < 2 && this.alldateArray.length >0){
          this.fromDate = this.alldateArray[0];
          this.toDate = this.alldateArray[0] 
        }else if (this.alldateArray.length >1){
          this.fromDate = this.alldateArray[0];
          this.toDate = this.alldateArray.slice(-1)[0] 
        }
      }
    }
  }

  /**
   * Filter reports
   */
  showFilterPopup() {
    let providerReportFilterPopup = this.modalCtrl.create('ExpensespopupPage',this.filter);
    providerReportFilterPopup.onDidDismiss((data) => {
      if (data != null)
        this.getAllBills(data);
    });
    providerReportFilterPopup.present();
  }

  openModal() {

    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };

    const myModalData = {
      name: 'Paul Halliday',  
      occupation: 'Developer'
    };

    const myModal: Modal = this.modal.create(ExpensespopupPage, { data: myModalData }, myModalOptions);

    myModal.present();

    myModal.onDidDismiss((data) => {
      console.log("I have dismissed.");
      console.log(data);
    });

    myModal.onWillDismiss((data) => {
      console.log("I'm about to dismiss");
      console.log(data);
    });
  
  }

  /**
   * Download bill
   */
  async download(bill: any) {
    console.log(bill)
    if (bill.url != null) {
      let billViewPopUp = this.modalCtrl.create('BillViewPopupPage', { url: bill.url });
      billViewPopUp.present();
    }
    else
      this.toastCtrl.create({
        message: 'No bill available',
        duration: 2000
      }).present();
  }

  /**
   * Push to add bill page
   */
  addBill() {
    this.navCtrl.push('ExpensespopupPage');
  }
  /**
   * Filter reports
   */
  showFilterPopupFilter() {
    let providerReportFilterPopup = this.modalCtrl.create('ProviderReportFilterPopupPage',this.filter);
    providerReportFilterPopup.onDidDismiss((data) => {
      if (data != null)
        this.getAllBills(data);
    });
    providerReportFilterPopup.present();
  }
}
