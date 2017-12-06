/**
 * Created by juliano on 20/11/17.
 */
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
@Injectable()
export class GMDMatrix{
  constructor(private http: Http){

  }

  getDistance(origin: number[], destiny: number[]){
    console.log("https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins="+origin[1]+"%20"+origin[0]+"&destinations="+destiny[1]+"%2C"+destiny[0]+"&key=AIzaSyBuL93fd5H-iGMvqDiRyTOvLn9BXrlg0Fg")
    return this.http.get("https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins="+origin[1]+"%20"+origin[0]+"&destinations="+destiny[1]+"%2C"+destiny[0]+"&key=AIzaSyBuL93fd5H-iGMvqDiRyTOvLn9BXrlg0Fg")
  }

}
