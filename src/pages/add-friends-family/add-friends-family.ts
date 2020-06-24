import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  ToastController
} from "ionic-angular";
import {
  EmailValidator,
  Validators,
  AbstractControl,
  FormGroup,
  FormControlName,
  FormControl
} from "@angular/forms";
import { AppConst } from "../../AppConst";
import { AppState } from "../../AppStates";
import { ApiProvider } from "../../providers/api/api";
import { DatePicker } from "@ionic-native/date-picker";
/**
 * Generated class for the AddFriendsFamilyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: "page-add-friends-family",
  templateUrl: "add-friends-family.html"
})
export class AddFriendsFamilyPage {
  confirmPassword: any;
  password: any;
  showPass: boolean = false;
  showConfirmPass: boolean = false;
  Country = ["india", "United Kingdom"];
  Gender = ["Male", "Female", "Other"];
  Title = ["Prof", "Dr", "Mr", "Mdm", "Mrs", "Miss"];
  isMatched: boolean = true;
  values: {} = {};
  services: any;
  isSubmitted: boolean;
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$";
  myForm: FormGroup;
  //name:FormControl;
  firstname: FormControl;
  lastname: FormControl;
  relationship: FormControl;
  email: FormControl;
  contact: FormControl;
  contact1: any;
  postcode: FormControl;
  City: FormControl;
  Address: FormControl;
  Address1: any;
  message: FormControl;
  data: {
    name: string;
    firstname: string;
    lastname: string;
    email: string;
    country: string;
    contact: string;
    contact1: string;
    postcode: string;
    Address: string;
    City: string;
    Address1: string;
    Country: string;
    relationship: string;
  } = {
    name: null,
    firstname: null,
    lastname: null,
    email: null,
    contact: null,
    contact1: null,
    postcode: null,
    Address: null,
    country: null,
    Address1: null,
    City: null,
    Country: null,
    relationship: null
  };
  Date: Date;
  constructor(
    private datePicker: DatePicker,
    public navCtrl: NavController,
    private apiProvider: ApiProvider,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    public navParams: NavParams
  ) {
    //this.name=new FormControl('',Validators.required);
    this.firstname = new FormControl("", Validators.required);
    this.lastname = new FormControl("", Validators.required);
    this.relationship = new FormControl("", Validators.required);
    this.email = new FormControl("", [
      Validators.required,
      Validators.pattern(this.emailPattern)
    ]);
    this.contact = new FormControl("", [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10)
    ]);
    //this.contact1=new  FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]);
    this.postcode = new FormControl("", [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(6)
    ]);
    this.message = new FormControl("", [Validators.required]);
    this.Address = new FormControl("", [Validators.required]);
    this.City = new FormControl("", [Validators.required]);
    //this.Country = new FormControl(this.Country,[Validators.required]);
    // this.Address= new FormControl('',[Validators.required]);
    // this.Address1= new FormControl('',[Validators.required]);
    // this.Country= new FormControl('',[Validators.required]);
    this.myForm = new FormGroup({
      // name:this.name,
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      contact: this.contact,
      // contact1:this.contact1,
      postcode: this.postcode,
      Address: this.Address,
      relationship: this.relationship,
      // Country:this.Country,
      City: this.City
    });
  }
  ionViewDidLoad() {
    //console.log('ionViewDidLoad MyaccounteditprofilePage');
  }
  /**
   *Confirm Password match
   */
  passwordChange() {
    if (this.password != this.confirmPassword) {
      this.isMatched = false;
    } else {
      this.isMatched = true;
    }
  }
  /**
   * Password show toggle
   */
  showPassword(flag: boolean) {
    if (flag) this.showPass = !this.showPass;
    else this.showConfirmPass = !this.showConfirmPass;
  }
  /**
   * Send enquiry button click handler
   */
  async submit() {
    console.log(
      this.myForm.value,
      (this.data.Address = this.myForm.value.Address),
      (this.data.Address1 = this.myForm.value.Address1),
      (this.data.City = this.myForm.value.City),
      (this.data.contact = this.myForm.value.contact),
      (this.data.contact1 = this.myForm.value.contact1),
      (this.data.email = this.myForm.value.email),
      // this.data.name=this.myForm.value.name,
      (this.data.firstname = this.myForm.value.firstname),
      (this.data.lastname = this.myForm.value.lastname),
      (this.data.postcode = this.myForm.value.postcode),
      (this.data.country = "2"),
      (this.data.relationship = this.myForm.value.relationship)
      // console.log(this.data)
    );
    this.postcode = this.myForm.value.postcode;
    var re = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;
    if (re.test(this.password) && this.isMatched) {
      //console.log('matched');
      //console.log("title = " + this.data['Title']);
      //console.log("name = " +this.myForm.value.name);
      //console.log("relationship = " +this.myForm.value.relationship);
      //console.log("gender = " +this.data['Gender']);
      //console.log("date of birth = " +this.Date);
      //console.log("email = " +this.myForm.value.email);
      //console.log("Password = " +this.password);
      //console.log("contact = " +this.myForm.value.contact);
      //console.log("Address = " +this.myForm.value.Address);
      //console.log("City = " +this.myForm.value.City);
      //console.log("postcode = " +this.myForm.value.postcode);
      //console.log("Country = " +this.data.Country);
      //console.log("Address1 = " +this.Address1);
      //console.log("contact = " +this.contact1);
      var databaseCountry = "2";
      if (this.data.Country == "United Kingdom") {
        databaseCountry = "1";
      }
      //  this.values['password'] = this.password;
      // this.values['confirmpassword'] = this.confirmPassword;
      //  var memberObj: any = {};
      //  var registerObj: any = this.values;
      var request = {
        action: "C",
        createdby: AppState.UserCred.userid,
        usertypeid: "7",
        userid: AppState.UserCred.userid,
        companyid: AppState.UserCred.currentCompanyId,
        membertype: "someone",
        memberstatus: "1",
        register: {
          addressline: this.myForm.value.Address,
          addressline1: this.Address1,
          city: this.myForm.value.City,
          companyid: "1",
          confirmpassword: this.confirmPassword,
          // country: "2",
          country: databaseCountry,
          //dateofbirth: "27-12-1979",
          //dateofbirth:  this.Date,
          emailid: this.myForm.value.email,
          firstname: this.myForm.value.firstname,
          gender: this.data["Gender"],
          homenumber: this.contact1,
          lastname: this.myForm.value.lastname,
          mobilenumber: this.myForm.value.contact,
          password: this.password,
          postcode: this.myForm.value.postcode,
          relationship: this.myForm.value.relationship,
          title: this.data["Title"]
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
        formid: "1",
        member: {
          companyid: "1"
        }
      };
      var response = await this.apiProvider
        .Post(AppConst.REGISTER, request)
        .toPromise();
      if (response != null && response["status"]) {
        this.toastCtrl
          .create({
            message: "Friend added successfully",
            duration: 2000
          })
          .present();
        this.navCtrl.pop();
        this.navCtrl.pop();
      } else if (
        response != null &&
        response["status"] &&
        response["message"] != null
      ) {
        this.alertCtrl
          .create({
            message: response["message"]
          })
          .present();
      } else if (
        response != null &&
        !response["status"] &&
        response["message"] != null
      ) {
        this.alertCtrl
          .create({
            message: response["message"]
          })
          .present();
      } else {
        this.toastCtrl
          .create({
            message: "Sorry something went wrong, Please try again",
            duration: 2000
          })
          .present();
      }
    }
    // var request = {
    //   userid: this.data.userId,
    //   action: "Change",
    //   newpassword: this.password
    // };
    // var response = await this.apiProvider.Post(AppConst.FORGOT_PASSWORD, request).toPromise();
    // if (response != null && response['status'])
    //   this.navCtrl.push("PasswordSuccessPage");
    else {
      this.alertCtrl
        .create({
          title: "Wrong Password!",
          message:
            "Special character is not allowed & confirm password should be matched"
        })
        .present();
    }
    this.isSubmitted = true;
    //console.log("ss")
    if (
      this.firstname.valid &&
      this.relationship.valid &&
      this.email.valid &&
      this.postcode.valid &&
      this.contact.valid &&
      this.Address.valid
    ) {
      // this.data.name=this.name.value;
      this.data.firstname = this.firstname.value;
      this.data.lastname = this.lastname.value;
      this.data.email = this.email.value;
      this.data.contact = this.contact.value;
      this.data.postcode = this.postcode.value;
      this.data.Address = this.Address.value;
      this.data.City = this.City.value;
      this.data.relationship = this.relationship.value;
      this.Address1 = this.Address1.value;
      //  this.data.City=this.City.value;
      //  this.data.Country =this.data.Country
      // this.data.message=this.message.value;
      //console.log(this.data);
    }
  }
  toggleAccordion1() {
    this.datePicker
      .show({
        date: new Date(),
        mode: "date",
        androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
      })
      .then(
        date => {
          //console.log('Got date: ', date)
          this.Date = date;
          //   this.getAvailableSlots();
        },
        err => console.log("Error occurred while getting date: ", err)
      );
    // console.log(this.date)
  }
  cancel() {
    this.navCtrl.pop();
  }
}
