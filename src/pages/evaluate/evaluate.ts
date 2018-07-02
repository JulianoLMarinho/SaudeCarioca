import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EvaluatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-evaluate',
  templateUrl: 'evaluate.html',
})
export class EvaluatePage {

  starColored: string = "#ffef00";
  starNColored: string = "#ffef00";
  sType1: string = "star";
  sType2: string = "star-outline";

  starType: any[] = [this.sType2, this.sType2, this.sType2, this.sType2, this.sType2];
  star:any[] = [this.starNColored, this.starNColored, this.starNColored, this.starNColored, this.starNColored];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  clickStar(id: number){
    for(let i = 0; i <= id; i++){
      this.star[i] = this.starColored;
      this.starType[i] = this.sType1;
    }
    for (let i = id+1; i<this.star.length; i++){
      this.star[i] = this.starNColored;
        this.starType[i] = this.sType2;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EvaluatePage');
  }

}
