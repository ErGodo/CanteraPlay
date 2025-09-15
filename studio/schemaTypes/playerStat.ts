export default {
  name: 'playerStat',
  title: 'Player Stat',
  type: 'document',
  fields: [
    { name: 'athleteName', title: 'Athlete Name', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } },
    { name: 'position', title: 'Position', type: 'string' },
    { name: 'goals', title: 'Goles', type: 'number' },
    { name: 'assists', title: 'Asistencias', type: 'number' },
    { name: 'matches', title: 'Partidos Jugados', type: 'number' },
  ],
  preview: {
    select: {
      title: 'athleteName',
      media: 'photo',
      subtitle: 'position',
    },
  },
};
