import {Entrepot} from './entrepot.model';

export interface IStatActivityDriver {
  id?: string;
  jour?: Date;
  entrepot?: Entrepot;
  driver?: any;
  nbColisLivree?: number;
  nbColisRetournee?: number;
  nbColisNonLivree?: number;
  nbColisNLRetour?: number;
  nbColisNLALivree?: number;
  nbColisEncours?: number;
  nbColisEntrepot?: number;
  nbColisEntrepotChezLivreur?: number;
  nbColisEntrepotRetour?: number;
  nbColisPickUp?: number;
  nbColisPUNonTreated?: number;
  valColisLivree?: number;
  valDepenses?: number;
  valMontantRecoltee?: number;
  nbColisMUInALivree?: number;
  nbColisMUOutRetour?: number;
  nbColisMUOutALivree?: number;
  nbColisMUInRetour?: number;
  nbColisMUInNonTreated?: number;

}

export class StatActivityDriver implements IStatActivityDriver {
  constructor(
    public id?: string,
    public jour?: Date,
    public entrepot?: Entrepot,
    public driver?: any,
    public nbColisLivree?: number,
    public nbColisRetournee?: number,
    public nbColisNonLivree?: number,
    public nbColisNLRetour?: number,
    public nbColisNLALivree?: number,
    public nbColisEncours?: number,
    public nbColisEntrepot?: number,
    public nbColisEntrepotChezLivreur?: number,
    public nbColisEntrepotRetour?: number,
    public nbColisPickUp?: number,
    public nbColisPUNonTreated?: number,
    public valColisLivree?: number,
    public valDepenses?: number,
    public valMontantRecoltee?: number,
    public nbColisMUInALivree?: number,
    public nbColisMUOutRetour?: number,
    public nbColisMUOutALivree?: number,
    public nbColisMUInRetour?: number,
    public nbColisMUInNonTreated?: number
  ) {
  }

}
