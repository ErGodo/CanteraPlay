const API_URL = process.env.NEXT_PUBLIC_COMMUNICATIONS_AGENT_URL || process.env.COMMUNICATIONS_AGENT_URL;
const CLUB_ID = process.env.CLUB_ID || 'f61c9d6c-63a0-4815-a847-912cf2785702';

export async function getNews() {
    try {
        if (!API_URL) {
            console.error("[getNews] API_URL is not defined in env");
            return [];
        }

        const url = `${API_URL}/communications/news/club/${CLUB_ID}`;
        
        const response = await fetch(url, {
            next: { revalidate: 0 }
        });

        if (!response.ok) {
            console.error("[getNews] Error response:", response.status, response.statusText);
            return [];
        }

        const data = await response.json();
        
        return data.map((n: any) => ({
            _id: n.id,
            title: n.title,
            content: n.content,
            date: n.date,
            updatedAt: n.updatedAt,
            image: n.imageUrl ? {
                asset: {
                    url: n.imageUrl
                }
            } : null
        }));
    } catch (error) {
        console.error("[getNews] Fatal error:", error);
        return [];
    }
}
