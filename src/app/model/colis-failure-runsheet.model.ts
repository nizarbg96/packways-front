


export interface IColisFailureRunsheet {
  idTrip?: string;
  addedBy?: string;
  addedDate?: Date;
  removed?: boolean;
  removedBy?: string;
  removedDate?: Date;
}
export class ColisFailureRunsheet implements IColisFailureRunsheet{
  constructor(
    public idTrip?: string,
    public addedBy?: string,
    public addedDate?: Date,
    public removed?: boolean,
    public removedBy?: string,
    public removedDate?: Date,
  ) {
    this.removed = this.removed || false;
  }

}
