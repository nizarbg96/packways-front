import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {StatActivityJour} from '../../model/stat-activity-jour.model';
import {StatestiquesService} from './statestiques.service';

@Component({
  selector: 'app-statestics',
  templateUrl: './statestics.component.html',
  styleUrls: ['./statestics.component.scss']
})
export class StatesticsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['jour', 'entrepot', 'nbColisEntrepot', 'nbColisLivree'];
  dataSource: MatTableDataSource<StatActivityJour>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private statestiquesService: StatestiquesService) { }

  ngAfterViewInit() {
    this.statestiquesService.query().subscribe(res => {
      this.dataSource = new MatTableDataSource<StatActivityJour>(res.body)
      this.dataSource.paginator = this.paginator;
    });
  }


  ngOnInit() {
  }

}
