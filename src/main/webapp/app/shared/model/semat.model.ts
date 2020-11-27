import { IKarbar } from 'app/shared/model/karbar.model';

export interface ISemat {
  id?: number;
  onvanShoghli?: string;
  karbars?: IKarbar[];
}

export const defaultValue: Readonly<ISemat> = {};
