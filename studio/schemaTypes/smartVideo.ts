import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'smartVideo',
  title: 'Smart Video',
  type: 'object',
  preview: {
    // Let Studio show the poster as media and a small title/subtitle with focus coords
    select: { media: 'poster', display: 'display', focusX: 'focusX', focusY: 'focusY' },
    prepare(selection: any) {
      const title = selection?.display ? `Display: ${selection.display}` : 'Smart Video'
      const subtitle = `focus: ${selection?.focusX ?? 50}, ${selection?.focusY ?? 50}`
      return { title, subtitle, media: selection?.media }
    },
  },
  fields: [
    defineField({
      name: 'file',
      title: 'Video file',
      type: 'file',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'poster',
      title: 'Poster image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'focusX',
      title: 'Focus X (%)',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(100),
    }),
    defineField({
      name: 'focusY',
      title: 'Focus Y (%)',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(100),
    }),
    defineField({
      name: 'display',
      title: 'Display mode',
      type: 'string',
      options: {
        list: [
          { title: 'Cover (default)', value: 'cover' },
          { title: 'Fit (show full portrait inside frame)', value: 'fit' },
          { title: 'Native (use video aspect)', value: 'native' },
        ],
      },
      initialValue: 'cover',
    }),
    defineField({ name: 'autoplay', title: 'Autoplay', type: 'boolean', initialValue: true }),
    defineField({ name: 'muted', title: 'Muted', type: 'boolean', initialValue: true }),
    defineField({ name: 'loop', title: 'Loop', type: 'boolean', initialValue: true }),
    defineField({ name: 'playsInline', title: 'Plays inline', type: 'boolean', initialValue: true }),
  ],
})
