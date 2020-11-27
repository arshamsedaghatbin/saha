import { IYegan } from 'app/shared/model/yegan.model';

export interface IYeganType {
  id?: number;
  name?: string;
  yegans?: IYegan[];
}

export const defaultValue: Readonly<IYeganType> = {};
