import {Entrepot} from './entrepot.model';

export interface IConflit {
    id?: string;
    colisId?: string;
    createdDate?: Date;
    creaedBy?: string;
    entrepot?: Entrepot;
    conflitType?: string;
    activityType?: string;
    activityId?: string;
    closed?: boolean;
    closedBy?: string;
    closedDate?: Date;
}

export  class Conflit implements  IConflit{

  constructor(
  public id?: string,
  public colisId?: string,
  public createdDate?: Date,
  public creaedBy?: string,
  public entrepot?: Entrepot,
  public conflitType?: string,
  public activityType?: string,
  public activityId?: string,
  public closed?: boolean,
  public closedBy?: string,
  public closedDate?: Date
  ) {
    this.closed = this.closed || false;
  }
}
