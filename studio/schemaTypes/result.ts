import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'result',
  title: 'Result',
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
      name: 'homeScore',
      title: 'Home Score',
      type: 'number',
      validation: Rule => Rule.required().min(0),
    }),
    defineField({
      name: 'awayScore',
      title: 'Away Score',
      type: 'number',
      validation: Rule => Rule.required().min(0),
    }),
  ],
})
