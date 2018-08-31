import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { User } from '../../models/user';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';
import { InfoPage } from '../info/info';
import { LoginService } from '../../services/loginservice';
import { DeveloperinfoPage } from "../developerinfo/developerinfo";
/**
 * Generated class for the LoginPage pag.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private logIn:LoginService,public alertCtrl:AlertController) {

    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

async login(user:User){
    try{
      await this.logIn.login(user);
      this.navCtrl.push(TabsPage);
    }catch(e){

  let alert = this.alertCtrl.create({
    title: 'Error',
    subTitle: 'User Details none existent or wrong , Please enter a valid username and password',
    buttons: ['Ok']
  });

  alert.present();

    }
  }

  register(){
    this.navCtrl.push(RegisterPage);
  }

  infopg(){
    this.navCtrl.push(InfoPage);
  }

  developer(){
    this.navCtrl.push(DeveloperinfoPage);
  }

}
