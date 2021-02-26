import {Entrepot} from './entrepot.model';
import {User} from '../layout/users/User';

export interface IStatActivityJourClient {
  id?: string;
  jour?: Date;
  entrepot?: Entrepot;
  driver?: any;
  user?: User;
  nbColisLivree?: number;
  nbColisRetournee?: number;
  nbColisNonLivree?: number;
  nbColisNLRetour?: number;
  nbColisNLALivree?: number;
  nbColisEncoursLivraison?: number;
  nbColisEnCoursRetour?: number;
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
  nbColisTransitLivraison?: number;
  nbColisTransitRetour?: number;
  nonClosedTrips?: number;
  nbColisEnCoursDePayement?: number;
  nbColisPayee?: number;
  lasPickUpDate?: Date;
  tauxLivraison?: number;

}

export class StatActivityJourClient implements IStatActivityJourClient {
  constructor(
    public id?: string,
    public jour?: Date,
    public entrepot?: Entrepot,
    public driver?: any,
    public user?: User,
    public nbColisLivree?: number,
    public nbColisRetournee?: number,
    public nbColisNonLivree?: number,
    public nbColisNLRetour?: number,
    public nbColisNLALivree?: number,
    public nbColisEncoursLivraison?: number,
    public nbColisEnCoursRetour?: number,
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
    public nbColisMUInNonTreated?: number,
    public nbColisTransitLivraison?: number,
    public nbColisTransitRetour?: number,
    public nonClosedTrips?: number,
    public nbColisEnCoursDePayement?: number,
    public nbColisPayee?: number,
    public lasPickUpDate?: Date,
    public tauxLivraison?: number
) {
  }

}
