import { Component, OnInit } from '@angular/core';
import { BloqueService } from 'src/app/services/bloque.service';
import { FacultadService } from 'src/app/services/facultad.service';
import { LaboratorioService } from 'src/app/services/laboratorio.service';
import { Bloque } from 'src/app/interfaces/bloque';
import { Facultad } from 'src/app/interfaces/facultad';
import { Laboratorio } from 'src/app/interfaces/laboratorio';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-university-admin',
  templateUrl: './university-admin.component.html',
  styleUrls: ['./university-admin.component.css']
})
export class UniversityAdminComponent implements OnInit {

  bloque: Bloque = {} as Bloque;
  facultad: Facultad = {} as Facultad;
  laboratorio: Laboratorio = {} as Laboratorio;
  bloqueCol: any[] = [] as any[];
  facultadCol: any[] = [] as any[];
  laboratorioCol: any[] = [] as any[];
  bloqueSource = new MatTableDataSource();
  facultadSource = new MatTableDataSource();
  laboratorioSource = new MatTableDataSource();

  constructor(
    private bloqueServ: BloqueService,
    private facultadServ: FacultadService,
    private laboratorioServ: LaboratorioService,
    private snack: MatSnackBar
  ) { }

  ngOnInit() {
    this.getBloque();
    this.getLaboratorio();
    this.getFacultad();
  }

  createFacultad(evt) {
    this.facultad.name = evt;
    this.facultadServ.createFacultad(this.facultad)
    .then(res => {
      this.openSnack('Facultad created!');
    })
    .catch(err => {
      this.openSnack('Process failed!');
    });
  }

  getFacultad() {
    this.facultadServ
    .getFacultad()
    .valueChanges()
    .subscribe(res => {
      this.facultadCol = res;
    }, err => {
      this.openSnack('Process failed!');
    })
  }

  async deleteFacultad(evt) {
    try {
      await this.facultadServ.deleteFacultad(evt.name);
      this.openSnack('Faculty deleted!');
    } catch (error) {
      this.openSnack('Process failed!');  
      throw error;
    }
  }

  createBloque(evt) {
    this.bloque.name = evt;
    this.bloqueServ.createBloque(this.bloque)
    .then(res => {
      this.openSnack('Bloque created!');
    })
    .catch(err => {
      this.openSnack('Process failed!');
    });
  }

  getBloque() {
    this.bloqueServ
    .getBloque()
    .valueChanges()
    .subscribe(res => {
      this.bloqueCol = res;
    }, err => {
      this.openSnack('Process failed!');
    });
  }

  async deleteBloque(evt) {
    try {
      await this.bloqueServ.deleteBloque(evt.name);
      this.openSnack('Block deleted!');
    } catch (error) {
      throw error;
    }
  }

  createLaboratorio(evt) {
    this.laboratorio.name = evt;
    this.laboratorioServ
    .createLaboratorio(this.laboratorio)
    .then(res => {
      this.openSnack('Laboratory created!');
    })
    .catch(err => {
      this.openSnack('Process failed!');
    });
  }

  getLaboratorio() {
    this.laboratorioServ
    .getLaboratorio()
    .valueChanges()
    .subscribe(res => {
      this.laboratorioCol = res;
    }, err => {
      this.openSnack('Process failed!');
    });
  }

  async deleteLaboratorio(evt) {
    try {
      await this.laboratorioServ.deleteLaboratorio(evt.name);
      this.openSnack('Laboratory deleted!');
    } catch (error) {
      this.openSnack('Process failed!');
      throw error;
    }
  }

  openSnack(message: string) {
    this.snack.open(message, null, {
      duration: 3000
    });
  }

}
