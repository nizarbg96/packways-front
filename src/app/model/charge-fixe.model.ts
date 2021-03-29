import {Employee} from './employee.model';

export interface IChargeFixe {
  id?: string;
  employee?: Employee;
  valeur?: number;
  description?: string;
  lastUpdate?: Date;
  createdByName?: string;
  createdBy?: string;
  createdDate?: Date;
}

export class ChargeFixe implements IChargeFixe {
  constructor(public id?: string, public employee?: Employee, public valeur?: number, public description?: string, public lastUpdate?: Date,
              public createdByName?: string,
              public createdBy?: string,
              public createdDate?: Date) {
  }
}
