import { IDesist } from 'app/shared/model/desist.model';

export interface IHespedim {
  id?: number;
  hName?: string;
  hEmail?: string;
  hContent?: any;
  hNotActive?: boolean;
  desist?: IDesist;
}

export class Hespedim implements IHespedim {
  constructor(
    public id?: number,
    public hName?: string,
    public hEmail?: string,
    public hContent?: any,
    public hNotActive?: boolean,
    public desist?: IDesist
  ) {
    this.hNotActive = this.hNotActive || false;
  }
}
