import {Entrepot} from './entrepot.model';

export interface IAdmin {
    idAdmin?: string;
    name?: string;
    email?: string;
    password?: string;
    image?: string;
    entrepot?: Entrepot;
    financier?: boolean;
    role?: string;

}

export class Admin implements IAdmin{
  constructor(
    public idAdmin?: string,
    public name?: string,
    public email?: string,
    public password?: string,
    public image?: string,
    public entrepot?: Entrepot,
    public financier?: boolean,
    public role?: string
) {
    this.financier = this.financier || false;
  }
}
