import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'smartImage',
  title: 'Smart Image',
  type: 'image',
  options: {
    hotspot: true,
  },
  fields: [
    defineField({
      name: 'alt',
      title: 'Alt text',
      type: 'string',
      description: 'Alt text for the image for accessibility',
    }),
    defineField({
      name: 'focusX',
      title: 'Focus X (%)',
      type: 'number',
      description: 'Manual horizontal focus override (0-100). Overrides hotspot when set and no hotspot available.',
      validation: (Rule) => Rule.min(0).max(100),
    }),
    defineField({
      name: 'focusY',
      title: 'Focus Y (%)',
      type: 'number',
      description: 'Manual vertical focus override (0-100). Overrides hotspot when set and no hotspot available.',
      validation: (Rule) => Rule.min(0).max(100),
    }),
  ],
})
