import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the MileagepopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mileagepopup',
  templateUrl: 'mileagepopup.html',
})
export class MileagepopupPage {
  miles:any
  calculatedresult: number;
  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MileagepopupPage');
  }
  
  ionViewWillLoad() {
    const data = this.navParams.get('data');
    console.log(data);
  }
  closeModal() {
    const data = {
      name: 'John Doe',
      occupation: 'Milkman'
    };
    this.view.dismiss(data);
  }

calculate()
{
  this.calculatedresult=8*this.miles
  console.log(this.calculatedresult)

}
}
