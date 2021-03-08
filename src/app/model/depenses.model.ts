import { Moment } from 'moment';
import {DepenseActivity} from './depense-activity.model';

export interface IDepenses {
  id?: string;
  createdDate?: Date;
  createdBy?: string;
  createdByName?: string;
  deleted?: boolean;
  deletedBy?: string;
  deletedByName?: string;
  deletedDate?: Date;
  type?: string;
  depenseActivity?: DepenseActivity;
  affectedTo?: any;
  depenseFrom?: string;
  description?: string;
  carnetGasoil?: string;
  montant?: string;
}

export class Depenses implements IDepenses {
  constructor(
    public id?: string,
    public createdDate?: Date,
    public createdBy?: string,
    public createdByName?: string,
    public deleted?: boolean,
    public deletedBy?: string,
    public deletedByName?: string,
    public deletedDate?: Date,
    public type?: string,
    public depenseActivity?: DepenseActivity,
    public affectedTo?: any,
    public depenseFrom?: string,
    public description?: string,
    public carnetGasoil?: string,
    public montant?: string
  ) {
    this.deleted = this.deleted || false;
  }
}
