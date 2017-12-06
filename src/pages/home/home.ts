import { Component } from '@angular/core';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';
import {NavController, NavParams, Platform} from 'ionic-angular';
import {ResultViewPage} from "../result-view/result-view";


@Component({
  templateUrl: 'details.html',
})
export class NavigationDetailsPage {
  item;

  constructor(params: NavParams) {
    this.item = params.data.item;
  }
}



@Component({
  selector: 'page-home',
  providers: [GoogleMaps],
  templateUrl: 'home.html'
})
export class HomePage {

  map: GoogleMap;

  item ={'urgencia': {
    'title': 'Urgência',
    'icon': 'medkit',
    'description': 'São casos em que os resultantes de acidentes pessoais (por exemplo, uma fratura causada por uma queda) ou de complicações na gravidez.',
    'color': '#E63135'
  },
    'emergencia':{
      'title': 'Emergência',
      'icon': 'medkit',
      'description': 'São casos em que há risco imediato de morte ou de lesões irreparáveis para o paciente.\nPor exemplo, um infarto do coração.',
      'color': '#E63135'
    }}



  constructor(public navCtrl: NavController, public platform: Platform) {
    platform.ready().then(() => {
      this.loadMap();
    });
  }


  change(){

    let GOOGLE = {"lat": -22.978285999999997, "lng": -44.2903386};
    this.map.animateCamera({
      'target': GOOGLE,
      'tilt': 60,
      'zoom': 18,
      'bearing': 140
    });
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
          lat: -22.333847,
          lng: -42.889196
        },
        'tilt': 0,
        'zoom': 6.5,
        'bearing': 0
      }
    });

    this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
      console.log('Map is ready!');
    });

    // this.map.addKmlOverlay({'url': "https://www.samplewebsite.com/myKMLFile.kml"});
  }

  openNavDetailsPage(type: string) {
    if(type=='urgencia'){
      this.navCtrl.push(NavigationDetailsPage, { item: this.item.urgencia });
    }
    if(type=='emergencia'){
      this.navCtrl.push(NavigationDetailsPage, { item: this.item.emergencia });
    }
  }

  result(tipo:string){
    this.navCtrl.push(ResultViewPage,{tipo: tipo})
  }

  result_upa(){
    this.navCtrl.push(ResultViewPage)
  }
}
