import { DatePipe } from "@angular/common";


export class Helper {

  static emailPattern=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  static passwordPattern= /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;
  static mobilePattern=/^[0-9]{10}$/;
  //static postcodePattern=/^[a-z][A-Z][0-9]{6}$/; 
  static postcodePattern=/^([0-9]|[a-zA-Z]|([0-9][a-zA-Z]|[a-zA-Z][0-9]|[0-9a-zA-Z])){6,8}$/;
  //static emptyoranyPattern=/^[0-9a-zA-Z]*$/;
  /**
   * Return the date in 'Day dd-MMM-yyyy' format
   */
  static getTodayFormattedDate() {
    var datePipe = new DatePipe('en-US');
    var date = new Date();
    var weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
    var day = weekDays[date.getDay() - 1];
    var formattedDate = day + ' ' + datePipe.transform(date, 'dd MMM yyyy');
    return formattedDate;
  }
  
  /**
* Get month name by month number
* @param month 
*/
  static getShortMonth(month: number) {
    switch (month) {
      case 0:
        return 'Jan';
      case 1:
        return 'Feb';
      case 2:
        return 'Mar';
      case 3:
        return 'Apr';
      case 4:
        return 'May';
      case 5:
        return 'Jun';
      case 6:
        return 'Jul';
      case 7:
        return 'Aug';
      case 8:
        return 'Sep';
      case 9:
        return 'Oct';
      case 10:
        return 'Nov';
      case 11:
        return 'Dec';
    }
  }

  /**
* Get month name by month number
* @param month 
*/
  static getFullMonth(month: number) {
    switch (month) {
      case 0:
        return 'January';
      case 1:
        return 'February';
      case 2:
        return 'March';
      case 3:
        return 'April';
      case 4:
        return 'May';
      case 5:
        return 'June';
      case 6:
        return 'July';
      case 7:
        return 'August';
      case 8:
        return 'September';
      case 9:
        return 'October';
      case 10:
        return 'November';
      case 11:
        return 'December';
    }
  }

  /**
   * Get day of week
   * @param dayOfWeek 
   */
  static getDay(dayOfWeek: any) {
    switch (dayOfWeek) {
      case 1:
        return 'Monday';
      case 2:
        return 'Tuesday';
      case 3:
        return 'Wednesday';
      case 4:
        return 'Thursday';
      case 5:
        return 'Friday';
      case 6:
        return 'saturday';
      case 7:
        return 'Sunday';

      default: "Invalid day";
        break;
    }
  }
  
  /**
   * Get day of week
   * @param dayOfWeek 
   */
  static getExactDay(dayOfWeek: any) {
    switch (dayOfWeek) {
      case 1:
        return 'Monday';
      case 2:
        return 'Tuesday';
      case 3:
        return 'Wednesday';
      case 4:
        return 'Thursday';
      case 5:
        return 'Friday';
      case 6:
        return 'Saturday';
      case 0:
        return 'Sunday';

      default: "Invalid day";
        break;
    }
  }

  static getFormatedTime(dateString){
    var date = new Date(dateString);
    var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    var am_pm = date.getHours() >= 12 ? "pm" : "am";
    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    let time = hours + ":" + minutes + " " + am_pm;
    return time;
  }
  static getCountryCurrencySymbol(countryid){
    let symbol = '';
      if(countryid == '2') {  symbol = '₹'; }
      if(countryid == '1') {  symbol = '£'; }
    return symbol;
  }
}