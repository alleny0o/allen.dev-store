/**
 * Removes invisible Unicode characters from Sanity strings.
 * 
 * Sanity preview mode can inject zero-width spaces, RTL/LTR marks, etc.
 * that break string comparisons.
 */
export function sanitizeString(str: string | undefined | null, fallback = ''): string {
  if (!str) return fallback;
  
  // Remove zero-width spaces, RTL/LTR marks, and other invisible Unicode
  return str.replace(/[\u200B-\u200D\uFEFF\u202A-\u202E]/g, '').trim();
}