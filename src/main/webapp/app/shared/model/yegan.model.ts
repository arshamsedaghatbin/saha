import { IKarbar } from 'app/shared/model/karbar.model';
import { INirooCode } from 'app/shared/model/niroo-code.model';
import { IShahr } from 'app/shared/model/shahr.model';
import { IMantaghe } from 'app/shared/model/mantaghe.model';
import { IOstan } from 'app/shared/model/ostan.model';
import { IYeganType } from 'app/shared/model/yegan-type.model';

export interface IYegan {
  id?: number;
  name?: string;
  code?: string;
  zirYegans?: IYegan[];
  karbars?: IKarbar[];
  nirooCode?: INirooCode;
  yegan?: IYegan;
  shahr?: IShahr;
  mantaghe?: IMantaghe;
  ostan?: IOstan;
  yeganType?: IYeganType;
}

export const defaultValue: Readonly<IYegan> = {};
