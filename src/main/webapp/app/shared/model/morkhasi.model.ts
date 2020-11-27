import { Moment } from 'moment';
import { IKarbar } from 'app/shared/model/karbar.model';

export interface IMorkhasi {
  id?: number;
  begin?: string;
  end?: string;
  karbar?: IKarbar;
}

export const defaultValue: Readonly<IMorkhasi> = {};
