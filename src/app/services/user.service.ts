import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userExist: boolean = false; 
  usersCol: AngularFirestoreCollection<User>; 

  constructor(private fireAuth: AngularFireAuth, private afs: AngularFirestore) { 
    fireAuth.authState.subscribe(user => this.userExist = user ? true : false); 
  }

  async login(user: User) {
    return await this.fireAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  async logout() {
    return await this.fireAuth.auth.signOut();
  }

  async register(user: User) {
    return await this.fireAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  userAuthenticated() {
    console.log(this.fireAuth.auth.currentUser)
    return this.fireAuth.auth.currentUser ? true : false;
  }

  getUsers() {
    return this.afs.collection('users');
  }

  async createUser(user: User) {
    let users = this.afs.collection('users');

    return await users.add(user);
  }

  deleteUser(email: string) {
    let id: string;
    return new Promise((resolve, reject) => {
      this.afs.collection('users', ref => ref.where('email', '==', email))
      .snapshotChanges()
      .subscribe(snapshot => {
        id = snapshot.map(res => res.payload.doc.id)[0];
        this.afs.doc(`users/${id}`).delete();
        resolve();
      });
    });
  }

  async deleteAccount() {
    let currUser = this.fireAuth.auth.currentUser;

    return await currUser.delete()
  }
}
