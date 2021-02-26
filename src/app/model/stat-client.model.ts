import {Trip} from '../layout/trips/Trip';

export interface IStatClient {
  nbColisTotale?: number;
  nbColisLivreeTotale?: number;
  valColisLivreeTotale?: number;
  nbColisTotaleMonth?: number;
  nbColisLivreeTotaleMonth?: number;
  valColisLivreeTotaleMonth?: number;
  nbColisTotaleWeek?: number;
  nbColisLivreeTotaleWeek?: number;
  valColisLivreeTotaleWeek?: number;
  tauxLivraisonTotale?: number;
  tauxLivraisonMonth?: number;
  tauxLivraisonWeek?: number;
  tripsLivreeRT?: number;
  tripsRetourRT?: number;
  tripsTransitRetourRT?: number;
  tripsTransitLivraisonRT?: number;
  tripsEnCoursDeRetourRT?: number;
  tripsEnCoursDeLivraisonRT?: number;
  tripsChezLivreurRT?: number;
  todayTripsLivree?: number;
  todayTripsRetour?: number;
  todayTripsTransitRetour?: number;
  todayTripsTransitLivraison?: number;
  todayTripsEnCoursDeRetour?: number;
  todayTripsEnCoursDeLivraison?: number;
  todayTripsChezLivreur?: number;
  listTripEncoursDeLivraison?: Trip[];
}

export class StatClient implements IStatClient {
  constructor(
    public nbColisTotale?: number,
    public nbColisLivreeTotale?: number,
    public valColisLivreeTotale?: number,
    public nbColisTotaleMonth?: number,
    public nbColisLivreeTotaleMonth?: number,
    public valColisLivreeTotaleMonth?: number,
    public nbColisTotaleWeek?: number,
    public nbColisLivreeTotaleWeek?: number,
    public valColisLivreeTotaleWeek?: number,
    public tauxLivraisonTotale?: number,
    public tauxLivraisonMonth?: number,
    public tauxLivraisonWeek?: number,
    public tripsLivreeRT?: number,
    public tripsRetourRT?: number,
    public tripsTransitRetourRT?: number,
    public tripsTransitLivraisonRT?: number,
    public tripsEnCoursDeRetourRT?: number,
    public tripsEnCoursDeLivraisonRT?: number,
    public tripsChezLivreurRT?: number,
    public todayTripsLivree?: number,
    public todayTripsRetour?: number,
    public todayTripsTransitRetour?: number,
    public todayTripsTransitLivraison?: number,
    public todayTripsEnCoursDeRetour?: number,
    public todayTripsEnCoursDeLivraison?: number,
    public todayTripsChezLivreur?: number,
    public listTripEncoursDeLivraison?: Trip[]
) {
  }


}
