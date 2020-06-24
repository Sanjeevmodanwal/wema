import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, ViewController } from 'ionic-angular';
import { EmailValidator, Validators, AbstractControl, FormGroup, FormControlName, FormControl } from '@angular/forms';
import { AppState } from '../../AppStates';
import { ApiProvider } from '../../providers/api/api';
import { Camera, CameraOptions } from '@ionic-native/camera';
//import { AppState } from '../../AppStates';
import { Base64Binary } from "js-base64";
import { Base64 } from "@ionic-native/base64";
import { AppConst } from '../../AppConst';
/**
 * Generated class for the SendEnquiryPopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-send-enquiry-popup',
  templateUrl: 'send-enquiry-popup.html',
})
export class SendEnquiryPopupPage {

  services: any;
  isSubmitted:boolean;
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  myForm:FormGroup;
  name:FormControl;
  email:FormControl;
  contact:FormControl;
  postcode:FormControl;
  message:FormControl;
  base64Image: string = "assets/imgs/camera.png";
  billName: any = 'Upload attachment ';
  data: { name: string, email: string, contact: string, postcode: string, service: any, message: string,filename :any } = { name: null, email: null, contact: null, postcode: null, service: null, message: null,filename:null };
  appState=AppState;
  constructor(private apiProvider:ApiProvider ,public navCtrl: NavController,private alertCtrl: AlertController,private camera: Camera, private alertController: AlertController, public navParams: NavParams, private viewCtrl: ViewController) {
    this.services = navParams.data;
    console.log(this.services)
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


  
  // /**
  //  * Get image from gallery
  //  */
  getImageFromGallery() {
  const options: CameraOptions = {
    quality: 70,
    destinationType: this.camera.DestinationType.DATA_URL,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    saveToPhotoAlbum:false
    }
    
    this.camera.getPicture(options).then((imageData) => {
    // imageData is either a base64 encoded string or a file URI
    // If it's base64:

      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      console.log(this,this.base64Image)
    },
    (err) => {
         console.log(err);
            });

 }
  // getImageFromGallery() {
  //   let cameraOptions = {
  //     sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
  //     destinationType: this.camera.DestinationType.FILE_URI,
  //     //destinationType:this.camera.DestinationType.DATA_URL,
  //     quality: 100,
  //     targetWidth: 1000,
  //     targetHeight: 1000,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     correctOrientation: true
  //     // quality: 100,
  //     // destinationType: this.camera.DestinationType.DATA_URL,
  //     // encodingType: this.camera.EncodingType.JPEG,
  //     // mediaType: this.camera.MediaType.PICTURE,
  //   }

  //   this.camera.getPicture(cameraOptions)
  //     .then((imageData) => {
  //       // this.billName = file_uri.substr(file_uri.lastIndexOf('/') + 1);
  //       // this.base64Image = file_uri;
  //       // console.log(file_uri)
  //       this.base64Image = 'data:image/jpeg;base64,' + imageData;
  //       console.log(imageData)
  //       console.log(this.base64Image, this.billName )
  //     },
  //       (err) => {
  //         console.log(err);
  //       });  (err) => {
  //         console.log(err);
  //       });
  // }

  /**
   * Get picture from camera
   */
  getImageFromCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    }

    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      console.log(imageData)
      //this.base64.encodeFile('').then((data)=>{this.base64Image=data;});
      //this.imageDatas =Base64Binary.decodeArrayBuffer(this.base64Image); 
    }, (err) => {
      console.log(err);
    });
  }

  /**
   * Image choose popup
   */
  choosePopup() {
    var choosePopup = this.alertController.create({
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
    }*/
    this.isSubmitted=true;
    if(this.name.valid&&this.email.valid&&this.contact.valid&&this.postcode.valid&&this.data.service!=null&&this.message.valid){
      this.data.name=this.name.value;
      this.data.email=this.email.value;
      this.data.contact=this.contact.value;
      this.data.postcode=this.postcode.value;
      this.data.message=this.message.value;
      this.data.filename=this.base64Image
      console.log(this.data);
      this.viewCtrl.dismiss(this.data);
     // this.upload()
    }
  }

  changeListener($event): void {
    this.base64Image = $event.target.files[0];
    console.log(this.base64Image);
  } 


  upload()
  {
    let uploadRequest:FormData=new FormData();
    /*uploadRequest.set('files[]',this.base64Image,'file1');
    uploadRequest.set('fileflag','2');
    uploadRequest.set('userid',AppState.UserCred.userid);
    uploadRequest.set('companyid',AppState.UserCred.currentCompanyId);
    uploadRequest.set('auth','false');
    uploadRequest.set('id',response['id']);
    uploadRequest.set('filestatus','1');
    uploadRequest.set('type','bill');
    uploadRequest.set('createdby',AppState.UserCred.userid);*/
    uploadRequest.append('files[]',this.base64Image,'file1');
    uploadRequest.append('fileflag','2');
    uploadRequest.append('userid',AppState.UserCred.userid);
    uploadRequest.append('companyid',AppState.UserCred.currentCompanyId);
    uploadRequest.append('auth','false'); 
    uploadRequest.append('id','11');
//uploadRequest.append('id',response['id']);
    uploadRequest.append('filestatus','1');
    uploadRequest.append('type','bill');
    uploadRequest.append('createdby',AppState.UserCred.userid);
    console.log(uploadRequest); 
    
    //let uploadResponse = await this.apiProvider.Post(AppConst.FILE_UPLOAD, request).toPromise();
    this.apiProvider.Post(AppConst.FILE_UPLOAD,uploadRequest).subscribe((uploadResponse)=>{
      if (uploadResponse != null) {
        this.alertCtrl.create({
          message: 'Upload: ' + JSON.stringify(uploadResponse)
        }).present();
      }
    },
  (error)=>{
    this.alertCtrl.create({
      message: 'UploadError: ' + JSON.stringify(error)
    }).present();
  });  
}

closepopup(){
  this.viewCtrl.dismiss()
}
}
