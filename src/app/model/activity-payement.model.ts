import {IRunsheet} from './runsheet.model';
import {ColisFailureRunsheet} from './colis-failure-runsheet.model';
import {ColisSuccessRunsheet} from './colis-success-runsheet.model';
import {DepenseActivity} from './depense-activity.model';
import {Entrepot} from './entrepot.model';
import {Trip} from '../layout/trips/Trip';


export interface IActivityPayement {
  id?: string;
  status?: string;
  createdBy?: string;
  createdDate?: Date;
  confirmedBy?: string;
  confirmedDate?: Date;
  closedBy?: string;
  closedDate?: Date;
  deleted?: boolean;
  deletedBy?: string;
  deletedDate?: Date;
  amountToPay?: number;
  totalAmount?: number;
  shippingCosts?: number;
  clientId?: string;
  listColisToPay?: string[];
  listColisRecolted?: string[];
  listColisReturned?: string[];
  ref?: string;
  entrepot?: Entrepot;
  userName?: string;
  clientName?: string;
  listRapportTrips?: Trip[];
  listPayedTrips?: string[];
  listEnCoursDePayementTrips?: string[];
  fileName?: string;
}

export class ActivityPayement implements IActivityPayement {
  constructor(
    public id?: string,
    public status?: string,
    public createdBy?: string,
    public createdDate?: Date,
    public confirmedBy?: string,
    public confirmedDate?: Date,
    public closedBy?: string,
    public closedDate?: Date,
    public deleted?: boolean,
    public deletedBy?: string,
    public deletedDate?: Date,
    public amountToPay?: number,
    public totalAmount?: number,
    public shippingCosts?: number,
    public clientId?: string,
    public listColisToPay?: string[],
    public listColisRecolted?: string[],
    public listColisReturned?: string[],
    public ref?: string,
    public entrepot?: Entrepot,
    public userName?: string,
    public clientName?: string,
    public listRapportTrips?: Trip[],
    public listPayedTrips?: string[],
    public listEnCoursDePayementTrips?: string[],
    public fileName?: string

) {
    this.deleted = this.deleted || false;
  }
}
