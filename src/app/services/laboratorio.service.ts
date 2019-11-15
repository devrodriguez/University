import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { Reservation } from '../interfaces/reservation';

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

  deleteLaboratorio(name: string) {
    let id: string;
    return new Promise((resolve, reject) => {
      this.afs.collection('laboratorio', ref => ref.where('name', '==', name)).snapshotChanges().subscribe(snapshot => {
        id = snapshot.map(res => res.payload.doc.id)[0];
        this.afs.doc(`laboratorio/${id}`).delete();
        resolve();
      });
    });
  }

  createReservation(reservation: Reservation) {
    let reservationRef = this.afs.collection('reservation');

    return reservationRef.add(reservation);
  }

  getReservations() {
    return this.afs.collection<Reservation>('reservation');
  }
}
