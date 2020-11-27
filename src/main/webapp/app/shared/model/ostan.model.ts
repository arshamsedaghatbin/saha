import { IYegan } from 'app/shared/model/yegan.model';

export interface IOstan {
  id?: number;
  name?: string;
  ostans?: IYegan[];
}

export const defaultValue: Readonly<IOstan> = {};
