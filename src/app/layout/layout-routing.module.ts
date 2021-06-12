import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LayoutComponent} from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'prefix'},
      {path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule'},
      {path: 'trips', loadChildren: './trips/trips.module#TripsModule'},
      {path: 'user-trips', loadChildren: './user-trips/user-trips.module#UserTripsModule'},
      {path: 'runsheet', loadChildren: './runsheet/runsheet.module#RunsheetModule'},
      {path: 'runsheet-in-progress', loadChildren: './runsheet-in-progress/runsheet-in-progress.module#RunsheetInProgressModule'},
      {path: 'mu', loadChildren: './moveable-unit/moveable-unit.module#MoveableUnitModule'},
      {path: 'mu-in-progress', loadChildren: './mu-in-progress/mu-in-progress.module#MuInProgressModule'},
      {path: 'ramassage', loadChildren: './ramassage/ramassage.module#RamassageModule'},
      {path: 'ramassage-in-progress', loadChildren: './ramassage-in-progress/ramassage-in-progress.module#RamassageInProgressModule'},
      {path: 'reconcile-runsheet', loadChildren: './reconcile-runsheet/reconcile-runsheet.module#ReconcileRunsheetModule'},
      {path: 'reconcile-mu', loadChildren: './reconcile-mu/reconcile-mu.module#ReconcileMuModule'},
      {path: 'reconcile-pickUp', loadChildren: './reconcile-pick-up/reconcile-pick-up.module#ReconcilePickUpModule'},
      {path: 'close-activity-runsheet', loadChildren: './close-activity-runsheet/close-activity-runsheet.module#CloseActivityRunsheetModule'},
      {path: 'inventaire', loadChildren: './inventaire/inventaire.module#InventaireModule'},
      {path: 'depenses', loadChildren: './depenses/depenses.module#DepensesModule'},
      {path: 'payements', loadChildren: './activity-payement/activity-payement.module#ActivityPayementModule'},
      {path: 'entrepot', loadChildren: './entrepot/entrepot.module#EntrepotModule'},
      {path: 'gas-tickets', loadChildren: './gaz-tickets/gaz-tickets.module#GazTicketsModule'},
      {path: 'statestics', loadChildren: './statestics/statestics.module#StatesticsModule'},
      {path: 'conflicts', loadChildren: './conflict-trips/conflict-trips.module#ConflictTripsModule'},
      {path: 'adresses', loadChildren: './adresses/adresses.module#AdressesModule'},
      {path: 'address', loadChildren: './address/address.module#AddressModule'},
      {path: 'users', loadChildren: './users/users.module#UsersModule'},
      {path: 'drivers', loadChildren: './drivers/drivers.module#DriversModule'},
      {path: 'pickup', loadChildren: './pickup/pickup.module#PickUpModule'},
      {path: 'car', loadChildren: './car/car.module#CarModule'},
      {path: 'employee', loadChildren: './employee/employee.module#EmployeeModule'},
      {path: 'profile', loadChildren: './profile/profile.module#ProfileModule'},
      {path: 'drivers-table', loadChildren: './drivers-table/drivers-table.module#DriversTableModule'},
      {path: 'courbeille', loadChildren: './courbeille/courbeille.module#CourbeilleModule'},
      {path: 'caisse', loadChildren: './caisse/caisse.module#CaisseModule'},
      {path: 'caisse-state', loadChildren: './caisse-state/caisse-state.module#CaisseStateModule'},
      {path: 'injection-fond', loadChildren: './injection-fond/injection-fond.module#InjectionFondModule'},
      {path: 'charge-fixe', loadChildren: './charge-fixe/charge-fixe.module#ChargeFixeModule'},
      {path: 'statlivreur', loadChildren: './statlivreur/statlivreur.module#StatlivreurModule'},
      {path: 'rapport', loadChildren: './rapport/rapport.module#RapportModule'},
      {path: 'parainage', loadChildren: './parainage/parainage.module#ParainageModule'},
      {path: 'map-trips', loadChildren: './map-trips/map-trips.module#MapTripsModule'},
      {path: 'charts', loadChildren: './charts/charts.module#ChartsModule'},
      {path: 'tables', loadChildren: './tables/tables.module#TablesModule'},
      {path: 'forms', loadChildren: './form/form.module#FormModule'},
      {path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule'},
      {path: 'grid', loadChildren: './grid/grid.module#GridModule'},
      {path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule'},
      {path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {
}
