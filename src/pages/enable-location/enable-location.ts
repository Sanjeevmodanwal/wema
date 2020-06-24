import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Platform } from "ionic-angular/platform/platform";
import { AppState } from "../../AppStates";
import { Geolocation } from "@ionic-native/geolocation";
/**
 * Generated class for the EnableLocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: "page-enable-location",
  templateUrl: "enable-location.html"
})
export class EnableLocationPage {
  constructor(
    public navCtrl: NavController,
    private geolocation: Geolocation,
    private platform: Platform,
    public navParams: NavParams
  ) {}
  ionViewDidLoad() {
    console.log("ionViewDidLoad EnableLocationPage");
  }
  grantlocation() {
    console.log('inside grantlocation()');
    // //Subscribe on pause
    // this.platform.pause.subscribe(() => {
    //   console.log(' this.platform.pause ')
    //   //Hello pause
    // });
    // //Subscribe on resume
    // this.platform.resume.subscribe(() => {
    //   console.log(' this.platform.resume ')
    //   window['paused'] = 0;
    // });
    /**
     * Get current location of the user
     */
    let options = {
      timeout: 10000,
      enableHighAccuracy: true
    };
    this.geolocation
      .getCurrentPosition()
      .then(position => {
        AppState.Location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        console.log(AppState.Location);
        this.navCtrl.pop();
      })
      .catch(error => {
        console.log("Error getting location", error);
      });
    /*let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
     this.alertCtrl.create({
       message:"watch position:"+JSON.stringify(data)
     }).present();
    });*/
  }
}
