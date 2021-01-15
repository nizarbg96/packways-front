


export interface IColisSuccessRunsheet {
  idTrip?: string;
  addedBy?: string;
  addedDate?: Date;
  removed?: boolean;
  removedBy?: string;
  removedDate?: Date;
}
export class ColisSuccessRunsheet implements IColisSuccessRunsheet{
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
