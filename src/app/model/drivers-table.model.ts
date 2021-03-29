export interface IDriversTable {
  id?: string;
  mois?: Date;
  driver?: any;
  nbColisLivree?: number;
  nbStopLivree?: number;
  coutPrestation?: number;
  avance?: number;
  gasoil?: number;
  chargesFixe?: number;
  reste?: number;
}

export class DriversTable implements IDriversTable {
  constructor(
    public id?: string,
    public mois?: Date,
    public driver?: any,
    public nbColisLivree?: number,
    public nbStopLivree?: number,
    public coutPrestation?: number,
    public avance?: number,
    public gasoil?: number,
    public chargesFixe?: number,
    public reste?: number
  ) {
  }
}
