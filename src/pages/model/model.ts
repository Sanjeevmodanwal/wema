import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController  } from 'ionic-angular';

/**
 * Generated class for the ModelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-model', 
  templateUrl: 'model.html',
})
export class ModelPage {
  title: string;
  reason: string = '';
  name: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
   console.log(navParams.data)
   this.name=navParams.data.membername 
    this.title = navParams.data.title;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModelPage');
  }

  // ionViewWillLoad() {
  //   const data = this.navParams.get('data');
  //   console.log(data);
  // }
  dismiss(flag: string) {
    if (flag == 'cancel')
    this.viewCtrl.dismiss();
  else {
    if (this.reason != '')
      this.viewCtrl.dismiss(this.reason);
  }
    // if (flag == 'cancel')
    // this.viewCtrl.dismiss();
    // const data = {
    //   name: 'John Doe',
    //   occupation: 'Milkman'
    // };
    // this.view.dismiss(data);
  }

  
  // /**
  //  * Dismiss the popup
  //  */
  // dismiss(flag: string) {
  //   if (flag == 'cancel')
  //     this.viewCtrl.dismiss();
  //   else {
  //     if (this.reason != '')
  //       this.viewCtrl.dismiss(this.reason);
  //   }
  // }

}
