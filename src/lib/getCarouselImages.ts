const CLUB_ID = 'f61c9d6c-63a0-4815-a847-912cf2785702';
const COMM_API_URL = process.env.NEXT_PUBLIC_COMMUNICATIONS_AGENT_URL || 'https://cp-communications-agent-605024846890.us-central1.run.app';

export async function getCarouselImages() {
  try {
    // Fetch only from Communications Agent API (CanteraPlay)
    const apiResponse = await fetch(`${COMM_API_URL}/communications/media/club/${CLUB_ID}?category=CAROUSEL_HOME`, {
      cache: 'no-store'
    });
    
    if (apiResponse.ok) {
        const apiMedia = await apiResponse.json();
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

    return [];
  } catch (error) {
    console.error('Error fetching carousel images from CanteraPlay:', error);
    return [];
  }
}
