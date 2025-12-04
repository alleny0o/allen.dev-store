// external-link-item.tsx
import {SanityExternalLink} from '~/components/sanity/link/sanity-external-link';
import type {ExternalLinkType} from '../../types';

interface ExternalLinkItemProps {
  item: ExternalLinkType;
}

export function ExternalLinkItem({item}: ExternalLinkItemProps) {
  return (
    <li className="h-full shrink-0">
      <div className="flex h-full items-center">
        <SanityExternalLink data={item} className="nav-text" />
      </div>
    </li>
  );
}
