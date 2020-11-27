import { TranslatorContext, Storage } from 'react-jhipster';

import { setLocale } from 'app/shared/reducers/locale';

TranslatorContext.setDefaultLocale('fa');
TranslatorContext.setRenderInnerTextForMissingKeys(false);

export const languages: any = {
  fa: { name: 'فارسی', rtl: true },
  // jhipster-needle-i18n-language-key-pipe - JHipster will add/remove languages in this object
};

export const locales = Object.keys(languages).sort();

export const isRTL = (lang: string): boolean => languages[lang] && languages[lang].rtl;

export const registerLocale = store => {
  store.dispatch(setLocale(Storage.session.get('locale', 'fa')));
};