import { sanityClient } from '@/sanity'

export async function getSponsors() {
  // Use a GROQ-safe check: include sponsors where active == true or active is not defined
  const q = `*[_type == "sponsor" && (active == true || !defined(active))] | order(priority asc) { _id, name, "logo": logo.asset-> { _id, url, metadata { lqip } }, website, priority }`
  try {
  const res = await sanityClient.fetch(q)
  return res || []
  } catch (err) {
    console.error('Error fetching sponsors from Sanity:', err)
    return []
  }
}
