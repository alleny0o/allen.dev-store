// mega-menu.tsx
import {SanityReferenceLink} from '~/components/sanity/link/sanity-reference-link';
import type {ROOT_QUERYResult} from 'types/sanity/sanity.generated';

type HeaderMenu = NonNullable<NonNullable<ROOT_QUERYResult['header']>['menu']>;
type MenuItem = HeaderMenu[number];
type MegaMenuType = Extract<MenuItem, {_type: 'megaMenu'}>;

interface MegaMenuProps {
  data: MegaMenuType;
  className?: string;
}

export function MegaMenu({data, className}: MegaMenuProps) {
  const label = data.name ?? 'Menu';

  if (data.link) {
    return (
      <SanityReferenceLink data={data.link} className={className}>
        {label}
      </SanityReferenceLink>
    );
  }

  return null;
}
