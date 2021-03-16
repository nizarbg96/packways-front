
export interface ICar {
  id?: string;
  marqueVehicle?: string;
  modelVehicle?: string;
  matVehicle?: string;
  typeVehicle?: string;
  deleted?: boolean;
  deletedBy?: string;
  deletedByName?: string;
  deletedDate?: Date;
  createdBy?: string;
  createdByName?: string;
  createdDate?: Date;
}

export class Car implements ICar {
  constructor(
    public id?: string,
    public marqueVehicle?: string,
    public modelVehicle?: string,
    public matVehicle?: string,
    public typeVehicle?: string,
    public deleted?: boolean,
    public deletedBy?: string,
    public deletedByName?: string,
    public deletedDate?: Date,
    public createdBy?: string,
    public createdByName?: string,
    public createdDate?: Date
  ) {
    this.deleted = this.deleted || false;
  }
}
