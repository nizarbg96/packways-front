import {Entrepot} from './entrepot.model';
import {Car} from './car.model';

export interface IEmployee {
  id?: string;
  firstName?: string;
  lastName?: string;
  cin?: string;
  phoneNumber?: string;
  roles?: string[];
  deleted?: boolean;
  deletedBy?: string;
  deletedByName?: string;
  deletedDate?: Date;
  createdBy?: string;
  createdByName?: string;
  createdDate?: Date;
  login?: string;
  password?: string;
  entrepot?: Entrepot;
  affectedCars?: Car[];
  fraisSoutraitance?: number;
  soutraitant?: boolean;

}

export class Employee implements IEmployee {
  constructor(
    public id?: string,
    public firstName?: string,
    public lastName?: string,
    public cin?: string,
    public phoneNumber?: string,
    public roles?: string[],
    public deleted?: boolean,
    public deletedBy?: string,
    public deletedByName?: string,
    public deletedDate?: Date,
    public createdBy?: string,
    public createdByName?: string,
    public createdDate?: Date,
    public login?: string,
    public password?: string,
    public entrepot?: Entrepot,
    public affectedCars?: Car[],
    public fraisSoutraitance?: number,
    public soutraitant?: boolean
  ) {
    this.deleted = this.deleted || false;
    this.soutraitant = this.soutraitant || false;

  }
}
