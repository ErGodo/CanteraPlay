import { sanityClient } from '../sanity'

export async function getTestimonials() {
  return await sanityClient.fetch(`*[_type == "testimonial"] | order(_createdAt desc) {
    _id,
    athleteName,
    position,
    quote,
    photo{asset->{url, metadata { lqip }}, alt}
  }`)
}

export type Testimonial = Awaited<ReturnType<typeof getTestimonials>>
