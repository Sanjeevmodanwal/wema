import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { LoadingController, AlertController } from "ionic-angular";
import { AppConst } from '../../AppConst';
import { AppState } from '../../AppStates';

//import { AppState } from '../../AppStates';

//import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
//import { File } from '@ionic-native/file';
/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

  constructor(public httpClient: HttpClient,
               private loadingController: LoadingController,
               private alertCtrl: AlertController,
               public http: Http,
              // private transfer: FileTransfer, private file: File
              ) {
  }
/*
  /**
   *
   * @param api Send get request to server
   * @param data
   */
  /*
  Get(api: string, data?: string) {
    /*var url = "https://swapi.co/api/films";
    var request = url + data;
    var response = this.httpClient.get(request);
    return response;*/
    /*
    var loader = this.loadingController.create({
      content: "Please wait.."
    });
    loader.present();
    var url = AppConst.GetWemaBaseAddress() + api + '/' + data;
    var httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.append('Accept', 'application/json');


    httpHeaders = httpHeaders.append('Source-Api', AppState.IsWemaLife ? 'wemalife' : 'wemaplus');
   //httpHeaders = httpHeaders.append('Source-Api',  'wemalife');

    if (AppState.UserCred && AppState.UserCred.hasOwnProperty('key') && AppState.UserCred.key != null && AppState.UserCred.key != '')
      httpHeaders = httpHeaders.append('Api-Key', AppState.UserCred.key);
    if (AppState.UserCred != null && AppState.UserCred['userid'] != '') {
      httpHeaders = httpHeaders.append('uid', AppState.UserCred['userid']);
      httpHeaders = httpHeaders.append('fid', "0");
    }
    var response = this.httpClient.get(url,
      {
        headers: httpHeaders
      });
    loader.dismiss();
    return response;
  }

*/
  /**
   * Send post request to server
   * @param api
   * @param data
   */
  Post(api: string, data?: any) {
   /* var loader = this.loadingController.create({
      content: "Please wait.."
    });
    loader.present();*/
     var url = AppConst.GetWemaBaseAddress() + api;
    //var url = AppConst.WEMA_AZURE_LIVE+ api;

    var httpHeaders = new HttpHeaders();
   // httpHeaders.set('Access-Control-Allow-Origin', '*');
    //httpHeaders.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT')
    //httpHeaders.set('Accept', 'application/json');
    //httpHeaders.set('Source-Api', AppState.IsWemaLife ? 'wemalife' : 'wemaplus');

   // httpHeaders = httpHeaders.append('Accept', '');
 //  httpHeaders.append('Access-Control-Allow-Origin', '*');
  // httpHeaders=httpHeaders.append('Accept-Encoding','gzip,deflate');
  // httpHeaders=httpHeaders.append('Connection','keep-alive');
  // httpHeaders=httpHeaders.append('Content-Length','0');
   httpHeaders=httpHeaders.append('Content-Type','application/json');
   // httpHeaders = httpHeaders.append('Source-Api', AppState.IsWemaLife ? 'wemalife' : 'wemaplus');
   httpHeaders = httpHeaders.append('Source-Api',  'wemalife');
 
  // httpHeaders = httpHeaders.append('Api-Key', '00088w4g440kk4os0w0w08ogwo04ogwwk008gwcssgwws8ck8c4884gw88wg48ow');
   //httpHeaders = httpHeaders.append('fid', "0");
  // httpHeaders = httpHeaders.append('uid','237');

    if (AppState.UserCred && AppState.UserCred.hasOwnProperty('key') && AppState.UserCred.key != null && AppState.UserCred.key != '')
    httpHeaders = httpHeaders.append('Api-Key', AppState.UserCred.key);
  if (AppState.UserCred != null && AppState.UserCred['userid'] != '') {
    httpHeaders = httpHeaders.append('uid', AppState.UserCred['userid']);
    httpHeaders = httpHeaders.append('fid', "0");
  }
    //httpHeaders=httpHeaders.append('Access-Control-Allow-Origin','*');
    //httpHeaders=httpHeaders.append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');

    var response = this.httpClient.post(url, data,
      {
        headers: httpHeaders
      });
    //loader.dismiss();
    return response;
  }
/*
  uploadImage(api: string, imagefile?: any,params?:any) {
    var loader = this.loadingController.create({
       content: "Please wait.."
     });
     loader.present();
      var url = AppConst.GetWemaBaseAddress() + api;
     //var url = AppConst.WEMA_AZURE_LIVE+ api;

     var httpHeaders = new HttpHeaders();
     //httpHeaders.set('Access-Control-Allow-Origin', '*');
     //httpHeaders.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT')
     //httpHeaders.set('Accept', 'application/json');
     //httpHeaders.set('Source-Api', AppState.IsWemaLife ? 'wemalife' : 'wemaplus');


     httpHeaders = httpHeaders.append('content-type','multipart/form-data;');
    // httpHeaders = httpHeaders.append('Source-Api', AppState.IsWemaLife ? 'wemalife' : 'wemaplus');
    httpHeaders = httpHeaders.append('Source-Api',  'wemalife');
    if (AppState.UserCred && AppState.UserCred.hasOwnProperty('key') && AppState.UserCred.key != null && AppState.UserCred.key != '')
       httpHeaders = httpHeaders.append('Api-Key', AppState.UserCred.key);
     if (AppState.UserCred != null && AppState.UserCred['userid'] != '') {
       httpHeaders = httpHeaders.append('uid', AppState.UserCred['userid']);
       httpHeaders = httpHeaders.append('fid', "0");
     }
     //httpHeaders=httpHeaders.append('Access-Control-Allow-Origin','*');
     //httpHeaders=httpHeaders.append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
      console.log('get images data ');

      console.log(httpHeaders);


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
      params:params
   /*    params : {
               'userid': AppState.UserCred.userid,
               'companyid': AppState.UserCred.currentCompany.companyid,
               'auth': 'false',
               'fileflag': '3',
               'filestatus': '1',
               'type': 'profilepic',
               'createdby': AppState.UserCred.userid,

               } */
               /*
    }
       console.log('options value')
       console.log(options)
    fileTransfer.upload(imagefile,url , options)
    .then((data) => {

      loader.dismiss();
     console.log(data.response);
     return data.response;
     }, (err) => {
      loader.dismiss();
      console.log(err);
      return err;
   });



   }


  */
  /**
   * Upload bill
   * @param api
   * @param data
   */
  uploadMedia(api: string, data?: any) {
    var loader = this.loadingController.create({
      content: "Please wait.."
    });
    loader.present();
    var url = AppConst.GetWemaBaseAddress() + api;
    var httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.append('Accept', 'application/json');
    httpHeaders=httpHeaders.append('content-type','multipart/form-data');
  // httpHeaders = httpHeaders.append('Source-Api', AppState.IsWemaLife ? 'wemalife' : 'wemaplus');
   httpHeaders = httpHeaders.append('Source-Api',  'wemalife');
   var response = this.httpClient.post(url, JSON.stringify(data),
      {
        headers: httpHeaders
      });
    loader.dismiss();
    return response;
  }

  /**
 * Send post request to server
 * @param api
 * @param data
 */
  post(api: string, data?: any) {
    var url = AppConst.GetWemaBaseAddress() + api;
    var httpHeaders = new HttpHeaders();
    //httpHeaders.set('Access-Control-Allow-Origin', '*');
    // httpHeaders.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT')
   // httpHeaders = httpHeaders.append('Accept', 'application/json');
 //  httpHeaders.set('Access-Control-Allow-Origin', '*');
// httpHeaders.append('Access-Control-Allow-Origin', '*');
    //httpHeaders=httpHeaders.append('Accept-Encoding','gzip,deflate');
   // httpHeaders=httpHeaders.append('Connection','keep-alive');
    //httpHeaders=httpHeaders.append('Content-Length','0');
    httpHeaders=httpHeaders.append('Content-Type','application/json');
   // httpHeaders = httpHeaders.append('Source-Api', AppState.IsWemaLife ? 'wemalife' : 'wemaplus');
   httpHeaders = httpHeaders.append('Source-Api',  'wemalife');

  // httpHeaders = httpHeaders.append('Api-Key', '00088w4g440kk4os0w0w08ogwo04ogwwk008gwcssgwws8ck8c4884gw88wg48ow');
   //httpHeaders = httpHeaders.append('fid', "0");
  // httpHeaders = httpHeaders.append('uid','237');

    if (AppState.UserCred && AppState.UserCred.hasOwnProperty('key') && AppState.UserCred.key != null && AppState.UserCred.key != '')
    httpHeaders = httpHeaders.append('Api-Key', AppState.UserCred.key);
  if (AppState.UserCred != null && AppState.UserCred['userid'] != '') {
    httpHeaders = httpHeaders.append('uid', AppState.UserCred['userid']);
    httpHeaders = httpHeaders.append('fid', "0");
  }
//httpHeaders = httpHeaders.append('Api-Key', '00088w4g440kk4os0w0w08ogwo04ogwwk008gwcssgwws8ck8c4884gw88wg48ow');
//httpHeaders = httpHeaders.append('fid', "0") 
//httpHeaders = httpHeaders.append('uid','237');
   /*if (AppState.UserCred && AppState.UserCred.hasOwnProperty('key') && AppState.UserCred.key != null && AppState.UserCred.key != '')
      httpHeaders = httpHeaders.append('Api-Key', AppState.UserCred.key);
    if (AppState.UserCred != null && AppState.UserCred['userid'] != '') {
      httpHeaders = httpHeaders.append('uid', AppState.UserCred['userid']);
      httpHeaders = httpHeaders.append('fid', "0");
    }*/

    var response = this.httpClient.post(url, data,
      {
        headers: httpHeaders
      });

    return response;
  }

}
