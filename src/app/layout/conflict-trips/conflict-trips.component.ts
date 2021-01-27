import { Component, OnInit } from '@angular/core';
import {Conflit, IConflit} from '../../model/conflit.model';
import {Trip} from '../trips/Trip';
import {ConflitService} from './conflit.service';
import {TripService} from '../trips/trips.service';
import get = Reflect.get;
import {MatListOption} from '@angular/material';
import {Runsheet} from '../../model/runsheet.model';

@Component({
  selector: 'app-conflict-trips',
  templateUrl: './conflict-trips.component.html',
  styleUrls: ['./conflict-trips.component.scss']
})
export class ConflictTripsComponent implements OnInit {

  conflits: Conflit[] = [];
  trips: Trip[] = [];
  conflitTrips: ConflitTrip[] = [];
  date = new Date();
  spinner = false;
  selectedConflitTrip: ConflitTrip;
  filtredConflitTrips: ConflitTrip[];
  conflitInfo = ['runsheet creation', 'M.U creation', 'Pick Up creation', 'Reconcile Activity Runsheet - Liste des colis (non Livrés / non Retournés):',
    'Reconcile Activity Runsheet', 'Reconcile Activity Runsheet - Liste des colis (Livrés / Retournés):', 'Reconcile Activity M.U',
    'Reconcile Activity Pick Up', 'Inventaire'
  ];
  conflitNonTreatedDamagedLost = ['Reconcile Activity Runsheet - Lost', 'Reconcile Activity Runsheet - Damaged', 'Reconcile M.U - Non Expédié',
    'Reconcile M.U - Lost', 'Reconcile M.U - Damaged', 'Reconcile Activity Pick Up - Non Expédié', 'Reconcile Activity Pick Up - Lost',
    'Reconcile Activity Pick Up - Damaged'];
  conflitInventaire = ['Inventaire - Non Treated'];
  private moreDayCounter = 1;

  constructor(private conflitService: ConflitService, private tripService: TripService) { }

  ngOnInit() {
    this.getConflictTrips();
  }

  getConflictTrips() {
    const  fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - this.moreDayCounter);
    fromDate.setHours(0); fromDate.setMinutes(0); fromDate.setSeconds(0);
    this.spinner = true;
    this.conflitService.findByCreatedDateGreaterThan(fromDate).subscribe((res) => {
      this.conflits = res.body.reverse();
    const listConflitTripsIds = this.conflits.filter((conflit) => conflit.closed === false).map((conflit) => conflit.colisId);
    this.tripService.getListOfTips(listConflitTripsIds).subscribe((resTrips) => {
      this.trips = resTrips.body;
      for (let i = 0; i < this.conflits.length; i++){
        this.conflitTrips.push({conflit: this.conflits[i], trip: this.trips[i]});
      }
      this.filtredConflitTrips = this.conflitTrips;
      this.spinner = false;
    });
    });
  }

  calculateDiff(data) {
    const date = new Date(data);
    const currentDate = new Date();
    const days = Math.floor((currentDate.getTime() - date.getTime()) / 1000 / 60 / 60 / 24);
    return days;
  }

  onAreaListControlChanged(conflit_option: MatListOption, conflitTrip: ConflitTrip) {
    if(conflit_option.selected){
      this.selectedConflitTrip = conflitTrip;
    }else {
      this.selectedConflitTrip = null;
    }
  }
  applyFilter(filterValue: any) {
    const filterValueUpper = filterValue.toUpperCase();
    if(filterValue === '' ) {
      this.filtredConflitTrips = this.conflitTrips;
    }
    else {
      this.filtredConflitTrips = this.conflitTrips.slice().filter((item) => item.trip.refTrip.includes(filterValueUpper));
    }
  }
  showMore() {
    this.moreDayCounter = this.moreDayCounter  + 1;
    this.getConflictTrips();
  }


}
export interface ConflitTrip {
  conflit: IConflit;
  trip: Trip;
}
