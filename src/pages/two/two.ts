import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { AppConst } from '../../AppConst';
/**
 * Generated class for the TwoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-two',
  templateUrl: 'two.html',
})
export class TwoPage {
  Data=[];
  Care=[];
  constructor(public navCtrl: NavController, public navParams: NavParams ,private apiProvider :ApiProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarePage');
    this.CareCompany();
    this.GetpoularServices()
  }
  async CareCompany()
  {
    var response = await this.apiProvider.Post(AppConst.GET_Random_Company ).toPromise();

    console.log(response)
  }

  async GetpoularServices()
  {
    var response = await this.apiProvider.Post(AppConst.GET_PopulerServices).toPromise();
    console.log(response)
    this.Data.push(response)
  console.log(this.Data)
   this.Care=this.Data[0].data
   console.log(this.Data[0].data)

  }
}
