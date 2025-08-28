import { sanityClient } from '../sanity'

export async function getCarouselImages() {
  // GROQ query para traer las imágenes del carrusel ordenadas por el campo 'order'
  return await sanityClient.fetch(`*[_type == "carouselImage"] | order(order asc) {
    _id,
    image {
      asset->{url, metadata { lqip }},
      alt
    },
    caption,
    order
  }`)
}
