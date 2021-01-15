export interface IHistoriqueScan {
  scannedBy?: string;
  scannedDate?: Date;
  scanScope?: string;
  scanMsg?: string;

}

export class HistoriqueScan implements IHistoriqueScan {
  constructor(
    public scannedBy?: string,
  public scannedDate?: Date,
  public scanScope?: string,
  public scanMsg?: string,
) {}


}
