import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { Facultad } from '../interfaces/facultad';

@Injectable({
  providedIn: 'root'
})
export class FacultadService {

  constructor(private afs: AngularFirestore) { }

  createFacultad(facultad: Facultad) {
    let facultadCol = this.afs.collection<Facultad>('facultad');

    return facultadCol.add(facultad);
  }

  getFacultad() {
    return this.afs.collection<Facultad>('/facultad');
  }

  deleteFacultad(name: string) {
    let id: string;
    return new Promise((resolve, reject) => {
      this.afs.collection('facultad', ref => ref.where('name', '==', name))
      .snapshotChanges()
      .subscribe(snapshot => {
        id = snapshot.map(res => res.payload.doc.id)[0];
        this.afs.doc(`facultad/${id}`).delete();
        resolve();
      });
    })
  }
}
