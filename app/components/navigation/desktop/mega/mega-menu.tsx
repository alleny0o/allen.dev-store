// MegaMenu.tsx
import { SanityReferenceLink } from "~/components/sanity/link/sanity-reference-link";
import type { ROOT_QUERYResult } from "types/sanity/sanity.generated";

type HeaderMenu = NonNullable<NonNullable<ROOT_QUERYResult['header']>['menu']>;
type MenuItem = HeaderMenu[number];
type MegaMenuType = Extract<MenuItem, { _type: 'megaMenu' }>;

interface MegaMenuProps {
  data: MegaMenuType;
}

export function MegaMenu({ data }: MegaMenuProps) {
  const label = data.name ?? "Menu";

  // If parent link exists, render it
  if (data.link) {
    return (
      <SanityReferenceLink data={data.link} className="nav-text">
        {label}
      </SanityReferenceLink>
    );
  }

  // Otherwise render label only
  return <span className="nav-text">{label}</span>;
}