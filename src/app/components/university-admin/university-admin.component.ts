import { Component, OnInit } from '@angular/core';
import { BloqueService } from 'src/app/services/bloque.service';
import { FacultadService } from 'src/app/services/facultad.service';
import { LaboratorioService } from 'src/app/services/laboratorio.service';
import { Bloque } from 'src/app/interfaces/bloque';
import { Facultad } from 'src/app/interfaces/facultad';
import { Laboratorio } from 'src/app/interfaces/laboratorio';
import { MatTableDataSource } from '@angular/material/table';

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
    private laboratorioServ: LaboratorioService
  ) { }

  ngOnInit() {
    this.getBloque();
    this.getLaboratorio();
    this.getFacultad();
  }

  createFacultad(evt) {
    this.facultad.name = evt;
    this.facultadServ.createFacultad(this.facultad);
  }

  getFacultad() {
    this.facultadServ.getFacultad().valueChanges().subscribe(res => {
      this.facultadCol = res;
    })
  }

  async deleteFacultad(evt) {
    try {
      await this.facultadServ.deleteFacultad(evt.name);
      //this.facultadCol = this.facultadCol.filter((value, index) => index != evt.index);
    } catch (error) {
      throw error;
    }
  }

  createBloque(evt) {
    this.bloque.name = evt;
    this.bloqueServ.createBloque(this.bloque);
  }

  getBloque() {
    this.bloqueServ.getBloque().valueChanges().subscribe(res => {
      this.bloqueCol = res;
    });
  }

  createLaboratorio(evt) {
    this.laboratorio.name = evt;
    this.laboratorioServ.createLaboratorio(this.laboratorio);
  }

  getLaboratorio() {
    this.laboratorioServ.getLaboratorio().valueChanges().subscribe(res => {
      this.laboratorioCol = res;
    });
  }

}
