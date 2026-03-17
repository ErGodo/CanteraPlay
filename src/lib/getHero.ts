import { sanityClient } from '../sanity'

export async function getHero() {
  try {
    // We add a random param to the query to bypass some sanity internal caches if needed, 
    // although useCdn: false/true handles most of it.
    const hero = await sanityClient.fetch(`*[_type == "hero"][0]{
      _id,
      slogan,
      promoVideo{asset->{url}},
      videoFocalY,
      featuredPlayer->{
        "name": athleteName,
        position,
        "avatar": photo{..., asset->{url, metadata}},
        statsToShow,
        goals,
        assists,
        matches
      }
    }`);
    return hero;
  } catch (err) {
    console.error("Error fetching Hero from Sanity:", err);
    return null;
  }
}

export type HeroData = Awaited<ReturnType<typeof getHero>>
