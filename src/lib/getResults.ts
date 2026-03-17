import { sanityClient } from '../sanity'

export async function getResults() {
  try {
    return await sanityClient.fetch(`*[_type == "matchResult"] | order(date desc) {
      _id,
      homeTeam,
      awayTeam,
      homeScore,
      awayScore,
      date,
      competition
    }`);
  } catch (err) {
    console.error("Error fetching results:", err);
    return [];
  }
}
