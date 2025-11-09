import type {I18nLocale} from 'types';

export function pickByAcceptLanguage(header: string | null, locales: I18nLocale[]) {
  if (!header) return null;

  const prefs = header
    .split(',')
    .map((p) => {
      const [loc, q = '1'] = p.trim().split(';q=');
      return {loc: loc.toLowerCase(), q: parseFloat(q)};
    })
    .sort((a, b) => b.q - a.q);

  for (const p of prefs) {
    if (/^[a-z]{2}-[a-z]{2}$/.test(p.loc)) {
      const exact = locales.find((l) => l.isoCode.toLowerCase() === p.loc);
      if (exact) return exact;
    }
  }

  for (const p of prefs) {
    if (/^[a-z]{2}$/.test(p.loc)) {
      const found = locales.find((l) => l.language.toLowerCase() === p.loc);
      if (found) return found;
    }
  }

  return null;
}
