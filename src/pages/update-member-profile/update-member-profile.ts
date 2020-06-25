import { Component, ViewChild } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController,
  Events,
  Slides,
  LoadingController,
  AlertController
} from "ionic-angular";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { AppState } from "../../AppStates";
import { ApiProvider } from "../../providers/api/api";
//import { ProgressDialog } from '../../utility/progress-dialog';
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject
} from "@ionic-native/file-transfer";
import { FileChooser } from "@ionic-native/file-chooser";
import { File } from "@ionic-native/file";
import { AppConst } from "../../AppConst";
import { Storage } from "@ionic/storage";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";
import { Camera } from "../../../node_modules/@ionic-native/camera";
import { HttpHeaders } from "../../../node_modules/@angular/common/http";
import { Base64 } from "@ionic-native/base64";
import { timeoutWith } from "rxjs/operator/timeoutWith";
import { ExistFriendsAndFamilyPage } from "../exist-friends-and-family/exist-friends-and-family";
/**
 * Generated class for the UpdateMemberProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: "page-update-member-profile",
  templateUrl: "update-member-profile.html"
})
export class UpdateMemberProfilePage {
  slideOneForm: FormGroup;
  slideTwoForm: FormGroup;
  submitAttempt: boolean = false;
  bottomPad = "10px";
  showPass: boolean = false;
  showConfirmPass: boolean = false;
  email: string;
  password: string = "";
  confirmPassword: string = "";
  currentUser: any;
  userInfo;
  formFields: any;
  values: {} = {};
  dob: any;
  providerTypes: any;
  services: any;
  skills: any;
  interests: any;
  companyId: any;
  providerskills: string[];
  providerinterests: string[];
  base64Image: string;
  newimage: string;
  public apstate = AppState;
  constructor(
    public navCtrl: NavController,
    private base64: Base64,
    private transfer: FileTransfer,
    private camera: Camera,
    private fileChooser: FileChooser,
    private loadingController: LoadingController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private apiProvider: ApiProvider,
    private toastCtrl: ToastController,
    private events: Events,
    private storage: Storage
  ) {
    this.bottomPad = AppState.IsDashboard ? "55px" : "5px";
    this.currentUser = AppState.UserCred;
    console.log(this.currentUser);
    this.userInfo = this.currentUser.formvalues;
    console.log("userinfo",this.userInfo);
    this.companyId = this.currentUser.currentCompany.companyid;
    //this.dob = new Date().toISOString();
    this.dob = this.userInfo.dateofbirth;
    if (this.userInfo.dateofbirth != "") {
      let dateArray = this.userInfo.dateofbirth.split("-");
      if (dateArray[0].length < 4) {
        this.dob = dateArray[2] + "-" + dateArray[1] + "-" + dateArray[0];
      }
    }
    this.providerskills = AppState.UserCred.providerskillsid;
    this.providerinterests = AppState.UserCred.providerinterestsid;
    console.log("providerskills=" + this.providerskills);
    this.getEditFields();
    this.getProviderTypes();
    this.getSkills();
    this.getInterests();
  }
  ionViewDidLoad() {
    console.log("ionViewDidLoad Update member profile profilePage");
    this.getEditFields();
    this.getProviderTypes();
    this.getSkills();
    this.getInterests();
  }
  /**
   * Get edit form fields
   */
  async getEditFields() {
    var filterProperty = {
      offset: 0,
      recordlimit: 10,
      orderby: "formname"
    };
    var filters = [
      {
        fieldname: "formid",
        fieldvalue: AppState.IsMember ? ["1"] : ["2"],
        operators: "In",
        dir: null
      }
    ];
    var filterRequest = {
      app: true,
      auth: false,
      filter: filters,
      filterproperty: filterProperty,
      CompanyId: null,
      MemberId: this.currentUser.userid
    };
    var response = await this.apiProvider
      .Post(AppConst.FORM_BUILDER, filterRequest)
      .toPromise();
    if (
      response != null &&
      response.hasOwnProperty("records") &&
      response["records"].length > 0
    ) {
      var allFields = response["records"][0]["formfields"];
      console.log("mddf",allFields);
      this.formFields = allFields.filter(
        x =>
          x.name != "membertype" &&
          !x.hasOwnProperty("registerforsomeone") &&
          x.type != "paragraph"
      );
      this.formFields.forEach(x => {
        switch (x.type) {
          case "text":
            this.values[x.name] = this.userInfo.hasOwnProperty(x.name)
              ? this.userInfo[x.name]
              : null;
            break;
          case "password":
            this.values[x.name] = this.userInfo.hasOwnProperty(x.name)
              ? this.userInfo[x.name]
              : null;
            break;
          case "confirmpassword":
            this.values[x.name] = this.userInfo.hasOwnProperty(x.name)
              ? this.userInfo[x.name]
              : null;
            break;
          case "date":
            this.values[x.name] = this.userInfo.hasOwnProperty(x.name)
              ? this.userInfo[x.name]
              : this.dob;
            break;
          case "select":
            this.values[x.name] = this.userInfo.hasOwnProperty(x.name)
              ? this.userInfo[x.name]
              : null;
            break;
          case "radio-group":
            this.values[x.name] = this.userInfo.hasOwnProperty(x.name)
              ? this.userInfo[x.name]
              : null;
            break;
          case "textarea":
            this.values[x.name] = this.userInfo.hasOwnProperty(x.name)
              ? this.userInfo[x.name]
              : null;
            break;
          case "file":
            this.values[x.name] = this.userInfo.hasOwnProperty(x.name)
              ? this.userInfo[x.name]
              : null;
            break;
          default:
            if (x.hasOwnProperty("required") && x.required)
              this.values[x.name] = new FormControl("", Validators.required);
            else
              this.values[x.name] = new FormControl(
                "",
                Validators.nullValidator
              );
            //   this.values[x.name] = null;
            break;
        }
      });
      console.log(this.values);
    }
    console.log(this.values);
  }
  /**
   * Get service categories
   */
  async getProviderTypes() {
    var filterProperty = {
      offset: 0,
      recordlimit: 0,
      orderby: "categoryorder"
    };
    var filter = {
      fieldname: "companyid",
      fieldvalue: this.companyId,
      operators: "Equal"
    };
    var filterRequest = {
      filterproperty: filterProperty,
      auth: false,
      filter: [filter]
    };
    let response = await this.apiProvider
      .Post(AppConst.SERVICE_CATEGORIES, filterRequest)
      .toPromise();
    if (
      response != null &&
      response.hasOwnProperty("totalrecord") &&
      response["totalrecord"] > 0
    ) {
      this.providerTypes = response["records"];
      this.providerTypes.forEach(element => {
        element["selected"] = false;
      });
    }
  }
  /**
   * Get the services
   */
  async getServices() {
    var result = this.providerTypes
      .filter(x => x.selected)
      .map(function(a) {
        return a.categoryid;
      });
    if (result != null && result.length > 0) {
      var filterProperty = {
        offset: 0,
        recordlimit: 0,
        orderby: "servicename"
      };
      var filters: Array<{
        fieldname: string;
        fieldvalue: any;
        operators: string;
      }> = [];
      var filter = {
        fieldname: "servicecategoryid",
        fieldvalue: result,
        operators: "In"
      };
      var companyfilter = {
        fieldname: "companyid",
        fieldvalue: this.companyId,
        operators: "Equal"
      };
      filters.push(filter);
      filters.push(companyfilter);
      var filterRequest = {
        filterproperty: filterProperty,
        filter: filters,
        auth: false
      };
      let response = await this.apiProvider
        .Post(AppConst.GET_SERVICES, filterRequest)
        .toPromise();
      if (response != null && response.hasOwnProperty("records")) {
        this.services = response["records"];
        this.services.forEach(element => {
          element["selected"] = false;
        });
      }
    } else this.services = null;
  }
  /**
   * Get provider skills
   */
  async getSkills() {
    let request = {
      app: true,
      auth: false,
      filter: [
        { fieldname: "skillstatus", fieldvalue: "1", operators: "Equal" }
      ],
      filterProperty: {
        offset: 0,
        orderby: "skill",
        recordlimit: 0
      }
    };
    let response = await this.apiProvider
      .Post(AppConst.GET_SKILLS, request)
      .toPromise();
    if (response != null && response.hasOwnProperty("records")) {
      this.skills = response["records"];
      this.skills.forEach(element => {
        element["selected"] = false;
      });
    }
    this.selectedProviderSkills();
    //this.providerskills
  }
  /**
   * reset provider skills : after update
   */
  async selectedProviderSkills() {
    for (let i in this.skills) {
      // console.log('skills=',this.skills[i].skill)
      {
        for (let j in this.providerskills) {
          if (this.skills[i].skillid == this.providerskills[j]) {
            this.skills[i]["selected"] = true;
            //console.log('true',this.providerskills[j])
          }
        }
      }
    }
  }
  /**
   * reset provider Interests : after update
   */
  async selectedProviderInterests() {
    for (let i in this.interests) {
      {
        for (let j in this.providerinterests) {
          if (this.interests[i].interestid == this.providerinterests[j]) {
            this.interests[i]["selected"] = true;
          }
        }
      }
    }
  }
  /**
   * Get provider skills
   */
  async getInterests() {
    let request = {
      app: true,
      auth: false,
      filter: [
        { fieldname: "intereststatus", fieldvalue: "1", operators: "Equal" }
      ],
      filterProperty: {
        offset: 0,
        orderby: "interest",
        recordlimit: 0
      }
    };
    let response = await this.apiProvider
      .Post(AppConst.GET_INTERESTS, request)
      .toPromise();
    if (response != null && response.hasOwnProperty("records")) {
      this.interests = response["records"];
      this.interests.forEach(element => {
        element["selected"] = false;
      });
    }
    this.selectedProviderInterests();
  }
  /**
   * Reset fields
   */
  reset() {
    this.getEditFields();
  }
  /**
   * Update user details
   */
  async save() {
    if (
      this.values["mobilenumber"] != "" &&
      this.values["password"] &&
      this.values["confirmpassword"] &&
      this.values["city"] != "" &&
      this.values["postcode"] != "" &&
      this.values["country"] != "" &&
      this.values["addressline"] != ""
    ) {
      //  // this.values['password'] = this.password;
      // //  this.values['confirmpassword'] = this.confirmPassword;
      //   var selectedProviderTypes = this.providerTypes.filter(x => x.selected).map(function (a) { return a.categoryid; });
      //   this.values['providertypes'] =(selectedProviderTypes!=null&&selectedProviderTypes.length>0)? selectedProviderTypes:this.currentUser['formvalues']['providertypes'];
      //   var selectedServices =(this.services!=null&&this.services.length>0)? this.services.filter(x => x.selected).map(function (a) { return a.serviceid; }):null;
      //   this.values['services'] = (selectedServices!=null&&selectedServices.length>0)? selectedServices:this.currentUser['formvalues']['services'];
      //   var selectedSkills = this.skills.filter(x => x.selected).map(function (a) { return a.skillid; });
      //   //this.values['skills'] = (selectedSkills!=null&&selectedSkills.length>0)? selectedSkills:this.currentUser['formvalues']['skills'];
      //   this.values['skills'] = (this.providerskills!=null&&this.providerskills.length>0)? this.providerskills:this.currentUser['formvalues']['skills'];
      //   var selectedInterests = this.interests.filter(x => x.selected).map(function (a) { return a.interestid; });
      //  // this.values['interests'] = (selectedInterests!=null&&selectedInterests.length>0)? selectedInterests:this.currentUser['formvalues']['interests'];
      //   this.values['interests'] = (this.providerinterests!=null&&this.providerinterests.length>0)? this.providerinterests:this.currentUser['formvalues']['interests'];
      console.log(this.values);
      //alert(this.dob);
      this.values["dateofbirth"] = this.dob;
      let request = {
        companyid: this.currentUser.currentCompany.companyid,
        action: "U",
        usertypeid: "3",
        userid: this.currentUser.userid,
        updatedby: this.currentUser.userid,
        formid: "2",
        member: this.values
      };
      let response = await this.apiProvider
        .Post(AppConst.PROVIDER_REGISTER, request)
        .toPromise();
      if (response != null && response["status"]) {
        this.toastCtrl
          .create({
            message: "Updated successfully",
            duration: 2000
          })
          .present();
        this.getCurrentUserProfile();
        //this.navCtrl.pop();
      } else {
        this.toastCtrl
          .create({
            message: "Something went wrong, please try again",
            duration: 2000
          })
          .present();
      }
    } else {
      console.log("in required field ");
      this.alertCtrl
        .create({
          message: "Please enter All  required field",
          buttons: ["Ok"]
        })
        .present();
    }
  }
  /**
   * Password show toggle
   */
  showPassword(flag: boolean) {
    if (flag) this.showPass = !this.showPass;
    else this.showConfirmPass = !this.showConfirmPass;
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
        fieldvalue: AppState.UserCred.currentCompanyId,
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
      this.navCtrl.pop();
      this.providerskills = AppState.UserCred.providerskillsid;
      this.selectedProviderSkills();
      this.providerinterests = AppState.UserCred.providerinterestsid;
      this.selectedProviderInterests();
    }
  }
  public fileTransfer: FileTransferObject = this.transfer.create();
  UploadDocs() {
    console.log("in uplpoad docs");
    this.fileChooser.open().then(uri => {
      this.newimage = uri;
      console.log(uri);
      this.base64Image = uri;
      let filePath: string = uri;
      this.base64.encodeFile(filePath).then(
        (base64File: string) => {
          console.log(base64File);
        },
        err => {
          console.log(err);
        }
      );
    });
    console.log(this.base64Image);
    this.fileTransfer.onProgress(e => {
      let prg = e.lengthComputable
        ? Math.round((e.loaded / e.total) * 100)
        : -1;
      console.log("progress:" + prg);
    });
    // var loader = this.loadingController.create({
    //    content: "Please wait.."
    //  });
    //  loader.present();
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
    var random = Math.floor(Math.random() * 10000000);
    console.log(random);
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
        companyid: AppState.UserCred.currentCompany.companyid,
        auth: "false",
        fileflag: "3",
        filestatus: "1",
        type: "profilepic",
        createdby: AppState.UserCred.userid
      }
    };
    console.log(this.base64Image, url, options);
    this.fileTransfer.upload(this.base64Image, url, options).then(
      data => {
        //**Progress Bar**
        //  loader.dismiss();
        console.log(JSON.stringify(data.responseCode));
        //   this.getCurrentUserProfile()
      },
      err => {
        // loader.dismiss();
        console.log(err);
        return err;
      }
    );
  }
}
