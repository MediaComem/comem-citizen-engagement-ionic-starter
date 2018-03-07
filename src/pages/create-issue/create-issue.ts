import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { config } from '../../app/config';
import { QimgImage } from '../../models/qimg-image';
import { AuthProvider } from '../../providers/auth/auth';
import { PictureProvider } from '../../providers/picture/picture';

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
  picture: QimgImage;

  constructor(
    private auth: AuthProvider,
    private geolocation: Geolocation,
    private httpClient: HttpClient,
    private navCtrl: NavController,
    private navParams: NavParams,
    private pictureService: PictureProvider,
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
    this.pictureService.takeAndUploadPicture().subscribe(picture => {
      this.picture = picture;
    }, err => {
      console.warn('Could not take picture', err);
    });
  }

}
