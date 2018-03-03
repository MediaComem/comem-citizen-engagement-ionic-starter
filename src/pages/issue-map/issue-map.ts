import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { latLng, Map, MapOptions, marker, Marker, tileLayer } from 'leaflet';

/**
 * Generated class for the IssueMapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-issue-map',
  templateUrl: 'issue-map.html',
})
export class IssueMapPage {
  map: Map;
  mapMarkers: Marker[];
  mapOptions: MapOptions;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.mapMarkers = [
      marker([ 46.778186, 6.641524 ]).bindTooltip('Hello'),
      marker([ 46.780796, 6.647395 ]),
      marker([ 46.784992, 6.652267 ])
    ];

    this.mapOptions = {
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 })
      ],
      zoom: 13,
      center: latLng(46.778186, 6.641524)
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IssueMapPage');
  }

  onMapReady(map: Map) {
    this.map = map;
    this.map.on('moveend', () => {
      const center = this.map.getCenter();
      console.log(`Map moved to ${center.lng}, ${center.lat}`);
    });
  }

}
