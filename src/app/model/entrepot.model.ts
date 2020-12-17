import { Moment } from 'moment';

export interface IEntrepot {
  id?: string;
  nom?: string;
  address?: string;
  contact?: string;
  mobileNumber?: string;
  createdBy?: string;
  createdDate?: Date;
  updatedBy?: string;
  updatedDate?: Date;
  deleted?: boolean;
  deletedBy?: string;
  deletedDate?: Date;
}

export class Entrepot implements IEntrepot {
  constructor(
    public id?: string,
    public nom?: string,
    public address?: string,
    public contact?: string,
    public mobileNumber?: string,
    public createdBy?: string,
    public createdDate?: Date,
    public updatedBy?: string,
    public updatedDate?: Date,
    public deleted?: boolean,
    public deletedBy?: string,
    public deletedDate?: Date
  ) {
    this.deleted = this.deleted || false;
  }
}
