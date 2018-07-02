import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {isUndefined} from "ionic-angular/util/util";
import {Geolocation} from "@ionic-native/geolocation";
import {MPService} from "../../services/MPService";
import {Unidade} from "../../models/unidade";
import {GMDMatrix} from "../../services/GoogleMapDistanceMatrixAPI";
import {NavigationDetailsPage} from "../home/home";
import {ResultViewPage} from "../result-view/result-view";
import {CommentListPage} from "../comment-list/comment-list";

/**
 * Generated class for the ResultListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-result-list',
  templateUrl: 'result-list.html',
})
export class ResultListPage {

  unidades: Unidade[] = [];
  unidadesSort: Unidade[] = [];
  userLat: number;
  userLong: number;
  tipo: string = "PRONTO ATENDIMENTO";

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private geolocation: Geolocation,
              private mpservice: MPService,
              private loadCtrl: LoadingController,
              private gmapdm: GMDMatrix) {

      this.tipo = navParams.get("tipo");
      let loadingV = this.loadCtrl.create({
          content: "Buscando Hospitais..."
      });
      loadingV.present();
      this.geolocation.getCurrentPosition().then((resp) => {

          this.userLat = resp.coords.latitude;
          this.userLong = resp.coords.longitude;
          this.mpservice.getUS().subscribe((res)=>{
              for(let ho of res.json().features){
                  if(ho!=null && !isUndefined(ho)){
                      if( ho.properties.tipo == this.tipo){
                          this.unidades.push(new Unidade(ho, this.userLat, this.userLong));
                      }
                  }
              }

              this.unidades.sort(function (a, b) {
                  return a.distancia - b.distancia;
              });

              let temp = [];
              for (let i = 0; i<10; i++){
                  temp.push(this.unidades[i]);
              }
              this.unidades = temp;

              for (let i of this.unidades) {
                  this.gmapdm.getDistance([this.userLong, this.userLat],[i.coodenadas[0], i.coodenadas[1]]).subscribe((res)=>{
                      let k = (res.json().rows[0].elements[0].distance.value/1000).toFixed(1)+" km";
                      let num = (res.json().rows[0].elements[0].distance.value/1000).toFixed(1);
                      i.setDistanciaText(k, num);
                  });
              }

              console.log(this.unidades);
              this.unidades.sort(function (a, b) {
                  return a.distancia - b.distancia;
              });

              this.unidadesSort = this.unidades;
              console.log(this.unidades);
              loadingV.dismiss();
          })
      }).catch((error) => {
          console.log('Error getting location', error);
      });
      this.unidadesSort.sort(function (a, b) {
          return a.distancia - b.distancia;
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultListPage');
  }

  openResult(u: Unidade){
      this.navCtrl.push(ResultViewPage, { unidade: u, lat: this.userLat, long: this.userLong })
  }

  openComment(){
      this.navCtrl.push(CommentListPage);
  }

}
