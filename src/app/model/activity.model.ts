import {IRunsheet} from './runsheet.model';
import {ColisFailureRunsheet} from './colis-failure-runsheet.model';
import {ColisSuccessRunsheet} from './colis-success-runsheet.model';
import {DepenseActivity} from './depense-activity.model';
import {Entrepot} from './entrepot.model';


export interface IActivity {
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
  listRunsheets?: IRunsheet[];
  listColisFailure?: ColisFailureRunsheet[];
  listColisSuccess?: ColisSuccessRunsheet[];
  listColisPickUp?: ColisSuccessRunsheet[];
  listColisNonTreated?: string[];
  ref?: string;
  entrepot?: Entrepot;
  listColisException?: string[];
  createdByName?: string;
  confirmedByName?: string;
  closedByName?: string;


}

export class Activity implements IActivity {
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
    public listRunsheets?: IRunsheet[],
    public listColisFailure?: ColisFailureRunsheet[],
    public listColisSuccess?: ColisSuccessRunsheet[],
    public listColisPickUp?: ColisSuccessRunsheet[],
    public listColisNonTreated?: string[],
    public ref?: string,
    public entrepot?: Entrepot,
    public listColisException?: string[],
    public createdByName?: string,
    public confirmedByName?: string,
    public closedByName?: string
  ) {
    this.deleted = this.deleted || false;
  }
}
