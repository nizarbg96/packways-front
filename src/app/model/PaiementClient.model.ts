export interface IPaiementClient {
  userName?: string;
  montant?: number;
  nbColisLivreeRecoltee?: number;
  nbColisRetourneeRecoltee?: number;
  lastPayement?: number;
}

export class PaiementsClient implements IPaiementClient {

  constructor(
    public userName?: string,
    public montant?: number,
    public nbColisLivreeRecoltee?: number,
    public nbColisRetourneeRecoltee?: number,
    public lastPayement?: number
  ) {}


}
