import {Entrepot, IEntrepot} from '../../model/entrepot.model';
import {HistoriqueScan, IHistoriqueScan} from '../../model/historique-scan.model';

export class Trip {
  idTrip?: string;
  userTrip?: any;
  destinataireTrip?: any;
  refTrip?: any;
  destTrip?: any;
  sourceTrip?: any;
  statusTrip?: any;
  prevStatusTrip?: any;
  timingTrip?: any;
  costTrip?: any;
  packageTrip?: any;
  driverTrip?: any;
  affectedday?: Date;
  livredday?: Date;
  getedday?: Date;
  startdelday?: Date;
  returnedday?: Date;
  deletedbyUser?: any;
  deletedbyDriver?: any;
  datecanceledUser?: any;
  datecanceledDriver?: any;
  canceledTrip?: any;
  noticeTrip?: string[];
  modeTrip?: any;
  createdby?: any;
  createdday?: Date;
  updateby?: any;
  updateday?: any;
  codeTrip?: any;
  descriptionTrip?: any;
  deleted?: any;
  msgTrip?: any[];
  selectedDriverTrip?: any;
  listdriverTrip?: any[];
  codeExp?: any;
  isBilled?: any;
  isClosed?: any;
  closedday?: any;
  abscentRdv?: any;
  nonConforme?: any;
  nbTentative?: any;
  dateTentative?: any;
  prereturnedday?: any;
  paymentStatus?: any;
  nbtentativeAppel?: any;
  argentRecolte?: any;
  lastupdateday?: any;
  lastupdateby?: any;
  historique?: any[];
  recoltdate?: any;
  inPayeddate?: any;
  preRecolte?: any;
  preRecolteDate?: any;
  recoltedby?: any;
  preRecoltedbay?: any;
  inpayedby?: any;
  payedby?: any;

  paymentStatusLevel?: any ;
  firstCollectStatus?: any;
  mainCollectStatus?: any;
  inPaymentStatus?: any;
  paidStatus?: any;
  inReturnStatus?: any;
  returnedStatus?: any;
  firstCollectDate?: any;
  mainCollectDate?: any;
  inPaymentDate?: any;
  paidDate?: any;
  inReturnDate?: any;
  returnedDate?: any;
  firstCollectBy?: any;
  mainCollectBy?: any;
  inPaymentBy?: any;
  paidBy?: any;
  inReturnBy?: any;
  returnedBy?: any;
  image?: any;
  entrepot?: IEntrepot;
  pickedUpDate?: Date;
  historiqueScans?: IHistoriqueScan[];

  // runsheets properties
  runsheetsHistory?: any[];
  currentRunsheetId?: any;
  // mu properties
  muHistory?: any[];
  currentMUId?: any;
  // pickUp propreties
  currentPickUpId?: string;
  pickUpHistory?: string;
  transitLivraisonDate?: any;
  transitRetourDate?: any;
  retourDate?: Date;
  survey?: any;
  refJumia?: string;
  fraisSoutraitant?: number;
  delivredCost?: any;
  returnedCost?: any;
  relatedRefStop?: string;
  parentStop ?: boolean;


  constructor() {
  }
}

