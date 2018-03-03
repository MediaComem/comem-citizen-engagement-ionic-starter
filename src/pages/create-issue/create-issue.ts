import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';

import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { config } from '../../app/config';

/**
 * Generated class for the CreateIssuePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-create-issue',
  templateUrl: 'create-issue.html',
})
export class CreateIssuePage {
  base64Picture: string;

  constructor(
    private auth: AuthProvider,
    private camera: Camera,
    private geolocation: Geolocation,
    private httpClient: HttpClient,
    public navCtrl: NavController,
    public navParams: NavParams,
    private platform: Platform
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateIssuePage');

    const url = `${config.apiUrl}/issueTypes`;
    this.httpClient.get(url).subscribe(issueTypes => {
      console.log('Issue types loaded', issueTypes);
    });

    this.platform.ready().then(() => {
      const geolocationPromise = this.geolocation.getCurrentPosition();
      geolocationPromise.then(position => {
        console.log(`User is at ${position.coords.longitude}, ${position.coords.latitude}`);
      }, err => {
        console.warn(`Could not retrieve user position because: ${err.message}`);
      });
    });
  }

  logOut() {
    this.auth.logOut();
  }

  takePicture() {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
     this.base64Picture = imageData;
    }, (err) => {
     // Handle error
    });
  }

}
