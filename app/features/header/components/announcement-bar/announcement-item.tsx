import {cx} from 'class-variance-authority';
import {Link} from 'react-router';
import type {ROOT_QUERYResult} from 'types/sanity/sanity.generated';
import {SanityInternalLink} from '~/components/sanity/link/sanity-internal-link';

/** Underline offset for link styling in pixels */
const LINK_UNDERLINE_OFFSET = '2px';

type AnnouncementItemProps = NonNullable<
  NonNullable<ROOT_QUERYResult['header']>['announcementBar']
>[number];

/**
 * Renders a single announcement item as text, internal link, or external link.
 */
export function AnnouncementItem(props: AnnouncementItemProps) {
  if (!props.text) return null;

  const wrapperClass = cx('flex justify-center text-center');
  const linkClass = cx(`underline underline-offset-[${LINK_UNDERLINE_OFFSET}]`);

  // Internal Sanity link
  if (props.link) {
    return (
      <div className={wrapperClass}>
        <SanityInternalLink
          className={linkClass}
          data={{
            _key: props.link.slug?.current ?? '',
            _type: 'internalLink',
            anchor: null,
            link: props.link,
            name: props.text,
          }}
        >
          {props.text}
        </SanityInternalLink>
      </div>
    );
  }

  // External link
  if (props.externalLink) {
    return (
      <div className={wrapperClass}>
        <Link
          to={props.externalLink}
          className={linkClass}
          target={props.openInNewTab ? '_blank' : undefined}
          rel={props.openInNewTab ? 'noopener noreferrer' : undefined}
          aria-label={
            props.openInNewTab ? `${props.text} (opens in new tab)` : undefined
          }
        >
          {props.text}
        </Link>
      </div>
    );
  }

  // Plain text
  return <p className="inline-block text-center">{props.text}</p>;
}
