import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';
import { LoginService } from '../../services/loginservice';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private logIn:LoginService) {

    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

async login(user:User){
    try{
      this.logIn.login(user);
      this.navCtrl.push(TabsPage);
    }catch(e){
      console.log("error: "+e);
    }
  }

  register(){
    this.navCtrl.push(RegisterPage);
  }

}
