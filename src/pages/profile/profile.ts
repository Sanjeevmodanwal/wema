import { Component, NgZone } from "@angular/core";
import {
  IonicPage,
  NavController,
  LoadingController,
  AlertController,
  ToastController,
  NavParams,
  Events
} from "ionic-angular";
import { Storage } from "@ionic/storage";
import { ApiProvider } from "../../providers/api/api";
import { AppConst } from "../../AppConst";
// import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/filter";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { AppState } from "../../AppStates";
// import { Base64Binary } from "js-base64";
import { Base64 } from "@ionic-native/base64";
//import { ProfileEditPage } from '../profile-edit/profile-edit';
import { DatePipe } from "@angular/common";
//import { ProviderProfileEditPage } from '../provider-profile-edit/provider-profile-edit';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject
} from "@ionic-native/file-transfer";
//import { File } from '@ionic-native/file';
import { UpdateprofilePage } from "../updateprofile/updateprofile";
import { updateDate } from "../../../node_modules/ionic-angular/umd/util/datetime-util";
import { UpdateMemberProfilePage } from "../update-member-profile/update-member-profile";
//import { UpdateprofiletwoPage } from '../updateprofiletwo/updateprofiletwo';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: "page-profile",
  templateUrl: "profile.html"
})
export class ProfilePage {
  ProfilePic: string;
  DisplayName: string;
  Gender: string;
  Dob: string;
  EmailId: string;
  AddressLine1: string;
  AddressLine2: string;
  Mobile: string;
  base64Image: string;
  user: any;
  providerskills: any;
  public profile_completion_percentage = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public zone: NgZone,
    private events: Events,
    public alertController: AlertController,
    public apiprovider: ApiProvider,
    private camera: Camera,
    private base64: Base64,
    private datePipe: DatePipe,
    private apiProvider: ApiProvider,
    private toastCtrl: ToastController,
    private storage: Storage,
    private loadingController: LoadingController,
    private transfer: FileTransfer
  ) {
    console.log(AppState.UserCred);
    this.user = AppState.UserCred.profile[0];
    this.profile_completion_percentage.push(
      { company_information: 100 },
      { personal_information: 90 },
      { qualification_information: 60 }
    );
    this.ProfilePic =
      AppState.UserCred["avatar"] == null || AppState.UserCred["avatar"] == ""
        ? "assets/imgs/userred.png"
        : AppState.UserCred["avatar"];
    var usertitle = AppState.UserCred.profile[0]["formvalues"].hasOwnProperty("title")
      ? AppState.UserCred.profile[0]["formvalues"]["title"]
      : "";
    this.DisplayName =
      usertitle +
      " " +
      AppState.UserCred["firstname"] +
      " " +
      AppState.UserCred["lastname"];
    var gender = AppState.UserCred.profile[0]["formvalues"]["gender"];
    if (gender != undefined) {
      this.Gender =
        gender.charAt(0).toUpperCase() + gender.slice(1, gender.length);
    }
    // this.Dob = AppState.UserCred['formvalues']['dateofbirth'];
    var userdateofbirth = AppState.UserCred.profile[0]["formvalues"].hasOwnProperty(
      "dateofbirth"
    )
      ? AppState.UserCred.profile[0]["formvalues"]["dateofbirth"]
      : "";
    if (userdateofbirth != "") {
      let dateArray = userdateofbirth.split("-");
      if (dateArray[0].length < 4) {
        let formatedDate =
          dateArray[2] + "-" + dateArray[1] + "-" + dateArray[0];
        this.Dob = this.datePipe.transform(formatedDate, "dd-MM-yyyy");
      } else {
        this.Dob = this.datePipe.transform(userdateofbirth, "dd-MM-yyyy");
      }
    }
    // console.log("---------------------Date of birth----------------------");
    // console.log(this.Dob);
    // console.log("---------------------Date of birth----------------------");
    this.EmailId = AppState.UserCred["emailid"];
    //this.AddressLine1 = AppState.UserCred['formvalues']['addressline'];
    this.AddressLine1 = AppState.UserCred.profile[0]["formvalues"].hasOwnProperty(
      "addressline"
    )
      ? AppState.UserCred.profile[0]["formvalues"]["addressline"]
      : "";
    var usermobilenumber = AppState.UserCred.profile[0]["formvalues"].hasOwnProperty(
      "mobilenumber"
    )
      ? AppState.UserCred.profile[0]["formvalues"]["mobilenumber"]
      : "";
    var userphonenumber = AppState.UserCred.profile[0]["formvalues"].hasOwnProperty(
      "phonenumber"
    )
      ? AppState.UserCred.profile[0]["formvalues"]["phonenumber"]
      : "";
    this.AddressLine2 =
      (AppState.UserCred.profile[0]["formvalues"]["addressline1"] != "undefined" &&
      AppState.UserCred.profile[0]["formvalues"]["addressline1"] != null
        ? AppState.UserCred.profile[0]["formvalues"]["addressline1"]
        : "" + ",") + AppState.UserCred.profile[0]["formvalues"]["city"];
    this.Mobile = AppState.IsMember ? usermobilenumber : userphonenumber;
    this.providerskills = AppState.UserCred["providerskills"];
  }
  ionViewDidLoad() {
    this.profile_completion_percentage.push(
      { company_information: 100 },
      { personal_information: 90 },
      { qualification_information: 60 }
    );
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
    };
    this.camera.getPicture(cameraOptions).then(
      file_uri => {
        this.base64Image = file_uri;
        this.uploadPhoto();
      },
      err => {
        console.log(err);
      }
    );
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
    };
    this.camera.getPicture(options).then(
      imageData => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64: => 'data:image/jpeg;base64,'
        this.base64Image = "data:image/jpeg;base64," + imageData;
        if (this.base64Image) {
          this.uploadPhoto();
        }
      },
      err => {
        console.log(err);
      }
    );
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
   * Edit profile
   */
  editProfile() {
    // if (AppState.IsMember)
    //   //this.navCtrl.push(ProfileEditPage);
    //   this.navCtrl.push("UpdateMemberProfilePage");
    // // this.navCtrl.push(ProviderProfileEditPage)
    // else this.navCtrl.push("UpdateprofilePage");

    console.log('inside editProfile()');
    console.log(JSON.stringify(AppState.UserCred['usertype']));

    if(AppState.UserCred['usertype'] == 'Provider'){
      this.navCtrl.push('UpdateprofilePage');
    } else {
      this.navCtrl.push('UpdateMemberProfilePage');
    }
  }
  /**
   * Update profile pic
   */
  async uploadPhoto_old() {
    // if (this.base64Image != "assets/imgs/camera.png") {
    console.log(this.base64Image);
    if (this.base64Image) {
      console.log("if base64Image");
      console.log(this.base64Image);
      let uploadRequest: FormData = new FormData();
      // uploadRequest.append('filename', this.base64Image, 'file1');
      uploadRequest.append("files[]", this.base64Image, "file1");
      uploadRequest.append("fileflag", "3");
      uploadRequest.append("userid", AppState.UserCred.userid);
      if (!AppState.IsWemaLife)
        uploadRequest.append(
          "companyid",
          AppState.UserCred.companyid
        );
      uploadRequest.append("auth", "false");
      uploadRequest.append("filestatus", "1");
      uploadRequest.append("type", "profilepic");
      uploadRequest.append("createdby", AppState.UserCred.userid);
      this.toastCtrl
        .create({
          message: "Uploading profile pic,please wait...",
          duration: 2000
        })
        .present();
      console.log("uploadRequest");
      console.log(uploadRequest);
      // this.apiProvider.Post(AppConst.FILE_UPLOAD, uploadRequest).subscribe((uploadResponse) => {
      this.apiProvider.Post(AppConst.FILE_UPLOAD, uploadRequest).subscribe(
        uploadResponse => {
          console.log("uploadResponse");
          console.log(uploadResponse);
          if (uploadResponse != null && uploadResponse["status"])
            this.toastCtrl
              .create({
                message: "Profile picture uploaded successfully",
                duration: 2000
              })
              .present();
          else
            this.toastCtrl
              .create({
                message: "Profile picture not uploaded",
                duration: 2000
              })
              .present();
        },
        error => {
          this.toastCtrl
            .create({
              message: "Profile picture not uploaded",
              duration: 2000
            })
            .present();
        }
      );
    }
  }
  async uploadPhoto_ol() {
    console.log(this.base64Image);
    var param = {
      userid: AppState.UserCred.userid,
      companyid: AppState.UserCred.companyid,
      auth: "false",
      fileflag: "3",
      filestatus: "1",
      type: "profilepic",
      createdby: AppState.UserCred.userid
    };
    //let data =  this.apiProvider.uploadImage(AppConst.FILE_UPLOAD, this.base64Image,param);
    /*  if (data.response.status) {
        this.getCurrentUserProfile()
        this.toastCtrl.create({
          message: 'Updated successfully',
          duration: 2000
        }).present();
      } */
    /*   else {
        this.getCurrentUserProfile()
        this.toastCtrl.create({
          message: 'Something went wrong, please try again',
          duration: 2000
        }, ).present();
      } */
  }
  uploadPhoto() {
    console.log(this.base64Image);
    var loader = this.loadingController.create({
      content: "Please wait.."
    });
    loader.present();
    var url = AppConst.GetWemaBaseAddress() + AppConst.FILE_UPLOAD;
    // var url = AppConst.WEMA_AZURE_LIVE + AppConst.FILE_UPLOAD;
    var httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.append("content-type", "multipart/form-data;");
    httpHeaders = httpHeaders.append("Source-Api", "wemalife");
    if (
      AppState.UserCred &&
      AppState.UserCred.hasOwnProperty("key") &&
      AppState.UserCred.key != null &&
      AppState.UserCred.key != ""
    )
      httpHeaders = httpHeaders.append("Api-Key", AppState.UserCred.key);
    if (AppState.UserCred != null && AppState.UserCred["userid"] != "") {
      httpHeaders = httpHeaders.append("uid", AppState.UserCred["userid"]);
      httpHeaders = httpHeaders.append("fid", "0");
    }
    //httpHeaders=httpHeaders.append('Access-Control-Allow-Origin','*');
    //httpHeaders=httpHeaders.append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
    const fileTransfer: FileTransferObject = this.transfer.create();
    var random = Math.floor(Math.random() * 10000000);
    //option transfer
    let options: FileUploadOptions = {
      fileKey: "files",
      fileName: random + Date.now() + ".jpg",
      chunkedMode: false,
      httpMethod: "post",
      mimeType: "multipart/form-data",
      headers: { headers: httpHeaders },
      params: {
        userid: AppState.UserCred.userid,
        companyid: AppState.UserCred.companyid,
        auth: "false",
        fileflag: "3",
        filestatus: "1",
        type: "profilepic",
        createdby: AppState.UserCred.userid
      }
    };
    fileTransfer
      .upload(this.base64Image, url, options)
      .then(
        data => {
          loader.dismiss();
          console.log(JSON.stringify(data.responseCode));
          this.getCurrentUserProfile();
        },
        err => {
          loader.dismiss();
          console.log(err);
          return err;
        }
      );
  }
  async getCurrentUserProfile() {
    var filters = Array<{
      fieldname: string;
      fieldvalue: string;
      operators: string;
    }>();
    filters.push({
      fieldname: "userid",
      fieldvalue: AppState.UserCred.userid,
      operators: "Equal"
    });
    if (!AppState.IsWemaLife)
      filters.push({
        fieldname: "companyid",
        fieldvalue: AppState.UserCred.companyid,
        operators: "Equal"
      });
    let request: any;
    if (AppState.IsMember)
      request = {
        app: true,
        auth: true,
        filter: filters,
        MemberId: AppState.UserCred.userid,
        filterproperty: null,
        CompanyId: null
      };
    else
      request = {
        app: true,
        auth: true,
        filter: filters,
        filterproperty: {
          offset: 0,
          orderby: "preferences",
          recordlimit: 0
        }
      };
    let response = AppState.IsMember
      ? await this.apiProvider
          .Post(AppConst.GET_USER_PROFILE, request)
          .toPromise()
      : await this.apiProvider
          .Post(AppConst.GET_PROVIDER_PROFILE, request)
          .toPromise();
    if (
      response != null &&
      response.hasOwnProperty("records") &&
      response["records"].length > 0
    ) {
      let userCred = response["records"]["0"];
      console.log(AppState.UserCred);
      for (let key in userCred) {
        if (AppState.UserCred.hasOwnProperty(key)) {
          if (AppState.UserCred[key] != userCred[key]) {
            console.log(key);
            AppState.UserCred[key] = userCred[key];
          }
        }
      }
      console.log(AppState.UserCred);
      this.storage.set("UserCred", JSON.stringify(AppState.UserCred));
      this.events.publish("updateuser");
      this.navCtrl.setRoot(this.navCtrl.getActive().component);
      //this.navCtrl.setRoot(ProfilePage);
      // this.navCtrl.pop();
    }
  }
}
