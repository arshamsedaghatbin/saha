import { IYeganCode } from 'app/shared/model/yegan-code.model';
import { IYegan } from 'app/shared/model/yegan.model';
import { IKarbar } from 'app/shared/model/karbar.model';

export interface INirooCode {
  id?: number;
  name?: string;
  code?: string;
  yeganCodes?: IYeganCode[];
  yegans?: IYegan[];
  karbars?: IKarbar[];
}

export const defaultValue: Readonly<INirooCode> = {};
