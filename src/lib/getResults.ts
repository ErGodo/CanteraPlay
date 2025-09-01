import { sanityClient } from '../sanity';

export async function getResults() {
  return await sanityClient.fetch(`*[_type == "result"] | order(date desc)[0...3]{
    _id,
    date,
    homeScore,
    awayScore,
    category,
    competition,
    league,
    note,
    // Provide a human-friendly category label (glosa) when category is a ref or string
    "categoryGlosa": coalesce(category->glosa, category->name, category, ""),
    // Dereference team refs; if not a ref (plain string), fall back to an object with name
  "homeTeam": coalesce(homeTeam-> { _id, name, "logo": { "asset": logo.asset-> { _id, url, metadata } } }, { "name": coalesce(homeTeam.name, homeTeam._ref, homeTeam) }),
  "awayTeam": coalesce(awayTeam-> { _id, name, "logo": { "asset": logo.asset-> { _id, url, metadata } } }, { "name": coalesce(awayTeam.name, awayTeam._ref, awayTeam) }),
  }`);
}
