import {SanityInternalLink} from '~/components/sanity/link/sanity-internal-link';
import {SanityExternalLink} from '~/components/sanity/link/sanity-external-link';
import {SanityReferenceLink} from '~/components/sanity/link/sanity-reference-link';
import type {ROOT_QUERYResult} from 'types/sanity/sanity.generated';

type HeaderMenu = NonNullable<NonNullable<ROOT_QUERYResult['header']>['menu']>;
type MenuItem = HeaderMenu[number];
type MegaMenuType = Extract<MenuItem, {_type: 'megaMenu'}>;
type LinkSectionType = Extract<
  NonNullable<MegaMenuType['content']>[number],
  {_type: 'linkSection'}
>;

interface LinkSectionProps {
  data: LinkSectionType;
}

export function LinkSection({data}: LinkSectionProps) {
  return (
    <nav className="col-span-3" aria-label={data.heading || 'Menu section'}>
      <div className="space-y-4">
        {data.heading && (
          <h3 className="mega-menu-heading">
            {data.headingLink ? (
              <SanityReferenceLink data={data.headingLink}>
                {data.heading}
              </SanityReferenceLink>
            ) : (
              data.heading
            )}
          </h3>
        )}
        
        {data.links && data.links.length > 0 && (
          <ul className="space-y-4">
            {data.links.map((link) => (
              <li key={link._key} className="mega-menu-link">
                {link._type === 'internalLink' && (
                  <SanityInternalLink data={link} />
                )}
                {link._type === 'externalLink' && (
                  <SanityExternalLink data={link} />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
}
