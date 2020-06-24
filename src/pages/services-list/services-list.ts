import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController, LoadingController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { AppConst } from '../../AppConst';
import { ServicesInfoPage } from '../services-info/services-info';
import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the ServicesListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-services-list',
  templateUrl: 'services-list.html',
})
export class ServicesListPage {
  isServicesVisible = false;
  search: boolean = false;
  services: any;
  filteredServices: any;
  Data=[];
  Care=[];
  filterIndex = -1;
  sortIndex = -1;
  searchData: any;
  companyname: any;
  constructor( private viewCtrl:ViewController,public navCtrl: NavController, public navParams: NavParams ,private apiProvider :ApiProvider, private loadingController: LoadingController) {
 
    console.log(navParams.data)
 //   this.Care=navParams.data
    console.log(navParams.data.companyname)
   this.companyname=navParams.data.companyname
    console.log(navParams.data.offeredservices)
    this.Care=navParams.data

  }
  
  
  ionViewDidLoad() {
 
   

    console.log('ionViewDidLoad services list ');
    //this.CareCompany();
    //this.GetpoularServices()
  
  }
  Goback()
  {
    this.viewCtrl.dismiss()
  }
  
  // async CareCompany()
  // {
  //   var response = await this.apiProvider.Post(AppConst.GET_Random_Company ).toPromise();
  //   console.log(response)
  // }


//   async GetpoularServices()
//   {

//     var response = await this.apiProvider.Post(AppConst.GET_PopulerServices).toPromise();
//     console.log(response)
// this.Data.push(response)
// console.log(this.Data)
//  this.Care=this.navParams.data.offeredservices
// console.log(this.Data[0].data)
//   }
 
 page_info(item,i)
  {
console.log(item)
console.log(i)

//  this.navCtrl.push(TabsPage ,item)
  }
  // toggleSearch() {
  //   if (this.search) {
  //     this.search = false;
  //   } else {
  //     this.search = true;
  //   }
  // }

/*
  @param keyword Search the service
   */
  // searchService(keyword: any) {
  //   this.isServicesVisible = true;
  //   let val = keyword.target.value;
  //   if (val && val.trim() != '') {
  //     this.filteredServices = this.services.filter(x => x.servicename.toLowerCase().startsWith(val.toLowerCase()));
  //   }
  //   else
  //     this.isServicesVisible = false;
  // }

  // onSelectedService(item: any) {
  //   this.isServicesVisible = false;
  //  // this.Care.=item;
  // //  this.GetpoularServices();
  //   this.filterIndex=-1;
  // }


  dismissPopup(item,i){
  console.log(item,i)
    this.viewCtrl.dismiss(item);
  }
}
