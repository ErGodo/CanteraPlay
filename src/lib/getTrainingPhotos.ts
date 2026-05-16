const CLUB_ID = 'f61c9d6c-63a0-4815-a847-912cf2785702';
const COMM_API_URL = process.env.NEXT_PUBLIC_COMMUNICATIONS_AGENT_URL || 'https://cp-communications-agent-605024846890.us-central1.run.app';

export async function getTrainingPhotos() {
  try {
    const [nunoaRes, sanMiguelRes] = await Promise.all([
      fetch(`${COMM_API_URL}/communications/media/club/${CLUB_ID}?category=TRAINING_NUNOA`, { cache: 'no-store', next: { revalidate: 0 } }),
      fetch(`${COMM_API_URL}/communications/media/club/${CLUB_ID}?category=TRAINING_SAN_MIGUEL`, { cache: 'no-store', next: { revalidate: 0 } })
    ]);

    let nunoaPhotos: any[] = [];
    let sanMiguelPhotos: any[] = [];

    if (nunoaRes.ok) {
      const data = await nunoaRes.json();
      nunoaPhotos = data.map((m: any) => ({
        _id: m.id,
        imageUrl: m.url,
        caption: m.title,
        location: 'Ñuñoa',
        date: m.createdAt
      }));
    }

    if (sanMiguelRes.ok) {
      const data = await sanMiguelRes.json();
      sanMiguelPhotos = data.map((m: any) => ({
        _id: m.id,
        imageUrl: m.url,
        caption: m.title,
        location: 'San Miguel',
        date: m.createdAt
      }));
    }

    // Combine and sort by date descending (newest first)
    const combined = [...nunoaPhotos, ...sanMiguelPhotos];
    return combined.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  } catch (err) {
    console.error("Error fetching Training Photos from Communications API:", err);
    return [];
  }
}
