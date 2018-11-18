import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';

import { taste } from '../../taste.model';
import { TasteService } from '../../taste.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  tastes: taste[];
  displayedColumns = ['food', 'type','rating','review','actions'];

  constructor(private tasteService: TasteService, private router: Router) { }

  ngOnInit() {
    this.fetchTastes();
  }

  fetchTastes() {
    this.tasteService
      .getemp()
      .subscribe((data: taste[]) => {
        this.tastes = data;
        console.log('Data requested ...');
        console.log(this.tastes);
      });
  }

  editemp(id) {
    this.router.navigate([`/edit/${id}`]);
  }

  deleteemp(id) {
    this.tasteService.deleteemp(id).subscribe(() => {
      this.fetchTastes();
    });
  }

}
