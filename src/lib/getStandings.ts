import { sanityClient } from '../sanity';

export async function getStandings() {
  return await sanityClient.fetch(`*[_type == "standings"] | order(position asc) {
    _id,
    team,
    points,
    position,
    played,
    won,
    drawn,
    lost,
    goalsFor,
    goalsAgainst
  }`);
}
