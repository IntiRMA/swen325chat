import { User } from '../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { LoginService } from './loginservice';
import firebase from 'firebase';
@Injectable()
export class RegisterService{
  constructor(private auth:AngularFireAuth, private logIn:LoginService){

  }
  async register(user:User){
    var promise = await new Promise((resolve, reject)=>{
    this.auth.auth.createUserWithEmailAndPassword(user.email, user.password).then(()=>{
          resolve({success : true})
        }).catch((e)=>{
          reject(e);
        })
      })
      if(Promise){
        user.ID=firebase.auth().currentUser.uid;
        firebase.database().ref("/users/"+firebase.auth().currentUser.uid).set({
        email:user.email,
        ID:firebase.auth().currentUser.uid

      });
      try{
      await this.logIn.login(user);
      }catch(e){}
    }
      return promise;
  }
}
