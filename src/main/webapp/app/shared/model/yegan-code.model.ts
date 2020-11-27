import { IYegan } from 'app/shared/model/yegan.model';
import { IKarbar } from 'app/shared/model/karbar.model';
import { INirooCode } from 'app/shared/model/niroo-code.model';

export interface IYeganCode {
  id?: number;
  name?: string;
  code?: string;
  yegan?: IYegan;
  karbars?: IKarbar[];
  nirooCode?: INirooCode;
}

export const defaultValue: Readonly<IYeganCode> = {};
