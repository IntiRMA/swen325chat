import { User } from '../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
@Injectable()
export class LoginService{
  constructor(private auth:AngularFireAuth){

  }
  login(user:User){
    var promise = new Promise((resolve, reject)=>{
    this.auth.auth.signInWithEmailAndPassword(user.email, user.password).then(()=>{
          resolve({success : true})
        }).catch((e)=>{
          reject(e);
        })
      })
      return promise;
  }
}
