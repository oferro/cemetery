import { IDesist } from 'app/shared/model/desist.model';

export interface IDUser {
  id?: number;
  uForeName?: string;
  uSorName?: string;
  uPhone?: string;
  uEmail?: string;
  dDesists?: IDesist[];
}

export class DUser implements IDUser {
  constructor(
    public id?: number,
    public uForeName?: string,
    public uSorName?: string,
    public uPhone?: string,
    public uEmail?: string,
    public dDesists?: IDesist[]
  ) {}
}
