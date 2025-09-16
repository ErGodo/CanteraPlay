import { sanityClient } from '../sanity'

export async function getHero() {
  return await sanityClient.fetch(`*[_type == "hero"][0]{
  _id,
  slogan,
  promoVideo{asset->{url}},
  videoFocalY
  }`)
}

export type HeroData = Awaited<ReturnType<typeof getHero>>
