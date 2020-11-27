import { IYegan } from 'app/shared/model/yegan.model';

export interface IMantaghe {
  id?: number;
  name?: string;
  mantaghes?: IYegan[];
}

export const defaultValue: Readonly<IMantaghe> = {};
