import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AppState } from '../../AppStates';
import { ApiProvider } from '../../providers/api/api';
import { AppConst } from '../../AppConst';
//import { OtpVerificationPage } from '../otpverification/otpverification';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Helper } from '../../helpers/helper';
/**
 * Generated class for the EditFriendsFamilyAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-friends-family-account',
  templateUrl: 'edit-friends-family-account.html',
})
export class EditFriendsFamilyAccountPage {
  title: string;
  page: number = 1;
  showPass: boolean = false;
  showConfirmPass: boolean = false;
  friendEmail: string = '';
  emailId: string;
  password: string = '';
  confirmPassword: string = '';
  relationship: any = '';
  formFields: any = [];
  dob: any;
  values: {} = {};
  companyId: any;
  base64Image: string = "assets/imgs/camera.png";
  isWemaplus: boolean = !AppState.IsWemaLife;
  myForm: FormGroup;
  isMatched: boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams, private apiProvider: ApiProvider, private toastCtrl: ToastController) {
    this.setPageTitle(this.page);
    this.dob = new Date().toISOString();
    this.myForm = new FormGroup({});
  }

  ionViewDidLoad() {
    this.getFormFields();
  }

  /**
     * Get registration formfields
     */
  async getFormFields() {
    var filterProperty = {
      offset: 0,
      recordlimit: 10,
      orderby: "formname"
    };

    var filters: Array<{ fieldname: string, fieldvalue: any, operators: string, dir: any }>;

    filters = [{
      fieldname: "formid",
      fieldvalue: ["1"],
      operators: "In",
      dir: null
    }];

    var filterRequest = {
      app: true,
      auth: false,
      filter: filters,
      filterproperty: filterProperty,
      CompanyId: null,
      MemberId: null
    };

    let response = await this.apiProvider.Post(AppConst.FORM_BUILDER, filterRequest).toPromise();
    if (response != null && response.hasOwnProperty('records') && response['records'].length > 0) {
      var allFields = response['records'][0]['formfields'];
      this.formFields.push({
        type: 'text',
        required: true,
        label: "Company Number",
        name: "companynumber",
        value: "",
        registerforsomeone: true
      },
        {
          type: 'text',
          required: true,
          label: "Company Name",
          name: "company",
          value: "",
          registerforsomeone: true
        },
        {
          type: 'text',
          required: true,
          label: "Unique Number",
          name: "uniquenumber",
          value: "",
          registerforsomeone: true
        }
      );
      //Array.from(allFields.filter(x =>x.hasOwnProperty('name')&& x.name != 'memberstatus' && x.hasOwnProperty('type')&& x.type!='paragraph').forEach(item => { this.formFields.push(item) }));
      allFields.filter(x => x.hasOwnProperty('name') && x.name != 'memberstatus' && x.name != 'membertype' && !x.hasOwnProperty('registerforsomeone') && x.hasOwnProperty('type') && x.type != 'paragraph').forEach(item => { this.formFields.push(item) });
      this.setFormControls();
    }
  }

  /**
     * Set form controls
     */
  setFormControls() {
    this.formFields.forEach(x => {
      this.values[x.name] = null;
      if (x.name == 'dateofbirth')
        this.values[x.name] = this.dob;
      switch (x.name) {
        case 'emailid':
          this.myForm.controls['emailid'] = new FormControl('', [Validators.required, Validators.email]);//[Validators.required, Validators.pattern(Helper.emailPattern)]
          break;
        case 'password':
          this.myForm.controls['password'] = new FormControl('', [Validators.required, Validators.pattern(Helper.passwordPattern)]);
          break;
        case 'confirmpassword':
          this.myForm.controls['confirmpassword'] = new FormControl('', [Validators.required, Validators.pattern(Helper.passwordPattern)]);
          break;
        case 'mobilenumber':
          this.myForm.controls['mobilenumber'] = new FormControl('', [Validators.required, Validators.pattern(Helper.mobilePattern)]);
          break;
        case 'postcode':
          this.myForm.controls['postcode'] = new FormControl('', [Validators.required, Validators.pattern(Helper.postcodePattern)]);
          break;
        default:
          if (x.hasOwnProperty('required') && x.required)
            this.myForm.controls[x.name] = new FormControl('', Validators.required);
          else
            this.myForm.controls[x.name] = new FormControl('', Validators.nullValidator);
          break;
      }
    });
  }
  /**
   * Confirm password change 
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
   * Next button handler;Redirect to second page of registration
   */
  next() {
    if (this.page == 1) {
      // if (this.friendEmail == '' || Helper.emailPattern.test(this.friendEmail)==false)
      //   this.toastCtrl.create({
      //     message: 'Invalid emailid',
      //     duration: 2000
      //   }).present();
      // else if (this.relationship == '')
      //   this.toastCtrl.create({
      //     message: "Relationship can't be empty",
      //     duration: 2000
      //   }).present();
      // else
        this.page += 1;
    }
    else if (this.page == 2) {
      let valid: boolean;
      for (let key in this.myForm.controls) {
        if (key != 'emailid' && key != 'password' && key != 'confirmpassword') {
          console.log(key + ' : ' + this.myForm.controls[key].valid);
          if (this.myForm.controls[key].valid) {
            valid = true;
            continue;
          }
          else {
            valid = false;
            break;
          }
        }
      }

      if (valid)
        this.page += 1;
    }
    else if (this.page == 3) {
      let valid: boolean;
      for (let key in this.myForm.controls) {
        if (key == 'emailid' || key == 'password' || key == 'confirmpassword') {
          console.log(key + ' : ' + this.myForm.controls[key].valid);
          if (this.myForm.controls[key].valid) {
            valid = true;
            continue;
          }
          else {
            valid = false;
            break;
          }
        }
      }

      if (valid) {
        if (this.isMatched)
          this.page += 1;
        else
          this.toastCtrl.create({
            message: "Password mismatched",
            duration: 2000
          }).present();
      }
    }
  }

  /**
   * Previous button handler;Redirect to first page of registration
   */
  previous() {
    this.page -= 1;
    this.setPageTitle(this.page);
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
 * Focus out of Company Number
 */
  async onFocusOut() {
    var value = this.values['companynumber'];
    if (value == null || value == '') {
      this.toastCtrl.create({
        message: "Please enter company number",
        duration: 2000
      }).present();
    }
    else {
      var request = {
        Action: "search",
        CompanyNo: value,
        auth: false
      };
      var response = await this.apiProvider.Post(AppConst.SEARCH_COMPANIES, request).toPromise();
      if (response != null && response['status'] == true) {
        this.companyId = response['records']['companyid'];
        this.values['company'] = response['records']['companyname'];
      }
      else {
        this.toastCtrl.create({
          message: "wrong company number",
          duration: 2000
        }).present();
      }
    }
  }

  /**
   * Set title of the page
   * @param page 
   */
  setPageTitle(page: number) {
    switch (page) {
      case 1:
        this.title = 'Friends / Family Details';
        break;
      case 2:
        this.title = 'Member Personal Information';
        break;
      case 3:
        this.title = 'Account Setup';
        break;
    }
  }

  /**
       * Register the user
       */
  async registerMember() {
    this.values['emailid'] = this.emailId;
    this.values['password'] = this.password;
    this.values['confirmpassword'] = this.confirmPassword;

    var registerObj: any = {};
    registerObj['emailid'] = this.friendEmail;
    registerObj['relationship'] = this.relationship;
    registerObj['companyid'] = !AppState.IsWemaLife ? this.companyId : '1';
    var memberObj: any = this.values;
    memberObj['companyid'] = !AppState.IsWemaLife ? this.companyId : '1';

    var request = {
      action: 'C',
      createdby: '0',
      usertypeid: '4',
      auth: false,
      //companyid: this.companyId,
      membertype: 'someone',
      memberstatus: '2',
      register: registerObj,
      formid: '1',
      member: memberObj
    };
    if (!AppState.IsWemaLife)
      request['companyid'] = this.companyId;

    var response = await this.apiProvider.Post(AppConst.REGISTER, request).toPromise();
    if (response != null && response['status']) {
      this.toastCtrl.create({
        message: 'Registered successfully',
        duration: 2000
      }).present();

      if (this.base64Image != "assets/imgs/camera.png") {
        let uploadRequest: FormData = new FormData();
        uploadRequest.append('files[]', this.base64Image, 'file1');
        uploadRequest.append('fileflag', '3');
        uploadRequest.append('userid', response['userid']);
        if (!AppState.IsWemaLife)
          uploadRequest.append('companyid', this.companyId);
        uploadRequest.append('auth', 'false');
        uploadRequest.append('filestatus', '1');
        uploadRequest.append('type', 'profilepic');
        uploadRequest.append('createdby', response['userid']);

        this.toastCtrl.create({
          message: 'Uploading profile picture,please wait...',
          duration: 2000
        }).present();

        this.apiProvider.Post(AppConst.FILE_UPLOAD, uploadRequest).subscribe((uploadResponse) => {
          if (uploadResponse != null && uploadResponse['status'])
            this.toastCtrl.create({
              message: 'Profile picture uploaded successfully',
              duration: 2000
            }).present();
          else
            this.toastCtrl.create({
              message: 'Profile picture not uploaded',
              duration: 2000
            }).present();
        },
          (error) => {
            this.toastCtrl.create({
              message: 'Profile picture not uploaded',
              duration: 2000
            }).present();
          }
        );
      }

    //  this.navCtrl.push(OtpVerificationPage, { emailId: this.emailId, UserId: response['userid'] });
    }
    else if (response != null && response['status'] == false) {
      this.toastCtrl.create({
        message: response['message'],
        duration: 2000
      }).present();
    }
    else {
      this.toastCtrl.create({
        message: 'Something went wrong, please try again',
        duration: 2000
      }).present();
    }
  }

}
