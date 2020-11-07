import { IDesist } from 'app/shared/model/desist.model';

export interface IGestBook {
  id?: number;
  bName?: string;
  bEmail?: string;
  bPhone?: string;
  bContent?: any;
  bNotActive?: boolean;
  desist?: IDesist;
}

export class GestBook implements IGestBook {
  constructor(
    public id?: number,
    public bName?: string,
    public bEmail?: string,
    public bPhone?: string,
    public bContent?: any,
    public bNotActive?: boolean,
    public desist?: IDesist
  ) {
    this.bNotActive = this.bNotActive || false;
  }
}
