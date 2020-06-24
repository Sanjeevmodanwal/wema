import { Component,NgZone } from '@angular/core';
import { IonicPage,  NavController, LoadingController,AlertController, ToastController, NavParams, Events } from 'ionic-angular';
import { EmailValidator, Validators, AbstractControl,  FormGroup, FormControlName, FormControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../../providers/api/api';
import { AppConst } from '../../AppConst';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/filter";
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AppState } from '../../AppStates';
import { Base64Binary } from "js-base64";
import { Base64 } from "@ionic-native/base64";
//import { ProfileEditPage } from '../profile-edit/profile-edit';
import { DatePipe } from '@angular/common';
//import { ProviderProfileEditPage } from '../provider-profile-edit/provider-profile-edit';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
//import { File } from '@ionic-native/file';

import { UpdateprofilePage } from '../updateprofile/updateprofile';
import { updateDate } from '../../../node_modules/ionic-angular/umd/util/datetime-util';
import { UpdateMemberProfilePage } from '../update-member-profile/update-member-profile';
import { FamilyfriendsPage } from '../familyfriends/familyfriends';
/**
 * Generated class for the MyaccounteditprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myaccounteditprofile',
  templateUrl: 'myaccounteditprofile.html',
})
export class MyaccounteditprofilePage {
  confirmPassword: any;
  password: any;
  name1='';
  relationship1='';
  firstname1='';
  lastname1='';
  usertitle :any;
  showPass: boolean = false;
  showConfirmPass: boolean = false;
  Country=["india","United Kingdom"];
  Gender=[{label: "Male", value: "male"},{label: "Female", value: "female", selected: true},{label: "Prefer not to say", value: "prefer not to say"}]
  Title=["Prof" ,"Dr","Mr","Mdm" ,"Mrs","Miss"]
  isMatched: boolean = true;
  values: {} = {};
  services: any;
  isSubmitted:boolean;
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  myForm:FormGroup;
  //name:FormControl;
  firstname:FormControl;
  lastname:FormControl;
  relationship:FormControl;
  email:FormControl;
  contact:FormControl;
  contact1:FormControl;
  postcode:FormControl;
  City:FormControl;
  Address:FormControl;
  Address1:any;
  message:FormControl;
  data: { name: string,firstname: string,lastname: string, Gender:any, email: string,country:string, contact: string,contact1:string, postcode: string, Address: string ,City:string ,Address1:string,Country:string,relationship: string,Title:any } = { name: null,firstname: null,lastname: null, email: null, contact: null,contact1:null, postcode: null,Gender:null, Address: null,country:null,Address1:null,City:null,Country:null,relationship: null,Title: null  };
  oldAddress: any;
  item: any;
  oldemail: any;
  oldpassword: any;
  oldconfirmPass: any;
  oldMobilenumber: any;
  oldHomenumber: any;
  oldAddress1: any;
  city: any;
  oldpostcode: any;
  selectedGender: any; 
  data1: any;
  userdata:any;
  base64Image: string;
  passpostuserdata :any;
    


  constructor(public navCtrl: NavController,private apiProvider:ApiProvider,private toastCtrl :ToastController, private alertCtrl :AlertController,public navParams: NavParams, public zone: NgZone,
    private events:Events
    , private camera: Camera, private base64: Base64, private datePipe: DatePipe,private storage:Storage,
    private loadingController: LoadingController,
    private transfer:FileTransfer) {

    console.log('----------------data.profile---------------');
    console.log(navParams.data.profile);
    console.log('----------------data.profile---------------');
    //console.log(navParams.data.profile.data.formvalues.addressline)
    this.oldAddress=navParams.data.profile.data.formvalues.addressline
    this.selectedGender=navParams.data.profile.data.formvalues.gender
   // console.log(this.selectedGender)

    this.userdata = navParams.data.profile.data;

    console.log('----------------userdata---------------');
    console.log(this.userdata);
    console.log('---------------userdata----------------');

    

    for(let i in this.Gender)
    {
      console.log(this.Gender[i])
      if( this.Gender[i]==this.selectedGender)
        {
          console.log('inselected')
        // this.Gender[i]['selected']=true
        }
    }
   this.data1=navParams.data.profile.data.formvalues.gender
    this.oldemail=navParams.data.profile.data.formvalues.emailid
    this.password=navParams.data.profile.data.formvalues.password
    this.confirmPassword=navParams.data.profile.data.formvalues.confirmpassword
    this.oldMobilenumber =navParams.data.profile.data.formvalues.mobilenumber
    this.oldHomenumber=navParams.data.profile.data.formvalues.homenumber
    this.Address1=navParams.data.profile.data.formvalues.addressline1
    this.city=navParams.data.profile.data.formvalues.city
    this.oldpostcode=navParams.data.profile.data.formvalues.postcode
    this.usertitle=navParams.data.profile.data.formvalues.title 
    this.data.Title  =navParams.data.profile.data.formvalues.title
    this.data.Gender =navParams.data.profile.data.formvalues.gender

    this.relationship1  =navParams.data.profile.data.formvalues.relationship
    this.name1=navParams.data.profile.data.formvalues.firstname+ " " + navParams.data.profile.data.formvalues.lastname

    this.firstname1=navParams.data.profile.data.formvalues.firstname

    this.lastname1=navParams.data.profile.data.formvalues.lastname

    //this.name=new FormControl('',Validators.required);
    this.firstname=new FormControl('',Validators.required);
    this.lastname=new FormControl('',Validators.required);
    this.relationship=new FormControl('',Validators.required);
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern(this.emailPattern)
    ]);

    if(navParams.data.profile.data.formvalues.country != undefined && navParams.data.profile.data.formvalues.country =='1'){
      this.data.Country  ='United Kingdom';
    } else if(navParams.data.profile.data.formvalues.country != undefined && navParams.data.profile.data.formvalues.country =='2'){
      this.data.Country  ='india';
    }

    

   

    this.contact=new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]);
   this.contact1=new  FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]);
    this.postcode=new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(6)]);
    this.message=new FormControl('',[Validators.required]);
   this.Address= new FormControl('',[Validators.required]);
     this.City= new FormControl('',[Validators.required]);
   //this.Country = new FormControl(this.Country,[Validators.required]);
  // this.Address= new FormControl('',[Validators.required]);
  // this.Address1= new FormControl('',[Validators.required]);
 // this.Country= new FormControl('',[Validators.required]);
    this.myForm=new FormGroup({
     // name:this.name,
      firstname:this.firstname,
      lastname:this.lastname,
      email:this.email,
      contact:this.contact,
      contact1:this.contact1,
      postcode:this.postcode,
      Address:this.Address,
      // Country:this.Country,
      relationship:this.relationship,
      City: this.City
    });
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyaccounteditprofilePage');
    //return false;
  }

  onSelectChange(selectedValue: Number) {
    this.usertitle = selectedValue;
   // console.log('Selected', selectedValue);
    //console.log('Change listner SelectedPlan', this.usertitle);
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
    this.isSubmitted=true
    console.log(this.myForm.value,
      this.data.Address=this.myForm.value.Address,
      this.data.Address1=this.myForm.value.Address1,
      this.data.City=this.myForm.value.City,
      this.data.contact=this.myForm.value.contact,
      this.data.contact1=this.myForm.value.contact1,
      this.data.email=this.myForm.value.email,
     // this.data.name=this.myForm.value.name,
      this.data.firstname=this.myForm.value.firstname,
      this.data.lastname=this.myForm.value.lastname,
      this.data.postcode=this.myForm.value.postcode,
      this.data.country="2",
      this.data.relationship=this.myForm.value.relationship,
      console.log(this.data)
    )

      
   
    this.postcode=this.myForm.value.postcode
    var re = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;
    if (re.test(this.password) && this.isMatched ) {
      console.log('matched');
      
      //  this.values['password'] = this.password;
       // this.values['confirmpassword'] = this.confirmPassword;
      //  var memberObj: any = {};
      //  var registerObj: any = this.values;

      console.log("title = " + this.data['Title']);
      console.log("name = " +this.myForm.value.name);
      console.log("firstname = " +this.myForm.value.firstname);
      console.log("lastname = " +this.myForm.value.lastname);
      console.log("relationship = " +this.myForm.value.relationship);
      console.log("gender = " +this.data['Gender']);
      //console.log("date of birth = " +this.Date);
      console.log("email = " +this.myForm.value.email);
      console.log("Password = " +this.password);
      console.log("contact = " +this.myForm.value.contact); 
      console.log("Address = " +this.myForm.value.Address);
      console.log("City = " +this.myForm.value.City);
      console.log("postcode = " +this.myForm.value.postcode);
      console.log("Country = " +this.data.Country);
      
      var databaseCountry = '2';

      if(this.data.Country =='United Kingdom'){
        databaseCountry = '1'
      }
        var request = {
          action: 'U',
          usertypeid: '7',
          userid:this.navParams.data.profile.data.userid,
          companyid: AppState.UserCred.currentCompanyId,
          membertype: 'someone',
          updatedby: AppState.UserCred.userid,
          register:{
            addressline:this.myForm.value.Address,
            addressline1:this.Address1,
            city:this.myForm.value.City,
            companyid: "1",
            confirmpassword: this.confirmPassword,
            country: databaseCountry,
            //county: this.data.Country,
            //dateofbirth: "27-12-1979",
            emailid: this.myForm.value.email,
            firstname: this.myForm.value.firstname,
            gender: this.data['Gender'],
            homenumber:this.oldHomenumber,
            lastname: this.myForm.value.lastname,
            mobilenumber: this.myForm.value.contact,
            password: this.password,
            postcode: this.myForm.value.postcode,
            relationship: this.myForm.value.relationship,
            title: this.data['Title']



          },
          //{

//             addressline: this.Address,
// addressline1:this.Address1,
// city: this.City,
// companyid: "1",
// confirmpassword: this.confirmPassword,
// country: "2",
// county: this.data['Country'],
// dateofbirth: "27-12-1979",
// emailid: this.email,
// firstname: this.name,
// gender: this.data['Gender'],
// homenumber: this.contact1,
// lastname: "Data",
// mobilenumber: this.contact,
// password: this.password,
// postcode:this.postcode,
// relationship: "Friend",
// title: "Dr"
        //  },
          formid: '1',
          member:{
            companyid: "1"}
        };
  
        var response = await this.apiProvider.Post(AppConst.REGISTER, request).toPromise();
        if (response != null && response['status']) {
          this.toastCtrl.create({
            message: "Friend Updated successfully",
            duration: 2000
          }).present();
          this.navCtrl.pop();
          this.navCtrl.pop();
        }
        else if (response != null && response['status'] && response['message'] != null) {
          this.alertCtrl.create({
            message: response['message']
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
    
    else {
      this.alertCtrl.create({
        title: 'Wrong Password!',
        message: 'Special character is not allowed & confirm password should be matched'
      }).present();
    }
    this.isSubmitted=true;
    console.log("ss")
    if(this.firstname.valid&&this.email.valid&&this.postcode.valid&&this.contact.valid&&this.Address.valid){
     // this.data.name=this.name.value;
      this.data.firstname=this.firstname.value;
      this.data.lastname=this.lastname.value;
      this.data.email=this.email.value;
      this.data.contact=this.contact.value;
      this.data.postcode=this.postcode.value;
      this.data.Address=this.Address.value;
      this.data.City=this.City.value

      this.Address1=this.Address1.value
    //  this.data.City=this.City.value;
    //  this.data.Country =this.data.Country
     // this.data.message=this.message.value;
      console.log(this.data);
    }
  }
  

  cancel()
  {
    this.navCtrl.pop()
  }

  /**
   * Get image from gallery
   */
  getImageFromGallery() {
    let cameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
      //destinationType:this.camera.DestinationType.DATA_URL,
      quality: 100,
      targetWidth: 1000,
      targetHeight: 1000,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true
    }

    this.camera.getPicture(cameraOptions)
      .then((file_uri) => {
        this.base64Image = file_uri;
        this.uploadPhoto();
      },
        (err) => {
          console.log(err);
        });
  }


  
  /**
   * Get picture from camera
   */
  getImageFromCamera() {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64: => 'data:image/jpeg;base64,'

      this.base64Image = 'data:image/jpeg;base64,'+ imageData;
      if(this.base64Image)
      {
        this.uploadPhoto();
      }

    }, (err) => {
     console.log(err);
    });
  }

  /**
   * Image choose popup
   */
  choosePopup(postuserdata :any) {
    this.passpostuserdata = postuserdata;
    var choosePopup = this.alertCtrl.create({
      title: "Take a picture from",
      buttons: [
        {
          text: "Gallery",
          cssClass: "orange-button",
          handler: data => {
            this.getImageFromGallery();
          }
        },
        {
          text: "Camera",
          cssClass: "green-button",
          handler: data => {
            this.getImageFromCamera();
          }
        }
      ]
    });
    choosePopup.present();
  }
  uploadPhoto() {

    console.log(this.base64Image)
    console.log('-------------passpostuserdata----------');
    console.log(this.passpostuserdata)
    console.log('-------------passpostuserdata----------');
    var loader = this.loadingController.create({
       content: "Please wait.."
     });
     loader.present();
      var url = AppConst.GetWemaBaseAddress() + AppConst.FILE_UPLOAD;
    // var url = AppConst.WEMA_AZURE_LIVE + AppConst.FILE_UPLOAD;

     var httpHeaders = new HttpHeaders();

    httpHeaders = httpHeaders.append('content-type','multipart/form-data;');

    httpHeaders = httpHeaders.append('Source-Api',  'wemalife');
    if (this.passpostuserdata && this.passpostuserdata.hasOwnProperty('key') && this.passpostuserdata.key != null && this.passpostuserdata.key != '')
       httpHeaders = httpHeaders.append('Api-Key', this.passpostuserdata.key);
     if (this.passpostuserdata != null && this.passpostuserdata.userid != '') {
       httpHeaders = httpHeaders.append('uid', this.passpostuserdata.userid);
       httpHeaders = httpHeaders.append('fid', "0");
     }
     //httpHeaders=httpHeaders.append('Access-Control-Allow-Origin','*');
     //httpHeaders=httpHeaders.append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');

   const fileTransfer: FileTransferObject = this.transfer.create();
   var random = Math.floor(Math.random() * 10000000);

    //option transfer
    let options: FileUploadOptions = {
      fileKey: 'files',
      fileName: random +Date.now()+".jpg",
      chunkedMode: false,
      httpMethod: 'post',
      mimeType: "multipart/form-data",
      headers: {headers: httpHeaders},

      params : {
               'userid': this.passpostuserdata.userid,
               'companyid': this.passpostuserdata.companyid,
               'auth': 'false',
               'fileflag': '3',
               'filestatus': '1',
               'type': 'profilepic',
               'createdby': AppState.UserCred.userid,

               }
    }


      fileTransfer.upload(this.base64Image,url , options) 

           .then((data) => {
            loader.dismiss();
           console.log(JSON.stringify(data.responseCode));
          // this.getCurrentUserProfile()          
          this.navCtrl.setRoot('FamilyfriendsPage')
          }, (err) => {
            loader.dismiss();
            console.log(err);
            return err;
        });


    }

  
}
