import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { BloqueService } from 'src/app/services/bloque.service';
import { FacultadService } from 'src/app/services/facultad.service';
import { LaboratorioService } from 'src/app/services/laboratorio.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usersAmount: number = 0;
  blocksAmount: number = 0;
  laboratoriesAmount: number = 0;
  facultiesAmount: number = 0;

  constructor(private userServ: UserService, 
    private blocksServ: BloqueService, 
    private facultyServ: FacultadService, 
    private labServ: LaboratorioService) { }

  ngOnInit() {
    this.getUsers();
    this.getBlocks();
    this.getFaculties();
    this.getLaboratories();
  }

  getUsers() {
    this.userServ.getUsers().valueChanges().subscribe(res => {
      this.usersAmount = res.length;
    })
  }

  getBlocks() {
    this.blocksServ.getBloque().valueChanges().subscribe(res => {
      this.blocksAmount = res.length;
    })
  }

  getFaculties() {
    this.facultyServ.getFacultad().valueChanges().subscribe(res => {
      this.facultiesAmount = res.length;
    })
  }

  getLaboratories() {
    this.labServ.getLaboratorio().valueChanges().subscribe(res => {
      this.laboratoriesAmount = res.length;
    })
  }

}
