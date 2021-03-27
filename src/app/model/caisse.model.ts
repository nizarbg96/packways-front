import {ActivityPayement} from './activity-payement.model';
import {Trip} from '../layout/trips/Trip';
import {Depenses} from './depenses.model';
import {Activity} from './activity.model';
import {IInjectionFond, InjectionFond} from './injection-fond.model';

export interface ICaisse {
  id?: string;
  openedDate?: Date;
  closed?: boolean;
  closedDates?: Date[];
  depenses?: Depenses[];
  payements?: ActivityPayement[];
  recoltedActivities?: Activity[];
  montantOuverture?: number;
  montantsFermeture?: number[];
  deleted?: boolean;
  deletedDate?: Date;
  deletedByName?: string;
  openedById?: string;
  openedByName?: string;
  diff?: number;
  caisseIn?: number;
  caisseOut?: number;
  injection?: number;
  injections?: IInjectionFond[];
}

export class Caisse implements ICaisse {
  constructor(
    public id?: string,
    public openedDate?: Date,
    public closed?: boolean,
    public closedDates?: Date[],
    public depenses?: Depenses[],
    public payements?: ActivityPayement[],
    public recoltedActivities?: Activity[],
    public montantOuverture?: number,
    public montantsFermeture?: number[],
    public deleted?: boolean,
    public deletedDate?: Date,
    public deletedByName?: string,
    public openedById?: string,
    public openedByName?: string,
    public injection?: number,
    public diff?: number,
    public caisseIn?: number,
    public caisseOut?: number,
    public injections?: IInjectionFond[]
  ) {
    this.closed = this.closed || false;
  }
}
