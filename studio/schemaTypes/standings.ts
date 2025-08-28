import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'standings',
  title: 'Standings',
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
      name: 'teams',
      title: 'Teams',
      type: 'array',
      of: [
        defineField({
          name: 'team',
          title: 'Team',
          type: 'object',
          fields: [
            { name: 'name', title: 'Name', type: 'string', validation: Rule => Rule.required() },
            { name: 'points', title: 'Points', type: 'number', validation: Rule => Rule.required().min(0) },
            { name: 'played', title: 'Played', type: 'number', validation: Rule => Rule.required().min(0) },
            { name: 'won', title: 'Won', type: 'number', validation: Rule => Rule.required().min(0) },
            { name: 'drawn', title: 'Drawn', type: 'number', validation: Rule => Rule.required().min(0) },
            { name: 'lost', title: 'Lost', type: 'number', validation: Rule => Rule.required().min(0) },
            { name: 'goalsFor', title: 'Goals For', type: 'number', validation: Rule => Rule.required().min(0) },
            { name: 'goalsAgainst', title: 'Goals Against', type: 'number', validation: Rule => Rule.required().min(0) },
          ],
        })
      ],
    }),
  ],
})
