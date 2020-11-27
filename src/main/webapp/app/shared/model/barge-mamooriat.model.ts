import { Moment } from 'moment';
import { IKarbar } from 'app/shared/model/karbar.model';

export interface IBargeMamooriat {
  id?: number;
  tarikhSodoor?: string;
  karbar?: IKarbar;
}

export const defaultValue: Readonly<IBargeMamooriat> = {};
