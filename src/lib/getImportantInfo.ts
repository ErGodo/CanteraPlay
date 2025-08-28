import { sanityClient } from '../sanity'

export async function getImportantInfo() {
  // GROQ query para traer los avisos importantes ordenados por fecha descendente
  return await sanityClient.fetch(`*[_type == "importantInfo"] | order(date desc) {
    _id,
    title,
    content,
    date,
    image {
      asset->{url, metadata { lqip }},
      alt
    }
  }`)
}
