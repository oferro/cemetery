import { Moment } from 'moment';
import { IDesist } from 'app/shared/model/desist.model';
import { MediaType } from 'app/shared/model/enumerations/media-type.model';

export interface IMedia {
  id?: number;
  mType?: MediaType;
  mDescription?: string;
  mDate?: Moment;
  mLink?: string;
  mNotActive?: boolean;
  desist?: IDesist;
}

export class Media implements IMedia {
  constructor(
    public id?: number,
    public mType?: MediaType,
    public mDescription?: string,
    public mDate?: Moment,
    public mLink?: string,
    public mNotActive?: boolean,
    public desist?: IDesist
  ) {
    this.mNotActive = this.mNotActive || false;
  }
}
