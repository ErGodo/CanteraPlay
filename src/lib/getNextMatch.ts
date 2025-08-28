import { sanityClient } from '../sanity';

export async function getNextMatch() {
  const now = new Date().toISOString();
  return await sanityClient.fetch(`*[_type == "nextMatch" && date > $now] | order(date asc)[0]{
    _id,
    date,
    time,
    homeTeam->{
      _id,
      name,
      logo { asset->{url} }
    },
    awayTeam->{
      _id,
      name,
      logo { asset->{url} }
    },
    location
  }`, { now });
}
