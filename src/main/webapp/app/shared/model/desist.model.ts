import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';
import { IGestBook } from 'app/shared/model/gest-book.model';
import { ICandle } from 'app/shared/model/candle.model';
import { IHespedim } from 'app/shared/model/hespedim.model';
import { IMedia } from 'app/shared/model/media.model';

export interface IDesist {
  id?: number;
  dSorName?: string;
  dForeName?: string;
  dPicContentType?: string;
  dPic?: any;
  dBerthPlace?: string;
  dCareer?: any;
  dEducation?: any;
  dDateBorn?: Moment;
  dDateDead?: Moment;
  dNotActive?: boolean;
  users?: IUser[];
  dGestBooks?: IGestBook[];
  dCandels?: ICandle[];
  dHespedims?: IHespedim[];
  dMedias?: IMedia[];
}

export class Desist implements IDesist {
  constructor(
    public id?: number,
    public dSorName?: string,
    public dForeName?: string,
    public dPicContentType?: string,
    public dPic?: any,
    public dBerthPlace?: string,
    public dCareer?: any,
    public dEducation?: any,
    public dDateBorn?: Moment,
    public dDateDead?: Moment,
    public dNotActive?: boolean,
    public users?: IUser[],
    public dGestBooks?: IGestBook[],
    public dCandels?: ICandle[],
    public dHespedims?: IHespedim[],
    public dMedias?: IMedia[]
  ) {
    this.dNotActive = this.dNotActive || false;
  }
}
