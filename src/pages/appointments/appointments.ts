import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, ModalController, LoadingController, Loading } from 'ionic-angular';
import { ScrollTabsComponent, IScrollTab } from "../../../ionic2-scrolltabs/src/components/scrolltabs";
import { ApiProvider } from '../../providers/api/api';
import { DatePipe, NgClass } from '@angular/common';
import { AppState } from '../../AppStates';
import { AppConst } from '../../AppConst';
import { AppointmentPopupPage } from '../appointment-popup/appointment-popup';
//import { CancelRefundPopupPage } from '../cancel-refund-popup/cancel-refund-popup';
import { Helper } from '../../helpers/helper';
import { CancelRefundPopupPage } from '../cancel-refund-popup/cancel-refund-popup';
import { QrcodePage } from '../qrcode/qrcode';


/**
 * Generated class for the AppointmentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-appointments',
  templateUrl: 'appointments.html',
})
export class AppointmentsPage {
  tabs: IScrollTab[];
  currentNavigatedDateDay: Date;
  currentNavigatedDateWeek: Date;
  currentNavigatedDateMonth: Date;
  currentDate = new Date();
  dayAppointments: any;
  weekAppointments: any;
  monthAppointments: any;
  isDoneAppointmentsEmpty:boolean =true;
  isUpcominAppointmentsEmpty:boolean =true;
  weekDates: any;
  dayHeader: any;
  weekHeader: any;
  monthHeader: any;
  currentMonthDates = [];
  lastMonthDates = [];
  nextMonthDates = [];
  currentMonthStartDate: any;
  row = 0;
  column = 1;
  selectedTab: IScrollTab;
  @ViewChild('scrollTab') scrollTab: ScrollTabsComponent;
  todayDate: string;
  UpcommingDate=[];
  loader: Loading;
public appstate=AppState
  Appointments: any;
  isAppointmentsEmpty: boolean;
  constructor(public navCtrl: NavController,  private loadingController:LoadingController ,public navParams: NavParams, private apiProvider: ApiProvider, private datePipe: DatePipe, private alertCtrl: AlertController, public toastCtrl: ToastController, private modalCtrl: ModalController) {
    this.tabs = [
      {
      name: 'DAY'
    },
    {
      name: 'WEEK'
    },
    {
      name: 'MONTH'
    },
    ];
    this.currentNavigatedDateDay = this.currentDate;
    this.currentNavigatedDateWeek = this.getCurrentNavigatedDateWeek();
    this.currentNavigatedDateMonth = this.currentDate;
    //this.currentMonthStartDate=this.currentDate;
  }

  ionViewDidLoad() {
    console.log(AppState.UserCred)
    this.loader = this.loadingController.create({
      content: "Please wait.."
    });
    this.loader.present();

   // date: new Date(),
    this.todayDate=this.datePipe.transform(new Date(), 'dd/MM/yy');
   // this.scrollTab.go2Tab(0);
   setTimeout(x => {
    this.getMonthDates();
    this.getMonthAppointments();
    this.getAppointments()
  }, 1000);
  }

  ionViewDidEnter() {
  }

  /**
   * 
   * @param data Tab change handler
   */
  tabChange(tab: any) {
    this.selectedTab = tab.selectedTab;
    if (this.selectedTab.name == 'DAY')
      this.getDayAppointments();
    else if (this.selectedTab.name == 'WEEK')
      this.getWeekAppointments();
    else if (this.selectedTab.name == 'MONTH') {
      setTimeout(x => {
        this.getMonthDates();
        this.getMonthAppointments();
      }, 1000);
    }
  }

  /**
   * Get day appointments
   */
  async getDayAppointments() {
    let items = document.getElementsByClassName('dayDiv');
    for (let i = 0; i < items.length; i++) {
      let item = <HTMLDivElement>items.item(i);
      item.style.height = '30px';
      item.innerHTML = '';
    }

    var request = {
      StartDate: this.datePipe.transform(this.currentNavigatedDateDay, 'yyyy-MM-dd'),
      EndDate: this.datePipe.transform(this.currentNavigatedDateDay, 'yyyy-MM-dd'),
      CompayId: AppState.UserCred.currentCompanyId
    };

    if (AppState.IsMember)
      request['MemberId'] = AppState.UserCred.userid;
    else
      request['ProviderId'] = AppState.UserCred.userid;

    let response = await this.apiProvider.Post(AppConst.GET_APPOINTMENTS, request).toPromise();
    if (response != null && response.hasOwnProperty('records') && response['records'] != null && response['records'].length > 0) {
      this.dayAppointments = response['records'].filter(x => x.type == 'appointment' || x.type == 'request' && x.status != '9');
      this.dayAppointments.forEach(element => {
        var startDate = new Date(element['start']);
        let key = 'App' + startDate.getHours() + startDate.getMinutes();
        element['dayViewXname'] = key;
      });
      //let appointments = this.dayAppointments.filter(x => x.type == 'appointment' || x.type == 'request');
      this.dayAppointments.forEach(element => {
        var div = document.getElementById(element['dayViewXname']);
        if (div != null) {
          div.innerHTML = '';
          div.style.height = '60px';
          var apptDiv = document.createElement('div');
          if (element.status == 1 && element.missed)
            apptDiv.className = 'appt-miss-div';
          else
            apptDiv.className = 'appt-confirm-div';
          apptDiv.addEventListener('click', () => {
            this.showAppointmentPopup(element);
          });

          let innerDiv = document.createElement('div');
          innerDiv.style.verticalAlign = 'middle';
          apptDiv.appendChild(innerDiv);

          let name = document.createElement('div');
          name.className = 'appt-p';
          name.innerText = AppState.IsMember ? 'Provider: ' + element.providerdetails.firstname : 'Member: ' + element.membername;
          innerDiv.appendChild(name);

          let service = document.createElement('div');
          service.className = 'appt-p';
          service.innerText = 'Service: ' + element.service;
          innerDiv.appendChild(service);
          apptDiv.appendChild(innerDiv);
          div.appendChild(apptDiv);
        }
      });
    }
  }

  /**
   * Get week appointments
   */
  async getWeekAppointments() {
    this.weekHeader = this.getWeekHeader();
    this.weekDates = this.getWeekDays();
    let items = document.getElementsByClassName('weekDiv');
    for (let i = 0; i < items.length; i++) {
      let item = <HTMLDivElement>items.item(i);
      item.style.height = '30px';
      item.innerHTML = '';
    }

    var request = {
      StartDate: this.datePipe.transform(this.currentNavigatedDateWeek, 'yyyy-MM-dd'),
      EndDate: this.datePipe.transform(new Date(this.currentNavigatedDateWeek.getTime() + 6 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
      CompayId: AppState.UserCred.currentCompanyId
    };

    if (AppState.IsMember)
      request['MemberId'] = AppState.UserCred.userid;
    else
      request['ProviderId'] = AppState.UserCred.userid;

    let response = await this.apiProvider.Post(AppConst.GET_APPOINTMENTS, request).toPromise();
    if (response != null && response.hasOwnProperty('records') && response['records'] != null && response['records'].length > 0) {
      this.weekAppointments = response['records'].filter(x => x.type == 'appointment' || x.type == 'request' && x.status != '9');
      this.weekAppointments.forEach(element => {
        var startDate = new Date(element['start']);
        let key = 'App' + startDate.getHours() + startDate.getMinutes() + startDate.getDay();
        element['weekViewXname'] = key;
      });
      //let appointments = this.weekAppointments.filter(x => x.type == 'appointment' || x.type == 'request');
      this.weekAppointments.forEach(element => {
        var div = document.getElementById(element['weekViewXname']);
        if (div != null) {
          div.innerHTML = '';
          div.style.height = '60px';
          var apptDiv = document.createElement('div');
          if (element.status == 1 && element.missed)
            apptDiv.className = 'appt-miss-div';
          else
            apptDiv.className = 'appt-confirm-div';
          apptDiv.addEventListener('click', () => {
          //  this.showAppointmentPopup(element);
          });

          let innerDiv = document.createElement('div');
          innerDiv.style.verticalAlign = 'middle';
          apptDiv.appendChild(innerDiv);

          let name = document.createElement('div');
          name.className = 'appt-p';
          name.style.fontSize = '8px'
          name.innerText = AppState.IsMember ? 'Provider: ' + element.providerdetails.firstname : 'Member: ' + element.membername;
          innerDiv.appendChild(name);

          let service = document.createElement('div');
          service.className = 'appt-p';
          service.style.fontSize = '8px'
          service.innerText = 'Service: ' + element.service;
          innerDiv.appendChild(service);
          apptDiv.appendChild(innerDiv);
          div.appendChild(apptDiv);
        }
      });
    }
  }

  /**
   * 
   */
  async getMonthAppointments() {
    var request = {
      StartDate: this.datePipe.transform(this.currentMonthDates['0'], 'yyyy-MM-dd'),
      EndDate: this.datePipe.transform(this.currentMonthDates[this.currentMonthDates.length - 1], 'yyyy-MM-dd'),
      CompayId: AppState.UserCred.currentCompanyId
    };

    if (AppState.IsMember)
      request['MemberId'] = AppState.UserCred.userid;
    else
      request['ProviderId'] = AppState.UserCred.userid;

    let response = await this.apiProvider.Post(AppConst.GET_APPOINTMENTS, request).toPromise();
    if (response != null && response.hasOwnProperty('records') && response['records'] != null && response['records'].length > 0) {
      this.loader.dismiss()
      this.monthAppointments = response['records'].filter(x => x.type == 'appointment' || x.type == 'request' && x.status != '9');
      this.monthAppointments.forEach(element => {

        let date = new Date(element['start']);
        let classId = date.getMonth().toString() + date.getDate().toString();
        let elements = document.getElementsByName(classId);
        if (elements != null && elements.length > 0) {
          let div = elements.item(0);
          div.style.height = '60px';
          div.style.overflowY = 'scroll';
          if (div != null) {
            let innerDiv = document.createElement('div');
            innerDiv.style.verticalAlign = 'middle';
            var apptDiv = document.createElement('div');
            apptDiv.style.height = 'auto';
            apptDiv.style.padding = '5px';
            apptDiv.style.marginTop = '5px';
            if (element.status == 1 && element.missed)
              apptDiv.className = 'appt-miss-div';
            else
              apptDiv.className = 'appt-confirm-div';
            apptDiv.addEventListener('click', () => {
             // this.showAppointmentPopup(element);
            });
            let service = document.createElement('div');
            service.className = 'appt-p';
            service.style.fontSize = '8px'
            service.innerText ="";
            innerDiv.appendChild(service);
            apptDiv.appendChild(innerDiv);
            div.appendChild(apptDiv);
           
          }

          if(element['status'] == '5'){
            this.isDoneAppointmentsEmpty  = false;
          }
          if(element['missed'] !=true && element['status'] == '1'){
            this.isUpcominAppointmentsEmpty = false;
          }

          
          
        }
      });
      console.log(this.monthAppointments)

  //     for(let i in this.monthAppointments){
  //     if(this.monthAppointments[i].start >this.todayDate )
  //     {
  // this.UpcommingDate.push(this.monthAppointments[i])
  //     }
  //     console.log(this.UpcommingDate)
  //   }
  }
  else{
    this.loader.dismiss()
    }
  }

  /**
   * Get week days
   */
  getWeekDays() {
    var dates = [];
    for (let i = 0; i <= 6; i++) {
      dates.push(new Date(this.currentNavigatedDateWeek.getTime() + i * 24 * 60 * 60 * 1000).getDate());
    }
    return dates;
  }

  /**
   * Get week header
   */
  getWeekHeader() {
    var endDate = new Date(this.currentNavigatedDateWeek.getTime() + 6 * 24 * 60 * 60 * 1000);
    if (this.currentNavigatedDateWeek.getMonth() == endDate.getMonth()) {
      return Helper.getFullMonth(this.currentNavigatedDateWeek.getMonth()) + ' ' + this.currentNavigatedDateWeek.getDate() + ' - ' + endDate.getDate() + ', ' + this.currentNavigatedDateWeek.getFullYear();
    }
    else if (this.currentNavigatedDateWeek.getFullYear() == endDate.getFullYear()) {
      return this.currentNavigatedDateWeek.getDate() + ' ' + Helper.getShortMonth(this.currentNavigatedDateWeek.getMonth()) + ' - ' + endDate.getDate() + ' ' + Helper.getShortMonth(endDate.getMonth()) + ' ' + this.currentNavigatedDateWeek.getFullYear();
    }

    return this.currentNavigatedDateWeek.getDate() + ' ' + Helper.getShortMonth(this.currentNavigatedDateWeek.getMonth()) + ' ' + this.currentNavigatedDateWeek.getFullYear() + ' - ' + endDate.getDate() + ' ' + Helper.getShortMonth(endDate.getMonth()) + ' ' + endDate.getFullYear();
  }

  /**
   * Get current date of the week
   */
  getCurrentNavigatedDateWeek() {
    let difference = this.currentDate.getDay() - 1;
    if (difference < 0)
      difference += 7;
    return new Date(this.currentDate.getTime() + (-1 * difference * 24 * 60 * 60 * 1000));
  }

  /**
   * Get month view dates
   */
  getMonthDates() {
  //  this.monthHeader = Helper.getFullMonth(this.currentNavigatedDateMonth.getMonth()) + ' ' + this.currentNavigatedDateMonth.getFullYear();
  this.monthHeader = Helper.getFullMonth(this.currentNavigatedDateMonth.getMonth());
  let currentMonthNumberOfDays = new Date(this.currentNavigatedDateMonth.getFullYear(), this.currentNavigatedDateMonth.getMonth() + 1, 0).getDate();
    this.currentMonthDates = [];
    for (let i = 1; i <= currentMonthNumberOfDays; i++) {
      this.currentMonthDates.push(new Date(this.currentNavigatedDateMonth.getFullYear(), this.currentNavigatedDateMonth.getMonth(), i));
    }
    let firstDay = this.currentMonthDates['0'].getDay() + 1;
    this.row = 0;
    this.column = firstDay;
    //Clear month divs
    let items = document.getElementsByClassName('monthDiv');
    for (let i = 0; i < items.length; i++) {
      let item = <HTMLDivElement>items.item(i);
      //item.style.height = '30px';
      item.innerHTML = '';
    }

    this.currentMonthDates.forEach(element => {
      this.setMonthDivs(element, currentMonthNumberOfDays);
    });
  }

  /**
   * Set month dates
   * @param date 
   * @param monthDays 
   */
  setMonthDivs(date: Date, monthDays: number) {
    //let startDayNumber = this.currentNavigatedDateMonth.getDay();
    //let endDayNumber = new Date(this.currentNavigatedDateMonth.getTime() + (monthDays - 1) * 24 * 60 * 60 * 1000).getDay();

    var xname = "App" + this.row + this.column;
    this.row = this.column == 7 ? this.row + 1 : this.row;
    this.column = this.column == 7 ? 1 : this.column + 1;

    let dt = document.createElement('div');
    dt.innerText = date.getDate().toString();
    let div = document.getElementById(xname);
    if (div != null) {
      div.setAttribute('name', date.getMonth().toString() + date.getDate().toString());
      div.appendChild(dt);
    }
  }

  /**
     * Navigate to previous week
     */
  goToPrevWeek() {
    this.currentNavigatedDateWeek = new Date(this.currentNavigatedDateWeek.getTime() - 7 * 24 * 60 * 60 * 1000);
    this.getWeekAppointments();
  }

  /**
   * Navigate to next week
   */
  goToNextWeek() {
    this.currentNavigatedDateWeek = new Date(this.currentNavigatedDateWeek.getTime() + 7 * 24 * 60 * 60 * 1000);
    this.getWeekAppointments();
  }

  /**
     * Navigate to previous date
     */
  goToPrevDay() {
    this.currentNavigatedDateDay = new Date(this.currentNavigatedDateDay.getTime() - 24 * 60 * 60 * 1000);
    this.getDayAppointments();
  }

  /**
   * Navigate to next date
   */
  goToNextDay() {
    this.currentNavigatedDateDay = new Date(this.currentNavigatedDateDay.getTime() + 24 * 60 * 60 * 1000);
    this.getDayAppointments();
  }

  /**
   * Navigate to previous date
   */
  goToPrevMonth() {
    this.currentNavigatedDateMonth = new Date(this.currentNavigatedDateMonth.getFullYear(), this.currentNavigatedDateMonth.getMonth() - 1, 1);
    this.getMonthDates();
    this.getMonthAppointments();
  }

  /**
   * Navigate to next date
   */
  goToNextMonth() {
    this.currentNavigatedDateMonth = new Date(this.currentNavigatedDateMonth.getFullYear(), this.currentNavigatedDateMonth.getMonth() + 1, 1);
    this.getMonthDates();
    this.getMonthAppointments();
   
  }

  /**
   * Open appointment popup
   * @param appointment 
   */
  showAppointmentPopup(appointment: any) {
    let appointmentPopup = this.modalCtrl.create('AppointmentPopupPage', appointment);
    appointmentPopup.onDidDismiss((data) => {
      if (data != null && data.hasOwnProperty('flag') && data.flag == 'updateAppointments') {
        if (this.selectedTab.name == 'DAY')
          this.getDayAppointments();
        else if (this.selectedTab.name == 'WEEK')
          this.getWeekAppointments();
        else if (this.selectedTab.name == 'MONTH')
          this.monthAppointments();
      }
      else if (data != null && data.hasOwnProperty('flag') && data.hasOwnProperty('msg') && data.flag == 'updateAppointments' && data.msg == 'cancel') {
        let cancelRefundPopup = this.modalCtrl.create('CancelRefundPopupPage', data);
        cancelRefundPopup.onDidDismiss((data) => {
          if (data != null && data.hasOwnProperty('flag') && data.flag == 'updateAppointments') {
            if (this.selectedTab.name == 'DAY')
              this.getDayAppointments();
            else if (this.selectedTab.name == 'WEEK')
              this.getWeekAppointments();
            else if (this.selectedTab.name == 'MONTH')
              this.getMonthAppointments();
          }
        });
        cancelRefundPopup.present();
      }
    });
    appointmentPopup.present();
  }



  
  /**
    * Get today's appointments
    */
   async getAppointments() {
    var request = {
      StartDate: this.datePipe.transform(new Date(), "yyyy-MM-dd"),
      EndDate: this.datePipe.transform(new Date(),"yyyy-MM-dd"),
      MemberId: AppState.UserCred['userid']
      //  ProviderId: AppState.UserCred['userid'],
    };
    if (!AppState.IsWemaLife)
      request['CompanyId'] = AppState.UserCred.currentCompany.companyid;

    var response = await this.apiProvider.Post(AppConst.GET_APPOINTMENTS, request).toPromise();
    if (response != null && response['records'].length > 0) {
      this.Appointments = response['records'].filter(x => x.status != '3' && x.type == 'appointment' && x.status != '9');
      this.isAppointmentsEmpty = this.Appointments.length == null || this.Appointments.length == 0;
      this.Appointments.forEach(element => {
        var date = new Date(element.start);
        var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();//date.getHours().toString().length==1?date.getHours().toString()+'0':date.getHours();
        var minutes = date.getMinutes().toString().length == 1 ? date.getMinutes().toString() + '0' : date.getMinutes();
        var meridian = date.getHours() > 12 ? 'PM' : 'AM';
        element['formattedStart'] = hours + ':' + minutes + ' ' + meridian;
        element['durationHrs'] = Math.ceil(Math.abs(new Date(element.start).getTime() - new Date(element.end).getTime()) / (60 * 60 * 1000));

        if (element.status == "4")
          element['checkInText'] = "Check-out";
        else if (element.status == "5")
          element['checkInText'] = "Completed";
        else if (element.status == "3" || element.status == "8")
          element['checkInText'] = "Cancelled";
        else
          element['checkInText'] = "Check-in";
      });
    }
    else
      this.isAppointmentsEmpty = true;
  }
  
  /**
   * CheckIn
   * @param appointment 
   */
  checkIn(appointment: any) {
    if (appointment != null) {
      if (appointment.status == "5" || appointment.status == "3" || appointment.status == "8") return;
      let data = {
        appointment: appointment,
        type: appointment.status == "4" ? "checkout" : "checkin"
      };
      this.navCtrl.push('QrcodePage', data);
    }
  }
}