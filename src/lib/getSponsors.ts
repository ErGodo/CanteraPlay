const CLUB_ID = 'f61c9d6c-63a0-4815-a847-912cf2785702'; // Fallback
const COMM_API_URL = process.env.NEXT_PUBLIC_COMMUNICATIONS_AGENT_URL || 'https://cp-communications-agent-605024846890.us-central1.run.app';
const CLUB_API_URL = process.env.NEXT_PUBLIC_CLUB_SERVICE_URL || 'https://cp-club-nestjs-605024846890.us-central1.run.app';

export async function getSponsors() {
  try {
    let activeClubId = CLUB_ID;

    // 1. Intentar descubrir el ID del club por nombre (Avidela) para asegurar que estamos en el correcto
    try {
        console.log(`[getSponsors] Discovering club ID at: ${CLUB_API_URL}/clubs`);
        const clubsRes = await fetch(`${CLUB_API_URL}/clubs`, { next: { revalidate: 3600 } });
        if (clubsRes.ok) {
            const clubs = await clubsRes.json();
            const avidela = clubs.find((c: any) => (c.name || c.clubName || '').toLowerCase().includes('avidela'));
            if (avidela) {
                activeClubId = avidela.id || avidela.pkClub;
                console.log(`[getSponsors] Club found: ${avidela.name} -> ID: ${activeClubId}`);
            } else {
                console.warn(`[getSponsors] Avidela not found in club list (${clubs.length} clubs). Using fallback: ${activeClubId}`);
            }
        } else {
            console.error(`[getSponsors] Failed to fetch clubs: ${clubsRes.status}`);
        }
    } catch (err) {
        console.warn('[getSponsors] Could not discover club ID, using default', err);
    }

    // 2. Consultar al Agente de Comunicaciones
    const timestamp = Date.now();
    const url = `${COMM_API_URL}/communications/media/club/${activeClubId}?category=SPONSOR&_t=${timestamp}`;
    console.log(`[getSponsors] Fetching sponsors from: ${url}`);
    
    const res = await fetch(url, {
      cache: 'no-store',
      next: { revalidate: 0 }
    });
    
    if (res.ok) {
        const media = await res.json();
        console.log(`[getSponsors] SUCCESS: Found ${media.length} items for club ${activeClubId}`);
        if (media.length > 0) {
            console.log(`[getSponsors] First item title: "${media[0].title}", URL: "${media[0].url}"`);
        }
        
        return media.map((m: any) => ({
            ...m,
            _id: m.id,
            name: m.title || "Sponsor",
            logo: m.url,
            imageUrl: m.url, // Duplicamos por seguridad
            url: m.url,
            website: m.link || (m.description?.startsWith('http') ? m.description : null),
            priority: 0
        }));
    }
  } catch (err) {
    console.error('Error fetching sponsors:', err);
  }
  
  return [];
}
