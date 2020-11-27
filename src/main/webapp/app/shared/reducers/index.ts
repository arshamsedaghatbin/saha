import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import yeganCode, {
  YeganCodeState
} from 'app/entities/yegan-code/yegan-code.reducer';
// prettier-ignore
import karbar, {
  KarbarState
} from 'app/entities/karbar/karbar.reducer';
// prettier-ignore
import semat, {
  SematState
} from 'app/entities/semat/semat.reducer';
// prettier-ignore
import morkhasi, {
  MorkhasiState
} from 'app/entities/morkhasi/morkhasi.reducer';
// prettier-ignore
import dore, {
  DoreState
} from 'app/entities/dore/dore.reducer';
// prettier-ignore
import negahbani, {
  NegahbaniState
} from 'app/entities/negahbani/negahbani.reducer';
// prettier-ignore
import bargeMamooriat, {
  BargeMamooriatState
} from 'app/entities/barge-mamooriat/barge-mamooriat.reducer';
// prettier-ignore
import daraje, {
  DarajeState
} from 'app/entities/daraje/daraje.reducer';
// prettier-ignore
import yeganType, {
  YeganTypeState
} from 'app/entities/yegan-type/yegan-type.reducer';
// prettier-ignore
import nirooCode, {
  NirooCodeState
} from 'app/entities/niroo-code/niroo-code.reducer';
// prettier-ignore
import yegan, {
  YeganState
} from 'app/entities/yegan/yegan.reducer';
// prettier-ignore
import mantaghe, {
  MantagheState
} from 'app/entities/mantaghe/mantaghe.reducer';
// prettier-ignore
import ostan, {
  OstanState
} from 'app/entities/ostan/ostan.reducer';
// prettier-ignore
import shahr, {
  ShahrState
} from 'app/entities/shahr/shahr.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly yeganCode: YeganCodeState;
  readonly karbar: KarbarState;
  readonly semat: SematState;
  readonly morkhasi: MorkhasiState;
  readonly dore: DoreState;
  readonly negahbani: NegahbaniState;
  readonly bargeMamooriat: BargeMamooriatState;
  readonly daraje: DarajeState;
  readonly yeganType: YeganTypeState;
  readonly nirooCode: NirooCodeState;
  readonly yegan: YeganState;
  readonly mantaghe: MantagheState;
  readonly ostan: OstanState;
  readonly shahr: ShahrState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  yeganCode,
  karbar,
  semat,
  morkhasi,
  dore,
  negahbani,
  bargeMamooriat,
  daraje,
  yeganType,
  nirooCode,
  yegan,
  mantaghe,
  ostan,
  shahr,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar,
});

export default rootReducer;
