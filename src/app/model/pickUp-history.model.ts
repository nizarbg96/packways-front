export  interface IPickUpHistory {
  pickUpId?: string ;
  addedBy?: string;
  addedDate?: Date;

}
export class PickUpHistory implements IPickUpHistory {
  constructor(
    public pickUpId?: string,
    public addedBy?: string,
    public addedDate?: Date,
  ) {}
}
