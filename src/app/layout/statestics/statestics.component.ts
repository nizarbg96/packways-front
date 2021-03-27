import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {StatActivityJour} from '../../model/stat-activity-jour.model';
import {StatestiquesService} from './statestiques.service';
import {HealthStats} from '../../model/health-stats.model';

@Component({
  selector: 'app-statestics',
  templateUrl: './statestics.component.html',
  styleUrls: ['./statestics.component.scss']
})
export class StatesticsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['jour', 'entrepot', 'nbColisEntrepot', 'nbColisLivree'];
  dataSource: MatTableDataSource<StatActivityJour>;
  date = new Date();
  healthStats = new HealthStats(0,0,0,0,0,)

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private statestiquesService: StatestiquesService) { }



  ngAfterViewInit() {
    this.statestiquesService.query().subscribe(res => {
      this.dataSource = new MatTableDataSource<StatActivityJour>(res.body)
      this.dataSource.paginator = this.paginator;
    });
  }


  ngOnInit() {
    const firstDayCurrentMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
    this.statestiquesService.getHealthStats(firstDayCurrentMonth).subscribe((res) => {
      this.healthStats = res.body;
    })
  }

}
