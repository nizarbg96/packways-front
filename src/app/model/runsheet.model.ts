import { IActivity } from './activity.model';
import { IColisRunsheet } from './colis-runsheet.model';
import {Entrepot} from './entrepot.model';
import {Car} from './car.model';


export interface IRunsheet {
  id?: string;
  ref?: string;
  scanCode?: number;
  status?: string;
  createdBy?: string;
  createdDate?: Date;
  updatedBy?: string;
  updatedDate?: Date;
  confirmedBy?: string;
  confirmedDate?: Date;
  dispachedBy?: string;
  dispachedDate?: Date;
  treatedBy?: string;
  treatedDate?: Date;
  closedBy?: string;
  closedDate?: Date;
  deleted?: boolean;
  deletedBy?: string;
  deletedDate?: Date;
  driver?: any;
  listColis?: IColisRunsheet[];
  listHistoriques?: any[];
  runsheetsIdHistory?: string[];
  currentRunsheetId?: string;
  matricule?: string;
  entrepot?: Entrepot;
  type?: string;
  cout?: number;
  car?: Car;
}

export class Runsheet implements IRunsheet {
  constructor(
    public id?: string,
    public ref?: string,
    public scanCode?: number,
    public status?: string,
    public createdBy?: string,
    public createdDate?: Date,
    public updatedBy?: string,
    public updatedDate?: Date,
    public confirmedBy?: string,
    public confirmedDate?: Date,
    public dispachedBy?: string,
    public dispachedDate?: Date,
    public treatedBy?: string,
    public treatedDate?: Date,
    public closedBy?: string,
    public closedDate?: Date,
    public deleted?: boolean,
    public deletedBy?: string,
    public deletedDate?: Date,
    public driver?: any,
    public listColis?: IColisRunsheet[],
    public listHistoriques?: any[],
    public activity?: IActivity,
    public runsheetsIdHistory?: string[],
	  public currentRunsheetId?: string,
    public matricule?: string,
    public entrepot?: Entrepot,
    public type?: string,
    public cout?: number,
    public car?: Car
  ) {
    this.deleted = this.deleted || false;
  }
}
