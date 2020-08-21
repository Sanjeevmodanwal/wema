

import { FormsModule } from '@angular/forms';
//import { MbscModule } from '@mobiscroll/angular';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { Camera } from '@ionic-native/camera';
import { Base64 } from '@ionic-native/base64';
//import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { Ionic2RatingModule } from 'ionic2-rating';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { FileChooser } from '../../node_modules/@ionic-native/file-chooser';
//import { FilePath } from '@ionic-native/file-path/ngx';

import { DatePicker } from '@ionic-native/date-picker';
import { GeocoderProvider } from '../providers/geocoder/geocoder';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { Geolocation } from "@ionic-native/geolocation";
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Network } from '@ionic-native/network';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import{ NetworkProvider } from '../providers/network/network'
//import { SafeHtmlPipe } from '../pipes/safe-html/safe-html';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import{ ApiProvider } from '../providers/api/api'
import { HttpModule, Jsonp, JsonpModule } from '@angular/http';
import { IonicStorageModule } from "@ionic/storage";
import { ScrollTabsComponent } from '../../ionic2-scrolltabs/src/components/scrolltabs'
import { DatePipe } from '@angular/common';
import { PipesModule } from '../pipes/pipes.module';
//import { CallNumber} from '@ionic-native/call-number' 
//import { SocialSharing } from '@ionic-native/social-sharing';
//import { SocialSharing } from '@ionic-native/social-sharing/ngx';
//import { Camera } from '../../node_modules/@ionic-native/camera';
import { FileTransfer } from '@ionic-native/file-transfer';

// import { FCM } from '@ionic-native/fcm/ngx';
import { Firebase } from '@ionic-native/firebase/ngx';
import { SocialSharing } from '@ionic-native/social-sharing';
import { SelectionPage } from '../pages/selection/selection';
//import { Http} from '@angular/http';
//import { GetDirectionPage } from '../get-direction/get-direction';
//import { Slides } from 'ionic-angular';
import { SumUp } from '@ionic-native/sum-up/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SelectionPage
  ],
  imports: [ 
    FormsModule, 
    BrowserModule,
    BrowserModule,
    JsonpModule,
    PipesModule
  ,Ionic2RatingModule,
   // MaterialModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    SuperTabsModule.forRoot(),
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: ['sqlite', 'websql', 'indexeddb']
    })
   // IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SelectionPage
  ],
  providers: [
    ApiProvider,
    NetworkProvider,
    Network,
    StatusBar,
    DatePicker,
    InAppBrowser,
    Camera,
    BarcodeScanner,
    FileTransfer,
    Base64,
    Firebase,
    FirebaseX,
    FileChooser,
   // FilePath,
    SocialSharing,
   // Slides, y
    NativeGeocoder,
    DatePipe,
    Geolocation,
   // LaunchNavigator,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GeocoderProvider,
    SumUp,
    FilePath
  ]
})
export class AppModule {}

