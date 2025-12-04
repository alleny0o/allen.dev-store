import {SanityInternalLink} from '~/components/sanity/link/sanity-internal-link';
import {SanityExternalLink} from '~/components/sanity/link/sanity-external-link';
import {SanityReferenceLink} from '~/components/sanity/link/sanity-reference-link';
import type {ROOT_QUERYResult} from 'types/sanity/sanity.generated';

type HeaderMenu = NonNullable<NonNullable<ROOT_QUERYResult['header']>['menu']>;
type MenuItem = HeaderMenu[number];
type MegaMenuType = Extract<MenuItem, {_type: 'megaMenu'}>;
type LinkSectionType = Extract<NonNullable<MegaMenuType['content']>[number], {_type: 'linkSection'}>;

interface LinkSectionProps {
  data: LinkSectionType;
}

export function LinkSection({data}: LinkSectionProps) {
  return (
    <div className="col-span-3">
      <div className="space-y-4">
        {data.heading && (
          <h3 className="font-semibold text-lg">
            {data.headingLink ? (
              <SanityReferenceLink data={data.headingLink}>
                {data.heading}
              </SanityReferenceLink>
            ) : (
              data.heading
            )}
          </h3>
        )}
        {data.links && (
          <ul className="space-y-2">
            {data.links.map((link) => (
              <li key={link._key}>
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
    </div>
  );
}