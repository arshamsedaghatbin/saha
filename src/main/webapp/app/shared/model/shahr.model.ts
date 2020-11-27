import { IYegan } from 'app/shared/model/yegan.model';

export interface IShahr {
  id?: number;
  name?: string;
  zaribAboHava?: number;
  zaribTashiat?: number;
  masafatTaMarkaz?: number;
  yegans?: IYegan[];
}

export const defaultValue: Readonly<IShahr> = {};
