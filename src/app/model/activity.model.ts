import { Moment } from 'moment';
import { IRunsheet } from './runsheet.model';


export interface IActivity {
  id?: string;
  status?: string;
  openedBy?: string;
  openedDate?: Moment;
  closedBy?: string;
  closedDate?: Moment;
  depenses?: number;
  sommeColis?: number;
  argentRecolte?: number;
  driver?: any;
  listRunsheets?: IRunsheet[];
}

export class Activity implements IActivity {
  constructor(
    public id?: string,
    public status?: string,
    public openedBy?: string,
    public openedDate?: Moment,
    public closedBy?: string,
    public closedDate?: Moment,
    public depenses?: number,
    public sommeColis?: number,
    public argentRecolte?: number,
    public driver?: any,
    public listRunsheets?: IRunsheet[]
  ) {}
}
