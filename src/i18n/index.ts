import { fr } from './fr';
import { en } from './en';

export const ui = { fr, en } as const;
export type Locale = keyof typeof ui;

export function useTranslations(lang: Locale) {
  return ui[lang];
}
