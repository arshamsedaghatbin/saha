import { IKarbar } from 'app/shared/model/karbar.model';

export interface IDaraje {
  id?: number;
  name?: string;
  description?: string;
  karbars?: IKarbar[];
}

export const defaultValue: Readonly<IDaraje> = {};
