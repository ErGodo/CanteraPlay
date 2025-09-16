import { sanityClient } from '../sanity'

export async function getPlayerStats() {
  return await sanityClient.fetch(`*[_type == "playerStat"] | order(goals desc) {
    _id,
    athleteName,
    position,
    goals,
    assists,
    matches,
    photo{..., asset->{url, metadata { lqip }}, hotspot, crop, focusX, focusY, alt}
  }`)
}

export type PlayerStat = Awaited<ReturnType<typeof getPlayerStats>>
