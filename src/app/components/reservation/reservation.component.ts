import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Laboratorio } from 'src/app/interfaces/laboratorio';
import { LaboratorioService } from 'src/app/services/laboratorio.service';
import { Reservation } from 'src/app/interfaces/reservation';

import * as moment from 'moment';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  laboratorySel: Laboratorio = {} as Laboratorio;
  reservation: Reservation = {} as Reservation;
  laboratories: Laboratorio[] = [] as Laboratorio[];
  reservations: Reservation[] = [] as Reservation[];
  dateSel: any = '';

  constructor(private laboratoryServ: LaboratorioService, private snack: MatSnackBar) { }

  ngOnInit() {
    this.laboratoryServ.getLaboratorio()
    .snapshotChanges()
    .subscribe(snapshot => {
      this.laboratories = snapshot.map(lab => {
        let data = lab.payload.doc.data();
        data['id'] = lab.payload.doc.id;
        return data as Laboratorio
      });

      console.log(this.laboratories)
    });

    //Reservation
    this.getReservations();
  }

  reserve() {
    
    let reservation: Reservation = {
      labName: this.laboratorySel.name,
      date: moment(this.dateSel).format('DD/MM/YYYY')
    }

    this.laboratoryServ.createReservation(reservation)
    .then(res => {
      this.openSnack('Laboratory reserved successfully');
    });
  }

  getReservations() {
    this.laboratoryServ
    .getReservations()
    .valueChanges()
    .subscribe(res => {
      console.log(res);
      this.reservations = res;
    });
  }

  openSnack(message: string) {
    this.snack.open(message, null, {
      duration: 3000
    });
  }

}
