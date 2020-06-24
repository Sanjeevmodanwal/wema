import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { EmailValidator, Validators, AbstractControl,  FormGroup, FormControlName, FormControl } from '@angular/forms';
import { AppConst } from '../../AppConst';
import { AppState } from '../../AppStates';
import { ApiProvider } from '../../providers/api/api';
import { DatePicker } from '@ionic-native/date-picker';

import { SignupSuccessPage } from '../signup-success/signup-success';
import { retryWhen } from 'rxjs/operator/retryWhen';
/**
 * Generated class for the MemberSignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-member-signup',
  templateUrl: 'member-signup.html',
})
export class MemberSignupPage {
  confirmPassword: any;
  password: any;
  showPass: boolean = false;
  showConfirmPass: boolean = false;
  Country=["India","United Kingdom"];
  Gender=["Male" ,"Female","Other"];
  Title=["Prof" ,"Dr","Mr","Mdm" ,"Mrs","Miss"]
  termsAccepted:any;
  isMatched: boolean = true;
  isEmailMatched: boolean = true;
  isMobileMatched: boolean = true;
  isPasswordFormatMatched: boolean = true;
  isSpecialPasswordFormatMatched: boolean = true;
  values: {} = {};
  services: any;
  isSubmitted:boolean;
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  myForm:FormGroup;
  firstname:FormControl;
  lastname:FormControl;
  emailid:FormControl;
  contact:FormControl;
  contact1:FormControl;
  postcode:FormControl;
  City:FormControl;
  Address:FormControl;
  Address1:any;
  checklists :any;
  message:FormControl;
  TermsChecked :boolean = true;
  passworderrormsg= '';
  confirmpassworderrormsg
  data: { firstname: string,lastname: string, emailid: string,country:string, contact: string,contact1:string, postcode: string, Address: string ,City:string ,Address1:string,Country:string ,Title:string } = { firstname: null,lastname: null, emailid: null, contact: null,contact1:null, postcode: null, Address: null,country:null,Address1:null,City:null,Country:AppState.Country,Title:null };
  Date: Date;
  constructor( private datePicker: DatePicker,public navCtrl: NavController,private apiProvider:ApiProvider,private toastCtrl :ToastController, private alertCtrl :AlertController,public navParams: NavParams) {

    this.firstname=new FormControl('',Validators.required);
    this.lastname=new FormControl('',Validators.required);
    this.emailid = new FormControl('', [
      Validators.required,
      Validators.pattern(this.emailPattern)
    ]);
    this.contact=new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]);
    // this.contact1=new  FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]);
  //  this.postcode=new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(6)]);
  //  this.message=new FormControl('',[Validators.required]);
  // this.Address= new FormControl('',[Validators.required]);
   //  this.City= new FormControl('',[Validators.required]);
   //this.Country = new FormControl(this.Country,[Validators.required]);
  // this.Address= new FormControl('',[Validators.required]);
  // this.Address1= new FormControl('',[Validators.required]);
 // this.Country= new FormControl('',[Validators.required]);
    this.myForm=new FormGroup({
      firstname:this.firstname,
      lastname:this.lastname,
      emailid:this.emailid,
      contact:this.contact,
    //  contact1:this.contact1,
    //  postcode:this.postcode,
    //  Address:this.Address,

     // Country:this.Country, 
     // City: this.City
    });

   // this.navCtrl.push( SignupSuccessPage,{'data':''});
   this.checklists = [{
        title: "By signing up, you accept WeMa Life's <a href='https://www.wemalife.com/termscondition' target='_blank'>terms of use</a> and <a href='https://www.wemalife.com/privacy' target='_blank'>privacy policy</a>.",
        value: "1",
        checked: false
    }];
  }

  

    
  selectTerms(Termsvalue, ev) {
    if(ev.value) {
        this.TermsChecked = true;
    }else{
        this.TermsChecked = false;
    }
  }

 
  ionViewDidLoad() {
    console.log('ionViewDidLoad MemberSignupPage');
  }

  /**
   *Confirm Password match
   */
  passwordChange() {
    if (this.password != this.confirmPassword) {
      this.isMatched = false;
    }
    else {
      this.isMatched = true;
    }
  }
  /**
   *Password Format Check
   */
  passwordFormatChange() {
    this.isSpecialPasswordFormatMatched = true;
    if ( this.password != '') {
     
      var isPasswordFormatMatchedStstus = true;
     
      var passwordre = /^(?=.*[A-Z])(?=.*[0-9])(?=.*\d){8,}$/;
      if( !passwordre.test(this.password)){
        this.isPasswordFormatMatched = false;

        isPasswordFormatMatchedStstus = false;
      }
      // var specialre =  /^(?=.*[!@:;])$/;
      // if( isPasswordFormatMatchedStstus  &&  specialre.test(this.password)){
      //   this.isPasswordFormatMatched = true;
      //   this.isSpecialPasswordFormatMatched = false;
      // }
    }
    else {
      this.isPasswordFormatMatched = true;
    }
  }

  /**
   *Email  Check
   */
  emailChange() {
    if ( this.myForm.value.emailid != '') {
      this.isEmailMatched = false;
    }
    else {
      this.isEmailMatched = true;
    }
  }

  /**
   *Mobile  Check
   */
  mobileChange() {
    if ( this.myForm.value.contact != '') {
      this.isMobileMatched = false;
    }
    else {
      this.isMobileMatched = true;
    }
  }

   /**
     * Password show toggle
     */
    showPassword(flag: boolean) {
      if (flag)
        this.showPass = !this.showPass;
      else
        this.showConfirmPass = !this.showConfirmPass;
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
     // this.data.postcode=this.myForm.value.postcode,
      this.data.country=this.myForm.value.Country,
      
      console.log(this.data)
    )
    
  //  this.postcode=this.myForm.value.postcode
    var re = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;

    
   
   /* if(re.test(this.password) && this.isMatched ){
      
      
    }*/

   
    
    this.passworderrormsg ='';
    console.log("---------passwordFormatChange--------"+this.password);
    console.log("---------confirm passwordFormatChange--------"+this.confirmPassword);
    console.log("---------Title--------"+this.data.Title);
    if ( this.password != '' && this.password != undefined) {
     
      var isPasswordFormatMatchedStstus = true;
     
      var passwordre = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
      if( !passwordre.test(this.password)){

        this.passworderrormsg ='Please enter a password that is at least 8 characters long and contains one Upper case letter and at least one number.Specials characters are not accepted.';
        isPasswordFormatMatchedStstus = false;
      }
      
    }else{
      this.passworderrormsg ='Password is required.';
    }

      this.confirmpassworderrormsg = '';
     if(this.confirmPassword ==''){
       this.confirmpassworderrormsg ='Confirm password is required.';
     }else if(this.confirmPassword ==undefined){
      this.confirmpassworderrormsg ='Confirm password is required.';
     }else if(this.password!='' && this.confirmPassword!='' && !this.isMatched){
      this.confirmpassworderrormsg ='Please ensure both passwords match.';
     }
    
    
   
    if ( this.passworderrormsg == '' && this.confirmpassworderrormsg == '' && this.password!= undefined && this.confirmPassword!=undefined && this.data.Title!= null && this.firstname.valid&&this.emailid.valid&&this.contact.valid) {
      console.log('matched');
      
      //  this.values['password'] = this.password;
       // this.values['confirmpassword'] = this.confirmPassword;
      //  var memberObj: any = {};
      //  var registerObj: any = this.values;
        var databaseCountry = '2';
        if (!this.TermsChecked){  return; } 
        if(this.data.Country =='United Kingdom'){
          databaseCountry = '1'
        }

       
     
        var mobileWithCode = this.myForm.value.contact;
        if(databaseCountry == '1'){
          mobileWithCode = "+44"+this.myForm.value.contact;
        }else  if(databaseCountry == '2'){
          mobileWithCode = "+91"+this.myForm.value.contact;
        }
    
    
        var request = {
          action: 'C',
          createdby: '0',
          companyid: '1',
          firebase_id:AppState.DeviceToken,
          formid: '1',
         // userid: AppState.UserCred.userid,
         
         // membertype: 'someone',
          //memberstatus: '1',
         
          member:{
            confirmpassword: this.confirmPassword,
            county: databaseCountry,
            emailid: this.myForm.value.emailid,
            firstname: this.myForm.value.firstname,
            lastname: this.myForm.value.lastname,
            mobilenumber: mobileWithCode,
            password: this.password,
            title: this.data.Title,
            dateofbirth: "27-12-1979",
            gender: '1',
            country: databaseCountry,
            addressline: ' ',
            addressline1: ' ',
            city: ' ',
          //  addressline:this.myForm.value.Address,
           // addressline1: this.myForm.value.Address1,
          //  city:this.myForm.value.City,
          //  companyid: "1",
            
           // country: "2",
           
           // dateofbirth: "27-12-1979",
           
           // gender: this.data['Gender'],
          //  homenumber: this.myForm.value.contact1,
          //  postcode: this.myForm.value.postcode,
           // relationship: "Friend",
          },
          membertype: 'self',
          usertypeid: '4'
        };
        console.log("---------------------request--------------");
        console.log(request);
        console.log("---------------------request--------------");

  
        var response = await this.apiProvider.Post(AppConst.REGISTER, request).toPromise();
        if (response != null && response['status']) {
          /*this.toastCtrl.create({
            message: "User added successfully",
            duration: 2000
          }).present();
          this.navCtrl.pop();
          this.navCtrl.pop();*/
          this.navCtrl.push( 'SignupSuccessPage',{'data':response});
          
        }
        else if (response != null && response['status'] && response['message'] != null) {
          // this.alertCtrl.create({
          //   message: response['message']
          // }).present();

          this.toastCtrl.create({
            message: response['message'],
            duration: 2000
          }).present();
        
        } else if (response != null && !response['status'] && response['message'] != null) {
            // this.alertCtrl.create({
            //   message: response['message']
            // }).present();

            this.toastCtrl.create({
              message: response['message'],
              duration: 2000
            }).present();
          }
        else {
          this.toastCtrl.create({
            message: 'Sorry something went wrong, Please try again',
            duration: 2000
          }).present();
        }
      }
      // var request = {
      //   userid: this.data.userId,
      //   action: "Change",
      //   newpassword: this.password
      // };
      // var response = await this.apiProvider.Post(AppConst.FORGOT_PASSWORD, request).toPromise();
      // if (response != null && response['status'])
      //   this.navCtrl.push(PasswordSuccessPage);
     
   
    this.isSubmitted=true;
    
    if(this.firstname.valid&&this.emailid.valid&&this.contact.valid){
      this.data.firstname=this.firstname.value;
      this.data.emailid=this.emailid.value;
      this.data.contact=this.contact.value;
     // this.data.postcode=this.postcode.value;
      //this.data.Address=this.Address.value;
     // this.data.City=this.City.value

     // this.Address1=this.Address1.value
    //  this.data.City=this.City.value;
    //  this.data.Country =this.data.Country
     // this.data.message=this.message.value;
      console.log(this.data);
    }
  }

}
