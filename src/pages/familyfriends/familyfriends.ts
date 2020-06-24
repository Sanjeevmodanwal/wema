import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Modal, ModalController, ModalOptions, ToastController, AlertController, Button  } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { AppState } from '../../AppStates';
import { AppConst } from '../../AppConst';
import { FamliyfriendspopupPage } from '../famliyfriendspopup/famliyfriendspopup';
import { ManagerProfilePage } from '../manager-profile/manager-profile';
import { AddFriendsFamilyPage } from '../add-friends-family/add-friends-family';
import { AddFriendsMemberAccountPage } from '../add-friends-member-account/add-friends-member-account';
//import { CallNumber } from '@ionic-native/call-number';

/**
 * Generated class for the FamilyfriendsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-familyfriends',
  templateUrl: 'familyfriends.html',
})
export class FamilyfriendsPage {
  pet: string = "kittens";
  isAndroid: boolean = false;
  mobilenumber: any;
  isEmpty: boolean;
  FriendsAndFamily: any;
  SelectedUser: any;
  ContactNo: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl :AlertController, private toastCtrl :ToastController,private apiProvider :ApiProvider, public platform: Platform, private modal: ModalController,
    //private callNumber: CallNumber
    ) {
    this.isAndroid = platform.is('android');
  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad FamilyfriendsPage');
    this.getSavedFriendsAndFamily()

  }

ion

/* callJoint(telephoneNumber :any) {
  this.ContactNo =  telephoneNumber;
  this.callNumber.callNumber(this.ContactNo, true);
} */
  /**
   * Get friends list of user
   */
  async getSavedFriendsAndFamily() {
    let filters = [
      { fieldName: "userid", fieldvalue: AppState.UserCred.userid, operators: "Equal" },
      { fieldname: "usertypeid", fieldvalue: "7", operators: "Equal" }

    ]
    var request = {
      filter: filters,
      filterproperty: { offset: 0, orderby: "firstname", recordlimit: 0 },
      Primarycontact: AppState.UserCred['userid']['primarycontact'],
      Mobilenumber: this.mobilenumber

    };

    let response = await this.apiProvider.Post(AppConst.GET_SAVED_FRIENDS_AND_FAMILY, request).toPromise();
    if (response != null) {
      if (response['totalrecord'] == 0)
        this.isEmpty = true;
      else if (response.hasOwnProperty('records') && response['records'].length > 0) {
        //this.FriendsUser = response['records'];
        this.FriendsAndFamily = response['records'];
        this.isEmpty = false;
      }
    }
    console.log(this.FriendsAndFamily)
  }

  /**
     * Expand the list item
     * @param item 
     */
  expandItem(item) {
    this.SelectedUser = item;
    this.FriendsAndFamily.map((listItem) => {
      if (item.userid != '0') {
        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
      }
      return listItem;
    });
  }

  /**
   * delete member 
   * @param item 
   */
   async deleteMemberList(userdata: any) {
    console.log(userdata);
    this.alertCtrl.create({
      message: "Do you want to delete?",
      buttons: [
        'No',
        {
          text: "Yes",
          handler: () => {
            var request = {
              action: "Deletefriend",
              userid: userdata.userid,
              deletedby: AppState.UserCred.userid,
              companyid:  userdata.companyid
            };
            this.apiProvider.Post(AppConst.DELETE_MEMBER, request).subscribe((response) => {
              if (response != null && response['status']) {
                this.toastCtrl.create({
                  message:'User has been deleted.',
                  duration:2000
                }).present();
                this.getSavedFriendsAndFamily();
              } 
              else {
                this.toastCtrl.create({
                  message: 'Something went wrong',
                  duration: 2000
                }).present();
              }
            });
          }
        }
      ]
    }).present();
  }


 

  /**
   * Set primary contact
   * @param item 
   */
  async checkbox(user: any) {
    //var userid = this.FriendsAndFamily.filter(s => s.userid == s.toString())[0];
    console.log(user);
    if (user.primarycontact == "1") {
      this.toastCtrl.create({
        message: "Already as your primary contact",
        duration: 2000,
      }).present();
    }
    else {
      this.alertCtrl.create({
        message: "Do you want to set this Friend as yourPrimaryContact ",
        buttons: [
          'No',
          {
            text: "Yes",
            handler: () => {
              var request = {
                UserId: AppState.UserCred.userid,
                linkedid: user.userid
              };

              this.apiProvider.Post(AppConst.SET_PRIMARY_CONTACT, request).subscribe((response) => {
                if (response != null && response['status']) {
                  this.toastCtrl.create({
                    message:'User has been set as a primary contact',
                    duration:2000
                  }).present();
                  this.getSavedFriendsAndFamily();
                } 
                else {
                  this.toastCtrl.create({
                    message: 'Something went wrong',
                    duration: 2000
                  }).present();
                }
              });
            }
          }
        ]
      }).present();
    }
  }

  /**
   * Register Friends and Family
   */
  async registerFriends() {
    if(this.FriendsAndFamily==null || (this.FriendsAndFamily!=null&&this.FriendsAndFamily.length<=2)){
      let params={
        isMember:true,
        isSelfRegistration:false,
      };
    
      if(this.navParams.get('isDashboard')!=null)
        params['isDashboard']=this.navParams.get('isDashboard');
        this.navCtrl.push('AddFriendsMemberAccountPage',params);
    }
    else{
      this.alertCtrl.create({
        message:'There is a maximum of 3 friends and family accounts that can be linked to your profile'
      }).present();
    }
  }

 
  async Allow(item:any) {

    const myModal: Modal = this.modal.create('FamliyfriendspopupPage', { data: item });

       myModal.present();

       myModal.onDidDismiss((data) => {

        if(data!='')
        {
          var request = {
                          MemberId: AppState.UserCred.userid,
                         // linkedid: item.userid
                        };
            
                        this.apiProvider.Post(AppConst.memberInfo, request).subscribe((response) => {

                          if (response != null) {
                            /*this.toastCtrl.create({
                              message:'update scuccessfully ',
                              duration:2000
                            }).present();*/
                            this.navCtrl.push('ManagerProfilePage',{response:response ,profile:data});
                          } 
                          else {
                            this.toastCtrl.create({
                              message: 'Something went wrong',
                              duration: 2000
                            }).present();
                          }
                        });
        }

        else{
          console.log("I have dismissed.");
          console.log(data);
        }
            
            });
//let AllowPopup =this.modal.create ({FamliyfriendspopupPage,

  






// console.log(item)
//     let alert = this.alertCtrl.create({
//       title: '',
//       message: 'Ajay manages your profile ',
    
//       buttons: [
//         {
//           text: 'Deny',
//           role: 'No',
//           handler: () => {
//             console.log('No clicked');
//           }
//         },
//         {
//           text: 'Allow ',
//           cssClass: 'alertCustomCss',
//           handler: () => {

//             var request = {
//               MemberId: AppState.UserCred.userid,
//              // linkedid: item.userid
//             };

//             this.apiProvider.Post(AppConst.memberInfo, request).subscribe((response) => {
             
             
//               if (response != null) {
//                 this.toastCtrl.create({
//                   message:'update scuccessfully ',
//                   duration:2000
//                 }).present();
//                 this.getSavedFriendsAndFamily();
//               } 
//               else {
//                 this.toastCtrl.create({
//                   message: 'Something went wrong',
//                   duration: 2000
//                 }).present();
//               }
//             });
//             // var request =
//             // {
//             //   cartid: item.cartid
//             // };
//             // var result = this.apiProvider.Post(AppConst.REMOVE_CART_ITEM, request);
//             // result.subscribe((response) => {
//             //   if (response != null && response['status']) {
//             //     AppState.CartCount = AppState.CartCount - 1;


//             //     if (AppState.CartCount == 0) {
//             //       AppState.UniqueId = null;

//             //       AppState.BookMore = false;

//             //       //StopCartTimer();
//             //     }
//             //     else {
//             //       //MessagingCenter.Send<MessageEvent>(new MessageEvent(), "updatecart");
//             //     }

              
//             //  }
//           //  },
//            //   (err) => {

//            //   });

//           }
//         }
//       ]
//     });

//     alert.present();
//   }
  
//   // openModal() {

//   //   const myModalOptions: ModalOptions = {
//   //     enableBackdropDismiss: false
//   //   };

//   //   const myModalData = {
//   //     name: 'Paul Halliday',  
//   //     occupation: 'Developer'
//   //   };

//   //   const myModal: Modal = this.modal.create(FamliyfriendspopupPage, { data: myModalData }, myModalOptions);

//   //   myModal.present();

//   //   myModal.onDidDismiss((data) => {
//   //     console.log("I have dismissed.");
//   //     console.log(data);
//   //   });

//   //   myModal.onWillDismiss((data) => {
//   //     console.log("I'm about to dismiss");
//   //     console.log(data);
//   //   });
  
//   // }



  }
  addnewMembers()
  {
  this.navCtrl.push('AddFriendsFamilyPage')
  }
}
