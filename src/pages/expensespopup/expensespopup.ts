import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { AppConst } from '../../AppConst';
import { Observable } from 'rxjs/Observable';
import { DatePipe } from '@angular/common';
import "rxjs/add/operator/filter";
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AppState } from '../../AppStates';
import { Base64Binary } from "js-base64";
import { Base64 } from "@ionic-native/base64";
/**
 * Generated class for the ExpensespopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-expensespopup',
  templateUrl: 'expensespopup.html',
})
export class ExpensespopupPage {
  createBills: any;
  data: { billName: '', billAmount: '', Description: '',type:'',expensesdate:'' };
  isEmpty: boolean = false;
  base64Image: string = "assets/imgs/camera.png";
  billName: any = 'Upload bill';
  imageDatas;
   

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController ,private alertCtrl: AlertController, private apiProvider: ApiProvider, private datePipe: DatePipe, private camera: Camera, private alertController: AlertController, private toastCtrl: ToastController) {
    this.data = navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExpensespopupPage');
    let date = new Date(Date.now());
  }
  
  ionViewWillLoad() {
    const data = this.navParams.get('data');
    console.log(data);
  }

  /**
   * Get image from gallery
   */
  getImageFromGallery() {
    console.log('inside getImageFromGallery');
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
        this.billName = file_uri.substr(file_uri.lastIndexOf('/') + 1);
        this.base64Image = file_uri;
        console.log('file_uri: '+JSON.stringify(file_uri));
      },
        (err) => {
          console.log(err);
        });
  }

  /**
   * Get picture from camera
   */
  getImageFromCamera() {
    console.log('inside getImageFromCamera');
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    }

    this.camera.getPicture(options).then((imageData) => {
      console.log('imageData: '+JSON.stringify(imageData));
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
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
   * Submit the bill
   */
  async submit() {
    if (this.data.type != undefined && this.data.expensesdate != undefined && this.data.billName != undefined && this.data.billAmount != undefined) {
      var request = {
        Action: "C",
        CompanyId: AppState.UserCred.currentCompanyId,
        ProviderId: AppState.UserCred.userid,
        Date: this.datePipe.transform(this.data.expensesdate, 'dd/MM/yyyy'),
        CreatedBy: AppState.UserCred.userid,
        Type: this.data.type,
        BillName: this.data.billName,
        Amount: parseInt(this.data.billAmount),
        Description: this.data.Description
      };

      
      let response = await this.apiProvider.Post(AppConst.CREATE_BILL, request).toPromise();
      if (response['status']) {
        this.toastCtrl.create({
          message: 'Bill added successfully',
          duration:2000
        }).present();
        this.viewCtrl.dismiss();

        //this.navCtrl.pop();
        /*var uploadRequest = {
          'files[]': this.base64Image,
          fileflag: '2',
          userid: AppState.UserCred.userid,
          companyid: AppState.UserCred.currentCompanyId,
          auth: false,
          id: response['id'],
          filestatus: '1',
          type: 'bill',
          createdby: AppState.UserCred.userid
        };*/
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
        uploadRequest.append('id',response['id']);
        uploadRequest.append('filestatus','1');
        uploadRequest.append('type',this.data.type);
        uploadRequest.append('createdby',AppState.UserCred.userid);
        console.log(uploadRequest); 
        
        //let uploadResponse = await this.apiProvider.Post(AppConst.FILE_UPLOAD, request).toPromise();
        this.apiProvider.Post(AppConst.FILE_UPLOAD, request).subscribe((uploadResponse)=>{
          console.log("===========uploadResponse =========");
          console.log(uploadResponse);
          console.log("===========uploadResponse =========");
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
      else {
        this.toastCtrl.create({
          message: "Something went wrong, please try again",
          duration: 2000
        });
      }
    }
    else {
      this.alertCtrl.create({
        message: "Please input all the mandatory fields",
        buttons: ['Ok']
      }).present();
     this.viewCtrl.dismiss();
    }
  }

  changeListener($event): void {
    this.base64Image = $event.target.files[0];
    console.log(this.base64Image);
    } 
  closeModal() {
    const data = {
      name: 'John Doe',
      occupation: 'Milkman'
    };
    this.viewCtrl.dismiss(data);
  }

}
