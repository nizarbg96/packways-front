import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDatepickerInputEvent, MatPaginator, MatTableDataSource} from '@angular/material';
import {Depenses} from '../../model/depenses.model';
import {DriversTableService} from './drivers-table.service';
import {DriversTable} from '../../model/drivers-table.model';
import {StatActivityDriver} from '../../model/stat-activity-driver.model';
import {StatActivityJour} from '../../model/stat-activity-jour.model';
import {DriversService} from '../drivers/drivers.service';
import {TripService} from '../trips/trips.service';
type AOA = any[][];


@Component({
  selector: 'app-drivers-table',
  templateUrl: './drivers-table.component.html',
  styleUrls: ['./drivers-table.component.scss']
})
export class DriversTableComponent implements OnInit, AfterViewInit {
  constructor() {
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
  }

  }
