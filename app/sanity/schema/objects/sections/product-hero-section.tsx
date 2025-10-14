import {EyeOff, Box} from 'lucide-react';
import {defineType, defineField} from 'sanity';

export default defineType({
  name: 'productHeroSection',
  title: 'Product Hero Section',
  type: 'object',
  fields: [
    defineField({
      name: 'settings',
      type: 'sectionSettings',
      title: 'Section Settings',
      description:
        '🛒 This section represents the main product display — media gallery and product details. The layout and behavior are handled globally in code.',
    }),
  ],
  preview: {
    select: {settings: 'settings'},
    prepare({settings}) {
      return {
        title: 'Product Hero Section',
        subtitle: 'Media gallery + product details (auto-rendered)',
        media: () => (settings?.hide ? <EyeOff /> : <Box />),
      };
    },
  },
});
