import {defineField} from 'sanity';

export const fontWeights = [
  {title: 'Thin - 100', value: 100},
  {title: 'Extralight - 200', value: 200},
  {title: 'Light - 300', value: 300},
  {title: 'Normal - 400', value: 400},
  {title: 'Medium - 500', value: 500},
  {title: 'Semibold - 600', value: 600},
  {title: 'Bold - 700', value: 700},
  {title: 'Extrabold - 800', value: 800},
  {title: 'Black - 900', value: 900},
];

export const fontWeightField = (options?: {initialValue?: number}) =>
  defineField({
    type: 'number',
    name: 'fontWeight',
    title: 'Font weight',
    validation: (Rule) => Rule.required(),
    options: {
      list: fontWeights,
      layout: 'dropdown',
    },
    initialValue: options?.initialValue ?? 400,
  });