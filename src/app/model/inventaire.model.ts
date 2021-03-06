import {IRunsheet} from './runsheet.model';
import {ColisFailureRunsheet} from './colis-failure-runsheet.model';
import {ColisSuccessRunsheet} from './colis-success-runsheet.model';
import {Entrepot} from './entrepot.model';
import {DepenseActivity} from './depense-activity.model';

export interface IInventaire {
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
  listColisSuccess?: ColisSuccessRunsheet[];
  listColisNonTreated?: string[];
  ref?: string;
  entrepot?: Entrepot;
  listColisException?: string[];
  createdByName?: string;

}

export class Inventaire implements IInventaire {
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
    public listColisSuccess?: ColisSuccessRunsheet[],
    public listColisNonTreated?: string[],
    public ref?: string,
    public entrepot?: Entrepot,
    public listColisException?: string[],
    public createdByName?: string

  ) {
    this.deleted = this.deleted || false;
  }
}
