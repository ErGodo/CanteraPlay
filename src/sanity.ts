import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: 'eahhf3d2', // Reemplaza con tu projectId de sanity.json o sanity.io/manage
  dataset: 'production', // O el dataset que elegiste
  apiVersion: '2023-08-28', // Usa la fecha de hoy o la recomendada por Sanity
  useCdn: true, // true para solo lectura, false si necesitas datos frescos
})
