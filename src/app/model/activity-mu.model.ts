import {IRunsheet} from './runsheet.model';
import {ColisFailureRunsheet} from './colis-failure-runsheet.model';
import {ColisSuccessRunsheet} from './colis-success-runsheet.model';
import {DepenseActivity} from './depense-activity.model';
import {Entrepot} from './entrepot.model';
import {IMoveableUnit} from './moveable-unit.model';


export interface IActivityMu {
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
  depenses?: DepenseActivity;
  sommeColis?: number;
  argentRecolte?: number;
  driver?: any;
  listMoveableUnits?: IMoveableUnit[];
  listColisSuccess?: ColisSuccessRunsheet[];
  listColisNonTreated?: string[];
  ref?: string;
  entrepot?: Entrepot;
  listColisException?: string[];
  listSurvey?: string[];
  nbColisAlivree?: number;
  nbColisRetour?: number;
}

export class ActivityMu implements IActivityMu {
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
    public depenses?: DepenseActivity,
    public sommeColis?: number,
    public argentRecolte?: number,
    public driver?: any,
    public listMoveableUnits?: IMoveableUnit[],
    public listColisSuccess?: ColisSuccessRunsheet[],
    public listColisNonTreated?: string[],
    public ref?: string,
    public entrepot?: Entrepot,
    public listColisException?: string[],
    public listSurvey?: string[],
    public nbColisAlivree?: number,
    public nbColisRetour?: number
  ) {
    this.deleted = this.deleted || false;
  }
}
