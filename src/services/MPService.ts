/**
 * Created by juliano on 08/10/17.
 */

import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
@Injectable()
export class MPService{
  constructor(private _http:Http){

  }

  getUS(){
    return this._http.get("http://apps.mprj.mp.br/geoserver/plataforma/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=plataforma:saude_estabelecimentos_cnes_app&outputFormat=application%2Fjson&SRSNAME=EPSG:4326&format_options=CHARSET:UTF-8");
   }


}
