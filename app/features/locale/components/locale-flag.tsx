import {useState} from 'react';
import {getFlagUrl} from '../constants';
import type {LocaleFlagProps} from '../types';

/**
 * Renders a country flag from the Shopify CDN.
 * Falls back to country code text if the image fails to load.
 */
export function LocaleFlag({
  countryCode,
  size = 20,
  className,
}: LocaleFlagProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        className={className}
        style={{
          width: size,
          height: size,
          fontSize: size * 0.45,
        }}
        aria-hidden="true"
      >
        {countryCode.toUpperCase()}
      </span>
    );
  }

  return (
    <img
      src={getFlagUrl(countryCode)}
      alt={countryCode.toUpperCase()}
      width={size}
      height={size}
      className={className}
      onError={() => setFailed(true)}
      aria-hidden="true"
    />
  );
}
