import { Component, OnInit } from '@angular/core';
import '../../../../../assets/statistics_assets/vendors/base/vendor.bundle.base.js';
import '../../../../../assets/statistics_assets/vendors/chart.js/Chart.min.js';
import '../../../../../assets/statistics_assets/js/off-canvas.js';
import '../../../../../assets/statistics_assets/js/hoverable-collapse.js';
import '../../../../../assets/statistics_assets/js/template.js';
import '../../../../../assets/statistics_assets/js/todolist.js';
import '../../../../../assets/statistics_assets/js/dashboard.js';
import '../../../../../assets/statistics_assets/js/dashboard_sticksChart.js';
import {Trip} from '../../../trips/Trip';
import {StatestiquesService} from '../../../statestics/statestiques.service';
import {IStatClient} from '../../../../model/stat-client.model';


declare var f1: any;
declare var f2: any;
declare var f3: any;
declare var f4: any;
declare var f5: any;
declare var f6: any;
declare var f7: any;
declare var sticksChart: any
@Component({
  selector: 'app-real-time-stats',
  templateUrl: './real-time-stats.component.html',
  styleUrls: ['./real-time-stats.component.scss']
})
export class RealTimeStatsComponent implements OnInit {

  isVisible: boolean;
  PreMessagesAction = ['Numéro incorrect !', 'Client non joignable par téléphone !',
    'Client absent au RDV !', 'Client contacté, livraison reportée', 'Reportée, faute de temps'
    , 'Autre'];
  messageSelectionee = '-';
  id: any;
  statClient: IStatClient;
  listColisMessage: Trip[] = [];
  date = new Date();
  nbColisMesg = [0, 0, 0, 0, 0, 0];
  constructor(private statestiquesService: StatestiquesService) { }

  ngOnInit() {
    new f1();
    new f3();
    new f4();
    new f5();
    new f6();
    new f7(0, 0, 0, 0);
    new sticksChart(0, 0, 0, 0, 0);

    if (localStorage.getItem('auth') === 'admin') {
      console.log('user is Admin---');
      this.id = 'admin';
    } else {
      console.log('user is Cleint---');
      this.id = 'UT' + JSON.parse(localStorage.getItem('currentUser')).data[0].idUser;
    }
    this.getStatClient();
  }

  getStatClient() {
    this.statestiquesService.getClientStats('admin').subscribe((res) => {
      this.statClient = res.body;
      new f7(this.statClient.tripsLivreeRT, (this.statClient.tripsRetourRT + this.statClient.tripsEnCoursDeRetourRT + this.statClient.tripsTransitRetourRT),
        (this.statClient.tripsChezLivreurRT + this.statClient.tripsTransitLivraisonRT), this.statClient.tripsEnCoursDeLivraisonRT);
      this.statClient.listTripEncoursDeLivraison.forEach(trip => {
        if (!!trip.msgTrip) {
          if (trip.msgTrip.length > 0) {
            if (this.PreMessagesAction.indexOf(trip.msgTrip[trip.msgTrip.length - 1].contentMsg) >= 0) {
              this.nbColisMesg[this.PreMessagesAction.indexOf(trip.msgTrip[trip.msgTrip.length - 1].contentMsg)] = this.nbColisMesg[this.PreMessagesAction.indexOf(trip.msgTrip[trip.msgTrip.length - 1].contentMsg)] + 1 ;
            } else {
              this.nbColisMesg[this.PreMessagesAction.indexOf('Autre')] = this.nbColisMesg[this.PreMessagesAction.indexOf('Autre')] + 1 ;
            }
          }
        }
      });
      console.log(this.nbColisMesg);
    });
  }
  getColisLivreeFromDate(fromDate: Date) {
    this.statestiquesService.getClientStatsLivree(JSON.parse(localStorage.getItem('currentUser')).data[0].idUser, fromDate).subscribe((res) => {
      const tripsSortedLivree = res.body.sort((a, b) => {
        const livredDayA: number = new Date(a.livredday).getTime();
        const livredDayB: number = new Date(b.livredday).getTime();
        return livredDayA - livredDayB; } );
      const listTripsLivree = tripsSortedLivree.map(trip => new Date(trip.livredday).getDate() + '/' + (new Date(trip.livredday).getMonth() + 1) + '/' + new Date(trip.livredday).getFullYear());
      const listDateLivree = [];
      const listDataLivree = [];
      listTripsLivree.forEach(tripDate => {
        if (this.getCount(listDateLivree, tripDate) === 0) {
          listDateLivree.push(tripDate);
          listDataLivree.push(this.getCount(listTripsLivree, tripDate));
        }
      });
      let max = 0;
      listDataLivree.forEach(data => {
        if (data > max) {
          max = data;
        }
      });
      this.statestiquesService.getClientStatsRetour(JSON.parse(localStorage.getItem('currentUser')).data[0].idUser, fromDate).subscribe((resRetour) => {
        const tripsSortedRetour = resRetour.body.sort((a, b) => {
          const livredDayA: number = new Date(a.livredday).getTime();
          const livredDayB: number = new Date(b.livredday).getTime();
          return livredDayA - livredDayB; } );
        const listTripsRetour = tripsSortedRetour.map(trip => new Date(trip.prereturnedday).getDate() + '/' + (new Date(trip.prereturnedday).getMonth() + 1) + '/' + new Date(trip.prereturnedday).getFullYear());
        const listDateRetour = [];
        const listDataRetour = [];
        listTripsRetour.forEach(tripDate => {
          if (this.getCount(listDateRetour, tripDate) === 0) {
            listDateRetour.push(tripDate);
            listDataRetour.push(this.getCount(listTripsRetour, tripDate));
          }
        });

        const listDate = tripsSortedLivree.map(trip => trip.livredday).concat(tripsSortedRetour.map(trip => trip.prereturnedday));
        const tripsSortedDate = listDate.sort((a, b) => {
          const dateA: number = new Date(a).getTime();
          const dateB: number = new Date(b).getTime();
          return dateA - dateB; } );
        const listDateTauxFinal = tripsSortedDate.map(date => new Date(date).getDate() + '/' + (new Date(date).getMonth() + 1) + '/' + new Date(date).getFullYear());
        const listDistinctDate = [];
        listDateTauxFinal.forEach(date => {
          if (this.getCount(listDistinctDate, date) === 0) {
            listDistinctDate.push(date);
          }
        });
        const listDataTaux = [];
        listDistinctDate.forEach(date => {
          let nbLivree = 0; let nbRetour = 0; let taux = 0;
          if (listDateLivree.indexOf(date) >= 0) {
            nbLivree = listDataLivree[listDateLivree.indexOf(date)];
          }
          if (listDateRetour.indexOf(date) >= 0) {
            nbRetour = listDataRetour[listDateRetour.indexOf(date)];
          }
          if (nbLivree + nbRetour !== 0 ) {
            taux = (nbLivree * 100) / (nbLivree + nbRetour);
          }
          listDataTaux.push(taux);
        });
        console.log(listDistinctDate);
        console.log(listDataTaux);
        new sticksChart(listDateLivree, listDataLivree, max, listDistinctDate, listDataTaux);
      });

    });
  }


  getCount(list: string[], element: string) {
    let count = 0;
    list.forEach(value => {
      if (value === element) {
        count++;
      }
    });
    return count;
  }
  getCountDate(list: Date[], element: Date) {
    let count = 0;
    list.forEach(value => {
      if (value === element) {
        count++;
      }
    });
    return count;
  }

  getTripsMessage(msg: string) {
    this.messageSelectionee = msg;
    this.listColisMessage = this.statClient.listTripEncoursDeLivraison.filter(trip => {
      if (!!trip.msgTrip) {
        if (trip.msgTrip.length > 0) {
          if (msg === 'Autre'){
            if(this.PreMessagesAction.indexOf(trip.msgTrip[trip.msgTrip.length - 1].contentMsg) >= 0){
              return false;
            }else{
              return true;
            }
          }else {
            return trip.msgTrip[trip.msgTrip.length - 1].contentMsg === msg ;
          }
        } else { return false; }
      } else { return false; }
    });
    console.log(this.listColisMessage);
  }

  inNonTreatedList(trp: Trip) {
    return true;
  }


}
