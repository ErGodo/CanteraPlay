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
  ],
})
