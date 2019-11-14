import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  @Output() create = new EventEmitter();

  name: string;

  constructor() { }

  ngOnInit() {
  }

  created() {
    this.create.emit(this.name);
  }

}
