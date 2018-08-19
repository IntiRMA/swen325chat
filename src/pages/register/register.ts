import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { TabsPage } from '../tabs/tabs';
import firebase from 'firebase';
import { LoginService } from '../../services/loginservice';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AngularFireAuth,private logIn:LoginService) {

    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

async register(user:User){
    try{
      const res= await this.auth.auth.createUserWithEmailAndPassword(user.email, user.password);
      if(res){
        user.ID=firebase.auth().currentUser.uid;
      firebase.database().ref("/users/"+firebase.auth().currentUser.uid).set({
        email:user.email,
        ID:firebase.auth().currentUser.uid

      });
      try{
        this.logIn.login(user);
      }catch(e){}
      this.navCtrl.push(TabsPage);
    }
    }catch(e){
      console.log("error: "+e);
    }
  }

}
