import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { Bloque } from '../interfaces/bloque';

@Injectable({
  providedIn: 'root'
})
export class BloqueService {

  constructor(private afs: AngularFirestore) { }

  createBloque(bloque: any) {
    let facultadCol = this.afs.collection<Bloque>('bloque');

    return facultadCol.add(bloque);
  }

  getBloque() {
    return this.afs.collection<Bloque>('bloque');
  }

  deleteBloque(name: string) {
    let id: string;
    return new Promise((resolve, reject) => {
      this.afs.collection<Bloque>('bloque', ref => ref.where('name', '==', name))
      .snapshotChanges()
      .subscribe(snapshot => {
        id = snapshot.map(res => res.payload.doc.id)[0];
        this.afs.doc(`bloque/${id}`).delete();
        resolve();
      });
    })
  }
}
