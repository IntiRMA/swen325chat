import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { User } from '../../models/user';
/**
 * Generated class for the AddfriendPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addfriend',
  templateUrl: 'addfriend.html',
})
export class AddfriendPage {
  public data=[]
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddfriendPage');
    this.getFriends();
  }

  async getFriends(){
    var friends=[]
    await firebase.database().ref().child('/users').child(firebase.auth().currentUser.uid).child('friends').once('value', (snapshot) => {
      let r = snapshot.val();
      for(let f in r){
        friends.push(f);
       }
    });
    this.showAvailableFriends(friends);

  }

  showAvailableFriends(friends){
      this.data = [];
      firebase.database().ref().child('/users').once('value', (snapshot) => {
        let r = snapshot.val();
        for(let f in r){
          if(!friends.includes(f)){
            this.data.push({
               username: r[f].username,
               email : r[f].email,
               ID: r[f].ID
             });
          }
         }
      });
    }

    addFriend(user:User){
      firebase.database().ref('users/' + firebase.auth().currentUser.uid+'/friends/'+user.ID).set(true);
            firebase.database().ref('users/' + user.ID +'/friends/'+ firebase.auth().currentUser.uid).set(true);
    }

}
