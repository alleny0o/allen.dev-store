// internal-link-item.tsx
import { SanityInternalLink } from "~/components/sanity/link/sanity-internal-link";
import type { InternalLinkType } from "../../types";

interface InternalLinkItemProps {
  item: InternalLinkType;
}

export function InternalLinkItem({ item }: InternalLinkItemProps) {
  return (
    <li className="h-full shrink-0">
      <div className="h-full flex items-center">
        <SanityInternalLink data={item} className="nav-text" />
      </div>
    </li>
  );
}
