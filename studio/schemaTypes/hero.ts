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
    defineField({
      name: 'videoFocalY',
      title: 'Video focal Y (%)',
      type: 'number',
      description: 'Ajusta el foco vertical del video (0 = top, 50 = center, 100 = bottom). Útil si el video se corta por arriba.',
      initialValue: 50,
      validation: (Rule) => Rule.min(0).max(100),
    }),
  ],
})
