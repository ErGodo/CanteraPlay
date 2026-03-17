const API_URL = process.env.COMMUNICATIONS_AGENT_URL || process.env.NEXT_PUBLIC_COMMUNICATIONS_AGENT_URL;
const CLUB_ID = process.env.CLUB_ID;

export async function getNews() {
    try {
        if (!API_URL) {
            console.error("[getNews] COMMUNICATIONS_AGENT_URL is not defined");
            return [];
        }
        if (!CLUB_ID) {
            console.error("[getNews] CLUB_ID is not defined");
            return [];
        }
        const response = await fetch(`${API_URL}/communications/news/club/${CLUB_ID}`, {
            next: { revalidate: 0 }
        });
        if (!response.ok) return [];
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
        console.error("Error fetching news from communications agent:", error);
        return [];
    }
}
