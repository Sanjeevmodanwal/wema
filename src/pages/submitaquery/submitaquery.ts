import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,ViewController  } from 'ionic-angular';
import { EmailValidator, Validators, AbstractControl,  FormGroup, FormControlName, FormControl } from '@angular/forms';
import { AppState } from '../../AppStates';
import { ApiProvider } from '../../providers/api/api';
import { AppConst } from '../../AppConst';
/**
 * Generated class for the SubmitaqueryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-submitaquery',
  templateUrl: 'submitaquery.html',
})
export class SubmitaqueryPage {

  services: any;
  isSubmitted:boolean;
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  myForm:FormGroup;
  name:FormControl;
  email:FormControl;
  contact:FormControl;
  postcode:FormControl;
  message:FormControl;
  data: { name: string, email: string, contact: string, postcode: string, service: any, message: string } = { name: null, email: null, contact: null, postcode: null, service: null, message: null };
  appState=AppState;
  company: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private apiProvider :ApiProvider,private toastCtrl:ToastController, private viewCtrl: ViewController) {
    this.company = navParams.data;
    this.services=navParams.data.services
    console.log( this.company)
    this.name=new FormControl('',Validators.required);
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern(this.emailPattern)
    ]);
    this.contact=new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]);
   this.postcode=new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(6)]);
    this.message=new FormControl('',[Validators.required]);
    this.myForm=new FormGroup({
      name:this.name,
      email:this.email,
      contact:this.contact,
      postcode:this.postcode,
      message:this.message
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubmitaqueryPage');
  }

  /**
   * 
   * @param list 
   * @param id 
   * @param property 
   */
  selectService(list: any[], service: any, property: string) {
    console.log("selectservice called");
  }

  /**
   * Validate all fields
   */
  validate() {
    for (var key in this.data) {
      if (this.data.hasOwnProperty(key) && this.data[key] != null)
        continue;
      else
        return false;
    }
    return true;
  }

  /**
   * Send enquiry button click handler
   */
  submit() {
    /*var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(this.data.email)) {
      // Invalid Email
      console.log("invalid email");
    }
    else
      console.log("valid email");

    if (this.validate()) {
      console.log(this.data.service);
      this.viewCtrl.dismiss(this.data);
    }
    
    &&this.postcode.valid
    &&this.data.service!=null*/
    this.isSubmitted=true;
    if(this.name.valid&&this.email.valid&&this.postcode.valid&&this.data.service!=null&&this.contact.valid&&this.message.valid){
      this.data.name=this.name.value;
      this.data.email=this.email.value;
      this.data.contact=this.contact.value;
      this.data.postcode=this.postcode.value;
      this.data.message=this.message.value;
      console.log(this.data);
      this.viewCtrl.dismiss(this.data).catch();
//this.SendEnq();
    
      }
    }
    //   async SendEnq()
    //   {
    //   var request = {
    //     city: this.company.city,
    //  // city: "delhi",
    //       email: this.data.email,
    //       enquireCompanyEmailId: this.company.companyemailid,
    //       enquireCompanyId: this.company.companyid,
    //       message: this.data.message,
    //       name: this.data.name,
    //       phone: this.data.contact,
    //       postcode: this.data.postcode,
    //     serviceselected: { serviceid: this.data.service.serviceid, servicename: this.data.service.servicename }
    //     };
    //     console.log(request);
    //     var response = await this.apiProvider.Post(AppConst.SEND_ENQUIRY, request).toPromise();
    //     if (response != null && response.hasOwnProperty('status') && response['status'] == 1)
    //       this.toastCtrl.create({
    //         message: "Your feedback saved successfully",
    //         duration: 2000
    //       }).present();
      
    //       this.viewCtrl.dismiss(this.data);
        
    //     }
 
}
