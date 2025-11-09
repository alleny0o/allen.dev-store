import {mapLocaleToContentLanguage} from './config';
import type {I18nLocale} from 'types';

export const sanityLanguageFrom = (input: string | I18nLocale) =>
  mapLocaleToContentLanguage(typeof input === 'string' ? input : input.isoCode);