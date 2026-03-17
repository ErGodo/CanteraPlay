import { sanityClient } from '../sanity'

export async function getSponsors() {
  try {
    return await sanityClient.fetch(`*[_type == "sponsor"] | order(order asc) {
      _id,
      name,
      logo{asset->{url, metadata { lqip }}, alt},
      order
    }`);
  } catch (err) {
    console.error("Error fetching sponsors:", err);
    return [];
  }
}
