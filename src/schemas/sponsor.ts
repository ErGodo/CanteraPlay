// Sanity schema for sponsors
export default {
  name: 'sponsor',
  title: 'Sponsor',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'logo', title: 'Logo', type: 'image', options: { hotspot: true } },
    { name: 'website', title: 'Website', type: 'url' },
    { name: 'priority', title: 'Priority', type: 'number', description: 'Lower numbers appear first', initialValue: 0 },
    { name: 'active', title: 'Active', type: 'boolean', initialValue: true },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'logo',
      subtitle: 'website'
    }
  }
}
