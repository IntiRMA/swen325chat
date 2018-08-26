import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  img='https://pbs.twimg.com/media/CVL4Ie5UEAElDN1.jpg';
  constructor(public navCtrl: NavController,public alertCtrl:AlertController) {

  }

  changeImg(){
    let alert = this.alertCtrl.create({
    title: 'ChangeImage',
    inputs: [
      {
        name: 'url',
        placeholder: 'url'
      },
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Change',
        handler: data => {
        this.img=data.name;
        }
      }
    ]
  });
  alert.present();
  }

}
