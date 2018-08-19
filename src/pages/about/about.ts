import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import firebase from 'firebase';
import { ChatsPage } from '../chats/chats';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  convos = [];

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad(){
    this.getConvos();
  }

  async getConvos(){
    var items = [];
    await firebase.database().ref('userChats/' + firebase.auth().currentUser.uid).once('value', itemSnapshot => {
      itemSnapshot.forEach( itemSnap => {
        items.push(itemSnap.key)
      });
    });
    this.showConvos(items);
  }

  async showConvos(userRooms){
    await firebase.database().ref('chats').once('value', itemSnapshot => {
      this.convos = [];
      itemSnapshot.forEach( itemSnap => {
        if(userRooms.includes(itemSnap.key)){
          this.convos.push({
            ID : itemSnap.key
          });
        }
      });
    });
  }

  async convoClick(chatID){
    this.navCtrl.push(ChatsPage, {
        ID: chatID,
        email: firebase.auth().currentUser.email,
        chatTitle: chatID
    });
  }

}
