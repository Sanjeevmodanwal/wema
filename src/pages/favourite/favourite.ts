import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ToastController } from 'ionic-angular';
import { AppState } from '../../AppStates';
import { ApiProvider } from '../../providers/api/api';
import { AppConst } from '../../AppConst';


/**
 * Generated class for the FavouritePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favourite',
  templateUrl: 'favourite.html',
})
export class FavouritePage {
  FavroutiesData=[] ;
  Nullfav: true;
  ServicesId: any;
  providerpicture: string;
  isFavoutiesEmpty:boolean = true;
  loader: any;
  compdefaultServiceid:any='';
  constructor(public navCtrl: NavController, public navParams: NavParams ,private apiProvider: ApiProvider,  public loadingCtrl: LoadingController, private toastCtrl :ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavouritePage');
    this.loader = this.loadingCtrl.create({
      content:"please wait.."
    })
    this.loader.present()
    this.getFavroutiesstatus()
    this.providerpicture= AppConst.WEMA_DEV_ROOT+"images/company.jpg"
  }
  async getFavroutiesstatus(){

    let request=
    {
     //  fav_id:this.favid,
      // status:'0',
      // providerid:this.providerid,
     // companyid:this.companyid,
      type :"company",
      userid:AppState.UserCred.userid
    };
    let response = await this.apiProvider.Post(AppConst.showAllfav,request).toPromise()
    if(response==null)
    {
      this.Nullfav=true
    }
  for(let key in response['company'])
  {
   // console.log(response['company'][key])
    for (let i in response['company'][key])
    {
     // console.log(response['company'][key][i])
  //   if(response['company'][key][i].)
      for(let j in response['company'][key][i])
      {
    //  console.log(response[key][i][j].compinfo)
 // this.FavroutiesData.push(response[key][i][j].compinfo)
      for(let k in response['company'][key][i][j])
      {
     ///   console.log(response['company'][key][i][j])
      if(response['company'][key][i][j].compinfo!=''){
      //  console.log(response['company'][key][i][j][k].compinfo)
        if(response['company'][key][i][j].compinfo!=undefined){
          console.log(response['company'][key][i][j].compinfo)
          response['company'][key][i][j].compinfo['listingtype']='company'
          console.log(response['company'][key][i][j].compinfo)
          this.FavroutiesData.push(response['company'][key][i][j].compinfo)
      //  console.log('in data')
          this.isFavoutiesEmpty = false;
        }
      }
    //  this.FavroutiesData.push(response[key][i][j][k])
      // for(let l in response['company'][key][i][j][k])
      // {
      //   if(response['company'][key][i][j][k][l].compinfo!=''){
      //   console.log(response['company'][key][i][j][k][l])
      // //  this.FavroutiesData.push(response[key][i][j][k][l])
      //   }
      // }
      }
      }
      
    }
  }

  for(let key in response['provider'])
  {
    console.log(response['provider'][key].profile)
    response['provider'][key].profile['listingtype']='provider'
    this.FavroutiesData.push(response['provider'][key].profile);
    this.isFavoutiesEmpty = false;
  }
  console.log(this.FavroutiesData)

  this.loader.dismiss()
  }
  
  
  itemTapped( item){
  
    console.log("============================favourites - itemTapped============================");
    console.log(item);
    console.log("============================favourites - itemTapped============================");
    
    if(item.listingtype=="company"){
    
    //set compnany's default serviceid if company offered : start here
    if( !item.hasOwnProperty('serviceid')){
        if(item.offeredservices !=null){
          for(let k in item.offeredservices)
          {
            if(item.offeredservices[k].serviceid !=''){
              this.compdefaultServiceid =  item.offeredservices[k].serviceid;
            }
        }
        item["serviceid"] = this.compdefaultServiceid;
      }
    } //set compnany's default serviceid if company offered : start here

       this.navCtrl.push('CompanyProfilePage',item);
    
  // this.navCtrl.push(CompanyProfilePage)
    // console.log(item)
  }
  else
  {
   // item["serviceid"]='55'
   this.navCtrl.push('ProviderInfoPage',  item);
  // this.navCtrl.push(CompanyProfilePage)
     console.log(item)
  }
  }
}
