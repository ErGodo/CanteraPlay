import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero',
  type: 'document',
  fields: [
    defineField({
      name: 'slogan',
      title: 'Slogan',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'promoVideo',
      title: 'Promo Video',
      type: 'file',
      description: 'Sube un video promocional (MP4, WebM). Se mostrará en la hero.',
      options: {
        accept: 'video/*',
      },
    }),
  ],
})
