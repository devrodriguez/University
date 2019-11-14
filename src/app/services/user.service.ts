import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersCol: AngularFirestoreCollection<User>; 

  constructor(private fireAuth: AngularFireAuth, private afs: AngularFirestore) { }

  async register(user: User) {
    return await this.fireAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  getUsers() {
    return this.afs.collection('users');
  }

  createUser(user: User) {
    let users = this.afs.collection('users');

    return users.add(user);
  }
}
