import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
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
  hospital:any;
  hosp={
    "type":"Feature",
    "id":"saude_estabelecimentos_cnes.fid--15750827_15fda22edcf_-5e0d",
    "geometry":{
      "type":"MultiPoint",
      "coordinates":[[-4812384.36707353,-2614802.88778987]]
    },
    "geometry_name":"geom",
    "properties":{
      "Município":"RIO DE JANEIRO",
      "Código_CNES":2280167,
      "Estabelecimento":"HOSPITAL UNIVERSITARIO CLEMENTINO FRAGA FILHO",
      "Tipo":"HOSPITAL GERAL",
      "Gestão":"Municipal",
      "CEP":21941590,
      "Endereco":"RUA PROFESSOR RODOLPHO PAULO ROCCO, 255 - ILHA DO FUNDAO - RIO DE JANEIRO - RJ",
      "Telefone":"(21)25622688"
    }
  }
  lat:any
  long:any
  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, private mpservice: MPService, private gmapdm: GMDMatrix,private geolocation: Geolocation) {
    let tipo = navParams.get("tipo");
    this.loading = true;
    this.geolocation.getCurrentPosition().then((resp) => {

      this.lat = resp.coords.latitude
      this.long = resp.coords.longitude
      this.mpservice.getUS().subscribe((res)=>{
        for(let ho of res.json().features){
          if(ho!=null && !isUndefined(ho)){
            if( ho.properties.tipo == tipo){
              this.teste = this.teste.concat(ho)
            }
          }
        }
        let temp = this.teste[0];
        let MTemp = this.getMaisProximo(this.lat, this.long, temp.geometry.coordinates[0][1],temp.geometry.coordinates[0][0])
        for(let m of this.teste){
          if(m.geometry!=null){
            if(this.getMaisProximo(this.lat, this.long, m.geometry.coordinates[0][1], m.geometry.coordinates[0][0])<MTemp){
              temp = m;
              MTemp = this.getMaisProximo(this.lat, this.long, m.geometry.coordinates[0][1], m.geometry.coordinates[0][0]);
            }
          }
        }
        this.hospital = temp;
        this.gmapdm.getDistance([this.long, this.lat],[this.hospital.geometry.coordinates[0][0], this.hospital.geometry.coordinates[0][1]]).subscribe((res)=>{
          this.local = (res.json().rows[0].elements[0].distance.value/1000).toFixed(1)+" km"

        })
        this.loading = false;
        platform.ready().then(() => {
          this.loadMap();
        });
        // this.gmapdm.getDistance()
      })
    }).catch((error) => {
      console.log('Error getting location', error);
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
    let GOOGLE = {"lat": this.hospital.geometry.coordinates[0][1], "lng": this.hospital.geometry.coordinates[0][0]};

    this.map.addMarker({
      'position': GOOGLE,
      'title': this.hospital.properties.estabeleci
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

    }

      let onError = function (msg) {
        console.log('error');
      };

      this.map.getMyLocation(onSuccess);


    }

    getMaisProximo(lat1, long1, lat2, long2){
      let lat = Math.abs(lat1-lat2);
      let long = Math.abs(long1-long2);
      return Math.sqrt(lat*lat+long*long)
    }
}
