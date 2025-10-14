import {EyeOff, Box} from 'lucide-react';
import {defineType, defineField} from 'sanity';

export default defineType({
  name: 'productHeroSection',
  title: 'Product Hero Section',
  type: 'object',
  fields: [
    defineField({
      name: 'richtext',
      type: 'internationalizedArrayProductRichtext',
    }),
    defineField({
      type: 'aspectRatios',
      name: 'mediaAspectRatio',
    }),
    defineField({
      type: 'sectionSettings',
      name: 'settings',
    }),
  ],
  preview: {
    select: {settings: 'settings'},
    prepare({settings}) {
      return {
        title: 'Product Hero Section',
        media: () => (settings?.hide ? <EyeOff /> : <Box />),
      };
    },
  },
});
