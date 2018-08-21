import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AddfriendPage } from '../addfriend/addfriend';
import { User } from '../../models/user';
import { ChatsPage } from '../chats/chats';
import firebase from 'firebase';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  users = [];

  constructor(public navCtrl: NavController) {

  }

  add(){
    this.navCtrl.push(AddfriendPage);
  }

  ionViewDidLoad(){
    this.getContacts();
  }

  async getContacts(){
    var friends = [];
    await firebase.database().ref().child('/users').child(firebase.auth().currentUser.uid).child('friends').once('value', (snapshot) => {
      let result = snapshot.val();
      for(let k in result){
        friends.push(k);
       }
       friends.push(firebase.auth().currentUser.uid);
    });
    this.showFriends(friends);
  }

  showFriends(friends){
    this.users = [];
    firebase.database().ref().child('/users').once('value', (snapshot) => {
      let result = snapshot.val();
      for(let k in result){ //"k" provides key Id of each object
        if(friends.includes(k)){
          this.users.push({
             email : result[k].email,
             ID : k
           });
        }
       }
    });
  }


  chatWith(user:User){
    let id = new Date().getTime();
    let uid = firebase.auth().currentUser.uid;
    let chatID = uid+id;
    firebase.database().ref('/chats/'+chatID+'/members/'+firebase.auth().currentUser.uid).set(true);
    firebase.database().ref('/userChats/'+firebase.auth().currentUser.uid+'/'+chatID).set(true);
    firebase.database().ref('/chats/'+chatID+'/members/'+user.ID).set(true);
    firebase.database().ref('/userChats/'+user.ID+'/'+chatID).set(true);
    this.navCtrl.push(ChatsPage, {
        ID: chatID,
        email: firebase.auth().currentUser.email,
        chatTitle: chatID
    });
  }

}
