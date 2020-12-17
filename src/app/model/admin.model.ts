import {Entrepot} from './entrepot.model';

export interface IAdmin {
    idAdmin?: string;
    name?: string;
    email?: string;
    password?: string;
    image?: string;
    entrepot?: Entrepot;
    financier?: boolean;

}

export class Admin implements IAdmin{
  constructor(
    public idAdmin?: string,
    public name?: string,
    public email?: string,
    public password?: string,
    public image?: string,
    public entrepot?: Entrepot,
    public financier?: boolean
  ) {
    this.financier = this.financier || false;
  }
}
