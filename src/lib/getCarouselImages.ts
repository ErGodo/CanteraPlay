const CLUB_ID = 'f61c9d6c-63a0-4815-a847-912cf2785702';
const COMM_API_URL = process.env.NEXT_PUBLIC_COMMUNICATIONS_AGENT_URL || 'https://cp-communications-agent-605024846890.us-central1.run.app';

export async function getCarouselImages(category: string = 'CAROUSEL_HOME') {
  try {
    const url = `${COMM_API_URL}/communications/media/club/${CLUB_ID}?category=${category}`;
    console.log(`[getCarouselImages] Calling communications API: ${url}`);
    const apiResponse = await fetch(url, {
      cache: 'no-store',
      next: { revalidate: 0 }
    });
    
    if (apiResponse.ok) {
        const apiMedia = await apiResponse.json();
        console.log(`[getCarouselImages] SUCCESS: Found ${apiMedia.length} for category ${category}`);
        return apiMedia.map((m: any) => ({
            _id: m.id,
            image: {
                asset: { url: m.url },
                alt: m.title
            },
            caption: m.title,
            order: 0
        }));
    }
  } catch (error) {
    console.error(`Error fetching media for category ${category}:`, error);
  }
  
  return [];
}
