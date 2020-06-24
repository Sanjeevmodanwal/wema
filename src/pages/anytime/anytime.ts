import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from '../../../node_modules/ionic-angular/navigation/view-controller';
import { DatePicker } from '@ionic-native/date-picker';
import { DatePipe } from '@angular/common';
/**
 * Generated class for the AnytimePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-anytime',
  templateUrl: 'anytime.html',
})
export class AnytimePage {
  Date: Date;
  date: string;
  Time: Date;
  Date1: string;
  FormatedDate: string;
  FormatedTime: string;

  constructor(  private datePipe: DatePipe,public navCtrl: NavController,private viewCtrl :ViewController,private datePicker: DatePicker, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad AnytimePage');
    this.date = new Date().toISOString();
  }


AnyTime()
{
  this.viewCtrl.dismiss("Any time")
}

ShowDate()
{
  this.datePicker.show({
    date: new Date(),
    mode: 'datetime',
    androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
  }).then(
  
    datetime =>{
      //console.log('Got date: ', datetime)
     // let scanResult = datetime.split(' ');
      this.Date= datetime
      this.FormatedDate = this.datePipe.transform(datetime, 'dd/MM/yy');
      this.FormatedTime=this.datePipe.transform(datetime, ' h:mm a ');
 //console.log( 'date and time ',this.FormatedDate ,this.FormatedTime)
      //  let newdate= this.Date.plit("")
     // this.getAvailableSlots();
    } ,
    err => console.log('Error occurred while getting date: ', err)
  );
  //console.log(this.date)
 
}
dismiss()
{
  this.viewCtrl.dismiss({Date:this.FormatedDate ,Time:this.FormatedTime})
 //this.viewCtrl.dismiss({Date:"1-14-2019" ,Time:"7:12"})
}

}
