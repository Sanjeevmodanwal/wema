import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the ProvidersServicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-providers-services',
  templateUrl: 'providers-services.html',
})
export class ProvidersServicesPage {
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
  constructor(public navCtrl: NavController, public navParams: NavParams ,private apiProvider :ApiProvider, private loadingController: LoadingController) {
    console.log(navParams.data)
    this.Care=navParams.data
    return;
  
  }
  
  
  ionViewDidLoad() {
 
    console.log('ionViewDidLoad Provider services ');
   
   // this.CareCompany();
  // this.GetpoularServices()
  
  }
  ionViewWillEnter() {
    console.log('ionViewWillEnter FaqsPage');
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter FaqsPage');
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave FaqsPage');
  }

  ionViewDidLeave() {
    console.log('ionViewDidLeave FaqsPage');
  }

  ionViewWillUnload() {
    console.log('ionViewWillUnload FaqsPage');
  }

  ionViewCanEnter() {
    console.log('ionViewCanEnter FaqsPage');
  }

  ionViewCanLeave() {
    console.log('ionViewCanLeave FaqsPage');
  }
//   ionViewDidLeave()
//   {
// alert('view leave ')

//   }
//   async CareCompany()
//   {
//     var response = await this.apiProvider.Post(AppConst.GET_Random_Company ).toPromise();

//     console.log(response)
//   }
//   async GetpoularServices()
//   {
//     var response = await this.apiProvider.Post(AppConst.GET_PopulerServices).toPromise();
//     console.log(response)
// //this.Data.push(response['data'])
// //console.log(this.Data)
//  //this.Care=response['data']
//  //this.navParams.data.offeredservices
// console.log(this.Data[0].data)
//   }
 
//  /* page_info(item,i)
//   {
// console.log(item)
// console.log(i)
//   this.navCtrl.push(TabsPage ,item)
//   }*/
//   toggleSearch() {
//     if (this.search) {
//       this.search = false;
//     } else {
//       this.search = true;
//     }
//   }

// /*
//   @param keyword Search the service
//    */
//   searchService(keyword: any) {
//     this.isServicesVisible = true;
//     let val = keyword.target.value;
//     if (val && val.trim() != '') {
//       this.filteredServices = this.services.filter(x => x.servicename.toLowerCase().startsWith(val.toLowerCase()));
//     }
//     else
//       this.isServicesVisible = false;
//   }

//   onSelectedService(item: any) {
//     this.isServicesVisible = false;
//    // this.Care.=item;
//   //  this.GetpoularServices();
//     this.filterIndex=-1;
//   }

  page_info(item,i)
  {
console.log(item)
console.log(i)
item['companyid']=this.navParams.data.companyid
item['providerid']=this.navParams.data.providerid
  this.navCtrl.push('SevenPage',item)
  }
}
