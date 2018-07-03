import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams, ViewController} from 'ionic-angular';

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
  note: number = 0;

  starType: any[] = [this.sType2, this.sType2, this.sType2, this.sType2, this.sType2];
  star:any[] = [this.starNColored, this.starNColored, this.starNColored, this.starNColored, this.starNColored];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public alertCtrl: AlertController,
              public loadCtrl: LoadingController) {
  }

  clickStar(id: number){
    this.note = id+1;
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

  sendResult(){
    if(this.note==0){
        let alert = this.alertCtrl.create({
            subTitle: 'Você precisa dar uma nota entre uma estrela e cinco estrelas!',
            buttons: ['Ok']
        });
        alert.present();
    } else {
        let loadingV = this.loadCtrl.create({
            content: "Enviando Avaliação"
        });
        loadingV.present();

        setTimeout(() => {
          loadingV.dismiss();
          this.viewCtrl.dismiss();
        }, 2000)
    }
  }

}
