import { Moment } from 'moment';
import { IMorkhasi } from 'app/shared/model/morkhasi.model';
import { IDore } from 'app/shared/model/dore.model';
import { INegahbani } from 'app/shared/model/negahbani.model';
import { IBargeMamooriat } from 'app/shared/model/barge-mamooriat.model';
import { IYegan } from 'app/shared/model/yegan.model';
import { IYeganCode } from 'app/shared/model/yegan-code.model';
import { IDaraje } from 'app/shared/model/daraje.model';
import { INirooCode } from 'app/shared/model/niroo-code.model';
import { ISemat } from 'app/shared/model/semat.model';

export interface IKarbar {
  id?: number;
  name?: string;
  onvanShoghli?: string;
  codePerseneli?: string;
  bezaneshate?: boolean;
  sazmani?: boolean;
  tarikhBazneshastegi?: string;
  morkhasis?: IMorkhasi[];
  dores?: IDore[];
  negahbanis?: INegahbani[];
  bargeMamoorits?: IBargeMamooriat[];
  yegan?: IYegan;
  yeganCode?: IYeganCode;
  daraje?: IDaraje;
  nirooCode?: INirooCode;
  semat?: ISemat;
}

export const defaultValue: Readonly<IKarbar> = {
  bezaneshate: false,
  sazmani: false,
};
