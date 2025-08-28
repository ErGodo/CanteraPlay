import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'nextMatch',
  title: 'Next Match',
  type: 'document',
  fields: [
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'homeTeam',
      title: 'Home Team',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'awayTeam',
      title: 'Away Team',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
  ],
})
