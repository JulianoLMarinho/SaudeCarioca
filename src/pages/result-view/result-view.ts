import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, Platform} from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';
import {MPService} from "../../services/MPService";
import {GMDMatrix} from "../../services/GoogleMapDistanceMatrixAPI";
import {isUndefined} from "ionic-angular/util/util";
import { Geolocation } from '@ionic-native/geolocation'
import {Unidade} from "../../models/unidade";
import {CommentListPage} from "../comment-list/comment-list";
import {EvaluatePage} from "../evaluate/evaluate";

/**
 * Generated class for the ResultViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-result-view',
  providers: [MPService, GMDMatrix, Geolocation],
  templateUrl: 'result-view.html',
})
export class ResultViewPage {

  local: any;
  loading: boolean = false;
  map:GoogleMap;

  teste = [];

  // hospital = {
  //   "type":"Feature",
  //   "id":"saude_estabelecimentos_cnes_app.fid--15089972_15fda91cd09_-7231",
  //   "geometry":{
  //     "type":"MultiPoint",
  //     "coordinates":[[-43.2303843,-22.8575674]]
  //   },
  //   "geometry_name":"geom",
  //   "properties":{
  //     "id":2280167,
  //     "municipio":"RIO DE JANEIRO",
  //     "cnes":2280167,
  //     "estabeleci":"HOSPITAL UNIVERSITARIO CLEMENTINO FRAGA FILHO",
  //     "tipo":"HOSPITAL GERAL",
  //     "gestao":"Municipal",
  //     "cep":21941590,
  //     "endereco":"RUA PROFESSOR RODOLPHO PAULO ROCCO, 255 - ILHA DO FUNDAO - RIO DE JANEIRO - RJ",
  //     "telefone":"(21)25622688"
  //   }
  // }
  hospital: Unidade;

  lat:any;
  long:any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public platform: Platform,
              private mpservice: MPService,
              private gmapdm: GMDMatrix,
              private geolocation: Geolocation,
              private loadCtrl: LoadingController) {

    let loadingV = this.loadCtrl.create({
        content: "Carregando"
    });
    loadingV.present();
    this.hospital = navParams.get("unidade");
    this.lat = navParams.get("lat");
    this.long = navParams.get("long");
    console.log(this.hospital);
        loadingV.dismiss();
        platform.ready().then(() => {

          this.loadMap();
        });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultViewPage');
  }

  loadMap(){
    this.map = new GoogleMap('map', {
      'controls': {
        'compass': true,
        'myLocationButton': true,
        'indoorPicker': true,
        'zoom': true
      },
      'gestures': {
        'scroll': true,
        'tilt': true,
        'rotate': true,
        'zoom': true
      },
      'camera': {
        target: {
          lat: -22.8575674,
          lng: -43.2303843
        },
        'tilt': 0,
        'zoom': 7,
        'bearing': 0
      }
    });

    this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
      console.log('Map is ready!');
      this.change();
    });

    // this.map.addKmlOverlay({'url': "https://www.samplewebsite.com/myKMLFile.kml"});
  }

  gfg:any;

  change() {
    let GOOGLE = {"lat": this.hospital.coodenadas[1], "lng": this.hospital.coodenadas[0]};

    this.map.addMarker({
      'position': GOOGLE,
      'title': this.hospital.estabelecimento
    });
    this.map.animateCamera({
      'target': GOOGLE,
      'tilt': 0,
      'zoom': 13,
      'bearing': 0
    });

    let opts = {
      enableHighAccuracy: true
    };



    let onSuccess = function (location) {
      this.local = ["Current your location:\n",
        "latitude:" + location.latLng.lat,
        "longitude:" + location.latLng.lng,
        "speed:" + location.speed,
        "time:" + location.time,
        "bearing:" + location.bearing].join("\n");

    };

      let onError = function (msg) {
        console.log('error');
      };

      this.map.getMyLocation().then((location) => {
          this.local = ["Current your location:\n",
              "latitude:" + location.latLng.lat,
              "longitude:" + location.latLng.lng,
              "speed:" + location.speed,
              "time:" + location.time,
              "bearing:" + location.bearing].join("\n");
      });


    }

    openComment(){
        this.navCtrl.push(CommentListPage);
    }

    openEvaluate(){
      this.navCtrl.push(EvaluatePage);
    }
}
