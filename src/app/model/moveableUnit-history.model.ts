export  interface IMoveableUnitHistory {
  moveableUnitId?: string ;
  addedBy?: string;
  addedDate?: Date;

}
export class MoveableUnitHistory implements IMoveableUnitHistory{
  constructor(
    public moveableUnitId?: string,
    public addedBy?: string,
    public addedDate?: Date,
  ) {
  }
}
