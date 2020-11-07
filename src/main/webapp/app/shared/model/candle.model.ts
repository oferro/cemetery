import { IDesist } from 'app/shared/model/desist.model';

export interface ICandle {
  id?: number;
  cName?: string;
  cEmail?: string;
  cPhone?: string;
  cContent?: any;
  cNotActive?: boolean;
  desist?: IDesist;
}

export class Candle implements ICandle {
  constructor(
    public id?: number,
    public cName?: string,
    public cEmail?: string,
    public cPhone?: string,
    public cContent?: any,
    public cNotActive?: boolean,
    public desist?: IDesist
  ) {
    this.cNotActive = this.cNotActive || false;
  }
}
