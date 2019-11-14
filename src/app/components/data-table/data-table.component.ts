import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

  @Output() delete = new EventEmitter();

  @Input() set data(data: any) {
    this.dataSource.data = data;
  }

  @Input() columns: any[] = [];

  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource();

  constructor() { }

  ngOnInit() {
    this.displayedColumns = ['delete', ...this.columns];
  }

  deleted(index, element) {
    element['index'] = index;
    this.delete.emit(element);
  }

}
