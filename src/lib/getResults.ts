import { sanityClient } from '../sanity';

export async function getResults() {
  return await sanityClient.fetch(`*[_type == "result"] | order(date desc)[0...3]{
    _id,
    date,
    homeTeam,
    awayTeam,
    homeScore,
    awayScore
  }`);
}
