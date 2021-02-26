import {Trip} from '../layout/trips/Trip';

export interface IClassementDrivers {
  id?: string;
  driver?: any;
  week?: number;
  jour?: Date;
  nbColisLivree?: number;
  nbColisTreated?: number;
  nbAttempts?: number;
  successRate?: number;
}

export class ClassementDrivers implements IClassementDrivers {
  constructor(
    public id?: string,
    public driver?: any,
    public week?: number,
    public jour?: Date,
    public nbColisLivree?: number,
    public nbColisTreated?: number,
    public nbAttempts?: number,
    public successRate?: number
  ) {
  }


}
