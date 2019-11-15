import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { Reservation } from '../interfaces/reservation';
import { Laboratorio } from '../interfaces/laboratorio';

@Injectable({
  providedIn: 'root'
})
export class LaboratorioService {

  constructor(private afs: AngularFirestore) { }

  createLaboratorio(laboratorio: any) {
    let facultadCol = this.afs.collection<Laboratorio>('laboratorio');

    return facultadCol.add(laboratorio);
  }

  getLaboratorio() {
    return this.afs.collection<Laboratorio>('laboratorio');
  }

  deleteLaboratorio(name: string) {
    let id: string;
    return new Promise((resolve, reject) => {
      this.afs.collection<Laboratorio>('laboratorio', ref => ref.where('name', '==', name)).snapshotChanges().subscribe(snapshot => {
        id = snapshot.map(res => res.payload.doc.id)[0];
        this.afs.doc(`laboratorio/${id}`).delete();
        resolve();
      });
    });
  }

  createReservation(reservation: Reservation) {
    let reservationRef = this.afs.collection<Reservation>('reservation');

    return reservationRef.add(reservation);
  }

  getReservations() {
    return this.afs.collection<Reservation>('reservation');
  }
}
