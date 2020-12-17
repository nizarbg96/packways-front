import {IColisRunsheet} from './colis-runsheet.model';
import {IEntrepot} from './entrepot.model';

export interface IMoveableUnit {
  id?: string;
  ref?: string;
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
  entrepotSrc?: IEntrepot;
  entrepotDest?: IEntrepot;
  driver?: any;
  listColis?: IColisRunsheet[];
  listHistoriques?: any[];
  matricule?: string;
}

export class MoveableUnit implements IMoveableUnit {
  constructor(
    public id?: string,
    public ref?: string,
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
    public entrepotSrc?: IEntrepot,
    public entrepotDest?: IEntrepot,
    public driver?: any,
    public listColis?: IColisRunsheet[],
    public listHistoriques?: any[],
    public matricule?: string
  ) {
    this.deleted = this.deleted || false;
  }
}
