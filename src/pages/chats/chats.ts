import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Content } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
/**
 * Generated class for the ChatsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html',
})
export class ChatsPage {
  chatID=null;
  email=null;
  chatTitle=null;
  chatSubscription=null;
  messages: object[] = [];
  message:string=null;
  @ViewChild('content') content: Content;
  constructor(public navCtrl: NavController, public navParams: NavParams,public db:AngularFireDatabase) {
    this.chatID = navParams.get("ID");
    this.email = navParams.get("email");
    this.chatTitle = navParams.get("ID");
    this.chatSubscription = this.db.list('/chatMessages/'+this.chatID).valueChanges().subscribe( data => {
    this.messages = data;
    this.scrollToBottom();
    });
  }
  
  scrollToBottom(){
  setTimeout(() => {
    this.content.scrollToBottom(300);
  }, 100);
}

sendMessage() {
    this.db.list('/chatMessages/'+this.chatID).push({
      email: firebase.auth().currentUser.email,
      message: this.message,
    })
    this.message = '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatsPage');
  }

}
