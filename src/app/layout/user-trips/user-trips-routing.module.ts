import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserTripsComponent} from './user-trips.component';

const routes: Routes = [
    {
        path: '', component: UserTripsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserTripsRoutingModule {
}
