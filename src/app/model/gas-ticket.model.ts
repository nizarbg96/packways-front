import {Car} from './car.model';

export interface IGasTicket {
  id?: string;
  numero?: string;
  value?: string;
  affectedBy?: string;
  affectedByName?: string;
  affectedByDate?: Date;
  deleted?: boolean;
  deletedBy?: string;
  deletedByName?: string;
  deletedDate?: Date;
  consumed?: boolean;
  consumedBy?: string;
  consumedByName?: string;
  consumedDate?: Date;
  createdBy?: string;
  createdByName?: string;
  createdByDate?: Date;
  affectedFrom?: string;
  affectedCar?: Car;
}

export class GasTicket implements IGasTicket {
  constructor(
    public id?: string,
    public numero?: string,
    public value?: string,
    public affectedBy?: string,
    public affectedByName?: string,
    public affectedByDate?: Date,
    public deleted?: boolean,
    public deletedBy?: string,
    public deletedByName?: string,
    public deletedDate?: Date,
    public consumed?: boolean,
    public consumedBy?: string,
    public consumedByName?: string,
    public consumedDate?: Date,
    public affectedFrom?: string,
    public createdBy?: string,
    public createdByName?: string,
    public createdByDate?: Date,
    public affectedCar?: Car
  ) {
    this.deleted = this.deleted || false;
    this.consumed = this.consumed || false;
  }
}
