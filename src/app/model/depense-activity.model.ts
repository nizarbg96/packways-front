

export interface IDepenseActivity {
  gasoilEspece?: string;
  gasoilCarteNumber?: string;
  gasoilCarteValue?: string;
  carteTel?: string;
  avance?: string;
  autreDesc?: string;
  autreValue?: string;
}

export class DepenseActivity implements IDepenseActivity {
  constructor(
    public gasoilEspece?: string,
    public gasoilCarteNumber?: string,
    public gasoilCarteValue?: string,
    public carteTel?: string,
    public avance?: string,
    public autreDesc?: string,
    public autreValue?: string
) {}

}
