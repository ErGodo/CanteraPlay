export default {
  name: 'playerStat',
  title: 'Player Stat',
  type: 'document',
  fields: [
    { name: 'athleteName', title: 'Athlete Name', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } },
    { name: 'position', title: 'Position', type: 'string' },
    // Which stat should be shown when this player is featured
    {
      name: 'statsToShow',
      title: 'Stat to show',
      type: 'string',
      options: {
        list: [
          { title: 'Ninguna', value: '' },
          { title: 'Goles', value: 'goals' },
          { title: 'Asistencias', value: 'assists' },
          { title: 'Partidos', value: 'matches' },
        ],
      },
      description: 'Elige la estadística que se mostrará cuando este jugador esté destacado.',
      initialValue: '',
    },
    // Numeric stat values: shown conditionally based on statsToShow
  { name: 'goals', title: 'Goles', type: 'number', initialValue: 0, hidden: ({parent}: {parent?: any}) => parent?.statsToShow !== 'goals' },
  { name: 'assists', title: 'Asistencias', type: 'number', initialValue: 0, hidden: ({parent}: {parent?: any}) => parent?.statsToShow !== 'assists' },
  { name: 'matches', title: 'Partidos Jugados', type: 'number', initialValue: 0, hidden: ({parent}: {parent?: any}) => parent?.statsToShow !== 'matches' },
  ],
  preview: {
    select: {
      title: 'athleteName',
      media: 'photo',
      subtitle: 'position',
    },
  },
};
