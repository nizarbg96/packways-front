import {StatDriverModule} from './../../shared/modules/statdriver/statdriver.module';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import {DashboardService} from './dashboard.service';
import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {NgbCarouselModule, NgbAlertModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent, DialogStatActivityComponent} from './dashboard.component';
import {
  TimelineComponent,
  NotificationComponent,
  ChatComponent
} from './components';
import {StatModule} from '../../shared';
import {DataTableModule} from 'angular-6-datatable';
import {MatFormFieldModule} from '@angular/material';
import {UserService} from '../users/users.service';
import {MaterialLibModule} from '../material/material.module';
import {StatClientComponent} from './components/stat-client/stat-client.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Ng2CompleterModule} from 'ng2-completer';
import {TripService} from '../trips/trips.service';
import {DriversService} from '../drivers/drivers.service';

@NgModule({
  imports: [
    CommonModule,
    NgbCarouselModule,
    NgbAlertModule,
    DashboardRoutingModule,
    StatModule,
    HttpModule,
    StatDriverModule,
    DataTableModule,
    MatFormFieldModule,
    MaterialLibModule,
    NgbModule,
    ReactiveFormsModule,
    Ng2CompleterModule,
    FormsModule
  ],
  declarations: [
    DashboardComponent,
    TimelineComponent,
    NotificationComponent,
    ChatComponent,
    StatClientComponent,
    DialogStatActivityComponent
  ],
  entryComponents: [
    DialogStatActivityComponent
  ],
  providers:[DatePipe, TripService, DriversService]
})
export class DashboardModule {
}
