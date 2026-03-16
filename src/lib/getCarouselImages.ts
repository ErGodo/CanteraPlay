import { sanityClient } from '../sanity'

const CLUB_ID = 'f61c9d6c-63a0-4815-a847-912cf2785702';
const COMM_API_URL = process.env.NEXT_PUBLIC_COMMUNICATIONS_AGENT_URL || 'https://cp-communications-agent-605024846890.us-central1.run.app';

export async function getCarouselImages() {
  try {
    // 1. Fetch from Sanity (Legacy/Original)
    const sanityImages = await sanityClient.fetch(`*[_type == "carouselImage"] | order(order asc) {
      _id,
      image {
        asset->{url, metadata { lqip }},
        alt
      },
      caption,
      order
    }`);

    // 2. Fetch from Communications Agent API (New)
    const apiResponse = await fetch(`${COMM_API_URL}/communications/media/club/${CLUB_ID}?category=CAROUSEL_HOME`, {
      cache: 'no-store'
    });
    
    if (apiResponse.ok) {
        const apiMedia = await apiResponse.json();
        const apiImages = apiMedia.map((m: any) => ({
            _id: m.id,
            image: {
                asset: { url: m.url },
                alt: m.title
            },
            caption: m.title,
            order: 999 // New ones at the end, or tweak as needed
        }));
        
        // Merge and return (New images first or last)
        return [...apiImages, ...sanityImages];
    }

    return sanityImages;
  } catch (error) {
    console.error('Error fetching carousel images:', error);
    // Fallback to Sanity only on error
    return await sanityClient.fetch(`*[_type == "carouselImage"] | order(order asc) {
      _id,
      image {
        asset->{url, metadata { lqip }},
        alt
      },
      caption,
      order
    }`);
  }
}
