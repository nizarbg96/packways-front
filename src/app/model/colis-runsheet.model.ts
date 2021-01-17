

export interface IColisRunsheet {
  idTrip?: string;
  addedBy?: string;
  addedDate?: Date;
  removed?: boolean;
  removedBy?: string;
  removedDate?: Date;
  treated?: boolean;
  survey?: boolean;
}

export class ColisRunsheet implements IColisRunsheet {
  constructor(
     public idTrip?: string,
     public treated?: boolean,
     public addedBy?: string,
     public addedDate?: Date,
     public removed?: boolean,
     public removedBy?: string,
     public removedDate?: Date,
     public survey?: boolean
) {
    this.treated = this.treated || false;
    this.removed = this.removed || false;
    this.survey = this.survey || false;

  }
}
