export interface IHealthStats {
  nbColisLivree?: number;
  nbStopLivree?: number;
  nbColiRetournee?: number;
  chiffreAffaire?: number;
  fraisSoutraitance?: number;
  depenseInterne?: number;

}

export class HealthStats implements IHealthStats {


  constructor(
    public nbColisLivree?: number,
    public nbStopLivree?: number,
    public nbColiRetournee?: number,
    public chiffreAffaire?: number,
    public fraisSoutraitance?: number,
    public depenseInterne?: number
  ) {
  }

}
