import {defineArrayMember, defineField} from 'sanity';
import {List} from 'lucide-react';

export default defineField({
  type: 'object',
  name: 'linkSection',
  title: 'Link Section',
  icon: List,
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headingLink',
      type: 'link',
      title: 'Heading Link (Optional)',
    }),
    defineField({
      name: 'links',
      type: 'array',
      of: [
        defineArrayMember({type: 'internalLink'}),
        defineArrayMember({type: 'externalLink'}),
      ],
    }),
  ],
  preview: {
    select: {title: 'heading'},
    prepare({title}) {
      return {
        title: title || 'Untitled Section',
        subtitle: 'Link Section',
      };
    },
  },
});
