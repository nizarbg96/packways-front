export interface IJumiaTrip {
  ref?: string;
  clientName?: string;
  clientSurname?: string;
  numMobile?: string;
  street?: string;
  city?: string;
  region?: string;
  nomLivreur?: string;
  valColis?: string;
  statusTrip?: string;
  collectedDate?: string;
  deliveredDate?: string;
  packageDate?: string;
}
export class JumiaTrip implements IJumiaTrip {
  constructor(
   public ref?: string,
  public clientName?: string,
   public clientSurname?: string,
   public numMobile?: string,
  public street?: string,
  public city?: string,
  public region?: string,
  public nomLivreur?: string,
  public valColis?: string,
  public statusTrip?: string,
  public collectedDate?: string,
  public deliveredDate?: string,
  public packageDate?: string
  ) {
  }

}
