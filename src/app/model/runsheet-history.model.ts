export  interface IRunsheetHistory {
  runsheetId?: string ;
  addedBy?: string;
  addedDate?: Date;

}
export class RunsheetHistory implements IRunsheetHistory{
  constructor(
    public runsheetId?: string ,
    public addedBy?: string,
    public addedDate?: Date,
  ) {
  }
}
