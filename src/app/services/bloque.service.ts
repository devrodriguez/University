import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class BloqueService {

  constructor(private afs: AngularFirestore) { }

  createBloque(bloque: any) {
    let facultadCol = this.afs.collection('bloque');

    return facultadCol.add(bloque);
  }

  getBloque() {
    return this.afs.collection('bloque');
  }
}
