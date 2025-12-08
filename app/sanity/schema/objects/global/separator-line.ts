import {defineField} from 'sanity';

export default defineField({
  name: 'separatorLine',
  title: 'Separator Line',
  type: 'object',
  fields: [
    defineField({
      name: 'show',
      title: 'Show separator line',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'opacity',
      title: 'Separator opacity',
      type: 'rangeSlider',
      options: {
        min: 10,
        max: 100,
        step: 10,
        suffix: '%',
      },
      initialValue: 10,
      hidden: ({parent}) => !parent?.show,
      description: 'Opacity of the separator line',
    }),
    defineField({
      name: 'height',
      title: 'Separator height',
      type: 'rangeSlider',
      options: {
        min: 0.5,
        max: 5,
        step: 0.5,
        suffix: 'px',
      },
      initialValue: 1,
      hidden: ({parent}) => !parent?.show,
      description: 'Height/thickness of the separator line',
    }),
  ],
});
