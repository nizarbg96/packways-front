import {Employee} from './employee.model';


export interface IInjectionFond {
  id?: string;
  montant?: number;
  createdDate?: Date;
  createdBy?: string;
  createdByName?: string;
  type?: string;
  description?: string;
  deleted?: boolean;
  deletedBy?: string;
  deletedByName?: string;
  deletedDate?: Date;
  injectedBy?: Employee;
}

export class InjectionFond implements IInjectionFond {
  constructor(
    public id?: string,
    public montant?: number,
    public createdDate?: Date,
    public createdBy?: string,
    public createdByName?: string,
    public type?: string,
    public description?: string,
    public deleted?: boolean,
    public deletedBy?: string,
    public deletedByName?: string,
    public deletedDate?: Date,
    public injectedBy?: Employee
  ) {
    this.deleted = this.deleted || false;
  }
}
