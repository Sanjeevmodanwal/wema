import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,ModalController,AlertController, ToastController} from 'ionic-angular';
import { AppState } from '../../AppStates';
import { ApiProvider } from '../../providers/api/api';
import { AppConst } from '../../AppConst';
/**
 * Generated class for the PastCommentPopUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-visit-comment-pop-up',
  templateUrl: 'visit-comment-pop-up.html',
})
export class VisitCommentPopUpPage {
  data:any;
  comments:any;
  constructor(public navCtrl: NavController,private apiProvider: ApiProvider,private toastCtrl: ToastController, public navParams: NavParams,private viewCtrl:ViewController, private modalCtrl: ModalController,private alertCtrl:AlertController) {
    this.data=navParams.data;
   
  }
 
  ionViewDidEnter() {
    console.log('ionViewDidEnter PastCommentPopUpPage');
    console.log(this.data);
  }


      async Submit(){
        console.log(this.data)
        if (this.data.comments!= ''  ) {
          
          var request = {
            
            Action :"rating",
            AppointmentId : this.data.appointmentid,
            Comments : this.data.comments,
            Activities : this.data.activities,
            CompanyId :this.data. apptcompanyid,
            ApptSource :this.data.apptsource
           
          };
     
          if (AppState.IsMember)
            request['memberid'] = AppState.UserCred.userid;
          else
            request['providerid'] = AppState.UserCred.userid;
      
            
            let response=await this.apiProvider.Post(AppConst.ADD_OR_UPDATE_COMMENTS,request).toPromise();
            if (response != null && response['status']){
              
                this.toastCtrl.create({
                  message:'Comments Updated Successfully', 
                  duration: 2000
                }).present();

                this.viewCtrl.dismiss();
            }
            else {
              this.toastCtrl.create({
                message: 'Something went wrong, please try again',
                duration: 1000
              }).present();
            }
            
            
          }
        
        }
        dismiss(){
          
             this.viewCtrl.dismiss(); 
        }
      }
