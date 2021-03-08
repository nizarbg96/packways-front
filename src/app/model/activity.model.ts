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
  nbColisLivree?: number;
  nbColisRetournee?: number;
  nbColisNonLivree?: number;
  nbColisNLRetour?: number;
  nbColisNLALivree?: number;
  nbColisEncours?: number;
  fraisSoutraitant?: number;
  nbStop?: number;
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
    public closedByName?: string,
    public nbColisLivree?: number,
    public nbColisRetournee?: number,
    public nbColisNonLivree?: number,
    public nbColisNLRetour?: number,
    public nbColisNLALivree?: number,
    public nbColisEncours?: number,
    public fraisSoutraitant?: number,
    public nbStop?: number
  ) {
    this.deleted = this.deleted || false;
  }
}
