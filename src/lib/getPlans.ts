import { sanityClient } from '../sanity'

export async function getPlans() {
  // GROQ query para traer los planes ordenados por precio ascendente
  return await sanityClient.fetch(`*[_type == "plan"] | order(price asc) {
    _id,
    name,
    description,
    price,
    features
  }`)
}
