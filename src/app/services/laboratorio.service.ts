import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class LaboratorioService {

  constructor(private afs: AngularFirestore) { }

  createLaboratorio(laboratorio: any) {
    let facultadCol = this.afs.collection('laboratorio');

    return facultadCol.add(laboratorio);
  }

  getLaboratorio() {
    return this.afs.collection('laboratorio');
  }
}
