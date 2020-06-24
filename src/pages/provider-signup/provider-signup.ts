import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { EmailValidator, Validators, AbstractControl,  FormGroup, FormControlName, FormControl } from '@angular/forms';
import { AppConst } from '../../AppConst';
import { AppState } from '../../AppStates';
import { ApiProvider } from '../../providers/api/api';
import { DatePicker } from '@ionic-native/date-picker';


/**
 * Generated class for the ProviderSignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-provider-signup',
  templateUrl: 'provider-signup.html',
})
export class ProviderSignupPage {
  confirmPassword: any;
  password: any;
  showPass: boolean = false;
  showConfirmPass: boolean = false;
  Title=["Prof" ,"Dr","Mr","Mdm" ,"Mrs","Miss"]
  isMatched: boolean = true;
  values: {} = {};
  services: any;
  isSubmitted:boolean;
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  myForm:FormGroup;
  firstname:FormControl;
  lastname:FormControl;
  emailid:FormControl;
  contact:FormControl;
  company_name:FormControl;
  service:any;
 
  message:FormControl;
  data: { firstname: string,lastname: string, emailid: string,company_name:string, contact: string,service:string } = { firstname: null,lastname: null, emailid: null, company_name: null,contact:null,service:null};
  Date: Date;
  constructor( private datePicker: DatePicker,public navCtrl: NavController,private apiProvider:ApiProvider,private toastCtrl :ToastController, private alertCtrl :AlertController,public navParams: NavParams) {

    this.firstname=new FormControl('',Validators.required);
    this.lastname=new FormControl('',Validators.required);
    this.company_name=new FormControl('',Validators.required);
    this.emailid = new FormControl('', [
      Validators.required,
      Validators.pattern(this.emailPattern)
    ]);
    this.contact=new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]);
  
    this.myForm=new FormGroup({
      firstname:this.firstname,
      lastname:this.lastname,
      emailid:this.emailid,
      contact:this.contact,
      company_name:this.company_name,
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProviderSignupPage');
  }
  /**
   * Send enquiry button click handler
   */
  async submit()
  {
    console.log(this.myForm.value,
      
      
      // this.data.Address=this.myForm.value.Address,
     //  this.data.Address1=this.myForm.value.Address1,
     //  this.data.City=this.myForm.value.City,
       this.data.contact=this.myForm.value.contact,
     //  this.data.contact1=this.myForm.value.contact1,
       this.data.emailid=this.myForm.value.emailid,
       this.data.firstname=this.myForm.value.firstname,
       this.data.lastname=this.myForm.value.lastname,
       this.data.company_name=this.myForm.value.company_name,
       this.data.service=this.myForm.value.service,
       console.log(this.data)
    )

   
    
    if(this.firstname.valid&&this.emailid.valid&&this.contact.valid&&this.company_name.valid){
        var request = {
                      Firstname: this.myForm.value.firstname,
                      Lastname: this.myForm.value.lastname,
                      company_name: this.myForm.value.company_name,
                      email: this.myForm.value.emailid,
                      phone: this.myForm.value.contact,
                      service: this.service,
                      title: this.myForm.value.Title,
                  
               };
  
        var response = await this.apiProvider.Post(AppConst.PROVIDER_REGISTER_WEMALIFE, request).toPromise();
        if (response != null && response['status']) {
         this.toastCtrl.create({
            message: "Thanks for showing your Interest at WemaLife, Our team will contact you shortly.",
            duration: 2000
          }).present();
          this.navCtrl.pop();
          this.data = { firstname: null,lastname: null, emailid: null, company_name: null,contact:null,service:null};
         
        } else {
          this.toastCtrl.create({
            message: 'Sorry something went wrong, Please try again',
            duration: 2000
          }).present();
        }
      }
     
    else {
      this.alertCtrl.create({
        title: 'Information required',
        message: 'Information required'
      }).present();
    }
    this.isSubmitted=true;
    if(this.firstname.valid&&this.emailid.valid&&this.contact.valid&&this.company_name.valid){
      this.data.firstname=this.firstname.value;
      this.data.emailid=this.emailid.value;
      this.data.contact=this.contact.value;
      this.data.company_name=this.company_name.value;
      this.service=this.service.value;
    }
  }

}
