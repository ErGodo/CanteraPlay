import { sanityClient } from '../sanity'

export async function getHero() {
  return await sanityClient.fetch(`*[_type == "hero"][0]{
  _id,
  slogan,
  promoVideo{asset->{url}},
  videoFocalY
  ,
  featuredPlayer->{
  "name": athleteName,
  position,
  "avatar": photo{..., asset->{url, metadata}},
    statsToShow,
    goals,
    assists,
    matches
  }
  }`)
}

export type HeroData = Awaited<ReturnType<typeof getHero>>
